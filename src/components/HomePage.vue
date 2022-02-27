<template>
  <div class="container custom-outer-container">
    <b-modal
      @ok="deleteUserFromList()"
      id="deleteConfirmationModal"
      title="BootstrapVue"
    >
      <p class="my-4">Are you sure to delete the user?</p>
    </b-modal>
    <template v-if="!loadingFlag">
      <h1 class="home-page-heading">Your Friends List</h1>
      <div class="row filter-dropdown-outer">
        <date-filter @changeDate="filterResults"></date-filter>
        <sort-option @changeSort="sortResults"></sort-option>
      </div>
      <div class="row">
        <span
          v-show="
            filterDates['startDate'] &&
            filterDates['endDate'] &&
            filteredList.length === 0
          "
        >
          No user in specified date please enter some other value</span
        >
        <user-card
          @deleteUser="showConfirmationPopup"
          v-for="user in getFilteredList"
          :key="user.uid"
          :userDetails="user"
        ></user-card>
      </div>
    </template>
    <div class="loading-icon-outer" v-else>
      <loading-icon></loading-icon>
    </div>
  </div>
</template>

<script>
import twubricSample from "./../sampleApi.json";
import DateFilter from "./DateFilter.vue";
import LoadingIcon from "./LoadingIcon.vue";
import SortOption from "./SortOption.vue";
import UserCard from "./UserCard.vue";

export default {
  components: { UserCard, DateFilter, SortOption, LoadingIcon },
  name: "HomePage",
  data() {
    return {
      myVarL: "Anmol",
      userList: [],
      filteredList: [],
      filterDates: {},
      loadingFlag: false,
      userIdToDelete: undefined,
    };
  },
  mounted() {
    try {
      this.loadingFlag = true;
      setTimeout(() => {
        this.userList = twubricSample;
        this.loadingFlag = false;
      }, 2000);
    } catch (e) {}
  },
  methods: {
    filterResults(dateObj) {
      const dateString = new Date(dateObj.dateValue);
      if (dateObj.dateType === "end")
        this.filterDates["endDate"] = dateString.getTime() / 1000;
      else this.filterDates["startDate"] = dateString.getTime() / 1000;
      this.filteredList = this.userList.filter((user) => {
        return (
          user.join_date > this.filterDates["startDate"] &&
          user.join_date < this.filterDates["endDate"]
        );
      });
    },
    sortResults(sortObj) {
      let flag = sortObj.activeSortType === "asc" ? 1 : -1;
      this.filteredList.length > 0
        ? this.filteredList.sort((a, b) => {
            return (
              (a.twubric[sortObj.sortField] - b.twubric[sortObj.sortField]) *
              flag
            );
          })
        : this.userList.sort((a, b) => {
            return (
              (a.twubric[sortObj.sortField] - b.twubric[sortObj.sortField]) *
              flag
            );
          });
    },
    showConfirmationPopup(userId) {
      this.$bvModal.show("deleteConfirmationModal");
      this.userIdToDelete = userId;
    },
    deleteUserFromList() {
      if (this.filteredList.length <= 0) {
        let userIndex = this.userList.findIndex(
          (x) => x.uid === this.userIdToDelete
        );
        this.userList.splice(userIndex, 1);
      } else {
        let userIndexInFilteredList = this.filteredList.findIndex(
          (x) => x.uid === this.userIdToDelete
        );
        let userIndexInOrginalList = this.userList.findIndex((x) => x.uid === this.userIdToDelete);
        this.userList.splice(userIndexInOrginalList, 1);
        this.filteredList.splice(userIndexInFilteredList, 1);
      }
    },
  },

  computed: {
    getFilteredList() {
      return this.filteredList.length > 0 ? this.filteredList : this.userList;
    },
  },
};
</script>

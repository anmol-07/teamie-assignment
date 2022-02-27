<template>
  <div class="container custom-outer-container">
    <b-modal
      @ok="deleteUserFromList()"
      @keydown.enter="deleteUserFromList()"
      id="deleteConfirmationModal"
      title="Do you want to proceed"
    >
      <p class="my-4">
        Are you sure to delete <span v-show="selectedUserIndex > -1"></span> the
        user?
      </p>
    </b-modal>
    <template v-if="!loadingFlag">
      <h1 class="home-page-heading" v-show="userList.length > 0">Your Friends List</h1>
      <div class="row filter-dropdown-outer"  v-show="userList.length > 0">
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
          v-for="(user, index) in getFilteredList"
          :key="user.uid"
          :userDetails="user"
          :isSelectedUser="index === selectedUserIndex"
        ></user-card>
        <h1 v-show="filteredList.length <= 0 && userList.length <= 0">
          No more users left to delete. It's better you <a href="/" class="higlighted-text">reload</a>
        </h1>
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
      selectedUserIndex: -1,
    };
  },
  mounted() {
    try {
      this.loadingFlag = true;
      setTimeout(() => {
        this.userList = twubricSample;
        this.loadingFlag = false;
        document.querySelector("body").addEventListener("keydown", (e) => {
          e = e || window.event;
          if (e.keyCode === 37 || e.which === 37) this.selectUser(-1);
          // added selecting user functionality on 'left & right' arrow key
          else if (e.keyCode === 39 || e.which === 39) this.selectUser(1);
          else if (e.keyCode === 46 || e.which === 46)
            this.deleteSelectedUser(); // added delete functionality on 'delete' key
        });
      }, 2000);
    } catch (e) {}
  },
  methods: {
    // function to filter results on the basis of date
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
      this.selectedUserIndex = -1;
    },

    // function to sort results on the basis of respective scores
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
      this.selectedUserIndex = -1;
    },

    // function to show popup before deleting the user
    showConfirmationPopup(userId) {
      this.$bvModal.show("deleteConfirmationModal");
      this.userIdToDelete = userId;
    },

    // function to delete the user
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
        let userIndexInOrginalList = this.userList.findIndex(
          (x) => x.uid === this.userIdToDelete
        );
        this.userList.splice(userIndexInOrginalList, 1);
        this.filteredList.splice(userIndexInFilteredList, 1);
      }
      this.selectedUserIndex = -1;
    },

    //function to update select user on left/ right arrow keys
    selectUser(updateFlag) {
      if (
        this.selectedUserIndex < this.userList.length - 1 &&
        this.selectedUserIndex >= -1
      ) {
        this.selectedUserIndex += updateFlag;
      } else {
        this.selectedUserIndex = -1;
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },

    //deleting selected user with 'delete' key
    deleteSelectedUser() {
      if (
        this.selectedUserIndex < this.userList.length - 1 &&
        this.selectedUserIndex > -1
      ) {
        this.$bvModal.show("deleteConfirmationModal");
        this.userIdToDelete = this.userList[this.selectedUserIndex].uid;
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

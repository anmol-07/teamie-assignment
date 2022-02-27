<template>
  <div class="sort-options-outer col-4">
    <div class="sort-list-outer">
      <span class="sort-option-btn">
        <span
          >Sort by {{ selectedSortLabel }}
          <template v-if="selectedSortType">
            <down-icon
              class="down-icon"
              v-if="selectedSortType === 'asc'"
            ></down-icon>
            <up-icon v-else></up-icon>
          </template>
        </span>
        <ul>
          <li
            :class="[
              sort.id === selectedSortId ? 'selected-sort-option' : '',
              sort.activeSortType === 'asc'
                ? 'show-down-arrow'
                : 'show-up-arrow',
            ]"
            v-for="(sort, index) in sortOptions"
            :key="sort.id"
            @click="changeActiveSort(sort, index)"
          >
            {{ sort.label }}
            <span v-if="selectedSortType && selectedSortId === sort.id">
              <down-icon
                class="down-icon"
                v-if="selectedSortType === 'asc'"
              ></down-icon>
              <up-icon v-else></up-icon>
            </span>
          </li>
        </ul>
      </span>
    </div>
  </div>
</template>

<script>
import DownIcon from "./DownIcon.vue";
import UpIcon from "./UpIcon.vue";
export default {
  components: { DownIcon, UpIcon },
  name: "SortOption",
  data() {
    return {
      sortOptions: [
        {
          id: 1,
          label: "Total Twubric Score",
          activeSortType: "asc",
          sortField: "total",
        },
        {
          id: 2,
          label: "Friends Score",
          activeSortType: "asc",
          sortField: "friends",
        },
        {
          id: 3,
          label: "Influence Score",
          activeSortType: "asc",
          sortField: "influence",
        },
        {
          id: 4,
          label: "Chirpiness Score",
          activeSortType: "asc",
          sortField: "chirpiness",
        },
      ],
      selectedSort: undefined,
      selectedSortId: undefined,
      selectedSortLabel: undefined,
      selectedSortType: undefined,
      selctedSortIndex: -1,
    };
  },
  mounted() {
    document.querySelector("body").addEventListener("keydown", (e) => {
      e = e || window.event;
      if (e.keyCode === 83 || e.which === 83) {  // added sort functionality on 's' key
        if (
          this.selectedSortIndex < this.sortOptions.length - 1 &&
          this.selectedSortIndex >= -1
        ) {
          this.selectedSortIndex += 1;
          this.changeActiveSort(
            this.sortOptions[this.selectedSortIndex],
            this.selctedSortIndex
          );
        } else {
          this.selectedSortIndex = 0;
          this.changeActiveSort(
            this.sortOptions[this.selectedSortIndex],
            this.selctedSortIndex
          );
        }
      }
    });
  },
  methods: {
    //function to change the sort and emit sort event for the parent component
    changeActiveSort(sort, index) {
      if (this.selectedSortId === sort.id) {
        this.sortOptions[index].activeSortType =
          this.sortOptions[index].activeSortType === "asc" ? "desc" : "asc";
      } else {
        this.selectedSortId = sort.id;
        this.selectedSortLabel = sort.label;
      }
      this.selectedSortType = sort.activeSortType;
      this.$emit("changeSort", sort);
    },
  },
};
</script>

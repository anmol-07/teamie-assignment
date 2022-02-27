<template>
  <div class="col-4 card">
    <div class="user-details-outer">
      <div class="user-heading">
        <div class="user-image-outer-div">
          <img
            class="card-img-top"
            :src="userDetails.image"
            alt="Card image cap"
          />
        </div>
        <div class="user-main-details-outer">
          <h4>{{ userDetails.fullname }}</h4>
          <span>Twubric Score - {{ userDetails.twubric.total }}</span>
          <span class="ratings-outer">
            <span
              class="ratings-label"
              v-for="i in parseInt(userDetails.twubric.total)"
              :key="i"
            ></span>
            <span
              v-if="
                userDetails.twubric.total -
                  parseInt(userDetails.twubric.total) >
                0
              "
              class="half-rating-label"
            >
            </span>
          </span>
        </div>
      </div>
      <div class="action-buttons-outer">
      <button class="show-more-button" @click="showOtherDetails = !showOtherDetails">
        Expand To See More Details
      </button>
      <button class="delete-button" @click="$emit('deleteUser', userDetails.uid)">
        <trash-icon></trash-icon>
      </button>
      </div>
      
      <div
        :class="[
          showOtherDetails ? 'open-other-details' : '',
          'user-other-details',
        ]"
      >
        <h5>User Details</h5>
        <div class="user-detail-div">
          <span>
            <span class="twubric-score-icon-outer">
              <i class="fa-solid fa-circle-check"></i>
            </span>
            Friends Score - {{ userDetails.twubric.friends }}</span
          >
          <span class="ratings-outer">
            <span
              class="ratings-label"
              v-for="i in parseInt(userDetails.twubric.friends)"
              :key="i"
            ></span>
            <span
              v-if="
                userDetails.twubric.friends -
                  parseInt(userDetails.twubric.friends) >
                0
              "
              class="half-rating-label"
            ></span>
          </span>
        </div>
        <div class="user-detail-div">
          <span>
            <span class="twubric-score-icon-outer">
              <i class="fa-solid fa-circle-check"></i>
            </span>
            Influence Score - {{ userDetails.twubric.influence }}</span
          >
          <span class="ratings-outer">
            <span
              class="ratings-label"
              v-for="i in parseInt(userDetails.twubric.influence)"
              :key="i"
            ></span>
            <span
              v-if="
                userDetails.twubric.influence -
                  parseInt(userDetails.twubric.influence) >
                0
              "
              class="half-rating-label"
            ></span>
          </span>
        </div>
        <div class="user-detail-div">
          <span>
            <span class="twubric-score-icon-outer">
              <i class="fa-solid fa-circle-check"></i>
            </span>

            Chirpiness Score - {{ userDetails.twubric.chirpiness }}</span
          >
          <span class="ratings-outer">
            <span
              class="ratings-label"
              v-for="i in parseInt(userDetails.twubric.chirpiness)"
              :key="i"
            ></span>
            <span
              v-if="
                userDetails.twubric.chirpiness -
                  parseInt(userDetails.twubric.chirpiness) >
                0
              "
              class="half-rating-label"
            ></span>
          </span>
        </div>
        <div class="user-detail-div">
          <span>
            <span class="twubric-score-icon-outer">
              <i class="fa-solid fa-circle-check"></i>
            </span>
            Account Created Since -
            {{ getReadableDate(userDetails.join_date) }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TrashIcon from './TrashIcon.vue';
export default {
  components: { TrashIcon },
  name: "UserCard",
  props: {
    userDetails: Object,
  },

  data() {
    return {
          showOtherDetails: false
    }
  },
  
  methods: {
    getReadableDate(dateTimeStamp) {
      let theDate = new Date(dateTimeStamp * 1000);
      return theDate.toDateString();
    }
  },
};
</script>

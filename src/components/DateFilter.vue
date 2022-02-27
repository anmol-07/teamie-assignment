<template>
  <div class="date-filter-outer col-8">
    <b-form-datepicker
      id="start-datepicker"
      class="datepicker-outer"
      :reset-button="true"
      :show-decade-nav="true"
      :label-reset-button="resetText"
      v-model="startDate"
      @input="$emit('changeDate', { dateValue: startDate, dateType: 'start' })"
    ></b-form-datepicker>
    <b-form-datepicker
      id="end-datepicker"
      v-model="endDate"
      :reset-button="true"
      :show-decade-nav="true"
      :label-reset-button="resetText"
      @input="$emit('changeDate', { dateValue: endDate, dateType: 'end' })"
      class="datepicker-outer"
    ></b-form-datepicker>
  </div>
</template>

<script>
export default {
  name: "DateFilter",
  data() {
    return {
      startDate: "",
      endDate: "",
      resetText: "Reset Date",
    };
  },
};
</script>

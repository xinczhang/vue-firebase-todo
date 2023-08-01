<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col-12 col-md-4 col-lg-3 mb-3 mb-md-0">
        <user-info />
        <div>
          <ul class="list-group">
            <patient-list-item
              v-for="patientItem in this.getPatientList"
              :key="patientItem.name"
              :item="patientItem"
            />
          </ul>
        </div>
      </div>
      <div class="col-12 col-md-8 col-lg-9 mt-2">
        <todo-item-creator />
        <hr />
      </div>
    </div>
  </div>
</template>

<script>
import UserInfo from "@/components/UserInfo.vue";
import PatientListItem from "@/components/PatientListItem.vue";
import TodoItemCreator from "@/components/TodoItemCreator.vue";

export default {
  name: "HomeView",
  components: { PatientListItem, TodoItemCreator, UserInfo },
  computed: {
    getPatientList() {
      return this.$store.state.patients.patientList;
    },
  },
  mounted() {
    this.$store.dispatch("fetchPatientList");
  },
};
</script>

<template>
  <li
    class="list-group-item"
    style="--bs-bg-opacity: 0.2"
    :class="getBackground"
  >
    <h5 class="mt-1 text-wrap">
      {{ this.item.name }}
    </h5>
    <p class="text-wrap">最近一次汇报</p>
    <div class="text-end mb-2">
      <button class="btn btn-success me-2" @click="changeCurrent">Check</button>
    </div>
  </li>
</template>

<script>
export default {
  name: "PatientListItem",
  props: {
    item: {
      id: String,
      name: String,
      isChecked: Boolean,
    },
  },
  computed: {
    getBackground() {
      return this.item.isChecked ? "bg-success" : "bg-light";
    },
  },
  methods: {
    changeCurrent() {
      const patientData = {
        id: this.item.id,
        currentCheckState: this.item.isChecked,
      };

      this.$store.dispatch("changeCurrent", patientData);
    },
  },
};
</script>

<style scoped>
.text-wrap {
  white-space: pre-line;
  overflow-wrap: break-word;
}
</style>

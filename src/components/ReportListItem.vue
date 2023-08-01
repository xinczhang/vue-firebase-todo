<template>
  <li class="list-group-item" style="--bs-bg-opacity: 0.2">
    <h5 class="mt-1 text-wrap">
      {{ this.item.uid }}
    </h5>
    <p class="text-wrap">
      {{ this.item.imageURL }}
    </p>
    <img class="report-img" :src="actualURL" />
    <p class="text-wrap">
      {{ this.item.datetime }}
    </p>
  </li>
</template>

<script>
// Create a reference to the file we want to download
import { getStorage, ref, getDownloadURL } from "firebase/storage";
export default {
  name: "ReportListItem",
  props: {
    item: {
      id: String,
      uid: String,
      imageURL: String,
      actualURL: String,
      datetime: Date,
    },
  },
  data() {
    return {
      actualURL: "",
    };
  },
  mounted() {
    const storage = getStorage();
    const imageRef = ref(storage, this.item.imageURL);
    getDownloadURL(imageRef)
      .then((url) => {
        this.actualURL = url;
      })
      .catch((error) => {
        throw error;
      });
  },
};
</script>

<style scoped>
.text-wrap {
  white-space: pre-line;
  overflow-wrap: break-word;
}
.report-img {
  max-height: 140px;
  max-width: 252px;
}
</style>

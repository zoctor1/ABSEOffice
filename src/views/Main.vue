<template>
  <div id="Main" style="background:#f9f9f9;">
    <b-row style="width: 100%;" :busy="isBusy">
      <b-col lg="8" md="12" sm="12">
        <calendar />
      </b-col>
      <b-col lg="4" md="12" sm="12" style="background: #f9f9f9; margin: 0px 0px 0px 0px; padding: 0px 0px 0px 20px;">
        <tab />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import * as mJS from "../assets/js/mainJS"
import calendar from "@/components/calendars.vue"
import tab from "@/components/tab.vue"
import master from "./Master/Master"

export default {
  name: "Main",
  components: {
    isBusy: false,
    master,
    calendar,
    tab
  },
  props: {},
  data() {
    return {}
  },
  computed: {},
  mounted() {
    this.isBusy = true;
  },
  methods: {
    toggleBusy() {
      this.isBusy = !this.isBusy
    }
  },
  watch: {}
};
</script>

<style scoped>
</style>

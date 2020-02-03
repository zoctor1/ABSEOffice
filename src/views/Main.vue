<template>
  <div id="Main" style="background:#f9f9f9;">
    <b-row style="width: 100%;">
      <b-col lg="8" md="6" sm="12">
        <calendar />
      </b-col>
      <b-col lg="4" md="6" sm="12" style="background: #f9f9f9; margin: 0px 0px 0px 0px; padding: 0px 0px 0px 20px;">
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
    master,
    calendar,
    tab
  },
  props: {},
  data() {
    return {}
  },
  computed: {},
  mounted() {},
  methods: {},
  watch: {}
};
</script>

<style scoped>
</style>

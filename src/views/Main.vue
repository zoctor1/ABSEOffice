<template>
  <div id="Main">
    <b-row >
      <b-col lg="9" sm="4" xs="12" >
        <calendar />
      </b-col>
      <b-col w="3" lg="3" sm="4" xs="12" style="background: #f9f9f9;">
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
    return {
      
    }
  },
  computed: {},
  mounted() {
    
  },
  methods: {},
  watch: {}
};
</script>

<style scoped>
</style>

<template>
  <div id="master">
    
  </div>
</template>

<script>
// import * as mJS from "../assets/js/mainJS"

export default {
  name: "master",
  components: {},
  props: {},
  data() {
    return {
      dismissSecs: 10,
      dismissCountDown: 0,
      showDismissibleAlert: false
    };
  },
  computed: {},
  mounted() {},
  methods: {
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    }
  },
  watch: {}
};
</script>

<style scoped></style>

<template>
  <div id="holiday">
    <modal name="holidayShow" >
      <button type="button" aria-label="Close" class="close" @click="hide('holidayShow')" >
        <img src="../assets/Close-icon.png" width="33" height="33" />
      </button>
      hello, world!
    </modal>
  </div>
</template>

<script>
import Vue from 'vue'
// import * as mainJs from '@/assets/js/mainJS.js';
// import * as authService from '@/services/auth.service';
import VModal from 'vue-js-modal'
 
Vue.use(VModal)

export default {
  name: "holiday",
  components: {},
  data() {
    return {}
  },
  props: {},
  computed: {},
  mounted() {},
  methods: {
    show (name) {
      this.$modal.show(name);
    },
    hide (name) {
      this.$modal.hide(name);
    }
  },
  watch: {},
};
</script>

<style>
</style>
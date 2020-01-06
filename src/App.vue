<template>
  <div id="app" style="position: relative; height: 100%;">
    <incMenu v-if="$route.name != 'Login'" />
    <router-view />
  </div>
</template>

<script>
import Vue from 'vue'
import Vuesax from 'vuesax'
import BootstrapVue from 'bootstrap-vue'

import incMenu from "@/inc/inc_menu"

import "@/assets/css/mainStyle.css"
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vuesax/dist/vuesax.css'
import 'material-icons/iconfont/material-icons.css'

Vue.use(BootstrapVue)
Vue.use(Vuesax, {})
export default {
  name: "app",
  components: {
    incMenu
  },
  props: {},
  data() {
    return {
      
    }
  },
  computed: {},
  mounted() {},
  methods: {},
  watch: {}
}
</script>
<style>
html, body {
  height: 100%;
}

</style>

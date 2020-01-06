<template>
  <div id ="reLoad">
    <b-button @click="toggleBusy">Reload</b-button>
    <b-table :items="items" :busy="isBusy" class="mt-3" outlined>
      <template v-slot:table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong> Loading...</strong>
        </div>
      </template>
    </b-table>
  </div>
</template>

<script>
import * as mJS from "../assets/js/mainJS"

  export default {
    data() {
      return {
        isBusy: false,
        items: []
      }
    },
    methods: {
      toggleBusy() {
        this.isBusy = !this.isBusy
      }
    }
  }
</script>

<style scoped>
</style>

<template>
  <div id="EmpOT" style="padding:25px 15px 15px 15px">
    <b-row>
      <b-col sm="12">
        <div style="position: relative;">    
          <h2 align="left" style="font-weight: bold;">
            ข้อมูลการทำงานนอกเวลา
          </h2>
        </div>
          <table width=100% style="border :1px solid black; margin-top:10px;" >
            <div>
              <b-table
                :busy="isBusy" 
                striped hover :items="items"
                :fields="fields"
                :filter="filter"
                :current-page="currentPage"
                :per-page="perPage"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
                :sort-direction="sortDirection"
                @filtered="onFiltered"
              >
                <template v-slot:table-busy>
                  <div class="text-center text-danger ">
                    <b-spinner class="align-middle"></b-spinner>
                    <strong>Loading...</strong>
                  </div>
                </template>
                <template v-slot:head()="data">
                  <span style="font-size: 18px;">{{ data.label }}</span>
                </template>
              </b-table>
            </div>
          </table>
      </b-col>
    </b-row>
    <b-row>
      <b-col lg="9" sm="7" xs="5" class="my-1" id="parent2">
        <b-row class="my-1">
          <b-col style="margin-left:auto" sm="8">
            <b-form-group
              label="จำนวนที่แสดงบนตาราง"
              label-cols-sm="11"
              label-align-sm="right"
              label-size="sm"
              label-for="perPageSelect"
              class="mb-0"
            >
              <b-form-select
                v-model="perPage"
                id="perPageSelect"
                size="sm"
                :options="pageOptions"
              ></b-form-select>
            </b-form-group>
          </b-col>
          <b-col style="margin-left:auto" sm="4">
            <b-pagination
              v-model="currentPage"
              :total-rows="totalRows"
              :per-page="perPage"
              align="fill"
              size="sm"
              class="my-0"
            ></b-pagination>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  name: "EmpOT",
  components: {},
  props: {},
  data() {
    return {
      items: [],
      fields: [
        { key: 'no',                label: 'ลำดับ', class: 'text-center no' },
        { key: 'leave_date_format', label: 'วันที่กรอก', class: 'text-center leave_date_format' },
        { key: 'leave_date_start',  label: 'วันที่ขอทำงาน', class: 'text-center leave_date_start' },
        { key: 'time',              label: 'ช่วงเวลา', class: 'text-center time'  },
        { key: 'time_start',        label: 'เวลาที่ทำงาน', class: 'text-center time_start' },
        { key: 'hr_approve',        label: 'สถานะ', class: 'text-center hr_approve' },
        { key: 'leave_remark',      label: 'รายละเอียด', class: 'text-center leave_remark' },
      ],
      isBusy: false,
      totalRows:1,
      currentPage: 1,
      perPage: 10,
      filter: null,
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      currentPage: 1,
      perPage: 10,
      pageOptions: [10, 20, 30], 
      totalRows:1,
    }
  },
  computed: {
    sortOptions() {
      return this.fields
        .filter(f => f.sortable)
        .map(f => {
          return { text: f.label, value: f.key }
        })
    }
  },
  mounted() {
    this.totalRows = this.items.length
  },
  methods: {
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    toggleBusy() {
      this.isBusy = !this.isBusy
    }
  },
  watch: {}
};
</script>

<style scoped>
  #parent2 {
    position: Sticky;
    top: 8%;
    left: 60%;
  }
</style>

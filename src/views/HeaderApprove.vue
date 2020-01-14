<template>
  <div id="HeaderAppve">
    <center>
      <div><br>
        <b-col sm="12">
          <h2 style="text-align: left;">
            คำขออนุมัติการลางาน
          </h2>
            <b-nav-form >
              <b-input-group size="sm">
                <b-form-input
                  size="sm" 
                  class="mr-sm-2"
                  v-model="filter"
                  type="search"
                  id="filterInput"
                  placeholder="ค้นหา.."
                >
                </b-form-input>
                <b-input-group-append>
                  <b-button 
                    size="sm" 
                    class="my-2 my-sm-0" 
                    type="submit" 
                    variant="primary" 
                    :disabled="!filter" 
                    @click="filter = ''"
                  >
                    Clear
                  </b-button>
                  <div style="cursor: pointer; margin-left:10px" @click="getHeaderApprove()">
                    <img src="../assets/refresh.png" width="33" height="33">
                  </div>
                </b-input-group-append>
              </b-input-group>
            </b-nav-form>
            <table width=100% sm="12" style="border :1px solid black; margin-top:10px; " >
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
                  <!-- :busy="isBusy" is reload variable  -->
                  <template v-slot:table-busy>
                    <div class="text-center text-danger ">
                      <b-spinner class="align-middle"></b-spinner>
                      <strong>Loading...</strong>
                    </div>
                  </template>
                </b-table>
              </div>
            </table>
        </b-col>
      </div>
    </center>
    <div>
      <b-col sm="5" class="my-1" id="parent2">
        <b-row class="my-1">
          <b-col sm="8">
            <b-pagination
              v-model="currentPage"
              :total-rows="totalRows"
              :per-page="perPage"
              align="fill"
              size="md"
              class="my-0"
            >
            </b-pagination>
          </b-col>
        </b-row>
      </b-col>
    </div>
  </div>
</template>

<script>
import * as mJS from "../assets/js/mainJS"
import * as authService from '@/services/auth.service';

export default {
  name: "HeaderAppve",
  components: {},
  props: {},
  data() {
    return {
      items: [],
      fields: [
        { key: 'no', label: 'ลำดับ', class: 'text-center',sortable: true },
        { key: 'leave_date', label: 'วันที่กรอก', class: 'text-center',sortable: true },
        { key: 'full_Name', label: 'ชื่อ', class: 'text-center' },
        { key: 'dept_name', label: 'เเผนก', class: 'text-center',sortable: true },
        { key: 'position_name', label: 'ตำแหน่ง', class: 'text-center' },
        { key: 'leave_reason_name', label: 'เหตุผลการลา', class: 'text-center' },
        { key: 'leave_remark', label: 'รายละเอียดการลา', class: 'text-center' },
        { key: 'leave_start_time', label: 'วันที่ลา', class: 'text-center',sortable: true },
        { key: 'leave_stop_time', label: 'ลาถึงวันที่', class: 'text-center', },
        { key: 'head_approve_date', label: 'วันที่หัวหน้าอนุมัติ', class: 'text-center' },
        { key: 'hr_approve_date', label: 'วันที่ Hr รับทราบ', class: 'text-center' },
        { key: 'status', label: 'สถานะ', class: 'text-center',sortable: true },
      ],
      isBusy: false,
      totalRows:1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [10, 15,20],
      filter: null,
      filterOn: [],
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc'
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
    this.getDataAsync();
    this.getHeaderApprove();
  },
  methods: {
      getDataAsync: async function(){
        await authService.getDataHeader({}).then(response => {
          console.log(response.data)
          for (var i = 0; i < response.data.length; i++) {
            response.data[i].no = i+1;
            response.data[i].full_Name = response.data[i].first_name + " " + response.data[i].last_name;
          }
          console.log(response.data)
          this.items = response.data;
        });
        this.totalRows = this.items.length
      },
      getHeaderApprove: function() {
      this.isBusy = true;
      authService.getDataHeader({}).then(response => {
        console.log(response.data)
        if (response.data != null && response.data.length > 0) {
          for (var i = 0; i < response.data.length; i++) {
            response.data[i].no = i+1;
            response.data[i].full_Name = response.data[i].first_name + " " + response.data[i].last_name;
          }
          console.log(response.data)
          this.items = response.data;
          this.totalRows = this.items.length
          this.isBusy = false;
        } else {
          this.isBusy = false;
        }
      });
    },
      info(item, index, button) {
        this.infoModal.title = `Row index: ${index}`
        this.infoModal.content = JSON.stringify(item, null, 2)
        this.$root.$emit('bv::show::modal', this.infoModal.id, button)
      },
      resetInfoModal() {
        this.infoModal.title = ''
        this.infoModal.content = ''
      },
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

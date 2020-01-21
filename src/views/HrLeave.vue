<template>
  <div id="HrLeave" lg="12" sm="12" xs="12">
    <center>
      <div><br>
        <b-col lg="12" sm="12" xs="12">
          <h2 align="left">ข้อมูลการลาของพนักงาน</h2>
            <b-nav-form >
              <b-input-group size="sm">
                <b-form-input
                  size="sm" 
                  class="mr-sm-2"
                  v-model="filter"
                  type="search"
                  id="filterInput"
                  placeholder="ค้นหา.."
                  autocomplete = on
                >
                </b-form-input>
                <b-input-group-append>
                  <div class="close" style="cursor: pointer; margin-left:10px" @click="getHrApprove()">
                    <img src="../assets/refresh.png" id="tooltip-target-1" width="33" height="33">
                    <b-tooltip placement='right' target="tooltip-target-1" triggers="hover">
                      Refresh
                    </b-tooltip>
                  </div>
                </b-input-group-append>
              </b-input-group>
            </b-nav-form>
            <table lg="12" sm="12" xs="12" style="border :1px solid black; margin-top:10px; width:100% ">
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
                      <strong> Loading...</strong>
                    </div>
                  </template>

                  <template v-slot:cell(head_approve_date)="data">
                    <div v-if="data.item.cancel_date != null">
                      <h7>ไม่อนุมัติ</h7>
                    </div>
                    <div v-else-if="data.item.cancel_date == null && data.item.head_approve_date != null">
                      <h7>{{data.item.head_approve_date}}</h7>
                    </div>
                    <div v-else-if="data.item.cancel_date == null && data.item.head_approve_date == null">
                      <h7>รอการอนุมัติ</h7>
                    </div>
                  </template>

                  <template v-slot:cell(hr_approve_date)="data">
                    <div v-if="data.item.cancel_date != null">
                      <h7>ไม่อนุมัติ</h7>
                    </div>
                    <div v-else-if="data.item.cancel_date == null && data.item.hr_approve_date != null">
                      <h7>{{data.item.hr_approve_date}}</h7>
                    </div>
                    <div v-else-if="data.item.cancel_date == null && data.item.hr_approve_date == null">
                      <b-button class="btn-secondary" v-if="!data.item.HrbtnApprove" @click="showMsgBoxTwo(data.item.emp_leave_id)">รอการอนุมัติ</b-button>
                    </div>
                  </template>

                  <template v-slot:cell(status)="data">
                      <div v-if="data.item.head_approve_date != null && data.item.hr_approve_date != null && data.item.cancel_date == null">
                        <h7>ผ่าน</h7>
                      </div>
                      <div v-else-if="data.item.cancel_date != null">
                        <h7>ไม่ผ่าน</h7>
                      </div>
                      <div v-else-if="data.item.head_approve_date == null && data.item.hr_approve_date == null && data.item.cancel_date == null">
                        <h7>รอการอนุมัติจาก Head เเละ Hr</h7>
                      </div>
                      <div v-else-if="data.item.head_approve_date == null && data.item.cancel_date == null">
                        <h7>รอการอนุมัติจาก Head</h7>
                      </div>
                      <div v-else-if="data.item.hr_approve_date == null && data.item.cancel_date == null">
                        <h7>รอการอนุมัติจาก Hr</h7>
                      </div>
                  </template>
                </b-table>
                  <!-- :busy="isBusy" is reload variable  -->
              </div>
            </table>
        </b-col>
      </div>
    </center>
    <div>
      <b-col lg="9" sm="7" xs="5" class="my-1" id="parent2">
        <b-row class="my-1">
          <b-col  sm="8">
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
import { async } from 'q';

export default {
  name: "HrLeave",
  components: {},
  props: {},
  data() {
    return {
      items: [],
      fields: [
        { key: 'no', label: 'ลำดับ', class: 'text-center',sortable: true },
        { key: 'leave_date', label: 'วันที่กรอก', class: 'text-center',sortable: true },
        { key: 'full_Name', label: 'ชื่อ', class: 'text-center',sortable: true },
        { key: 'dept_name', label: 'เเผนก', class: 'text-center',sortable: true },
        { key: 'position_name', label: 'ตำแหน่ง', class: 'text-center',sortable: true },
        { key: 'leave_reason_name', label: 'เหตุผลการลา', class: 'text-center',sortable: true },
        { key: 'leave_remark', label: 'รายละเอียดการลา', class: 'text-center' },
        { key: 'leave_start_time', label: 'วันที่ลา', class: 'text-center',sortable: true },
        { key: 'leave_stop_time', label: 'ลาถึงวันที่', class: 'text-center' },
        { key: 'head_approve_date', label: 'วันที่หัวหน้าอนุมัติ', class: 'text-center' },
        { key: 'hr_approve_date', label: 'วันที่ Hr รับทราบ', class: 'text-center' },
        { key: 'status', label: 'สถานะ', class: 'text-center',sortable: true },
      ],
      isBusy: false,
      totalRows:1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [10,15],
      filter: null,
      filterOn: [],
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      boxTwo: '',
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
    this.getHrApprove();
  },
  methods: {
    showMsgBoxTwo(id) {
        this.$bvModal.msgBoxConfirm('คุณต้องการอนุมัติการลานี้ใช่หรือไม่?', {
          title: 'การอนุมัติ',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'danger',
          okTitle: 'อนุมัติ',
          cancelTitle: 'ไม่อนุมัติ',
          footerClass: 'p-2',
          hideHeaderClose: false,
          centered: true
        }).then(value => {
          console.log(value)
          if (value == true) {
            authService.postApproveHr(id).then(response => {
              console.log(response.data);
            });
          } else {
            authService.notApproveHR(id).then(response => {
              console.log(response.data);
            });
          }
        })
      },
    getHrApprove: function(){
    this.isBusy = true;
    authService.getDataHR({}).then(response => {
      console.log(response.data)
      if (response.data != null && response.data.length > 0) {    
        for (var i = 0; i < response.data.length; i++) {
          response.data[i].no = i+1;
          response.data[i].full_Name = response.data[i].first_name + " " + response.data[i].last_name;
          response.data[i].HeaderbtnApprove = false;
          response.data[i].HrbtnApprove = false;
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

<style>
  #parent2 {
    position: Sticky;
    top: 8%;
    left: 60%;
  }

  .close:hover {
  cursor: pointer;
}

#HrLeave .btn-secondary {
    font-size: 12px;
  }
</style>

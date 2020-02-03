<template>
  <div id="EmpLeave" lg="12" sm="12" xs="12">
    <popupLeave v-bind:showPop="showPop" />
    
    <center>
      <div><br>
        <b-col lg="12" sm="12" xs="12">
          <div style="position: relative;">
            <h2 align="left">ข้อมูลการลา</h2>
              <div style="position: absolute; top: 50%; right: 0; transform: translate(0, -40%);">
                <!-- <popupLeave /> -->
                <div>
                  <b-col lg="12" sm="12" xs="12">
                    <div>
                      <vs-button
                        @click="showLeavePopup()"
                        color="primary"
                        type="filled"
                      >
                        <img src="../assets/Plus_icon3.png" width="20" height="20" /> เพิ่มการลา
                      </vs-button>
                    </div>
                  </b-col>
                </div>
              </div>
          </div>
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
            <div class="close" style="cursor: pointer; margin-left:10px; " @click="getDataAsync()">
              <img src="../assets/refresh.png" id="tooltip-target-1"  width="33" height="33">
              <b-tooltip placement='right' target="tooltip-target-1" triggers="hover">
                Refresh
              </b-tooltip>
            </div>
            </b-input-group-append>
            </b-input-group>
          </b-nav-form>
          <table width=100% style="margin-top:10px; border: 1px solid black;">
            <div >
              <b-table
                fixed responsive
                :busy="isBusy"
                striped hover 
                :items="items"
                :fields="fields"
                :filter="filter"
                :current-page="currentPage"
                :per-page="perPage"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
                :sort-direction="sortDirection"
                @filtered="onFiltered" 
                show-empty
              >
              
              <!-- :busy="isBusy" is reload variable  -->
              <template v-slot:table-busy>
                <div class="text-center text-danger ">
                  <b-spinner class="align-middle"></b-spinner>
                  <strong> Loading...</strong>
                </div>
              </template>

              <template v-slot:empty>
                <h2 style="text-align:center;" color="#00000">ไม่มีข้อมูลการลา</h2>
              </template>

              <template v-slot:cell(leave_remark)="data">
                <div style="cursor: pointer" @click="dataModal = data.item, $bvModal.show('remarkModal')">
                    <img src="../assets/Details.png" width="33" height="33">
                </div>
              </template>
              
              <template v-slot:cell(hr_approve_date)="data">
                <div v-if="data.item.cancel_date != null">
                  <b-badge variant="danger">ไม่อนุมัติ</b-badge>
                </div>
                <div v-else-if="data.item.cancel_date == null && data.item.hr_approve_date != null">
                  <b-badge variant="success">{{data.item.hr_approve_date}}</b-badge>
                </div>
                <div v-else-if="data.item.cancel_date == null && data.item.hr_approve_date == null && data.item.emp_leave_id != null">
                  <b-badge variant="warning">รอการอนุมัติ</b-badge>
                </div>
              </template>

              <template v-slot:cell(head_approve_date)="data">
                <div v-if="data.item.cancel_date != null">
                  <b-badge variant="danger">ไม่อนุมัติ</b-badge>
                </div>
                <div v-else-if="data.item.cancel_date == null && data.item.head_approve_date != null">
                  <b-badge variant="success">{{data.item.head_approve_date}}</b-badge>
                </div>
                <div v-else-if="data.item.cancel_date == null && data.item.head_approve_date == null && data.item.emp_leave_id != null">
                  <b-badge variant="warning">รอการอนุมัติ</b-badge>
                </div>
              </template>

              <template v-slot:cell(status)="data">
                <div v-if="data.item.head_approve_date != null && data.item.hr_approve_date != null && data.item.cancel_date == null" >
                  <b-badge variant="success">ผ่าน</b-badge>
                </div>
                <div v-else-if="data.item.cancel_date != null">
                  <b-badge variant="danger">ไม่ผ่าน</b-badge>
                </div>
                <div v-else-if="data.item.head_approve_date == null && data.item.hr_approve_date == null && data.item.cancel_date == null">
                  <b-badge variant="warning">รอการอนุมัติจาก Head เเละ Hr</b-badge>
                </div>
                <div v-else-if="data.item.head_approve_date == null && data.item.cancel_date == null">
                  <b-badge variant="warning">รอการอนุมัติจาก Head</b-badge>
                </div>
                <div v-else-if="data.item.hr_approve_date == null && data.item.cancel_date == null">
                  <b-badge variant="warning">รอการอนุมัติจาก Hr</b-badge>
                </div>
              </template>
              </b-table>
            </div>
          </table>
        </b-col>
      </div>
    </center>
      <div>
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
      </div>
      <br>
      <b-modal id="remarkModal" :centered="true" hide-footer>
        <template v-slot:modal-title>รายละเอียดการลา</template>
          <div class="d-block text-center">
            <h5>{{dataModal.leave_remark}}</h5>
          </div>
        <b-button class="mt-3" block @click="$bvModal.hide('remarkModal')">ปิด</b-button>
      </b-modal>

      <!-- <b-modal id="success" :centered="true" hide-footer>
        <template v-slot:modal-title>การอนุมัติ</template>
          <div class="d-block text-center">
            <h5>หัวหน้าอนุมัติเเล้ว ({{dataModal.head_approve_date}})</h5>
            <h5>HR อนุมัติเเล้ว ({{dataModal.hr_approve_date}})</h5>
          </div>
        <b-button class="mt-3" block @click="$bvModal.hide('success')">ปิด</b-button>
      </b-modal>

      <b-modal id="fail" :centered="true" hide-footer>
        <template v-slot:modal-title>การอนุมัติ</template>
          <div class="d-block text-center">
            <h5>ไม่ได้รับการอนุมัติ ({{dataModal.cancel_date}})</h5>
          </div>
        <b-button class="mt-3" block @click="$bvModal.hide('fail')">ปิด</b-button>
      </b-modal>

      <b-modal id="waitingAll" :centered="true" hide-footer>
        <template v-slot:modal-title>การอนุมัติ</template>
          <div class="d-block text-center">
            <h5>รอการอนุมัติจากหัวหน้าเเละ HR</h5>
          </div>
        <b-button class="mt-3" block @click="$bvModal.hide('waitingAll')">ปิด</b-button>
      </b-modal>

      <b-modal id="waitingHead" :centered="true" hide-footer>
        <template v-slot:modal-title>การอนุมัติ</template>
          <div class="d-block text-center">
            <h5>หัวหน้ายังไม่ได้อนุมัติ</h5>
            <h5>HR อนุมัติเเล้ว ({{dataModal.hr_approve_date}})</h5>
          </div>
        <b-button class="mt-3" block @click="$bvModal.hide('waitingHead')">ปิด</b-button>
      </b-modal>

      <b-modal id="waitingHr" :centered="true" hide-footer>
        <template v-slot:modal-title>การอนุมัติ</template>
          <div class="d-block text-center">
            <h5>หัวหน้าอนุมัติเเล้ว ({{dataModal.head_approve_date}})</h5>
            <h5>HR ยังไม่ได้อนุมัติ</h5>
          </div>
        <b-button class="mt-3" block @click="$bvModal.hide('waitingHr')">ปิด</b-button>
      </b-modal> -->
  </div>
</template>

<script>
import * as mJS from "../assets/js/mainJS"
import * as authService from '@/services/auth.service';
import popupLeave from "@/components/popupLeave.vue"

export default {
  name: "EmpLeave",
  components: {
    popupLeave
  },
  props: {},
  data() {
    return {
      items: [],
      fields: [
        { key: 'no', label: 'ลำดับ', class: 'text-center',sortable: true },
        { key: 'leave_date', label: 'วันที่กรอก', class: 'text-center',sortable: true },
        { key: 'leave_reason_name', label: 'ประเภทการลา', class: 'text-center',sortable: true },
        { key: 'leave_remark', label: 'รายละเอียดการลา', class: 'text-center' },
        { key: 'leave_start_date', label: 'วันที่ลา', class: 'text-center',sortable: true },
        { key: 'leave_stop_date', label: 'ลาถึงวันที่', class: 'text-center' },
        { key: 'head_approve_date', label: 'วันที่หัวหน้าอนุมัติ', class: 'text-center' },
        { key: 'hr_approve_date', label: 'วันที่ Hr รับทราบ', class: 'text-center' },
        { key: 'status', label: 'สถานะ', class: 'text-center',sortable: true }
      ],
      dataModal:{},
      isBusy: false,
      // options1:[],
      totalRows:1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [10, 20, 30],
      filter: null,
      filterOn: [],
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      boxtwo: '',
      showPop:false,
      // name: " ",
      // val1: " ",
      // val2: " "
    }
  },
  computed: {
    sortOptions() {
      return this.fields
        .filter(f => f.sortable)
        .map(f => {
          return { text: f.label, value: f.key }
        })
    },
    state() {
      return this.name.length >= 4 ? true : false
    }
  },
  created(){
    window.addEventListener("resize", this.handleResize);
  },
  destroyed(){
    window.removeEventListener('resize', this.handleResize);
  },
  mounted() {
    this.getDataAsync();
  },
  methods: {
    showLeavePopup: function() {
        var ths = this;
        ths.showPop = true;
        setTimeout(function() {
          ths.showPop = false;
        }, 1000);
      },
    getDataAsync: async function(){
      this.isBusy = true;
        var user = JSON.parse(localStorage.getItem("user"));
        await authService.getUserLeave(user.uuid).then(response => {
          console.log(response.data)
          if (response.data.length > 0) {
            for (var i = 0; i < response.data.length; i++) {
              response.data[i].no = i+1;
              response.data[i].dateTime_start = response.data[i].leave_start_date + " " + response.data[i].leave_start_time;
              response.data[i].dateTime_stop = response.data[i].leave_stop_date + " " + response.data[i].leave_stop_time;
            }
              this.items = response.data;
              this.isBusy = false;
              console.log("check")
          } else {
            console.log("else");
            setTimeout(() => {
              this.isBusy = false}, 1200);
              console.log("isbusy");
              // alert("aaaa")
            }
        });
        this.totalRows = this.items.length
    },
    handleResize: function() {
      window.width = window.innerWidth;
      window.height = window.innerHeight;
      if(window.width <= 750){
        this.fields = [
          { key: 'no', label: 'ลำดับ', class: 'text-center',sortable: true },
          { key: 'leave_reason_name', label: 'เหตุผลการลา', class: 'text-center',sortable: true },
          { key: 'leave_start_date', label: 'วันที่ลา', class: 'text-center',sortable: true },
          { key: 'leave_stop_date', label: 'ลาถึงวันที่', class: 'text-center' },
          { key: 'status', label: 'สถานะ', class: 'text-center',sortable: true }
        ]
      }
      else{
        this.fields = [
          { key: 'no', label: 'ลำดับ', class: 'text-center',sortable: true },
          { key: 'leave_date', label: 'วันที่กรอก', class: 'text-center',sortable: true },
          { key: 'leave_reason_name', label: 'เหตุผลการลา', class: 'text-center',sortable: true },
          { key: 'leave_remark', label: 'รายละเอียดการลา', class: 'text-center' },
          { key: 'leave_start_date', label: 'วันที่ลา', class: 'text-center',sortable: true },
          { key: 'leave_stop_date', label: 'ลาถึงวันที่', class: 'text-center' },
          { key: 'head_approve_date', label: 'วันที่หัวหน้าอนุมัติ', class: 'text-center' },
          { key: 'hr_approve_date', label: 'วันที่ Hr รับทราบ', class: 'text-center' },
          { key: 'status', label: 'สถานะ', class: 'text-center',sortable: true }
        ]
      }
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

  input[type="date"]::-webkit-inner-spin-button {
      display: none;
      -webkit-appearance: none;
  }
  .popup-example {
    max-width: 100%;
    height: 100%;
  }

  #parent2 {
    position: Sticky ;
    top: 8%;
    right: auto;
  }

  .close:hover {
    cursor: pointer;
  }
</style>
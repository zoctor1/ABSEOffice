<template>
  <div id="NewEmployeeApprove" lg="12" sm="12" xs="12">
    <center>
      <div><br>
        <b-col lg="12" sm="12" xs="12">
          <h2 align="left" style="font-weight: bold;">
            ข้อมูลการสมัครของพนักงานใหม่
          </h2>

            <table width=100% style="margin-top:10px; border: 1px solid black;">
              <div >
                <b-table
                  responsive
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
                  <template v-slot:table-busy>
                    <div class="text-center text-danger ">
                      <b-spinner class="align-middle"></b-spinner>
                      <strong> Loading...</strong>
                    </div>
                  </template>
                  <template v-slot:empty>
                    <h2 style="text-align:center;" color="#00000">ไม่มีข้อมูลการสมัคร</h2>
                  </template>
                  <template v-slot:head()="data">
                    <span style="font-size: 18px;">{{ data.label }}</span>
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
  </div>
</template>

<script>
import Vue from 'vue'
import * as mJS from "../assets/js/mainJS"
import * as authService from '@/services/auth.service';
import { async } from 'q';
import { Datetime } from 'vue-datetime' // npm install --save luxon vue-datetime weekstart
import 'vue-datetime/dist/vue-datetime.css'
import { Settings } from 'luxon'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'
import VModal from 'vue-js-modal'
import popupLeaveHeaderHr from "@/components/popupLeaveHeaderHr.vue"
import VueSuggestion from 'vue-suggestion'
import itemTemplate from '../components/ItemTemplate.vue';

Vue.use(Datetime,VueSweetalert2,VModal);
Vue.use(VueSuggestion);

export default {
  name: "NewEmployeeApprove",
  components: {},
  props: {},
  data() {
    return {
    //   tempData: [],
    //   itemTemplate,
    //   nameSearch:"",
    //   nameSearchArray: [],
    //   empName:[],
      items: [],
    //   optionStat: [
    //     { value: null ,text: "--เลือกสถานะ--"},
    //     { value: 1 ,text: "ผ่านการอนุมัติ"},
    //     { value: 2 ,text: "รอการรับทราบ"}
    //   ],
    //   optionsDep: [],
    //   optionLeaveType: [],
      fields: [
        { key: 'no', label: 'ลำดับ', class: 'text-center no' },
        { key: 'create_date', label: 'วันที่สมัคร', class: 'text-center create_date' },
        { key: 'full_Name', label: 'ชื่อ', class: 'text-center full_Name'},
        { key: 'nick_name', label: 'ชื่อเล่น', class: 'text-center nick_name'},
        { key: 'dept_name', label: 'เเผนก', class: 'text-center dept_name' },
        { key: 'position_name', label: 'ตำแหน่ง', class: 'text-center position_name' },
        { key: 'address', label: 'ที่อยู่', class: 'text-center address' },
        { key: 'mobile', label: 'เบอร์โทรศัพท์', class: 'text-center mobile' },
        { key: 'email', label: 'อีเมล', class: 'text-center email' },
      ],
    //   dataModal:{},
    //   checkPopup:'',
      isBusy: false,
      totalRows:1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [10, 20, 30],
      filter: null,
      filterOn: [],
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
    //   valDateStart: '',
    //   valDateStop: '',
    //   selectType: '',
    //   selectDep:'',
    //   selectStat: '',
    //   currentDate: '',
    //   showPopHeader:false,
    //   window : {
    //     width: 0,
    //     height: 0
    //   }
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
  // created(){
  //   window.addEventListener("resize", this.handleResize);
  // },
  // destroyed(){
  //   window.removeEventListener('resize', this.handleResize);
  // },
  mounted() {
    this.getNewEmployee()
    // this.getHrApprove();
    // this.selectType = null;
    // this.selectDep = null;
    // this.selectStat = null;
    // this.getDataReasonLeave();
    // this.getDataDept();
    // this.getDataAllUser();
  },
  methods: {
    getNewEmployee: async function(){
      this.isBusy = true;
      await authService.getNewEmployee().then(response => {
        if (response.data != null && response.data.length > 0) { 
          for (var i = 0; i < response.data.length; i++) {
            response.data[i].no = i+1;
            response.data[i].full_Name = response.data[i].first_name + " " + response.data[i].last_name;
          }
          this.items = response.data;
          setTimeout(() => {
            this.isBusy = false
          },300);
        } else {
          setTimeout(() => {
            this.isBusy = false}, 1200);
        }
      })
      this.totalRows = this.items.length
    },
    // showLeavePopup: function(flag) {
    //   var ths = this;
    //   ths.showPopHeader = true;
    //   ths.checkPopup = flag;
    //   setTimeout(function() {
    //     ths.showPopHeader = false;
    //   }, 1000);
    // },
    // defaultValue() {
    //   this.valDateStart = "";
    //   this.valDateStop = "";
    //   this.selectStat = null;
    //   this.selectType = null;
    //   this.selectDep = null;
    //   this.getHrApprove();
    // },
    // show (name) {
    //     this.$modal.show(name);
    // },
    // hide (name) {
    //   this.$modal.hide(name);
    // },
    // itemSelected (nameSearch) {
    //     this.nameSearch = nameSearch;
    // },
    // setLabel (nameSearch) {
    //   return nameSearch.name;
    // },
    // inputChange (text) {
    //   this.nameSearchArray = this.empName.filter(function(v) { return v.name.toUpperCase().includes(text.toUpperCase()) } );
    // },
    // filterData() {
    //   var ths = this;
    //   var allData = this.tempData;
    //   if (this.selectStat == null && this.selectType == null && this.selectDep == null && Object.keys(this.valDateStart).length <= 0 && Object.keys(this.valDateStop).length <= 0 && Object.keys(this.nameSearch).length <= 0 ) {
    //       this.$swal.fire({
    //         heightAuto: false,
    //         icon: 'warning',
    //         title: 'เลือกข้อมูลที่จะค้นหา...'
    //       })
    //   }
    //   if (this.valDateStart != null && this.valDateStart != "") {
    //     var startTimeSelect = mJS.formatDateFilter(this.valDateStart)
    //     allData = allData.filter(function(v) {
    //       var leavestart = mJS.formatDateFilter(v.leave_start_date)
    //       return startTimeSelect == leavestart;
    //     });
    //   }
    //   if(this.valDateStop != null && this.valDateStop != "" ) {
    //     var stopTimeSelect = mJS.formatDateFilter(this.valDateStop)
    //     allData = allData.filter(function(v) {
    //       var leavestop = mJS.formatDateFilter(v.leave_stop_date)
    //       return stopTimeSelect == leavestop;
    //     });
    //   }
    //   if(this.valDateStop != null && this.valDateStop != "" && this.valDateStart != null && this.valDateStart != "") {
        
    //   }
    //   if (this.selectStat != null && this.selectStat != "") {
    //     if (this.selectStat == 1) {
    //       allData = allData.filter(function(v) {
    //         return v.head_approve_date != null && v.hr_approve_date != null && v.cancel_date == null;
    //       });
    //     } else if (this.selectStat == 2) {
    //       allData = allData.filter(function(v) {
    //         return v.head_approve_date != null && v.hr_approve_date == null && v.cancel_date == null && v.emp_leave_id != null;
    //       });
    //     } 
    //   }
    //   if(this.selectType != null && this.selectType != "") {
    //     allData = allData.filter(function(v) {
    //       return v.leave_reason_id == ths.selectType;
    //     })
    //   }
    //   if(this.selectDep != null && this.selectDep != "") {
    //     allData = allData.filter(function(v) {
    //       return v.dept_id == ths.selectDep;
    //     })
    //   }
    //   if (this.nameSearch != null && this.nameSearch != "" ) {
    //     allData = allData.filter(function(v) {
    //       return v.emp_id == ths.nameSearch.value;
    //     })
    //   }
    //   this.items = allData;
    //   this.totalRows = this.items.length
    // },
    // showMsgBoxTwo(id) {
    //     this.$bvModal.msgBoxConfirm('คุณต้องการรับทราบการลานี้ใช่หรือไม่?', {
    //       title: 'รับทราบการลา',
    //       size: 'sm',
    //       buttonSize: 'sm',
    //       okVariant: 'danger',
    //       okTitle: 'รับทราบ',
    //       cancelTitle: 'ปิด',
    //       footerClass: 'p-2',
    //       hideHeaderClose: false,
    //       centered: true
    //     }).then(value => {
    //       if (value == true) {
    //         authService.postApproveHr(id).then(response => {
    //           this.getHrApprove();
    //         });
    //       } 
    //     })
    //   },
    // getDataDept: async function(){
    //   var dataDept = [];
    //   await authService.getDataDept().then(response => {
    //     if (response.data != null && response.data.length > 0) {
    //       dataDept.push({ text: "--กรุณาเลือกแผนก--", value: null, disabled: true})
    //       response.data.forEach(function (obj, i) {
    //         dataDept.push({ text: obj.dept_name,value: obj.dept_id });
    //       });
    //       this.optionsDep = dataDept;
    //     }
    //   });
    // },
    // getDataReasonLeave: async function(){
    //   var dataReason = [];
    //   await authService.getDataReasonLeave().then(response => {
    //     if (response.data != null && response.data.length > 0) {
    //       dataReason.push({ text: "--กรุณาเลือกประเภทการลา--", value: null, disabled: true})
    //       response.data.forEach(function (obj, i) {
    //         dataReason.push({ text: obj.leave_reason_name,value: obj.leave_reason_id });
    //       });
    //       this.optionLeaveType = dataReason;
    //     }
    //   });
    // },
    // getHrApprove: async function(){
    // this.isBusy = true;
    // var leave_time = [];
    // var leave_time_stop = [];
    // await authService.getDataHR().then(response => {
    //   if (response.data != null && response.data.length > 0) { 
    //     this.selectedFilter = null;
    //     for (var i = 0; i < response.data.length; i++) {
    //       response.data[i].no = i+1;
    //       response.data[i].full_Name = response.data[i].first_name + " " + response.data[i].last_name + " " + "(" + response.data[i].nick_name + ")";
    //       response.data[i].HrbtnApprove = false;
    //       leave_time = (response.data[i].leave_start_date != null ? response.data[i].leave_start_date.split(" ")[1] : "");
    //       leave_time_stop = (response.data[i].leave_stop_date != null ? response.data[i].leave_stop_date.split(" ")[1] : "");
    //       response.data[i].leave_time = (response.data[i].leave_start_date != null ? leave_time.split(":")[0] + ":" + leave_time.split(":")[1] : "") + ' - ' + (response.data[i].leave_stop_date != null ? leave_time_stop.split(":")[0] + ":" + leave_time_stop.split(":")[1] : "");
    //       response.data[i].leave_date_format = mJS.setDateFormat(response.data[i].leave_date);
    //       response.data[i].leave_start_date_format = mJS.setDateFormat(response.data[i].leave_start_date);
    //       response.data[i].leave_stop_date_format = mJS.setDateFormat(response.data[i].leave_stop_date);
    //       response.data[i].modify_date_format = mJS.setDateFormat(response.data[i].modify_date);
    //       response.data[i].head_approve_date_format = mJS.setDateFormat(response.data[i].head_approve_date);
    //       response.data[i].hr_approve_date_format = mJS.setDateFormat(response.data[i].hr_approve_date);
    //       response.data[i].cancel_date_format = mJS.setDateFormat(response.data[i].cancel_date);
    //       response.data[i].cancel_header_date_format = mJS.setDateFormat(response.data[i].cancel_header_date);
    //       // response.data[i].leave_start_date = (response.data[i].leave_start_date != null ? response.data[i].leave_start_date.split(" ")[0] : "");
    //       // response.data[i].leave_stop_date = (response.data[i].leave_stop_date != null ? response.data[i].leave_stop_date.split(" ")[0] : "");
    //     } 
    //     this.items = response.data;
    //     setTimeout(() => {
    //       this.isBusy = false
    //     },300);
    //     this.tempData = response.data;
    //   } else {
    //       setTimeout(() => {
    //         this.isBusy = false}, 1200);
    //       }
    //     });
    //   this.totalRows = this.items.length
    // },
    // handleResize: function() {
    //   this.window.width = window.innerWidth;
    //   this.window.height = window.innerHeight;
    //   if(this.window.width <= 750){
    //     this.fields = [
    //       { key: 'no', label: 'ลำดับ', class: 'text-center' },
    //       { key: 'leave_date_format', label: 'วันที่กรอก', class: 'text-center' },
    //       { key: 'full_Name', label: 'ชื่อ', class: 'text-center' },
    //       // { key: 'leave_reason_name', label: 'รายละเอียดเวลา', class: 'text-center' },
    //       // { key: 'leave_start_date', label: 'วันที่ลา', class: 'text-center' },
    //       // { key: 'leave_stop_date', label: 'ลาถึงวันที่', class: 'text-center' },
    //       { key: 'hr_approve_date_format', label: 'วันที่ Hr รับทราบ', class: 'text-center' },
    //       { key: 'leave_remark', label: 'รายละเอียดการลา', class: 'text-center' }
    //     ]
    //   }
    //   else{
    //     this.fields = [
    //       { key: 'no', label: 'ลำดับ', class: 'text-center' },
    //       { key: 'leave_date_format', label: 'วันที่กรอก', class: 'text-center' },
    //       { key: 'full_Name', label: 'ชื่อ', class: 'text-center' },
    //       { key: 'dept_name', label: 'เเผนก', class: 'text-center' },
    //       { key: 'position_name', label: 'ตำแหน่ง', class: 'text-center' },
    //       { key: 'leave_reason_name', label: 'รายละเอียดเวลา', class: 'text-center' },
    //       // { key: 'leave_start_date', label: 'วันที่ลา', class: 'text-center' },
    //       // { key: 'leave_stop_date', label: 'ลาถึงวันที่', class: 'text-center' },
    //       { key: 'head_approve_date_format', label: 'วันที่หัวหน้าอนุมัติ', class: 'text-center' },
    //       { key: 'hr_approve_date_format', label: 'วันที่ Hr รับทราบ', class: 'text-center' },
    //       { key: 'status', label: 'สถานะ', class: 'text-center' },
    //       { key: 'leave_remark', label: 'รายละเอียดการลา', class: 'text-center' }
    //     ]
    //   }
    // },
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
}
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
  #HrLeave .vdatetime-input {
    padding-left:10px;
    width: 100%;
    height: 42px !important;
    font-size: 16px !important;
    border: 1px solid rgba(0,0,0,.2); 
    border-radius: 4px;
  }
  #HrLeave .no {
    width : 50px !important;
  }
  #HrLeave .leave_date {
    width : 140px !important;
  }
  #HrLeave .full_Name {
    width : 185px !important;
  }
  #HrLeave .dept_name {
    width : 160px !important;
  }
  #HrLeave .position_name {
    width : 160px !important;
  }
  #HrLeave .leave_reason_name {
    width : 160px !important;
  }
  #HrLeave .leave_start_date {
    width : 130px !important;
  }
  #HrLeave .leave_stop_date {
    width : 130px !important;
  }
  #HrLeave .leave_time {
    width : 150px !important;
  }
  #HrLeave .head_approve_date {
    width : 160px !important;
  }
  #HrLeave .hr_approve_date {
    width : 160px !important;
  }
  #HrLeave .status {
    width : 180px !important;
  }
  #HrLeave .leave_remark {
    width : 170px !important;
  }
  #HrLeave .vs__input {
    padding-left:10px;
    font-family: Kanit, Arial, Helvetica, sans-serif !important;
    font-size: 16px;
    height:42px; 
    width: 100%;
    border: 1px solid rgba(0,0,0,.2); 
    border-radius: 4px;
  }
  #HrLeave .popupRemark:hover {
    background-color:#f5f5f5;
  }
</style>

<template>
  <div id="OTHr">
    <br>
    <div id="rowTable">
      <b-row>
        <b-col lg="4">
          <h2 style="font-weight: bold; cursor:default;">
            ข้อมูลการทำงานนอกเวลาของพนักงาน
          </h2>
        </b-col>
        <b-col lg="6">
        </b-col>
        <b-col lg="2" style="margin-top:24px">
          <b-button
            variant="outline-primary"
            @click="filterData()"
            style="height:42px; width:134px; margin-right:10px;"
          >
            ค้นหา
          </b-button>
        
          <b-button
            variant="outline-danger"
            @click="defaultValue()"
            style="height:42px; width:134px;" 
          >
              เคลียร์ข้อมูล
          </b-button>
        </b-col>
      </b-row>
    </div>
    <div id="rowTable">
      <b-row> 
        <b-col sm="12" md="6" lg="2">
          <p style="cursor:default;"><b>วันเริ่มต้น :</b></p>
          <datetime 
            type="date" 
            v-model="valDateStart" 
            format="dd/MM/yyyy" 
            :min-datetime="currentDate"
            placeholder="ค้นหาวันเริ่มต้น..."
            >
          </datetime>
        </b-col>
        <b-col sm="12" md="6" lg="2">
          <p style="cursor:default;"><b>วันสิ้นสุด :</b></p>
          <datetime 
            type="date" 
            v-model="valDateStop" 
            format="dd/MM/yyyy" 
            :min-datetime="currentDate"
            placeholder="ค้นหาวันสิ้นสุด..."
            >
          </datetime>
        </b-col>
        <b-col md="6" lg="2">
          <p style="cursor:default;"><b>ค้นหาชื่อ :</b></p>
            <vue-suggestion 
              :items="nameSearchArray" 
              v-model="nameSearch"
              :setLabel="setLabel"
              :itemTemplate="itemTemplate"
              @changed="inputChange"
              @selected="itemSelected"
              placeholder="พิมพ์ชื่อเพื่อค้นหา..."
            >
            </vue-suggestion> 
        </b-col>
        <b-col md="12" lg="2">
          <p style="cursor:default;"><b>แผนก :</b></p>
          <b-form-select
            v-model="selectDep"
            :options="optionsDep"
            style="height:42px; cursor: pointer; border: 1px solid rgba(0,0,0,.2); border-radius: 4px;"
          >
          </b-form-select>
        </b-col>
        <b-col sm="12" md="6" lg="2">
          <p style="cursor:default;"><b>สถานะ :</b></p>
          <b-form-select
            v-model="selectStat"
            :options="optionStat"
            style="height:42px; cursor: pointer; border: 1px solid rgba(0,0,0,.2); border-radius: 4px;"
          >
          </b-form-select>
        </b-col>
        <b-col sm="12" md="6" lg="2">
          <p style="cursor:default;"><b>ประเภทการปฏิบัติงาน :</b></p>
          <div style="margin-top:-16px;">
            <b-form-select
              v-model="selectType"
              :options="optionOtType"
              @change="getDataTypeOT()"
              class="mt-3"
              style="height:42px; cursor: pointer; border: 1px solid rgba(0,0,0,.2); border-radius: 4px;"
            >
            </b-form-select>
          </div>
        </b-col>
      </b-row>
    </div>
    <div id="rowTable">
      <b-row>
        <table width=100% style="margin-top:10px; border: 1px solid black;">
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

            <template v-slot:head()="data">
              <span style="font-size: 18px;">{{ data.label }}</span>
            </template>

            <template v-slot:empty>
              <h2 style="text-align:center;" color="#00000">ไม่มีข้อมูลพนักงาน</h2>
            </template>

            <template v-slot:cell(leave_remark)="data">
              <div>
                <img 
                  src="../assets/Details.png" 
                  style="cursor: pointer" 
                  width="33" 
                  height="33"  
                  @click="dataModal = data.item, show('OTHrModal')"
                >
              </div>
            </template>
          </b-table>
        </table>
      </b-row>
    </div>
    <b-row style="margin:5px 0px 0px 30px; text-align:right;" >
      <b-col sm="1">
      </b-col>
      <b-col sm="8">
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
      <b-col sm="3" >
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
      <br>
      <modal 
        name="OTHrModal" 
        :clickToClose="false"
        height="auto"
        width="400px"
      >
        <p style="background-color: #f1f1f1; font-size: 20px; text-align: center; margin-bottom:10px; font-weight:bold; padding: 10px 10px 10px 20px; cursor:default;">
          รายละเอียดการทำงานนอกเวลา
        </p>
        <div style="padding-bottom:15px;">
          
          <b-row style=" margin:0px 10px 5px 10px; border-bottom: 1px dashed #ddd;" class="popupRemark">
            <b-col>
              <p><b style="font-size: 16px;">ชื่อ :</b></p>
            </b-col>
            <b-col>
              <p style="font-size: 16px;"> {{ dataModal.full_Name }} </p>
            </b-col>
          </b-row>
          
          <b-row style=" margin:0px 10px 5px 10px; border-bottom: 1px dashed #ddd;" class="popupRemark">
            <b-col>
              <p><b style="font-size: 16px;">แผนก :</b></p>
            </b-col>
            <b-col>
              <p style="font-size: 16px;"> {{ dataModal.dept_name }} </p>
            </b-col>
          </b-row>
          
          <b-row style=" margin:0px 10px 5px 10px; border-bottom: 1px dashed #ddd;" class="popupRemark">
            <b-col>
              <p><b style="font-size: 16px;">ตำแหน่ง :</b></p>
            </b-col>
            <b-col>
              <p style="font-size: 16px;"> {{ dataModal.position_name }} </p>
            </b-col>
          </b-row>

          <b-row style=" margin:0px 10px 5px 10px; border-bottom: 1px dashed #ddd;" class="popupRemark">
            <b-col>
              <p><b style="font-size: 16px;">ประเภทการทำงาน :</b></p>
            </b-col>
            <b-col>
              <p style="font-size: 16px;"> {{ dataModal.overtime_type_name }} </p>
            </b-col>
          </b-row>

          <b-row style=" margin:0px 10px 5px 10px; border-bottom: 1px dashed #ddd;" class="popupRemark">
            <b-col>
              <p><b style="font-size: 16px;">วันที่กรอก :</b></p>
            </b-col>
            <b-col>
              <p style="font-size: 16px;"> {{ dataModal.createDate }} </p>
            </b-col>
          </b-row>
          
          <b-row v-if="dataModal.update_datetime != null" style=" margin:0px 10px 5px 10px; border-bottom: 1px dashed #ddd;" class="popupRemark">
            <b-col>
              <p><b style="font-size: 16px; color: red;">วันที่แก้ไขข้อมูล :</b></p>
            </b-col>
            <b-col>
              <p style="font-size: 16px; color: red;"> {{ dataModal.updateDate }} </p>
            </b-col>
          </b-row>

          <b-row style=" margin:0px 10px 5px 10px; border-bottom: 1px dashed #ddd;" class="popupRemark">
            <b-col>
              <p><b style="font-size: 16px;">วันที่ปฏิบัติงาน :</b></p>
            </b-col>
            <b-col>
              <p style="font-size: 16px;"> {{ dataModal.workDate }} </p>
            </b-col>
          </b-row>

          <b-row style=" margin:0px 10px 5px 10px; border-bottom: 1px dashed #ddd;" class="popupRemark">
            <b-col>
              <p><b style="font-size: 16px;">ช่วงเวลาที่ทำ :</b></p>
            </b-col>
            <b-col>
              <p style="font-size: 16px;"> {{ dataModal.overtime_period_name }} </p>
            </b-col>
          </b-row>

          <b-row style=" margin:0px 10px 5px 10px; border-bottom: 1px dashed #ddd;" class="popupRemark">
            <b-col>
              <p><b style="font-size: 16px;">เวลาที่ทำงาน :</b></p>
            </b-col>
            <b-col>
              <p style="font-size: 16px;"> {{ dataModal.time }} </p>
            </b-col>
          </b-row>

          <b-row style=" margin:0px 10px 5px 10px; border-bottom: 1px dashed #ddd;" class="popupRemark">
            <b-col>
              <p><b style="font-size: 16px;">รายละเอียดงาน :</b></p>
            </b-col>
            <b-col>
              <p style="font-size: 16px;"> {{ dataModal.ot_remark }} </p>
            </b-col>
          </b-row>

          <b-row style=" margin:0px 10px 5px 10px; border-bottom: 1px dashed #ddd;" class="popupRemark">
            <b-col>
              <p><b style="font-size: 16px;">วันที่หัวหน้าอนุมัติ :</b></p>
            </b-col>
            <b-col>
              <p style="font-size: 16px;"> {{ dataModal.headApprove }} </p>
            </b-col>
          </b-row>

          <b-row style=" margin:0px 10px 5px 10px; border-bottom: 1px dashed #ddd;" class="popupRemark">
            <b-col>
              <p><b style="font-size: 16px;">วันที่หัวหน้ายืนยัน :</b></p>
            </b-col>
            <b-col>
              <p style="font-size: 16px;"> {{ dataModal.headConfirm }} </p>
            </b-col>
          </b-row>

        </div>
        <b-button block variant="secondary" style="font-size: 16px;" @click="hide('OTHrModal')">ปิด</b-button>
      </modal> 
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
import VueSuggestion from 'vue-suggestion'
import itemTemplate from '../components/ItemTemplate.vue';

Vue.use(Datetime,VueSweetalert2,VModal);
Vue.use(VueSuggestion);

export default {
  name: "OTHr",
  components: {
    datetime: Datetime
  },
  props: {},
  data() {
    return {
      optionStat: [
        { value: null ,text: "--เลือกสถานะ--"},
        { value: 1 ,text: "ผ่านการอนุมัติ"},
        { value: 2 ,text: "ไม่อนุมัติ"},
        { value: 3 ,text: "รอการอนุมัติ" },
        { value: 4 ,text: "ถูกยกเลิก" }
      ],
      tempData: [],
      itemTemplate,
      nameSearch:"",
      nameSearchArray: [],
      empName:[],
      items: [],
      optionsDep: [],
      optionLeaveType: [],
      fields: [
        { key: 'no',                label: 'ลำดับ', class: 'text-center no' },
        { key: 'createDate',        label: 'วันที่กรอก', class: 'text-center createDate' },
        { key: 'full_Name',         label: 'ชื่อ', class: 'text-center name' },
        { key: 'dept_name',         label: 'แผนก', class: 'text-center dept' },
        { key: 'position_name',     label: 'ตำแหน่ง', class: 'text-center position' },
        { key: 'workDate',          label: 'วันที่ปฏิบัติงาน', class: 'text-center workDate' },
        { key: 'headApprove',       label: 'หัวหน้ายืนยัน', class: 'text-center headApprove' },
        { key: 'status',            label: 'สถานะ', class: 'text-center status' },
        { key: 'leave_remark',      label: 'รายละเอียด', class: 'text-center leave_remark' },
      ],
      dataModal:{},
      checkPopup:'',
      isBusy: false,
      totalRows:1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [10, 20, 30],
      filter: null,
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      valDateStart: '',
      valDateStop: '',
      selectType: '',
      selectDep:'',
      selectStat: '',
      window : {
        width: 0,
        height: 0
      },
      currentDate: '',
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
  created(){
    window.addEventListener("resize", this.handleResize);
  },
  destroyed(){
    window.removeEventListener('resize', this.handleResize);
  },
  mounted() {
    this.getDataOtForHR();
    this.selectType = null;
    this.selectDep = null;
    this.selectStat = null;
    this.getDataReasonLeave();
    this.getDataDept();
    this.getDataAllUser();
  },
  methods: {
    show () {
      this.$modal.show('OTHrModal');
    },
    hide () {
      this.$modal.hide('OTHrModal');
    },
    handelLeaveSave(value) {
      if (value) {
        this.getDataOtForHR();   
      }
    },
    showLeavePopup: function(flag) {
      var ths = this;
      ths.showPopHeader = true;
      ths.checkPopup = flag;
      setTimeout(function() {
        ths.showPopHeader = false;
      }, 1000);
    },
    defaultValue() {
      this.valDateStart = "";
      this.valDateStop = "";
      this.selectStat = null;
      this.selectType = null;
      this.selectDep = null;
      this.getDataOtForHR();
    },
    itemSelected (nameSearch) {
        this.nameSearch = nameSearch;
    },
    setLabel (nameSearch) {
      return nameSearch.name;
    },
    inputChange (text) {
      this.nameSearchArray = this.empName.filter(function(v) { return v.name.toUpperCase().includes(text.toUpperCase()) } );
    },
    showMsgBoxTwo(id) {
        this.$bvModal.msgBoxConfirm('คุณต้องการรับทราบการทำงานครั้งนี้ใช่หรือไม่?', {
          title: 'รับทราบการทำงาน',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'danger',
          okTitle: 'รับทราบ',
          cancelTitle: 'ปิด',
          footerClass: 'p-2',
          hideHeaderClose: false,
          centered: true
        }).then(value => {
          if (value == true) {
            authService.approveOtHr(id).then(response => {
              this.getDataOtForHR();
            });
          } 
        })
    },
    filterData() {
      var ths = this;
      var allData = this.tempData;
      if (this.selectStat == null && this.selectType == null && this.selectDep == null && Object.keys(this.valDateStart).length <= 0 && Object.keys(this.valDateStop).length <= 0 && Object.keys(this.nameSearch).length <= 0 ) {
          this.getDataOtForHR();
      }
      if (this.nameSearch != null && this.nameSearch != "" ) {
        allData = allData.filter(function(v) {
          return v.emp_id == ths.nameSearch.value;
        })
      }
      this.items = allData;
      this.totalRows = this.items.length
    },
    getDataTypeOT: async function(){
      var dataType = [];
      await authService.getDataTypeOT().then(response => {
        console.log(response.data);
        if (response.data != null && response.data.length > 0) {
          dataType.push({ text: "--เลือกประเภทการปฏิบัติงาน	--", value: null, disabled: true})
          response.data.forEach(function (obj, i) {
            dataType.push({ text: obj.overtime_type_name, value: obj.overtime_type_id });
          });
          this.optionOtType = dataType;
        }
      });
    },
    getDataAllUser: async function(){
      var ths = this;
      var dataAllUser = [];
      var fullname = "";
      var result = {};
      await authService.getDataAllUser().then(response => {
        if(response.data != null && response.data.length > 0){
          response.data.forEach(function (obj, i){
            fullname = obj.first_name + " " + obj.last_name + " ("+ obj.nick_name + ")";
            result = {value: obj.emp_id, name: fullname}
            dataAllUser.push(result);
          });
          ths.nameSearchArray = dataAllUser;
          ths.empName = dataAllUser;
        }
      });
    },
    getDataDept: async function(){
      var dataDept = [];
      await authService.getDataDept().then(response => {
        if (response.data != null && response.data.length > 0) {
          dataDept.push({ text: "--กรุณาเลือกแผนก--", value: null, disabled: true})
          response.data.forEach(function (obj, i) {
            dataDept.push({ text: obj.dept_name,value: obj.dept_id });
          });
          this.optionsDep = dataDept;
        }
      });
    },
    getDataReasonLeave: async function(){
      var dataReason = [];
      await authService.getDataReasonLeave().then(response => {
        if (response.data != null && response.data.length > 0) {
          dataReason.push({ text: "--กรุณาเลือกประเภทการลา--", value: null, disabled: true})
          response.data.forEach(function (obj, i) {
            dataReason.push({ text: obj.leave_reason_name,value: obj.leave_reason_id });
          });
          this.optionLeaveType = dataReason;
        }
      });
    },
    getDataOtForHR: async function(){
    this.isBusy = true;
    await authService.getDataOtForHR().then(response => {
      if (response.data != null && response.data.length > 0) { 
        this.selectedFilter = null;
        for (var i = 0; i < response.data.length; i++) {
          response.data[i].no = i+1;
          response.data[i].full_Name = response.data[i].first_name + " " + response.data[i].last_name + " " + "(" + response.data[i].nick_name + ")";
          response.data[i].time = mJS.setDateFormat(response.data[i].overtime_start).split(" ")[1] + " - " + mJS.setDateFormat(response.data[i].overtime_end).split(" ")[1];
          response.data[i].createDate = mJS.setDateFormat(response.data[i].create_datetime);
          if (mJS.setDateFormat(response.data[i].overtime_start).split(" ")[0] !== mJS.setDateFormat(response.data[i].overtime_end).split(" ")[0]) {
            response.data[i].workDate = mJS.setDateFormat(response.data[i].overtime_start).split(" ")[0] + " - " + mJS.setDateFormat(response.data[i].overtime_end).split(" ")[0];
          }
          else {
            response.data[i].workDate = mJS.setDateFormat(response.data[i].overtime_start).split(" ")[0];
          }
          response.data[i].updateDate = mJS.setDateFormat(response.data[i].update_datetime);
          response.data[i].cancelDate = mJS.setDateFormat(response.data[i].cancel_date);
          response.data[i].headApprove = mJS.setDateFormat(response.data[i].head_approve_date);
          response.data[i].cancelHeadApprove = mJS.setDateFormat(response.data[i].cancel_header_date);
          response.data[i].headConfirm = mJS.setDateFormat(response.data[i].head_confirm_date);
          response.data[i].cancelHeadConfirm = mJS.setDateFormat(response.data[i].cancel_confirm_date);
        } 
        console.log(response.data)
        this.items = response.data;
        setTimeout(() => {
          this.isBusy = false
        },300);
      } else {
          setTimeout(() => {
            this.isBusy = false}, 1200);
          }
        });
      this.totalRows = this.items.length
    },
    handleResize: function() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
      if(this.window.width >= 1270){
        console.log("1200")
        this.fields = [
          { key: 'no',                label: 'ลำดับ', class: 'text-center no' },
          { key: 'create_datetime',   label: 'วันที่กรอก', class: 'text-center create_datetime' },
          { key: 'full_Name',         label: 'ชื่อ', class: 'text-center full_Name' },
          { key: 'dept_name',         label: 'แผนก', class: 'text-center dept_name' },
          { key: 'position_name',     label: 'ตำแหน่ง', class: 'text-center position' },
          { key: 'workDate',          label: 'วันที่ปฏิบัติงาน', class: 'text-center workDate' },
          { key: 'headApprove',       label: 'หัวหน้ายืนยัน', class: 'text-center headApprove' },
          { key: 'status',            label: 'สถานะ', class: 'text-center status' },
          { key: 'leave_remark',      label: 'รายละเอียด', class: 'text-center leave_remark' },
        ] 
      } else if(this.window.width < 1270 && this.window.width >= 1000){
        console.log("800")
        this.fields = [
          { key: 'no',                label: 'ลำดับ', class: 'text-center no' },
          { key: 'create_datetime',   label: 'วันที่กรอก', class: 'text-center create_datetime' },
          { key: 'full_Name',         label: 'ชื่อ', class: 'text-center full_Name'},
          { key: 'dept_name',         label: 'เเผนก', class: 'text-center dept_name' },
          { key: 'workDate',          label: 'วันที่ปฏิบัติงาน', class: 'text-center workDate' },
          { key: 'status',            label: 'สถานะ', class: 'text-center status' },
          { key: 'leave_remark',      label: 'รายละเอียด', class: 'text-center leave_remark' },
        ]
      } else if(this.window.width < 1000 && this.window.width >= 800){
        console.log("800")
        this.fields = [
          { key: 'no',                label: 'ลำดับ', class: 'text-center no' },
          { key: 'full_Name',         label: 'ชื่อ', class: 'text-center full_Name'},
          { key: 'dept_name',         label: 'เเผนก', class: 'text-center dept_name' },
          { key: 'workDate',          label: 'วันที่ปฏิบัติงาน', class: 'text-center workDate' },
          { key: 'status',            label: 'สถานะ', class: 'text-center status' },
          { key: 'leave_remark',      label: 'รายละเอียด', class: 'text-center leave_remark' },
        ]
      } else{
          this.fields = [
            { key: 'no',              label: 'ลำดับ', class: 'text-center no' },
            { key: 'full_Name',       label: 'ชื่อ', class: 'text-center full_Name'},
            { key: 'dept_name',       label: 'เเผนก', class: 'text-center dept_name' },
            { key: 'status',      label: 'สถานะ', class: 'text-center status' },
            { key: 'leave_remark',    label: 'รายละเอียด', class: 'text-center leave_remark' },
          ]
        }
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
  .close:hover {
    cursor: pointer;
  }
  #OTHr  .btn-secondary {
    font-size: 12px;
  }
  #OTHr  .vdatetime-input {
    padding-left:10px;
    width: 100%;
    height: 42px !important;
    font-size: 16px !important;
    border: 1px solid rgba(0,0,0,.2); 
    border-radius: 4px;
  }
  #OTHr .no {
    width : 65px !important;
  }
  #OTHr .full_Name {
    width : 280px !important;
  }
  #OTHr .position_name {
    width : 320px !important;
  }
  #OTHr .address {
    width : 400px !important;
  }
  #OTHr .mobile {
    width : 150px !important;
  }
  #OTHr .email {
    width : 300px !important;
  }
  #OTHr .leave_remark {
    width : 150px !important;
  }
  
  #OTHr .vs__input {
    padding-left:10px;
    font-family: Kanit, Arial, Helvetica, sans-serif !important;
    font-size: 16px;
    height:42px; 
    width: 100%;
    border: 1px solid rgba(0,0,0,.2); 
    border-radius: 4px;
  }
  #OTHr .popupRemark:hover {
    background-color:#f5f5f5;
  }
  #rowTable .row {
    margin-right: 15px;
    margin-left: 15px;
  }
</style>



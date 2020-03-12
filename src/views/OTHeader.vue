<template>
  <div id="OTHeader">
    <b-row>
      <div><br>
        <h2 style="font-weight: bold; margin-left:30px;">
          ข้อมูลการทำงานนอกเวลาของพนักงานในแผนก
        </h2>
      </div>
    </b-row>
    <b-row style="padding:0px 40px 0px 40px; width:100%;">
      <b-col sm="12" md="6" lg="2">
        <p style="cursor:default;"><b>วันที่ปฏิบัติงาน :</b></p>
        <datetime 
          type="date" 
          v-model="valDateStart" 
          format="dd/MM/yyyy" 
          :min-datetime="currentDate"
          placeholder="เลือกวันเพื่อค้นหา..."
          >
        </datetime>
      </b-col>
      <b-col sm="2">
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
      <b-col sm="12" md="6" lg="2">
        <p style="cursor:default;"><b>สถานะ :</b></p>
        <b-form-select
          v-model="selectStat"
          :options="optionStat"
          style="height:42px; cursor: pointer; border: 1px solid rgba(0,0,0,.2); border-radius: 4px;"
        >
        </b-form-select>
      </b-col>
      <b-col sm="2" style="margin-top:24px">
        <b-button
          variant="outline-primary"
          @click="filterData()"
          style="height:42px; width:127px; margin:0px 10px 10px 0px;"
        >
          ค้นหา
        </b-button>
      
        <b-button
          variant="outline-danger"
          @click="defaultValue()"
          style="height:42px; width:127px; margin:0px 0px 10px 0px" 
        >
            เคลียร์ข้อมูล
        </b-button>
      </b-col>
      <b-col lg="2" style="padding-top:24px">
        <vs-button
          @click="showLeavePopup(0)"
          color="primary"
          type="filled"
          style="height:42px; "
        >
          <img 
          src="../assets/Plus_icon3.png" 
          style="margin-top:-3px"
          width="20" 
          height="20" 
          /> เพิ่มการลาของพนักงาน
        </vs-button>
      </b-col>
    </b-row>
    <b-row style="padding:0px 30px 0px 30px;">
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

              <template v-slot:head()="data">
                <span style="font-size: 18px;">{{ data.label }}</span>
              </template>

              <template v-slot:empty>
                <h2 style="text-align:center;" color="#00000">ไม่มีข้อมูลพนักงาน</h2>
              </template>

              <template v-slot:cell(headApprove)="data">
                <center>
                  <div v-if="data.item.head_approve_date == null">
                    <p> - </p>
                  </div>
                  <div v-else-if="data.item.head_approve_date != null" >
                    <p> {{ data.item.headApprove }} </p>
                  </div>
                </center>
              </template>

              <template v-slot:cell(headConfirm)="data">
                <center>
                  <div v-if="data.item.head_confirm_date == null">
                    <p> - </p>
                  </div>
                  <div v-else-if="data.item.head_confirm_date != null" >
                    <p> {{ data.item.headConfirm }} </p>
                  </div>
                </center>
              </template>

              <template v-slot:cell(status)="data">
                <center>
                <div v-if="data.item.head_approve_date != null && data.item.cancel_header_date == null">
                  <p style="width:115px;height:28px; cursor: default; border-radius: 4px; background-color: rgb(54,215,183);"> 
                    <font color="#ffffff">ผ่านการอนุมัติ</font>
                  </p>
                </div>
                <div v-else-if="data.item.cancel_header_date != null">
                  <p style="width:115px;height:28px; cursor: default; border-radius: 4px; background-color: rgb(226,106,106);"> 
                    <font color="#ffffff">ไม่อนุมัติ</font>
                  </p>
                </div>
                <div v-else-if="data.item.cancel_date != null">
                  <b-badge variant="warning"></b-badge>
                    <p style="width:115px;height:28px; cursor: default; border-radius: 4px; background-color: rgba(240, 52, 52, 1);"> 
                      <font color="#ffffff">ถูกยกเลิก</font>
                    </p>
                </div>
                <div v-else-if="data.item.head_approve_date == null && data.item.cancel_header_date == null">
                  <b-badge variant="warning"></b-badge>
                  <button v-if="!data.item.HeaderbtnApprove" @click="ApproveOT(data.item.overtime_id)" style="width:115px;height:28px; cursor: pointer; border-radius: 4px; background-color: rgb(245,201,71);"> 
                    <font color="#00000" >รอการอนุมัติ</font>
                  </button>
                </div>
                </center>
              </template>

             <template v-slot:cell(confirm)="data">
                <center>
                <div v-if="data.item.head_approve_date != null && data.item.cancel_header_date == null && data.item.head_confirm_date != null && data.item.cancel_confirm_date == null">
                  <p style="width:115px;height:28px; cursor: default; border-radius: 4px; background-color: rgb(54,215,183);"> 
                    <font color="#ffffff">ผ่านการยืนยัน</font>
                  </p>
                </div>
                <div v-else-if="data.item.cancel_header_date != null">
                  <p style="width:115px;height:28px; cursor: default; border-radius: 4px; background-color: rgb(226,106,106);"> 
                    <font color="#ffffff">ไม่ยืนยัน</font>
                  </p>
                </div>
                <div v-else-if="data.item.cancel_header_date == null && data.item.cancel_confirm_date != null">
                  <p style="width:115px;height:28px; cursor: default; border-radius: 4px; background-color: rgb(226,106,106);"> 
                    <font color="#ffffff">ไม่ยืนยัน</font>
                  </p>
                </div>
                <div v-else-if="data.item.cancel_date != null">
                  <b-badge variant="warning"></b-badge>
                    <p style="width:115px;height:28px; cursor: default; border-radius: 4px; background-color: rgba(240, 52, 52, 1);"> 
                      <font color="#ffffff">ถูกยกเลิก</font>
                    </p>
                </div>
                <div v-else-if="data.item.head_approve_date == null && data.item.cancel_header_date == null">
                  <p style="width:115px;height:28px; cursor: pointer; border-radius: 4px; background-color: rgb(245,201,71);"> 
                    <font color="#ffffff">ยังไม่อนุมัติ</font>
                  </p>
                </div>
                <div v-else-if="data.item.head_approve_date != null && data.item.cancel_header_date == null && data.item.head_confirm_date == null && data.item.cancel_confirm_date == null">
                  <b-badge variant="warning"></b-badge>
                  <button v-if="!data.item.HeaderbtnApprove" @click="confirmOT(data.item.overtime_id)" style="width:115px;height:28px; cursor: pointer; border-radius: 4px; background-color: rgb(245,201,71);"> 
                    <font color="#00000" >รอการยืนยัน</font>
                  </button>
                </div>
                </center>
              </template>

              <template v-slot:cell(leave_remark)="data">
                <div>
                  <img 
                    src="../assets/Details.png" 
                    style="cursor: pointer" 
                    width="33" 
                    height="33"  
                    @click="dataModal = data.item, show('OTHeaderModal')"
                  >
                </div>
              </template>
            </b-table>
          </div>
        </table>
    </b-row>
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
        name="OTHeaderModal" 
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
              <p><b style="font-size: 16px;">ตำแหน่ง :</b></p>
            </b-col>
            <b-col>
              <p style="font-size: 16px;"> {{ dataModal.dept_name }} </p>
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
          
          <b-row>
          <!-- <b-col style="text-align: center; margin:10px -80px 0px 0px">
            <button style="width:145px; height:28px; cursor: pointer; border: 2px solid rgb(213, 217, 13); border-radius: 4px; background-color: rgba(255, 255, 126, 1);"> 
              <font color="#00000" style="font-size: 16px">แก้ไขงาน</font>
            </button>
          </b-col> -->
          <b-col style="text-align: center; margin-top:10px">
            <button v-if="dataModal.head_approve_date != null && dataModal.head_remark == null && dataModal.cancel_header_date == null" @click="cancelBtn(dataModal.overtime_id)" style="width:145px; height:28px; cursor: pointer; border: 2px solid rgb(255, 112, 77); border-radius: 4px; background-color: rgb(255, 133, 102);"> 
              <font color="#fffff" style="font-size: 16px">ยกเลิกงาน</font>
            </button>
          </b-col>
        </b-row>

        </div>
        <b-button block variant="secondary" style="font-size: 16px;" @click="hide('OTHeaderModal')">ปิด</b-button>
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
import popupLeaveHeaderHr from "@/components/popupLeaveHeaderHr.vue"
import VueSuggestion from 'vue-suggestion'
import itemTemplate from '../components/ItemTemplate.vue';

Vue.use(Datetime,VueSweetalert2,VModal);
Vue.use(VueSuggestion);

export default {
  name: "OTHeader",
  components: {
    datetime: Datetime,
    popupLeaveHeaderHr
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
        { key: 'headApprove',       label: 'หัวหน้าอนุมัติ', class: 'text-center headApprove' },
        { key: 'headConfirm',       label: 'หัวหน้ายืนยัน', class: 'text-center headConfirm' },
        { key: 'status',            label: 'สถานะ', class: 'text-center status' },
        { key: 'confirm',           label: 'ยืนยัน', class: 'text-center confirm' },
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
      showPopHeader:false,
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
    this.getDataOtForHeader();
    this.selectType = null;
    this.selectDep = null;
    this.selectStat = null;
    this.getDataReasonLeave();
    this.getDataDept();
    this.getDataAllUser();
  },
  methods: {
    show () {
      this.$modal.show('OTHeaderModal');
    },
    hide () {
      this.$modal.hide('OTHeaderModal');
    },
    handelLeaveSave(value) {
      if (value) {
        this.getDataOtForHeader();   
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
      this.getDataOtForHeader();
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
    cancelBtn(cancel){
      this.$bvModal.msgBoxConfirm('คุณต้องการยกเลิกการทำงานนี้ใช่หรือไม่?', {
          headerClass: 'header-1',
          title: 'ยกเลิกการขอทำงาน',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'danger',
          okTitle: 'ใช่',
          cancelTitle: 'ไม่',
          footerClass: 'p-2',
          hideHeaderClose: false,
          centered: true
        }).then(value => {
          if (value == true) {
            authService.cancelOT(cancel).then(response => {
              this.getDataOtForHeader();
              this.hide('OTHeaderModal');
            });
          } 
      })
    },
    ApproveOT(id) {
      this.$bvModal.msgBoxConfirm('คุณต้องการอนุมัติการทำงานนี้ใช่หรือไม่?', {
        headerClass: 'header-1',
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
        if (value == true) {
          authService.ApproveOTHeader(id).then(response => {
            this.getDataOtForHeader();
          });
        } else if (value == false) {
            this.notApproveOT(id);
        }
      })
    },
    notApproveOT(id) {
      const h = this.$createElement
      const titleVNode = h('div', { domProps: { innerHTML: 'สาเหตุที่ไม่อนุมัติ' } })
      const messageVNode = h('div', { class: ['foobar'] }, [
        h('b-form-textarea', { class: ['textarea-large'] })
      ])
      this.$bvModal.msgBoxConfirm([messageVNode], {
        title: [titleVNode],
        buttonSize: 'sm',
        centered: true, size: 'sm'
      }).then(value => {
        if(value == true){
          authService.NotApproveOTHeader(messageVNode.children[0].elm.value, id).then(response => {
            this.getDataOtForHeader();
          });
        }
      });
    },
    confirmOT(id) {
      this.$bvModal.msgBoxConfirm('คุณต้องการยืนยันการทำงานนี้ใช่หรือไม่?', {
        headerClass: 'header-1',
        title: 'การอนุมัติ',
        size: 'sm',
        buttonSize: 'sm',
        okVariant: 'danger',
        okTitle: 'ยืนยัน',
        cancelTitle: 'ไม่ยืนยัน',
        footerClass: 'p-2',
        hideHeaderClose: false,
        centered: true
      }).then(value => {
        if (value == true) {
          authService.ConfirmOTHeader(id).then(response => {
            this.getDataOtForHeader();
          });
        } else if (value == false) {
            this.notConfirmOT(id);
        }
      })
    },
    notConfirmOT(id) {
      const h = this.$createElement
      const titleVNode = h('div', { domProps: { innerHTML: 'สาเหตุที่ไม่ยืนยัน' } })
      const messageVNode = h('div', { class: ['foobar'] }, [
        h('b-form-textarea', { class: ['textarea-large'] })
      ])
      this.$bvModal.msgBoxConfirm([messageVNode], {
        title: [titleVNode],
        buttonSize: 'sm',
        centered: true, size: 'sm'
      }).then(value => {
        if(value == true){
          authService.NotConfirmOTHeader(messageVNode.children[0].elm.value, id).then(response => {
            this.getDataOtForHeader();
          });
        }
      });
    },
    filterData() {
      var ths = this;
      var allData = this.tempData;
      if (this.selectStat == null && this.selectType == null && this.selectDep == null && Object.keys(this.valDateStart).length <= 0 && Object.keys(this.valDateStop).length <= 0 && Object.keys(this.nameSearch).length <= 0 ) {
          this.getDataOtForHeader();
      }
      if (this.nameSearch != null && this.nameSearch != "" ) {
        allData = allData.filter(function(v) {
          return v.emp_id == ths.nameSearch.value;
        })
      }
      this.items = allData;
      this.totalRows = this.items.length
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
    getDataOtForHeader: async function(){
    this.isBusy = true;
    var user = JSON.parse(localStorage.getItem("user"));
    await authService.getDataOtForHeader(user.dept_id).then(response => {
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
          { key: 'createDate',        label: 'วันที่กรอก', class: 'text-center createDate' },
          { key: 'full_Name',         label: 'ชื่อ', class: 'text-center name' },
          { key: 'dept_name',         label: 'แผนก', class: 'text-center dept' },
          { key: 'position_name',     label: 'ตำแหน่ง', class: 'text-center position' },
          { key: 'workDate',          label: 'วันที่ปฏิบัติงาน', class: 'text-center workDate' },
          { key: 'headApprove',       label: 'หัวหน้ายืนยัน', class: 'text-center headApprove' },
          { key: 'headConfirm',       label: 'หัวหน้ายืนยัน', class: 'text-center headConfirm' },
          { key: 'status',            label: 'การอนุมัติ', class: 'text-center status' },
          { key: 'confirm',           label: 'การยืนยัน', class: 'text-center confirm' },
          { key: 'leave_remark',      label: 'รายละเอียด', class: 'text-center leave_remark' },
        ] 
      } else if(this.window.width < 1270 && this.window.width >= 1000){
        console.log("800")
        this.fields = [
          { key: 'no',                label: 'ลำดับ', class: 'text-center no' },
          { key: 'createDate',        label: 'วันที่กรอก', class: 'text-center createDate' },
          { key: 'full_Name',         label: 'ชื่อ', class: 'text-center full_Name'},
          { key: 'position_name',     label: 'ตำแหน่ง', class: 'text-center position' },
          { key: 'workDate',          label: 'วันที่ปฏิบัติงาน', class: 'text-center workDate' },
          { key: 'status',            label: 'การอนุมัติ', class: 'text-center status' },
          { key: 'confirm',           label: 'การยืนยัน', class: 'text-center confirm' },
          { key: 'leave_remark',      label: 'รายละเอียด', class: 'text-center leave_remark' },
        ]
      } else if(this.window.width < 1000 && this.window.width >= 800){
        console.log("800")
        this.fields = [
          { key: 'no',                label: 'ลำดับ', class: 'text-center no' },
          { key: 'full_Name',         label: 'ชื่อ', class: 'text-center full_Name'},
          { key: 'position_name',     label: 'ตำแหน่ง', class: 'text-center position' },
          { key: 'workDate',          label: 'วันที่ปฏิบัติงาน', class: 'text-center workDate' },
          { key: 'status',            label: 'การอนุมัติ', class: 'text-center status' },
          { key: 'confirm',           label: 'การยืนยัน', class: 'text-center confirm' },
          { key: 'leave_remark',      label: 'รายละเอียด', class: 'text-center leave_remark' },
        ]
      } else{
          this.fields = [
            { key: 'no',              label: 'ลำดับ', class: 'text-center no' },
            { key: 'full_Name',       label: 'ชื่อ', class: 'text-center full_Name'},
            { key: 'position_name',   label: 'ตำแหน่ง', class: 'text-center position' },
            { key: 'status',          label: 'การอนุมัติ', class: 'text-center status' },
            { key: 'confirm',         label: 'การยืนยัน', class: 'text-center confirm' },
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
  #OTHeader .btn-secondary {
    font-size: 12px;
  }
  #OTHeader .vdatetime-input {
    padding-left:10px;
    width: 100%;
    height: 42px !important;
    font-size: 16px !important;
    border: 1px solid rgba(0,0,0,.2); 
    border-radius: 4px;
  }
  #OTHeader .no {
    width : 65px !important;
  }
  #OTHeader .full_Name {
    width : 280px !important;
  }
  #OTHeader .position_name {
    width : 320px !important;
  }
  #OTHeader .address {
    width : 400px !important;
  }
  #OTHeader .mobile {
    width : 150px !important;
  }
  #OTHeader .email {
    width : 300px !important;
  }
  #OTHeader .leave_remark {
    width : 150px !important;
  }
  
  #OTHeader .vs__input {
    padding-left:10px;
    font-family: Kanit, Arial, Helvetica, sans-serif !important;
    font-size: 16px;
    height:42px; 
    width: 100%;
    border: 1px solid rgba(0,0,0,.2); 
    border-radius: 4px;
  }
  #OTHeader .popupRemark:hover {
    background-color:#f5f5f5;
  }
</style>



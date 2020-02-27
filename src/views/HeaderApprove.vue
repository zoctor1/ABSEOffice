<template>
  <div id="HeaderApprove" lg="12" sm="12" xs="12">
    <popupLeaveHeaderHr v-bind:showPopHeader="showPopHeader" @leaveSuccess="handelLeaveSave" v-bind:checkPopup="checkPopup"/>
    <!-- {{window}} -->
    <center>
      <div><br>
        <b-col lg="12" sm="12" xs="12">
          <h2 style="text-align: left; font-weight: bold;">
            คำขออนุมัติการลางาน
          </h2>
          <div style="text-align:left;">
            <b-row style="margin:10px 0px 0px 10px; width:100%">
              <b-col md="12" lg="2">
                <p style="cursor:default;"><b>ขอลางานในวันที่ :</b></p>
                <datetime
                  type="date" 
                  v-model="valDateStart" 
                  format="dd/MM/yyyy" 
                  :min-datetime="currentDate"
                  >
                </datetime>
              </b-col>
              <b-col md="12" lg="2">
                <p style="cursor:default;"><b>ลางานถึงวันที่ :</b></p>
                <datetime 
                  type="date"
                  v-model="valDateStop" 
                  format="dd/MM/yyyy" 
                  :min-datetime="currentDate" 
                  >
                </datetime>
              </b-col>
              <b-col md="12" lg="2">
                <p style="cursor:default;"><b>ประเภทการลา :</b></p>
                <b-form-select
                  v-model="selectType"
                  :options="optionLeaveType"
                  style="height:42px; cursor: pointer; border: 1px solid rgba(0,0,0,.2); border-radius: 4px;"
                >
                </b-form-select>
                
              </b-col>
              <b-col md="12" lg="2">
                
              </b-col>
            </b-row>
            <b-row style="margin:0px 0px 10px 10px; width:100%">
              <b-col md="6" lg="2">
                <p style="cursor:default;"><b>สถานะ :</b></p>
                <b-form-select
                  v-model="selectStat"
                  :options="optionStat"
                  style="height:42px; cursor: pointer; border: 1px solid rgba(0,0,0,.2); border-radius: 4px;"
                >
                </b-form-select>
              </b-col>
              <b-col md="6" lg="2">
                <p style="cursor:default;"><b>ชื่อ-นามสกุล :</b></p>
                  <vue-suggestion 
                    :items="sizes" 
                    v-model="size"
                    :setLabel="setLabel"
                    :itemTemplate="itemTemplate"
                    @changed="inputChange"
                    @selected="itemSelected"
                  >
                  </vue-suggestion> 
                  
                  <!-- <b-form-input  
                    list="my-list-id" 
                    style="height:42px; cursor: pointer; border: 1px solid rgba(0,0,0,.2); border-radius: 4px;"
                    >
                  </b-form-input> -->

                  
                <!-- <p style="cursor:default;"><b>ค้นหาชื่อ :</b></p>
                  <b-form-group
                    label-align ="left"
                    label-size="md"
                    label-for="filterInput"
                    class="mb-0"
                  >
                    <b-input-group size="md">
                      <b-form-input
                        v-model="filter"
                        type="search"
                        id="filterInput"
                        placeholder="พิมพ์ชื่อเพื่อค้นหา..."
                        style="height:42px; border: 1px solid rgba(0,0,0,.2); border-radius: 4px;"
                      ></b-form-input>
                    </b-input-group>
                  </b-form-group> -->
              </b-col>

              <b-col md="12" lg="2" style="padding-top:24px">
                <b-button
                  variant="outline-primary"
                  @click="filterData()"
                  style="height:42px; width:135px; margin:0px 10px 10px 0px;"
                >
                  ค้นหา
                </b-button>
                
                <b-button
                  variant="outline-danger"
                  @click="defaultValue()"
                  style="height:42px; width:135px; margin:0px 0px 10px 0px" 
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
          </div>

            <table width=100% style="margin-top:10px; border: 1px solid black;">
              <div >
                <b-table
                  responsive
                  :busy="isBusy"
                  striped hover 
                  :items="itemHeader"
                  :fields="fieldHeader"
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
                    <h2 style="text-align:center;" color="#00000">ไม่มีข้อมูลการลา</h2>
                  </template>

                  <template v-slot:head()="data">
                      <span style="font-size: 18px;">{{ data.label }}</span>
                  </template>
                  
                  <template v-slot:cell(full_Name)="data">
                    <div style="cursor: pointer" @click="dataModal = data.item, show('popupDataUser')">
                      {{data.item.full_Name}}
                    </div>
                  </template>

                  <template v-slot:cell(leave_remark)="data">
                    <div>
                      <img 
                        src="../assets/Details.png" 
                        style="cursor: pointer" 
                        width="33" 
                        height="33"  
                        @click="dataModal = data.item, show('remarkModal')"
                      >
                    </div>
                  </template>
                  
                  <template v-slot:cell(leave_time)="data">
                    <center>
                      <div v-if="data.item.leave_type_id == 4">
                          <p style="width:115px;height:28px; cursor: default; border-radius: 4px; background-color: rgba(255, 148, 120, 1);"> 
                            {{ data.item.leave_time }}
                          </p>
                      </div>
                      <div v-else-if="data.item.leave_type_id == 3" >
                          <p style="width:115px;height:28px; cursor: default; border-radius: 4px; background-color: rgba(129, 207, 224, 1);"> 
                            {{ data.item.leave_type_name }} 
                          </p>
                      </div>
                      <div v-else-if="data.item.leave_type_id == 2" >
                          <p style="width:115px;height:28px; cursor: default; border-radius: 4px; background-color: rgba(252, 214, 112, 1);">
                            {{ data.item.leave_type_name }} 
                          </p>
                      </div>
                      <div v-else-if="data.item.leave_type_id == 1" >
                          <p style="width:115px;height:28px; cursor: default; border-radius: 4px; background-color: rgba(255, 255, 126, 1);"> 
                            {{ data.item.leave_type_name }} 
                          </p>
                      </div>
                    </center>
                  </template>

                  <template v-slot:cell(head_approve_date_format)="data">
                    <center>
                    <div v-if="data.item.cancel_header_date != null">
                      <font>{{data.item.cancel_header_date_format}}</font>
                    </div>
                    <div v-else-if="data.item.cancel_date != null && data.item.cancel_header_date == null">
                      <font>{{data.item.cancel_date_format}}</font>
                    </div>
                    <div v-else-if="data.item.cancel_header_date == null && data.item.head_approve_date == null">
                      <font > - </font>
                    </div>
                    <div v-else-if="data.item.cancel_header_date == null && data.item.head_approve_date != null">
                      <font>{{data.item.head_approve_date_format}}</font>
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
                    <div v-else-if="data.item.head_approve_date == null && data.item.hr_approve_date == null && data.item.cancel_header_date == null && data.item.emp_leave_id != null">
                      <b-badge variant="warning"></b-badge>
                      <button v-if="!data.item.HeaderbtnApprove" @click="showMsgBoxTwo(data.item.emp_leave_id)" style="width:115px;height:28px; cursor: pointer; border-radius: 4px; background-color: rgb(245,201,71);"> 
                          <font color="#00000" >รอการอนุมัติ</font>
                      </button>
                    </div>
                    <div v-else-if="data.item.head_approve_date == null && data.item.hr_approve_date != null && data.item.cancel_header_date == null && data.item.emp_leave_id != null">
                      <b-badge variant="warning"></b-badge>
                      <button v-if="!data.item.HeaderbtnApprove" @click="showMsgBoxTwo(data.item.emp_leave_id)" style="width:115px;height:28px; cursor: pointer; border-radius: 4px; background-color: rgb(245,201,71);"> 
                          <font color="#00000" >รอการอนุมัติ</font>
                      </button>
                    </div>
                    </center>
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

    <modal 
        name="remarkModal" 
        :clickToClose="false"
        height="auto"
        width="400px"
      >
      <p style="background-color: #f1f1f1; font-size: 20px; text-align: center; margin-bottom:10px; font-weight:bold; padding: 10px 10px 10px 20px; cursor:default;">
        รายละเอียดการลา 
      </p>
      <div style="padding-bottom:15px;">
        
        <b-row style=" margin:0px 10px 5px 10px; border-bottom: 1px dashed #ddd;" class="popupRemark">
          <b-col>
            <p><b style="font-size: 16px;">ประเภทการลา :</b></p>
          </b-col>
          <b-col>
            <p style="font-size: 16px;">{{dataModal.leave_reason_name}}</p>
          </b-col>
        </b-row>

        <b-row style=" margin:0px 10px 5px 10px; border-bottom: 1px dashed #ddd;" class="popupRemark">
          <b-col>
            <p><b style="font-size: 16px;">ช่วงเวลา :</b></p>
          </b-col>
          <b-col v-if="dataModal.leave_type_id == 4">
            <p style="font-size: 16px;">{{ dataModal.leave_time }}</p>
          </b-col>
          <b-col v-else>
            <p style="font-size: 16px;">{{ dataModal.leave_type_name }}</p>
          </b-col>
        </b-row>

        <b-row style=" margin:0px 10px 5px 10px; border-bottom: 1px dashed #ddd;" class="popupRemark">
          <b-col>
            <p><b style="font-size: 16px;">วันที่ลา :</b></p>
          </b-col>
          <b-col>
            <p style="font-size: 16px;">{{dataModal.leave_start_date_format}}</p>
          </b-col>
        </b-row>

        <b-row style=" margin:0px 10px 5px 10px; border-bottom: 1px dashed #ddd;" class="popupRemark">
          <b-col>
            <p><b style="font-size: 16px;">ลาถึงวันที่ :</b></p>
          </b-col>
          <b-col>
            <p style="font-size: 16px;">{{dataModal.leave_stop_date_format}}</p>
          </b-col>
        </b-row>

        <b-row style=" margin:0px 10px 5px 10px; border-bottom: 1px dashed #ddd;" class="popupRemark">
          <b-col>
            <p><b style="font-size: 16px;">วันที่กรอกข้อมูล :</b></p>
          </b-col>
          <b-col>
            <p style="font-size: 16px;">{{dataModal.leave_date_format}}</p>
          </b-col>
        </b-row>

        <b-row v-if="dataModal.modify_date != null" style=" margin:0px 10px 5px 10px; border-bottom: 1px dashed #ddd;" class="popupRemark">
          <b-col>
            <p style="font-size: 16px;"><b>วันที่เเก้ไขข้อมูลการลาล่าสุด :</b></p>
          </b-col>  
          <b-col>
            <p style="font-size: 16px;"> {{ dataModal.modify_date_format }} </p>
          </b-col>
        </b-row>  

       <b-row style=" margin:0px 10px 5px 10px; border-bottom: 1px dashed #ddd;" class="popupRemark">
          <b-col>
            <p style="font-size: 16px;"><b>วันที่หัวหน้าอนุมัติ :</b></p>
          </b-col>  
          <b-col>
            <p v-if="dataModal.cancel_date != null"> - </p>
            <p v-if="dataModal.head_approve_date != null && dataModal.head_remark == null" style="font-size: 16px;">
              {{ dataModal.head_approve_date_format }} 
            </p>
            <p v-else-if="dataModal.cancel_header_date != null  && dataModal.head_remark != null" style="font-size: 16px;">
              ไม่อนุมัติ ({{ dataModal.cancel_header_date_format }} )
            </p>
            <p v-else-if="dataModal.head_approve_date == null && dataModal.cancel_header_date == null && dataModal.cancel_date == null" style="font-size: 16px;">
              รอการอนุมัติ 
            </p>
            <p v-else-if="dataModal.cancel_header_date == null && dataModal.cancel_date == null" style="font-size: 16px;">
              รอการอนุมัติ 
            </p>
          </b-col>
        </b-row>  

         <b-row v-if="dataModal.cancel_header_date != null && dataModal.head_remark != null" style=" margin:0px 10px 5px 10px; border-bottom: 1px dashed #ddd;" class="popupRemark">
          <b-col>
            <p style="font-size: 16px;"><b>เหตุผลที่หัวหน้าไม่อนุมัติ :</b></p>
          </b-col>  
          <b-col>
            <p style="font-size: 16px;">
              {{ dataModal.head_remark }}
            </p>
           
          </b-col>
        </b-row>  

        <b-row style=" margin:0px 10px 5px 10px; border-bottom: 1px dashed #ddd;" class="popupRemark">
          <b-col>
            <p style="font-size: 16px;"><b>วันที่ฝ่ายบุคคลรับทราบ :</b></p>
          </b-col>  
          <b-col>
            <p v-if="dataModal.cancel_date != null" style="font-size: 16px;"> - </p>
            <p v-else-if="dataModal.hr_approve_date != null" style="font-size: 16px;"> {{dataModal.hr_approve_date_format}} </p>
            <p v-else-if="dataModal.head_approve_date == null && dataModal.cancel_date == null" style="font-size: 16px;"> - </p>
            <p v-else-if="dataModal.hr_approve_date == null && dataModal.cancel_date == null" style="font-size: 16px;"> - </p>
          </b-col>
        </b-row>

        <b-row v-if="dataModal.cancel_date != null" style=" margin:0px 10px 5px 10px; border-bottom: 1px dashed #ddd;" class="popupRemark">
          <b-col>
            <p><b style="font-size: 16px;">ยกเลิกเมื่อ :</b></p>
          </b-col>
          <b-col>
            <p style="font-size: 16px;">{{dataModal.cancel_date_format}}</p>
          </b-col>
        </b-row>
        
        <b-row style=" margin:0px 10px 5px 10px; border-bottom: 1px dashed #ddd;" class="popupRemark">
          <b-col>
            <p><b style="font-size: 16px;">รายละเอียดการลา :</b></p>
          </b-col>
          <b-col>
            <p style="font-size: 16px;">{{dataModal.leave_remark}}</p>
          </b-col>
        </b-row>
      </div>
      <b-button block variant="secondary" style="font-size: 16px" @click="hide('remarkModal')">ปิด</b-button>
    </modal>


    <modal 
      name="popupDataUser" 
      :clickToClose="false"
      height="700"
      width="800"
    >
      <p style="background-color: #f1f1f1; font-size: 20px; text-align: center; margin-bottom:10px; font-weight:bold; padding: 10px 10px 10px 20px; cursor:default;">
        ข้อมูลการลา 
      </p>
      <b-button block variant="secondary" style="font-size: 16px" @click="hide('popupDataUser')">ปิด</b-button>
        <table width=100% style="margin-top:10px; border: 1px solid black;">
          <div>
            <b-table
              responsive
              striped hover 
              :items="itemHeader"
              :fields="fieldHeader"
              :current-page="currentPage"
              :per-page="perPage"
              :sort-by.sync="sortBy"
              :sort-desc.sync="sortDesc"
              :sort-direction="sortDirection"
              @filtered="onFiltered" 
              show-empty
            > 
            </b-table>
          </div>
        </table>
    </modal>
  </div>
</template>

<script>
import Vue from 'vue'
import * as mJS from "../assets/js/mainJS"
import * as authService from '@/services/auth.service';
import { Datetime } from 'vue-datetime' // npm install --save luxon vue-datetime weekstart
import 'vue-datetime/dist/vue-datetime.css'
import { Settings } from 'luxon'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'
import VModal from 'vue-js-modal'
import popupLeaveHeaderHr from "@/components/popupLeaveHeaderHr.vue"
import VueSuggestion from 'vue-suggestion'
import itemTemplate from '../components/ItemTemplate.vue';

Vue.use(VueSuggestion);

export default {
  name: "HeaderApprove",
  components: {
    datetime: Datetime,
    popupLeaveHeaderHr
  },
  props: {},
  data() {
    return {
      itemTemplate,
      size:{},
      sizes: [],
      empName:[],
      tempData: [],
      optionStat: [
        { value: null ,text: "--เลือกสถานะ--"},
        { value: 1 ,text: "ผ่านการอนุมัติ"},
        { value: 2 ,text: "ไม่อนุมัติ"},
        { value: 3 ,text: "รอการอนุมัติ" },
        { value: 4 ,text: "ถูกยกเลิก" }
      ],
      optionLeaveType: [],
      itemHeader: [],
      fieldHeader: [
        { key: 'no', label: 'ลำดับ', class: 'text-center no' },
        { key: 'leave_date_format', label: 'วันที่กรอก', class: 'text-center leave_date' },
        { key: 'full_Name', label: 'ชื่อ', class: 'text-center full_Name' },
        // { key: 'dept_name', label: 'เเผนก', class: 'text-center dept_name' },
        { key: 'position_name', label: 'ตำแหน่ง', class: 'text-center position_name' },
        { key: 'leave_reason_name', label: 'รายละเอียดเวลา', class: 'text-center leave_reason_name' },
        // { key: 'leave_start_date', label: 'วันที่ลา', class: 'text-center leave_start_date' },
        // { key: 'leave_stop_date', label: 'ลาถึงวันที่', class: 'text-center leave_stop_date' },
        { key: 'leave_time', label: 'เวลา', class: 'text-center leave_time' },
        { key: 'head_approve_date_format', label: 'วันที่หัวหน้าอนุมัติ', class: 'text-center head_approve_date' },
        // { key: 'hr_approve_date', label: 'วันที่ Hr รับทราบ', class: 'text-center hr_approve_date' },
        { key: 'status', label: 'สถานะ', class: 'text-center status' },
        { key: 'leave_remark', label: 'รายละเอียดการลา', class: 'text-center leave_remark' },
      ],
      dataModal:{},
      selectedFilter: "",
      optionsLeave: "",
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
      valDateStart: '',
      valDateStop: '',
      selectType: '',
      selectDep:'',
      selectStat: '',
      currentDate: '',
      showPopHeader:false,
      window : {
        width: 0,
        height: 0
      },
      checkPopup:''
    }
  },
  computed: {
    sortOptions() {
      return this.fieldHeader
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
    this.getHeaderApprove();
    this.selectType = null;
    this.selectDep = null;
    this.selectStat = null;
    this.getDataUserDept();
    this.getDataReasonLeave();
    this.getDataUserDept();
  },
  methods: {
      handelLeaveSave(value) {
        if (value) {
          this.getHeaderApprove();   
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
        this.getHeaderApprove();
      },
      show (name) {
        this.$modal.show(name);
      },
      hide (name) {
        this.$modal.hide(name);
      },
      itemSelected (size) {
        this.size = size;
      },
      setLabel (size) {
        return size.name;
      },
      inputChange (text) {
        this.sizes = this.empName.filter(function(v) { return v.name.toUpperCase().includes(text.toUpperCase()) } );
      },
      filterData() {
        var ths = this;
        var allData = this.tempData;
        this.isBusy = true;
          if (this.selectStat == null && this.selectType == null && this.selectDep == null && this.sizes == null) {
            ths.getHeaderApprove();
          }
          else if (this.valDateStart != null && this.valDateStart != "") {
          }
          else if(this.valDateStop != null && this.valDateStop != "" && this.valDateStart != null && this.valDateStart != "") {
          }
          else if (this.selectStat != null && this.selectStat != "") {
            if (this.selectStat == 1) {
              allData = allData.filter(function(v) {
                return v.head_approve_date != null && v.hr_approve_date != null && v.cancel_header_date == null;
              });
            } else if (this.selectStat == 2) {
              allData = allData.filter(function(v) {
                return v.cancel_header_date != null;
              });
            }  else if (this.selectStat == 3) {
              allData = allData.filter(function(v) {
                return v.head_approve_date == null && v.hr_approve_date == null && v.cancel_header_date == null && v.emp_leave_id != null && v.cancel_date == null;
              });
            } else if (this.selectStat == 4) {
              allData = allData.filter(function(v) {
                return v.cancel_date != null;
              }); 
            }
          }
          else if(this.selectType != null && this.selectType != "" && this.selectType != undefined) {
            allData = allData.filter(function(v) {
              return v.leave_reason_id == ths.selectType;
            })
          }
          else if(this.selectDep != null && this.selectDep != "" && this.selectDep != undefined) {
            allData = allData.filter(function(v) {
              return v.dept_id == ths.selectDep;
            })
          }
          else if(this.size != null && this.size != "" && this.size != undefined) {
            allData = allData.filter(function(v) {
              return v.value == ths.size;
            })
          }
          this.itemHeader = allData;
          this.totalRows = this.itemHeader.length
          setTimeout(() => {
            this.isBusy = false
          },300);
      },
      showMsgBoxTwo(id) {
        this.$bvModal.msgBoxConfirm('คุณต้องการอนุมัติการลานี้ใช่หรือไม่?', {
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
            authService.postApproveHead(id).then(response => {
              this.getHeaderApprove();
            });
          } else if (value == false) {
              this.showMsgOk(id);
          }
        })
      },
      showMsgOk(id) {
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
            authService.notApproveHead(id, messageVNode.children[0].elm.value).then(response => {
              this.getHeaderApprove();
            });
          }
          else if(value == false){
          }
        });
      },
      getDataUserDept: async function(){
      var ths = this;
      var user = JSON.parse(localStorage.getItem("user"));
      var dataUserDept = [];
      var fullname = "";
      var result = {};
      await authService.getDataUserDept(user.dept_id).then(response => {
        // console.log(response.data)
        if(response.data != null && response.data.length > 0){
          response.data.forEach(function (obj, i){
            fullname = obj.first_name + " " + obj.last_name + "("+ obj.nick_name + ")";
            result = {value: obj.emp_id, name: fullname}
            dataUserDept.push(result);
          });
          ths.sizes = dataUserDept;
          ths.empName = dataUserDept
        }
      });
     },
      getDataReasonLeave: async function(){
        var dataReason = [];
        await authService.getDataReasonLeave().then(response => {
          if (response.data != null && response.data.length > 0) {
            dataReason.push({ text: "--กรุณาเลือกประเภทการลา--", value: null, disabled: true})
            response.data.forEach(function (obj, i) {
              dataReason.push({ value: obj.leave_reason_id, text: obj.leave_reason_name });
            });
            this.optionLeaveType = dataReason;
          }
        });
      },
      getHeaderApprove: async function() {
      this.isBusy = true;
      var user = JSON.parse(localStorage.getItem("user"));
      var leave_time = [];
      var leave_time_stop = [];
      await authService.getDataHeader(user.dept_id).then(response => {
        if (response.data != null && response.data.length > 0) {
          this.selectedFilter = null;
          this.responseData = response.data;
          for (var i = 0; i < response.data.length; i++) {
            response.data[i].no = i+1;
            response.data[i].full_Name = response.data[i].first_name + " " + response.data[i].last_name + " " + "(" + response.data[i].nick_name + ")";
            response.data[i].HeaderbtnApprove = false;
            leave_time = (response.data[i].leave_start_date != null ? response.data[i].leave_start_date.split(" ")[1] : "");
            leave_time_stop = (response.data[i].leave_stop_date != null ? response.data[i].leave_stop_date.split(" ")[1] : "");
            response.data[i].leave_time = (response.data[i].leave_start_date != null ? leave_time.split(":")[0] + ":" + leave_time.split(":")[1] : "") + ' - ' + (response.data[i].leave_stop_date != null ? leave_time_stop.split(":")[0] + ":" + leave_time_stop.split(":")[1] : "");
            response.data[i].leave_date_format = mJS.setDateFormat(response.data[i].leave_date);
            response.data[i].leave_start_date_format = mJS.setDateFormat(response.data[i].leave_start_date);
            response.data[i].leave_stop_date_format = mJS.setDateFormat(response.data[i].leave_stop_date);
            response.data[i].modify_date_format = mJS.setDateFormat(response.data[i].modify_date);
            response.data[i].head_approve_date_format = mJS.setDateFormat(response.data[i].head_approve_date);
            response.data[i].hr_approve_date_format = mJS.setDateFormat(response.data[i].hr_approve_date);
            response.data[i].cancel_date_format = mJS.setDateFormat(response.data[i].cancel_date);
            response.data[i].cancel_header_date_format = mJS.setDateFormat(response.data[i].cancel_header_date);
            // response.data[i].leave_start_date = (response.data[i].leave_start_date != null ? response.data[i].leave_start_date.split(" ")[0] : "");
            // response.data[i].leave_stop_date = (response.data[i].leave_stop_date != null ? response.data[i].leave_stop_date.split(" ")[0] : "");
            }
          // console.log(response.data)
          this.tempData = response.data;
          this.itemHeader = response.data;
          setTimeout(() => {
            this.isBusy = false
          },300);
        } else {
            // console.log("else");
            setTimeout(() => {
              this.isBusy = false}, 1200);
          }
      });
      this.totalRows = this.itemHeader.length
    },
    handleResize: function() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
      if(this.window.width <= 750){
        this.fieldHeader = [
          { key: 'no', label: 'ลำดับ', class: 'text-center' },
          { key: 'leave_date_format', label: 'วันที่กรอก', class: 'text-center' },
          { key: 'full_Name', label: 'ชื่อ', class: 'text-center' },
          // { key: 'leave_reason_name', label: 'รายละเอียดเวลา', class: 'text-center' },
          // { key: 'leave_start_date', label: 'วันที่ลา', class: 'text-center' },
          // { key: 'leave_stop_date', label: 'ลาถึงวันที่', class: 'text-center' },
          { key: 'head_approve_date_format', label: 'วันที่หัวหน้าอนุมัติ', class: 'text-center' },
          { key: 'leave_remark', label: 'รายละเอียดการลา', class: 'text-center' }
        ]
      }
      else{
        this.fieldHeader = [
          { key: 'no', label: 'ลำดับ', class: 'text-center' },
          { key: 'leave_date_format', label: 'วันที่กรอก', class: 'text-center' },
          { key: 'full_Name', label: 'ชื่อ', class: 'text-center' },
          { key: 'dept_name', label: 'เเผนก', class: 'text-center' },
          { key: 'position_name', label: 'ตำแหน่ง', class: 'text-center' },
          { key: 'leave_reason_name', label: 'รายละเอียดเวลา', class: 'text-center' },
          // { key: 'leave_start_date', label: 'วันที่ลา', class: 'text-center' },
          // { key: 'leave_stop_date', label: 'ลาถึงวันที่', class: 'text-center' },
          { key: 'head_approve_date_format', label: 'วันที่หัวหน้าอนุมัติ', class: 'text-center' },
          // { key: 'hr_approve_date', label: 'วันที่ Hr รับทราบ', class: 'text-center' },
          { key: 'status', label: 'สถานะ', class: 'text-center' },
          { key: 'leave_remark', label: 'รายละเอียดการลา', class: 'text-center' }
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
      onFiltered(filteredItem) {
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
  #HeaderApprove .btn-secondary {
    font-size: 12px;
  }
  .header-1 .modal-title {
    font-weight: bold !important;
  }
  #HeaderApprove .vdatetime-input {
    padding-left:10px;
    width: 100%;
    height: 42px !important;
    font-size: 16px !important;
    border: 1px solid rgba(0,0,0,.2); 
    border-radius: 4px;
  }
  #HeaderApprove .no {
    width : 50px !important;
  }
  #HeaderApprove .leave_date {
    width : 140px !important;
  }
  #HeaderApprove .full_Name {
    width : 185px !important;
  }
  #HeaderApprove .dept_name {
    width : 160px !important;
  }
  #HeaderApprove .position_name {
    width : 160px !important;
  }
  #HeaderApprove .leave_reason_name {
    width : 160px !important;
  }
  #HeaderApprove .leave_start_date {
    width : 130px !important;
  }
  #HeaderApprove .leave_stop_date {
    width : 130px !important;
  }
  #HeaderApprove .leave_time {
    width : 150px !important;
  }
  #HeaderApprove .head_approve_date {
    width : 160px !important;
  }
  #HeaderApprove .hr_approve_date {
    width : 160px !important;
  }
  #HeaderApprove .status {
    width : 180px !important;
  }
  #HeaderApprove .leave_remark {
    width : 170px !important;
  }
  #HeaderApprove .vs__input {
    padding-left:10px;
    font-family: Kanit, Arial, Helvetica, sans-serif !important;
    font-size: 16px;
    height:42px; 
    width: 100%;
    border: 1px solid rgba(0,0,0,.2); 
    border-radius: 4px;
  }
</style>

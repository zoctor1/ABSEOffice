<template>
  <div id="EmpLeave" lg="12" sm="12" xs="12">
    <popupLeave v-bind:showPop="showPop" v-bind:editPop="editPop" @leaveSuccess="handelLeaveSave" />
    <center>
      <div><br>
        <b-col lg="12" sm="12" xs="12">
          <div style="position: relative;">
            <h2 align="left" style="font-weight: bold;">ข้อมูลการลา</h2>
              <div style="position: absolute; top: 50%; right: 0; transform: translate(0, -40%);">
                <div>
                  <b-col lg="12" sm="12" xs="12">
                    <div>
                    </div>
                  </b-col>
                </div>
              </div>
          </div>
          <div style="text-align:left;">
            <b-row style="margin:10px 0px 10px 10px; width:100%">
              <b-col sm="12" md="6" lg="2">
                <p style="cursor:default;"><b>ขอลางานในวันที่ :</b></p>
                <datetime 
                  type="date" 
                  v-model="valDateStart" 
                  format="dd/MM/yyyy" 
                  :min-datetime="currentDate"
                  >
                </datetime>
              </b-col>
              <b-col sm="12" md="6" lg="2">
                <p style="cursor:default;"><b>ลางานถึงวันที่ :</b></p>
                <datetime 
                  type="date"
                  v-model="valDateStop" 
                  format="dd/MM/yyyy" 
                  :min-datetime="currentDate" 
                  >
                </datetime>
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
                <p style="cursor:default;"><b>ประเภทการลา :</b></p>
                <b-form-select
                  v-model="selectType"
                  :options="optionsLeaveType"
                  style="height:42px; cursor: pointer; border: 1px solid rgba(0,0,0,.2); border-radius: 4px;"
                >
                </b-form-select>
              </b-col>
              <b-col xs="6" sm="6" md="6" lg="2" style="padding-top:24px">
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
              <b-col class="buttonAddLeave" xs="6" sm="6" md="6" lg="2" >
                <vs-button
                
                  @click="showLeavePopup(0)"
                  color="primary"
                  type="filled"
                  style="height:42px; width:135px;"
                >
                  <img 
                  src="../assets/Plus_icon3.png" 
                  style="margin-top:-3px"
                  width="20" 
                  height="20" 
                  /> เพิ่มการลา
                </vs-button>
                <!-- <img src="../assets/refresh.png" id="tooltip-target-2" width="33" height="33" @click="getDataAsync()">
                  <b-tooltip placement='right' target="tooltip-target-2" triggers="hover">
                    Refresh
                  </b-tooltip> -->
              </b-col>
             </b-row>
          </div>
            
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
                <h2 style="text-align:center;" color="#00000">ไม่มีข้อมูลการลา</h2>
              </template>

              <template v-slot:head()="data">
                <span style="font-size: 18px;">{{ data.label }}</span>
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

              <!-- <template v-slot:cell(hr_approve_date)="data">
                <div v-if="data.item.cancel_approve_date != null">
                  <button style="width:115px;height:28px; cursor: default; border: 2px solid rgba(241, 130, 141,1); border-radius: 4px; background-color: rgba(240, 52, 52, 1);"> 
                      <font color="#ffffff">ไม่อนุมัติ</font>
                  </button>
                </div>
                <div v-else-if="data.item.cancel_approve_date == null && data.item.hr_approve_date != null">
                  <button style="width:135px;height:28px; cursor: default; border: 2px solid rgba(41, 241, 195, 1); border-radius: 4px; background-color: #28a745;"> 
                      <font color="#00000" style="font-size: 13px" >{{data.item.hr_approve_date}}</font>
                  </button>  
                </div>
                <div v-else-if="data.item.cancel_approve_date == null && data.item.hr_approve_date == null && data.item.emp_leave_id != null">
                  <button style="width:135px;height:28px; cursor: default; border: 2px solid rgb(179, 179, 0); border-radius: 4px; background-color: #ffc107;"> 
                      <font color="#00000" style="font-size: 13px">อยู่ในระหว่างดำเนินการ</font>
                  </button>
                </div>
              </template>

              <template v-slot:cell(head_approve_date)="data">
                <div v-if="data.item.cancel_approve_date != null">
                  <button style="width:115px;height:28px; cursor: default; border: 2px solid rgba(241, 130, 141,1); border-radius: 4px; background-color: rgba(240, 52, 52, 1);"> 
                      <font color="#ffffff">ไม่อนุมัติ</font>
                  </button>
                </div>
                <div v-else-if="data.item.cancel_approve_date == null && data.item.head_approve_date != null">
                  <button style="width:135px;height:28px; cursor: default; border: 2px solid rgba(41, 241, 195, 1); border-radius: 4px; background-color: #28a745;"> 
                     <font color="#00000" style="font-size: 13px" >{{data.item.hr_approve_date}}</font>
                  </button>
                </div>
                <div v-else-if="data.item.cancel_approve_date == null && data.item.head_approve_date == null && data.item.emp_leave_id != null">
                  <button style="width:135px;height:28px; cursor: default; border: 2px solid rgb(179, 179, 0); border-radius: 4px; background-color: #ffc107;"> 
                      <font color="#00000" style="font-size: 13px">อยู่ในระหว่างดำเนินการ</font>
                  </button>
                </div>
              </template> -->

              <template v-slot:cell(status)="data">
                <center>
                <div v-if="data.item.head_approve_date != null && data.item.hr_approve_date != null && data.item.cancel_header_date == null">
                  <p style="width:115px;height:28px; cursor: default; border-radius: 4px; background-color: rgb(54,215,183);"> 
                    <font color="#ffffff">ผ่านการอนุมัติ</font>
                  </p>
                </div>
                 <div v-else-if="data.item.cancel_header_date != null">
                  <p style="width:115px;height:28px; cursor: default; border-radius: 4px; background-color: rgb(226,106,106);"> 
                    <font color="#ffffff">ไม่อนุมัติ</font>
                  </p>
                </div>
                <div v-if="data.item.cancel_date != null">
                  <p style="width:115px;height:28px; cursor: default; border-radius: 4px; background-color: rgba(240, 52, 52, 1);"> 
                      <font color="#ffffff">ถูกยกเลิก</font>
                  </p>
                </div>
                <div v-else-if="data.item.head_approve_date == null && data.item.hr_approve_date == null && data.item.cancel_header_date == null  && data.item.emp_leave_id != null">
                  <b-badge variant="warning"></b-badge>
                  <p style="width:135px;height:28px; cursor: default; border-radius: 4px; background-color: rgb(245,201,71);"> 
                      <font color="#00000" style="font-size: 13px">อยู่ในระหว่างดำเนินการ</font>
                  </p>
                </div>
                <div v-else-if="data.item.head_approve_date == null && data.item.hr_approve_date != null && data.item.cancel_header_date == null && data.item.emp_leave_id != null">
                  <b-badge variant="warning"></b-badge>
                  <p style="width:135px;height:28px; cursor: default; border-radius: 4px; background-color: rgb(245,201,71);"> 
                      <font color="#00000" style="font-size: 13px">อยู่ในระหว่างดำเนินการ</font>
                  </p>
                </div>
                <div v-else-if="data.item.hr_approve_date == null && data.item.head_approve_date != null && data.item.cancel_header_date == null && data.item.emp_leave_id != null">
                  <b-badge variant="warning"></b-badge>
                  <p style="width:135px;height:28px; cursor: default; border-radius: 4px; background-color: rgb(245,201,71);"> 
                      <font color="#00000" style="font-size: 13px">อยู่ในระหว่างดำเนินการ</font>
                  </p>
                </div>
                </center>
              </template>

              <!-- <template v-slot:cell(edit)>
                <vs-button
                    @click="editLeavePopup()"
                    color="warning"
                    type="filled"
                    style="width:110px;height:40px; cursor: pointer"
                >
                   เเก้ไข/ยกเลิก
                </vs-button>
              </template> -->
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
              ไม่อนุมัติ ({{dataModal.cancel_header_date_format}})
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
        
        <b-row style=" margin:0px 10px 5px 10px; border-bottom: 1px dashed #ddd;" class="popupRemark">
          <b-col>
            <p><b style="font-size: 16px;">รายละเอียดการลา :</b></p>
          </b-col>
          <b-col>
            <p style="font-size: 16px;">{{dataModal.leave_remark}}</p>
          </b-col>
        </b-row>
        
         <b-row v-if="dataModal.modify_date != null" style=" margin:0px 10px 5px 10px; border-bottom: 1px dashed #ddd;" class="popupRemark">
          <b-col>
            <p style="font-size: 16px;"><b>วันที่เเก้ไขข้อมูลการลา :</b></p>
          </b-col>  
          <b-col>
            <p style="font-size: 16px;"> {{ dataModal.modify_date_format }} </p>
          </b-col>
        </b-row>  

        <b-row>
          <b-col style="text-align: center; margin:10px -80px 0px 0px">
            <button v-if="dataModal.cancel_header_date == null && dataModal.head_approve_date == null && dataModal.hr_approve_date == null && dataModal.cancel_date == null" @click="showLeavePopup(1)" style="width:110px;height:28px; cursor: pointer; border: 2px solid rgb(213, 217, 13); border-radius: 4px; background-color: rgba(255, 255, 126, 1);"> 
              <font color="#00000" style="font-size: 16px">แก้ไขการลา</font>
            </button>
          </b-col>
          <b-col style="text-align: center; margin-top:10px">
            <button v-if="dataModal.cancel_header_date == null && dataModal.head_approve_date == null && dataModal.hr_approve_date == null && dataModal.cancel_date == null" @click="cancelBtn(dataModal.emp_leave_id)" style="width:110px;height:28px; cursor: pointer; border: 2px solid rgb(255, 112, 77); border-radius: 4px; background-color: rgb(255, 133, 102);"> 
              <font color="#fffff" style="font-size: 16px">ยกเลิกการลา</font>
            </button>
          </b-col>
        </b-row>
      </div>
      <b-button block variant="secondary" style="font-size: 16px;" @click="hide('remarkModal')">ปิด</b-button>
    </modal>
  </div>
</template>

<script>
import Vue from 'vue'
import * as mJS from "../assets/js/mainJS"
import * as authService from '@/services/auth.service';
import popupLeave from "@/components/popupLeave.vue"
// import popupLeaveEdit from "@/components/popupLeaveEdit.vue"
import { Datetime } from 'vue-datetime' // npm install --save luxon vue-datetime weekstart
import 'vue-datetime/dist/vue-datetime.css'
import { Settings } from 'luxon'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'
import VModal from 'vue-js-modal'

Vue.use(VModal)
Vue.use(Datetime,VueSweetalert2)

export default {
  name: "EmpLeave",
  components: {
    popupLeave,
    datetime: Datetime
  },
  props: {},
  data() {
    return {
      dataEmp:{},
      tempData: [],
      items: [],
      optionStat: [
        { value: null ,text: "--เลือกสถานะ--"},
        { value: 1 ,text: "ผ่านการอนุมัติ"},
        { value: 2 ,text: "ไม่อนุมัติ"},
        { value: 3 ,text: "รอการอนุมัติ" },
        { value: 4 ,text: "ถูกยกเลิก" }
      ],
      optionsLeaveType: [],
      fields: [
        { key: 'no', label: 'ลำดับ', class: 'text-center no' },
        { key: 'leave_date_format', label: 'วันที่กรอก', class: 'text-center leave_date',sortable: true  },
        { key: 'leave_reason_name', label: 'ประเภทการลา', class: 'text-center leave_reason_name' },
        // { key: 'leave_start_date', label: 'วันที่ลา', class: 'text-center leave_start_date' },
        // { key: 'leave_stop_date', label: 'ลาถึงวันที่', class: 'text-center leave_stop_date' },
        { key: 'leave_time', label: 'เวลา', class: 'text-center leave_time'  },
        // { key: 'head_approve_date', label: 'วันที่หัวหน้าอนุมัติ', class: 'text-center head_approve_date' },
        // { key: 'hr_approve_date', label: 'วันที่ Hr รับทราบ', class: 'text-center hr_approve_date' },
        { key: 'status', label: 'สถานะ', class: 'text-center status' },
        { key: 'leave_remark', label: 'รายละเอียด', class: 'text-center leave_remark' },
      ],
      dataModal:{},
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
      showPop:false,
      editPop:{},
      valDateStart: '',
      valDateStop: '',
      selectType: '',
      selectDep:'',
      selectStat: '',
      fullPage: '',
      currentDate: '',
      window : {
        width: 0,
        height: 0
      }
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
    this.selectType = null;
    this.selectDep = null;
    this.selectStat = null;
    this.getDataReasonLeave();
  },
  methods: {
    handelLeaveSave(value) {
      if (value) {
        this.getDataAsync();   
      }
    },
    cancelBtn(cancel){
      this.$bvModal.msgBoxConfirm('คุณต้องการยกเลิกการลานี้ใช่หรือไม่?', {
          headerClass: 'header-1',
          title: 'ยกเลิกการลา',
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
            authService.postcancelCheck(cancel).then(response => {
              this.getDataAsync();
              this.hide('remarkModal');
            });
          } 
      })
    },
    defaultValue() {
      this.valDateStart = "";
      this.valDateStop = "";
      this.selectStat = null;
      this.selectType = null;
      this.getDataAsync();
    },
    show () {
      this.$modal.show('remarkModal');
    },
    hide () {
      this.$modal.hide('remarkModal');
    },
    filterData() {
      var ths = this;
      var allData = this.tempData;
      ths.isBusy = true;
      if (ths.valDateStart != null && ths.valDateStart != "" ) {
        var startTimeSelect = mJS.formatDateFilter(ths.valDateStart);
        allData = allData.filter(function(v) {
          var leaveStart = mJS.formatDateFilter(v.leave_start_date);
          return startTimeSelect == leaveStart;
        })
      }
      if (ths.valDateStop != null && ths.valDateStop != "" ) {
        var stopTimeSelect = mJS.formatDateFilter(ths.valDateStop);
        allData = allData.filter(function(v) {
          var leaveStop = mJS.formatDateFilter(v.leave_stop_date);
          return stopTimeSelect == leaveStop;
        })
      }
      if (ths.selectStat != null && ths.selectStat != "") {
        if (ths.selectStat == 1) {
          allData = allData.filter(function(v) {
            return v.head_approve_date != null && v.hr_approve_date != null && v.cancel_approve_date == null;
        })
        } else if (ths.selectStat == 2) {
            allData = allData.filter(function(v) {
              return v.cancel_header_date != null;
            })
        } else if (ths.selectStat == 3) {
            allData = allData.filter(function(v) {
              return v.head_approve_date == null && v.hr_approve_date == null && v.cancel_header_date == null && v.emp_leave_id != null && v.cancel_date == null;
            })
        } else if (ths.selectStat == 4) {
            allData = allData.filter(function(v) {
              return v.cancel_date != null;
            })
        }
      }
      if (ths.selectType != null && ths.selectType != "") {
        allData = allData.filter(function(v) {
          return v.leave_reason_id == ths.selectType;
        })
      } 
      ths.items = allData
      ths.totalRows = ths.items.length
      setTimeout(() => {
        ths.isBusy = false
      },300);
    },
    showLeavePopup: function(flag) {
      var ths = this;
      ths.showPop = true;
      if (flag == 0) {
        ths.editPop = "";
      } 
      else {
        ths.editPop = this.dataModal; 
        this.hide('remarkModal'); 
      }
      setTimeout(function() {
        ths.showPop = false;
      }, 1000);
    },
    getDataReasonLeave: async function(){
      var dataReason = [];
      await authService.getDataReasonLeave().then(response => {
        if (response.data != null && response.data.length > 0) {
          dataReason.push({ text: "--กรุณาเลือกประเภทการลา--", value: null, disabled: true})
          response.data.forEach(function (obj, i) {
            dataReason.push({ text: obj.leave_reason_name,value: obj.leave_reason_id });
          });
          this.optionsLeaveType = dataReason;
        }
      });
    },
    getDataAsync: async function(){
      this.isBusy = true;
      var user = JSON.parse(localStorage.getItem("user"));
      var leave_time = [];
      var leave_time_stop = [];
      await authService.getUserLeave(user.uuid).then(response => {
        if (response.data.length > 0) {
          for (var i = 0; i < response.data.length; i++) {
            response.data[i].no = i+1;
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
          } 
          this.items = response.data;
          this.tempData = response.data;
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
      if(this.window.width <= 750){
        this.fields = [
          { key: 'no', label: 'ลำดับ', class: 'text-center',sortable: true },
          { key: 'status', label: 'สถานะ', class: 'text-center',sortable: true },
          { key: 'leave_remark', label: 'รายละเอียด', class: 'text-center leave_remark' },
        ]
      }
      else {
        this.fields = [
          { key: 'no', label: 'ลำดับ', class: 'text-center no',sortable: true },
          { key: 'leave_date_format', label: 'วันที่กรอก', class: 'text-center leave_date',sortable: true },
          { key: 'leave_reason_name', label: 'ประเภทการลา', class: 'text-center leave_reason_name',sortable: true },
          // { key: 'leave_start_date', label: 'วันที่ลา', class: 'text-center leave_start_date',sortable: true },
          // { key: 'leave_stop_date', label: 'ลาถึงวันที่', class: 'text-center leave_stop_date' },
          { key: 'leave_time', label: 'เวลา', class: 'text-center leave_time' },
          // { key: 'head_approve_date', label: 'วันที่หัวหน้าอนุมัติ', class: 'text-center head_approve_date' },
          // { key: 'hr_approve_date', label: 'วันที่ Hr รับทราบ', class: 'text-center hr_approve_date' },
          { key: 'status', label: 'สถานะ', class: 'text-center status' },
          { key: 'leave_remark', label: 'รายละเอียด', class: 'text-center leave_remark' },
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

<style>
  input[type="date"]::-webkit-inner-spin-button {
      display: none;
      -webkit-appearance: none;
  }

  .buttonAddLeave {
      padding-top:24px; 
      text-align:right;
      margin-left:-10px;
    }
  @media (max-width: 1000px) {
    .buttonAddLeave {
      text-align: left !important;
      margin-left:0px;
    }
  }

  #parent2 {
    position: Sticky ;
    top: 8%;
    right: auto;
  }
  .close:hover {
    cursor: pointer;
  }
  #EmpLeave .vdatetime-input {
    padding-left:10px;
    width: 100%;
    height: 42px !important;
    font-size: 16px !important;
    border: 1px solid rgba(0,0,0,.2); 
    border-radius: 4px;
  }
  /* #EmpLeave .vdatetime-input
      แก้ไขกรอบ  ขอลางานในวันที่ :
                ลางานถึงวันที่ :
  */
  #EmpLeave .no {
    width : 100px !important;
  }
  #EmpLeave .leave_date {
    width : 185px !important;
  }
  #EmpLeave .leave_reason_name {
    width : 250px !important;
  }
  #EmpLeave .leave_start_date {
    width : 185px !important;
  }
  #EmpLeave .leave_stop_date {
    width : 185px !important;
  }
  #EmpLeave .leave_time {
    width : 200px !important;
  }
  #EmpLeave .head_approve_date {
    width : 200px !important;
  }
  #EmpLeave .hr_approve_date {
    width : 200px !important;
  }
  #EmpLeave .status {
    width : 250px !important;
  }
  #EmpLeave .leave_remark {
    width : 150px !important;
  }
</style>
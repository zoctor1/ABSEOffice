<template>
  <div id="HrLeave" lg="12" sm="12" xs="12">
    <center>
      <div><br>
        <b-col lg="12" sm="12" xs="12">
          <h2 align="left" style="font-weight: bold;">ข้อมูลการลาของพนักงาน</h2>

          <div style="text-align:left;">
            <b-row style="margin:10px 0px 10px 10px; width:60%">
              <b-col md="12" lg="4">
                <p style="cursor:default;"><b>ขอลางานในวันที่ :</b></p>
                <datetime 
                  type="date" 
                  v-model="valDateStart" 
                  format="dd/MM/yyyy" 
                  :min-datetime="currentDate"
                  style="border: 1px solid rgba(0,0,0,.2); border-radius: 4px;"
                  >
                </datetime>
              </b-col>
              <b-col md="12" lg="4">
                <p style="cursor:default;"><b>ลางานถึงวันที่ :</b></p>
                <datetime 
                  type="date"
                  v-model="valDateStop" 
                  format="dd/MM/yyyy" 
                  :min-datetime="currentDate" 
                  style="border: 1px solid rgba(0,0,0,.2); border-radius: 4px;"
                  >
                </datetime>
              </b-col>
              <b-col md="12" lg="4">
                <p style="cursor:default;"><b>สถานะ :</b></p>
                <b-form-select
                  v-model="selectStat"
                  :options="optionStat"
                  style="height:42px; cursor: pointer; border: 1px solid rgba(0,0,0,.2); border-radius: 4px;"
                >
                </b-form-select>
              </b-col>
            </b-row>
            <b-row style="margin:10px 0px 10px 10px; width:60%">
              <b-col md="6" lg="4">
                <p style="cursor:default;"><b>ประเภทการลา :</b></p>
                <b-form-select
                  v-model="selectType"
                  :options="optionsType"
                  style="height:42px; cursor: pointer; border: 1px solid rgba(0,0,0,.2); border-radius: 4px;"
                >
                </b-form-select>
              </b-col>
              <b-col md="6" lg="4">
                <p style="cursor:default;"><b>แผนก :</b></p>
                <b-form-select
                  v-model="selectDep"
                  :options="optionsDep"
                  style="height:42px; cursor: pointer; border: 1px solid rgba(0,0,0,.2); border-radius: 4px;"
                >
                </b-form-select>
              </b-col>
              <b-col md="12" lg="4" style="padding-top:24px">
                <b-button
                  variant="outline-primary"
                  @click="filterData()"
                  style="height:42px; margin:0px 10px 10px 0px"
                > 
                <img 
                  src="../assets/Details3.png" 
                  width="25" 
                  height="25"
                >
                  ค้นหา
                </b-button>
                
                <b-button
                  variant="outline-danger"
                  @click="defaultValue()"
                  style="height:42px; margin:0px 10px 10px 0px" 
                >
                  <img 
                    src="../assets/clean_icon3.png"
                    width="30"
                    height="30"
                  > 
                    เคลียร์ข้อมูล
                </b-button>
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
                    <div style="cursor: pointer" @click="dataModal = data.item, show('remarkModal')">
                        <img src="../assets/Details.png" width="33" height="33">
                    </div>
                  </template>
                  
                  <template v-slot:cell(leave_time)="data">
                    <div v-if="data.item.leave_type_id == 4">
                        <button style="width:115px;height:28px; cursor: default; border: 2px solid rgba(240, 52, 52, 1); border-radius: 4px;"> 
                          {{ data.item.leave_time }}
                        </button>
                    </div>
                    <div v-else-if="data.item.leave_type_id == 3" >
                        <button style="width:115px;height:28px; cursor: default; border: 2px solid rgba(44, 130, 201, 1); border-radius: 4px; background-color: rgba(197, 239, 247, 1);"> 
                          {{ data.item.leave_type_name }} 
                        </button>
                    </div>
                    <div v-else-if="data.item.leave_type_id == 2" >
                        <button style="width:115px;height:28px; cursor: default; border: 2px solid rgba(248, 148, 6, 1); border-radius: 4px; background-color: rgba(253, 227, 167, 1);">
                          {{ data.item.leave_type_name }} 
                        </button>
                    </div>
                    <div v-else-if="data.item.leave_type_id == 1" >
                        <button style="width:115px;height:28px; cursor: default; border: 2px solid rgba(238, 238, 0, 1); border-radius: 4px; background-color: rgba(255, 255, 204, 1);"> 
                          {{ data.item.leave_type_name }} 
                        </button>
                    </div>
                  </template>

                  <template v-slot:cell(hr_approve_date)="data">
                    <div v-if="data.item.cancel_date != null">
                      <button style="width:115px;height:28px; cursor: default; border: 2px solid rgba(241, 130, 141,1); border-radius: 4px; background-color: rgba(240, 52, 52, 1);"> 
                          <font color="#ffffff">ไม่อนุมัติ</font>
                      </button>
                    </div>
                    <div v-else-if="data.item.cancel_date == null && data.item.hr_approve_date != null">
                      <button style="width:135px;height:28px; cursor: default; border: 2px solid rgba(41, 241, 195, 1); border-radius: 4px; background-color: #28a745;"> 
                          <font color="#00000" style="font-size: 13px" >{{data.item.hr_approve_date}}</font>
                      </button>  
                    </div>
                    <div v-else-if="data.item.cancel_date == null && data.item.hr_approve_date == null && data.item.emp_leave_id != null">
                      <button v-if="!data.item.HrbtnApprove" @click="showMsgBoxTwo(data.item.emp_leave_id)" style="width:135px;height:28px; cursor: pointer; border: 2px solid rgb(179, 179, 0); border-radius: 4px; background-color: #ffc107;"> 
                          <font color="#00000" style="font-size: 13px">อนุมัติ</font>
                      </button>
                    </div>
                  </template>

                  <!-- <template v-slot:cell(head_approve_date)="data">
                    <div v-if="data.item.cancel_date != null">
                      <button style="width:115px;height:28px; cursor: default; border: 2px solid rgba(241, 130, 141,1); border-radius: 4px; background-color: rgba(240, 52, 52, 1);"> 
                          <font color="#ffffff">ไม่อนุมัติ</font>
                      </button>
                    </div>
                    <div v-else-if="data.item.cancel_date == null && data.item.head_approve_date != null">
                      <button style="width:135px;height:28px; cursor: default; border: 2px solid rgba(41, 241, 195, 1); border-radius: 4px; background-color: #28a745;"> 
                        <font color="#00000" style="font-size: 13px" >{{data.item.hr_approve_date}}</font>
                      </button>
                    </div>
                    <div v-else-if="data.item.cancel_date == null && data.item.head_approve_date == null && data.item.emp_leave_id != null">
                      <button style="width:135px;height:28px; cursor: default; border: 2px solid rgb(179, 179, 0); border-radius: 4px; background-color: #ffc107;"> 
                          <font color="#00000" style="font-size: 13px">อยู่ในระหว่างดำเนินการ</font>
                      </button>
                    </div>
                  </template> -->

                  <template v-slot:cell(status)="data">
                    <div v-if="data.item.head_approve_date != null && data.item.hr_approve_date != null && data.item.cancel_date == null">
                      <button style="width:115px;height:28px; cursor: default; border: 2px solid rgb(26, 255, 26); border-radius: 4px; background-color: rgb(0, 204, 0);"> 
                          <font color="#ffffff">ผ่านการอนุมัติ</font>
                      </button>
                    </div>
                    <div v-else-if="data.item.cancel_date != null">
                      <button style="width:115px;height:28px; cursor: default; border: 2px solid rgba(241, 130, 141,1); border-radius: 4px; background-color: rgba(240, 52, 52, 1);"> 
                          <font color="#ffffff">ไม่อนุมัติ</font>
                      </button>
                    </div>
                    <div v-else-if="data.item.head_approve_date == null && data.item.hr_approve_date == null && data.item.cancel_date == null && data.item.emp_leave_id != null">
                      <b-badge variant="warning"></b-badge>
                      <button style="width:135px;height:28px; cursor: default; border: 2px solid rgb(179, 179, 0); border-radius: 4px; background-color: #ffc107;"> 
                          <font color="#00000" style="font-size: 13px">อยู่ในระหว่างดำเนินการ</font>
                      </button>
                    </div>
                    <div v-else-if="data.item.head_approve_date == null && data.item.hr_approve_date != null && data.item.cancel_date == null && data.item.emp_leave_id != null">
                      <b-badge variant="warning"></b-badge>
                      <button style="width:135px;height:28px; cursor: default; border: 2px solid rgb(179, 179, 0); border-radius: 4px; background-color: #ffc107;"> 
                          <font color="#00000" style="font-size: 13px">อยู่ในระหว่างดำเนินการ</font>
                      </button>
                    </div>
                    <div v-else-if="data.item.hr_approve_date == null && data.item.head_approve_date != null && data.item.cancel_date == null && data.item.emp_leave_id != null">
                      <b-badge variant="warning"></b-badge>
                      <button style="width:135px;height:28px; cursor: default; border: 2px solid rgb(179, 179, 0); border-radius: 4px; background-color: #ffc107;"> 
                          <font color="#00000" style="font-size: 13px">อยู่ในระหว่างดำเนินการ</font>
                      </button>
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
    <modal 
        name="remarkModal" 
        :clickToClose="false"
        height="auto"
        width="390px"
      >
      <p style="background-color: #f1f1f1; font-size: 20px; text-align: center; margin-bottom:10px; font-weight:bold; padding: 10px 10px 10px 20px; cursor:default;">
        รายละเอียดการลา 
      </p>
      <div style="padding:15px 15px 20px 10px">
        <b-row style=" margin-left:14px;">
          <p style="font-size: 18px;"><b>ประเภทการลา :</b></p>
          <p style="font-size: 18px;">&nbsp;{{dataModal.leave_reason_name}}</p>
        </b-row>

        <b-row style=" margin-left:0px;">
          <b-col>
            <p style="font-size: 18px;"><b>วันที่ลา :</b> </p>
            <p style="font-size: 18px;">{{dataModal.leave_start_date}}</p>
          </b-col>
          <b-col>
            <p style="font-size: 18px;"><b>ลาถึงวันที่ :</b></p>
            <p style="font-size: 18px;">{{dataModal.leave_stop_date}}</p>
          </b-col>  
        </b-row>  

        <b-row style=" margin-left:14px;">
          <p style="font-size: 18px;"><b>ช่วงเวลา :</b></p>
          <p style="font-size: 18px;">&nbsp;{{ dataModal.leave_time }}</p>
        </b-row>  

        <b-row style=" margin-left:14px;">
          <p style="font-size: 18px;"><b>รายละเอียดการลา :</b></p>
          <p style="font-size: 18px;">&nbsp;{{ dataModal.leave_remark }} </p>
        </b-row> 

        <b-row style=" margin-left:0px;">
          <b-col>
            <p style="font-size: 18px;"><b>วันที่หัวหน้าอนุมัติ :</b></p>
            <p v-if="dataModal.head_approve_date != null && dataModal.head_remark == null" style="font-size: 18px;">
              {{ dataModal.head_approve_date }} 
            </p>
            <p v-else-if="dataModal.cancel_date != null  && dataModal.head_remark == null">
              ไม่อนุมัติ 
            </p>
            <p v-else-if="dataModal.cancel_date != null && dataModal.head_remark != null">
              ไม่อนุมัติ ({{ dataModal.head_remark }})
            </p>
            <p v-else-if="dataModal.head_approve_date == null && dataModal.cancel_date == null">
              รอการอนุมัติ 
            </p>
            <p v-else-if="dataModal.hr_approve_date == null && dataModal.cancel_date == null">
              รอการอนุมัติ 
            </p>
            <p v-else-if="dataModal.cancel_date == null">
              รอการอนุมัติ 
            </p>
          </b-col>  
          <b-col>
            <p style="font-size: 18px;"><b>วันที่ฝ่ายบุคคลรับทราบ :</b></p>
            <p v-if="dataModal.hr_approve_date != null && dataModal.hr_remark == null" style="font-size: 18px;">
              {{ dataModal.hr_approve_date }} 
            </p>
            <p v-else-if="dataModal.cancel_date != null && dataModal.hr_remark == null">
              ไม่อนุมัติ 
            </p>
            <p v-else-if="dataModal.cancel_date != null && dataModal.hr_remark != null">
              ไม่อนุมัติ ({{ dataModal.hr_remark }})
            </p>
            <p v-else-if="dataModal.head_approve_date == null && dataModal.cancel_date == null">
              รอการอนุมัติ 
            </p>
            <p v-else-if="dataModal.hr_approve_date == null && dataModal.cancel_date == null">
              รอการอนุมัติ 
            </p>
            <p v-else-if="dataModal.cancel_date == null">
              รอการอนุมัติ 
            </p>
          </b-col>  
        </b-row>  

      </div>
      <b-button block variant="secondary" style="font-size: 16px" @click="hide()">ปิด</b-button>
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

Vue.use(Datetime,VueSweetalert2,VModal)

export default {
  name: "HrLeave",
  components: {
    datetime: Datetime
  },
  props: {},
  data() {
    return {
      tempData: [],
      items: [],
      optionStat: [
        { value: null ,text: "--เลือกสถานะ--"},
        { value: 1 ,text: "อนุมัติ"},
        { value: 2 ,text: "ไม่อนุมัติ"},
        { value: 3 ,text: "อยู่ในระหว่างการดำเนินการ" }
      ],
      optionsDep: [
        { value: null ,text: "--เลือกแผนก--"},
        { value: 1 ,text: "พัฒนาระบบสารสนเทศ"},
        { value: 2 ,text: "วิศวกรรม "},
        { value: 3 ,text: "ทรัพยากรมนุษย์"}
      ],
      optionsType: [
        { value: null ,text: "--เลือกประเภทการลา--"},
        { value: 1 ,text: "ลาป่วย"},
        { value: 2 ,text: "ลากิจ"},
        { value: 3 ,text: "ลาพักร้อน"},
        { value: 4 ,text: "ลาคลอด"},
        { value: 5 ,text: "ลาบวช"},
        { value: 6 ,text: "ลาไม่รับค่าจ้าง"}
      ],
      fields: [
        { key: 'no', label: 'ลำดับ', class: 'text-center no',sortable: true },
        { key: 'leave_date', label: 'วันที่กรอก', class: 'text-center leave_date',sortable: true },
        { key: 'full_Name', label: 'ชื่อ', class: 'text-center full_Name',sortable: true },
        { key: 'dept_name', label: 'เเผนก', class: 'text-center dept_name',sortable: true },
        { key: 'position_name', label: 'ตำแหน่ง', class: 'text-center position_name',sortable: true },
        { key: 'leave_reason_name', label: 'ประเภทการลา', class: 'text-center leave_reason_name',sortable: true },
        // { key: 'leave_start_date', label: 'วันที่ลา', class: 'text-center leave_start_date',sortable: true },
        // { key: 'leave_stop_date', label: 'ลาถึงวันที่', class: 'text-center leave_stop_date',sortable: true },
        { key: 'leave_time', label: 'เวลา', class: 'text-center leave_time' },
        // { key: 'head_approve_date', label: 'วันที่หัวหน้าอนุมัติ', class: 'text-center head_approve_date' },
        { key: 'hr_approve_date', label: 'วันที่ Hr รับทราบ', class: 'text-center hr_approve_date' },
        { key: 'status', label: 'สถานะ', class: 'text-center status',sortable: true },
        { key: 'leave_remark', label: 'รายละเอียดการลา', class: 'text-center leave_remark' },
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
      valDateStart: '',
      valDateStop: '',
      selectType: '',
      selectDep:'',
      selectStat: '',
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
    }
  },
  created(){
    window.addEventListener("resize", this.handleResize);
  },
  destroyed(){
    window.removeEventListener('resize', this.handleResize);
  },
  mounted() {
    this.getHrApprove();
    this.selectType = null;
    this.selectDep = null;
    this.selectStat = null;
  },
  methods: {
    defaultValue() {
      this.valDateStart = "";
      this.valDateStop = "";
      this.selectStat = null;
      this.selectType = null;
      this.selectDep = null;
      this.getHrApprove();
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
      console.log(allData)
      if (this.selectStat == null && this.selectType == null && this.selectDep == null) {
        console.log("Alert")
          this.$swal.fire({
            heightAuto: false,
            icon: 'warning',
            title: 'เลือกข้อมูลที่จะค้นหา...'
          })
      } else {
          if (this.valDateStart != null && this.valDateStart != "") {
            console.log("valDateStart")
            // allData = allData.filter(function(v) {
            //   return v.
            // })
          }
          if(this.valDateStop != null && this.valDateStop != "" && this.valDateStart != null && this.valDateStart != "") {
            console.log("valDateStop")
          }
          if (this.selectStat != null && this.selectStat != "") {
            console.log("selectStat")
            if (this.selectStat == 1) {
              allData = allData.filter(function(v) {
                return v.head_approve_date != null && v.hr_approve_date != null && v.cancel_date == null;
              });
            } else if (this.selectStat == 2) {
              allData = allData.filter(function(v) {
                return v.cancel_date != null;
              });
            } else if (this.selectStat == 3) {
              allData = allData.filter(function(v) {
                return v.head_approve_date == null && v.hr_approve_date == null && v.cancel_date == null && v.emp_leave_id != null;
              });
            } else if (this.selectStat == 4) {
              allData = allData.filter(function(v) {
                return v.head_approve_date == null && v.hr_approve_date != null && v.cancel_date == null && v.emp_leave_id != null;
              });
            } else if (this.selectStat == 5) {
              allData = allData.filter(function(v) {
                return v.hr_approve_date == null && v.head_approve_date != null && v.cancel_date == null && v.emp_leave_id != null;
              });
            }
          }
          if(this.selectType != null && this.selectType != "") {
            console.log("selectType")
            console.log(this.selectType)
            allData = allData.filter(function(v) {
              return v.leave_reason_id == ths.selectType;
            })
          }
          if(this.selectDep != null && this.selectDep != "") {
            console.log("selectDep")
            console.log(this.selectDep)
            allData = allData.filter(function(v) {
              return v.dept_id == ths.selectDep;
            })
        }
      }
      this.items = allData;
      this.totalRows = this.items.length
    },
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
              this.getHrApprove();
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
        this.$bvModal.msgBoxOk([messageVNode], {
          title: [titleVNode],
          buttonSize: 'sm',
          centered: true, size: 'sm'
        }).then(value => {
          if(value == true){
            console.log(id);
            console.log(messageVNode.children[0].elm.value);
            authService.notApproveHR(id, messageVNode.children[0].elm.value).then(response => {
              this.getHrApprove();
            });
          }
          else if(value == false){
            console.log("gg")
          }
        });
      },
    getHrApprove: async function(){
    this.isBusy = true;
    await authService.getDataHR({}).then(response => {
      console.log(response.data)
      if (response.data != null && response.data.length > 0) { 
        for (var i = 0; i < response.data.length; i++) {
          response.data[i].no = i+1;
          response.data[i].full_Name = response.data[i].first_name + " " + response.data[i].last_name;
          response.data[i].HrbtnApprove = false;
          response.data[i].leave_time = (response.data[i].leave_start_date != null ? response.data[i].leave_start_date.split(" ")[1] : "") + ' - ' + (response.data[i].leave_stop_date != null ? response.data[i].leave_stop_date.split(" ")[1] : "");
          response.data[i].leave_start_date = (response.data[i].leave_start_date != null ? response.data[i].leave_start_date.split(" ")[0] : "");
          response.data[i].leave_stop_date = (response.data[i].leave_stop_date != null ? response.data[i].leave_stop_date.split(" ")[0] : "");
        } 
        console.log(response.data)
        this.items = response.data;
        this.isBusy = false;
        this.tempData = response.data;
      } else {
            console.log("else");
            setTimeout(() => {
              this.isBusy = false}, 1200);
              console.log("isbusy");
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
          { key: 'leave_date', label: 'วันที่กรอก', class: 'text-center',sortable: true },
          { key: 'full_Name', label: 'ชื่อ', class: 'text-center',sortable: true },
          // { key: 'leave_reason_name', label: 'รายละเอียดเวลา', class: 'text-center',sortable: true },
          // { key: 'leave_start_date', label: 'วันที่ลา', class: 'text-center',sortable: true },
          // { key: 'leave_stop_date', label: 'ลาถึงวันที่', class: 'text-center',sortable: true },
          { key: 'hr_approve_date', label: 'วันที่ Hr รับทราบ', class: 'text-center' },
          { key: 'leave_remark', label: 'รายละเอียดการลา', class: 'text-center' }
        ]
      }
      else{
        this.fields = [
          { key: 'no', label: 'ลำดับ', class: 'text-center',sortable: true },
          { key: 'leave_date', label: 'วันที่กรอก', class: 'text-center',sortable: true },
          { key: 'full_Name', label: 'ชื่อ', class: 'text-center',sortable: true },
          { key: 'dept_name', label: 'เเผนก', class: 'text-center',sortable: true },
          { key: 'position_name', label: 'ตำแหน่ง', class: 'text-center',sortable: true },
          { key: 'leave_reason_name', label: 'รายละเอียดเวลา', class: 'text-center',sortable: true },
          { key: 'leave_remark', label: 'รายละเอียดการลา', class: 'text-center' },
          // { key: 'leave_start_date', label: 'วันที่ลา', class: 'text-center',sortable: true },
          // { key: 'leave_stop_date', label: 'ลาถึงวันที่', class: 'text-center',sortable: true },
          // { key: 'head_approve_date', label: 'วันที่หัวหน้าอนุมัติ', class: 'text-center' },
          { key: 'hr_approve_date', label: 'วันที่ Hr รับทราบ', class: 'text-center' },
          { key: 'status', label: 'สถานะ', class: 'text-center',sortable: true },
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
  #HrLeave .vdatetime-input {
    width: 235px !important;
    height: 40px !important;
    font-size: 16px !important;
    border: none;
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
</style>

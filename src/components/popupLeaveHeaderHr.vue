<template>
  <div id="popupLeaveHeaderHr">

    <modal name="hello-world"
      id="sizePopupLeave"
      height="auto"
      :clickToClose="false"
      :active.sync="popupLeave"
    >
      <p style="background-color: #f1f1f1; font-size: 22px; margin-bottom:10px; font-weight:bold; padding: 10px 10px 10px 20px; cursor:default;">
        รายละเอียดการลาของพนักงาน
        <button type="button" aria-label="Close" class="close" @click="hide()" >
          <img src="../assets/Close-icon.png" width="33" height="33" />
        </button>
      </p>
        <div style="padding: 0px 25px 10px 20px">
          <div class="con-select-example" style="margin-top:10px">
            <b-row>
              <b-col>
                <p style="cursor:default;"><b>ชื่อ-นามสกุล :</b></p>
                <template>
                  <!-- <b-form-input list="my-list-id" style="width:528px;"></b-form-input> -->

                  <!-- <datalist id="my-list-id">
                    <option>Manual Option</option>
                    <option v-for="size in sizes" :key="size">{{ size }}</option>
                  </datalist> -->
                  <b-form-select
                    v-model="sizeModal"
                    :options="sizes"
                    style="width:528px;height:37px; cursor: pointer; border: 1px solid rgba(0,0,0,.2); border-radius: 4px;"
                  >
                  </b-form-select>
                </template>
              </b-col>
            </b-row>
            
             <b-row>
              <b-col>
                <p style="margin-bottom:-15px; cursor:default;"><b>เเผนก : </b><br> <label v-if="empData != null && Object.keys(empData).length > 0 && sizeModal != null && sizeModal != '' && sizeModal != undefine"> {{ empData[sizeModal].dept_name }} </label> </p>
              </b-col>
              <b-col>
                <p style="margin-bottom:-15px; cursor:default;"><b>ตำเเหน่ง : </b><br> <label v-if="empData != null && Object.keys(empData).length > 0 && sizeModal != null && sizeModal != '' && sizeModal != undefine" > {{ empData[sizeModal].position_name }} </label> </p>
              </b-col>
            </b-row><br>

            <b-row>
              <b-col>
                <p style="margin-bottom:-15px; cursor:default;"><b>ประเภทการลา :</b></p>
                  <b-form-select
                    v-model="selectType"
                    :options="optionLeaveType"
                    @change="changeSelectType()"
                    class="mt-3"
                    style="width:235px;height:37px; cursor: pointer; border: 1px solid rgba(0,0,0,.2); border-radius: 4px;"
                  >
                  </b-form-select>
                  <div v-if="selectType == 2" class="mt-3">
                    <font color="red">{{ textValue2 }}</font>
                  </div>
                  <div v-else-if="selectType == 3" class="mt-3">
                    <font color="red">{{ textValue3 }}</font>
                  </div>
              </b-col>
              <b-col>
                <p style="cursor:default;"><b>เวลา :</b></p>
                  <b-form-radio-group
                    v-model="selected"
                    :options="optionTime"
                  >
                  </b-form-radio-group> 
              </b-col>
            </b-row>
          </div>
          <div>
            <div style="margin-top:10px">
              <b-row>
                <b-col>
                  <p style="cursor:default;"><b>ขอลางานในวันที่ :</b></p>
                  <div class="form-group" :class="{ 'form-group--error': $v.form.valDate1.$error }">
                    <datetime v-if="popupLeave" type="date" v-model.trim="$v.form.valDate1.$model" format="dd/MM/yyyy" :min-datetime="currentDate" :max-datetime="maxDate" style="border: 1px solid rgba(0,0,0,.2); border-radius: 4px;"></datetime>
                    <div class="error" v-if="!$v.form.valDate1.required"><font color="red">จำเป็น*</font></div>
                    <div class="error" v-else><img src="../assets/Success_icon2.png" width="20" height="20" /></div>
                  </div>
                </b-col>
                <b-col>
                  <div v-if="selected != 1 && selected != 2">
                  <p style="cursor:default;"><b>ลางานถึงวันที่ :</b></p>
                  <div class="form-group" :class="{ 'form-group--error': $v.form.valDate2.$error }">
                    <datetime v-if="popupLeave" type="date" v-model.trim="$v.form.valDate2.$model" format="dd/MM/yyyy" :min-datetime="$v.form.valDate1.$model !='' ? $v.form.valDate1.$model : currentDate" :max-datetime="maxDate" style="border: 1px solid rgba(0,0,0,.2); border-radius: 4px;"></datetime>
                    <div class="error" v-if="!$v.form.valDate2.required"><font color="red">จำเป็น*</font></div>
                    <div class="error" v-else><img src="../assets/Success_icon2.png" width="20" height="20" /></div> 
                  </div>
                  </div>
                </b-col>
              </b-row>
            </div>
            <div style="margin-top:-10px">
              <b-row>
                <b-col>
                  <div v-if="selected != 2 && selected != 3 && selected != 4">
                    <p style="cursor:default;"><b>เวลาที่เริ่มลา :</b></p>
                    <p style="border: 1px solid rgba(0,0,0,.2); border-radius: 4px; cursor:default; width: 130px; height: 42px; padding: 7px 6px 6px 14px">{{ timeAM9 }}</p>
                  </div>
                  <div v-if="selected != 1 && selected != 3 && selected != 4">
                    <p style="cursor:default;"><b>เวลาที่เริ่มลา :</b></p>
                    <p style="border: 1px solid rgba(0,0,0,.2); border-radius: 4px; cursor:default; width: 130px; height: 42px; padding: 7px 6px 6px 14px">{{ timePM13 }}</p>
                  </div>
                  <div v-if="selected != 1 && selected != 2 && selected != 4">
                    <p style="cursor:default;"><b>เวลาที่เริ่มลา :</b></p>
                    <p style="border: 1px solid rgba(0,0,0,.2); border-radius: 4px; cursor:default; width: 130px; height: 42px; padding: 7px 6px 6px 14px">{{ timeFull9 }}</p>
                  </div>
                  <div v-if="selected != 3 && selected != 2 && selected != 1">
                    <p style="cursor:default;"><b>เวลาที่เริ่มลา :</b></p>
                    <VueCtkDateTimePicker
                      v-model="selectTimeStart"
                      format="H:mm:ss"
                      formatted="H:mm:00"
                      :only-time="true"
                      :no-keyboard="true"
                      :no-label="true"
                      :no-header="true"
                      label="เลือกเวลา"
                    />
                  </div>
                </b-col>
                <b-col>
                  <div v-if="selected != 3 && selected != 2 && selected != 1">
                    <p style="cursor:default;"><b>เวลาสิ้นสุดการลา :</b></p>
                    <VueCtkDateTimePicker
                      v-model="selectTimeStop"
                      format="H:mm:ss"
                      formatted="H:mm:00 "
                      :only-time="true"
                      :no-keyboard="true"
                      :no-label="true"
                      :no-header="true"
                      label="เลือกเวลา"
                    />
                  </div>
                  <div v-if="selected != 2 && selected != 3 && selected != 4">
                    <p style="cursor:default;"><b>เวลาสิ้นสุดการลา :</b></p>
                    <p style="border: 1px solid rgba(0,0,0,.2); border-radius: 4px; cursor:default; width: 130px; height: 42px; padding: 7px 6px 6px 14px">{{ timeAM12 }}</p>
                  </div>
                  <div v-if="selected != 1 && selected != 3 && selected != 4">
                    <p style="cursor:default;"><b>เวลาสิ้นสุดการลา :</b></p>
                    <p style="border: 1px solid rgba(0,0,0,.2); border-radius: 4px; cursor:default; width: 130px; height: 42px; padding: 7px 6px 6px 14px">{{ timePM18 }}</p>
                  </div>
                  <div v-if="selected != 1 && selected != 2 && selected != 4">
                    <p style="cursor:default;"><b>เวลาสิ้นสุดการลา :</b></p>
                    <p style="border: 1px solid rgba(0,0,0,.2); border-radius: 4px; cursor:default; width: 130px; height: 42px; padding: 7px 6px 6px 14px">{{ timeFull18 }}</p>
                  </div>
                </b-col>
              </b-row>
            </div>
            <div class="form-group" :class="{ 'form-group--error': $v.form.description.$error }" style="margin-top:10px">
              <p style="cursor:default;"><b>รายละเอียดการลา :</b></p>
              <b-form-textarea
                style="width:340px;height:80px; padding:1px"
                v-model.trim="$v.form.description.$model"
                placeholder="กรอกข้อมูลรายละเอียดการลา"
                rows="4"
                no-resize
                >
              </b-form-textarea>
              <div class="error" v-if="!$v.form.description.required"><font color="red">จำเป็น*</font></div>
              <div class="error" v-else><img src="../assets/Success_icon2.png" width="20" height="20" /></div>
            </div>
          </div>
          
          <template>
            <div v-if="selectType == 1">
              <p style="cursor:default;"><b>แนบใบรับรองแพทย์ :</b></p>
              <b-form-file v-model="file" ref="file-input" class="mb-2"></b-form-file>
              <b-button v-if="file != null" @click="file = null">ลบไฟล์</b-button>
            </div>
          </template>
          <loading
            :active.sync="isLoading"
            :is-full-page="fullPage"
          >
          </loading>
            <center>
              <vs-button
                style="margin-top:-10px; position: static;"
                @click="confirmMessage()"
                color="primary"
                type="filled"
              >
                ส่งอนุมัติ
              </vs-button>
            </center>
        </div>
    </modal>
  </div>
</template>

<script>
import Vue from 'vue'
import * as mainJs from "@/assets/js/mainJS.js";
import * as authService from "@/services/auth.service";
import { required, minLength } from "vuelidate/lib/validators";
import Swal from "sweetalert2/dist/sweetalert2.js"; //npm install sweetalert2
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import { Datetime } from 'vue-datetime' // npm install --save luxon vue-datetime weekstart
import 'vue-datetime/dist/vue-datetime.css'
import { Settings } from 'luxon'
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker'; //npm i --save vue-ctk-date-time-picker
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';
import VModal from 'vue-js-modal'
import VueSimpleAlert from "vue-simple-alert";
import 'sweetalert2/dist/sweetalert2.min.css'

Vue.use(VModal,VueSimpleAlert);
Vue.component('VueCtkDateTimePicker', VueCtkDateTimePicker);
Vue.use(Datetime)

export default {
  name: "popupLeaveHeaderHr",
  components: {
    Swal,
    Loading,
    datetime: Datetime
  },
  props: ["showPop", "editPop"],
  data() {
    return {
      sizeModal:"",
      sizes: [],
      empData: {},
      dataLeave: {},
      selectDept: "",
      // optionDept: [
      //   { value: null ,text: "--กรุณาเลือกแผนก--", disabled: true},
      //   { value: 1 ,text: 'พัฒนาระบบสารสนเทศ' },
      //   { value: 2 ,text: 'วิศวกรรม' },
      //   { value: 3 ,text: 'ทรัพยากรมนุษย์ ' }
      // ],
      selectPosition: "",
      // optionPosition : [
      //   { value: null ,text: "--กรุณาเลือกตำแหน่ง--", disabled: true},
      // ],
      // optionPositionHR: [
      //   { value: null ,text: "--กรุณาเลือกตำแหน่ง--", disabled: true},
      //   { value: 1 ,text: 'ผู้บริหารฝ่ายบุคคล' },
      //   { value: 2 ,text: 'เลขาผู้บริหารฝ่ายบุคคล' },
      //   { value: 3 ,text: 'ผู้ช่วยเลขาผู้บริหารฝ่ายบุคคล ' },
      //   { value: 4 ,text: 'ผู้ช่วยของผู้ช่วยเลขาผู้บริหารฝ่ายบุคคล' },
      // ],
      optionTime: [],
      selectType: "",
      optionLeaveType: [],
      selected1: "",
      selected2: null,
      value1:'',
      value2:'',
      popupLeave:false,
      types: [
        'date',
      ],
      selected: 3,
      selectTimeStart: "",
      selectTimeStop: "",
      flagSave: 0,
      textError: "*กรุณากรอกข้อมูลให้ครบถ้วน",
      textValue2: "**ลากิจ : ควรลางานล่วงหน้าอย่างน้อย 3 วัน",
      textValue3: "**ลาพักร้อน : ควรลางานล่วงหน้าอย่างน้อย 3 วัน",
      form: {
        description: '',
        selectTimeFrom: '',
        valDate1: '',
        valDate2: '',
        leaveType: '',
        leaveReason: '',
        codeName: ''
      },
      userIn:{},
      isLoading: false,
      fullPage: true,
      date: null,
      flagRangDate: false,
      validateRangDate: {},
      currentDate: "",
      maxDate: "",
      file: null,
      timeAM9: "9:00:00",
      timeAM12: "12:00:00",
      timePM13: "13:00:00",
      timePM18: "18:00:00",
      timeFull9: "9:00:00",
      timeFull18: "18:00:00",
      sel1: "",
      sel2: ""
    }
  },
  computed: {},
  beforeMount() {
    this.$v.form.valDate1.$model = mainJs.setDateToServer(new Date().toString());
  }, 
  mounted() {
    this.currentDate = mainJs.setDateToServer(new Date().toString(), "TZ");
    this.userIn = JSON.parse(localStorage.getItem("user"));
    Settings.defaultLocale = 'th'
    this.getDataTypeLeave();
    this.getDataReasonLeave();
    this.getDataUserDept();
  },
  methods: {
    confirmMessage () {
      var ths = this;
      Swal.fire({
        title: 'ต้องการยืนยันการอนุมัติใช่หรือไม่?',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ใช่',
        cancelButtonText: 'ไม่'
      }).then((result) => {
          if (result.value) {
            ths.insertData();
          }
        })
    },
    changeSelectType() {
      if (this.selectType == 1) { 
        var cDate = new Date().setDate(new Date().getDate() - 15);
        this.currentDate = mainJs.setDateToServer(new Date(cDate).toString(), "TZ");
        cDate = new Date().setDate(new Date().getDate());
        this.maxDate = mainJs.setDateToServer(new Date(cDate).toString(), "TZ");
      }
      if (this.selectType == 2 || this.selectType == 3) {
        this.maxDate = "";
        var cDate = new Date().setDate(new Date().getDate() + 3);
        this.currentDate = mainJs.setDateToServer(new Date(cDate).toString(), "TZ");
      } 
      if (this.selectType == 4 || this.selectType == 5) {
        this.maxDate = "";
        var cDate = new Date().setDate(new Date().getDate() - 15);
        this.currentDate = mainJs.setDateToServer(new Date(cDate).toString(), "TZ");
      } 
      if (this.selectType == 6) {
        this.maxDate = "";
        var cDate = new Date().setDate(new Date().getDate() - 7);
        this.currentDate = mainJs.setDateToServer(new Date(cDate).toString(), "TZ");
      } 
    },
    show () {
      this.$modal.show('hello-world');
    },
    hide () {
      this.$modal.hide('hello-world');
    },
    validateRang(obj) {
      if (obj.start != undefined && obj.start != null && obj.end != undefined && obj.end != null) {
        this.flagRangDate = true;
        this.validateRangDate = obj;
        this.validateRangDate.start;
        this.validateRangDate.end;
      }
    },
    chkIsEmpty: function(value) {
      return value == undefined || value == null || (value + "").trim() == "";
    },
    defaultValue() {
      this.$modal.show('hello-world');
      this.isLoading = false;
      this.popupLeave = true;
      this.flagSave = 0;
      this.$v.form.codeName.$model = "";
      this.$v.form.description.$model = "";
      this.$v.form.selectTimeFrom.$model = "";
      this.$v.form.valDate1.$model = "";
      this.$v.form.valDate2.$model = "";
      this.selectTimeStart="",
      this.selectTimeStop=""
      this.flagRangDate = false;
      this.selectType = null;
      this.sizeModal = null;
      this.selected = 3;
      this.selectDept = null;
      this.selectPosition = null;
    },
    validation: function(value) {
      var key = Object.keys(value);
      for (var i = 0; i < key.length; i++) {
        if (this.chkIsEmpty(value[key[i]])) {
          return false;
        }
      }
      return true;
    },
    getDataUserDept: async function(){
      var ths = this;
      var user = JSON.parse(localStorage.getItem("user"));
      var dataUserDept = [];
      var fullname = "";
      await authService.getDataUserDept(user.uuid, user.dept_id).then(response => {
        if(response.data != null && response.data.length > 0){
          ths.empData = {};
          response.data.forEach(function (obj, i){
            fullname = obj.first_name + " " + obj.last_name;
            dataUserDept.push({ value: obj.emp_id, text: fullname });
            ths.empData[obj.emp_id] = obj;
          });
          ths.sizes = dataUserDept;
        }
        console.log(ths.empData);
      });
    },
    getDataTypeLeave: async function(){
      var dataType = [];
      await authService.getDataTypeLeave().then(response => {
        if (response.data != null && response.data.length > 0) {
          response.data.forEach(function (obj, i) {
            dataType.push({ text: obj.leave_type_name, value: obj.leave_type_id });
          });
          this.optionTime = dataType;
        }
      });
    },
    getDataReasonLeave: async function(){
       var dataReason = [];
      await authService.getDataReasonLeave().then(response => {
        if (response.data != null && response.data.length > 0) {
          response.data.forEach(function (obj, i) {
            dataReason.push({ text: obj.leave_reason_name,value: obj.leave_reason_id });
          });
          this.optionLeaveType = dataReason;
        }
      });
    },
    insertData: async function() {
      this.isLoading = true;
      var obj = {};
      obj["emp_id"] = this.sizeModal;
      obj["leave_reason_id"] = this.selectType;
      obj["leave_type_id"] = this.selected;
      if(this.selected == 1){
        this.sel1 = this.$v.form.valDate1.$model.split("T")[0] + " " + this.timeAM9
        this.sel2 = this.$v.form.valDate1.$model.split("T")[0] + " " + this.timeAM12
      }
      else if(this.selected == 2){
        this.sel1 = this.$v.form.valDate1.$model.split("T")[0] + " " + this.timePM13
        this.sel2 = this.$v.form.valDate1.$model.split("T")[0] + " " + this.timePM18
      }
      else if(this.selected == 3){
        this.sel1 = this.$v.form.valDate1.$model.split("T")[0] + " " + this.timeFull9
        this.sel2 = this.$v.form.valDate2.$model.split("T")[0] + " " + this.timeFull18
      }
      else if(this.selected == 4){
        this.sel1 = this.$v.form.valDate1.$model.split("T")[0] + " " + this.selectTimeStart
        this.sel2 = this.$v.form.valDate2.$model.split("T")[0] + " " + this.selectTimeStop
      }
      obj["leave_start_date"] = mainJs.setDateToServer(
         this.sel1
      );
      obj["leave_stop_date"] = mainJs.setDateToServer(
        this.sel2
      );
      obj["leave_remark"] = this.$v.form.description.$model;

      if ( await mainJs.checkStopTime(obj["leave_start_date"], obj["leave_stop_date"]) == false) {
        Swal.fire (
          'กรอกช่วงเวลาให้ถูกต้อง',
          ' ',
          'error'
        )
        this.isLoading = false;
      }
      else if (this.validation(obj)) {
        console.log(obj);
        await authService.insertDataByHeader(obj).then(response => {
          console.log(response.data);
          if (response.data > 0) {
            this.Loading = false;
            this.$modal.hide('hello-world');
            this.leaveID = response.data;
            var fileData = new FormData();
            fileData.append("image_leave", this.file);
            fileData.append("leave_emp_id", this.leaveID)
            authService.addImage(fileData).then(response => {
              console.log(response.data);
            });
            Swal.fire (
              'การส่งอนุมัติเสร็จสิ้น',
              ' ',
              'success'
            )
          } else {
            setTimeout(() => {
              this.isLoading = false}, 500);
              console.log("aaa");
            }
        });
      }
        else {
          setTimeout(() => {
            this.isLoading = false;
            this.$swal.fire({
              heightAuto: false,
              title: 'กรุณากรอกข้อมูลให้ครบถ้วน'
            })},250);
            console.log("else")
        }
    }
  },
  watch: {
    showPop() {
      if (this.showPop) {
        this.defaultValue();
      }
    }
  },
  validations: {
    form: {
      description: {
        required,
        minLength: minLength(5)
      },
      selectTimeFrom: {
        required,
        minLength: minLength(5)
      },
      valDate1: {
        required,
        minLength: minLength(5)
      },
      valDate2: {
        required,
        minLength: minLength(5)
      },
      leaveType: {
        required,
        minLength: minLength(5)
      },
      leaveReason: {
        required,
        minLength: minLength(5)
      }
    }
  }
};
</script>

<style>
  @media (max-width: 500px) {
    .popupLeave-example{
      position: fixed;
      bottom: 0px;
      right: 0px;
    }
  }
  @media (max-width: 500px) {
    .popupContent{
      margin-right: 10px;
      margin-left: 10px;
      text-align: center;
    }
  }
  input[type="date"]::-webkit-inner-spin-button {
    display: none;
    -webkit-appearance: none;
  }
  #sizePopupLeave .v--modal {
    margin-top: 2%;
  }
  #sizePopupLeave .vhd-input {
    margin-top: 10px;
    margin-bottom: 10px;
    cursor: pointer;
  }
  #sizePopupLeave .vhd-picker {
    position: absolute;
    z-index: 2;
  }
  #sizePopupLeave  .field-input {
    width: 130px !important;
    height: 37px !important;
    font-size: 16px !important;
    padding: none;
  }
  #sizePopupLeave .vdatetime-input {
    width: 235px !important; 
  }
  #sizePopupLeave .fs-16 {
    display: none;
  }
  #sizePopupLeave .custom-select {
    border: none;
  }

</style>
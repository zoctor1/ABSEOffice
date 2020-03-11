<template>
  <div id="popupOT">
    <modal name="showhidePopupOT"
      id="popupOT"
      height="auto"
      :clickToClose="false"
      :active.sync="popupOT"
    >
    <p style="background-color: #f1f1f1; font-size: 22px; margin-bottom:10px; font-weight:bold; padding: 10px 10px 10px 20px; cursor:default;">
      กรอกรายละเอียดการทำงานนอกเวลา
      <button type="button" aria-label="Close" class="close" @click="hide()" >
        <img src="../assets/Close-icon.png" width="33" height="33" />
      </button>
    </p>
    
      <div style="padding: 0px 25px 10px 20px; margin-bottom:10px;">
        <b-row style="margin-bottom: 10px;">
          <b-col lg="6">
            <p style="cursor:default; margin-bottom:-10px"><b>ประเภทการปฏิบัติงาน	 :</b></p>
              <b-form-select
                v-model="selectType"
                :options="optionOtType"
                @change="getDataTypeOT()"
                class="mt-3"
                style="width:235px;height:42px; cursor: pointer; border: 1px solid rgba(0,0,0,.2); border-radius: 4px;"
              >
              </b-form-select>
          </b-col>
          <b-col lg="6">
            <p style="cursor:default;"><b>ช่วงเวลา :</b></p>
              <b-form-radio-group
                v-model="selectWorkTime"
                :options="optionTime"
              >
              </b-form-radio-group> 
          </b-col>
        </b-row>
        <b-row style="margin-bottom: -15px;">
          <b-col lg="6">
            <div class="form-group" :class="{ 'form-group--error': $v.form.startDate.$error }">
              <p style="cursor:default;"><b>วันเริ่มต้น :</b></p>
                <div class="form-group" :class="{ 'form-group--error': $v.form.startDate.$error }">
                  <datetime type="date" placeholder="เลือกวันเริ่มต้น" v-model.trim="$v.form.startDate.$model" format="dd/MM/yyyy"></datetime>
                  <div class="error" v-if="!$v.form.startDate.required"><font color="red">จำเป็น*</font></div>
                  <div class="error" v-else><img src="../assets/Success_icon2.png" width="20" height="20" /></div>
                </div>
            </div>
          </b-col>
          <b-col lg="6">
            <div v-if="selectType != null && selectType != 1 && selectType != 3">
            <div class="form-group" :class="{ 'form-group--error': $v.form.stopDate.$error }">
              <p style="cursor:default;"><b>วันสิ้นสุด :</b></p>
                <div class="form-group" :class="{ 'form-group--error': $v.form.stopDate.$error }">
                  <datetime type="date" placeholder="เลือกวันสิ้นสุด" v-model.trim="$v.form.stopDate.$model" format="dd/MM/yyyy"></datetime>
                  <div class="error" v-if="!$v.form.stopDate.required"><font color="red">จำเป็น*</font></div>
                  <div class="error" v-else><img src="../assets/Success_icon2.png" width="20" height="20" /></div>
                </div>
            </div>
            </div>
          </b-col>
        </b-row>
        <b-row class="my-1" v-for="type in types" :key="type">
          <b-col>
            <p style="cursor:default;"><b>เวลาเริ่มต้น :</b></p>
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
          </b-col>
          <b-col>
            <p style="cursor:default;"><b>เวลาสิ้นสุด :</b></p>
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
          </b-col> 
        </b-row>
        <b-row style="margin:10px 0px 10px 0px;">
            <div class="form-group" :class="{ 'form-group--error': $v.form.descriptionWork.$error }">
              <p style="cursor:default;"><b>รายละเอียดงาน :</b></p>
                <b-form-textarea
                  v-model.trim="$v.form.descriptionWork.$model"
                  style="width:340px; padding:5px 10px 5px 10px;"
                  id="textarea-no-resize"
                  placeholder="กรอกรายละเอียดการทำงาน"
                  rows="4"
                  no-resize
                >
                </b-form-textarea>
                <div class="error" v-if="!$v.form.descriptionWork.required"><font color="red">*จำเป็น</font></div>
                <div class="error" v-else><font color="Success"><img src="../assets/Success_icon2.png" width="20" height="20" /></font></div>
            </div>
        </b-row>
        <div style="margin-top:-13px;">
          <b-row>
            <b-col sm="12">
              <center>
              <vs-button @click="insertOT()" color="primary" type="filled" to="/otworkUser">บันทึก</vs-button></center>
            </b-col>
          </b-row>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import Vue from 'vue'
import * as mainJs from "@/assets/js/mainJS.js";
import * as authService from "@/services/auth.service";
import { required, minLength } from 'vuelidate/lib/validators'
import { Datetime } from 'vue-datetime' // npm install --save luxon vue-datetime weekstart
import 'vue-datetime/dist/vue-datetime.css'
import { Settings } from 'luxon'
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker'; //npm i --save vue-ctk-date-time-picker
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';

Vue.component('VueCtkDateTimePicker', VueCtkDateTimePicker);
Vue.use(Datetime)

export default {
  name: "popupOT",
  components: {
    datetime: Datetime
  },
  props: ["showPopOT"],
  data() {
    return {
      userIn:{},
      optionTime: [],
      optionOtType:[],
      popupOT:false,
      popupActivo3:false,
      types: [
        'time',
      ],
      selectWorkTime: 1,
      form: {
        descriptionWork: '',
        startDate:'',
        stopDate:''
      },
      selectTimeStart: "",
      selectTimeStop: "",
      selectType: "",
    }
  },
  computed: {},
  beforeMount() {
    this.$v.form.startDate.$model = mainJs.setDateToServer(new Date().toString());
  }, 
  mounted() {
    this.getDataTypeOT();
    this.getDataPeriod();
    this.userIn = JSON.parse(localStorage.getItem("user"));
  },
  methods: {
    defaultValue() {
      this.$modal.show('showhidePopupOT');
      this.popupOT = true;
      this.selectType = null;
      this.selectWorkTime = 1;
      this.$v.form.startDate.$model = null;
      this.$v.form.stopDate.$model = null;
      this.selectTimeStart = "";
      this.selectTimeStop = "";
    },
    insertOT: async function() {
      var user = JSON.parse(localStorage.getItem("user"));
      var obj = {};
      obj["emp_id"] = user.uuid;
      obj["overtime_type_id"] = this.selectType;
      obj["ot_remark"] = this.$v.form.descriptionWork.$model;
      obj["overtime_start"] = this.selectTimeStart
      obj["overtime_end"] = this.selectTimeStop;
      // obj[" "] = this.$v.form.startDate.$model;
      // obj[" "] = this.$v.form.stopDate.$model;
      console.log(obj)
      authService.insertDataOT(obj).then(response => {
        console.log(response.data)
      });
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
    getDataPeriod: async function(){
      var dataType = [];
      await authService.getDataPeriod().then(response => {
        if (response.data != null && response.data.length > 0) {
          response.data.forEach(function (obj, i) {
            dataType.push({ text: obj.overtime_period_name, value: obj.over_period_id });
          });
          this.optionTime = dataType;
        }
      });
    },
    show () {
      this.$modal.show('showhidePopupOT');
    },
    hide () {
      this.$modal.hide('showhidePopupOT');
    },
  },
  watch: {
    showPopOT() {
      if (this.showPopOT) {
        this.defaultValue();
      }
    }
  },
  validations: {
    form: {
      descriptionWork: {
        required,
        minLength: minLength(5)
      },
      startDate:{
        required,
        minLength: minLength(5)
      },
      stopDate:{
        required,
        minLength: minLength(5)
      }
    }
  }
};
</script>

<style>
  @media (max-width: 500px) {
    .popupContent{
      margin-right: 10px;
      margin-left: 10px;
    }
  }
  #popupOT .con-vs-popup .vs-popup {
    width: 35%;
  }
  #popupOT .vs-popup--content {
    overflow: hidden !important;
  }
  #popupOT .field-input {
    width: 130px !important;
    height: 37px !important;
    font-size: 16px !important;
    padding: none;
  }
  #popupOT .field-clear-button {
    display: none;
    /* ปิดปุ่มปิดของ เวลาเริ่มทำงาน กับ เวลาสิ้นสุดทำงาน */
  }
  
</style>
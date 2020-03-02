<template>
  <div id="popupOT">
    <!-- <div>    
      <vs-button 
        @click="popupOT=true" 
        color="primary" 
        type="filled" 
        style="width:144px; height:44px;"
      >
        <img src="../assets/Plus_icon3.png" width="20" height="20" /> เพิ่มเวลาทำงาน
      </vs-button>
    </div> -->

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
        <!-- <div style="padding: 0px 25px 10px 20px">
          <center><h4 style="cursor:default;">{{userIn.first_name}} {{userIn.last_name}}</h4></center>
          <center><h5 style="cursor:default;">แผนก : {{userIn.dept_name}}</h5></center>
          <center><h5 style="cursor:default;">ตำแหน่ง : {{userIn.position_name}}</h5></center>
        </div> -->
      <!-- <vs-popup class="popupContent" id="sizePopupOT" classContent="popupOT-example"  title="กรอกรายละเอียดการทำงานนอกเวลา" :active.sync="popupOT">
        <center><h4>{{userIn.first_name}} {{userIn.last_name}}</h4></center>
        <center><h5>แผนก : {{userIn.dept_name}}</h5></center> -->
          <div style="padding: 0px 25px 10px 20px">
            <div style="margin:5px 0px 1px 0px" class="form-group" :class="{ 'form-group--error': $v.form.date.$error }">
              <p>วันที่ทำงาน</p>
                <div class="form-group" :class="{ 'form-group--error': $v.form.date.$error }">
                  <datetime type="date" v-model.trim="$v.form.date.$model" format="dd/MM/yyyy"></datetime>
                  <div class="error" v-if="!$v.form.date.required"><font color="red">จำเป็น*</font></div>
                  <div class="error" v-else><img src="../assets/Success_icon2.png" width="20" height="20" /></div>
                </div>
              <!-- <b-container fluid>
                <datetime 
                  v-model.trim="$v.form.date.$model" 
                  format="DD/MM/YYYY H:i" 
                  style="width:220px;height:37px;cursor: pointer;"
                >
                </datetime>
                <div style="margin-top:-6px" class="error" v-if="!$v.form.date.required"><font color="red">*จำเป็น</font></div>
                <div style="margin-top:-6px" class="error" v-else><font color="Success"><img src="../assets/Success_icon2.png" width="20" height="20" /></font></div>
              </b-container> -->
            </div>
            <div class="form-group" :class="{ 'form-group--error': $v.form.descriptionWork.$error }">
              <p>รายละเอียดงาน:</p>
                <b-container fluid>
                  <b-form-textarea
                    v-model.trim="$v.form.descriptionWork.$model"
                    style="width:340px; padding:10px"
                    id="textarea-no-resize"
                    placeholder="กรอกรายละเอียดการทำงาน"
                    rows="4"
                    no-resize
                  >
                  </b-form-textarea>
                  <div class="error" v-if="!$v.form.descriptionWork.required"><font color="red">*จำเป็น</font></div>
                  <div class="error" v-else><font color="Success"><img src="../assets/Success_icon2.png" width="20" height="20" /></font></div>
                </b-container>
            </div>
            <div style="margin-top:-13px;">
              <b-row class="my-1" v-for="type in types" :key="type">
                <b-col>
                    <div class="form-group" :class="{ 'form-group--error': $v.form.timeStart.$error }">
                      <p>เวลาเริ่มทำงาน:</p>
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
                      <!-- <b-container fluid>

                        <b-form-input :id="`type-${type}`" :type="type" v-model.trim="$v.form.timeStart.$model" style="width:145px;height:37px; cursor: pointer;"> </b-form-input>
                        <div class="error" v-if="!$v.form.timeStart.required"><font color="red">*จำเป็น</font></div>
                        <div class="error" v-else><font color="Success"><img src="../assets/Success_icon2.png" width="20" height="20" /></font></div>
                      </b-container> -->
                    </div> 
                </b-col>
                <b-col>
                  <div>
                    <div class="form-group" :class="{ 'form-group--error': $v.form.timeEnd.$error }">
                      <p>เวลาเลิกงาน:</p>
                        <VueCtkDateTimePicker
                        :id="`type-${type}`" 
                        :type="type" 
                        v-model.trim="$v.form.timeEnd.$model"
                        format="H:mm:ss"
                        formatted="H:mm:00"
                        :only-time="true"
                        :no-keyboard="true"
                        :no-label="true"
                        :no-header="true"
                        label="เลือกเวลา"
                      />
                      <div class="error" v-if="!$v.form.timeEnd.required"><font color="red">*จำเป็น</font></div>
                      <div class="error" v-else><font color="Success"><img src="../assets/Success_icon2.png" width="20" height="20" /></font></div>
                      <!-- <b-container fluid>
                        <b-form-input :id="`type-${type}`" :type="type" v-model.trim="$v.form.timeEnd.$model" style="width:145px;height:37px; cursor: pointer;"> </b-form-input>
                        <div class="error" v-if="!$v.form.timeEnd.required"><font color="red">*จำเป็น</font></div>
                        <div class="error" v-else><font color="Success"><img src="../assets/Success_icon2.png" width="20" height="20" /></font></div>
                    </b-container> -->
                    </div> 
                  </div>
                </b-col> 
              </b-row>
            </div>
            <div>
              <b-form-group>
                <b-form-radio-group id="radio-group-2" v-model="selected" name="radio-sub-component">
                  <center>
                    <p>เบิกจ่ายเงิน:</p>
                      <b-form-radio-group
                        v-model="selected"
                        :options="options"
                      ></b-form-radio-group>
                  </center>
                </b-form-radio-group>
              </b-form-group>
            </div>
            <div>
              <b-col sm="12">
                <center>
                <vs-button @click="popupActivo3=true" color="primary" type="filled" to="/otworkUser">บันทึก</vs-button></center>
              </b-col>
            </div>
          </div>
      </modal>
      <!-- </vs-popup>      -->
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
      options: [
        { text: 'เบิก', value: 'first' },
        { text: 'ไม่เบิก', value: 'second' }
      ],
      popupOT:false,
      popupActivo3:false,
      types: [
        'time',
      ],
      selected:'first',
      form: {
        descriptionWork: '',
        timeStart: '',
        timeEnd:'',
        date:'',
        userIn:{}
      },
      selectTimeStart: "",
      selectTimeStop: "",
    }
  },
  computed: {},
  mounted() {
    // this.userIn = JSON.parse(localStorage.getItem("user"));
  },
  methods: {
    show () {
      this.$modal.show('showhidePopupOT');
    },
    hide () {
      this.$modal.hide('showhidePopupOT');
    },
    defaultValue() {
      this.$modal.show('showhidePopupOT');
      this.popupOT = true;
    }
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
      timeStart: {
        required,
        minLength: minLength(5)
      },
      timeEnd:{
        required,
        minLength: minLength(5)
      },
      date:{
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
  #sizePopupOT .con-vs-popup .vs-popup {
    width: 35%;
    height: 83%;
  }
  #sizePopupOT .vs-popup--content {
    overflow: hidden !important;
  }
</style>
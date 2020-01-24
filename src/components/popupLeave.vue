<template>
  <div id="popupLeave">
    <div>
      <b-col lg="12" sm="12" xs="12">
        <div>
          <vs-button
            @click="defaultValue()"
            color="primary"
            type="filled"
          >
            <img src="../assets/Plus_icon3.png" width="20" height="20" /> เพิ่มการลา
          </vs-button>
        </div>
      </b-col>
    </div>
    <vs-popup
      id="sizePopupLeave"
      classContent="popupLeave-example"
      title="กรอกรายละเอียดประวัติการลา"
      :active.sync="popupLeave"
    >
      <center><h4>{{userIn.first_name}} {{userIn.last_name}}</h4></center>
      <center><h5>แผนก : {{userIn.dept_name}}</h5></center>
      <center><h5>ตำแหน่ง : {{userIn.position_name}}</h5></center>

      <div class="con-select-example" style="margin-top:15px">
        <b-row>
          <b-col>
            <p style="margin-bottom:-15px">เหตุผลการลา :</p>
              <b-form-select
                label="เหตุผลการลา"
                v-model="selected1"
                :options="options1"
                class="mt-3"
                style="width:235px;height:37px; margin-bottom:8px; cursor: pointer;"
              >
              </b-form-select> 
              <div v-if="selected1 == 2" class="mt-3">
                 <font color="red">{{ textValue2 }}</font>
              </div>
              <div v-else-if="selected1 == 3" class="mt-3">
                <font color="red">{{ textValue3 }}</font>
              </div>
          </b-col>
          <b-col>
            <p>ประเภทการลา</p>
              <b-form-radio-group
                v-model="selected"
                :options="options"
              >
              </b-form-radio-group>    
          </b-col>        
        </b-row>
      </div>
        <div>
          <div style="margin-top:10px">
            <b-row>
              <b-col>
                <p>ขอลางานในวันที่ :</p>
                <div class="form-group" :class="{ 'form-group--error': $v.form.valDate1.$error }">
                  <datetime v-if="popupLeave" type="datetime" v-model.trim="$v.form.valDate1.$model" format="dd/MM/yyyy HH:mm"></datetime>
                  <div class="error" v-if="!$v.form.valDate1.required"><font color="red">*จำเป็น</font></div>
                  <div class="error" v-else><img src="../assets/Success_icon2.png" width="20" height="20" /></div>
                </div>
              </b-col>
              <b-col>
                <p>ลางานถึงวันที่ :</p>
                <div class="form-group" :class="{ 'form-group--error': $v.form.valDate2.$error }">
                  <datetime v-if="popupLeave" type="datetime" v-model.trim="$v.form.valDate2.$model" format="dd/MM/yyyy HH:mm"></datetime>
                  <div class="error" v-if="!$v.form.valDate2.required"><font color="red">*จำเป็น</font></div>
                  <div class="error" v-else><img src="../assets/Success_icon2.png" width="20" height="20" /></div>
                </div>
              </b-col>
              <b-col>
              </b-col>
            </b-row>
          </div>
          <div class="form-group" :class="{ 'form-group--error': $v.form.description.$error }">
            <p>รายละเอียดการลา</p>
            <b-form-textarea
              style="width:340px;height:80px; padding:1px"
              v-model.trim="$v.form.description.$model"
              placeholder="กรอกข้อมูลรายละเอียดการลา"
              rows="4"
              no-resize
              >
            </b-form-textarea>
            <div class="error" v-if="!$v.form.description.required"><font color="red">*จำเป็น</font></div>
            <div class="error" v-else><img src="../assets/Success_icon2.png" width="20" height="20" /></div>
          </div>
        </div>
        <loading
          :active.sync="isLoading"
          :is-full-page="fullPage"
        >
        </loading>
        <div v-show="flagSave == 1" style="margin-top:25px">
          <b-col sm="12">
            <center>
              <font color="red">
              {{textError}}
              </font>
            </center>
          </b-col>
        </div>
            <center>
              <vs-button
                style="margin-bottom:25px; position: static;"
                @click="insertData()"
                color="primary"
                type="filled"
              >
                บันทึก
              </vs-button>
            </center>
    </vs-popup>
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

Vue.use(Datetime)
export default {
  name: "popupLeave",
  components: {
    Swal,
    Loading,
    datetime: Datetime
  },
  props: {},
  data() {
    return {
      options: [
        { text: 'ลาครึ่งเช้า', value: 1 },
        { text: 'ลาครึ่งบ่าย', value: 2 },
        { text: 'ลาเต็มวัน', value: 3 }
      ],
      options1: [
        { text: "--กรุณาเลือกสาเหตุการลา--", value: null, disabled: true},
        { text: "ลาป่วย",value: 1 },
        { text: "ลากิจ",value: 2},
        { text: "ลาพักร้อน",value: 3 },
        { text: "ลาคลอด",value: 4 },
        { text: "ลาบวช",value: 5 },
        { text: "ลาไม่รับค่าจ้าง",value: 6 }
      ],
      selected1: null,
      description:'',
      selected2: null,
      value1:'',
      value2:'',
      popupLeave:false,
      types: [
        'date',
      ],
      selected: 3,
      flagSave: 0,
      textError: "*กรุณากรอกข้อมูลให้ครบถ้วน",
      textSuccess: "บันทึกข้อมูลสำเร็จ",
      textValue2: "**ลากิจ : ควรลางานล่วงหน้าอย่างน้อย 3 วัน",
      textValue3: "**ลาพักร้อน : ควรลางานล่วงหน้าอย่างน้อย 3 วัน",
      form: {
        description: '',
        selectTimeFrom: '',
        valDate1: '',
        valDate2: '',
        leaveType: '',
        leaveReason: ''
      },
      userIn:{},
      isLoading: false,
      fullPage: true,
      range: {},
      date: null,
      flagRangDate: false,
      validateRangDate: {},
    }
  },
  computed: {},
  mounted() {
    this.userIn = JSON.parse(localStorage.getItem("user"));
  },
  methods: {
    validateRang(obj) {
      if (obj.start != undefined && obj.start != null && obj.end != undefined && obj.end != null) {
        this.flagRangDate = true;
        this.validateRangDate = obj;

        this.validateRangDate.start;
        this.validateRangDate.end;
      }
    },
    onCancel() {
      console.log('User cancelled the loader.')
    },
    chkIsEmpty: function(value) {
      return value == undefined || value == null || (value + "").trim() == "";
    },
    defaultValue() {
      this.popupLeave = true;
      this.flagSave = 0;
      this.$v.form.description.$model = "";
      this.$v.form.selectTimeFrom.$model = "";
      this.$v.form.valDate1.$model = "";
      this.$v.form.valDate2.$model = "";
      this.flagRangDate = false;
      // this.options = [{options1}];
      // this.options1 = [{options1}];
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
    insertData: function() {
      this.isLoading = true;
      var user = JSON.parse(localStorage.getItem("user"));
      var obj = {};
      obj["emp_id"] = user.uuid;
      obj["leave_date"] = mainJs.setDateToServer(new Date().toLocaleString());
      obj["leave_reason_id"] = this.selected1;
      obj["leave_type_id"] = this.selected;
      obj["leave_start_time"] = mainJs.setDateToServer(
        this.$v.form.valDate1.$model
      );
      obj["leave_stop_time"] = mainJs.setDateToServer(
        this.$v.form.valDate2.$model
      );

      // obj["leave_stop_time"] = mainJs.setDateToServer(
      //   this.$v.form.valDate2.$model
      // );
      obj["leave_remark"] = this.$v.form.description.$model;
      console.log(obj);
      if (this.validation(obj)) {
        console.log("if")
        authService.insertData(obj).then(response => {
          if (response.data) {
            this.Loading = false;
            this.popupLeave = false;
          } else {
            setTimeout(() => {
              this.isLoading = false}, 500);
              console.log("aaa");
            }
        });
      } else {
        setTimeout(() => {
              this.isLoading = false;
              this.flagSave = 1;},250);
          // this.isLoading = false;
          console.log("else")
        }
    }
  },
  watch: {},
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
  .popupLeave-example {
    max-width: 100%;
    height: 100%;
    z-index: 1;
  }
  #sizePopupLeave .vs-popup {
    /* position: relative; */
    /* z-index: 1; */
    width: 30% !important;
    /* height: 65% !important; */
  }
  #sizePopupLeave .vs-popup--content {
    overflow: hidden !important;
    z-index: 1;
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

  #sizePopupLeave  #tj-datetime-input {
    width: 200px !important;
    height: 37px !important;
  }
</style>
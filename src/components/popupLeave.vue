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
      class="popupContent"
      id="sizePopupLeave" 
      classContent="popupLeave-example"  
      title="กรอกรายละเอียดประวัติการลา" 
      :active.sync="popupLeave" 
    >
      <center><h4>{{userIn.first_name}} {{userIn.last_name}}</h4></center>
      <center><h5>แผนก : {{userIn.dept_name}}</h5></center>
        <div>
          <div>
            <b-row class="my-1" v-for="type in types" :key="type">
              <b-col>
                <div class="form-group" :class="{ 'form-group--error': $v.form.valDate1.$error }">
                  <p>ขอลาในวันที่ :</p>
                  <datetime v-if="popupLeave" v-model.trim="$v.form.valDate1.$model" format="DD/MM/YYYY H:i" style="width:250px;height:37px;cursor: pointer;" ></datetime>
                  <div class="error" v-if="!$v.form.valDate1.required"><font color="red">*จำเป็น</font></div>
                  <div class="error" v-else><img src="../assets/Success_icon2.png" width="20" height="20" /></div>
                </div>
              </b-col>
              <b-col>
                <div style="margin-bottom:2px" class="form-group" :class="{ 'form-group--error': $v.form.valDate2.$error }">
                  <p>ถึงวันที่(กรณีลามากกว่า 1 วัน) :</p>
                  <datetime v-if="popupLeave" v-model.trim="$v.form.valDate2.$model" format="DD/MM/YYYY H:i" style="width:250px;height:37px;cursor: pointer;" ></datetime>
                  <div class="error" v-if="!$v.form.valDate2.required"><font color="red">*จำเป็น</font></div>
                  <div class="error" v-else><img src="../assets/Success_icon2.png" width="20" height="20" /></div>
                </div>
              </b-col>
            </b-row>
          </div>
          <div class="con-select-example">
            <b-row>
              <b-col>
                <p style="margin-bottom:-10px">เหตุผลการลา :</p>
                  <b-form-select
                    label="เหตุผลการลา"
                    v-model="selected1"
                    :options="options1" 
                    class="mt-3"
                    style="width:235px;height:37px; margin-bottom:8px; cursor: pointer;"
                  >
                  </b-form-select> 
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
          <div style="margin-top:10px" class="form-group" :class="{ 'form-group--error': $v.form.description.$error }">
            <p>รายะเอียดการลา</p>
            <b-form-textarea
              style="width:340px;height:80px; padding:1px"
              v-model.trim="$v.form.description.$model"
              placeholder="กรอกรายละเอียดการลา"
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
        <div style="margin-top:25px">
          <b-col sm="12">
            <center>
              <vs-button
                style="margin-top:0px"
                @click="insertData()"
                color="primary"
                type="filled"
              >
                บันทึก
              </vs-button>
            </center>
          </b-col>
        </div>
    </vs-popup>
  </div>
</template>

<script>
import * as mainJs from "@/assets/js/mainJS.js";
import * as authService from "@/services/auth.service";
import datetime from "vuejs-datetimepicker";
import { required, minLength } from "vuelidate/lib/validators";
import Swal from "sweetalert2/dist/sweetalert2.js"; //npm install sweetalert2
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  name: "popupLeave",
  components: {
    datetime,
    Swal,
    Loading,
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
        { text: "ลาป่วย", value: 1 },
        { text: "ลากิจ", value: 2 },
        { text: "ลาพักร้อน", value: 3 },
        { text: "ลาคลอด", value: 4 },
        { text: "ลาบวช", value: 5 },
        { text: "ลาไม่รับค่าจ้าง", value: 6 }
      ],
      selected1: null,
      dateStart: '',
      dateEnd: '',
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
      form: {
        description: '',
        valDate1: '',
        valDate2: '',
        leaveType: '',
        leaveReason: ''
      },
      userIn:{},
      isLoading: false,
      fullPage: true
    }
  },
  computed: {},
  mounted() {
    this.userIn = JSON.parse(localStorage.getItem("user"));
  },
  methods: {
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
      this.$v.form.valDate1.$model = "";
      this.$v.form.valDate2.$model = "";
      this.options = [{options1}];
      this.options1 = [{options1}];
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
  }
  #sizePopupLeave .con-vs-popup .vs-popup {
    width: 35%;
    height: 63%;
  }
  #sizePopupLeave .vs-popup--content {
    overflow: hidden !important;
  }
</style>
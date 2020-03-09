<template>
  <div id="popupRegisterUser">

    <modal name="hello-world"
      id="sizePopupLeave"
      height="auto"
      :clickToClose="false"
      :active.sync="popupRegister"
    >
      <p style="background-color: #f1f1f1; font-size: 22px; margin-bottom:10px; font-weight:bold; padding: 10px 10px 10px 20px; cursor:default;">
        กรอกข้อมูลพนักงาน
        <button type="button" aria-label="Close" class="close" @click="hide()">
          <img src="../assets/Close-icon.png" width="33" height="33" />
        </button>
      </p>
        <div style="padding: 0px 25px 10px 20px">
          <div class="con-select-example" style="margin-top:10px">
            <b-row>
              <b-col>
                <div>
                  <div class="form-group" :class="{ 'form-group--error': $v.username.$error, 'form-group--loading': $v.username.$pending }">
                    <input class="form__input" placeholder="อีเมล" v-model.trim="$v.username.$model" style="width:100%;height:37px; padding-left:10px; border: 1px solid rgba(0,0,0,.2); border-radius: 4px; font-family: Kanit, Arial, Helvetica, sans-serif !important; font-size: 16px;"/>
                  </div>
                  <div class="error" v-if="!$v.username.isUnique" style="margin:-15px 0px 10px 0px; color: red; text-align:left;">
                    กรุณากรอกอีเมล์ให้ถูกต้อง
                  </div>
                </div>
              </b-col>
              <!-- <b-col>
                <div class="form-group" :class="{ 'form-group--error': $v.name.$error }">
                  <input class="form__input" placeholder="อีเมล" v-model.trim="$v.name.$model" style="width:100%;height:37px; padding-left:10px; border: 1px solid rgba(0,0,0,.2); border-radius: 4px; font-family: Kanit, Arial, Helvetica, sans-serif !important; font-size: 16px;"/>
                </div>
                <div class="error" v-if="!$v.name.minLength" style="margin:-15px 0px 10px 0px; color: red; text-align:left;">
                  กรุณากรอกอย่างต่ำ {{$v.name.$params.minLength.min}} ตัวอักษรขึ้นไป
                </div>
              </b-col> -->
            </b-row>
            <b-row style="margin-bottom: 10px;" id="errors">
              <b-col style="margin-top:-5px;">
                <div class="form-group" :class="{ 'form-group--error': $v.password.$error }" >
                  <input class="form__input" placeholder="รหัสผ่าน" type="password" v-model.trim="$v.password.$model" style="width:100%;height:37px; padding-left:10px; border: 1px solid rgba(0,0,0,.2); border-radius: 4px; font-family: Kanit, Arial, Helvetica, sans-serif !important; font-size: 16px;"/>
                </div>
                <div class="error" v-if="!$v.password.minLength" style="margin:-15px 0px 10px 0px; color: red; text-align:left;">
                  รหัสผ่านใช้ความยาว {{ $v.password.$params.minLength.min }} ตัวอักษรขึ้นไป
                </div>
              </b-col>
              <b-col style="margin-top:-5px;">
                <div class="form-group" :class="{ 'form-group--error': $v.repeatPassword.$error }" >
                  <input class="form__input" placeholder="ยืนยันรหัสผ่าน" type="password" v-model.trim="$v.repeatPassword.$model" style="width:100%;height:37px; padding-left:10px; border: 1px solid rgba(0,0,0,.2); border-radius: 4px; font-family: Kanit, Arial, Helvetica, sans-serif !important; font-size: 16px;"/>
                </div>
                <div class="error" v-if="!$v.repeatPassword.sameAsPassword" style="margin:-15px 0px 10px 0px; color: red; text-align:left;">
                  รหัสผ่านไม่ตรงกัน
                </div>
              </b-col>
            </b-row>
            <b-row style="margin-bottom: 10px;">
              <b-col style="margin-top:-15px;">
                <b-form-select
                  v-model="deptId"
                  :options="optionsDept"
                  style="height:37px; cursor: pointer; border: 1px solid rgba(0,0,0,.2); border-radius: 4px;"
                >
                </b-form-select>
              </b-col>
              <b-col style="margin-top:-15px;">
                <b-form-select
                  v-model="positionId"
                  :options="optionsPosition"
                  :disabled="false"
                  style="height:37px; cursor: pointer; border: 1px solid rgba(0,0,0,.2); border-radius: 4px;"
                >
                </b-form-select>
              </b-col>
            </b-row>
            <b-row style="margin-bottom: 10px;">
              <b-col>
                <div class="form-group" :class="{ 'form-group--error': $v.form.nestedFirstname.$error }">
                  <input class="form__input" placeholder="ชื่อ" v-model.trim="$v.form.nestedFirstname.$model" style="width:100%;height:37px; padding-left:10px; border: 1px solid rgba(0,0,0,.2); border-radius: 4px; font-family: Kanit, Arial, Helvetica, sans-serif !important; font-size: 16px;"/>
                </div>
                <div class="error" v-if="!$v.form.nestedFirstname.required" style="margin:-15px 0px 10px 0px; color: red; text-align:left;">
                  กรุณากรอกชื่อ
                </div>
              </b-col>
              <b-col>
                <div class="form-group" :class="{ 'form-group--error': $v.form.nestedLastname.$error }">
                  <input class="form__input" placeholder="นามสกุล" v-model.trim="$v.form.nestedLastname.$model" style="width:100%;height:37px; padding-left:10px; border: 1px solid rgba(0,0,0,.2); border-radius: 4px; font-family: Kanit, Arial, Helvetica, sans-serif !important; font-size: 16px;"/>
                </div>
                <div class="error" v-if="!$v.form.nestedLastname.required" style="margin:-15px 0px 10px 0px; color: red; text-align:left;">
                  กรุณากรอกนามสกุล
                </div>
              </b-col>
                <!-- <b-form-input placeholder="ชื่อ" v-model="firstName"></b-form-input>
                <b-form-input placeholder="นามสกุล" v-model="lastName"></b-form-input> -->
            </b-row>
            <b-row style="margin-bottom: 10px;">
              <b-col style="margin-top:-15px;" sm="4" >
                  <div class="form-group" :class="{ 'form-group--error': $v.form.nestedNickname.$error }">
                    <input class="form__input" placeholder="ชื่อเล่น" v-model.trim="$v.form.nestedNickname.$model" style="width:100%;height:37px; padding-left:10px; border: 1px solid rgba(0,0,0,.2); border-radius: 4px; font-family: Kanit, Arial, Helvetica, sans-serif !important; font-size: 16px;"/>
                  </div>
                  <div class="error" v-if="!$v.form.nestedNickname.required" style="margin:-15px 0px 10px 0px; color: red; text-align:left;">
                    กรุณากรอกชื่อเล่น
                  </div>
                
                <!-- <b-form-input placeholder="ชื่อเล่น" v-model="nickName"></b-form-input> -->
              </b-col>
              <b-col style="margin-top:-15px;">
                <div class="form-group" :class="{ 'form-group--error': $v.form.nestedPhone.$error }">
                  <input class="form__input" placeholder="เบอร์โทรติดต่อ" v-model.trim="$v.form.nestedPhone.$model" style="width:100%;height:37px; padding-left:10px; border: 1px solid rgba(0,0,0,.2); border-radius: 4px; font-family: Kanit, Arial, Helvetica, sans-serif !important; font-size: 16px;"/>
                </div>
                <div class="error" v-if="!$v.form.nestedPhone.required" style="margin:-15px 0px 10px 0px; color: red; text-align:left;">
                  กรุณากรอกเบอร์โทรติดต่อ
                </div>
                <!-- <ValidationProvider rules="integer" v-slot="{ errors }">
                  <input class="form-control" type="text" v-model="mobile" placeholder="เบอร์โทรติดต่อ" style="width:100%;height:37px; padding-left:10px; border: 1px solid rgba(0,0,0,.2); border-radius: 4px; font-family: Kanit, Arial, Helvetica, sans-serif !important; font-size: 16px;">
                  <p v-show="errors[0] != null && errors[0] != ''" style="color: red; text-align:left; margin-left:20px;">กรอกเฉพาะตัวเลขเท่านั้น*</p>
                </ValidationProvider>
                <b-form-input placeholder="เบอร์โทรศัทพ์"></b-form-input> -->
              </b-col>
            </b-row>
            <b-row style="margin-bottom: 10px;">
              <b-col style="margin-top:-15px;">
                <div class="form-group" :class="{ 'form-group--error': $v.form.nestedAddress.$error }" >
                  <b-form-textarea
                    style="padding-left:10px; width:100%;height:80px; "
                    v-model.trim="$v.form.nestedAddress.$model"
                    placeholder="ที่อยู่ปัจจุบัน"
                    rows="4"
                    no-resize
                    >
                  </b-form-textarea>
                  <div class="error" v-if="!$v.form.nestedAddress.required" style="margin:3px 0px 10px 0px; color: red; text-align:left;">
                  กรุณากรอกที่อยู่
                </div>
                  <!-- <div class="error" v-else><img src="../assets/Success_icon2.png" width="20" height="20" /></div> -->
                </div>
              </b-col>
            </b-row>
            <b-row style="margin-bottom: 10px;">
              <b-col style="margin-top:-20px;">
                <p style="cursor:default;"><b>วันที่เริ่มเข้ามาทำงาน :</b></p>
                <div class="form-group" :class="{ 'form-group--error': $v.form.startDate.$error }">
                  <datetime v-if="popupRegister" type="date" v-model.trim="$v.form.startDate.$model" format="dd/MM/yyyy"></datetime>
                  <div class="error" v-if="!$v.form.startDate.required"><font color="red">จำเป็น*</font></div>
                  <div class="error" v-else><img src="../assets/Success_icon2.png" width="20" height="20" /></div>
                </div>
              </b-col>
              <b-col style="margin-top:-20px; text-align:center;">
                <p style="cursor:default;"> &nbsp; </p>
                <img style="margin-top:-3px" alt="Vue logo" src="../assets/ABSLogo.png" width="165" height="60" />
              </b-col>
            </b-row>
            <b-row>
              <b-col>
              </b-col>
              <b-col style="text-align:center;">
                <b-button style="margin: 0px 0px 10px 0px; width:100%;" variant="outline-primary" @click="validationData()">บันทึก</b-button>
              </b-col>
              <b-col style="text-align:center;">
                <b-button style="margin: 0px 0px 10px 0px; width:100%;" variant="outline-danger" @click="defaultValue()">เคลียร์</b-button>
              </b-col>
              <b-col>
              </b-col>
            </b-row>
          </div>
        </div>
    </modal>
    <loading
      :active.sync="isLoading"
      :is-full-page="fullPage"
    >
    </loading>
  </div>
</template>

<script>
import Vue from "vue";
import * as mainJs from "@/assets/js/mainJS.js";
import * as authService from '@/services/auth.service';
import VueSweetalert2 from 'vue-sweetalert2';
import Swal from "sweetalert2/dist/sweetalert2.js";
import 'sweetalert2/dist/sweetalert2.min.css'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import { Datetime } from 'vue-datetime' // npm install --save luxon vue-datetime weekstart
import 'vue-datetime/dist/vue-datetime.css'
import { Settings } from 'luxon'
import { required, sameAs, minLength } from "vuelidate/lib/validators";

Vue.use(VueSweetalert2,Datetime);

export default {
  name: "popupRegisterUser",
  components: {
    Loading,
    datetime: Datetime
  },
  props: ["showPopRegister"],
  data() {
    return {
      username: '',
      name: '',
      password: '',
      repeatPassword: '',
      popupRegister:false,
      email: "",
      password:"",
      deptId:'',
      positionId:'',
      firstName:"",
      lastName:"",
      nickName:"",
      mobile:"",
      address:"",
      types: [
        'password'
        ],
      flagShow: 1,
      isLoading: false,
      fullPage:'',
      pass: "",
      confirmPass: "",
      optionsDept: [],
      optionsPosition: [],
      form: {
        startDate: '',
        nestedFirstname: '',
        nestedLastname: '',
        nestedNickname: '',
        nestedPhone: '',
        nestedAddress: ''
      },
      allEmail:{}
    }
  },
  computed: {},
  beforeMount() {
    this.$v.form.startDate.$model = mainJs.setDateToServer(new Date().toString());
  }, 
  mounted() {
    this.getDataDept();
    this.getDataPosition();
    this.getDataEmail();
  },
  methods: {
    show () {
      this.$modal.show('hello-world');
    },
    hide () {
      this.$modal.hide('hello-world');
    },
    validationData() {
      if (this.$v.username.$model == "" || this.deptId == null || this.positionId == null || this.$v.form.nestedFirstname.$model == "" || this.$v.form.nestedLastname.$model == "" || this.$v.form.nestedNickname.$model == "" || this.$v.form.nestedPhone.$model == "" ||  this.$v.form.nestedAddress.$model == "") {
          this.$swal.fire({
            heightAuto: false,
            icon: 'warning',
            title: 'กรุณากรอกข้อมูลให้ครบถ้วน'
          })
      } else {
        this.insertNewEmployee();
      }
    },
    defaultValue() {
      var ths = this;
      if (ths.showPopRegister) {
        this.$modal.show('hello-world');
        this.popupRegister = true;
        this.deptId = null,
        this.positionId = null,
        this.flagShow = 2,
        this.$v.username.$model = '',
        this.$v.name.$model = '',
        this.$v.password.$model = '',
        this.$v.repeatPassword.$model = '',
        this.$v.form.startDate.$model = "";
        this.$v.form.nestedFirstname.$model = '',
        this.$v.form.nestedLastname.$model = '',
        this.$v.form.nestedNickname.$model = '',
        this.$v.form.nestedPhone.$model = '',
        this.$v.form.nestedAddress.$model = ''
        console.log("showregister")
      }
      else {
        this.deptId = null,
        this.positionId = null,
        this.flagShow = 2,
        this.$v.username.$model = '',
        this.$v.name.$model = '',
        this.$v.password.$model = '',
        this.$v.repeatPassword.$model = '',
        this.$v.form.startDate.$model = "";
        this.$v.form.nestedFirstname.$model = '',
        this.$v.form.nestedLastname.$model = '',
        this.$v.form.nestedNickname.$model = '',
        this.$v.form.nestedPhone.$model = '',
        this.$v.form.nestedAddress.$model = ''
        console.log("popup register")
      }
    },
    getDataDept: async function(){
      var dataDept = [];
      await authService.getDataDept().then(response => {
        if (response.data != null && response.data.length > 0) {
          dataDept.push({ text: "--กรุณาเลือกแผนก--", value: null, disabled: true})
          response.data.forEach(function (obj, i) {
            dataDept.push({ text: obj.dept_name,value: obj.dept_id });
          });
          this.optionsDept = dataDept;
        }
      });
    },
    getDataPosition: async function(){
      var dataPosition = [];
      await authService.getDataPosition().then(response => {
        if (response.data != null && response.data.length > 0) {
          dataPosition.push({ text: "--กรุณาเลือกตำเเหน่ง--", value: null, disabled: true})
          response.data.forEach(function (obj, i) {
            dataPosition.push({ text: obj.position_name,value: obj.position_id });
          });
          this.optionsPosition = dataPosition;
        }
      });
    },
    getDataEmail: async function(){
      await authService.getDataEmail().then(response => {
        console.log(response.data);
        this.allEmail = response.data;
        // var email = "dsg@email.vom"
        // for(var i = 0;i < this.allEmail.length; i++){
        //   if(email != this.allEmail[i].email){
        //     console.log("true")
        //   }
        //   else if (email == this.allEmail[i].email) {
        //     console.log("false")
        //   }
        // }
      })
    },
    chkIsEmpty: function(value) {
      return value == undefined || value == null || (value + "").trim() == "";
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
    // checkEmail(email){
    //   for(var i = 0;i < this.allEmail.length; i++){
    //       if(email != this.allEmail[i].email){
    //         console.log("true")
    //       }
    //       else if (email == this.allEmail[i].email) {
    //         console.log("false")
    //       }
    //     }
    // },
    insertNewEmployee: async function(){
      this.isLoading = true
      var obj = {}
      obj["email"] = this.$v.username.$model;
      obj["password"] = this.$v.password.$model;
      obj["dept_id"] = this.deptId;
      obj["position_id"] = this.positionId;
      obj["first_name"] = this.$v.form.nestedFirstname.$model;
      obj["last_name"] = this.$v.form.nestedLastname.$model;
      obj["nick_name"] = this.$v.form.nestedNickname.$model;
      obj["mobile"] = this.$v.form.nestedPhone.$model;
      obj["address"] = this.$v.form.nestedAddress.$model;
      obj["work_start"] = mainJs.setDateToServer(this.$v.form.startDate.$model);
      console.log(obj)
        // var email = this.$v.username.$model
        // for(var i = 0;i < this.allEmail.length; i++){
        //   if(email != this.allEmail[i].email){
        //     console.log("true")
        //     await authService.insertNewEmployee(obj).then(response =>{
        //       console.log(response.data)
        //     })
        //   }
        //   else if (email == this.allEmail[i].email) {
        //     console.log("false")
        //   }
        // }
      await authService.insertNewEmployee(obj).then(response =>{
        console.log(response.data);
        if (response.data != 0) {
          Swal.fire (
              'การส่งอนุมัติเสร็จสิ้น',
              ' ',
              'success'
          )
          this.isLoading = false
        }
        else if (response.data == 0) {
          Swal.fire (
              'Email นี้มีผู้ใช้เเล้ว',
              ' ',
              'success'
          )
          this.isLoading = false
        }
      })
    }
  },
  watch: {
    showPopRegister() {
      var ths = this;
      if (ths.showPopRegister) {
        ths.defaultValue();
      }
    }
  },
    validations: {
      username: {
        minLength: minLength(6),
        required,
          isUnique(value) {
            var status = true;
            var validateEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/;
            if (!validateEmail.test(value)) {
              status = false;
            } else {
              status = true;
            }
            return status;
          }
      },
      password: {
        minLength: minLength(6)
      },
      repeatPassword: {
        sameAsPassword: sameAs('password')
      },
      name: {
        minLength: minLength(6)
      },
      form: {
        startDate: {
          required
        },
        nestedFirstname: {
          required
        },
        nestedLastname: {
          required
        },
        nestedNickname: {
          required
        },
        nestedPhone: {
          required
        },
        nestedAddress: {
          required
        }
      }
  }
};
</script>

<style>
  #popupRegisterUser .vdatetime-input {
      padding-left:10px;
      font-family: Kanit, Arial, Helvetica, sans-serif !important;
      font-size: 16px;
      height:42px; 
      width: 100%;
      border: 1px solid rgba(0,0,0,.2); 
      border-radius: 4px;
    }
</style>

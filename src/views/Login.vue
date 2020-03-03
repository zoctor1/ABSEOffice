<template>
  <div id="userLogin" class="login" :style="{ backgroundImage: 'url(' + require('@/assets/vacation6.jpg') + ')' }">
    <div class="card-image">
      <div align="center"><br attr>
        <div v-show="flagShow == 1">
          <img style="margin-top: 120px;" alt="Vue logo" src="../assets/FontLeave3.png" width="360" height="120" /><br>
          <img style="margin-top: -15px;" alt="Vue logo" src="../assets/ABSLogo10.png" width="181" height="75" />
        </div>

        <b-card v-if="flagShow == 1" bg-variant="light" tag="article" style="max-width: 22rem; margin-top: 50px;" class="mb-2">
          <p style="font-size:150%; margin:12px 0px 12px; cursor:default;"> เข้าสู่ระบบ </p>
            <b-col sm="12">
              <p align="left" style="cursor:default;">อีเมล:</p> 
              <b-form-input type="text" placeholder="กรุณากรอกอีเมล" v-model="email" @keypress="onEvtEnter"></b-form-input>
            </b-col>
            <b-col sm="12">
              <p style="margin-top:12px; cursor:default;" align="left">รหัสผ่าน:</p>
              <b-form-input  style="margin-bottom:12px" type="password" placeholder="กรุณากรอกรหัสผ่าน" v-model="pass" @keypress="onEvtEnter"></b-form-input>
            </b-col>
            <b-col sm="12">
              <center>
                <b-button style="margin:12px 0px 12px 0px" variant="primary" @click="loginUser()">
                  เข้าสู่ระบบ
                </b-button>
                <br>
              </center>
                <b-link @click="flagShow = 2">ลงทะเบียน</b-link>
            </b-col> 
        </b-card>

        <div v-else-if="flagShow == 2" >
          <b-card bg-variant="light"
            tag="article"
            style="max-width:550px; margin-top:230px"
            class="mb-2"
          >
            <b-row style="text-align:left; margin-left:0px;">
              <b-col sm="8" style="margin-top:15px">
                <p style="font-size:150%; margin-bottom:10px">ลงทะเบียนรหัสเข้าสู่ระบบ</p>
              </b-col>
              <b-col sm="4">
                <img style="margin-top:5px;" alt="Vue logo" src="../assets/ABSLogo10.png" width="127" height="53" />
              </b-col>
            </b-row>
            <b-row style="margin-bottom: 10px;">
              <b-col>
                <ValidationProvider rules="email" v-slot="{ errors }">
                  <input type="text" placeholder="อีเมล์" v-model="email" style="width:100%;height:37px; padding-left:10px; border: 1px solid rgba(0,0,0,.2); border-radius: 4px; font-family: Kanit, Arial, Helvetica, sans-serif !important; font-size: 16px;">
                  <span v-show="errors[0] != null && errors[0] != ''">กรุณากรอกอีเมล</span>
                </ValidationProvider>
                <!-- <b-form-input placeholder="อีเมล"></b-form-input> -->
              </b-col>
            </b-row>
            <b-row style="margin-bottom: 10px;" id="errors">
              <b-col>
                <ValidationProvider v-slot="{ errors }" vid="confirmation">
                  <input class="inputCheckPass" placeholder="รหัสผ่าน" v-model="password" style="width:235px;height:37px; padding-left:10px; border: 1px solid rgba(0,0,0,.2); border-radius: 4px; font-family: Kanit, Arial, Helvetica, sans-serif !important; font-size: 16px;" type="text">
                  <span v-show="errors[0] != null && errors[0] != ''">รหัสผ่านไม่ตรงกัน</span>
                </ValidationProvider>
              </b-col>
              <b-col>
                <ValidationProvider rules="confirmed:confirmation,min:4" v-slot="{ errors }">
                  <input class="form-control" placeholder="ยืนยันรหัสผ่าน" v-model="pass" type="text"  style="width:235px;height:37px; padding-left:10px; border: 1px solid rgba(0,0,0,.2); border-radius: 4px; font-family: Kanit, Arial, Helvetica, sans-serif !important; font-size: 16px;">
                  <p v-show="errors[0] != null && errors[0] != ''" style="color: red; text-align:left; margin-left:20px;">รหัสผ่านไม่ตรงกัน*</p>
                </ValidationProvider>
                <!-- <b-form-input :id="`type-${type}`" :type="type" placeholder="ยืนยันรหัสผ่าน"></b-form-input> -->
              </b-col>
            </b-row>
            <b-row style="margin-bottom: 10px;">
              <b-col>
                <b-form-select
                  v-model="deptId"
                  :options="optionsDept"
                  @change="filterData()"
                  style="height:42px; cursor: pointer; border: 1px solid rgba(0,0,0,.2); border-radius: 4px;"
                >
                </b-form-select>
              </b-col>
              <b-col>
                <b-form-select
                  v-model="positionId"
                  :options="optionsPosition"
                  style="height:42px; cursor: pointer; border: 1px solid rgba(0,0,0,.2); border-radius: 4px;"
                >
                </b-form-select>
              </b-col>
            </b-row>
            <b-row style="margin-bottom: 10px;">
              <b-col>
                <b-form-input placeholder="ชื่อ" v-model="firstName"></b-form-input>
              </b-col>
              <b-col>
                <b-form-input placeholder="นามสกุล" v-model="lastName"></b-form-input>
              </b-col>
            </b-row>
            <b-row style="margin-bottom: 10px;">
              <b-col sm="4">
                <b-form-input placeholder="ชื่อเล่น" v-model="nickName"></b-form-input>
              </b-col>
              <b-col>
                <ValidationProvider rules="integer" v-slot="{ errors }">
                  <input type="text" v-model="mobile" placeholder="เบอร์โทรติดต่อ" style="width:100%;height:37px; padding-left:10px; border: 1px solid rgba(0,0,0,.2); border-radius: 4px; font-family: Kanit, Arial, Helvetica, sans-serif !important; font-size: 16px;">
                  <span>{{ errors[0] }}</span>
                </ValidationProvider>
                <!-- <b-form-input placeholder="เบอร์โทรศัทพ์"></b-form-input> -->
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <b-form-textarea
                style="width:100%;height:80px;"
                v-model="address"
                placeholder="ที่อยู่ปัจจุบัน"
                rows="4"
                no-resize
                >
              </b-form-textarea>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <center><b-button style="margin: 15px 0px 10px 0px" variant="outline-primary" @click="insertNewEmployee()">ส่งการลงทะเบียน</b-button></center>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <b-link style="text-align:right;" @click="flagShow = 1">ย้อนกลับ</b-link>
              </b-col>
            </b-row>
          </b-card>
        </div>
        <br>
      </div>
      <loading
        :active.sync="isLoading"
        :is-full-page="fullPage"
      >
      </loading>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import * as authService from '@/services/auth.service';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import VeeValidate from 'vee-validate'; //npm install vee-validate@"<3.0.0" --save
import { ValidationProvider } from 'vee-validate';

Vue.use(VueSweetalert2,VeeValidate);

export default {
  name: "Login",
  components: {
    Loading,
    ValidationProvider
  },
  props: {},
  data() {
    return {
      output: "aaaa",
      email: "",
      password:"",
      deptId:"",
      positionId:"",
      firstName:"",
      lastName:"",
      nickName:"",
      mobile:"",
      address:"",
      types: [
        'password'
        ],
      flagShow: 1,
      pass: "1234",
      textError: "รหัสผ่านไม่ถูกต้อง",
      isLoading: false,
      fullPage:'',
      pass: '',
      confirmPass: "",
      optionsDept: [],
      optionsPosition: [],
    }
  },
  computed: {},
  mounted() {
    this.getDataDept();
    this.getDataPosition();
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false}, 2000);
      
  },
  methods: {
    onEvtEnter: function(evt) {
      if (evt.keyCode == 13) {
        this.loginUser();
      }
    },
    toURL: function(url) {
      this.$router.push("/" + url);
    },
    filterData(){
      var ths = this
      if(ths.deptId != null && ths.deptId != ""){
        var dept = ths.optionsDept
        dept = dept.filter(function(v) {   
          return v.value == ths.deptId;
        });
      }
    },
    loginUser: function(){
      if (this.email == "" && this.pass == "") {
          this.$swal.fire({
            heightAuto: false,
            icon: 'warning',
            title: 'กรุณากรอกอีเมล และ รหัสผ่าน'
          })
      } else if (this.email == "") {
          this.$swal.fire({
            heightAuto: false,
            icon: 'warning',
            title: 'กรุณากรอกอีเมล'
          })
      } else if (this.pass == "") {
          this.$swal.fire({
            heightAuto: false,
            icon: 'warning',
            title: 'กรุณากรอกรหัสผ่าน'
          })
      } else {
          authService.loginUser( encodeURI(this.email), encodeURI(this.pass)).then(response => { 
            if (response.data != "" && response.data != null && response.data != undefined) {
              this.toURL("Homepage");
              localStorage.setItem("user", JSON.stringify(response.data));
            } else {
              this.$swal.fire({
                heightAuto: false,
                icon: 'error',
                title: this.textError
              });
            }
          });
        }
    },
    getDataDept: async function(){
      var dataDept = [];
      await authService.getDataDept().then(response => {
        console.log(response.data)
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
        console.log(response.data)
        if (response.data != null && response.data.length > 0) {
          dataPosition.push({ text: "--กรุณาเลือกตำเเหน่ง--", value: null, disabled: true})
          response.data.forEach(function (obj, i) {
            dataPosition.push({ text: obj.position_name,value: obj.position_id });
          });
          this.optionsPosition = dataPosition;
        }
      });
    },
    insertNewEmployee: async function(){
      var obj = {}
      obj["email"] = this.email;
      obj["password"] = this.password;
      obj["dept_id"] = this.deptId;
      obj["position_id"] = this.positionId;
      obj["first_name"] = this.firstName;
      obj["last_name"] = this.lastName;
      obj["nick_name"] = this.nickName;
      obj["mobile"] = this.mobile;
      obj["address"] = this.address;
      await authService.insertNewEmployee(obj).then(response =>{
        console.log(response.data)
      })
    }
  },
  watch: {}
};
</script>

<style scoped>
  #userLogin {
    width: 100%;
    min-height: 100%;
    background-size: cover;
    background-position: 0% 100%;
    background-position: center;
    background-repeat: no-repeat; 
  }
  body {
    font-family: 
    "Open Sans", -apple-system, BlinkMacSystemFont,
    "Segoe UI",  Roboto, Oxygen-Sans, Ubuntu, Cantarell,
    "Helvetica Neue", Helvetica,  Arial, sans-serif;
  }
  .inputCheckPass:focus {
    background-color: #0000;
    background-clip: padding-box;
    border: 4px;
    border-radius: 0.25rem;
  }
</style>

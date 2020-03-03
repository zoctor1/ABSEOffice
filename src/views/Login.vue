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
                  <input class="form-control" type="text" placeholder="อีเมล" v-model="value" style="width:100%;height:37px; padding-left:10px; border: 1px solid rgba(0,0,0,.2); border-radius: 4px; font-family: Kanit, Arial, Helvetica, sans-serif !important; font-size: 16px;">
                  <p v-show="errors[0] != null && errors[0] != ''" style="color: red; text-align:left; margin-left:20px;">กรุณากรอกอีเมล*</p>
                </ValidationProvider>
                <!-- <b-form-input placeholder="อีเมล"></b-form-input> -->
              </b-col>
            </b-row>
            <b-row style="margin-bottom: 10px;" id="errors">
              <b-col>
                <ValidationProvider v-slot="{ errors }" vid="confirmation">
                  <input class="form-control" placeholder="รหัสผ่าน" v-model="confirmPass" type="password" style="width:235px;height:37px; padding-left:10px; border: 1px solid rgba(0,0,0,.2); border-radius: 4px; font-family: Kanit, Arial, Helvetica, sans-serif !important; font-size: 16px;">
                  <p v-show="errors[0] != null && errors[0] != ''" style="color: red; text-align:left; margin-left:20px;">รหัสผ่านไม่ตรงกัน*</p>
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
                <b-form-input placeholder="ชื่อ"></b-form-input>
              </b-col>
              <b-col>
                <b-form-input placeholder="นามสกุล"></b-form-input>
              </b-col>
            </b-row>
            <b-row style="margin-bottom: 10px;">
              <b-col sm="4">
                <b-form-input placeholder="ชื่อเล่น"></b-form-input>
              </b-col>
              <b-col>
                <ValidationProvider rules="integer" v-slot="{ errors }">
                  <input class="form-control" type="text" v-model="value" placeholder="เบอร์โทรติดต่อ" style="width:100%;height:37px; padding-left:10px; border: 1px solid rgba(0,0,0,.2); border-radius: 4px; font-family: Kanit, Arial, Helvetica, sans-serif !important; font-size: 16px;">
                  <p v-show="errors[0] != null && errors[0] != ''" style="color: red; text-align:left; margin-left:20px;">กรอกเฉพาะตัวเลขเท่านั้น*</p>
                </ValidationProvider>
                <!-- <b-form-input placeholder="เบอร์โทรศัทพ์"></b-form-input> -->
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <b-form-textarea
                style="width:100%;height:80px;"
                placeholder="ที่อยู่ปัจจุบัน"
                rows="4"
                no-resize
                >
              </b-form-textarea>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <center><b-button style="margin: 15px 0px 10px 0px" variant="outline-primary">ส่งการลงทะเบียน</b-button></center>
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
      email: '',
      types: [
        'password'
        ],
      flagShow: 1,
      email: "hr@abs.co.th",
      pass: "1234",
      textError: "รหัสผ่านไม่ถูกต้อง",
      isLoading: false,
      fullPage:'',
      pass: '',
      confirmPass: ""
    }
  },
  computed: {},
  mounted() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false}, 1000);
      
  },
  methods: {
    
    onEvtEnter: function(evt) {
      if (evt.keyCode == 13) {
        // console.log(evt)
        this.loginUser();
      }
    },
    toURL: function(url) {
      this.$router.push("/" + url);
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
          // console.log(response)
          if (response.data != "" && response.data != null && response.data != undefined) {
            // console.log(response.data)
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

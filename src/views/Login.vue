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
                <!-- <b-link @click="defaultValue()">ลงทะเบียน</b-link> -->
            </b-col> 
        </b-card>
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
    this.checkSession();
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false}, 1000);
  },
  methods: {
    checkSession(){
      var user = JSON.parse(localStorage.getItem("user"));
      console.log(user)
      if(user != null && user != ""){
        this.toURL("Homepage");
      }
      else{
        this.toURL("Login");
      }
    },
    validationData() {
      if (this.email == "" || this.deptId == null || this.positionId == null || this.firstName == "" || this.lastName == "" || this.nickName == "" || this.mobile == "" ||  this.address == "") {
          this.$swal.fire({
            heightAuto: false,
            icon: 'warning',
            title: 'กรุณากรอกข้อมูลให้ครบถ้วน'
          })
      } 
    },
    defaultValue() {
      this.email = "",
      this.password = "",
      this.deptId = null,
      this.positionId = null,
      this.firstName = "",
      this.lastName = "",
      this.nickName = "",
      this.mobile = "",
      this.address = "",
      this.flagShow = 2
    },
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
              this.toURL("HomePage");
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
}
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
</style>

<template>
  <div id="userLogin" class="login" :style="{ backgroundImage: 'url(' + require('@/assets/vacation6.jpg') + ')' }">
    <div class="card-image">
      <div align="center"><br>
        <img style="margin-top: 120px;" alt="Vue logo" src="../assets/FontLeave2.png" width="360" height="120" /><br>
        <img style="margin-top: -15px;" alt="Vue logo" src="../assets/ABSLogo10.png" width="181" height="75" />

        <b-card v-if="flagShow == 1" bg-variant="light" tag="article" style="max-width: 22rem; margin-top: 80px;" class="mb-2">
          <p style="font-size:150%; margin:12px 0px 12px; cursor:default;"> ล็อคอินเข้าสู่ระบบ </p>
            <b-col sm="12">
              <p align="left" style="cursor:default;">Email:</p>
              <b-form-input type="text" placeholder="กรุณากรอกอีเมล" v-model="email" @keypress="onEvtEnter"></b-form-input>
            </b-col>
            <b-col sm="12">
              <p style="margin-top:12px; cursor:default;" align="left">Password:</p>
              <b-form-input  style="margin-bottom:12px" type="password" placeholder="กรุณากรอกรหัสผ่าน" v-model="pass" @keypress="onEvtEnter"></b-form-input>
            </b-col>
            <b-col sm="12">
              <center>
                <b-button style="margin:12px 0px 12px 0px" variant="primary" @click="loginUser()">
                  เข้าสู่ระบบ
                </b-button>
                <br>
              </center>
                <!-- <b-link @click="flagShow = 2">ลืมรหัสผ่าน?</b-link> -->
            </b-col> 
        </b-card>
        <div v-else-if="flagShow == 2" >
          <b-card bg-variant="light"
            tag="article"
            style="max-width: 22rem; margin-top: 80px;"
            class="mb-2"
          >
          <p style="font-size:150%; margin-bottom:10px"> เราต้องตรวจสอบข้อมูลประจำตัวของคุณ </p>
            <b-col sm="12">
              <p align="left" style="margin-bottom:10px">กรอกอีเมลเพื่อรับรหัสในการเข้าสู่ระบบการเปลี่ยนรหัสต่อไป </p><b-form-input type="Username" placeholder="กรอก Email"></b-form-input>
            </b-col>
            <b-col sm="12">
              <center><b-button style="margin: 15px 0px 10px 0px" @click="flagShow = 1" variant="outline-primary">ตกลง</b-button></center>
                <b-link @click="flagShow = 1">ย้อนกลับ</b-link>
            </b-col>
          </b-card>
        </div>
        <br>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import * as authService from '@/services/auth.service';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'
Vue.use(VueSweetalert2);

export default {
  name: "Login",
  components: {
    // Swal
  },
  props: {},
  data() {
    return {
      flagShow: 1,
      email: "hr@abs.co.th",
      pass: "1234",
      textError: "รหัสผ่านไม่ถูกต้อง",
    }
  },
  computed: {},
  mounted() {},
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
          console.log(response)
          if (response.data != "" && response.data != null && response.data != undefined) {
            console.log(response.data)
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
  /* 
  background-position: 0% 100%; background-repeat: no-repeat; background-size: auto; 
  */
  body {
    font-family: 
    "Open Sans", -apple-system, BlinkMacSystemFont, 
    "Segoe UI",  Roboto, Oxygen-Sans, Ubuntu, Cantarell, 
    "Helvetica Neue", Helvetica,  Arial, sans-serif; 
  }
</style>

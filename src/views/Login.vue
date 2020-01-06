<template>
  <div id="resetPassword" :style="{ backgroundImage: 'url(' + require('@/assets/vacation6.jpg') + ')' }">
    <div class="card-image">
      <div align="center"><br>
        <img style="margin-top: 120px;" alt="Vue logo" src="../assets/FontLeave2.png" width="360" height="120" /><br>
        <img style="margin-top: -15px;" alt="Vue logo" src="../assets/ABSLogo10.png" width="181" height="75" />

        <b-card v-if="flagShow == 1" bg-variant="light" tag="article" style="max-width: 22rem; margin-top: 80px;" class="mb-2">
          <p style="font-size:150%; margin:12px 0px 12px"> sign in </p>
            <b-col sm="12">
              <h3>sdddddddddddddddddddddddddddddddddd;lakjsdfl;kjasdlkfjasdlk;fj</h3>
              <p align="left">User ID:</p>
              <b-form-input type="text" placeholder="กรุณาใส่อีเมลหรือชื่อผู้ใช้งาน" v-model="email"></b-form-input>
            </b-col>
            <b-col sm="12">
              <p style="margin-top:12px;" align="left">Password:</p>
              <b-form-input  style="margin-bottom:12px" type="password" placeholder="กรุณาใส่รหัสผ่าน" v-model="pass"></b-form-input>
            </b-col>
            <b-col sm="12">
                <b-link @click="flagShow = 2">Forgot your password?</b-link>
              <center>
                <b-button style="margin:12px 0px 12px 0px" variant="primary" @click="loginUser()">
                  Login
                </b-button>
                <br>
              </center>
            </b-col> 
        </b-card>
        <div v-else-if="flagShow == 2" >
          <b-card bg-variant="light"
            tag="article"
            style="max-width: 22rem; margin-top: 80px;"
            class="mb-2"
          >
          <p style="font-size:150%; margin-bottom:15px"> เราต้องตรวจสอบข้อมูลประจำตัวของคุณ </p>
            <b-col sm="12">
              <p align="left">กรอกอีเมลเพื่อรับรหัสในการเข้าสู่ระบบการเปลี่ยนรหัสต่อไป </p><b-form-input type="Username" placeholder="กรอก Email"></b-form-input>
            </b-col>
            <b-col sm="12">
              <p align="left" style="margin-top: 10px" >รหัสยืนยันตัวตน 6 หลัก </p><b-form-input type="password" placeholder="กรอกรหัสผ่าน"></b-form-input>
            </b-col>
            <b-col sm="12">
              <center><b-button style="margin-top: 10px" @click="flagShow = 1" variant="outline-primary">ตกลง</b-button></center>
                <b-link @click="flagShow = 1">Return to sign in</b-link>
            </b-col> 
          </b-card>
        </div>
        <br>
      </div>
    </div>
  </div>
</template>

<script>
import * as authService from '@/services/auth.service';

export default {
  name: "Login",
  components: {},
  props: {},
  data() {
    return {
      flagShow: 1,
      email: "",
      pass: ""
    }
  },
  computed: {},
  mounted() {},
  methods: {
    toURL: function(url) {
      this.$router.push("/" + url);
    },
    loginUser: function(){
      authService.loginUser(this.email,this.pass).then(response => {
        if (response.data != undefined && response.data != null && response.data != "") {
          console.log(response.data)
          this.toURL("Homepage");
        } else {
          console.log("Nooo!!")
        }
        
      });
    }
  },
  watch: {}
};
</script>

<style scoped>
  #resetPassword {
    height: 100%;
    background-size: cover;
    background-position: 0% 100%;
    background-position: center;
    background-repeat: no-repeat;
  }
</style>

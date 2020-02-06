<template>
  <div id="inc_menu">
    <vs-navbar
      v-model="indexActive"
      :color="colorx"
      text-color="rgba(255,255,255,.6)"
      active-text-color="rgba(255,255,255,1)"
      class="myNavbar">
    <div slot="title">
      <vs-navbar-title>
        <img style="cursor: pointer;" @click="toUrl('Main'), indexActive = 0" alt="Vue logo" src="../assets/ABSLogo9.png" width="180" height="60" /> 
      </vs-navbar-title>
    </div>

    <vs-navbar-item index="0">
      <a style="cursor: pointer;" @click="toUrl('Main'), indexActive = 0"><font style="font-size: 20px;" color="#FEFCFF">หน้าเเรก</font></a>
    </vs-navbar-item>
    <vs-navbar-item index="1">
      <a style="cursor: pointer;" @click="toUrl('EmpLeave'), indexActive = 1"><font style="font-size: 20px;" color="#FEFCFF">ข้อมูลการลางาน</font></a>
    </vs-navbar-item>
    <!-- <vs-navbar-item index="2" >
      <a style="cursor: pointer;" @click="toUrl('EmpOT')"><font size=3 color="#FEFCFF">(User) ข้อมูลการทำงานนอกเวลา(OT)</font></a>
    </vs-navbar-item> -->
    <vs-navbar-item index="2">
      <a style="cursor: pointer;" @click="toUrl('HeaderApprove'), indexActive = 2"><font style="font-size: 20px;" color="#FEFCFF">(Header) การอนุมัติลางาน</font></a>
    </vs-navbar-item>
    <vs-navbar-item index="3">
      <a style="cursor: pointer;" @click="toUrl('HrLeave'), indexActive = 3"><font style="font-size: 20px;" color="#FEFCFF">(Hr) ข้อมูลการลางานของพนักงาน</font></a>
    </vs-navbar-item>
    <!-- <vs-navbar-item index="5" style="margin-right:10px;">
      <a style="cursor: pointer;" @click="toUrl('HrOT')"><font size=3 color="#FEFCFF">(Hr) ข้อมูลการทำงานนอกเวลาของพนักงาน</font></a>
    </vs-navbar-item> -->

    <vs-spacer></vs-spacer>
    <p class="my-4" style="margin: 0px 30px 0px 10px; border-left: 2px solid rgb(255, 255, 255); cursor:default;">
      <b-row>
         <b> &nbsp; &nbsp; &nbsp;{{userIn.first_name}} {{userIn.last_name}}</b>
      </b-row>
      <b-row>
         <b> &nbsp; &nbsp; &nbsp;{{userIn.dept_name}}</b>
      </b-row>
    </p>

    <div class="dropdown">
      <div style="cursor: pointer; margin:0px 50px 0px 20px;" class="dropbtn">
        <img src="../assets/user.png" width="40" height="40">
      </div>
      <div class="dropdown-content">
        <a @click="show()" style="cursor: default; color: black;"> 
          ข้อมูลส่วนตัว
        </a>
        <a style="color: black; cursor: pointer;" @click="logout()">
          ออกจากระบบ
        </a>
      </div>
    </div>
    </vs-navbar>
     <modal 
        name="modalShowData" 
        :clickToClose="false"
        height="auto"
        width="520px"
      >
      <p style="background-color: #f1f1f1; font-size: 22px; margin-bottom:10px; font-weight:bold; padding: 10px 10px 10px 20px; cursor:default;">
        ข้อมูลส่วนตัว 
        <button type="button" aria-label="Close" class="close" @click="hide()" >
          <img src="../assets/Close-icon.png" width="33" height="33" />
        </button>
      </p>
      <div style="padding: 0px 20px 20px 25px">
        <p style="font-size: 18px;" class="my-4">ชื่อ : {{userIn.first_name}} {{userIn.last_name}}</p>
        <p style="font-size: 18px;" class="my-4">แผนก : {{userIn.dept_name}}</p>
        <p style="font-size: 18px;" class="my-4">ตำแหน่ง : {{userIn.position_name}}</p>
        <p style="font-size: 18px;" class="my-4">E-mail : {{userIn.username}}</p>
        <p style="font-size: 18px;" class="my-4">เบอร์โทรติดต่อ : {{userIn.mobile}}</p>
      </div>
    </modal>
  </div>
</template>

<script>
import Vue from 'vue'
import 'vuesax/dist/vuesax.css'
import * as mJS from "../assets/js/mainJS"
import * as authService from '@/services/auth.service';
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faSignOutAlt, faBell } from "@fortawesome/free-solid-svg-icons";
import VModal from 'vue-js-modal'
 
Vue.use(VModal)
library.add(faSignOutAlt, faBell);

export default {
  name: "inc_menu",
  components: {
    FontAwesomeIcon
  },
  props: {},
  data() {
    return {
      userIn:{},
      colorx:'#ff6173',
      indexActive: 0,
      colorxx:'#c72a75',
      colorx2:'#5252e8',
    };
  },
  computed: {},
  beforeMount() {
    this.userIn = JSON.parse(localStorage.getItem("user"));
    if (this.$route.name == "EmpLeave") {
      this.indexActive = 1;
    } else if (this.$route.name == "HeaderApprove") {
      this.indexActive = 2;
    } else if (this.$route.name == "HrLeave") {
      this.indexActive = 3;
    } else {
      this.indexActive = 0;
    }
  },
  mounted() {
  },
  methods: {
    show () {
      this.$modal.show('modalShowData');
    },
    hide () {
      this.$modal.hide('modalShowData');
    },
    toUrl: function(url) {
      this.$router.push("/" + url);
    },
    logout: function(){
      this.$router.push("/Login");
      localStorage.removeItem("user");
    }
  },
  watch: {},
};
</script>

<style scoped>
  .myNavbar{
    width: auto;
    color: rgb(255, 255, 255);
  }
  .dropbtn {
    background-color: transparent;
  }
  .dropdown {
    position: relative;
  }
  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
    left: -60%;
  }
  .dropdown-content a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
  }
  .dropdown-content a:hover {
    background-color: #f1f1f1
  }
  .dropdown:hover .dropdown-content {
    display: block;
  }
</style>

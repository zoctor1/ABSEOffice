<template>
  <div id="inc_menu" style="margin-bottom:96px">
    <vs-navbar
      style="position:fixed; width:100%; margin-top:-96px;"
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
      <a style="cursor: pointer;" @click="toUrl('Main'), indexActive = 0"><font style="font-size: 20px;" color="#FEFCFF">หน้าหลัก</font></a>
    </vs-navbar-item>
    <vs-navbar-item index="1">
      <a style="cursor: pointer;" @click="toUrl('EmpLeave'), indexActive = 1"><font style="font-size: 20px;" color="#FEFCFF">ข้อมูลการลางาน</font></a>
    </vs-navbar-item>
    <!-- <vs-navbar-item index="2" >
      <a style="cursor: pointer;" @click="toUrl('EmpOT')"><font size=3 color="#FEFCFF">(User) ข้อมูลการทำงานนอกเวลา(OT)</font></a>
    </vs-navbar-item> -->
    <vs-navbar-item index="2">
      <!-- v-if="userIn.header_flag == 1" -->
      <a style="cursor: pointer;" @click="toUrl('HeaderApprove'), indexActive = 2"><font style="font-size: 20px;" color="#FEFCFF">คำขออนุมัติการลางาน</font></a>
    </vs-navbar-item>
    <vs-navbar-item index="3">
      <!-- v-if="userIn.dept_id == 3" -->
      <a style="cursor: pointer;" @click="toUrl('HrLeave'), indexActive = 3"><font style="font-size: 20px;" color="#FEFCFF">ข้อมูลการลางานของพนักงาน</font></a>
    </vs-navbar-item>
    <!-- <vs-navbar-item index="5" style="margin-right:10px;">
      <a style="cursor: pointer;" @click="toUrl('HrOT')"><font size=3 color="#FEFCFF">(Hr) ข้อมูลการทำงานนอกเวลาของพนักงาน</font></a>
    </vs-navbar-item> -->

    <vs-spacer></vs-spacer>
    <p class="my-4" style="margin: 0px 30px 0px 10px; border-left: 2px solid rgb(255, 255, 255); cursor:default; text-align: right;">
         <b> &nbsp; &nbsp; &nbsp;{{userIn.first_name}} {{userIn.last_name}}</b>
        <br>
         <b> &nbsp;{{userIn.dept_name}}</b>
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
        width="440px"
      >
      <p style="background-color: #f1f1f1; font-size: 22px; margin-bottom:10px; font-weight:bold; padding: 10px 10px 10px 20px; cursor:default;">
        ข้อมูลส่วนตัว 
        <button type="button" aria-label="Close" class="close" @click="hide()" >
          <img src="../assets/Close-icon.png" width="33" height="33" />
        </button>
      </p>
      <div style="padding: 0px 20px 20px 25px">
        <b-row style=" margin:0px 10px 5px 0px;">
          <b-col>
            <p><b style="font-size: 18px;">ชื่อ : </b></p>
          </b-col>
          <b-col>
            <p style="font-size: 18px;">{{userIn.first_name}} {{userIn.last_name}}</p>
          </b-col>
        </b-row>

        <b-row style=" margin:0px 10px 5px 0px;">
          <b-col>
            <p><b style="font-size: 18px;">ชื่อเล่น : </b></p>
          </b-col>
          <b-col>
            <p style="font-size: 18px;">{{userIn.nick_name}} </p>
          </b-col>
        </b-row>

        <b-row style=" margin:0px 10px 5px 0px;">
          <b-col>
            <p><b style="font-size: 18px;">แผนก : </b></p>
          </b-col>
          <b-col>
            <p style="font-size: 18px;">{{userIn.dept_name}}</p>
          </b-col>
        </b-row>

        <b-row style=" margin:0px 10px 5px 0px;">
          <b-col>
            <p><b style="font-size: 18px;">ตำแหน่ง : </b></p>
          </b-col>
          <b-col>
            <p style="font-size: 18px;">{{userIn.position_name}}</p>
          </b-col>
        </b-row>
        
        <b-row style=" margin:0px 10px 5px 0px;">
          <b-col>
            <p><b style="font-size: 18px;">E-mail : </b></p>
          </b-col>
          <b-col>
            <p style="font-size: 18px;">{{userIn.username}}</p>
          </b-col>
        </b-row>

        <b-row style=" margin:0px 10px 5px 0px;">
          <b-col>
            <p><b style="font-size: 18px;">เบอร์โทรติดต่อ : </b></p>
          </b-col>
          <b-col>
            <p style="font-size: 18px;">{{userIn.mobile}}</p>
          </b-col>
        </b-row>
        
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
import Vue from 'vue'
import 'vuesax/dist/vuesax.css'
import * as mJS from "../assets/js/mainJS"
import * as authService from '@/services/auth.service';
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faSignOutAlt, faBell } from "@fortawesome/free-solid-svg-icons";
import VModal from 'vue-js-modal'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
 
Vue.use(VModal)
library.add(faSignOutAlt, faBell);

export default {
  name: "inc_menu",
  components: {
    FontAwesomeIcon,
    Loading
  },
  props: {},
  data() {
    return {
      userIn:{},
      colorx:'#ff6173',
      indexActive: 0,
      colorxx:'#c72a75',
      colorx2:'#5252e8',
      isLoading: false,
      fullPage:''
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
    logout: async function(){
      this.$router.push("/Login");
      this.isLoading = true;
      await localStorage.removeItem("user");
      this.isLoading = false
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

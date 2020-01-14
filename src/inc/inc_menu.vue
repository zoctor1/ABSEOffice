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
          <img style="cursor: pointer;" @click="toUrl('Main')" alt="Vue logo" src="../assets/ABSLogo9.png" width="180" height="60" /> 
        </vs-navbar-title>   
      </div>

      <vs-navbar-item index="0">
        <a style="cursor: pointer;" @click="toUrl('Main')"><font size=3 color="#FEFCFF">หน้าเเรก</font></a>
      </vs-navbar-item>
      <vs-navbar-item index="1">
        <a style="cursor: pointer;" @click="toUrl('EmpLeave')"><font size=3 color="#FEFCFF"> ข้อมูลการลางาน</font></a>
      </vs-navbar-item>
      <vs-navbar-item index="2" >
        <a style="cursor: pointer;" @click="toUrl('EmpOT')"><font size=3 color="#FEFCFF">(User) ข้อมูลการทำงานนอกเวลา(OT)</font></a>
      </vs-navbar-item>
      <vs-navbar-item index="3">
        <a style="cursor: pointer;" @click="toUrl('HeaderApprove')"><font size=3 color="#FEFCFF">(Header) การอนุมัติลางาน</font></a>
      </vs-navbar-item>
      <vs-navbar-item index="4">
        <a style="cursor: pointer;" @click="toUrl('HrLeave')"><font size=3 color="#FEFCFF">(Hr) ข้อมูลการลางานของพนักงาน</font></a>
      </vs-navbar-item>
      <vs-navbar-item index="5" style="margin-right:10px;">
        <a style="cursor: pointer;" @click="toUrl('HrOT')"><font size=3 color="#FEFCFF">(Hr) ข้อมูลการทำงานนอกเวลาของพนักงาน</font></a>
      </vs-navbar-item>

      <vs-spacer></vs-spacer>

      <div class="dropdown">
        <div style="cursor: pointer; margin:0px 20px 0px 20px;" class="dropbtn">
          <img src="../assets/user.png" width="40" height="40">
        </div>
        <div class="dropdown-content">
          <a href="#" v-b-modal.modal-center>ข้อมูลส่วนตัว
            <b-modal id="modal-center" :hide-footer="true" centered >
              <template v-slot:modal-header="{  }">
                <label style="font-size: 18px;" ><img src="../assets/user.png" style="margin-right:7px; width: 30px; height: 30px;"  class="userIcon">ข้อมูลส่วนตัว</label>
              </template>
              <p class="my-4">ชื่อ : {{userIn.first_name}} {{userIn.last_name}}</p>
              <p class="my-4">แผนก : {{userIn.dept_name}}</p>
              <p class="my-4">ตำแหน่ง : {{userIn.position_name}}</p>
              <p class="my-4">E-mail : {{userIn.username}}</p>
              <p class="my-4">เบอร์ติดต่อ : {{userIn.mobile}}</p>
              <center><b-button v-b-modal.modal-footer-sm>แก้ไขข้อมูล</b-button></center>
            </b-modal>
          </a>
        </div>
      </div>
        <!-- <img style="cursor: pointer; margin:0px 20px 0px 10px;" @click="toUrl('Main')" alt="Vue logo" src="../assets/user.png" width="40" height="40" /> -->
    
      <vs-button @click="logout()" style="margin-right:25px;" color="danger" type="gradient" > 
        <font-awesome-icon icon="sign-out-alt" style="margin-right:8px;" />
        ออกจากระบบ 
      </vs-button>
    </vs-navbar>
  </div>
</template>

<script>
import 'vuesax/dist/vuesax.css'
import * as mJS from "../assets/js/mainJS"
import * as authService from '@/services/auth.service';
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faSignOutAlt, faBell } from "@fortawesome/free-solid-svg-icons";

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
      colorx2:'#5252e8'
    };
  },
  computed: {},
  mounted() {
    this.userIn = JSON.parse(localStorage.getItem("user"));
  },
  methods: {
    toUrl: function(url) {
      this.$router.push("/" + url);
    },
    logout: function(){
      this.$router.push("/Login");
      localStorage.removeItem("user");
    }
  },
  watch: {}
};
</script>

<style scoped>


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

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
            <b-row style="margin-left:0px;">
              <b-col style="text-align:center;">
                <img style="margin-top:5px;" alt="Vue logo" src="../assets/ABSLogo10.png" width="127" height="53" />
              </b-col>
            </b-row>
            <b-row style="margin-bottom: 10px;">
              <b-col>
                <ValidationProvider  rules="email" v-slot="{ errors }">
                  <input type="text" placeholder="อีเมล์" v-model="email" style="width:100%;height:37px; padding-left:10px; border: 1px solid rgba(0,0,0,.2); border-radius: 4px; font-family: Kanit, Arial, Helvetica, sans-serif !important; font-size: 16px;">
                  <p v-show="errors[0] != null && errors[0] != ''" style="color: red; text-align:left; margin-left:20px;">กรุณากรอกอีเมล*</p>
                </ValidationProvider>
                <!-- <b-form-input placeholder="อีเมล"></b-form-input> -->
              </b-col>
            </b-row>
            <b-row style="margin-bottom: 10px;" id="errors">
              <b-col>
                <ValidationProvider v-slot="{ errors }" vid="confirmation">
                  <input class="form-control" placeholder="รหัสผ่าน" v-model="password" type="password" style="width:100%;height:37px; padding-left:10px; border: 1px solid rgba(0,0,0,.2); border-radius: 4px; font-family: Kanit, Arial, Helvetica, sans-serif !important; font-size: 16px;">
                  <p v-show="errors[0] != null && errors[0] != ''" style="color: red; text-align:left; margin-left:20px;">รหัสผ่านไม่ตรงกัน*</p>
                </ValidationProvider>
              </b-col>
              <b-col>
                <ValidationProvider rules="confirmed:confirmation" v-slot="{ errors }">
                          <!-- rules="confirmed:confirmation"  -->
                  <input class="form-control" placeholder="ยืนยันรหัสผ่าน" v-model="pass" type="password"  style="width:100%;height:37px; padding-left:10px; border: 1px solid rgba(0,0,0,.2); border-radius: 4px; font-family: Kanit, Arial, Helvetica, sans-serif !important; font-size: 16px;">
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
                  style="height:37px; cursor: pointer; border: 1px solid rgba(0,0,0,.2); border-radius: 4px;"
                >
                </b-form-select>
              </b-col>
              <b-col>
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
                  <p v-show="errors[0] != null && errors[0] != ''" style="color: red; text-align:left; margin-left:20px;">กรอกเฉพาะตัวเลขเท่านั้น*</p>
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
                <center><b-button style="margin: 15px 0px 10px 0px" variant="outline-primary" @click="validationData()">ส่งการลงทะเบียน</b-button></center>
              </b-col>
            </b-row>
          </div>
        </div>
    </modal>
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
  name: "popupRegisterUser",
  components: {
    Loading,
    ValidationProvider
  },
  props: ["showPopRegister"],
  data() {
    return {
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
      this.isLoading = false}, 1000);
  },
  methods: {
    show () {
      this.$modal.show('hello-world');
    },
    hide () {
      this.$modal.hide('hello-world');
    },
    validationData() {
      if (this.email == "" || this.deptId == null || this.positionId == null || this.firstName == "" || this.lastName == "" || this.nickName == "" || this.mobile == "" ||  this.address == "") {
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
      this.$modal.show('hello-world');
      this.popupRegister = true;
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
      console.log(obj)
      await authService.insertNewEmployee(obj).then(response =>{
        console.log(response.data)
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
};
</script>

<style scoped>
</style>

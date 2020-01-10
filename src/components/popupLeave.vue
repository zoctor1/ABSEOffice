<template>
  <div id="popupLeave">
    <div>
      <b-col sm="12">
        <div>
          <vs-button 
            @click="popupLeave=true" 
            color="primary" 
            type="filled"
          >
            <img src="../assets/Plus_icon3.png" width="20" height="20" /> เพิ่มการลา
          </vs-button>
        </div>
      </b-col>
    </div>
    <vs-popup id="sizePopupLeave" classContent="popupLeave-example"  title="ประวัติการลาของนายเอกชัย หมโมลี" :active.sync="popupLeave" >
      <center><h4>นายเอกชัย หมโมลี</h4></center>
      <center><h5>แผนก : โปรแกรมเมอร์</h5></center>
        <div>
          <div>
            <b-row class="my-1" v-for="type in types" :key="type">
              <b-col>
                <div class="form-group" :class="{ 'form-group--error': $v.form.valDate1.$error }">
                  <p>ขอลาในวันที่ :</p>
                  <datetime v-model.trim="$v.form.valDate1.$model" format="DD/MM/YYYY H:i" style="width:250px;height:37px;cursor: pointer;"></datetime>
                  <div class="error" v-if="!$v.form.valDate1.required"><font color="red">*จำเป็น</font></div>
                  <div class="error" v-else><img src="../assets/Success_icon2.png" width="20" height="20" /></div>
                </div>
              </b-col>
              <b-col>
                <div style="margin-bottom:2px" class="form-group" :class="{ 'form-group--error': $v.form.valDate2.$error }">
                  <p>ถึงวันที่(กรณีลามากกว่า 1 วัน) :</p>
                  <datetime v-model.trim="$v.form.valDate2.$model" style="width:250px;height:37px;cursor: pointer;" format="DD/MM/YYYY H:i"></datetime>
                  <div class="error" v-if="!$v.form.valDate2.required"><font color="red">*จำเป็น</font></div>
                  <div class="error" v-else><img src="../assets/Success_icon2.png" width="20" height="20" /></div>
                </div>
              </b-col>
            </b-row>
          </div>
          <div class="con-select-example">
            <b-row>
              <b-col>
                <!-- <div class="form-group" :class="{ 'form-group--error': $v.form.leaveReason.$error }"> -->
                  <p style="margin-bottom:-10px">เหตุผลการลา :</p>
                    <b-form-select
                      
                      label="เหตุผลการลา"
                      v-model="selected1" 
                      :options="options1" 
                      class="mt-3"
                      style="width:235px;height:37px; margin-bottom:8px; cursor: pointer;"
                    >
                    </b-form-select> 
                    <!-- <div class="error" v-if="!$v.form.leaveReason.required"><font color="red">*จำเป็น</font></div>
                    <div class="error" v-else><img src="../assets/Success_icon2.png" width="20" height="20" /></div> -->
                <!-- </div>  -->
              </b-col>
              <b-col>
                <!-- <div class="form-group" :class="{ 'form-group--error': $v.form.leaveType.$error }"> -->
                  <p>ประเภทการลา</p>
                    <b-form-radio-group
                      v-model="selected"
                      :options="options"
                    >
                    </b-form-radio-group>    
                    <!-- <div class="error" v-if="!$v.form.leaveType.required">Require</div>
                    <div class="error" v-else>Success</div>
                </div> -->
              </b-col>            
            </b-row>
          </div>
          <div style="margin-top:10px" class="form-group" :class="{ 'form-group--error': $v.form.description.$error }">
            <p>รายะเอียดการลา</p>
            <b-form-textarea
              style="width:340px;height:80px; padding:1px" 
              v-model.trim="$v.form.description.$model"
              placeholder="กรอกรายละเอียดการลา"
              rows="4"
              no-resize
              >
            </b-form-textarea>
            <div class="error" v-if="!$v.form.description.required"><font color="red">*จำเป็น</font></div>
            <div class="error" v-else><img src="../assets/Success_icon2.png" width="20" height="20" /></div>
          </div>
        </div>
        <div style="margin-top:25px">
          <b-col sm="12">
            <center>
              <vs-button style="margin-top:0px" @click="insertData()" color="primary" type="filled" to="/leaveUser">
                บันทึก
              </vs-button>
            </center>
          </b-col>
        </div>
    </vs-popup>
  </div>
</template>

<script>
import * as mainJs from '@/assets/js/mainJS.js';
import * as authService from '@/services/auth.service';
import datetime from 'vuejs-datetimepicker';
import { required, minLength } from 'vuelidate/lib/validators'
import Swal from 'sweetalert2/dist/sweetalert2.js' //npm install sweetalert2      for import Swal from 'sweetalert2/dist/sweetalert2.js'

export default {
  name: "popupLeave",
  components: {
    datetime,
    Swal
  },
  props: {},
  data() {
    return {
        options: [
            { text: 'ลาครึ่งเช้า', value: 1 },
            { text: 'ลาครึ่งบ่าย', value: 2 },
            { text: 'ลาเต็มวัน', value: 3 }
        ],
        options1:[
          {text:'ลากิจ',value:1},
          {text:'ลาป่วย',value:2},
          {text:'ลาพักร้อน',value:3},
          {text:'ลาคลอด',value:4},
          {text:'ลาบวช',value:5},
          {text:'ลากิจไม่รับค่าจ้าง',value:6},
        ],
        selected1: null,
        dateStart: '',
        dateEnd: '',
        description:'',
        selected2: null,
        value1:'',
        value2:'',
        popupLeave:false,
        types: [
          'date',
        ],
        selected: 3,
        form: {
          description: '',
          valDate1: '',
          valDate2: '',
          leaveType: '',
          leaveReason: ''
        }
    }
  },
  computed: {},
  mounted() {
      // this.getleaveType();
  },
  methods: {
    // getleaveType:function() {
    //   authService.getleaveType({}).then(response => {
    //     this.options1.push({text: '-- กรุณาเลือกเหตุผลในการลา --', value: null});
    //     response.data.forEach(obj => {
    //       this.options1.push({text: obj.l_reason_name, value: obj.l_reason_id});
    //     });
    //   });
    // },
    insertData:function() {
      // if (this.selected1 == "" && this.selected == "" && this.$v.form.valDate1.$model == "" && this.$v.form.valDate2.$model == "" && this.$v.form.description.$model == "") {
      //     Swal.fire({
      //       grow: '#app',
      //       icon: 'warning',
      //         title: 'กรุณากรอกอีเมล และ รหัสผ่าน'
      //       })
      // }
      // } else if (this.email == "") {
      //     Swal.fire({
      //       icon: 'warning',
      //         title: 'กรุณากรอกอีเมล'
      //       })
      // } else if (this.pass == "") {
      //     Swal.fire({
      //       icon: 'warning',
      //         title: 'กรุณากรอกรหัสผ่าน'
      //       })
      // }
      // else{
        var user = JSON.parse(localStorage.getItem("user"));
        var obj = {};
          obj["emp_id"] = user.uuid;
          // obj["emp_leave_id"] = user.emp_leave_id + 1;
          obj["leave_date"] = mainJs.setDateToServer(new Date().toLocaleString());
          // obj["first_name"] = user.first_name;
          // obj["last_name"] = user.last_name;
          // obj["dept_name"] = user.dept_name;
          // obj["mobile"] = user.mobile;
          obj["leave_reason_id"] = this.selected1;
          obj["leave_type_id"] = this.selected;
          obj["leave_start_time"] = mainJs.setDateToServer(this.$v.form.valDate1.$model);
          obj["leave_stop_time"] = mainJs.setDateToServer(this.$v.form.valDate2.$model);
          obj["leave_remark"] = this.$v.form.description.$model;
          // obj["head_approve_date"] = null;
          // obj["hr_approve_date"] = null;
          // obj["modify_date"] = null;
          // obj["cancel_date"] = null;
          // obj["cancel_remark"] = null;
        console.log(obj);
        authService.insertData(obj).then(response => {
          if (response.data != null) {
            this.popupLeave = false;
          }
        });
        // .then(respone => {
        //   if (response.data != "" && response.data != null && response.data != undefined) {
        //     console.log(response.data)
        //     this.toURL("Homepage");
        //   } else {
        //       Swal.fire({
        //         icon: 'error',
        //         title: this.textError
        //       });
        //     }
        // });
        // }
      } 
  },
  watch: {},
  validations: {
    form: {
      description: {
        required,
        minLength: minLength(5)
      },
      valDate1: {
        required,
        minLength: minLength(5)
      },
      valDate2: {
        required,
        minLength: minLength(5)
      },
      leaveType: {
        required,
        minLength: minLength(5)
      },
      leaveReason:{
        required,
        minLength: minLength(5)
      }
    }
  }
};
</script>

<style>
  input[type="date"]::-webkit-inner-spin-button {
      display: none;
      -webkit-appearance: none;
  }
  .popupLeave-example{
    max-width: 100%;
    height: 100%;
  }
  #sizePopupLeave .con-vs-popup .vs-popup {
    width: 35%;
    height: 63%;
  }
  #sizePopupLeave .vs-popup--content {
    overflow: hidden !important;
  }
</style>
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
    <vs-popup  classContent="popup-example"  title="ประวัติการลาของนายเอกชัย หมโมลี" :active.sync="popupLeave" >
      <center><h4>นายเอกชัย หมโมลี</h4></center>
      <center><h5>แผนก : โปรแกรมเมอร์</h5></center>
      <center><h5>แผนก : โปรแกรมเมอร์</h5></center>
        <div>
              <div style="margin-top:25px">
                <b-row class="my-1" v-for="type in types" :key="type">
                  <b-col>
                    <div class="form-group" :class="{ 'form-group--error': $v.form.valDate1.$error }">
                      <p>ขอลาในวันที่ :</p>
                      <datetime v-model.trim="$v.form.valDate1.$model" format="DD/MM/YYYY H:i" style="width:255px;height:37px;cursor: pointer;"></datetime>
                      <div class="error" v-if="!$v.form.valDate1.required"><font color="red">Require</font></div>
                      <div class="error" v-else><font color="Success">Success</font></div>
                    </div>
                  </b-col>
                  <b-col>
                    <div class="form-group" :class="{ 'form-group--error': $v.form.valDate2.$error }">
                      <p>ถึงวันที่(กรณีลามากกว่า 1 วัน) :</p>
                      <datetime v-model.trim="$v.form.valDate2.$model" style="width:255px;height:37px;cursor: pointer;" format="DD/MM/YYYY H:i"></datetime>
                      <div class="error" v-if="!$v.form.valDate2.required"><font color="red">Require</font></div>
                      <div class="error" v-else><font color="Success">Success</font></div>
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
                          size="sm" 
                          class="mt-3" 
                          style="width:235px;height:37px; margin-bottom:8px; cursor: pointer;"
                          
                        >
                        </b-form-select> 
                        <!-- <div class="error" v-if="!$v.form.leaveReason.required">Require</div>
                        <div class="error" v-else>Success</div>
                    </div>  -->
                  </b-col>
                  <b-col>
                    <!-- <div class="form-group" :class="{ 'form-group--error': $v.form.leaveType.$error }"> -->
                      <p>ประเภทการลา</p>
                        <b-form-radio-group
                          v-model="selected"
                          :options="options"
                          
                        ></b-form-radio-group>    
                        <!-- <div class="error" v-if="!$v.form.leaveType.required">Require</div>
                        <div class="error" v-else>Success</div>
                    </div> -->
                  </b-col>            
                </b-row>
              </div>
              <div>
                <div class="form-group" :class="{ 'form-group--error': $v.form.description.$error }">
                  <p>รายะเอียดการลา</p>
                  <vs-textarea style="width:340px;height:80px; padding:1px" v-model.trim="$v.form.description.$model"></vs-textarea>
                  <div class="error" v-if="!$v.form.description.required"><font color="red">Require</font></div>
                  <div class="error" v-else><font color="Success">Success</font></div>
                </div> 
              </div>    
            </div>
              <div style="margin-top:25px">
                <b-col sm="12">
                  <center>
                    <vs-button style="margin-top:0px" @click="popupActivo3=true" color="primary" type="filled" to="/leaveUser">
                      บันทึก
                    </vs-button>
                  </center>
                </b-col>
              </div>
    </vs-popup>
  </div>
</template>

<script>
import * as authService from '@/services/auth.service';
import datetime from 'vuejs-datetimepicker';
import { required, minLength } from 'vuelidate/lib/validators'

export default {
  name: "popupLeave",
  components: {
    datetime
  },
  props: {},
  data() {
    return {
        options: [
            { text: 'ลาครึ่งเช้า', value: 'first' },
            { text: 'ลาครึ่งบ่าย', value: 'second' },
            { text: 'ลาเต็มวัน', value: 'third' }
        ],
        options1:[
          {text: '--กรุณาเลือกเหตุผลในการลา--',value: null},
          {text:'ลากิจ',value:1},
          {text:'ลาป่วย',value:2},
          {text:'ลาพักร้อน',value:3},
          {text:'ลาคลอด',value:4},
          {text:'ลาบวช',value:5},
          {text:'ลากิจไม่รับค่าจ้าง',value:6},
        ],
        selected1: null,
        selected2: null,
        value1:'',
        value2:'',
        popupLeave:false,
        popupActivo3:false,
        types: [
          'date',
        ],
        selected: 'third',
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
      this.getleaveType();
  },
  methods: {
      getleaveType(){
      authService.getleaveType({}).then(response => {
      // this.options1 = [];
      this.options1.push({text: '-- กรุณาเลือกเหตุผลในการลา --', value: null});
      response.data.forEach(obj => {
        this.options1.push({text: obj.l_reason_name, value: obj.l_reason_id});
      });
      // this.options1
    });
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

<style scoped>
  input[type="date"]::-webkit-inner-spin-button {
      display: none;
      -webkit-appearance: none;
  }

  .popup-example{
    max-width: 100%;
    height: 100%;
  }
</style>

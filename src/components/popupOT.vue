<template>
  <div id="popupOT">
    <div>    
      <vs-button 
        @click="popupOT=true" 
        color="primary" 
        type="filled" 
      >
        <img src="../assets/Plus_icon3.png" width="20" height="20" /> เพิ่มเวลาทำงาน
      </vs-button>
    </div>

      <vs-popup classContent="popup-example"  title="กรอกรายละเอียดการทำงานนอกเวลา" :active.sync="popupOT">
        <center><h4>นายเอกชัย หมโมลี</h4></center>
        <center><h5>แผนก : โปรแกรมเมอร์</h5></center>
          <div>
            <div style="margin-top:5px;">
              <div class="form-group" :class="{ 'form-group--error': $v.form.date.$error }">
                <p>วันที่ทำงาน</p>
                <datetime v-model.trim="$v.form.date.$model" format="DD/MM/YYYY H:i" style="width:255px;height:37px;cursor: pointer;"></datetime>
                <div class="error" v-if="!$v.form.date.required"><font color="red">Require</font></div>
                <div class="error" v-else><font color="Success">Success</font></div>
              </div>
            </div>
              <div>
                <div class="form-group" :class="{ 'form-group--error': $v.form.descriptionWork.$error }">
                  <p>รายละเอียดงาน: </p>
                  <vs-textarea style="width:340px;height:80px; padding:1px" v-model.trim="$v.form.descriptionWork.$model"></vs-textarea>
                  <div class="error" v-if="!$v.form.descriptionWork.required"><font color="red">Require</font></div>
                  <div class="error" v-else><font color="Success">Success</font></div>
                </div> 
              </div>
                  <div style="margin-top:-13px;">
                    <b-row class="my-1" v-for="type in types" :key="type">
                      <b-col>
                        <div>
                          <div class="form-group" :class="{ 'form-group--error': $v.form.timeStart.$error }">
                            <p>เวลาเริ่มทำงาน:</p>
                            <b-container fluid>
                              <b-form-input :id="`type-${type}`" :type="type" v-model.trim="$v.form.timeStart.$model" style="width:180px;height:37px; cursor: pointer;"> </b-form-input>
                              <div class="error" v-if="!$v.form.timeStart.required"><font color="red">Require</font></div>
                              <div class="error" v-else><font color="Success">Success</font></div>
                            </b-container>
                          </div> 
                        </div>
                      </b-col>
                      <b-col>
                        <div>
                          <div class="form-group" :class="{ 'form-group--error': $v.form.timeEnd.$error }">
                            <p>เวลาเลิกงาน:</p>
                            <b-container fluid>
                              <b-form-input :id="`type-${type}`" :type="type" v-model.trim="$v.form.timeEnd.$model" style="width:180px;height:37px; cursor: pointer;"> </b-form-input>
                              <div class="error" v-if="!$v.form.timeEnd.required"><font color="red">Require</font></div>
                              <div class="error" v-else><font color="Success">Success</font></div>
                          </b-container>
                          </div> 
                        </div>
                      </b-col> 
                    </b-row>
                  </div>
                  <div>
                    <b-form-group>
                      <b-form-radio-group style="margin-top:20px" id="radio-group-2" v-model="selected" name="radio-sub-component">
                        <center>
                          <p>เบิกจ่ายเงิน:
                            <b-form-radio value="first" style="cursor: pointer" >เบิก</b-form-radio>
                            <b-form-radio value="second" style="cursor: pointer" >ไม่เบิก</b-form-radio></p>
                        </center>
                      </b-form-radio-group>
                    </b-form-group>
                  </div>
                  <div>
                    <b-col sm="12">
                      <center>
                      <vs-button @click="popupActivo3=true" color="primary" type="filled" to="/otworkUser">บันทึก</vs-button></center>
                    </b-col>
                  </div>
          </div>
      </vs-popup>     
  </div>
</template>

<script>
import datetime from 'vuejs-datetimepicker';
import { required, minLength } from 'vuelidate/lib/validators'

export default {
  name: "popupOT",
  components: {
    datetime
  },
  props: {},
  data() {
    return {
      popupOT:false,
      popupActivo3:false,
      types: [
        'time',
      ],
      selected:'first',
      form: {
        descriptionWork: '',
        timeStart: '',
        timeEnd:'',
        date:''
      }
    }
  },
  computed: {},
  mounted() {},
  methods: {},
  watch: {},
  validations: {
    form: {
      descriptionWork: {
        required,
        minLength: minLength(5)
      },
      timeStart: {
        required,
        minLength: minLength(5)
      },
      timeEnd:{
        required,
        minLength: minLength(5)
      },
      date:{
        required,
        minLength: minLength(5)
      }
    }
  }
};
</script>

<style scoped>
</style>

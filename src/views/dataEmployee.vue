<template>
  <div id="DataEmployee">
    <popupRegister v-bind:showPopRegister="showPopRegister"/>
    <b-row>
      <div><br>
        <h2 style="font-weight: bold; margin-left:30px;">
          ข้อมูลของพนักงาน
        </h2>
      </div>
    </b-row>
    <b-row style="padding:0px 40px 0px 40px; width:100%;">
      <b-col sm="2">
        <p style="cursor:default;"><b>ค้นหาชื่อ :</b></p>
          <vue-suggestion 
            :items="nameSearchArray" 
            v-model="nameSearch"
            :setLabel="setLabel"
            :itemTemplate="itemTemplate"
            @changed="inputChange"
            @selected="itemSelected"
            placeholder="พิมพ์ชื่อเพื่อค้นหา..."
          >
          </vue-suggestion> 
      </b-col>
      <b-col md="12" lg="2">
        <p style="cursor:default;"><b>แผนก :</b></p>
        <b-form-select
          v-model="selectDep"
          :options="optionsDep"
          style="height:42px; cursor: pointer; border: 1px solid rgba(0,0,0,.2); border-radius: 4px;"
        >
        </b-form-select>
      </b-col>
      <b-col sm="2" style="margin-top:24px">
        <b-button
          variant="outline-primary"
          @click="filterData()"
          style="height:42px; width:127px; margin:0px 10px 10px 0px;"
        >
          ค้นหา
        </b-button>
      
        <b-button
          variant="outline-danger"
          @click="defaultValue()"
          style="height:42px; width:127px; margin:0px 0px 10px 0px" 
        >
            เคลียร์ข้อมูล
        </b-button>
      </b-col>
      <b-col xs="6" sm="6" md="6" lg="2" >
        <vs-button
          @click="showLeavePopup()"
          color="primary"
          type="filled"
          style="height:42px; width:135px;"
        >
          <img 
          src="../assets/Plus_icon3.png" 
          style="margin-top:-3px"
          width="20" 
          height="20" 
          /> เพิ่มการลา
        </vs-button>
      </b-col>
    </b-row>
    <b-row style="padding:0px 30px 0px 30px;">
      <table width=100% style="margin-top:10px; border: 1px solid black;">
        <b-table
          responsive
          :busy="isBusy"
          striped hover 
          :items="items"
          :fields="fields"
          :filter="filter"
          :current-page="currentPage"
          :per-page="perPage"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          :sort-direction="sortDirection"
          @filtered="onFiltered" 
          show-empty
        >
          <template v-slot:table-busy>
            <div class="text-center text-danger ">
              <b-spinner class="align-middle"></b-spinner>
              <strong> Loading...</strong>
            </div>
          </template>

          <template v-slot:head()="data">
            <span style="font-size: 18px;">{{ data.label }}</span>
          </template>

          <template v-slot:empty>
            <h2 style="text-align:center;" color="#00000">ไม่มีข้อมูลพนักงาน</h2>
          </template>

          <template v-slot:cell(leave_remark)="data">
            <div>
              <img 
                src="../assets/Details.png" 
                style="cursor: pointer" 
                width="33" 
                height="33"  
                @click="dataModal = data.item, show('dataEmployeeModal')"
              >
            </div>
          </template>
        </b-table>
      </table>
    </b-row>
    <b-row style="margin:5px 0px 0px 30px; text-align:right;" >
      <b-col sm="1">
      </b-col>
      <b-col sm="8">
        <b-form-group
          label="จำนวนที่แสดงบนตาราง"
          label-cols-sm="11"
          label-align-sm="right"
          label-size="sm"
          label-for="perPageSelect"
          class="mb-0"
        >
          <b-form-select
            v-model="perPage"
            id="perPageSelect"
            size="sm"
            :options="pageOptions"
          ></b-form-select>
        </b-form-group>
      </b-col>
      <b-col sm="3" >
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="fill"
          size="sm"
          class="my-0"
        ></b-pagination>
      </b-col>
    </b-row>
      <br>
      <modal 
        name="dataEmployeeModal" 
        :clickToClose="false"
        height="auto"
        width="400px"
      >
        <p style="background-color: #f1f1f1; font-size: 20px; text-align: center; margin-bottom:10px; font-weight:bold; padding: 10px 10px 10px 20px; cursor:default;">
          รายละเอียดข้อมูลของพนักงาน 
        </p>
        <div style="padding-bottom:15px;">
          
          <b-row style=" margin:0px 10px 5px 10px; border-bottom: 1px dashed #ddd;" class="popupRemark">
            <b-col>
              <p><b style="font-size: 16px;">ชื่อ :</b></p>
            </b-col>
            <b-col>
              <p style="font-size: 16px;"> {{ dataModal.full_Name }} </p>
            </b-col>
          </b-row>

          <b-row style=" margin:0px 10px 5px 10px; border-bottom: 1px dashed #ddd;" class="popupRemark">
            <b-col>
              <p><b style="font-size: 16px;">แผนก :</b></p>
            </b-col>
            <b-col>
              <p style="font-size: 16px;"> {{ dataModal.dept_name }} </p>
            </b-col>
          </b-row>

          <b-row style=" margin:0px 10px 5px 10px; border-bottom: 1px dashed #ddd;" class="popupRemark">
            <b-col>
              <p><b style="font-size: 16px;">ตำแหน่ง :</b></p>
            </b-col>
            <b-col>
              <p style="font-size: 16px;"> {{ dataModal.position_name }} </p>
            </b-col>
          </b-row>

          <b-row style=" margin:0px 10px 5px 10px; border-bottom: 1px dashed #ddd;" class="popupRemark">
            <b-col>
              <p><b style="font-size: 16px;">วันที่เริ่มเข้าทำงาน :</b></p>
            </b-col>
            <b-col>
              <p style="font-size: 16px;"> {{ dataModal.work_start_format }}</p>
            </b-col>
          </b-row>

          <b-row style=" margin:0px 10px 5px 10px; border-bottom: 1px dashed #ddd;" class="popupRemark">
            <b-col>
              <p><b style="font-size: 16px;">ผ่านการทดลองงาน :</b></p>
            </b-col>
            <b-col>
              <p v-if="dataModal.test_past == null" style="font-size: 16px;"> กำลังพิจารณา </p>
              <p v-else-if="dataModal.test_past != null" style="font-size: 16px;"> ผ่านเเล้ว ({{ dataModal.test_past_format }}) </p>
            </b-col>
          </b-row>

          <b-row style=" margin:0px 10px 5px 10px; border-bottom: 1px dashed #ddd;" class="popupRemark">
            <b-col>
              <p><b style="font-size: 16px;">เบอร์โทรติดต่อ :</b></p>
            </b-col>
            <b-col>
              <p style="font-size: 16px;"> {{ dataModal.mobile }} </p>
            </b-col>
          </b-row>
          
          <b-row style=" margin:0px 10px 5px 10px; border-bottom: 1px dashed #ddd;" class="popupRemark">
            <b-col>
              <p><b style="font-size: 16px;">ที่อยู่ปัจจุบัน :</b></p>
            </b-col>
            <b-col>
              <p style="font-size: 16px;"> {{ dataModal.address }} </p>
            </b-col>
          </b-row>

          <b-row style=" margin:0px 10px 5px 10px; border-bottom: 1px dashed #ddd;" class="popupRemark">
            <b-col>
              <p><b style="font-size: 16px;">อีเมล :</b></p>
            </b-col>
            <b-col>
              <p style="font-size: 16px;"> {{ dataModal.email }} </p>
            </b-col>
          </b-row>
        </div>
        <b-button block variant="secondary" style="font-size: 16px;" @click="hide('dataEmployeeModal')">ปิด</b-button>
      </modal> 
    </div>
</template>

<script>
import Vue from 'vue'
import * as mJS from "../assets/js/mainJS"
import * as authService from '@/services/auth.service';
import { async } from 'q';
import { Datetime } from 'vue-datetime' // npm install --save luxon vue-datetime weekstart
import 'vue-datetime/dist/vue-datetime.css'
import { Settings } from 'luxon'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'
import VModal from 'vue-js-modal'
import popupRegister from "@/components/popupRegister.vue"
import VueSuggestion from 'vue-suggestion'
import itemTemplate from '../components/ItemTemplate.vue';

Vue.use(Datetime,VueSweetalert2,VModal);
Vue.use(VueSuggestion);

export default {
  name: "DataEmployee",
  components: {
    datetime: Datetime,
    popupRegister
  },
  props: {},
  data() {
    return {
      tempData: [],
      itemTemplate,
      nameSearch:"",
      nameSearchArray: [],
      empName:[],
      items: [],
      optionsDep: [],
      optionLeaveType: [],
      fields: [
        { key: 'no', label: 'ลำดับ', class: 'text-center no' },
        { key: 'full_Name', label: 'ชื่อ', class: 'text-center full_Name'},
        { key: 'dept_name', label: 'เเผนก', class: 'text-center dept_name' },
        { key: 'position_name', label: 'ตำแหน่ง', class: 'text-center position_name' },
        { key: 'position_name', label: 'ตำแหน่ง', class: 'text-center position_name' },
        { key: 'mobile', label: 'เบอร์โทรศัพท์', class: 'text-center mobile' },
        { key: 'leave_remark', label: 'รายละเอียด', class: 'text-center leave_remark' }
      ],
      dataModal:{},
      showPopRegister:false,
      checkPopup:'',
      isBusy: false,
      totalRows:1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [10, 20, 30],
      filter: null,
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      valDateStart: '',
      valDateStop: '',
      selectType: '',
      selectDep:'',
      selectStat: '',
      showPopRegister:false,
      window : {
        width: 0,
        height: 0
      },
    }
  },
  computed: {
    sortOptions() {
      return this.fields
        .filter(f => f.sortable)
        .map(f => {
          return { text: f.label, value: f.key }
        })
    }
  },
  created(){
    window.addEventListener("resize", this.handleResize);
  },
  destroyed(){
    window.removeEventListener('resize', this.handleResize);
  },
  mounted() {
    this.getDataEmployee();
    this.selectType = null;
    this.selectDep = null;
    this.selectStat = null;
    this.getDataReasonLeave();
    this.getDataDept();
    this.getDataAllUser();
  },
  methods: {
    show () {
      this.$modal.show('dataEmployeeModal');
    },
    hide () {
      this.$modal.hide('dataEmployeeModal');
    },
    handelLeaveSave(value) {
      if (value) {
        this.getDataEmployee();   
      }
    },
    showLeavePopup: function(flag) {
      var ths = this;
      ths.showPopHeader = true;
      ths.checkPopup = flag;
      ths.showPopRegister = true;
      ths.checkPopup = flag;
      setTimeout(function() {
        ths.showPopHeader = false;
        ths.showPopRegister = false;
      }, 1000);
    },
    defaultValue() {
      this.valDateStart = "";
      this.valDateStop = "";
      this.selectStat = null;
      this.selectType = null;
      this.selectDep = null;
      this.getDataEmployee();
    },
    itemSelected (nameSearch) {
        this.nameSearch = nameSearch;
    },
    setLabel (nameSearch) {
      return nameSearch.name;
    },
    inputChange (text) {
      this.nameSearchArray = this.empName.filter(function(v) { return v.name.toUpperCase().includes(text.toUpperCase()) } );
    },
    filterData() {
      var ths = this;
      var allData = this.tempData;
      if (this.selectStat == null && this.selectType == null && this.selectDep == null && Object.keys(this.valDateStart).length <= 0 && Object.keys(this.valDateStop).length <= 0 && Object.keys(this.nameSearch).length <= 0 ) {
          this.getDataEmployee();
      }
      if (this.nameSearch != null && this.nameSearch != "" ) {
        allData = allData.filter(function(v) {
          return v.emp_id == ths.nameSearch.value;
        })
      }
      this.items = allData;
      this.totalRows = this.items.length
    },
    getDataAllUser: async function(){
      var ths = this;
      var dataAllUser = [];
      var fullname = "";
      var result = {};
      await authService.getDataAllUser().then(response => {
        if(response.data != null && response.data.length > 0){
          response.data.forEach(function (obj, i){
            fullname = obj.first_name + " " + obj.last_name + " ("+ obj.nick_name + ")";
            result = {value: obj.emp_id, name: fullname}
            dataAllUser.push(result);
          });
          ths.nameSearchArray = dataAllUser;
          ths.empName = dataAllUser;
        }
      });
    },
    getDataDept: async function(){
      var dataDept = [];
      await authService.getDataDept().then(response => {
        if (response.data != null && response.data.length > 0) {
          dataDept.push({ text: "--กรุณาเลือกแผนก--", value: null, disabled: true})
          response.data.forEach(function (obj, i) {
            dataDept.push({ text: obj.dept_name,value: obj.dept_id });
          });
          this.optionsDep = dataDept;
        }
      });
    },
    getDataReasonLeave: async function(){
      var dataReason = [];
      await authService.getDataReasonLeave().then(response => {
        if (response.data != null && response.data.length > 0) {
          dataReason.push({ text: "--กรุณาเลือกประเภทการลา--", value: null, disabled: true})
          response.data.forEach(function (obj, i) {
            dataReason.push({ text: obj.leave_reason_name,value: obj.leave_reason_id });
          });
          this.optionLeaveType = dataReason;
        }
      });
    },
    getDataEmployee: async function(){
    this.isBusy = true;
    await authService.getDataEmployee().then(response => {
      if (response.data != null && response.data.length > 0) { 
        this.selectedFilter = null;
        for (var i = 0; i < response.data.length; i++) {
          response.data[i].no = i+1;
          response.data[i].full_Name = response.data[i].first_name + " " + response.data[i].last_name + " " + "(" + response.data[i].nick_name + ")";
          response.data[i].work_start_format = mJS.setDateFormat(response.data[i].work_start);
          response.data[i].test_past_format = mJS.setDateFormat(response.data[i].test_past);
        } 
        this.items = response.data;
        setTimeout(() => {
          this.isBusy = false
        },300);
        this.tempData = response.data;
      } else {
          setTimeout(() => {
            this.isBusy = false}, 1200);
          }
        });
      this.totalRows = this.items.length;
    },
    handleResize: function() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
      if(this.window.width >= 1270){
        console.log("1200")
        this.fields = [
          { key: 'no', label: 'ลำดับ', class: 'text-center no' },
          { key: 'full_Name', label: 'ชื่อ', class: 'text-center full_Name'},
          { key: 'dept_name', label: 'เเผนก', class: 'text-center dept_name' },
          { key: 'position_name', label: 'ตำแหน่ง', class: 'text-center position_name' },
          { key: 'address', label: 'ที่อยู่', class: 'text-center address' },
          { key: 'mobile', label: 'เบอร์โทรศัพท์', class: 'text-center mobile' },
          { key: 'email', label: 'อีเมล', class: 'text-center email' },
          { key: 'leave_remark', label: 'รายละเอียด', class: 'text-center leave_remark' },
        ]   
      } else if(this.window.width < 1270 && this.window.width >= 1000){
        console.log("800")
        this.fields = [
          { key: 'no', label: 'ลำดับ', class: 'text-center no' },
          { key: 'full_Name', label: 'ชื่อ', class: 'text-center full_Name'},
          { key: 'dept_name', label: 'เเผนก', class: 'text-center dept_name' },
          { key: 'position_name', label: 'ตำแหน่ง', class: 'text-center position_name' },
          { key: 'mobile', label: 'เบอร์โทรศัพท์', class: 'text-center mobile' },
          { key: 'leave_remark', label: 'รายละเอียด', class: 'text-center leave_remark' },
        ]
      } else if(this.window.width < 1000 && this.window.width >= 800){
        console.log("800")
        this.fields = [
          { key: 'no', label: 'ลำดับ', class: 'text-center no' },
          { key: 'full_Name', label: 'ชื่อ', class: 'text-center full_Name'},
          { key: 'dept_name', label: 'เเผนก', class: 'text-center dept_name' },
          { key: 'mobile', label: 'เบอร์โทรศัพท์', class: 'text-center mobile' },
          { key: 'leave_remark', label: 'รายละเอียด', class: 'text-center leave_remark' },
        ]
      } else{
          this.fields = [
            { key: 'no', label: 'ลำดับ', class: 'text-center no' },
            { key: 'full_Name', label: 'ชื่อ', class: 'text-center full_Name'},
            { key: 'leave_remark', label: 'รายละเอียด', class: 'text-center leave_remark' },
          ]
        }
    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    toggleBusy() {
      this.isBusy = !this.isBusy
    }
  },
  watch: {}
};
</script>

<style>
  .close:hover {
    cursor: pointer;
  }
  #DataEmployee .btn-secondary {
    font-size: 12px;
  }
  #DataEmployee .vdatetime-input {
    padding-left:10px;
    width: 100%;
    height: 42px !important;
    font-size: 16px !important;
    border: 1px solid rgba(0,0,0,.2); 
    border-radius: 4px;
  }
  #DataEmployee .no {
    width : 65px !important;
  }
  #DataEmployee .full_Name {
    width : 280px !important;
  }
  #DataEmployee .position_name {
    width : 320px !important;
  }
  #DataEmployee .address {
    width : 400px !important;
  }
  #DataEmployee .mobile {
    width : 150px !important;
  }
  #DataEmployee .email {
    width : 300px !important;
  }
  #DataEmployee .leave_remark {
    width : 150px !important;
  }
  
  #DataEmployee .vs__input {
    padding-left:10px;
    font-family: Kanit, Arial, Helvetica, sans-serif !important;
    font-size: 16px;
    height:42px; 
    width: 100%;
    border: 1px solid rgba(0,0,0,.2); 
    border-radius: 4px;
  }
  #DataEmployee .popupRemark:hover {
    background-color:#f5f5f5;
  }
</style>



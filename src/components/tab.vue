<template>
  <div style="background-color:#f8f8f8; margin-left:5px; ">
    <popupLeave v-bind:showPop="showPop" />

    <b-col>
      <div style="position: drelative;">
        <b-card style="margin-top:20px;" >
        <center>
          <h3 style=" font-weight: bold; cursor: default;">{{userIn.first_name}} {{userIn.last_name}} ({{userIn.nick_name}})</h3>
          <h4 style="margin-bottom:10px; cursor: default;">เเผนก : {{userIn.dept_name}}</h4>
          <h4 style="margin-bottom:10px; cursor: default;">ตำแหน่ง : {{userIn.position_name}} </h4>
        </center>
          <b-row>
            <b-col style="margin-top:5px" md="4" sm="6" xs="12">
              <div>
                <center>
                  <vs-button
                    @click="showPopup()"
                    color="primary"
                    type="filled"
                    style="width:114px; height:44px; margin-right:auto;"
                  >
                    <img src="../assets/Plus_icon3.png" width="20" height="20" /> เพิ่มการลา
                  </vs-button>
                </center>
              </div>
            </b-col>
            <b-col style="margin-top:5px" md="4" sm="6" xs="12">
              <div>
                <center>
                  <popupOT /> 
                </center>
              </div>
            </b-col>
            <b-col style="margin-top:5px" md="4" sm="6" xs="12">
              <div>    
                <vs-button
                  @click="show('holidayShow')"
                  color="primary" 
                  type="filled" 
                  style="width:144px; height:44px;"
                >
                  <img src="../assets/Plus_icon3.png" width="20" height="20" /> ปฏิทินวันหยุด
                </vs-button>
              </div>
            </b-col>
          </b-row>
        </b-card>
      </div>  
      
      <b-table-simple hover small caption-top responsive style="border :1px solid black; margin-top:10px; cursor: default;">
        <b-thead class="thead-dark" head-variant="danger">
          <b-tr >
            <b-th><font size="3" color="#f2f2f2">ตารางสรุปการลาทั้งหมด</font></b-th>
            <b-th></b-th>
            <b-th></b-th>
            <b-th></b-th>
            <b-th></b-th>
          </b-tr>
          <b-tr >
            <b-th>ประเภท</b-th>
            <b-th><center>สิทธิ<br>(วัน)</center></b-th>
            <b-th><center>ใช้ไป<br>(วัน/ชั่วโมง)</center></b-th>
            <b-th><center>ชดเชย<br>(วัน/ชั่วโมง)</center></b-th>
            <b-th><center>คงเหลือ<br>(วัน/ชั่วโมง)</center></b-th>
          </b-tr>
        </b-thead>
        <b-tbody>
          <b-tr v-for="i in responseData" :key="i">
            <b-th>{{ i.leave_reason_name }}</b-th>
            <b-td><center>{{ i.leave_limit }}</center></b-td>
            <b-td v-if="i.dd == null && i.hh == null"><center>{{ 0 +' / '+ 0}}</center></b-td>
            <b-td v-else><center>{{ i.dd +' / '+ i.hh +'  '}}</center></b-td>
            <b-td v-if="i.hh == 0"><center>{{ (i.leave_limit - i.dd) +' / '+ 0}}</center></b-td>
            <b-td v-else-if="i.dd == null && i.hh == null"><center>{{ (i.leave_limit - i.dd) +' / '+ 0}}</center></b-td>
            <b-td v-else-if="i.hh != 0"><center>{{ (i.leave_limit - i.dd - 1) +' / '+ (9 - i.hh)}}</center></b-td>
          </b-tr>
        </b-tbody>
          <b-thead class="thead-light" head-variant="danger">
            <b-tr v-if="responseData">
              <b-th><b>รวมทั้งหมด : </b></b-th>
              <b-th><center><b>{{ sumLimits(responseData) }}</b></center></b-th>
              <b-th><center><b>{{ sumLeave1(responseData) + ' / ' + sumLeave2(responseData)}}</b></center></b-th>
              <b-th v-if="sumLeave2(responseData) > 0"><center><b>{{ (sumLimits(responseData) - sumLeave1(responseData) - 1) + ' / ' + (9 - sumLeave2(responseData))}}</b></center></b-th>
              <b-th v-if="sumLeave2(responseData) == 0"><center><b>{{ (sumLimits(responseData) - sumLeave1(responseData)) + ' / 0'}}</b></center></b-th>
            </b-tr>
          </b-thead>
      </b-table-simple>
    </b-col>
    <loading
      :active.sync="isLoading"
      :is-full-page="fullPage"
    >
    </loading>
  </div>
</template>

<script>
import * as mJS from "../assets/js/mainJS"
import 'material-icons/iconfont/material-icons.css'
import 'vuesax/dist/vuesax.css'
import * as authService from '@/services/auth.service';
import popupLeave from "@/components/popupLeave.vue"
import popupOT from "@/components/popupOT.vue"
import holiday from "@/components/holiday.vue"
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  name: "home",
  components: {
    popupLeave,
    popupOT,
    holiday,
    Loading
  },
  data() {
    return {
      userIn: {},
      responseData:[],
      value1:'',
      value2:'',
      showPop:false,
      popupLeave:false,
      popupActivo3:false,
      popupOT:false,
      popupActivo4:false,
      filter: null,
      filterOn: [],
      select1:3,
      selected: null,
      selected2: null,
      isLoading: false,
      options1:[
        {text: '--- กรุณาเลือกเหตุผลในการลา ---',value: null},
        {text:'ลากิจ',value:0},
        {text:'ลาป่วย',value:1},
        {text:'ลาพักร้อน',value:2},
        {text:'ลาคลอด',value:3},
        {text:'ลาบวช',value:4},
        {text:'ลากิจไม่รับค่าจ้าง',value:5},
      ],
      types: [
        'date',
      ]
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
  mounted() {
    this.userIn = JSON.parse(localStorage.getItem("user"));
    this.showStat();
  },
  methods: {
      showPopup: function() {
        var ths = this;
        ths.showPop = true;
        setTimeout(function() {
          ths.showPop = false;
        }, 1000);
      },
      sumLimits: function (responseData) {
  	    return responseData.reduce((acc, val) => {
	  		  return acc + parseInt(val.leave_limit);
        }, 0);  
      },
      sumLeave1: function (responseData) {
  	      return responseData.reduce((acc, val) => {
            if(val.dd != null){
              var result1 = acc + parseInt(val.dd);
              return result1;
            }
            else {
              return acc;
            }
          }, 0);
      },
      sumLeave2: function (responseData) {
  	      return responseData.reduce((acc, val) => {
            if(val.hh != null){
              var result2 = acc + parseInt(val.hh); 
	  		      return result2;
            }
            else{
              return acc;
            }
          }, 0);
      },
      // sumLeave3: function (responseData) {
  	  //     return responseData.reduce((acc, val) => {
      //       var result3 = acc + parseInt(val.mm);
	  	// 	    return result3;
      //     }, 0);
      // },
      sumRemain1: function (responseData) {
  	    return responseData.reduce((acc, val) => {
          if(val.dd == 0){
            var sum1 = val.leave_limit - val.dd;
            var remain1 = acc + parseInt(sum1);
            return remain1; 
          }
          else if(val.dd == null && val.hh == null){
            var sum2 = val.leave_limit - val.dd;
            var remain2 = acc + parseInt(sum2);
            return remain2; 
          }
          else if(val.hh != 0){
            var sum3 = (val.leave_limit - val.dd) - 1;
            var remain3 = acc + parseInt(sum3);
            return remain3;
          }
			  }, 0);
      },
      sumRemain2: function (responseData) {
  	    return responseData.reduce((acc, val) => {
          if(val.hh == 0){

          }
          var sum2 = 9 - val.hh;
          var remain2 = Math.abs(acc - parseInt(sum2));
          return remain2;
			  }, 0);
      },
      // sumRemain3: function (responseData) {
  	  //   return responseData.reduce((acc, val) => {
      //     var sum3 = 0 - val.mm;
      //     var remain3 = acc + parseInt(sum3);
	  	// 	  return remain3;
			//   }, 0);
      // },
      showStat: async function(){
        this.isLoading = true;
        var user = JSON.parse(localStorage.getItem("user"));
        await authService.getLeaveStat(user.uuid).then(response => {
          this.responseData = response.data;
          console.log(response.data);
        });
        this.isLoading = false;
      },
      info(item, index, button) {
        this.infoModal.title = `Row index: ${index}`
        this.infoModal.content = JSON.stringify(item, null, 2)
        this.$root.$emit('bv::show::modal', this.infoModal.id, button)
      },
      resetInfoModal() {
        this.infoModal.title = ''
        this.infoModal.content = ''
      },
      onFiltered(filteredItems) {
        this.totalRows = filteredItems.length
        this.currentPage = 1
      }
    },
    resetInfoModal() {
      this.infoModal.title = ''
      this.infoModal.content = ''
    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    }
  }
  watch: {}

</script>

<style scoped>
  .backcolor {
    background-color:#f8f8f8
  }

  input[type="date"]::-webkit-inner-spin-button {
    display: none;
    -webkit-appearance: none;
  }

  .media {
    max-width: 99%
  }

  @media (max-width: 550px) {
        .vs-component vs-button vs-button-primary vs-button-filled {
            margin-left: 20px;
            margin-right: 20px;
        }
  }
</style>
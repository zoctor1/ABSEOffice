<template>
  <div style="background-color:#f8f8f8">
    <b-col sm="12">
      <div style="position: relative;">
        <b-card style="margin-top:20px;">
          <h3>{{userIn.first_name}} {{userIn.last_name}}</h3>
          <h4 style="margin-bottom:10px">เเผนก : {{userIn.dept_name}}</h4>
          <h4 style="margin-bottom:10px">ตำแหน่ง : {{userIn.position_name}} </h4>
          <div class="center">
            <center>
              <div style="margin: 60px 150px 0px 0px">
                <popupLeave />
              </div>
              <div style="margin:-44px 0px 0px 150px">
                <popupOT />
              </div>
            </center>
          </div>
        </b-card>
      </div>
          
      <b-table-simple hover small caption-top responsive style="border :1px solid red; margin-top:10px; ">
          <b-thead class="thead-dark" head-variant="danger">
            <b-tr >
              <b-th><font size="3" color="#f2f2f2">ตารางสรุปการลาทั้งหมด</font></b-th>
              <b-th></b-th>
              <b-th></b-th>
              <b-th></b-th>
            </b-tr>
            <b-tr >
              <b-th>ประเภท</b-th>
              <b-th>สิทธิ</b-th>
              <b-th>ใช้ไป</b-th>
              <b-th>คงเหลือ</b-th>
            </b-tr>
          </b-thead>
        <b-tbody>
          <b-tr>
            <b-th>ลากิจ</b-th>
            <b-td>6</b-td>
            <b-td>4</b-td>
            <b-td>2</b-td>
          </b-tr>
          <b-tr>
            <b-th>ลาป่วย</b-th>
            <b-td>30</b-td>
            <b-td>14</b-td>
            <b-td>16</b-td>
          </b-tr>
          <b-tr>
            <b-th>ลาพักร้อน</b-th>
            <b-td>6</b-td>
            <b-td>0</b-td>
            <b-td>6</b-td> </b-tr
          ><b-tr>
            <b-th>ลาคลอด</b-th>
            <b-td>98</b-td>
            <b-td>0</b-td>
            <b-td>98</b-td> </b-tr
          ><b-tr>
            <b-th>ลาบวช</b-th>
            <b-td>15</b-td>
            <b-td>4</b-td>
            <b-td>1</b-td> </b-tr
          ><b-tr>
            <b-th>ลากิจไม่รับค่าจ้าง</b-th>
            <b-td>6</b-td>
            <b-td>1</b-td>
            <b-td>5</b-td>
          </b-tr>
        </b-tbody>
          <b-thead  class="thead-light" head-variant="danger">
            <b-tr>
              <b-th>Total Rows:</b-th>
              <b-th>-</b-th>
              <b-th>23</b-th>
              <b-th>-</b-th>
            </b-tr>
          </b-thead>
      </b-table-simple>
    </b-col>
  </div>
</template>

<script>
import * as mJS from "../assets/js/mainJS"
import 'material-icons/iconfont/material-icons.css'
import 'vuesax/dist/vuesax.css'
import * as authService from '@/services/auth.service';
import popupLeave from "@/components/popupLeave.vue"
import popupOT from "@/components/popupOT.vue"

export default {
  name: "home",
  components: {
    popupLeave,
    popupOT
  },
  data() {
    return {
      userIn: {},
      value1:'',
      value2:'',
      popupLeave:false,
      popupActivo3:false,
      popupOT:false,
      popupActivo4:false,
      filter: null,
      filterOn: [],
      select1:3,
      selected: null,
      selected2: null,
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
    // this.totalRows = this.items.length
    // this.getDataInformationAsync();
  },
  methods: {
    // getDataInformationAsync: async function(){
    //     var user = JSON.parse(localStorage.getItem("user"));
    //     await authService.getUserData(user.uuid).then(response => {
    //       for (var i = 0; i < response.data.length; i++) {
    //         response.data[i].no = i+1;
    //         response.data[i].full_Name = response.data[i].first_name + " " + response.data[i].last_name;
    //         this.name = response.data[i].full_Name;
    //       }
    //     });
    // },
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
</style>
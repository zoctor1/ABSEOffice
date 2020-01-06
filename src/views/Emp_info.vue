<template>
  <div id="EmpLeave">
    <center>
      <div><br>
        <b-col sm="10">
          <div style="position: relative;">
            <h2 align="left">Employee</h2>
            
          </div>
          <b-nav-form >
              <b-input-group size="sm">
                <b-form-input
                  size="sm" 
                  class="mr-sm-2"
                  v-model="filter"
                  type="search"
                  id="filterInput"
                  placeholder="ค้นหา.."
                >
                </b-form-input>
                <b-input-group-append>
                  <b-button 
                    size="sm" 
                    class="my-2 my-sm-0" 
                    type="submit" 
                    variant="primary" 
                    :disabled="!filter" 
                    @click="filter = ''"
                    >
                    Clear
                  </b-button>
                </b-input-group-append>
              </b-input-group>
          </b-nav-form>
          <table width=100% style="margin-top:10px; border: 1px solid black;">
            <div>
              <b-table
                striped hover :items="items"
                :fields="fields"
                :filter="filter"
                :current-page="currentPage"
                :per-page="perPage"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
                :sort-direction="sortDirection"
                @filtered="onFiltered"
              > 
              <template v-slot:cell(first_name)="data">
                <button>{{ data.value }}</button> {{sortDirection}}
              </template>
              </b-table>
            </div>
          </table>
        </b-col>
      </div>
    </center>
        <div>
          <b-col sm="5" class="my-1" id="parent2"> 
              <b-row class="my-1">
                  <b-col sm="8">
                      <b-pagination
                        v-model="currentPage"
                        :total-rows="totalRows"
                        :per-page="perPage"
                        align="fill"
                        size="md"
                        class="my-0"
                      ></b-pagination>
                  </b-col>
              </b-row>
          </b-col>
        </div>
        
  </div>
</template>

<script>
import * as mJS from "../assets/js/mainJS"
import * as authService from '@/services/auth.service';

export default {
  name: "EmpLeave",
  components: {},
  props: {},
  data() {
    return {
          items: [],
          fields: [
            { key: 'no', label: 'ลำดับ', class: 'text-center' },
            { key: 'first_name', label: 'ชื่อ', class: 'text-center' },
            { key: 'last_name', label: 'นามสกุล', class: 'text-center' },
            { key: 'nick_name', label: 'ชื่อเล่น', class: 'text-center' },
            { key: 'dept_name', label: 'แผนก', class: 'text-center' },
            { key: 'position_name', label: 'ตำแหน่ง', class: 'text-center' },
            { key: 'email', label: 'อีเมล', class: 'text-center' },
            { key: 'mobile', label: 'เบอร์โทร', class: 'text-center' },
            { key: 'address', label: 'ที่อยู่', class: 'text-center' },
            { key: 'work_start', label: 'เริ่มงาน', class: 'text-center' },
            { key: 'work_stop', label: 'วันที่สิ้นสุด', class: 'text-center' },
            { key: 'test_past', label: 'ผลการทดสอบ', class: 'text-center' },
            
//             "first_name": "Service",
// "last_name": "Leader",
// "nick_name": "API",
// "mobile": null,
// "email": "leader.hr@abs.co.th",
// "address": null,
// "work_start": null,
// "test_past": null,
// "work_stop": null,
// "dept_name": "พัฒนาระบบสารสนเทศ",
// "position_name": "หัวหน้าทีมพัฒนาระบบ Service application"
          ],
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
          value1:'',
          value2:'',
          popupLeave:false,
          popupActivo3:false,
          totalRows:1,
          currentPage: 1,
          perPage: 10,
          pageOptions: [10, 15],
          filter: null,
          filterOn: [],
          sortBy: '',
          sortDesc: false,
          sortDirection: 'asc',
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

    authService.getEmployee({}).then(response => {
      console.log(response.data)
      for (var i = 0; i < response.data.length; i++) {
      response.data[i].no = i+1;
    }
      this.items = response.data;
    });
    this.totalRows = this.items.length
  },
  methods: {
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
  watch: {}
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

  #parent2 {
  position: Sticky ;
  top: 8%;
  left: 60%;
  /* top: 5px;
  left: 1090px; */

  }
</style>

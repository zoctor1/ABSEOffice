<template>
  <div id="EmpOT">
      <center>
        <div><br>
          <b-col sm="12">
            <div style="position: relative;">    
              <h2 align="left">ข้อมูลการทำงานนอกเวลา (OT) </h2>
                <div style="position: absolute; top: 50%; right: 0; transform: translate(0, -40%);">
                  <popupOT />
                </div>
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
                    > Clear
                    </b-button>
                    <div style="cursor: pointer; margin-left:10px" @click="toggleBusy">
                      <img src="../assets/refresh.png" width="33" height="33">
                    </div>
                  </b-input-group-append>
                </b-input-group>
              </b-nav-form>
            
              <table width=100% style="border :1px solid black; margin-top:10px;" >
                <div>
                  <b-table
                    :busy="isBusy" 
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
                    <template v-slot:table-busy>
                      <div class="text-center text-danger ">
                        <b-spinner class="align-middle"></b-spinner>
                        <strong>Loading...</strong>
                      </div>
                    </template>
                  </b-table>
                    <!-- :busy="isBusy" is reload variable  -->
                </div>
              </table>
          </b-col>
        </div>
      </center>
        <div>
          <b-col sm="5" class="my-1" id="parent2">
              <b-row class="my-1" >
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
import popupOT from "@/components/popupOT.vue"

export default {
  name: "EmpOT",
  components: {
    popupOT
  },
  props: {},
  data() {
    return {
          items: [],
          fields: [
            { key: 'no', label: 'ลำดับ', class: 'text-center' },
            { key: 'name', label: 'ชื่อ', class: 'text-center' },
            { key: 'section', label: 'เเผนก', class: 'text-center' },
            { key: 'work', label: 'งานที่ทำ', class: 'text-center' },
            { key: 'date', label: 'วันที่', class: 'text-center' },
            { key: 'startAt', label: 'เริ่มงาน', class: 'text-center' },
            { key: 'endAt', label: 'เลิกงาน', class: 'text-center' },
            { key: 'money', label: 'การเบิกเงิน', class: 'text-center' },
          ],
          isBusy: false,
          value1:'',
          value2:'',
          popupOT:false,
          popupActivo3:false,
          select1:3,
          totalRows:1,
          currentPage: 1,
          perPage: 10,
          filter: null,
          filterOn: [],
          sortBy: '',
          sortDesc: false,
          sortDirection: 'asc',
          types: [
            'time',
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
      },
      toggleBusy() {
        this.isBusy = !this.isBusy
      }
    },
  watch: {}
};
</script>

<style scoped>
  #parent2 {
  position: Sticky ;
  top: 8%;
  left: 60%;
  }
</style>

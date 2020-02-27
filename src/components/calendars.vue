<template>
    <div>
        <div align="right">
            <b-form-checkbox
                id="checkbox-1"
                style="margin-right:6px"
                v-model="checkEvent"
                name="checkbox-1"
                :value="true"
                :unchecked-value="false"
                @input="checkEventCalendar()"
                v-if="user.header_flag == 1 || this.user.dept_id == 3"
            >
                ดูข้อมูลการลาของพนักงาน
            </b-form-checkbox>
            <div v-else>
                <br>
            </div>
        </div>
        
        <calendar
            id ="calendarMain"
            style="margin: 0px -10px 10px -10px;background: #f8f8f8;"
            :first-day="1"
            :all-events="events"

        >
        </calendar>
    </div>
</template>

<script>
    import * as mainJs from '../assets/js/mainJS'
    import {Calendar} from 'vue-bootstrap4-calendar';
    import * as authService from '@/services/auth.service';

    export default {
        name: 'app',
        data() {
            return {
                checkEvent: false,
                user:{},
                events: []
            }
        },
        components: {
            Calendar
        },
        methods: {
            eventAdded(event) {
                this.events.push(event);
            },
            eventDeleted(event) {
                this.events.splice(this.events.indexOf(event), 1);
            },
            checkEventCalendar(){
                this.calendarEvent()
            },
            calendarEvent: async function(){
                let me = this;
                var user = JSON.parse(localStorage.getItem("user"));
                var dataTemp = [];
                var count = 0;
                var choice = this.checkEvent;
                var startDate = new Date();
                var stopDate = new Date();
                var fullname = "";
                var description = "";
                await authService.getEvent(user.uuid, user.dept_id, user.header_flag, choice).then(response => {
                    console.log(response.data);
                    response.data.forEach( function(obj) {
                        if(obj.head_approve_date != null && obj.hr_approve_date != null && obj.cancel_date == null){
                            if(choice == true){
                                startDate = new Date(obj.leave_start_date);
                                stopDate = new Date(obj.leave_stop_date);
                                fullname = obj.first_name + " " + obj.last_name;
                                description = "ประเภทการลา : " + obj.leave_reason_name + " รายละเอียดการลา : "  +  obj.leave_remark  + " ระยะเวลาการลา : " +  obj.leave_start_date + " ถึง " + obj.leave_stop_date;
                                for (var d = startDate; d <= stopDate; d.setDate(d.getDate() + 1)) {
                                    count++;
                                    dataTemp.push({
                                        id: count,
                                        title : fullname,
                                        description: description,
                                        color: 'card-danger card-inverse',
                                        date: new Date(d)
                                    });
                                }
                            }
                            else{
                                startDate = new Date(obj.leave_start_date);
                                stopDate = new Date(obj.leave_stop_date);
                                description = "รายละเอียดการลา : "  +  obj.leave_remark  + " ระยะเวลาการลา : " +  obj.leave_start_date + " ถึง " + obj.leave_stop_date;
                                for (var d = startDate; d <= stopDate; d.setDate(d.getDate() + 1)) {
                                    count++;
                                    dataTemp.push({
                                        id: count,
                                        title : obj.leave_reason_name,
                                        description: description,
                                        color: 'card-danger card-inverse',
                                        date: new Date(d)
                                    });
                                }
                            }
                        }
                        else{
                            console.log("not approve")
                        }
                    });
                }); 
                me.events = dataTemp;
            }
        },
        mounted() {
            this.calendarEvent();
            this.user = JSON.parse(localStorage.getItem("user"));
        }
    }
</script>

<style>
    #calendarMain .badge-success {
        display: none;    
    }
    #calendarMain .title {
        margin-left: 50%;
    }
    #calendarMain .card-header {
        font-weight: bold;
    }
    #calendarMain .modal-title {
        text-align: left;
    }
    #calendarMain .close {
        display: none;
    }
    #calendarMain .card-header h2{
        font-weight: bold !important;
    }
    #calendarMain .btn-warning{
        display: none;
    }
    #calendarMain .modal-content {
       margin-top: 60%;
   }
</style>
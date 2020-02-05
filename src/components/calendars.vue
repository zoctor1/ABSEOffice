<template>
    <div>
        <div style="text-align:right; margin-right:5px">
            <b-form-select 
                class="selectCalendar"
                style="width:250px; margin:10px 0 10px 0px"
                v-model="selectCalendar" 
                :options="optionCalendar"
                
            >
            </b-form-select>
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
    import {Calendar} from 'vue-bootstrap4-calendar';
    import * as authService from '@/services/auth.service';

    export default {
        name: 'app',
        data() {
            return {
                selectCalendar: null,
                optionCalendar: [
                    { value: null ,text: 'เลือกปฏิทินข้อมูลการลางาน', disabled: true},
                    { value: 1 ,text: 'ข้อมูลส่วนตัว' },
                    { value: 2 ,text: 'ข้อมูลการลางานของพนักงาน' }
                ],
                events: []
            }
        },
        components: {
            Calendar
        },
        methods: {
            calendarEvent: async function(){
                let me = this;
                var user = JSON.parse(localStorage.getItem("user"));
                var dataTemp = [];
                var count = 0;
                var startDate = new Date();
                var stopDate = new Date();
                await authService.getEvent(user.uuid).then(response => {
                    console.log(response.data);
                    response.data.forEach( function(obj) {
                        if(obj.head_approve_date != null && obj.hr_approve_date != null && obj.cancel_date == null){
                            startDate = new Date(obj.leave_start_date);
                            stopDate = new Date(obj.leave_stop_date);
                            for (var d = startDate; d <= stopDate; d.setDate(d.getDate() + 1)) {
                                count++;
                                dataTemp.push({
                                    id: count,
                                    title : obj.leave_reason_name,
                                    description: obj.leave_remark,
                                    color: 'card-danger card-inverse',
                                    date: new Date(d)
                                });
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
        }
    }
</script>

<style>
    #calendarMain .badge-success {
        display: none;    
    }
    #calendarMain .title {
        text-align: right;
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
</style>
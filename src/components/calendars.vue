<template>
  <calendar
    id ="calendarMain"
    style="margin: 20px -10px 10px -10px;background: #f8f8f8;"
    :first-day="1"
    :all-events="events"
  >
  </calendar>
</template>

<script>
    import {Calendar} from 'vue-bootstrap4-calendar';
    import * as authService from '@/services/auth.service';

    export default {
        name: 'app',
        data() {
            return {
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
                    response.data.forEach( function(obj, i) {
                        if(obj.head_approve_date != null && obj.hr_approve_date != null && obj.cancel_date == null){
                            startDate = new Date(obj.leave_start_time);
                            stopDate = new Date(obj.leave_stop_time);
                            for (var d = startDate; d <= stopDate; d.setDate(d.getDate() + 1)) {
                                dataTemp.push({
                                    id: count,
                                    title : obj.leave_reason_name,
                                    description: obj.leave_remark,
                                    color: 'card-info card-inverse',
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
    #calendarMain .week-number {
        display: none;
    }
    #calendarMain .badge-success { 
        display: none;
    }
    #calendarMain .event-title { 
        display: none;
    }
    #calendarMain .card-inverse  { 
        display: none;
    }
    
    #calendarMain .modal-body .event-color {
        display: none;
    }
    #calendarMain .badge-success { 
        display: none;
    }
    
</style>
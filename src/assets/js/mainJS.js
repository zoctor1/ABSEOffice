export function toPage(page) {
    this.$router.push("/" + page);
}

export function setDateToServer(d, flag) {
    if (d == undefined || d == null) {
        return null;
    } else {
        var dd = new Date(d);
        // var dateTxt = d.split(" ");
        // var setDate = dateTxt[0].split("/");
        // return (setDate[2] + "-" + setDate[1] + "-" + setDate[0] + " " + dateTxt[1] + ":00");
        if (flag == "TZ") {
            return dd.getFullYear() + "-" + (dd.getMonth() + 1 < "10" ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1) + "-" + (dd.getDate() < "10" ? "0" + dd.getDate() : dd.getDate()) + "T" + (dd.getHours() < "10" ? "0" + dd.getHours() : dd.getHours()) + ":" + (dd.getMinutes() < "10" ? "0" + dd.getMinutes() : dd.getMinutes()) + ":" + (dd.getSeconds() < "10" ? "0" + dd.getSeconds() : dd.getSeconds() + ".000Z");
        } else { 
            return dd.getFullYear() + "-" + (dd.getMonth() + 1 < "10" ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1) + "-" + (dd.getDate() < "10" ? "0" + dd.getDate() : dd.getDate()) + " " + (dd.getHours() < "10" ? "0" + dd.getHours() : dd.getHours()) + ":" + (dd.getMinutes() < "10" ? "0" + dd.getMinutes() : dd.getMinutes()) + ":" + (dd.getSeconds() < "10" ? "0" + dd.getSeconds() : dd.getSeconds());
        }
    }
}

export function formatDateFilter(d) {
    if (d == undefined || d == null) {
        return null;
    } else {
        var dd = new Date(d);
        return dd.getFullYear() + "-" + (dd.getMonth() + 1 < "10" ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1) + "-" + (dd.getDate() < "10" ? "0" + dd.getDate() : dd.getDate());
        
    }
}

export function setDateFormat(d){
    if (d == undefined || d == null){
        return null;
    }
    else{
        var dd = new Date(d);
        return (dd.getDate() < "10" ? "0" + dd.getDate() : dd.getDate()) + "/" + 
            (dd.getMonth() + 1 < "10" ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1) + "/" + 
             dd.getFullYear() + " " + 
            (dd.getHours() < "10" ? "0" + dd.getHours() : dd.getHours()) + ":" + 
            (dd.getMinutes() < "10" ? "0" + dd.getMinutes() : dd.getMinutes()) 
    }
}

export function checkStopTime(Start, Stop) {
    var status = true;
    var timeStart = new Date(Start);
    var timeStop = new Date(Stop);

    if (timeStart.getTime() > timeStop.getTime()) {
        status = false;
    }
    return status;
}

export function validateTime(Start, Stop) {
    var status = false;
    // Start += "";
    // Stop += "";
    // var timeStart = new Date(Start);
    // var timeStop = new Date(Stop);

    if (Start != null && Start != "" && Stop != null && Stop != "") {
        status = true;
    }

    return status;
}

// export function checkTimeLeave(start, stop) {
//     var startDate = new Date(start);
//     var stopDate = new Date(stop);  
  
//     // var msDay = 36000000; // 10
//     var msDay = 32400000; // 9
//     // var msDay = 28800000; // 8
//     // var msDay = 25200000; // 7
//     //if (type == 3) {
//     // msDay = 32400000;
//     //}
//     var ms = (stopDate - startDate);
//     var days = Math.floor(ms / msDay); // days
//     var hrs = Math.floor((ms % msDay) / 3600000); // hours
//     var mins = Math.round(((ms % msDay) % 3600000) / 60000); // min
  
//     return days + " " + hrs + " " + mins;
//   }
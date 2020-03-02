export function toPage(page) {
    this.$router.push("/" + page);
}

export function setDateToServer(d, flag) {
    if (d == undefined || d == null || d.trim() == "") {
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
    if (d == undefined || d == null || d.trim() == "") {
        return null;
    } else {
        var dd = new Date(d);
        return dd.getFullYear() + "-" + (dd.getMonth() + 1 < "10" ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1) + "-" + (dd.getDate() < "10" ? "0" + dd.getDate() : dd.getDate());
        
    }
}

export function setDateFormat(d){
    if (d == undefined || d == null || d.trim() == ""){
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
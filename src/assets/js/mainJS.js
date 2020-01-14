export function toPage(page) {
    this.$router.push("/" + page);
}

export function setDateToServer(d) {
    if (d == undefined || d == null || d.trim() == "") {
        return null;
    } else {
        var dateTxt = d.split(" ");
        var setDate = dateTxt[0].split("/");
        return (setDate[2] + "-" + setDate[1] + "-" + setDate[0] + " " + dateTxt[1] + ":00");
    }
}
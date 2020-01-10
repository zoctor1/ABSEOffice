export function toPage(page) {
    this.$router.push("/" + page);
}

export function setDateToServer(d) {
    var dateTxt = d.split(" ");
    var setDate = dateTxt[0].split("/");
    var dateReturn = setDate[2] + "-" + setDate[1] + "-" + setDate[0] + " " + dateTxt[1] + ":00";
    return dateReturn;
  }
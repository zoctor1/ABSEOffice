import Vue from "vue";
import Router from "vue-router";

// ============= Views ============= //
import Main from "./views/Main.vue";
import Login from "./views/Login.vue";
import LeaveEmp from "./views/LeaveEmp.vue";
import LeaveHeader from "./views/LeaveHeader.vue";
import LeaveHr from "./views/LeaveHr.vue";
import OTEmp from "./views/OTEmp.vue";
import OTHeader from "./views/OTHeader.vue"
import OTHr from "./views/OTHr.vue";
import dataEmployee from "./views/dataEmployee.vue"
import dataDeptEmployee from "./views/dataDeptEmployee.vue"
// ============= Views ============= //

// ============= Components =============

// ============= Components =============

Vue.use(Router);
const ifAuthenticated = (to, from, next) => {

}
export default new Router({
  mode: "history",
  // base: "ABSEOffice",
  routes: [
    { path: '*', redirect: '/HomePage' },
    { path: "/HomePage", name: "Main", component: Main },
    { path: "/Login", name: "Login", component: Login },
    { path: "/LeaveEmp", name: "LeaveEmp", component: LeaveEmp },
    { path: "/LeaveHeader", name: "LeaveHeader", component: LeaveHeader },
    { path: "/LeaveHr", name: "LeaveHr", component: LeaveHr },
    { path: "/OTEmp", name: "OTEmp", component: OTEmp },
    { path: "/OTHeader", name: "OTHeader", component: OTHeader },
    { path: "/OTHr", name: "OTHr", component: OTHr },
    { path: "/dataEmployee", name: "dataEmployee", component: dataEmployee },
    { path: "/dataDeptEmployee", name: "dataDeptEmployee", component: dataDeptEmployee }
  ]
});

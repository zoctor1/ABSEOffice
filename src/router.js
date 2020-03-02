import Vue from "vue";
import Router from "vue-router";

// ============= Views ============= //
import Main from "./views/Main.vue";
import Login from "./views/Login.vue";
import HeaderApprove from "./views/HeaderApprove.vue";
import EmpLeave from "./views/EmpLeave.vue";
import EmpOT from "./views/EmpOT.vue";
import HrLeave from "./views/HrLeave.vue";
import HrOT from "./views/HrOT.vue";
import NewEmployeeApprove from "./views/NewEmployeeApprove.vue"

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
    { path: "/HeaderApprove", name: "HeaderApprove", component: HeaderApprove },
    { path: "/EmpLeave", name: "EmpLeave", component: EmpLeave },
    { path: "/EmpOT", name: "EmpOT", component: EmpOT },
    { path: "/HrLeave", name: "HrLeave", component: HrLeave },
    { path: "/HrOT", name: "HrOT", component: HrOT },
    { path: "/NewEmployeeApprove", name: "NewEmployeeApprove", component: NewEmployeeApprove }
  ]
});

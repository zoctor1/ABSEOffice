import axios from "axios";
import { API_URL } from './config'
import { ResponseWrapper, ErrorWrapper } from './util'

axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.get['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.get['Content-Type'] = 'application/json';
axios.defaults.crossDomain = true;

export function getDataDept() {
    return new Promise((resolve, reject) => {
        axios.get(`${API_URL}/dataDept`, {}, { params: {} }).then(
            response => {
                return resolve(new ResponseWrapper(response, response.data))
            })
    }).catch(error => reject(new ErrorWrapper(error)))
}

export function getDataPosition() {
    return new Promise((resolve, reject) => {
        axios.get(`${API_URL}/dataPosition`, {}, { params: {} }).then(
            response => {
                return resolve(new ResponseWrapper(response, response.data))
            })
    }).catch(error => reject(new ErrorWrapper(error)))
}

export function getDataTypeLeave() {
    return new Promise((resolve, reject) => {
        axios.get(`${API_URL}/dataTypeLeave`, {}, { params: {} }).then(
            response => {
                return resolve(new ResponseWrapper(response, response.data))
            })
    }).catch(error => reject(new ErrorWrapper(error)))
}

export function getDataReasonLeave() {
    return new Promise((resolve, reject) => {
        axios.get(`${API_URL}/dataReasonLeave`, {}, { params: {} }).then(
            response => {
                return resolve(new ResponseWrapper(response, response.data))
            })
    }).catch(error => reject(new ErrorWrapper(error)))
}

export function getDataUserDept(deptId) {
    return new Promise((resolve, reject) => {
        axios.post(`${API_URL}/dataUserDept`, {}, { headers: {dataDept : deptId} }).then(
            response => {
                return resolve(new ResponseWrapper(response, response.data))
            })
    }).catch(error => reject(new ErrorWrapper(error)))
}

export function getDataAllUser() {
    return new Promise((resolve, reject) => {
        axios.post(`${API_URL}/dataAllUser`, {}, { params: {} }).then(
            response => {
                return resolve(new ResponseWrapper(response, response.data))
            })
    }).catch(error => reject(new ErrorWrapper(error)))
}

export function getNewEmployee() {
    return new Promise((resolve, reject) => {
        axios.post(`${API_URL}/dataNewEmployee`, {}, { params: {} }).then(
            response => {
                return resolve(new ResponseWrapper(response, response.data))
            })
    }).catch(error => reject(new ErrorWrapper(error)))
}



export function getDataHR() {
    return new Promise((resolve, reject) => {
        axios.get(`${API_URL}/dataForHR`, {}, { params: {} }).then(
            response => {
                return resolve(new ResponseWrapper(response, response.data))
            })
    }).catch(error => reject(new ErrorWrapper(error)))
}

export function getDataHeader(deptId) {
    return new Promise((resolve, reject) => {
        axios.post(`${API_URL}/dataForHeader`, {}, { headers: {datahd : deptId} }).then(
            response => {
                return resolve(new ResponseWrapper(response, response.data))
            })
    }).catch(error => reject(new ErrorWrapper(error)))
}

export function loginUser(user,pass) {
    return new Promise((resolve, reject) => {
        axios.post(`${API_URL}/login`, {}, { headers: {username: user, password: pass} }).then(
            response => {
                return resolve(new ResponseWrapper(response, response.data))
            }).catch( reject => {
                return reject(new ErrorWrapper(error));
            });
    })
}

export function insertData(obj) {
    return new Promise((resolve, reject) => {
        axios.post(`${API_URL}/addDataLeave`, JSON.stringify(obj), {}).then(
            response => {
                return resolve(new ResponseWrapper(response, response.data))
            })
    }).catch(error => reject(new ErrorWrapper(error)))
}

export function addImage(formData) {
    return new Promise((resolve, reject) => {
        axios.post(`${API_URL}/addImage`, formData, {headers: {"Content-Type": "multipart/form-data"}}).then(
            response => {
                return resolve(new ResponseWrapper(response, response.data))
            })
    }).catch(error => reject(new ErrorWrapper(error)))
}

export function getUserLeave(userId) {
    return new Promise((resolve, reject) => {
        axios.post(`${API_URL}/UserLeave`, {}, { headers: {dataUser: userId} }).then(
            response => {
                return resolve(new ResponseWrapper(response, response.data))
            })
    }).catch(error => reject(new ErrorWrapper(error)))
}

export function getLeaveStat(dataS) {
    return new Promise((resolve, reject) => {
        axios.post(`${API_URL}/LeaveStat`, {}, { headers: {dataStat : dataS} }).then(
            response => {
                return resolve(new ResponseWrapper(response, response.data))
            })
    }).catch(error => reject(new ErrorWrapper(error)))
}

export function postApproveHr(approveHr) {
    return new Promise((resolve, reject) => {
        axios.post(`${API_URL}/ApproveHR`, {}, { headers: {dataHR : approveHr} }).then(
            response => {
                return resolve(new ResponseWrapper(response, response.data))
            })
    }).catch(error => reject(new ErrorWrapper(error)))
}

export function postApproveHead(approveH) {
    return new Promise((resolve, reject) => {
        axios.post(`${API_URL}/ApproveHead`, {}, { headers: {dataHead : approveH} }).then(
            response => {
                return resolve(new ResponseWrapper(response, response.data))
            })
    }).catch(error => reject(new ErrorWrapper(error)))
}

export function notApproveHead(notApproveH, commentHeader) {
    if (commentHeader == undefined) {
        commentHeader = "";
    }
    return new Promise((resolve, reject) => {
        axios.post(`${API_URL}/NotApproveHead`, {}, { params: {commentHeader : commentHeader, leaveID : notApproveH} }).then(
            response => {
                return resolve(new ResponseWrapper(response, response.data))
            })
    }).catch(error => reject(new ErrorWrapper(error)))
}

export function notApproveHR(notApproveHr,commentHR) {
    if (commentHR == undefined) {
        commentHR = "";
    }
    return new Promise((resolve, reject) => {
        axios.post(`${API_URL}/NotApproveHR`, {}, { params: {commentHR : commentHR, leaveID : notApproveHr} }).then(
            response => {
                return resolve(new ResponseWrapper(response, response.data))
            })
    }).catch(error => reject(new ErrorWrapper(error)))
}

export function getEvent(empId, deptId, header, choice) {
    return new Promise((resolve, reject) => {
        axios.post(`${API_URL}/CalendarEvent`, {}, { params: {eventEmp : empId, eventDept : deptId, eventHeader : header, eventChoice : choice} }).then(
            response => {
                return resolve(new ResponseWrapper(response, response.data))
            })
    }).catch(error => reject(new ErrorWrapper(error)))
}

export function postcancelCheck(cancel) {
    return new Promise((resolve, reject) => {
        axios.post(`${API_URL}/CancelLeave`, {}, { headers : {leaveId : cancel} }).then(
            response => {
                return resolve(new ResponseWrapper(response, response.data))
            })
    }).catch(error => reject(new ErrorWrapper(error)))
}

export function EditLeave(obj) {
    return new Promise((resolve, reject) => {
        axios.post(`${API_URL}/EditLeave`, JSON.stringify(obj), {}).then(
            response => {
                return resolve(new ResponseWrapper(response, response.data))
            })
    }).catch(error => reject(new ErrorWrapper(error)))
}

export function insertDataByHeader(obj) {
    return new Promise((resolve, reject) => {
        axios.post(`${API_URL}/insertDataByHeader`, JSON.stringify(obj), {}).then(
            response => {
                return resolve(new ResponseWrapper(response, response.data))
            })
    }).catch(error => reject(new ErrorWrapper(error)))
}

export function insertNewEmployee(obj) {
    return new Promise((resolve, reject) => {
        axios.post(`${API_URL}/insertNewEmployee`, JSON.stringify(obj), {}).then(
            response => {
                return resolve(new ResponseWrapper(response, response.data))
            })
    }).catch(error => reject(new ErrorWrapper(error)))
}

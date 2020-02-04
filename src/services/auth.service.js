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

export function getDataHR() {
    return new Promise((resolve, reject) => {
        axios.get(`${API_URL}/dataForHR`, {}, { params: {} }).then(
            response => {
                return resolve(new ResponseWrapper(response, response.data))
            })
    }).catch(error => reject(new ErrorWrapper(error)))
}

export function getDataHeader(dept_id) {
    console.log(dept_id);
    return new Promise((resolve, reject) => {
        axios.post(`${API_URL}/dataForHeader`, {}, { headers: {datahd : dept_id} }).then(
            response => {
                console.log(response.data)
                return resolve(new ResponseWrapper(response, response.data))
            })
    }).catch(error => reject(new ErrorWrapper(error)))
}

export function loginUser(user,pass) {
    return new Promise((resolve, reject) => {
        axios.post(`${API_URL}/login`, {}, { headers: {username: user, password: pass} }).then(
            response => {
                return resolve(new ResponseWrapper(response, response.data))
            })
    }).catch(error => reject(new ErrorWrapper(error)))
}

export function insertData(obj) {
    console.log("insertData")
    return new Promise((resolve, reject) => {
        axios.post(`${API_URL}/addDataLeave`, JSON.stringify(obj), {}).then(
            response => {
                return resolve(new ResponseWrapper(response, response.data))
            })
    }).catch(error => reject(new ErrorWrapper(error)))
}

export function addImage(formData) {
    console.log(formData)
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
    console.log(".................");
    console.log(dataS);
    return new Promise((resolve, reject) => {
        axios.post(`${API_URL}/LeaveStat`, {}, { headers: {dataStat : dataS} }).then(
            response => {
                return resolve(new ResponseWrapper(response, response.data))
            })
    }).catch(error => reject(new ErrorWrapper(error)))
}

export function postApproveHr(approveHr) {
    console.log(approveHr);
    return new Promise((resolve, reject) => {
        axios.post(`${API_URL}/ApproveHR`, {}, { headers: {dataHR : approveHr} }).then(
            response => {
                return resolve(new ResponseWrapper(response, response.data))
            })
    }).catch(error => reject(new ErrorWrapper(error)))
}

export function postApproveHead(approveH) {
    console.log(approveH);
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

export function getEvent(eventC) {
    console.log(eventC);
    return new Promise((resolve, reject) => {
        axios.post(`${API_URL}/CalendarEvent`, {}, { headers: {event : eventC} }).then(
            response => {
                return resolve(new ResponseWrapper(response, response.data))
            })
    }).catch(error => reject(new ErrorWrapper(error)))
}
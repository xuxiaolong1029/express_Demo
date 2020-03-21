const emailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
const phoneNumerReg = /^[1][3,4,5,7,8][0-9]{9}$/;
// const psdVerify = /^(?![\d]+$)(?![a-zA-Z]+$)(?![!#$%^&*]+$)[\da-zA-Z!#$%^&*]{8,32}$/;
const psdVerify = /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]){8,32}/g;

export default {
    emailReg, phoneNumerReg,psdVerify
}
// import { aesjs } from 'aes-js';
// var aesjs = require('aes-js');
// var textBytes = aesjs.utils.utf8.toBytes(text);
// var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
// var encryptedBytes = aesCtr.encrypt(textBytes);
// var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);

// var encryptedBytes = aesjs.utils.hex.toBytes(encryptedHex);
// var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
// var decryptedBytes = aesCtr.decrypt(encryptedBytes);
// var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);

export function strEnc(word, key) {
    key = CryptoJS.enc.Utf8.parse(key);
    var srcs = CryptoJS.enc.Utf8.parse(word);
    var encrypted = CryptoJS.AES.encrypt(srcs, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
    return encrypted.toString();
}

/**
 * 解密
 * @param word
 * @returns {*}
 */
export function strDec(word, key) {
    key = CryptoJS.enc.Utf8.parse(key);
    var decrypt = CryptoJS.AES.decrypt(word, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
    console.log("hhhh", typeof decrypt)
    console.log(CryptoJS.enc.Utf8.stringify(decrypt))
    return CryptoJS.enc.Utf8.stringify(decrypt).toString();
}
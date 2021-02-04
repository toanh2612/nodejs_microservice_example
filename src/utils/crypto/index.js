import * as CryptoJS from 'crypto-js';
import CONFIG from '../../config';
/**
 * @param {Object} data
 * */
export const encryptObject = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), CONFIG.CRYPTO_SECRET_KEY).toString();
};
/**
 * @param {String} data
 * */
export const decryptObject = (data) => {
  return JSON.parse(CryptoJS.AES.decrypt(data, CONFIG.CRYPTO_SECRET_KEY));
};
/**
 * @param {String} data
 * */
export const encryptString = (data) => {
  return CryptoJS.AES.encrypt(data, CONFIG.CRYPTO_SECRET_KEY);
};
/**
 * @param {String} data
 * */
export const decryptString = (data) => {
  return CryptoJS.AES.decrypt(data, CONFIG.CRYPTO_SECRET_KEY);
};

export default {
  encryptObject,
  decryptObject,
  encryptString,
  decryptString
};
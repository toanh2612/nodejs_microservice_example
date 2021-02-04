const crypto = require('crypto');
const keys = require('../config/keys');
export default (text) => {
  const resizedIV = Buffer.allocUnsafe(keys.crypto.resizedIV.size).fill(keys.crypto.resizedIV.value);
  const iv = crypto.createHash('sha256').update('').digest();
  iv.copy(resizedIV);
  const key = crypto.createHash('sha256').update(keys.crypto.secret).digest();
  const decipher = crypto.createDecipheriv('aes256', key, resizedIV);
  const msg2 = [];
  msg2.push(decipher.update(text, 'hex', 'binary'));
  msg2.push(decipher.final('binary'));
  return msg2.join('');
};
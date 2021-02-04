// import * as jwt from 'jsonwebtoken';
// import fs from 'fs';
// import path from 'path';
// import { decryptString } from '../utils/crypto/index';
// export default () => {
//   const cert = fs.readFileSync(path.join(`${process.cwd()}`, '/files/klab.pub'));
//   return (req, res, next) => {
//     const token = decryptString(res.locals.token);
//     jwt.verify(token, cert).then(decoded => {
//       if () {
//
//       }
//     }).catch(err => {
//
//     });
//   };
// };

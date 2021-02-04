import { v4 as uuidv4 } from 'uuid';
export default () => {
  return (req, res, next) => {
    res.locals.uuid = uuidv4();
    return next();
  };
};

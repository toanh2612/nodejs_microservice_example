/**
 * @param {Object} data
 * @param {String} data.vi
 * @param {String} data.en
 * */
const validateFormat = (data) => {
  return '^' + JSON.stringify(data);
};
export default validateFormat;
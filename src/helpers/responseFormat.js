/**
 * @param {Object} params
 * @param {*} params.statusCode
 * @param {*} params.result
 * @param {*} params.success
 * @param {Object} res
 * */
export default (params, res) => {
  const { statusCode, result, success, page, perPage } = params;
  res.status(parseInt(statusCode || 200)).json({
    uuid: res.locals.uuid,
    success: success || true,
    statusCode: parseInt(statusCode || 200),
    result,
    page,
    perPage
  });
};
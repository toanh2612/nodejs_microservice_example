import responseFormat from '../helpers/responseFormat';
import userService from '../services/userService';
export default {
  post: (req, res, next) => {
    const entity = res.locals.body;
    const params = { entity };
    userService.create(params).then(data => {
      responseFormat({
        result: data.result
      }, res);
    }).catch(error => {
      next(error);
    });
  },
  update: (req, res, next) => {
    const entity = res.locals.body;
    const { id } = req.params;
    const params = { entity, id };
    userService.update(params).then(data => {
      responseFormat({
        result: data.result
      }, res);
    }).catch(error => {
      next(error);
    });
  },
  getOne: (req, res, next) => {
    const { id } = req.params;
    const params = { id };
    userService.getOne(params).then(data => {
      responseFormat({
        result: data.result
      }, res);
    }).catch(error => {
      next(error);
    });
  },
  delete: (req, res, next) => {
    const { id } = req.params;
    const params = { id };
    userService.delete(params).then(data => {
      responseFormat({
        result: data.result
      }, res);
    }).catch(error => {
      next(error);
    });
  },
  getAll: (req, res, next) => {
    const { filter, sort } = res.locals;
    const params = { filter, sort };
    userService.getAll(params).then(data => {
      responseFormat({
        result: data.result
      }, res);
    }).catch(error => {
      next(error);
    });
  },
  getList: (req, res, next) => {
    const { filter, sort, range } = res.locals;
    const params = { filter, sort, range };
    userService.getList(params).then(data => {
      responseFormat({
        result: data.result,
        page: data.page,
        perPage: data.perPage
      }, res);
    }).catch(error => {
      next(error);
    });
  }
};

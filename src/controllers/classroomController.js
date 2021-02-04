import responseFormat from '../helpers/responseFormat';
import classroomService from '../services/classroomService';
export default {
  post: (req, res, next) => {
    const entity = req.body;
    const params = { entity };
    classroomService.create(params).then(data => {
      responseFormat({
        result: data.result
      }, res);
    }).catch(error => {
      next(error);
    });
  },
  update: (req, res, next) => {
    const entity = req.body;
    const { id } = req.params;
    const params = { entity, id };
    classroomService.update(params).then(data => {
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
    classroomService.getOne(params).then(data => {
      responseFormat({
        result: data.result
      }, res);
    }).catch(error => {
      next(error);
    });
  },
  getAll: (req, res, next) => {
    const { filter, sort } = req.query;
    const params = { filter, sort };
    classroomService.getAll(params).then(data => {
      responseFormat({
        result: data.result
      }, res);
    }).catch(error => {
      next(error);
    });
  },
  getList: (req, res, next) => {
    const { filter, sort, range } = req.query;
    const params = { filter, sort, range };
    classroomService.getList(params).then(data => {
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

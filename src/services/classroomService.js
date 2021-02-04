import models from '../models';
import { ErrorHandler } from '../errors/index';

const { classrooms } = models;
export default {
  /**
   * @param {Object} params
   * @param {Object} params.entity
   * */

  create: async params => {
    const { entity } = params;
    const result = await classrooms.create(entity).catch(error => {
      throw new ErrorHandler({
        statusCode: 500,
        result: error,
        type: 'createError'
      });
    });
    return {
      result
    };
  },
  update: async params => {
    const { entity, id } = params;
    const result = classrooms.update(entity, {
      where: {
        id: id
      }
    }).catch(error => {
      throw new ErrorHandler({
        statusCode: 500,
        result: error,
        type: 'updateError'
      });
    });
    return {
      result
    };
  },
  getOne: async params => {
    const { id } = params;
    const result = await classrooms.findOne({
      where: { id: id }
    }).catch(error => {
      throw new ErrorHandler({
        statusCode: 500,
        result: error,
        type: 'readError'
      });
    });
    return {
      result
    };
  },
  getAll: async (params) => {
    let filter = {};
    let sort = ['id', 'ASC'];
    if (params.filter) {
      filter = params.filter;
    }
    if (params.sort) {
      sort = params.sort;
    }
    const result = await classrooms.findAll({
      where: filter,
      order: [sort]
    }).catch(error => {
      throw new ErrorHandler({
        statusCode: 500,
        message: error,
        type: 'readError'
      });
    });
    return {
      result
    };
  },

  getList: async (params) => {
    let filter = {};
    const sort = ['id', 'ASC'];
    let perPage;
    let page;
    let range = [0, 10];
    if (params.range) {
      range = JSON.parse(params.range);
      perPage = (parseInt(range[1]) - parseInt(range[0])) + 1;
      page = Math.floor(parseInt(range[0]) / perPage);
    }
    if (params.filter) {
      filter = params.filter;
    }
    const result = await classrooms.findAll({
      where: filter,
      order: params.sort || [sort],
      limit: perPage,
      offset: range[0]
    }).catch(error => {
      throw new ErrorHandler({
        statusCode: 500,
        result: error,
        type: 'readError'
      });
    });
    return {
      result,
      page: page + 1,
      perPage
    };
  }
};
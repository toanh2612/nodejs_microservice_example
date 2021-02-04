import models from '../models/index';
import { ErrorHandler } from '../errors/index';

const { users } = models;
export default {
  /**
   * @param {Object} params
   * @param {Object} params.entity
   * */
  create: async params => {
    const { entity } = params;
    // eslint-disable-next-line prefer-const
    const result = await users.create(entity).catch(error => {
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
    const result = await users.update(entity, {
      where: {
        id: id,
        status: true
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

  getOne: async (params) => {
    const { id } = params;
    const result = await users.findOne({
      where: {
        id: id,
        status: true
      },
      attributes: {
        exclude: ['password']
      }
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
    const { filter, sort } = params;
    console.log(filter);
    const result = await users.findAll({
      where: filter,
      order: [sort],
      attributes: {
        exclude: ['password']
      }
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

  getList: async (params) => {
    const { filter, sort, range } = params;
    filter.status = true;
    const perPage = (parseInt(range[1]) - parseInt(range[0])) + 1;
    const page = Math.floor(parseInt(range[0]) / perPage);
    const result = await users.findAll({
      where: filter,
      order: [sort],
      limit: perPage,
      offset: range[0],
      attributes: {
        exclude: ['password']
      }
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
  },
  delete: async (params) => {
    const { id } = params;
    const result = await users.update({
      status: false
    }, {
      where: {
        id: id,
        status: true
      }
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
  }
};
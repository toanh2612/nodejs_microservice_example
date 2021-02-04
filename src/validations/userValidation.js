import validate from 'validate.js';
import { handleError } from '../errors';
import locales from '../locales/index';
import helpers from '../helpers/index';
import { sequelize } from '../db/index';
const { validateFormat, validateMessageFormat } = helpers;
const constraints = {
  username: {
    presence: true,
    type: 'string',
    format: {
      pattern: /[a-z0-9_.]+/i,
      message: function (value) {
        const data = {
          en: `${locales['api.user.username']['en']} '${value}' is not a valid username`,
          vi: `${locales['api.user.username']['vi']} '${value}' là không hợp lệ`
        };
        return validateFormat(data);
      }
    },
    exclusion: {
      within: ['admin', 'dev', 'administrator', 'tester'],
      message: function (value) {
        const data = {
          en: `${locales['api.user.username']['en']} '${value}' is not allow`,
          vi: `${locales['api.user.username']['vi']} '${value}' không cho phép`
        };
        return validateFormat(data);
      }
    }
  },
  password: {
    presence: true,
    type: 'string',
    format: {
      pattern: /[a-z0-9]+/i,
      message: function (value) {
        const data = {
          en: `${locales['api.user.password']['en']} '${value}' is not valid.`,
          vi: `${locales['api.user.password']['vi']} '${value}' là không hợp lệ.`
        };
        return validateFormat(data);
      }
    }
  },
  email: {
    type: 'string',
    email: {
      message: function (value) {
        const data = {
          en: `${locales['api.user.email']['en']} '${value}' is not valid.`,
          vi: `${locales['api.user.email']['vi']} '${value}' là không hợp lệ.`
        };
        return validateFormat(data);
      }
    }
  },
  name: {
    presence: true,
    type: 'string',
    format: {
      pattern: /[A-Za-zĐÀÁẢẠÃẦẤẨẬẪÂẮẰẶẴĂẲÈÉẸẺẼỂẾỀỆỄÊỊÌÍĨỈÒÓỎỌÕÔỐỒỔỘỖỜỚỠỢỞƠÙÚỤỦŨỨỪỬỮỰƯÝỲỶỸỴđàáảạãầấẩậẫâắằặẵăẳèéẹẻẽểếềệễêịìíĩỉòóỏọõôốồổộỗờớỡợởơùúụủũứừửữựưýỳỷỹỵ ']{2,49}$/i,
      message: function (value) {
        const data = {
          en: `${locales['api.user.password']['en']} '${value}' is not valid.`,
          vi: `${locales['api.user.password']['vi']} '${value}' là không hợp lệ.`
        };
        return validateFormat(data);
      }
    }
  }
};
export default {
  create: (req, res, next) => {
    const { username, password, email, name } = req.body;
    const data = { username, password, email, name };
    validate.async(data, constraints).then(() => {
      res.locals.body = data;
      next();
    }).catch(error => {
      handleError({
        statusCode: 202,
        type: 'validateError',
        messages: validateMessageFormat(error[Object.keys(error)[0]][0])
      }, res);
    });
  },
  update: (req, res, next) => {
    const { username, password, email, name } = req.body;
    const data = { username, password, email, name };
    const _constraints = constraints;
    Object.keys(_constraints).forEach(key => {
      _constraints[key]['presence'] = false;
    });
    Object.keys(data).forEach(key => {
      if (!data[key]) {
        delete data[key];
      }
    });
    validate.async(data, _constraints).then(() => {
      res.locals.body = data;
      next();
    }).catch(error => {
      handleError({
        statusCode: 202,
        type: 'validateError',
        messages: validateMessageFormat(error[Object.keys(error)[0]][0])
      }, res);
    });
  },
  filter: (req, res, next) => {
    const { filter, sort, range } = req.query;
    res.locals.sort = sort ? JSON.parse(sort).map((e, i) => (i === 0 ? sequelize.literal(`\`${e}\``) : e)) : ['id', 'asc'];
    res.locals.range = range ? JSON.parse(range) : [0, 49];
    if (filter) {
      const { username, password, email, name, id, roleId, status, phone } = JSON.parse(filter);
      const data = { username, password, email, name, id, roleId, status, phone };
      const _constraints = constraints;
      Object.keys(_constraints).forEach(key => {
        _constraints[key]['presence'] = false;
      });
      Object.keys(data).forEach(key => {
        if (!data[key]) {
          delete data[key];
        }
      });
      validate.async(data, _constraints).then(() => {
        res.locals.filter = data;
        next();
      }).catch(error => {
        handleError({
          statusCode: 202,
          type: 'validateError',
          messages: validateMessageFormat(error[Object.keys(error)[0]][0])
        }, res);
      });
    } else {
      res.locals.filter = {};
      next();
    }
  }
};
import errorCode from '../utils/errorCode';
export class ErrorHandler extends Error {
  constructor ({ statusCode, result, type, messages }) {
    super();
    this.statusCode = statusCode;
    this.result = result;
    this.type = type;
    this.messages = messages;
  }
}

export const handleError = (err, res) => {
  let finnalyResult = {};
  const { statusCode, result, type, messages } = err;
  finnalyResult = {
    uuid: res.locals.uuid,
    success: false,
    statusCode
  };
  if (errorCode[type] && errorCode[type]['messages']) {
    finnalyResult['warning'] = {
      code: errorCode[type]['code'],
      type,
      messages: {
        vi: errorCode[type]['messages']['vi'],
        en: errorCode[type]['messages']['en']
      }
    };
  } else {
    finnalyResult['warning'] = {
      code: errorCode[type]['code'],
      type,
      messages
    };
  }
  if (result && result['errors'] && result['errors'][0]) {
    delete result['errors'][0]['instance'];
    finnalyResult['result'] = result['errors'][0];
  }
  res.status(parseInt(statusCode)).json(finnalyResult);
};

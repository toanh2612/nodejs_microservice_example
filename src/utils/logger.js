import winston from 'winston';
import 'winston-daily-rotate-file';
import CONFIG from '../config';
import fs from 'fs';

if (!fs.existsSync(CONFIG.LOG_DIR)) {
  fs.mkdirSync(CONFIG.LOG_DIR);
}
/**
 * @param {{level: string}} params
 * @param {string} params.filename
 * @param {string} params.dirname
 * @param {string} params.maxSize
 * @param {string} params.maxFiles
 * @param {level} params.level
 * @param {string} params.datePattern
 * */
const logFileOptions = (params) => {
  return {
    filename: `%DATE%.${params.level}${CONFIG.LOG_EXTENSION}`,
    datePattern: params.datePattern || CONFIG.LOG_DATE_PATTERN,
    dirname: params.dirname || CONFIG.LOG_DIR,
    maxSize: params.maxSize || CONFIG.LOG_MAX_SIZE,
    maxFiles: params.maxFiles || CONFIG.LOG_MAX_FILES,
    level: params.level || 'info'
  };
};
const createTransports = () => {
  const transports = [];
  if (CONFIG.LOGGING_CONSOLE.toLocaleLowerCase() === 'true') {
    transports.push(new winston.transports.Console());
  }
  if (CONFIG.LOGGING_FILE.toLocaleLowerCase() === 'true') {
    if (CONFIG.COMBINED_LOG_FILE) {
      transports.push(new winston.transports.DailyRotateFile({
        filename: `%DATE%${CONFIG.COMBINED_LOG_FILE}`,
        dirname: CONFIG.LOG_DIR,
        maxSize: CONFIG.LOG_MAX_SIZE,
        maxFiles: CONFIG.LOG_MAX_FILES,
        datePattern: CONFIG.LOG_DATE_PATTERN
      }));
    }
    if (CONFIG.LOG_LEVELS) {
      const levels = CONFIG.LOG_LEVELS.replace(/\s/g, '').split(',');
      levels.forEach(level => {
        transports.push(new winston.transports.DailyRotateFile(logFileOptions({ level })));
      });
    }
  }

  return transports;
};

const createLogger = () => {
  return winston.createLogger({
    level: 'info',
    format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
    transports: createTransports()
  });
};
export default createLogger();
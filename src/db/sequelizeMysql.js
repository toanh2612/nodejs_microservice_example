import Sequelize from 'sequelize';
import CONFIG from '../CONFIG';
import logger from '../utils/logger';
export const { Op } = Sequelize;

export const sequelize = new Sequelize(CONFIG.MYSQL_DATABASE, CONFIG.MYSQL_USERNAME, CONFIG.MYSQL_PASSWORD, {
  host: CONFIG.MYSQL_HOST,
  dialect: CONFIG.MYSQL_DIALECT,
  dialectOptions: {
    multipleStatements: true,
    supportBigNumbers: true,
    bigNumberStrings: true,
    charset: 'utf8_general_ci',
    connectTimeout: CONFIG.MYSQL_CONNECTION_TIMEOUT
  },
  pool: {
    max: parseInt(CONFIG.MYSQL_POOL_MAX),
    min: parseInt(CONFIG.MYSQL_POOL_MIN),
    acquire: parseInt(CONFIG.MYSQL_CONNECTION_TIMEOUT),
    idle: parseInt(CONFIG.MYSQL_POOL_IDLE_TIMEOUT_MILLIS)
  },
  define: {
    createdAt: true,
    updatedAt: true,
    underscored: true,
    freezeTableName: false,
    charset: 'utf8',
    dialectOptions: {
      multipleStatements: true,
      charset: 'utf8_general_ci'
    },
    timestamps: false,
    timezone: CONFIG.TIMEZONE // for writng
  },
  timezone: CONFIG.TIMEZONE,
  logging: (CONFIG.LOGGING_DATABASE && CONFIG.LOGGING_CONSOLE) ? console.log : false
});

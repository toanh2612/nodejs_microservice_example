import redis from 'redis';
import bluebird from 'bluebird';
import { fnCachedKey } from '../utils/helper';
import CONFIG from '../config';

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);
let instance = null;
// const ttl = Number(CONFIG.CACHED_DB_MINUTES) * 60;

export default class MyRedis {
  constructor () {
    if (!this._redisClient) {
      this._redisClient = redis.createClient({
        host: CONFIG.CACHED_REDIS_HOST,
        port: CONFIG.CACHED_REDIS_PORT,
        auth_pass: CONFIG.REDIS_AUTH_PASS
      });
    }
    this.initCached();
  }

  get redisClient () {
    return this._redisClient;
  }

  set redisClient (value) {
    this._redisClient = value;
  }

  // eslint-disable-next-line require-jsdoc
  static getInstance () {
    if (!instance && instance === null) {
      instance = new MyRedis();
    }

    return instance;
  }

  // eslint-disable-next-line require-jsdoc
  static async setWithoutModel (prefixKey, value, infoFilter) {
    let finnalyResult;

    if (CONFIG.CACHED_DB_RESDIS === 'true') {
      if (prefixKey && value && infoFilter) {
        const instance = MyRedis.getInstance();
        const redisClient = instance.redisClient;
        let cachedKey = `${prefixKey}_${JSON.stringify(infoFilter)}`;

        cachedKey = fnCachedKey(cachedKey);

        if (typeof value !== 'string') {
          value = JSON.stringify(value);
        }

        if (redisClient) {
          // redisClient.setAsync(cachedKey, value, 'EX', ttl).then(console.log);
          await redisClient.set(cachedKey, value, function (error, result) {
            if (error) {
              throw new Error('setWithoutModel - Failed');
            }
            finnalyResult = result;
          });

          return finnalyResult;
        } else {
          throw new Error('!redisClient');
        }
      }
    }
  }

  // eslint-disable-next-line require-jsdoc
  static async getWithoutModel (prefixKey, infoFilter) {
    let finnalyResult;

    if (CONFIG.CACHED_DB_RESDIS === 'true') {
      if (prefixKey && infoFilter) {
        const instance = MyRedis.getInstance();
        const redisClient = instance.redisClient;
        let cachedKey = `${prefixKey}_${JSON.stringify(infoFilter)}`;

        cachedKey = fnCachedKey(cachedKey);
        if (redisClient) {
          finnalyResult = await redisClient.getAsync(cachedKey);
        } else {
          throw new Error('!redisClient');
        }
      }
    }

    return finnalyResult;
  }

  // eslint-disable-next-line require-jsdoc
  static async delWithoutModel (prefixKey, infoFilter) {
    let finnalyResult;

    if (CONFIG.CACHED_DB_RESDIS === 'true') {
      if (prefixKey && infoFilter) {
        const instance = MyRedis.getInstance();
        const redisClient = instance.redisClient;
        let cachedKey = `${prefixKey}_${JSON.stringify(infoFilter)}`;

        cachedKey = fnCachedKey(cachedKey);
        if (redisClient) {
          finnalyResult = await redisClient.del(cachedKey);
        } else {
          throw new Error('!redisClient');
        }
      }
    }

    return finnalyResult;
  }

  /**
   *
   */
  initCached () {
    // Define your myRedis
    let redisClient = this.redisClient;

    if (!redisClient) {
      redisClient = redis.createClient({
        host: CONFIG.CACHED_REDIS_HOST,
        port: CONFIG.CACHED_REDIS_PORT
      });
    }

    this._redisClient = redisClient;

    return {
      redisClient
    };
  }
}

import './db/index';
import express from 'express';
import CONFIG from './config';
import logger from './utils/logger';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import uuid from './middlewares/uuid';
import webRoutes from './webRoutes';
import routes from './routes';
import slackService from './web/services/slackService';
import { handleError } from './errors/index';
const { createEventAdapter } = require('@slack/events-api');
const slackEvents = createEventAdapter(CONFIG.SLACK_SIGNING_SECRET);

const app = express();
const APP_HOST = CONFIG.APP_HOST;
const APP_PORT = CONFIG.APP_PORT || process.env.PORT || 3000;

app.set('host', APP_HOST);
app.set('port', APP_PORT);

app.use(morgan('dev'));

// Plug the adapter in as a middleware
app.use(CONFIG.SLACK_PATH, slackEvents.requestListener());
slackEvents.on('message', async (event) => {
  await slackService.processEvent(event);
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(uuid());

app.use('/web/api/c', webRoutes);

// app.all('/api/c/*',(req,res,next) => {
//
// });
app.use('/api/c', routes);

app.use((err, req, res, next) => {
  logger.error({ error: err, uuid: res.locals.uuid });
  handleError(err, res);
});
app.use((req, res) => {
  handleError({
    statusCode: 404,
    type: 'notFound'
  }, res);
});
app.listen(app.get('port'), app.get('host'), () => {
  logger.info({ info: `HOST: ${app.get('host')} PORT: ${app.get('port')}` });
});

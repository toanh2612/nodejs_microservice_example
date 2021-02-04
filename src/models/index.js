import { Sequelize } from 'sequelize';
import users from './users';
import roles from './roles';
import classrooms from './classrooms';
import tests from './tests';
import permissions from './permissions';
import results from './results';
import _object from './_object';
import classroomsUsers from './classroomsUsers';

import { sequelize } from '../db/index';
import associate from './associate/index';
const modules = [users, roles, classroomsUsers, _object, classrooms, permissions, results, tests];
const models = {};
modules.forEach(module => {
  const model = module(sequelize, Sequelize);
  models[model.name] = model;
});
associate(models);

models.sequelize = sequelize;
models.Sequelize = Sequelize;
models.Op = Sequelize.Op;
export default models;
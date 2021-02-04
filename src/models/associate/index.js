export default (models) => {
  const { users, roles, classroomsUsers, _objects, classrooms, permissions, results, tests } = models;

  // classroom associate user create class
  users.hasMany(classrooms, { foreignKey: 'userId' });
  classrooms.belongsTo(users, { foreignKey: 'userId' });

  // classroom associate student in class
  users.belongsToMany(classrooms, { through: classroomsUsers, foreignKey: 'userId' });
  classrooms.belongsToMany(users, { through: classroomsUsers, foreignKey: 'classroomId' });
  classroomsUsers.belongsTo(users, { foreignKey: 'userId' });
  classroomsUsers.belongsTo(classrooms, { foreignKey: 'classroomId' });

  // classroom associate tests
  classrooms.hasMany(tests, { foreignKey: 'classroomId' });
  tests.belongsTo(classrooms, { foreignKey: 'classroomId' });

  // users associate tests => results
  tests.belongsToMany(users, {
    through: results,
    foreignKey: 'testId'
  });
  users.belongsToMany(tests, {
    through: results,
    foreignKey: 'userId'
  });
  results.belongsTo(tests, { foreignKey: 'testId' });
  results.belongsTo(users, { foreignKey: 'userId' });

  // user associate role
  roles.hasOne(users, { foreignKey: 'roleId' });
  users.belongsTo(roles, { foreignKey: 'roleId' });

  roles.belongsToMany(_objects, {
    through: permissions,
    foreignKey: 'roleId'
  });
  _objects.belongsToMany(roles, {
    through: permissions,
    foreignKey: '_objectId'
  });
  permissions.belongsTo(roles, { foreignKey: 'roleId' });
  permissions.belongsTo(_objects, {foreignKey: '_objectId' });
};
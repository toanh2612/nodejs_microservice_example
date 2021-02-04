export default (sequelize, dataTypes) => {
  return sequelize.define('classroomsUsers', {
    id: {
      type: dataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      field: 'id'
    },
    userId: {
      type: dataTypes.BIGINT,
      allowNull: false,
      field: 'user_id'
    },
    classroomId: {
      type: dataTypes.BIGINT,
      allowNull: false,
      field: 'classroom_id'
    }
  }, {
    freezeTableName: true,
    tableName: 'classrooms_users',
    timestamps: false
  });
};
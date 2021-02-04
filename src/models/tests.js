export default (sequelize, dataTypes) => {
  return sequelize.define('tests', {
    id: {
      type: dataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      field: 'id'
    },
    data: {
      type: dataTypes.JSON,
      allowNull: false,
      field: 'data'
    },
    classroomId: {
      type: dataTypes.BIGINT,
      allowNull: false,
      field: 'classroomId'
    },
    path: {
      type: dataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    },
    startTime: {
      type: 'TIMESTAMP',
      allowNull: false,
      field: 'start_time'
    },
    endTime: {
      type: 'TIMESTAMP',
      allowNull: false,
      field: 'end_time'
    }
  }, {
    freezeTableName: true,
    tableName: 'tests',
    timestamps: false
  });
};
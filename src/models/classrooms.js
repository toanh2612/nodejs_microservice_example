export default (sequelize, dataTypes) => {
  return sequelize.define('classrooms', {
    id: {
      type: dataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      field: 'id'
    },
    name: {
      type: dataTypes.STRING(16),
      allowNull: false,
      field: 'name'
    },
    description: {
      type: dataTypes.STRING(200),
      allowNull: true,
      field: 'description'
    },
    code: {
      type: dataTypes.STRING(16),
      allowNull: false,
      unique: true,
      field: 'code'
    },
    userId: {
      type: dataTypes.BIGINT,
      allowNull: true,
      field: 'user_id'
    }
  }, {
    freezeTableName: true,
    tableName: 'classrooms',
    timestamps: false
  });
};
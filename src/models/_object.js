export default (sequelize, dataTypes) => {
  return sequelize.define('_objects', {
    id: {
      type: dataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      field: 'id'
    },
    name: {
      type: dataTypes.STRING(16),
      unique: true,
      allowNull: false,
      validate: {
        is: /[a-z]/g
      },
      field: 'name'
    },
    fields: {
      type: dataTypes.JSON,
      allowNull: true,
      field: 'fields'
    }
  }, {
    freezeTableName: true,
    tableName: '_objects',
    timestamps: false
  });
};
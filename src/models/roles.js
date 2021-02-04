export default (sequelize, dataTypes) => {
  return sequelize.define('roles', {
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
    description: {
      type: dataTypes.STRING(64),
      allowNull: true,
      field: 'description'
    }
  }, {
    freezeTableName: true,
    tableName: 'roles',
    timestamps: false
  });
};
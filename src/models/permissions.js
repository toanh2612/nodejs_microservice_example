export default (sequelize, dataTypes) => {
  return sequelize.define('permissions', {
    id: {
      type: dataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      field: 'id'
    },
    roleId: {
      type: dataTypes.BIGINT,
      allowNull: false,
      field: 'role_id'
    },
    _objectId: {
      type: dataTypes.BIGINT,
      allowNull: false,
      field: '_object_id'
    },
    _create: {
      type: dataTypes.BOOLEAN,
      allowNull: true,
      field: '_create'
    },
    _read: {
      type: dataTypes.BOOLEAN,
      allowNull: true,
      field: '_read'
    },
    _update: {
      type: dataTypes.BOOLEAN,
      allowNull: true,
      field: '_update'
    },
    _delete: {
      type: dataTypes.BOOLEAN,
      allowNull: true,
      field: '_delete'
    }
  }, {
    freezeTableName: true,
    tableName: 'permissions',
    timestamps: false
  });
};
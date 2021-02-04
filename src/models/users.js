import bcrypt from 'bcrypt';
import CONFIG from '../config';

export default (sequelize, dataTypes) => {
  return sequelize.define('users', {
    id: {
      type: dataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      field: 'id'
    },
    username: {
      type: dataTypes.BIGINT,
      unique: true,
      allowNull: false,
      validate: {
        is: /[a-z0-9_]/g
      },
      field: 'username'
    },
    password: {
      type: dataTypes.STRING(255),
      allowNull: false,
      field: 'password'
    },
    name: {
      type: dataTypes.STRING(50),
      allowNull: false,
      field: 'name'
    },
    phone: {
      type: dataTypes.STRING(15),
      allowNull: true,
      unique: true,
      field: 'phone'
    },
    email: {
      type: dataTypes.STRING(50),
      allowNull: true,
      unique: true,
      field: 'email'
    },
    status: {
      type: dataTypes.BOOLEAN,
      defaultValue: true,
      field: 'status'
    },
    roleId: {
      type: dataTypes.BIGINT,
      allowNull: false,
      field: 'role_id'
    },
    createdAt: {
      type: 'TIMESTAMP',
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      field: 'created_at'
    },
    updatedAt: {
      type: 'TIMESTAMP',
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      field: 'updated_at'
    }
  }, {
    // freezeTableName: true,
    tableName: 'users',
    hooks: {
      beforeSave: async (user, options) => {
          return bcrypt.hash(user.password, parseInt(CONFIG.SALT_ROUNDS)).then(function (hash) {
            user.password = hash;
          }).catch(error => {
            throw new Error(error);
          });
      }
    }
  });
};
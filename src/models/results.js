export default (sequelize, dataTypes) => {
  return sequelize.define('results', {
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
    testId: {
      type: dataTypes.BIGINT,
      allowNull: false,
      field: 'test_id'
    },
    data: {
      type: dataTypes.JSON,
      allowNull: false,
      field: 'data'
    },
    createAt: {
      type: 'TIMESTAMP',
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
      type: 'TIMESTAMP',
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    dateCreated: {
      type: dataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    freezeTableName: true,
    tableName: 'results',
    timestamps: true
  });
};
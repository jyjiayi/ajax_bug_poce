export default function bugModel(Sequelize, DataTypes) {
  return Sequelize.define('bug', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    problem: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    error_text: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    commit: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    feature_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'features',
        key: 'id',
      },
    },
    user_id: {
      allowNull: false,
      type: DataTypes.STRING,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    created_at: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updated_at: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  }, { underscored: true });
}

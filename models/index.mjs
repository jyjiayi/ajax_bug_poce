import { Sequelize } from 'sequelize';
import allConfig from '../config/config.js';
import bugModel from './bug.mjs';
import featureModel from './feature.mjs';
import userModel from './user.mjs';

const env = process.env.NODE_ENV || 'development';

const config = allConfig[env];

const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

// add your model definitions to db here
db.Bug = bugModel(sequelize, Sequelize.DataTypes);
db.Feature = featureModel(sequelize, Sequelize.DataTypes);
db.User = userModel(sequelize, Sequelize.DataTypes);

db.Bug.belongsTo(db.Feature);
db.Feature.hasMany(db.Bug);

db.Bug.belongsTo(db.User);
db.User.hasMany(db.Bug);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;

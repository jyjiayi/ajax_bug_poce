import db from './models/index.mjs';

db.Feature.findAll()
  .then((items) => console.log(items))
  .catch((error) => console.log(error));

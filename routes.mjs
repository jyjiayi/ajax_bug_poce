import db from './models/index.mjs';

// import your controllers here
import initFeaturesController from './controllers/features.mjs';
import initBugsController from './controllers/bugs.mjs';

export default function bindRoutes(app) {
  // initialize the controller functions here
  // pass in the db for all callbacks
  const FeatureController = initFeaturesController(db);
  const BugController = initBugsController(db);
  // define your route matchers here using app
  app.get('/', BugController.index);
  app.get('/features', FeatureController.allFeatures);
  app.get('/bugs', BugController.allBugs);
  app.post('/createBug', BugController.insertBug);
  app.post('/createFeature', FeatureController.insertFeature);
}

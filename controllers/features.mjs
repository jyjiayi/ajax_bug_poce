export default function initFeaturesController(db) {
  const allFeatures = async (req, res) => {
    try {
      const features = await db.Feature.findAll();
      res.send({ features });
    }
    catch (error) {
      console.log(error);
    }
  };

  const insertFeature = async (req, res) => {
    try {
      const feature = await db.Feature.create({
        name: req.body.feature,
        created_at: new Date(),
        updated_at: new Date(),
      });
      console.log('feature :>> ', feature);
      res.send({ feature });
    } catch (error) {
      console.log(error);
    }
  };

  return { allFeatures, insertFeature };
}

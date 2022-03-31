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
  return { allFeatures };
}

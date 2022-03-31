export default function initBugsController(db) {
  const index = async (req, res) => {
    res.render('main');
  };

  const allBugs = async (req, res) => {
    try {
      const bugs = await db.Bug.findAll({
        include: db.Feature,
      });
      res.send({ bugs });
    }
    catch (error) {
      console.log(error);
    }
  };

  const insertBug = async (req, res) => {
    console.log('req.body :>> ', req.body);
    try {
      const bug = await db.Bug.create({
        problem: req.body.problem,
        error_text: req.body.errorText,
        commit: req.body.commit,
        feature_id: req.body.featureId,
        created_at: new Date(),
        updated_at: new Date(),
      });
      console.log('bug :>> ', bug);
      res.send({ bug });
    }
    catch (error) {
      console.log(error);
    }
  };

  return { index, allBugs, insertBug };
}

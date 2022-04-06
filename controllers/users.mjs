import jsSHA from 'jssha';

export default function initUsersController(db) {
  const findUser = async (req, res) => {
    try {
      const user = await db.User.findOne({
        where: {
          email: req.body.email,
        },
      });
      console.log('user :>> ', user);

      const userPassword = req.body.password;
      const shaObj = new jsSHA('SHA-512', 'TEXT', { encoding: 'UTF8' });
      shaObj.update(userPassword);
      const hashedPassword = shaObj.getHash('HEX');

      console.log('userPassword in table :>> ', user.password);
      console.log('hashedPassword entered:>> ', hashedPassword);

      if (hashedPassword === user.password) {
        res.cookie('loggedIn', true);
        res.cookie('userId', user.id);
        res.send({ user });
      } else {
        res.send('Login failed!');
      }
    }
    catch (error) {
      console.log(error);
    }
  };

  const insertUser = async (req, res) => {
    try {
      const userPassword = req.body.password;
      const shaObj = new jsSHA('SHA-512', 'TEXT', { encoding: 'UTF8' });
      shaObj.update(userPassword);
      const hashedPassword = shaObj.getHash('HEX');

      const user = await db.User.create({
        email: req.body.email,
        password: hashedPassword,
        created_at: new Date(),
        updated_at: new Date(),
      });
      console.log('user :>> ', user);
      res.send({ user });
    } catch (error) {
      console.log(error);
    }
  };

  const dashboard = async (req, res) => {
    try {
      const user = await db.User.findOne({
        where: {
          id: req.cookies.userId,
        },
      });
      console.log('user :>> ', user);
      res.send({ user });
    } catch (error) {
      console.log(error);
    }
  };
  return { findUser, insertUser, dashboard };
}

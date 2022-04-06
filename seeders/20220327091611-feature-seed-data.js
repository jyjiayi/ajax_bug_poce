const jsSHA = require('jssha');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('features', [{
      name: 'navbar',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'notifications',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'search engine',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'payments',
      created_at: new Date(),
      updated_at: new Date(),
    },
    ]);

    // for users table

    // random user password
    const userPassword = 'qwerty';
    const shaObj = new jsSHA('SHA-512', 'TEXT', { encoding: 'UTF8' });
    shaObj.update(userPassword);
    const hashedPassword = shaObj.getHash('HEX');

    const userList = [
      {
        email: 'testemail@gmail.com',
        password: hashedPassword,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    const users = await queryInterface.bulkInsert('users', userList, { returning: true });

    // for bugs table
    const bugsList = [
      {
        problem: 'cannot connect',
        error_text: 'Connection Refused by Host',
        commit: '345f455',
        feature_id: 1,
        user_id: users[0].id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        problem: 'cannot access page',
        error_text: '404 Not Found',
        commit: '345j34u',
        feature_id: 3,
        user_id: users[0].id,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    await queryInterface.bulkInsert('bugs', bugsList);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('features', null, {});
    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.bulkDelete('bugs', null, {});
  },
};

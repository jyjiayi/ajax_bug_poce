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
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('features', null, {});
  },
};

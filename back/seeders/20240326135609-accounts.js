'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('accounts', [
      {
        name: "Sugiarto Supratman",
        username: "sugiarto",
        email: "sugiarto@gmail.com",
        password: "$2b$10$wJHaH9lKl0Mt.7SK/YpeYexSRGLx8PycEpLbGiYcsaE2wQ4mNOQzK",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Sucipto Supratman",
        username: "sucipto",
        email: "sucipto@gmail.com",
        password: "$2b$10$wJHaH9lKl0Mt.7SK/YpeYexSRGLx8PycEpLbGiYcsaE2wQ4mNOQzK",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Supratno Supratman",
        username: "supratno",
        email: "supratno@gmail.com",
        password: "$2b$10$wJHaH9lKl0Mt.7SK/YpeYexSRGLx8PycEpLbGiYcsaE2wQ4mNOQzK",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};

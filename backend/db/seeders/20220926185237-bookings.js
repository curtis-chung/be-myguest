'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert("Bookings", [
      {
        spotId: 1,
        userId: 4,
        startDate: "2023-01-01",
        endDate: "2023-01-10",
      },
      {
        spotId: 1,
        userId: 5,
        startDate: "2023-01-11",
        endDate: "2023-01-21",
      },
      {
        spotId: 2,
        userId: 4,
        startDate: "2023-02-01",
        endDate: "2023-02-10",
      },
      {
        spotId: 2,
        userId: 5,
        startDate: "2023-02-11",
        endDate: "2023-02-21",
      },
      {
        spotId: 3,
        userId: 4,
        startDate: "2023-03-01",
        endDate: "2023-03-10",
      },
      {
        spotId: 3,
        userId: 5,
        startDate: "2023-03-11",
        endDate: "2023-03-21",
      },
      {
        spotId: 4,
        userId: 4,
        startDate: "2023-04-01",
        endDate: "2023-04-10",
      },
      {
        spotId: 4,
        userId: 5,
        startDate: "2023-04-11",
        endDate: "2023-04-21",
      },
      {
        spotId: 5,
        userId: 4,
        startDate: "2023-05-01",
        endDate: "2023-05-10",
      },
      {
        spotId: 5,
        userId: 5,
        startDate: "2023-05-11",
        endDate: "2023-05-21",
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("Bookings", null, {});
  }
};

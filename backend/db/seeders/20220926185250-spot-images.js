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
    return queryInterface.bulkInsert("SpotImages", [
      {
        spotId: 1,
        url: "spot1 url1",
        preview: true
      },
      {
        spotId: 2,
        url: "spot2 url1",
        preview: true
      },
      {
        spotId: 3,
        url: "spot3 url1",
        preview: true
      },
      {
        spotId: 4,
        url: "spot4 url1",
        preview: true
      },
      {
        spotId: 5,
        url: "spot5 url1",
        preview: true
      },
      {
        spotId: 1,
        url: "spot1 url2",
        preview: false
      },
      {
        spotId: 2,
        url: "spot2 url2",
        preview: false
      },
      {
        spotId: 3,
        url: "spot3 url2",
        preview: false
      },
      {
        spotId: 4,
        url: "spot4 url2",
        preview: false
      },
      {
        spotId: 5,
        url: "spot5 url2",
        preview: true
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
    return queryInterface.bulkDelete("SpotImages", null, {});
  }
};

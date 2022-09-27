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
    return queryInterface.bulkInsert("ReviewImages", [
      {
        reviewId: 1,
        url: "review1 url",
      },
      {
        reviewId: 2,
        url: "review2 url",
      },
      {
        reviewId: 3,
        url: "review3 url",
      },
      {
        reviewId: 4,
        url: "review4 url",
      },
      {
        reviewId: 5,
        url: "review5 url",
      },
      {
        reviewId: 6,
        url: "review6 url",
      },
      {
        reviewId: 7,
        url: "review7 url",
      },
      {
        reviewId: 8,
        url: "review8 url",
      },
      {
        reviewId: 9,
        url: "review9 url",
      },
      {
        reviewId: 10,
        url: "review10 url",
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
    return queryInterface.bulkDelete("ReviewImages", null, {})
  }
};

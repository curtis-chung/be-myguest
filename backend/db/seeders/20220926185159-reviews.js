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
    return queryInterface.bulkInsert("Reviews", [
      {
        spotId: 1,
        userId: 2,
        review: "A lot of awesome cafes and breweries around the area.",
        stars: 5,
      },
      {
        spotId: 1,
        userId: 3,
        review: "Great time staying here!",
        stars: 4,
      },
      {
        spotId: 2,
        userId: 2,
        review: "Smaller than we expected.",
        stars: 3,
      },
      {
        spotId: 2,
        userId: 3,
        review: "Too expensive. Most of the furniture were from Ikea.",
        stars: 2,
      },
      {
        spotId: 3,
        userId: 2,
        review: "The place was clean and comfortable with a very fun vibe. The location was pretty perfect, most of Williamsburg was easily walkable. Street parking was easy to find. Overall no complaints.",
        stars: 4,
      },
      {
        spotId: 3,
        userId: 3,
        review: "The house is amazing, the amenities are key and the digital technology in the house is wonderful. Lots of room, huge kitchen and comfortable beds. Extremely clean and we loved it - looking to see if it's available next time we're in the city!",
        stars: 5,
      },
      {
        spotId: 4,
        userId: 1,
        review: "Great time staying here. Worst part was finding a parking spot. But that's NYC for you. Everything else was perfect and all you could ask for in Midtown.",
        stars: 4,
      },
      {
        spotId: 4,
        userId: 3,
        review: "Don't expect anything fancy as the place is not very new but for the location it's good value.",
        stars: 2,
      },
      {
        spotId: 5,
        userId: 1,
        review: "The views from this apartment are stunning! Amazing views of the city and the river! The apartment is very comfortable. It is a little bit of a walk to the nearest subway, but not too bad. Overall, a great stay!",
        stars: 5,
      },
      {
        spotId: 5,
        userId: 3,
        review: "Location was perfect for our weekend in the city. We're used to living downtown so the noise wasn't too much for us and we still got great nights of sleep!",
        stars: 4,
      }
    ], {})
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("Reviews", null, {});
  }
};

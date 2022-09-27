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
    return queryInterface.bulkInsert("Spots", [
      {
        ownerId: 1,
        address: "186 Huron Street",
        city: "Brooklyn",
        state: "New York",
        country: "United States of America",
        lat: 40.73300994697912,
        lng: -73.95382807237672,
        name: "Condo in Greenpoint",
        description: "Designed with the character and history of Greenpoint in mind",
        price: 2100
      },
      {
        ownerId: 1,
        address: "3 Court Square",
        city: "Long Island City",
        state: "New York",
        country: "United States of America",
        lat: 40.74806542421029,
        lng: -73.94441112819383,
        name: "Condo in Hunters Point",
        description: "A breathtaking Penthouse perched above the East River and overlooking the Manhattan skyline",
        price: 2975
      },
      {
        ownerId: 1,
        address: "30 Front Street",
        city: "Brooklyn",
        state: "New York",
        country: "United States of America",
        lat: 40.702567484846035,
        lng: -73.991376901214,
        name: "Condo in DUMBO",
        description: "Rising tall from the heart of historic Dumbo, Olympia offers expansive views of the sun-drenched harbor and Lower Manhattan skyline",
        price: 3000
      },
      {
        ownerId: 2,
        address: "146 West 57th Street",
        city: "New York",
        state: "New York",
        country: "United States of America",
        lat: 40.76505185047517,
        lng: -73.9792624435398,
        name: "Condo in Midtown",
        description: "Located high above New York City on the 59th floor, this unit offers specular views of New York City and Central Park while located on Billionaire's Row",
        price: 2550
      },
      {
        ownerId: 2,
        address: "15 Hudson Yards",
        city: "New York",
        state: "New York",
        country: "United States of America",
        lat: 40.753752953512674,
        lng: -74.00333700121327,
        name: "Condo in Hudson Yards",
        description: "Fifteen Hudson Yards occupies a prime position on the Public Square and Gardens at the center of Hudson Yards",
        price: 2995
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("Spots", null, {});
  }
};

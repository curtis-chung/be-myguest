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
        country: "United States",
        lat: 40.7330099,
        lng: -73.9538280,
        name: "Condo in Greenpoint",
        description: "Designed with the character and history of Greenpoint in mind",
        price: 2100
      },
      {
        ownerId: 1,
        address: "3 Court Square",
        city: "Long Island City",
        state: "New York",
        country: "United States",
        lat: 40.7480654,
        lng: -73.9444111,
        name: "Condo in Hunters Point",
        description: "A breathtaking Penthouse perched above the East River and overlooking the Manhattan skyline",
        price: 2975
      },
      {
        ownerId: 1,
        address: "30 Front Street",
        city: "Brooklyn",
        state: "New York",
        country: "United States",
        lat: 40.7025674,
        lng: -73.9913769,
        name: "Condo in DUMBO",
        description: "Rising tall from the heart of historic Dumbo, Olympia offers expansive views of the sun-drenched harbor and Lower Manhattan skyline",
        price: 3000
      },
      {
        ownerId: 2,
        address: "146 West 57th Street",
        city: "New York",
        state: "New York",
        country: "United States",
        lat: 40.7650518,
        lng: -73.9792624,
        name: "Condo in Midtown",
        description: "Located high above New York City on the 59th floor, this unit offers specular views of New York City and Central Park while located on Billionaire's Row",
        price: 2550
      },
      {
        ownerId: 2,
        address: "15 Hudson Yards",
        city: "New York",
        state: "New York",
        country: "United States",
        lat: 40.7537529,
        lng: -74.0033370,
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

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
      {
        ownerId: 2,
        address: "138 E 50th St",
        city: "New York",
        state: "New York",
        country: "United States",
        lat: 40.756171120247444,
        lng: -73.97176462960047,
        name: "The Centrale",
        description: "Stunning with triple exposures facing North, East, and South, this 1,190 square foot corner one bedroom, one and half bathroom residence",
        price: 2795
      },
      {
        ownerId: 2,
        address: "15 Hudson Yards",
        city: "New York",
        state: "New York",
        country: "United States",
        lat: 40.753752953511835,
        lng: -74.0033048142566,
        name: "Fifteen Hudson Yards",
        description: "Prime southwest corner penthouse",
        price: 12775
      },
      {
        ownerId: 2,
        address: "130 Furman St",
        city: "Brooklyn",
        state: "New York",
        country: "United States",
        lat: 40.70086872301576,
        lng: -73.99630657192887,
        name: "Condo in Brooklyn Heights",
        description: "Enjoy townhouse-style living and 1,118 square feet of private outdoor space within the highly regarded Pierhouse at Brooklyn Bridge Park",
        price: 7150
      },
      {
        ownerId: 2,
        address: "252 South St",
        city: "New York",
        state: "New York",
        country: "United States",
        lat: 40.71011146744696,
        lng: -73.99127668356905,
        name: "One Manhattan Square",
        description: "Perfectly situated along the Lower East Side Waterfront, this 800-foot-tall striking glass tower that feature epic river and skyline views",
        price: 2522
      }
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

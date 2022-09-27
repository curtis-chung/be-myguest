'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        firstName: "Guinness",
        lastName: "Draught",
        email: 'demo@user.io',
        username: 'Guinness-Draught',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: "Modelo",
        lastName: "Especial",
        email: 'user1@user.io',
        username: 'Modelo-Especial',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        firstName: "Allagash",
        lastName: "White",
        email: 'user2@user.io',
        username: 'Allagash-White',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        firstName: "Stella",
        lastName: "Artois",
        email: 'user3@user.io',
        username: 'Stella-Artois',
        hashedPassword: bcrypt.hashSync('password4')
      },
      {
        firstName: "Blue",
        lastName: "Moon",
        email: 'user4@user.io',
        username: 'Blue-Moon',
        hashedPassword: bcrypt.hashSync('password5')
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Guinness-Draught', 'Modelo-Especial', 'Allagash-White', 'Stella-Artois', 'Blue-Moon'] }
    }, {});
  }
};

import { QueryInterface, Sequelize } from "sequelize";

module.exports = {

  async up (queryInterface: QueryInterface ) {
    await queryInterface.sequelize.query(`
      ALTER TABLE hotels
      ADD COLUMN ratings DECIMAL (3, 2) DEFAULT NULL,
      ADD COLUMN rating_count INT DEFAULT NULL  
      `);
  },

  async down (queryInterface: QueryInterface) {
    await queryInterface.sequelize.query(`
      ALTER TABLE hotels
      DROP COLUMN ratings,
      DROP COLUMN rating_count      
      `);
  }
};

'use strict';

import { QueryInterface } from "sequelize";

module.exports = {
  async up (queryInterface: QueryInterface) {
    await queryInterface.sequelize.query(
      `CREATE TABLE IF NOT EXISTS hotels(
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(225) NOT NULL,
        address VARCHAR(225) NOT NULL,
        city VARCHAR(225) NOT NULL,
        location VARCHAR(225) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );`
    )
  
  },

  async down (queryInterface: QueryInterface) {
    await queryInterface.sequelize.query(
      `DROP TABLE IF EXISTS hotels`
    )
  }
};

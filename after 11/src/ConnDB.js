import {Sequelize} from "sequelize"

export const sequelize = new Sequelize('basePrueba2', 'root', '123', {
    host: 'localhost',
    dialect: "mysql", port:"3306",
    // logging:false
  });

  try {
    await sequelize.authenticate();
    console.log('db conectada');
  } catch (error) {
    console.error('error al conectar a la db:', error.message);
  }

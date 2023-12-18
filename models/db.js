import Sequelize from 'sequelize';

//Configuração do Sequilize
const sequelize = new Sequelize('dreams07_clubevemjogar', 'dreams07_clubevemjogar', '2023VJClube', {
    host: 'dreamsoftwares.info',
    dialect: 'mysql'
  });

export default sequelize  


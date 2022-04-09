const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("diet", {  
    id_diet: {
        type: DataTypes.INTEGER,
    },
    name: {
        type: DataTypes.STRING,
        primaryKey: true
    }
  },
  {
    createdAt: false,
    updatedAt: false
  });
};
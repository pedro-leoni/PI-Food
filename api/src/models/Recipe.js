const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("recipe", {
    id_recipe: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    resume: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    rate: {
      type: DataTypes.FLOAT,
    },
    healthy_level: {
      type: DataTypes.FLOAT,
    },
    instructions: {
      type: DataTypes.TEXT,
    },
  },
  {
    createdAt: false,
    updatedAt: false
  });
};

const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("recipe", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
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
    createdInDb: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false
    }
  },
  {
    createdAt: false,
    updatedAt: false
  });
};

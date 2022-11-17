const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    hp: {
      type: DataTypes.INTEGER
    },
    attack: {
      type: DataTypes.INTEGER
    },
    defense: {
      type: DataTypes.INTEGER
    },
    speed: {
      type: DataTypes.INTEGER
    },
    height: {
      type: DataTypes.INTEGER
    },
    weight: {
      type: DataTypes.INTEGER
    },
    img: {
      type: DataTypes.TEXT,
      defaultValue: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Pokebola-pokeball-png-0.png/481px-Pokebola-pokeball-png-0.png",
    },
    createdDB: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    }
  },

  {timestamps: false}

  );
};

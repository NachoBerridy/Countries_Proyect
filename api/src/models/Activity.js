const { DataTypes } = require('sequelize');
//const country = require('./country.js'); 

const activity = (sequelize) => {
  sequelize.define('activity', {
    Id:{
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    name:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    difficulty:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    duration:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    season: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    like:{
      type: DataTypes.INTEGER,
      allowNull:true,
    },
    image:{
      type: DataTypes.STRING,
      allowNull: false,
    }
  });

};


module.exports = activity;
'use strict';
module.exports = (sequelize, DataTypes) => {
  const flight = sequelize.define('flight', {
    flight_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    starting_location: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    destination: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    flight_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    seats: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    taken_seats: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
  }, {

    underscored: true,
    timestamps: true,
    freezeTableName: true,
    tableName: "flights"
  });
  flight.associate = function(models) {
    // associations can be defined here
   // flight.hasMany(models.reservation);

  };
  return flight;
};
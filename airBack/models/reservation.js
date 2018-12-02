'use strict';
module.exports = (sequelize, DataTypes) => {
  const reservation = sequelize.define('reservation', {
    res_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    seat: {
      type: DataTypes.UUID,
      allowNull: false
    },
    flight_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
  },{

    underscored: true,
    timestamps: true,
    freezeTableName: true,
    tableName: "reservations"
  });
  reservation.associate = function(models) {
    // associations can be defined here
   // reservation.belongsTo(models.flight);
  };
  return reservation;
};
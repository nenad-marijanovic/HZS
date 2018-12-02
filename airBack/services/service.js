'use strict';

require('express');

async function getFlights() {
    try {

      const Flights = await db.flights.findAll({});
      return Flights;
    } catch (err) {
        return err;
    }
  }
  
async function getFlight(idFlight) {
    try {

      const Flight = await db.flights.findOne({
        where: {
          id: idFlight
        }
      });
      return Flight;
    } catch (err) {
        return err;
    }
  }

async function getFreeSpaces(id) {
    try {

      const flight = await db.flights.findOne({
        where: {
          id: id
        }
      });

      const reservations= await db.reservations.findAll({
          where:{
            flight_id: id
          }
      });
      var result= flight['seats']-reservations['reservation'].count;
      return result;
    } catch (err) {
        return err;
    }
}

async function reserveFlight(flightId){
  try{
    const flight=db.flight.findOne({
      where:{
        id:flightId
      }
    });
  const reservation= db.reservations.create(
  {
    'flight_id':flightId,
  });
    var seats=flight['taken_seats'];
    seats++;
    flight['taken_seats']=seats;
    flight.save();
    var res={
      'res_id': reservation['res_id'],
      'seat:': reservation['seat'],
      'filght_id': flightId,
      'starting_location': flight['starting_location'],
      'destination': flight['destination']
    }
    return res;
  }
  catch(error){
    return error;
  }
}

module.exports={
  getFlights,
  getFlight,
  getFreeSpaces,
  reserveFlight
}
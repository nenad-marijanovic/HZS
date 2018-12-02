'use strict';
const cors = require("cors");
const express= require('express');
var router = express.Router();
const services= require('../services/service');



/*router.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
    );
    next();
  });*/
  router.get('/flights', (req, res) => {
    try{
    var flights=services.getFlights();
    res.send(flights)
    .end();
    }
    catch(err){
        res.send(err);
    }
  });
router.get('/flights/:id',(req,res)=>{

    var id=req.query.id;
    try{
        var flight= services.getFlight(id);
        res.send(flight).end();
    }
    catch(err){
        res.send(err);
    }

  });
  
  router.post('/reservations',(req, res)=>{
    var id=1;
    try{
        var reservation=services.reserveFlight(id);
        res.send(reservation).end();
    }catch(e){
        res.send(e);
    }
  });



module.exports=router;

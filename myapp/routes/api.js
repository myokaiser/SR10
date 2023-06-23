var express = require('express');
var multer = require('multer');  
var router = express.Router();
var offresModel = require('../model/offres');
var db = require('../model/db.js');

router.get("/offres", function(req, res, next) {
    result=offresModel.readall(function(result){
        res.status(200).json(result);
        });
  });

  router.get("/offres/:offreid(\\d+)", function(req, res, next) {
    let offre_id = req.params.offreid;
    result=offresModel.read(offre_id, function(result){
        res.status(200).json(result);
        });
  });

  router.post("/offres", function(req, res, next) {

    let new_offre = {
        organisation : req.body.organisation,
        recruteur : req.body.recruteur,
        titre : req.body.titre,
        statut : req.body.statut,
        descr : req.body.descr,
        lieu : req.body.lieu,
        rythme :req.body.rythme,
        salaire : req.body.salaire,
        type_metier : req.body.type_metier
    }
    

  });

module.exports = router;
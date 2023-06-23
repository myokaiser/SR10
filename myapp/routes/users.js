var express = require('express');
var router = express.Router();
var candidatModel = require('../model/candidat')

/* GET users listing. */
router.get('/userslist', function (req, res, next) {
  result=candidatModel.readall(function(result){
  res.render('usersList', { title: 'Liste des utilisateurs', users:
  result })});
  });

module.exports = router;

var express = require('express');
var router = express.Router();
var candidatModel = require('../model/candidat');
var db = require('../model/db.js');
var crypt = require ('../model/pass.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'WORK SMARTER' });
});

router.get('/login', function(req, res, next) {
  res.render('connexion_form');
});

router.get('/subscribe', function(req, res, next) {
  res.render('subscribe_form');
});

/*router.get('/admin', function(req, res, next) {
  res.render('index_admin_candidatemode');
});*/

/*router.get('/candidat', function(req, res, next) {
    res.render('index_candidate', { title: 'WORK SMARTER' });
});*/

router.get('/userslist', function (req, res, next) {
  result=candidatModel.readall(function(result){
  res.render('usersList', { title: 'List des utilisateurs', users:
  result })});
  });

  //-------------------------------------------------------------------------POST REQUESTS-------------------------------------------------------------------------\\
  router.post('/inscription', function (req, res, next) {
    var prenom = req.body.prenom;
    var nom = req.body.nom;
    var mail = req.body.mail;
    var tel = req.body.tel;
    var mdp = req.body.pwd;
    var cryptMdp;
    crypt.generateHash(mdp, function(hash) {
      //console.log("(crypt.generateHash) - MOT DE PASSE HASH (hash)");
      //console.log(hash);
      cryptMdp = hash;
      //console.log("(crypt.generateHash) - MOT DE PASSE HASH (cryptMdp)");
      //console.log(cryptMdp);
      crypt.comparePassword(mdp, cryptMdp, function(bool) { //test
        console.log("5router.post('/inscription') - (crypt.generateHash) - (crypt.comparePassword) bool : ");
        console.log(bool);
      });

      candidatModel.inscriptionPost([prenom, nom, mail, tel, cryptMdp], function (err, result) {
        if (err) throw err;
        res.redirect('/login');
      });
    });
  });

  /*
  router.post('/inscription', function (req, res, next) {
    var prenom = req.body.prenom;
    var nom = req.body.nom;
    var mail = req.body.mail;
    var tel = req.body.tel;
    var mdp = req.body.pwd;
    var crypte;
    candidatModel.inscriptionPost([prenom, nom, mail, tel, mdp], function (err, result) {
      if (err) throw err;
      res.redirect('/login');
    });
  });
  */

  /*router.post('/connexion', function (req, res, next) {
    var mail = req.body.mail;
    var mdp = req.body.pwd;
    candidatModel.connexionPost(mail, function (err, result) {
      if (err) throw err;
      crypt.comparePassword(mdp, result[0].pwd, function (bool) {
        if (bool == true) {
          if (result.length === 1) {
            var type_recruteur = result[0].est_recruteur; 
            var type_admin = result[0].est_admin;
            var id = result[0].id;
            req.session.userid = id;
            if (type_recruteur === "oui") {
              res.redirect('/recruiter');
            } else if (type_admin === "oui") {
              res.redirect('/admin');
            } else {
              res.redirect('/candidat'); // redirection vers candidat si l'utilisateur n'est ni recruteur, ni admin
            }
          } else {
            res.send('<script>alert("Email ou mot de passe incorrect."); window.location.href="/login";</script>');
          }
        } else {
          res.send('<script>alert("Email ou mot de passe incorrect."); window.location.href="/login";</script>');
        }
      })
    });
  });*/

    router.post('/connexion', function (req, res, next) {
    var mail = req.body.mail;
    var mdp = req.body.pwd;
    candidatModel.connexionPost([mail, mdp], function (err, result) { //on récupère l'utilisateur correspondant au mail donné
      if (err) throw err;
      if (result.length === 0) { 
        res.send('<script>alert("Email ou mot de passe incorrect."); window.location.href="/login";</script>'); 
      } else {
        console.log(result[0].pwd);
        crypt.comparePassword(mdp, result[0].pwd, function (bool){
          console.log("COMPARE PSWD - CONNEXION : bool = ");
          console.log(bool);
          if (bool === true) {
            if (result.length === 1) {
              var type_recruteur = result[0].est_recruteur; 
              var type_admin = result[0].est_admin;
              var id = result[0].id;
              req.session.userid = id;
              if (type_recruteur === "oui") {
                req.session.type = "recruiter";
                res.redirect('/recruiter');
              } else if (type_admin === "oui") {
                req.session.type = "admin";
                res.redirect('/admin');
              } else {
                req.session.type = "candidat";
                res.redirect('/candidat'); // redirection vers candidat si l'utilisateur n'est ni recruteur, ni admin
              }
            } else throw err;
          } else {
            res.send('<script>alert("Email ou mot de passe incorrect."); window.location.href="/login";</script>');
          }
        });
      }
    });
  });

module.exports = router;

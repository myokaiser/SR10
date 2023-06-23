var express = require('express');
var multer = require('multer');  
var router = express.Router();
var offresModel = require('../model/offres');
var candidatModel = require('../model/candidat');
var candidaturesModel = require('../model/candidature');
var organisationModel = require('../model/organisation');
var db = require('../model/db.js');
const paginate = require('express-paginate');


var my_storage = multer.diskStorage({
  destination: function (req, file, cb) { cb(null, 'mesfichiers')},
  filename: function (req, file, cb) {
    db.query("SELECT REPLACE(nom, ' ', '_') as nom, REPLACE(prenom, ' ', '_') as prenom FROM Utilisateur where id = ?", req.session.userid, (err, result) => { 
      if (err) throw err; 
      else console.log(result);
    let offre_id = req.params.offreid;
    let my_extension = file.originalname.slice(file.originalname.lastIndexOf(".")); // on extrait l'extension du nom d'origine du fichier
    cb(null, offre_id + '_' + result[0].nom + '_' + result[0].prenom + '_' + file.fieldname + my_extension); // exemple de format de nommage : login-typedoc.ext
  })}
})

var upload = multer({ storage: my_storage }) 


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index_candidate', { title: 'WORK SMARTER' });
  });

  //-------------------------------------------------------------------------DEVENIR RECRUTEUR-------------------------------------------------------------------------\\
  router.get('/recruiter_form', function(req, res, next) {
    res.render('recruiter_form', { title: 'FORMULAIRE RECRUTEUR'});
  });

  router.get('/recruiter_form/organisations', (req, res) => { // LISTE DEROULANTE 
    organisationModel.readNameValide( function (result) { 
      res.send(result); 
    }); 
  });

  router.get('/ajout_organisation', function(req, res, next) {
    res.render('organisation_register', { title: 'AJOUT ORGANISATION' });
  });

  router.post('/recruiter_request', function (req, res, next) { // AJOUT DE L'ORGANISATION
    var organisation = req.body.organisation;
    organisationModel.readLowerName(organisation, function (result) {
      if (result.length > 0) {
        var orgaid = result[0].SIREN;
        candidatModel.requestUpdate([orgaid, req.session.userid], function (err, result) { if (err) throw err;});
        res.send('<script>alert("Demande envoyée avec succès !"); window.location.href="/candidat";</script>');
        } else {
          res.send('<script>alert("Organisation introuvable."); window.location.href="/candidat/recruiter_form";</script>');
        }
    });
  });

  router.post('/add_organisation_request', function (req, res, next) { // ENREGISTREMENT DE NOUVELLES ORGANISATIONS
    var siren = req.body.siren;
    organisationModel.read(siren, function (result) {
      if (result.length === 0) {
        var nom = req.body.nom;
        var type = req.body.type;
        var adresse = req.body.adresse;
        organisationModel.requestOrga([siren, nom, type, adresse], function (err, result) {
          if (err) throw err;
          res.send('<script>alert("Demande envoyée avec succès, notre équipe se charge de votre organisation !"); window.location.href="/candidat";</script>');
        });
      } else {
        res.send('<script>alert("Votre organisation semble déjà existée, nous allons vous redirigez vers la page de demande pour être recruteur."); window.location.href="/candidat/recruiter_form";</script>');
      }
    });
  });

//-------------------------------------------------------------------------LISTE OFFRES-------------------------------------------------------------------------\\
router.get('/liste_offres', function (req, res, next) {
  order = "asc";
  type = "cdi";
  const limit = req.query.limit || 5;
  const page = parseInt(req.query.page) || 1;
  result = offresModel.readallAndOrgaValidPaginated(page, limit, function(result){
    console.log(result);
    console.log(paginate.getArrayPages(req)(3, result.pageCount, req.query.page));
    res.render('list_offers_candidate', { 
      candidate: result, 
      order: order, 
      type: type,
      pageCount: result.pageCount,
      pages: paginate.getArrayPages(req)(3, result.pageCount, req.query.page),
      req: req,
      paginate: paginate,
      currentPage: parseInt(req.query.page || result.page)
    });
  });
});

router.get('/liste_offres/search', function (req, res, next) { // BARRE DE RECHERCHE
  order = "asc";
  type = "cdi";
  const limit = req.query.limit || 5;
  const page = parseInt(req.query.page) || 1;
  result = offresModel.readKeywordPaginated(req.query.keyword, page, limit, function(result){
    console.log(parseInt(req.query.page) || result.page)
    res.render('list_offers_candidate', { 
      candidate: result, 
      order: order, 
      type: type,
      pageCount: result.pageCount,
      pages: paginate.getArrayPages(req)(3, result.pageCount, req.query.page),
      req: req,
      paginate: paginate, 
      currentPage: parseInt(req.query.page || result.page)
    });
  });
});

router.get('/liste_offres/sort', function (req, res, next) { // FILTRE TEMPOREL
  type = "cdi";
  var order = req.query.order;
  const limit = req.query.limit || 5;
  const page = parseInt(req.query.page) || 1;
  if (order === "asc") {
    result = offresModel.readallAndOrgaValidPaginated(page, limit, function(result){
      res.render('list_offers_candidate', { 
        candidate: result,
        order: order, 
        type: type,
        pageCount: result.pageCount,
        pages: paginate.getArrayPages(req)(3, result.pageCount, req.query.page),
        req: req,
        paginate: paginate,
        currentPage: parseInt(req.query.page || result.page)
    })});
  } else if (order === "desc") {
    result = offresModel.readallAndOrgaValidASCPaginated(page, limit, function(result){
      res.render('list_offers_candidate', { 
        candidate: result,
        order: order, 
        type: type,
        pageCount: result.pageCount,
        pages: paginate.getArrayPages(req)(3, result.pageCount, req.query.page),
        req: req,
        paginate: paginate,
        currentPage: parseInt(req.query.page || result.page)
    })});
  } else {
    // gérer le cas où order n'est pas valide
  }
});

router.get('/liste_offres/type', function (req, res, next) { // FILTRE TYPE DE POSTE
  order = "asc";
  var type = req.query.poste;
  const limit = req.query.limit || 5;
  const page = parseInt(req.query.page) || 1;
    result = offresModel.readFromTypePaginated(type, page, limit, function(result){
    res.render('list_offers_candidate', { 
      candidate: result, 
      order: order, 
      type: type,
      pageCount: result.pageCount,
      pages: paginate.getArrayPages(req)(3, result.pageCount, req.query.page),
      req: req,
      paginate: paginate,
      currentPage: parseInt(req.query.page || result.page)
  })});
});

//-------------------------------------------------------------------------LISTE CANDIDATURE-------------------------------------------------------------------------\\

router.get('/mes_candidatures', function (req, res, next) {
  order = "asc";
  type = "cdi";
  const limit = req.query.limit || 5;
  const page = parseInt(req.query.page) || 1;
  result = candidaturesModel.readallAndOrgaAndOfferByIDPaginated(req.session.userid, page, limit, function(result){
    console.log(result);
    console.log(paginate.getArrayPages(req)(3, result.pageCount, req.query.page));
    res.render('list_candidatures_candidat', { 
      candidate: result, 
      order: order, 
      type: type,
      pageCount: result.pageCount,
      pages: paginate.getArrayPages(req)(3, result.pageCount, req.query.page),
      req: req,
      paginate: paginate,
      currentPage: parseInt(req.query.page || result.page)
    });
  });
});

router.get('/mes_candidatures/search', function (req, res, next) {
  order = "asc";
  type = "cdi";
  const limit = req.query.limit || 5;
  const page = parseInt(req.query.page) || 1;
  result = candidaturesModel.readKeywordByIDPaginated(req.session.userid, req.query.keyword, page, limit, function(result){
    console.log(result);
    console.log(paginate.getArrayPages(req)(3, result.pageCount, req.query.page));
    res.render('list_candidatures_candidat', { 
      candidate: result, 
      order: order, 
      type: type,
      pageCount: result.pageCount,
      pages: paginate.getArrayPages(req)(3, result.pageCount, req.query.page),
      req: req,
      paginate: paginate,
      currentPage: parseInt(req.query.page || result.page)
    });
  });
});

router.get('/mes_candidatures/sort', function (req, res, next) { // FILTRE TEMPOREL
  type = "cdi";
  var order = req.query.order;
  const limit = req.query.limit || 5;
  const page = parseInt(req.query.page) || 1;
  if (order === "asc") {
    result = candidaturesModel.readByOrderDescByIDPaginated(req.session.userid, page, limit, function(result){
      res.render('list_candidatures_candidat', { 
        candidate: result,
        order: order, 
        type: type,
        pageCount: result.pageCount,
        pages: paginate.getArrayPages(req)(3, result.pageCount, req.query.page),
        req: req,
        paginate: paginate,
        currentPage: parseInt(req.query.page || result.page)
    })});
  } else if (order === "desc") {
    result = candidaturesModel.readByOrderByIDPaginated(req.session.userid, page, limit, function(result){
      res.render('list_candidatures_candidat', { 
        candidate: result,
        order: order, 
        type: type,
        pageCount: result.pageCount,
        pages: paginate.getArrayPages(req)(3, result.pageCount, req.query.page),
        req: req,
        paginate: paginate,
        currentPage: parseInt(req.query.page || result.page)
    })});
  } else {
    // gérer le cas où order n'est pas valide
  }
});

router.get('/mes_candidatures/type', function (req, res, next) {
  order = "asc";
  var type = req.query.poste;
  const limit = req.query.limit || 5;
  const page = parseInt(req.query.page) || 1;
  result = candidaturesModel.readFromTypeByIDPaginated(req.session.userid, type, page, limit, function(result){
    console.log(result);
    console.log(paginate.getArrayPages(req)(3, result.pageCount, req.query.page));
    res.render('list_candidatures_candidat', { 
      candidate: result, 
      order: order, 
      type: type,
      pageCount: result.pageCount,
      pages: paginate.getArrayPages(req)(3, result.pageCount, req.query.page),
      req: req,
      paginate: paginate,
      currentPage: parseInt(req.query.page || result.page)
    });
  });
});

//-------------------------------------------------------------------------OFFRE CANDIDATURE-------------------------------------------------------------------------\\

  router.get('/mes_candidatures/details/:offreid(\\d+)/:candidat(\\d+)', function(req, res, next) {
    let offre_id = req.params.offreid;
    let candidat_id = req.params.candidat;
    result = candidaturesModel.readAndOrgaAndOfferFromCandidatAndOffer([offre_id, candidat_id], function(result){
      res.render('candidat_candidature_details', { candidature :
      result})});
  });

  router.get('/liste_offres/details/:offreid(\\d+)', function(req, res, next) {
    let offre_id = req.params.offreid;
    result = offresModel.readAndOrga(offre_id, function(result){
      res.render('candidate_offer_details', { offre:
      result })});
  });

  router.get('/mes_candidatures/details/:offreid(\\d+)/:candidat(\\d+)/getfile', function(req, res, next) {
    try {
      res.download('./mesfichiers/'+req.query.fichier_cible);
    } catch (error) {
      res.send('Une erreur est survenue lors du téléchargement de '+req.query.fichier_cible+' : '+error);
    }
  });
  

  /*------------------------------- DEPOSITE -*/
  
    router.post('/liste_offres/details/:offreid(\\d+)/candidater/upload_files', upload.any() ,function(req, res, next) {
      const uploaded_file = req.files /* il s'agit maintenant d'un tableau donc file -> files */
      req.session.uploaded_files = [];
      if (!uploaded_file) {
        res.render('candidature_documents_deposite');
      } else {
        
        let offre_id = req.params.offreid;
        candidaturesModel.uploadInsert([req.session.userid, offre_id], function (err, result) {
          if (err) throw err;}); /* création de la ligne candidature avec les clefs primaires */
  
        uploaded_file.forEach(file => { /* boucle pour envoi des fichiers */
          console.log(file.originalname,' => ',file.filename); 
          req.session.uploaded_files.push(file.filename);
          candidaturesModel.uploadUpdate([file.fieldname, file.filename, req.session.userid, offre_id], function (err, result) {
            if (err) throw err;}); /* ajout du nom des documents déposés dans le forEach */
        });
        result = offresModel.readAndOrga(offre_id, function(result){
          res.render('candidature_completed_message', { offre:
          result })});
      }
    });
  /*------------------------------- DEPOSITE -*/

  router.get('/liste_offres/details/:offreid(\\d+)/candidater', function(req, res, next) {
    let offre_id = req.params.offreid;
    console.log(offre_id);
    verif = candidaturesModel.readByOfferAndUser([req.session.userid, offre_id], function(verif){
      console.log(verif);
      if(verif.length === 0){
        result = offresModel.readAndOrga(offre_id, function(result){
        res.render('candidature_documents_deposite', { offre:
        result })});
      } else {
        res.send('<script>alert("Oups, la mémoire vous échappe ? Vous avez déjà candidater à cette offre. Nous vous redirigeons vers votre candidature !"); window.location.href="/candidat/mes_candidatures/details/' + offre_id + '/' + req.session.userid + '";</script>');
      }
    });
  });

  router.get('/liste_offres/details/:offreid(\\d+)/candidater/candidature_complete', function(req, res, next) {
    let offre_id = req.params.offreid;
    result = offresModel.readAndOrga(offre_id, function(result){
      res.render('candidature_completed_message', { offre:
      result })});
  });
  
module.exports = router;
var express = require('express');
var multer = require('multer');  
var router = express.Router();
var offresModel = require('../model/offres')
var candidaturesModel = require('../model/candidature');
var candidatModel = require('../model/candidat');
var ajouteModel = require('../model/ajoute');
var editeModel = require('../model/edite');
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

/* MODE CANDIDAT */
router.get('/', function(req, res, next) {
    res.render('index_recruiter_candidatemode', { title: 'WORK SMARTER' });
  });

  router.get('/liste_offres', function (req, res, next) {
    order = "asc";
    type = "cdi";
    const limit = req.query.limit || 5;
    const page = parseInt(req.query.page) || 1;
    result = offresModel.readallAndOrgaValidPaginated(page, limit, function(result){
      console.log(result);
      console.log(paginate.getArrayPages(req)(3, result.pageCount, req.query.page));
      res.render('liste_offres_recruteur_candidatmode', { 
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
      res.render('liste_offres_recruteur_candidatmode', { 
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
        res.render('liste_offres_recruteur_candidatmode', { 
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
        res.render('liste_offres_recruteur_candidatmode', { 
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
      res.render('liste_offres_recruteur_candidatmode', { 
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
  
  router.get('/liste_offres/details/:offreid(\\d+)', function(req, res, next) {
    let offre_id = req.params.offreid;
    result = offresModel.readAndOrga(offre_id, function(result){
      res.render('recruteur_candidatmode_offer_details', { offre:
      result })});
  });
  
  router.get('/liste_offres/details/:offreid(\\d+)/candidater/candidature_complete', function(req, res, next) {
    let offre_id = req.params.offreid;
    result = offresModel.readAndOrga(offre_id, function(result){
      res.render('recruteur_candidatmode_candidature_completed_message', { offre:
      result })});
  });
/*----------------------------------------------------------------------------*/
router.get('/mes_candidatures', function (req, res, next) {
  order = "asc";
  type = "cdi";
  const limit = req.query.limit || 5;
  const page = parseInt(req.query.page) || 1;
  result = candidaturesModel.readallAndOrgaAndOfferByIDPaginated(req.session.userid, page, limit, function(result){
    console.log(result);
    console.log(paginate.getArrayPages(req)(3, result.pageCount, req.query.page));
    res.render('recruteur_candidatmode_liste_candidatures', { 
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
    res.render('recruteur_candidatmode_liste_candidatures', { 
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
      res.render('recruteur_candidatmode_liste_candidatures', { 
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
      res.render('recruteur_candidatmode_liste_candidatures', { 
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
    res.render('recruteur_candidatmode_liste_candidatures', { 
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


/*----------------------------------------------------------------------------*/

  router.get('/mes_candidatures/details/:offreid(\\d+)/:candidat(\\d+)', function(req, res, next) {
    let offre_id = req.params.offreid;
    let candidat_id = req.params.candidat;
    result = candidaturesModel.readAndOrgaAndOfferFromCandidatAndOffer([offre_id, candidat_id], function(result){
      res.render('recruteur_candidatmode_candidature_details', { candidature :
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
      res.render('recruteur_candidatmode_candidature_documents_deposite');
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
        res.render('recruteur_candidatmode_candidature_completed_message', { offre:
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
        res.render('recruteur_candidatmode_candidature_documents_deposite', { offre:
        result })});
      } else {
        res.send('<script>alert("Oups, la mémoire vous échappe ? Vous avez déjà candidater à cette offre. Nous vous redirigeons vers votre candidature !"); window.location.href="/recruiter/mes_candidatures/details/' + offre_id + '/' + req.session.userid + '";</script>');
      }
    });
  });

  router.get('/liste_offres/details/:offreid(\\d+)/candidater/candidature_complete', function(req, res, next) {
    let offre_id = req.params.offreid;
    result = offresModel.readAndOrga(offre_id, function(result){
      res.render('recruteur_candidatmode_candidature_completed_message', { offre:
      result })});
  });


  /* MODE RECRUTEUR */
router.get('/recruitermode', function(req, res, next) {
    res.render('index_recruiter_recruitermode', { title: 'WORK SMARTER' });
  });

router.get('/recruitermode/list_offers', function (req, res, next) {
  order = "asc";
  type = "cdi";
  activity = "publiée";
  const limit = req.query.limit || 5;
  const page = parseInt(req.query.page) || 1;
  result = offresModel.readRecruiterPaginated(req.session.userid, page, limit, function(result){
    console.log(result);
    console.log(paginate.getArrayPages(req)(3, result.pageCount, req.query.page));
    res.render('list_offers_recruiter', { 
      candidate: result, 
      order: order, 
      type: type,
      pageCount: result.pageCount,
      pages: paginate.getArrayPages(req)(3, result.pageCount, req.query.page),
      req: req,
      paginate: paginate,
      activity: activity,
      currentPage: parseInt(req.query.page || result.page)
    });
  });
});

router.get('/recruitermode/list_offers/search', function (req, res, next) {
  order = "asc";
  type = "cdi";
  activity = "publiée";
  const limit = req.query.limit || 5;
  const page = parseInt(req.query.page) || 1;
  result = offresModel.readRecruiterKeywordPaginated([req.session.userid, req.query.keyword], page, limit, function(result){
    console.log(result);
    console.log(paginate.getArrayPages(req)(3, result.pageCount, req.query.page));
    res.render('list_offers_recruiter', { 
      candidate: result, 
      order: order, 
      type: type,
      pageCount: result.pageCount,
      pages: paginate.getArrayPages(req)(3, result.pageCount, req.query.page),
      req: req,
      paginate: paginate,
      activity: activity,
      currentPage: parseInt(req.query.page || result.page)
    });
  });
});

router.get('/recruitermode/list_offers/sort', function (req, res, next) { // FILTRE TEMPOREL
  type = "cdi";
  var order = req.query.order;
  activity = "publiée";
  const limit = req.query.limit || 5;
  const page = parseInt(req.query.page) || 1;
  if (order === "asc") {
    result = offresModel.readRecruiterPaginated(req.session.userid, page, limit, function(result){
      res.render('list_offers_recruiter', { 
        candidate: result, 
        order: order, 
        type: type,
        pageCount: result.pageCount,
        pages: paginate.getArrayPages(req)(3, result.pageCount, req.query.page),
        req: req,
        paginate: paginate,
        activity: activity,
        currentPage: parseInt(req.query.page || result.page)
    })});
  } else if (order === "desc") {
    result = offresModel.readRecruiterASCPaginated(req.session.userid, page, limit, function(result){
      res.render('list_offers_recruiter', { 
        candidate: result, 
        order: order, 
        type: type,
        pageCount: result.pageCount,
        pages: paginate.getArrayPages(req)(3, result.pageCount, req.query.page),
        req: req,
        paginate: paginate,
        activity: activity,
        currentPage: parseInt(req.query.page || result.page)
    })});
  } else {
    // gérer le cas où order n'est pas valide
  }
});

router.get('/recruitermode/list_offers/type', function (req, res, next) {
  order = "asc";
  var type = req.query.poste;
  activity = "publiée";
  const limit = req.query.limit || 5;
  const page = parseInt(req.query.page) || 1;
  result = offresModel.readRecruiterFromTypePaginated([type, req.session.userid], page, limit, function(result){
    console.log(result);
    console.log(paginate.getArrayPages(req)(3, result.pageCount, req.query.page));
    res.render('list_offers_recruiter', { 
      candidate: result, 
      order: order, 
      type: type,
      pageCount: result.pageCount,
      pages: paginate.getArrayPages(req)(3, result.pageCount, req.query.page),
      req: req,
      paginate: paginate,
      activity: activity,
      currentPage: parseInt(req.query.page || result.page)
    });
  });
});

router.get('/recruitermode/list_offers/activity', function (req, res, next) {
  order = "asc";
  type = "cdi";
  var statut = req.query.activity;
  const limit = req.query.limit || 5;
  const page = parseInt(req.query.page) || 1;
  result = offresModel.readRecruiterFromStatutPaginated([statut, req.session.userid], page, limit, function(result){
    console.log(result);
    console.log(paginate.getArrayPages(req)(3, result.pageCount, req.query.page));
    res.render('list_offers_recruiter', { 
      candidate: result, 
      order: order, 
      type: type,
      pageCount: result.pageCount,
      pages: paginate.getArrayPages(req)(3, result.pageCount, req.query.page),
      req: req,
      paginate: paginate,
      activity: statut,
      currentPage: parseInt(req.query.page || result.page)
    });
  });
});

router.get('/recruitermode/offer_deposite', function(req, res, next) {
      res.render('recruteur_recruteurmode_nouvelle_offre', { title: 'WORK SMARTER' });
});

router.get('/recruitermode/list_offers/details/:offreid(\\d+)/modifier', function(req, res, next) {
  let offre_id = req.params.offreid;
  result = offresModel.readAndOrga(offre_id, function(result){
    res.render('recruteur_recruteurmode_offer_modification', { offre:
    result })});
});

router.post('/recruitermode/list_offers/details/:offreid(\\d+)/appliquer', function(req, res, next) {// #TODO MAJ OFFRE
  let offre_id = req.params.offreid;
  const descr = req.body.descr;
  const lieu = req.body.lieu;
  const salaire = req.body.salaire;
  const rythme = req.body.rythme;
  const type_metier = req.body.type_metier;
  liste_attribut = ['descr', 'lieu', 'salaire', 'rythme', 'type_metier'];
  liste_valeur = [descr, lieu, salaire, rythme, type_metier];
  console.log(liste_valeur);
  console.log(liste_attribut);
  for (var i = 0; i < liste_valeur.length; i++) { 
    console.log(liste_valeur[i]); 
    console.log(liste_attribut[i]);
    if (liste_valeur[i] !== ''){
      editeModel.applyInsert([liste_attribut[i], req.session.userid, offre_id, liste_valeur[i]], function (err, result) {
        if (err) throw err;
      });
      offresModel.applyUpdate([liste_attribut[i], liste_valeur[i], offre_id], function (err, result) {
        if (err) throw err;
      });
    }
  };
    res.send('<script>alert("Mise à jour réussite !"); window.location.href="/recruiter/recruitermode/list_offers/details/' + offre_id + '/modifier";</script>');
});

router.get('/recruitermode/list_offers/details/:offreid(\\d+)/supprimer', function(req, res, next) { // #TODO SUPPR OFFRE
  let offre_id = req.params.offreid;
  offresModel.expiredUpdate(offre_id, function (err, result) {
    if (err) throw err;});
    res.send('<script>alert("Mise à jour réussite ! publiée --> expirée"); window.location.href="/recruiter/recruitermode/list_offers/details/' + offre_id + '/modifier";</script>');
});

router.get('/recruitermode/list_offers/details/:offreid(\\d+)', function(req, res, next) {
  let offre_id = req.params.offreid;
  result = offresModel.readAndOrga(offre_id, function(result){
    res.render('recruteur_recruteurmode_offer_details', { offre:
    result })});
});

router.get('/recruitermode/demandes_adhesion', function (req, res, next) {
  const limit = req.query.limit || 5;
  const page = parseInt(req.query.page) || 1;
  result=candidatModel.readallAdhesionRecruteurByOrgaPaginated(req.session.userid, page, limit, function(result){
  res.render('recruteur_recruteurmode_liste_adhesions', { 
    candidate: result, 
    pageCount: result.pageCount,
    pages: paginate.getArrayPages(req)(3, result.pageCount, req.query.page),
    req: req,
    paginate: paginate,
    currentPage: parseInt(req.query.page || result.page),
    demande: result })});
});

//-------------------------------------------------------------------------POST REQUESTS-------------------------------------------------------------------------\\
router.post('/recruitermode/publishoffer', function (req, res, next) {
  var titre = req.body.titre;
  var descr = req.body.descr;
  var type = req.body.type;
  var salaire = req.body.salaire;
  offresModel.postPublishOffer([req.session.userid, titre, descr, type, salaire], function (err, result) {
    if (err) throw err;
    res.redirect('/recruiter/recruitermode/offer_deposite');
  });
});

router.post('/recruitermode/accept', function (req, res, next) { // #TODO REFUSER UN RECRUTEUR
  var id = req.body.id;
  candidatModel.postAcceptUpdate(id, function (err, result) {
    if (err) throw err;
    ajouteModel.postAcceptInsert([req.session.userid, id], function (err, result) {
      if (err) throw err;
    });
    res.redirect('/recruiter/recruitermode/demandes_adhesion');
  });
});

router.post('/recruitermode/refuse', function (req, res, next) { // #TODO ACCEPTER UN RECRUTEUR
  var id = req.body.id;
  candidatModel.postRefuseUpdate(id, function (err, result) {
    if (err) throw err;
    ajouteModel.postRefuseInsert([req.session.userid, id], function (err, result) {
      if (err) throw err;
    });
    res.redirect('/recruiter/recruitermode/demandes_adhesion');
  });
});

module.exports = router;
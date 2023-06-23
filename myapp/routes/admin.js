var express = require('express');
var multer = require('multer');  
var router = express.Router();
var offresModel = require('../model/offres')
var candidaturesModel = require('../model/candidature');
var candidatModel = require('../model/candidat');
var organisationModel = require('../model/organisation');
var controleModel = require('../model/controle');
var modifieModel = require('../model/modifie');
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
    res.render('index_admin_candidatemode', { title: 'WORK SMARTER' });
  });

  router.get('/liste_offres', function (req, res, next) {
    order = "asc";
    type = "cdi";
    const limit = req.query.limit || 5;
    const page = parseInt(req.query.page) || 1;
    result = offresModel.readallAndOrgaValidPaginated(page, limit, function(result){
      console.log(result);
      console.log(paginate.getArrayPages(req)(3, result.pageCount, req.query.page));
      res.render('admin_candidatmode_liste_offres', { 
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
      res.render('admin_candidatmode_liste_offres', { 
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
        res.render('admin_candidatmode_liste_offres', { 
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
        res.render('admin_candidatmode_liste_offres', { 
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
      res.render('admin_candidatmode_liste_offres', { 
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
      res.render('admin_candidatmode_offer_details', { offre:
      result })});
  });

  router.get('/liste_offres/details/:offreid(\\d+)/candidater/candidature_complete', function(req, res, next) {
    let offre_id = req.params.offreid;
    result = offresModel.readAndOrga(offre_id, function(result){
      res.render('admin_candidatmode_candidature_completed_message', { offre:
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
      res.render('admin_candidatmode_liste_candidatures', { 
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
      res.render('admin_candidatmode_liste_candidatures', { 
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
        res.render('admin_candidatmode_liste_candidatures', { 
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
        res.render('admin_candidatmode_liste_candidatures', { 
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
      res.render('admin_candidatmode_liste_candidatures', { 
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

  router.get('/mes_candidatures/details/:offreid(\\d+)/:candidat(\\d+)', function(req, res, next) {
    let offre_id = req.params.offreid;
    let candidat_id = req.params.candidat;
    result = candidaturesModel.readAndOrgaAndOfferFromCandidatAndOffer([offre_id, candidat_id], function(result){
      res.render('admin_candidatmode_candidature_details', { candidature :
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
        res.render('admin_candidatmode_candidature_documents_deposite');
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
          res.render('admin_candidatmode_candidature_completed_message', { offre:
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
        res.render('admin_candidatmode_candidature_documents_deposite', { offre:
        result })});
      } else {
        res.send('<script>alert("Oups, la mémoire vous échappe ? Vous avez déjà candidater à cette offre. Nous vous redirigeons vers votre candidature !"); window.location.href="/admin/mes_candidatures/details/' + offre_id + '/' + req.session.userid + '";</script>');
      }
    });
  });

  router.get('/liste_offres/details/:offreid(\\d+)/candidater/candidature_complete', function(req, res, next) {
    let offre_id = req.params.offreid;
    result = offresModel.readAndOrga(offre_id, function(result){
      res.render('admin_candidatmode_candidature_completed_message', { offre:
      result })});
  });

  /* MODE ADMIN */
router.get('/adminmode', function(req, res, next) {
    res.render('index_admin_adminmode', { title: 'WORK SMARTER' });
  });

  router.get('/adminmode/liste_utilisateurs', function (req, res, next) {
    let statut = 'actif';
    let type = 'recruteur';
    const limit = req.query.limit || 5;
    const page = parseInt(req.query.page) || 1;
    result = candidatModel.readallPaginated(page, limit, function(result){
      console.log(result);
      console.log(paginate.getArrayPages(req)(3, result.pageCount, req.query.page));
      res.render('admin_adminmode_liste_utilisateurs', { 
        visualiser: result,
        activity: statut,
        type: type,
        pageCount: result.pageCount,
        pages: paginate.getArrayPages(req)(3, result.pageCount, req.query.page),
        req: req,
        paginate: paginate,
        currentPage: parseInt(req.query.page || result.page)
      });
    });
  });

  router.get('/adminmode/liste_utilisateurs/search', function (req, res, next) {
    let statut = 'actif';
    let type = 'recruteur';
    const limit = req.query.limit || 5;
    const page = parseInt(req.query.page) || 1;
    result = candidatModel.readKeywordPaginated(req.query.keyword, page, limit, function(result){
      console.log(result);
      console.log(paginate.getArrayPages(req)(3, result.pageCount, req.query.page));
      res.render('admin_adminmode_liste_utilisateurs', { 
        visualiser: result,
        activity: statut,
        type: type,
        pageCount: result.pageCount,
        pages: paginate.getArrayPages(req)(3, result.pageCount, req.query.page),
        req: req,
        paginate: paginate,
        currentPage: parseInt(req.query.page || result.page)
      });
    });
  });

  // router.get('/adminmode/liste_utilisateurs/orga_request', function (req, res, next) { // FILTRE ORGANISATION
  //   var statut = req.query.activity;
  //   var organisation = req.query.organisation;
  //   console.log(organisation);
  //   let type = 'recruteur';
  //     result = candidatModel.readByUserOrga(organisation, function(result){
  //       console.log(result);
  //     res.render('admin_adminmode_liste_utilisateurs', { visualiser :
  //     result, activity: statut, type: type, organisation: organisation})});
  // });

  router.get('/adminmode/liste_utilisateurs/orga_request', function (req, res, next) {
    var statut = req.query.activity;
    var organisation = req.query.organisation;
    let type = 'recruteur';
    const limit = req.query.limit || 5;
    const page = parseInt(req.query.page) || 1;
    result = candidatModel.readByUserOrgaPaginated(organisation, page, limit, function(result){
      console.log(result);
      console.log(paginate.getArrayPages(req)(3, result.pageCount, req.query.page));
      res.render('admin_adminmode_liste_utilisateurs', { 
        visualiser: result,
        activity: statut,
        type: type,
        organisation: organisation,
        pageCount: result.pageCount,
        pages: paginate.getArrayPages(req)(3, result.pageCount, req.query.page),
        req: req,
        paginate: paginate,
        currentPage: parseInt(req.query.page || result.page)
      });
    });
  });

  router.get('/adminmode/organisations', (req, res) => { // LISTE DEROULANTE 
    organisationModel.readname(function (result) { 
      console.log(result);
      res.send(result); 
    }); 
  });


  router.get('/adminmode/liste_utilisateurs/activity', function (req, res, next) {
    var statut = req.query.activity;
    let type = 'recruteur';
    const limit = req.query.limit || 5;
    const page = parseInt(req.query.page) || 1;
    result = candidatModel.readByStatutPaginated(statut, page, limit, function(result){
      console.log(result);
      console.log(paginate.getArrayPages(req)(3, result.pageCount, req.query.page));
      res.render('admin_adminmode_liste_utilisateurs', { 
        visualiser: result,
        activity: statut,
        type: type,
        pageCount: result.pageCount,
        pages: paginate.getArrayPages(req)(3, result.pageCount, req.query.page),
        req: req,
        paginate: paginate,
        currentPage: parseInt(req.query.page || result.page)
      });
    });
  });

  router.get('/adminmode/liste_utilisateurs/type', function (req, res, next) {
    var type = req.query.type;
    let statut = 'actif';
    const limit = req.query.limit || 5;
    const page = parseInt(req.query.page) || 1;
    if (type === "recruteur") {
      result = candidatModel.readByUserStatutPaginated(['oui', 'oui', 'non', 'en_attente'], page, limit, function(result){
      console.log(result);
      console.log(paginate.getArrayPages(req)(3, result.pageCount, req.query.page));
      res.render('admin_adminmode_liste_utilisateurs', { 
        visualiser: result,
        activity: statut,
        type: type,
        pageCount: result.pageCount,
        pages: paginate.getArrayPages(req)(3, result.pageCount, req.query.page),
        req: req,
        paginate: paginate,
        currentPage: parseInt(req.query.page || result.page)
      });
    });
    } else if (type === "admin") {
      result = candidatModel.readByUserStatutPaginated(['non', 'en_attente', 'oui', 'oui'], page, limit,function(result){
        res.render('admin_adminmode_liste_utilisateurs', { 
          visualiser: result,
          activity: statut,
          type: type,
          pageCount: result.pageCount,
          pages: paginate.getArrayPages(req)(3, result.pageCount, req.query.page),
          req: req,
          paginate: paginate,
          currentPage: parseInt(req.query.page || result.page)
        })});
    } else {
      result = candidatModel.readByUserStatutPaginated(['non', 'en_attente', 'non', 'en_attente'], page, limit, function(result){
        res.render('admin_adminmode_liste_utilisateurs', { 
          visualiser: result,
          activity: statut,
          type: type,
          pageCount: result.pageCount,
          pages: paginate.getArrayPages(req)(3, result.pageCount, req.query.page),
          req: req,
          paginate: paginate,
          currentPage: parseInt(req.query.page || result.page)
        })});
    }
  });



  router.get('/adminmode/liste_utilisateurs/details/:candidatid(\\d+)', function(req, res, next) {
    let candidat_id = req.params.candidatid;
    result = candidatModel.read(candidat_id, function(result){
      res.render('admin_adminmode_utilisateur_details', { utilisateur :
      result })});
  });

  router.get('/adminmode/liste_utilisateurs/details/:candidatid(\\d+)/modifier', function(req, res, next) {
    let candidat_id = req.params.candidatid;
    result = candidatModel.read(candidat_id, function(result){
      res.render('admin_adminmode_utilisateur_modification', { utilisateur :
      result })});
  });

  router.post('/adminmode/liste_utilisateurs/details/:candidatid(\\d+)/appliquer', function(req, res, next) {// #TODO MAJ USER
    let candidat_id = req.params.candidatid;
    const mail = req.body.mail;
    const tel = req.body.tel;
    const est_recruteur = req.body.est_recruteur;
    const est_admin = req.body.est_admin;
    const organisation = req.body.organisation;
    liste_attribut = ['mail', 'tel', 'est_recruteur', 'est_admin', 'organisation'];
    liste_valeur = [mail, tel, est_recruteur, est_admin, organisation];
    console.log(liste_valeur);
    console.log(liste_attribut);
    for (var i = 0; i < liste_valeur.length; i++) { 
      console.log(liste_valeur[i]); 
      console.log(liste_attribut[i]);
      if (liste_valeur[i] !== ''){
        modifieModel.applyInsert([liste_attribut[i], req.session.userid, candidat_id, liste_valeur[i]], function (err, result) {
          if (err) throw err;
        });
        candidatModel.applyUpdate([liste_attribut[i], liste_valeur[i], candidat_id], function (err, result) {
          if (err) throw err;
        });
      }
    };
      res.send('<script>alert("Mise à jour réussite !"); window.location.href="/admin/adminmode/liste_utilisateurs/details/' + candidat_id + '/modifier";</script>');
  });

  router.get('/adminmode/liste_utilisateurs/details/:candidatid(\\d+)/supprimer', function(req, res, next) {
    let candidat_id = req.params.candidatid;
    modifieModel.applyInsert(["statut", req.session.userid, candidat_id, "inactif"], function (err, result) {
      if (err) throw err;
      candidatModel.supprUser(candidat_id, function (err, result) {
        if (err && err.constructor.name !== "OkPacket") throw err;
      });
    });
      res.send('<script>alert("Mise à jour réussite ! actif --> inactif"); window.location.href="/admin/adminmode/liste_utilisateurs/details/' + candidat_id + '/modifier";</script>');
  });

  router.get('/adminmode/liste_utilisateurs/details/:candidatid(\\d+)/retablir', function(req, res, next) {
    let candidat_id = req.params.candidatid;
    modifieModel.applyInsert(["statut", req.session.userid, candidat_id, "actif"], function (err, result) {
      if (err) throw err;
      candidatModel.acceptUser(candidat_id, function (err, result) {
        if (err && err.constructor.name !== "OkPacket") throw err;
      });
    });
      res.send('<script>alert("Mise à jour réussite ! inactif --> actif"); window.location.href="/admin/adminmode/liste_utilisateurs/details/' + candidat_id + '/modifier";</script>');
  });

  router.get('/adminmode/demandes_adhesion', function (req, res, next) {
    const limit = req.query.limit || 5;
    const page = parseInt(req.query.page) || 1;
    result = candidatModel.readallAdhesionAdminPaginated(page, limit, function(result){
      console.log(result);
      console.log(paginate.getArrayPages(req)(3, result.pageCount, req.query.page));
      res.render('admin_adminmode_liste_adhesions', { 
        demande: result, 
        pageCount: result.pageCount,
        pages: paginate.getArrayPages(req)(3, result.pageCount, req.query.page),
        req: req,
        paginate: paginate,
        currentPage: parseInt(req.query.page || result.page)
      });
    });
  });

  router.get('/adminmode/liste_organisations', function (req, res, next) {
    let statut = 'validée';
    const limit = req.query.limit || 5;
    const page = parseInt(req.query.page) || 1;
    result = organisationModel.readallPaginated(page, limit, function(result){
      console.log(result);
      console.log(paginate.getArrayPages(req)(3, result.pageCount, req.query.page));
      res.render('admin_adminmode_liste_organisations', { 
        visualiser: result, 
        activity: statut,
        pageCount: result.pageCount,
        pages: paginate.getArrayPages(req)(3, result.pageCount, req.query.page),
        req: req,
        paginate: paginate,
        currentPage: parseInt(req.query.page || result.page)
      });
    });
  });

  router.get('/adminmode/liste_organisations/activity', function (req, res, next) {
    var statut = req.query.activity;
    const limit = req.query.limit || 5;
    const page = parseInt(req.query.page) || 1;
    result = organisationModel.readByStatutPaginated(statut, page, limit, function(result){
      console.log(result);
      console.log(paginate.getArrayPages(req)(3, result.pageCount, req.query.page));
      res.render('admin_adminmode_liste_organisations', { 
        visualiser: result, 
        activity: statut,
        pageCount: result.pageCount,
        pages: paginate.getArrayPages(req)(3, result.pageCount, req.query.page),
        req: req,
        paginate: paginate,
        currentPage: parseInt(req.query.page || result.page)
      });
    });
  });

  router.get('/adminmode/liste_organisations/search', function (req, res, next) {
    let statut = 'validée';
    const limit = req.query.limit || 5;
    const page = parseInt(req.query.page) || 1;
    result = organisationModel.readKeywordPaginated(req.query.keyword, page, limit, function(result){
      console.log(result);
      console.log(paginate.getArrayPages(req)(3, result.pageCount, req.query.page));
      res.render('admin_adminmode_liste_organisations', { 
        visualiser: result, 
        activity: statut,
        pageCount: result.pageCount,
        pages: paginate.getArrayPages(req)(3, result.pageCount, req.query.page),
        req: req,
        paginate: paginate,
        currentPage: parseInt(req.query.page || result.page)
      });
    });
  });

  router.get('/adminmode/liste_organisations/details/:siren(\\d+)/modifier', function(req, res, next) {
    let orga_siren = req.params.siren;
    result = organisationModel.read(orga_siren, function(result){
      res.render('admin_adminmode_organisation_modification', { organisation :
      result })});
  });

  router.post('/adminmode/liste_organisations/details/:siren(\\d+)/appliquer', function(req, res, next) {// #TODO MAJ ORGA
    let orga_siren = req.params.siren;
    const type_organisation = req.body.type_organisation;
    const siege = req.body.siege;
    liste_attribut = ['type_organisation', 'siege'];
    liste_valeur = [type_organisation, siege];
    console.log(liste_valeur);
    console.log(liste_attribut);
    for (var i = 0; i < liste_valeur.length; i++) { 
      console.log(liste_valeur[i]); 
      console.log(liste_attribut[i]);
      if (liste_valeur[i] !== ''){
        controleModel.applyInsert([liste_attribut[i], orga_siren, req.session.userid, liste_valeur[i]], function (err, result) {
          if (err) throw err;
        });
        organisationModel.applyUpdate([liste_attribut[i], liste_valeur[i], orga_siren], function (err, result) {
          if (err) throw err;
        });
      }
    };
      res.send('<script>alert("Mise à jour réussite !"); window.location.href="/admin/adminmode/liste_organisations/details/' + orga_siren + '/modifier";</script>');
  });

  router.get('/adminmode/liste_organisations/details/:siren(\\d+)/supprimer', function(req, res, next) {
    let orga_siren = req.params.siren;
    controleModel.applyInsert(["statut", orga_siren, req.session.userid, "supprimée"], function (err, result) {
      if (err) throw err;
      organisationModel.supprOrga(orga_siren, function (err, result) {
        if (err && err.constructor.name !== "OkPacket") throw err;
      });
    });
      res.send('<script>alert("Mise à jour réussite ! validée --> supprimée"); window.location.href="/admin/adminmode/liste_organisations/details/' + orga_siren + '/modifier";</script>');
  });

  router.get('/adminmode/liste_organisations/details/:siren(\\d+)/ajouter', function(req, res, next) {
    let orga_siren = req.params.siren;
    controleModel.applyInsert(["statut", orga_siren, req.session.userid, "validée"], function (err, result) {
      if (err) throw err;
      organisationModel.acceptOrga(orga_siren, function (err, result) {
        if (err && err.constructor.name !== "OkPacket") throw err;
      });
    });
      res.send('<script>alert("Mise à jour réussite ! en_attente --> validée"); window.location.href="/admin/adminmode/liste_organisations/details/' + orga_siren + '/modifier";</script>');
  });

  router.get('/adminmode/liste_organisations/details/:siren(\\d+)/retablir', function(req, res, next) {
    let orga_siren = req.params.siren;
    controleModel.applyInsert(["statut", orga_siren, req.session.userid, "validée"], function (err, result) {
      if (err) throw err;
      organisationModel.acceptOrga(orga_siren, function (err, result) {
        if (err && err.constructor.name !== "OkPacket") throw err;
      });
    });
      res.send('<script>alert("Mise à jour réussite ! supprimée --> validée"); window.location.href="/admin/adminmode/liste_organisations/details/' + orga_siren + '/modifier";</script>');
  });

  router.get('/adminmode/liste_organisations/details/:siren(\\d+)', function(req, res, next) {
    let orga_siren = req.params.siren;
    result = organisationModel.read(orga_siren, function(result){
      res.render('admin_adminmode_organisation_details', { organisation :
      result })});
  });

  router.get('/adminmode/liste_organisations/organisation_form', function(req, res, next) {
    res.render('admin_adminmode_organisation_form')
  });

  router.post('/adminmode/liste_organisations/organisation_form/add_organisation_request', function (req, res, next) { // ENREGISTREMENT DE NOUVELLES ORGANISATIONS
    var siren = req.body.siren;
    organisationModel.read(siren, function (result) {
      if (result.length === 0) {
        var nom = req.body.nom;
        var type = req.body.type;
        var adresse = req.body.adresse;
        organisationModel.addOrga([siren, nom, type, adresse], function (err, result) {
          if (err) throw err;
          res.send('<script>alert("Ajout avec succès !"); window.location.href="/admin/adminmode/";</script>');
        });
      } else {
        res.send('<script>alert("Votre organisation semble déjà existée, nous allons vous redirigez vers la page de demande pour être recruteur."); window.location.href="/admin/adminmode/liste_organisations";</script>');
      }
    });
  });


module.exports = router;
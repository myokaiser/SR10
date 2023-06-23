var db = require('./db.js');

module.exports = {

    read: function (id, callback) {
        db.query("select * from Offre where id = ?",id, function
        (err, results) {
            if (err) throw err;
            callback(results);
        });
    },

    readAndOrga: function (id, callback) {
        db.query("select * from Offre inner join Organisation on Organisation.SIREN = Offre.organisation where Offre.id = ?",id, function
        (err, results) {
            if (err) throw err;
            callback(results);
        });
    },

    readallAndOrgaValidPaginated: function (page, limit, callback) {
        db.query("select count(*) as itemCount from Offre inner join Organisation on Organisation.SIREN = Offre.organisation where Offre.statut = 'publiée' and Organisation.statut = 'validée'", function (err, count) {
            if (err) throw err;
            const pageCount = Math.ceil(count[0].itemCount / limit);
            const offset = (page - 1) * limit;
            db.query("select * from Offre inner join Organisation on Organisation.SIREN = Offre.organisation where Offre.statut = 'publiée' and Organisation.statut = 'validée' order by date_creation DESC limit ? offset ?", [limit, offset], function (err, results) {
            if (err) throw err;
            callback({
                results: results,
                pageCount: pageCount,
                page: page 
            });
            });
        });
        },
    
    readallAndOrgaValidASCPaginated: function (page, limit, callback) {
        db.query("select count(*) as itemCount from Offre inner join Organisation on Organisation.SIREN = Offre.organisation where Offre.statut = 'publiée' and Organisation.statut = 'validée'", function (err, count) {
            if (err) throw err;
            const pageCount = Math.ceil(count[0].itemCount / limit);
            const offset = (page - 1) * limit;
            db.query("select * from Offre inner join Organisation on Organisation.SIREN = Offre.organisation where Offre.statut = 'publiée' and Organisation.statut = 'validée' order by date_creation limit ? offset ?", [limit, offset], function (err, results) {
            if (err) throw err;
            callback({
                results: results,
                pageCount: pageCount,
                page: page
            });
            });
        });
        },

    readFromTypePaginated: function (postetype, page, limit, callback) { //#TODO BARRE DE RECHERCHE
        db.query("select count(*) as itemCount from Offre inner join Organisation on Organisation.SIREN = Offre.organisation where Offre.statut = 'publiée' and lower(type_metier) = ?", postetype, function (err, count) {
            if (err) throw err;
            const pageCount = Math.ceil(count[0].itemCount / limit);
            const offset = (page - 1) * limit;
            db.query("select * from Offre inner join Organisation on Organisation.SIREN = Offre.organisation where Offre.statut = 'publiée' and lower(type_metier) = ? ORDER BY date_creation DESC limit ? offset ?", [postetype, limit, offset], function (err, results) {
            if (err) throw err;
            callback({
                results: results,
                pageCount: pageCount,
                page: page 
            });
            });
        });
        },

    readKeywordPaginated: function (word, page, limit, callback) { //#TODO BARRE DE RECHERCHE
        db.query("select count(*) as itemCount from Offre inner join Organisation on Organisation.SIREN = Offre.organisation where Offre.titre like ? or Organisation.nom like ?", ['%' + word + '%', '%' + word + '%'], function (err, count) {
            if (err) throw err;
            const pageCount = Math.ceil(count[0].itemCount / limit);
            const offset = (page - 1) * limit;
            db.query("select * from Offre inner join Organisation on Organisation.SIREN = Offre.organisation where Offre.titre like ? or Organisation.nom like ? limit ? offset ?", ['%' + word + '%', '%' + word + '%', limit, offset], function (err, results) {
            if (err) throw err;
            callback({
                results: results,
                pageCount: pageCount,
                page: page 
            });
            });
        });
        },

    readRecruiterPaginated: function (id, page, limit, callback) { //#TODO BARRE DE RECHERCHE
        db.query("select count(*) as itemCount FROM Offre INNER JOIN Organisation ON Offre.organisation = Organisation.SIREN WHERE Organisation.SIREN = (SELECT organisation FROM Utilisateur WHERE id = ?) ORDER BY date_creation DESC", id, function (err, count) {
            if (err) throw err;
            const pageCount = Math.ceil(count[0].itemCount / limit);
            const offset = (page - 1) * limit;
            db.query("select * FROM Offre INNER JOIN Organisation ON Offre.organisation = Organisation.SIREN WHERE Organisation.SIREN = (SELECT organisation FROM Utilisateur WHERE id = ?) ORDER BY date_creation DESC limit ? offset ?", [id, limit, offset], function (err, results) {
            if (err) throw err;
            callback({
                results: results,
                pageCount: pageCount,
                page: page 
            });
            });
        });
        },

    readRecruiterKeywordPaginated: function (liste, page, limit, callback) { //#TODO BARRE DE RECHERCHE
        db.query("select count(*) as itemCount FROM Offre INNER JOIN Organisation ON Offre.organisation = Organisation.SIREN WHERE Organisation.SIREN = (SELECT organisation FROM Utilisateur WHERE id = ?) and (Offre.titre like ? or Organisation.nom like ?)", [liste[0], '%' + liste[1] + '%', '%' + liste[1] + '%'], function (err, count) {
            if (err) throw err;
            const pageCount = Math.ceil(count[0].itemCount / limit);
            const offset = (page - 1) * limit;
            db.query("select * FROM Offre INNER JOIN Organisation ON Offre.organisation = Organisation.SIREN WHERE Organisation.SIREN = (SELECT organisation FROM Utilisateur WHERE id = ?) and (Offre.titre like ? or Organisation.nom like ?) limit ? offset ?", [liste[0], '%' + liste[1] + '%', '%' + liste[1] + '%', limit, offset], function (err, results) {
                if (err) throw err;
                callback({
                    results: results,
                    pageCount: pageCount,
                    page: page 
                });
                });
            });
            },

    readRecruiterKeywordPaginated: function (liste, page, limit, callback) { //#TODO BARRE DE RECHERCHE
        db.query("select count(*) as itemCount FROM Offre INNER JOIN Organisation ON Offre.organisation = Organisation.SIREN WHERE Organisation.SIREN = (SELECT organisation FROM Utilisateur WHERE id = ?) and (Offre.titre like ? or Organisation.nom like ?)", [liste[0], '%' + liste[1] + '%', '%' + liste[1] + '%'], function (err, count) {
            if (err) throw err;
            const pageCount = Math.ceil(count[0].itemCount / limit);
            const offset = (page - 1) * limit;
            db.query("select * FROM Offre INNER JOIN Organisation ON Offre.organisation = Organisation.SIREN WHERE Organisation.SIREN = (SELECT organisation FROM Utilisateur WHERE id = ?) and (Offre.titre like ? or Organisation.nom like ?) limit ? offset ?", [liste[0], '%' + liste[1] + '%', '%' + liste[1] + '%', limit, offset], function (err, results) {
                if (err) throw err;
                callback({
                    results: results,
                    pageCount: pageCount,
                    page: page 
                });
                });
            });
            },

    readRecruiterASCPaginated: function (id, page, limit, callback) { //#TODO BARRE DE RECHERCHE
        db.query("select count(*) as itemCount FROM Offre INNER JOIN Organisation ON Offre.organisation = Organisation.SIREN WHERE Organisation.SIREN = (SELECT organisation FROM Utilisateur WHERE id = ?) ORDER BY date_creation", id, function (err, count) {
            if (err) throw err;
            const pageCount = Math.ceil(count[0].itemCount / limit);
            const offset = (page - 1) * limit;
            db.query("select * FROM Offre INNER JOIN Organisation ON Offre.organisation = Organisation.SIREN WHERE Organisation.SIREN = (SELECT organisation FROM Utilisateur WHERE id = ?) ORDER BY date_creation limit ? offset ?", [id, limit, offset], function (err, results) {
            if (err) throw err;
            callback({
                results: results,
                pageCount: pageCount,
                page: page 
            });
            });
        });
        },

    readRecruiterFromTypePaginated: function (liste, page, limit, callback) { //#TODO BARRE DE RECHERCHE
    db.query("select count(*) as itemCount from Offre inner join Organisation on Organisation.SIREN = Offre.organisation where lower(type_metier) = ? and Organisation.SIREN = (SELECT organisation FROM Utilisateur WHERE id = ?) ORDER BY date_creation DESC", [liste[0], liste[1]], function (err, count) {
        if (err) throw err;
        const pageCount = Math.ceil(count[0].itemCount / limit);
        const offset = (page - 1) * limit;
        db.query("select * from Offre inner join Organisation on Organisation.SIREN = Offre.organisation where lower(type_metier) = ? and Organisation.SIREN = (SELECT organisation FROM Utilisateur WHERE id = ?) ORDER BY date_creation DESC limit ? offset ?", [liste[0], liste[1], limit, offset], function (err, results) {
        if (err) throw err;
        callback({
            results: results,
            pageCount: pageCount,
            page: page 
        });
        });
    });
    },


    readRecruiterFromStatutPaginated: function (liste, page, limit, callback) { //#TODO BARRE DE RECHERCHE
        db.query("select count(*) as itemCount from Offre inner join Organisation on Organisation.SIREN = Offre.organisation where Offre.statut = ? and Organisation.SIREN = (SELECT organisation FROM Utilisateur WHERE id = ?) ORDER BY date_creation DESC", [liste[0], liste[1]], function (err, count) {
            if (err) throw err;
            const pageCount = Math.ceil(count[0].itemCount / limit);
            const offset = (page - 1) * limit;
            db.query("select * from Offre inner join Organisation on Organisation.SIREN = Offre.organisation where Offre.statut = ? and Organisation.SIREN = (SELECT organisation FROM Utilisateur WHERE id = ?) ORDER BY date_creation DESC limit ? offset ?", [liste[0], liste[1], limit, offset], function (err, results) {
            if (err) throw err;
            callback({
                results: results,
                pageCount: pageCount,
                page: page 
            });
            });
        });
        },










//-------------------------------------------------------------------------LISTE OFFRES-------------------------------------------------------------------------\\
    readallAndOrgaValid: function (callback) {
        db.query("select * from Offre inner join Organisation on Organisation.SIREN = Offre.organisation where Offre.statut = 'publiée' and Organisation.statut = 'validée' order by date_creation DESC", function (err, results) {
            if (err) throw err;
            callback(results);
        });
    },

    readallAndOrgaValidASC: function (callback) { //#TODO ANCIENT
        db.query("select * from Offre inner join Organisation on Organisation.SIREN = Offre.organisation where Offre.statut = 'publiée' order by date_creation", function (err, results) {
            if (err) throw err;
            callback(results);
        });
    },

    readFromType: function (postetype, callback){ //#TODO TYPE METIER
        db.query("select * from Offre inner join Organisation on Organisation.SIREN = Offre.organisation where lower(type_metier) = ? ORDER BY date_creation DESC", postetype, function
        (err, results) {
            if (err) throw err;
            callback(results);
        });
    },

    readKeyword: function (word, callback) { //#TODO BARRE DE RECHERCHE
        db.query("select * from Offre inner join Organisation on Organisation.SIREN = Offre.organisation where Offre.titre like ? or Organisation.nom like ?", ['%' + word + '%', '%' + word + '%'], function
        (err, results) {
            if (err) throw err;
            callback(results);
        });
    },

    readRecruiter: function (id, callback){ //#TODO OFFRE DU RECRUTEUR RECENT
        db.query("SELECT * FROM Offre INNER JOIN Organisation ON Offre.organisation = Organisation.SIREN WHERE Organisation.SIREN = (SELECT organisation FROM Utilisateur WHERE id = ?) ORDER BY date_creation DESC", id, function
        (err, results) {
            if (err) throw err;
            callback(results);
        });
    },

    readRecruiterASC: function (id, callback){ //#TODO OFFRE DU RECRUTEUR ANCIENT
        db.query("SELECT * FROM Offre INNER JOIN Organisation ON Offre.organisation = Organisation.SIREN WHERE Organisation.SIREN = (SELECT organisation FROM Utilisateur WHERE id = ?) ORDER BY date_creation", id, function
        (err, results) {
            if (err) throw err;
            callback(results);
        });
    },

    readRecruiterFromType: function (liste, callback){ //#TODO OFFRE DU RECRUTEUR TYPE METIER
        db.query("select * from Offre inner join Organisation on Organisation.SIREN = Offre.organisation where lower(type_metier) = ? and Organisation.SIREN = (SELECT organisation FROM Utilisateur WHERE id = ?) ORDER BY date_creation DESC", [liste[0], liste[1]], function
        (err, results) {
            if (err) throw err;
            callback(results);
        });
    },

    readRecruiterFromStatut: function (liste, callback){
        db.query("select * from Offre inner join Organisation on Organisation.SIREN = Offre.organisation where Offre.statut = ? and Organisation.SIREN = (SELECT organisation FROM Utilisateur WHERE id = ?) ORDER BY date_creation DESC", [liste[0], liste[1]], function
        (err, results) {
            if (err) throw err;
            callback(results);
        });
    },

    readRecruiterKeyword: function (liste, callback) { //#TODO OFFRE DU RECRUTEUR BARRE DE RECHERCHE
        db.query("select * from Offre inner join Organisation on Organisation.SIREN = Offre.organisation where Organisation.SIREN = (SELECT organisation FROM Utilisateur WHERE id = ?) and (Offre.titre like ? or Organisation.nom like ?)", [liste[0], '%' + liste[1] + '%', '%' + liste[1] + '%'], function
        (err, results) {
            if (err) throw err;
            callback(results);
        });
    },

    //lister les offres par titre
    readFromPoste: function (poste, callback){
        db.query("select * from Offre where titre = ? ORDER BY date_creation DESC", poste, function
        (err, results) {
            if (err) throw err;
            callback(results);
        });
    },

    readall: function (callback) {
        db.query("select * from Offre order by date_creation DESC", function (err, results) {
            if (err) throw err;
            callback(results);
        });
    },

    readallAndOrga: function (callback) {
        db.query("select * from Offre inner join Organisation on Organisation.SIREN = Offre.organisation order by date_creation DESC", function (err, results) {
            if (err) throw err;
            callback(results);
        });
    },


    applyUpdate: function (liste, callback) {
        db.query("UPDATE Offre SET " + liste[0] + " = ? WHERE id = ?", [liste[1], liste[2]], function (err, results) {
        if (err) {
            return callback(err);
        }
        callback(null, results);
        });
    },

    expiredUpdate: function (id, callback) {
        db.query("UPDATE Offre SET statut = 'expirée' WHERE id = ?", id, function (err, results) {
        if (err) {
            return callback(err);
        }
        callback(null, results);
        });
    },

    postPublishOffer: function (liste, callback) {
        db.query("INSERT INTO Offre (organisation, recruteur, statut, titre, descr, type_metier, salaire) SELECT organisation, ?, 'publiée', ?, ?, ?, ? from Utilisateur where id = ?", [liste[0], liste[1], liste[2], liste[3], liste[4], liste[0]], function (err, results) {
        if (err) {
            return callback(err);
        }
        callback(null, results);
        });
    },
}

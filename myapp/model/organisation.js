var db = require('./db.js');

module.exports = {

    read: function (SIREN, callback) {
        db.query("select * from Organisation where SIREN = ?",SIREN, function
    (err, results) {
        if (err) throw err;
        callback(results);
    });
    },
    
    readall: function (callback) {
        db.query("select * from Organisation", function (err, results) {
            if (err) throw err;
            callback(results);
        });
    },

    readname: function (callback) {
        db.query("SELECT nom FROM Organisation", function (err, results) {
        if (err) throw err;
        callback(results);
        });
    },
    
    readallPaginated: function (page, limit, callback) {
        db.query("select count(*) as itemCount  from Organisation", function (err, count) {
            if (err) throw err;
            const pageCount = Math.ceil(count[0].itemCount / limit);
            const offset = (page - 1) * limit;
            db.query("select *  from Organisation limit ? offset ?", [limit, offset], function (err, results) {
            if (err) throw err;
            callback({
                results: results,
                pageCount: pageCount,
                page: page 
            });
            });
        });
        },

    readByStatut: function (statut, callback) {
        db.query("select * from Organisation where statut = ?", statut, function (err, results) {
            if (err) throw err;
            callback(results);
        });
    },

    readByStatutPaginated: function (statut, page, limit, callback) {
        db.query("select count(*) as itemCount  from Organisation where statut = ?", statut, function (err, count) {
            if (err) throw err;
            const pageCount = Math.ceil(count[0].itemCount / limit);
            const offset = (page - 1) * limit;
            db.query("select *  from Organisation where statut = ? limit ? offset ?", [statut, limit, offset], function (err, results) {
            if (err) throw err;
            callback({
                results: results,
                pageCount: pageCount,
                page: page 
            });
            });
        });
        },

    readKeyword: function (word, callback) { //#TODO BARRE DE RECHERCHE
        db.query("select * from Organisation where Organisation.nom like ? or Organisation.type_organisation like ? or Organisation.siege like ? or Organisation.SIREN like ?", ['%' + word + '%', '%' + word + '%', '%' + word + '%', '%' + word + '%'], function
        (err, results) {
            if (err) throw err;
            callback(results);
        });
    },

    readKeywordPaginated: function (word, page, limit, callback) {
        db.query("select count(*) as itemCount  from Organisation where Organisation.nom like ? or Organisation.type_organisation like ? or Organisation.siege like ? or Organisation.SIREN like ?", ['%' + word + '%', '%' + word + '%', '%' + word + '%', '%' + word + '%'], function (err, count) {
            if (err) throw err;
            const pageCount = Math.ceil(count[0].itemCount / limit);
            const offset = (page - 1) * limit;
            db.query("select *  from Organisation where Organisation.nom like ? or Organisation.type_organisation like ? or Organisation.siege like ? or Organisation.SIREN like ? limit ? offset ?", ['%' + word + '%', '%' + word + '%', '%' + word + '%', '%' + word + '%', limit, offset], function (err, results) {
            if (err) throw err;
            callback({
                results: results,
                pageCount: pageCount,
                page: page 
            });
            });
        });
        },

    applyUpdate: function (liste, callback) {
        db.query("UPDATE Organisation SET " + liste[0] + " = ? WHERE SIREN = ?", [liste[1], liste[2]], function (err, results) {
        if (err) {
            return callback(err);
        }
        callback(null, results);
        });
    },

    supprOrga: function (id, callback) {
        db.query("UPDATE Organisation SET statut = 'supprimée' WHERE SIREN = ?", id, function (err, results) {
            if (err) throw err;
            callback(results);
        });
    },

    acceptOrga: function (id, callback) {
        db.query("UPDATE Organisation SET statut = 'validée' WHERE SIREN = ?", id, function (err, results) {
            if (err) throw err;
            callback(results);
        });
    },

    readNameValide: function (callback) {
        db.query("SELECT nom FROM Organisation where statut = 'validée'", function (err, results) {
            if (err) throw err;
            callback(results);
        });
    },

    readLowerName: function (organisation, callback) {
        db.query("SELECT * FROM Organisation WHERE lower(nom) = lower(?)", organisation, function (err, results) {
            if (err) throw err;
            callback(results);
        });
    },

    requestOrga: function (liste, callback) {
        db.query("INSERT INTO Organisation (SIREN, nom, type_organisation, siege, statut) VALUES (?, ?, ?, ?, 'en_attente')", [liste[0], liste[1], liste[2], liste[3]], function (err, results) {
        if (err) {
            return callback(err);
        }
        callback(null, results);
        });
    },

    addOrga: function (liste, callback) {
        db.query("INSERT INTO Organisation (SIREN, nom, type_organisation, siege, statut) VALUES (?, ?, ?, ?, 'validée')", [liste[0], liste[1], liste[2], liste[3]], function (err, results) {
        if (err) {
            return callback(err);
        }
        callback(null, results);
        });
    },
}

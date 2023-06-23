var db = require('./db.js');
module.exports = {
    postAcceptInsert: function (liste, callback) {
        db.query("INSERT INTO Ajoute (recruteur1, recruteur2, date, statut) VALUES(?, ?, NOW(), 'accepted')", [liste[0], liste[1]], function (err, results) {
        if (err) {
            return callback(err);
        }
        callback(null, results);
        });
    },

    postRefuseInsert: function (liste, callback) {
        db.query("INSERT INTO Ajoute (recruteur1, recruteur2, date, statut) VALUES(?, ?, NOW(), 'refused')", [liste[0], liste[1]], function (err, results) {
        if (err) {
            return callback(err);
        }
        callback(null, results);
        });
    }

}
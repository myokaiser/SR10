var db = require('./db.js');
module.exports = {
    applyInsert: function (liste, callback) {
        db.query("INSERT INTO ModifieUtilisateur (admin, user, date_modif, modification) SELECT ?, ?, NOW(), CONCAT('" + liste[0] + " :', case when " + liste[0] + " is null then 'NULL' else " + liste[0] + " end, ' --> ', ?) from Utilisateur where id = ?", [liste[1], liste[2], liste[3], liste[2]], function (err, results) {
            if (err) {
                return callback(err);
            }
            callback(null, results);
            });
        },
}
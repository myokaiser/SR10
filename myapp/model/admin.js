var db = require('./db.js');
module.exports = {
	read: function (mail, callback) {
		db.query("select * from Utilisateur where mail= ? and est_admin = 'oui'",mail, function
		(err, results) {
			if (err) throw err;
			callback(results);
		});
	},
	readall: function (callback) {
		db.query("select * from Utilisateur and est_admin = 'oui'", function (err, results) {
			if (err) throw err;
			callback(results);
		});
	},
	readByOrder: function (callback) {
		db.query("select * from Utilisateur and est_admin = 'oui' order by date_creation ", function (err, results) {
			if (err) throw err;
			callback(results);
		});
	},
	readByOrderDesc: function (callback) {
		db.query("select * from Utilisateur and est_admin = 'oui' order by date_creation desc", function (err, results) {
			if (err) throw err;
			callback(results);
		});
	},
	readByName: function (nom, callback) {
		db.query("select * from Utilisateur where nom= ? and est_admin = 'oui'", nom, function (err, results) {
			if (err) throw err;
			callback(results);
		});
	},
	readByFirstname: function (prenom, callback) {
		db.query("select * from Utilisateur where prenom= ? and est_admin = 'oui'", prenom, function (err, results) {
			if (err) throw err;
			callback(results);
		});
	},
	readByStatut: function (statut, callback) {
		db.query("select * from Utilisateur where statut= ? and est_admin = 'oui'", statut, function (err, results) {
			if (err) throw err;
			callback(results);
		});
	},
	readByTel: function (tel, callback) {
		db.query("select * from Utilisateur where tel= ? and est_admin = 'oui'", tel, function (err, results) {
			if (err) throw err;
			callback(results);
		});
	},
	areValid: function (email, password, callback) {
		sql = "SELECT pwd FROM Utilisateur WHERE mail = ? and est_admin = 'oui'";
		rows = db.query(sql, mail, function (err, results) {
			if (err) throw err;
			if (rows.length == 1 && rows[0].pwd === password) {
				callback(true)
			} else {
				callback(false);
			}
		});
	},
	creat: function (mail, pwd, nom, prenom, tel, date_creation, statut, callback) {
		//todo 
		return false;
	}
}
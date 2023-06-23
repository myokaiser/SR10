var db = require('./db.js');
module.exports = {
	read: function (mail, callback) {
		db.query("select * from Utilisateur where mail= ? and est_recruteur = 'oui'",mail, function
		(err, results) {
			if (err) throw err;
			callback(results);
		});
	},
	readall: function (callback) {
		db.query("select * from Utilisateur where est_recruteur = 'oui'", function (err, results) {
			if (err) throw err;
			callback(results);
		});
	},
	readByOrga: function (orga, callback) {
		db.query("select * from Utilisateur where orga= ? and est_recruteur = 'oui'", orga, function (err, results) {
			if (err) throw err;
			callback(results);
		});
	},
	readByOrder: function (callback) {
		db.query("select * from Utilisateur where est_recruteur = 'oui' order by date_creation", function (err, results) {
			if (err) throw err;
			callback(results);
		});
	},
	readByOrderDesc: function (callback) {
		db.query("select * from Utilisateur where est_recruteur = 'oui' order by date_creation desc", function (err, results) {
			if (err) throw err;
			callback(results);
		});
	},
	readByName: function (nom, callback) {
		db.query("select * from Utilisateur where nom= ? and est_recruteur = 'oui'", nom, function (err, results) {
			if (err) throw err;
			callback(results);
		});
	},
	readByFirstname: function (prenom, callback) {
		db.query("select * from Utilisateur where prenom= ? and est_recruteur = 'oui'", prenom, function (err, results) {
			if (err) throw err;
			callback(results);
		});
	},
	readByStatut: function (statut, callback) {
		db.query("select * from Utilisateur where statut= ? and est_recruteur = 'oui'", statut, function (err, results) {
			if (err) throw err;
			callback(results);
		});
	},
	readByTel: function (tel, callback) {
		db.query("select * from Utilisateur where tel= ? and est_recruteur = 'oui'", tel, function (err, results) {
			if (err) throw err;
			callback(results);
		});
	},
}
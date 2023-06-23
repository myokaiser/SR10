var db = require('./db.js');

module.exports = {
	read: function (id, callback) {
		db.query("select * from Utilisateur where id = ?", id, function
		(err, results) {
			if (err) throw err;
			callback(results);
		});
	},
	readall: function (callback) {
		db.query("select * from Utilisateur", function (err, results) {
			if (err) throw err;
			callback(results);
		});
	},

	readallCandidat: function (callback){
		db.query("select * from Utilisateur where est_admin = 'non' and est_recruteur = 'non'", function(err,results){
			if(err) throw err;
			callback(results);
		});
	},
	readmulter: function (id, callback) {
		db.query("SELECT REPLACE(nom, ' ', '_') as nom, REPLACE(prenom, ' ', '_') as prenom FROM Utilisateur where id = ?", id, function (err, results) {
			if (err) throw err;
			callback(results);
		});
	},
	readByOrder: function (callback) {
		db.query("select * from Utilisateur order by date_creation", function (err, results) {
			if (err) throw err;
			callback(results);
		});
	},
	readByOrderDesc: function (callback) {
		db.query("select * from Utilisateur order by date_creation desc", function (err, results) {
			if (err) throw err;
			callback(results);
		});
	},
	readKeyword: function (word, callback) { //#TODO BARRE DE RECHERCHE
        db.query("select * from Utilisateur left outer join Organisation on Organisation.SIREN = Utilisateur.organisation where Utilisateur.nom like ? or Utilisateur.prenom like ? or Utilisateur.tel like ? or Utilisateur.mail like ? or Organisation.nom like ?", ['%' + word + '%', '%' + word + '%', '%' + word + '%', '%' + word + '%', '%' + word + '%'], function
        (err, results) {
            if (err) throw err;
            callback(results);
        });
    },
	readByUserStatut: function (liste, callback) {
		db.query("select * from Utilisateur where (est_recruteur = ? or est_recruteur = ?) and (est_admin = ? or est_admin = ?)", [liste[0], liste[1], liste[2], liste[3]], function (err, results) {
			if (err) throw err;
			callback(results);
		});
	},
	readByUserOrga: function (orga, callback) {
		db.query("select * from Utilisateur where organisation = (SELECT SIREN FROM Organisation where nom = ?)", orga, function (err, results) {
			if (err) throw err;
			callback(results);
		});
	},
	readByName: function (nom, callback) {
		db.query("select * from Utilisateur where nom= ?", nom, function (err, results) {
			if (err) throw err;
			callback(results);
		});
	},
	readByFirstname: function (prenom, callback) {
		db.query("select * from Utilisateur where prenom= ?", prenom, function (err, results) {
			if (err) throw err;
			callback(results);
		});
	},
	readByStatut: function (statut, callback) {
		db.query("select * from Utilisateur where statut= ?", statut, function (err, results) {
			if (err) throw err;
			callback(results);
		});
	},
	readByTel: function (tel, callback) {
		db.query("select * from Utilisateur where tel= ?", tel, function (err, results) {
			if (err) throw err;
			callback(results);
		});
	},
	readallAdhesionRecruteurByOrga: function (id, callback) {
		db.query("select * from Utilisateur where est_recruteur = 'en_attente' and organisation = (select organisation from Utilisateur where id = ?)", id, function (err, results) {
			if (err) throw err;
			callback(results);
		});
	},


    readallAdhesionRecruteurByOrgaPaginated: function (id, page, limit, callback) { //#TODO BARRE DE RECHERCHE
		db.query("select count(*) as itemCount from Utilisateur where est_recruteur = 'en_attente' and organisation = (select organisation from Utilisateur where id = ?)", id, function (err, count) {
			if (err) throw err;
			const pageCount = Math.ceil(count[0].itemCount / limit);
			const offset = (page - 1) * limit;
			db.query("select * from Utilisateur where est_recruteur = 'en_attente' and organisation = (select organisation from Utilisateur where id = ?) limit ? offset ?", [id, limit, offset], function (err, results) {
			if (err) throw err;
			callback({
				results: results,
				pageCount: pageCount,
				page: page 
			});
			});
		});
		},

	readallPaginated: function (page, limit, callback) {
		db.query("select count(*) as itemCount from Utilisateur", function (err, count) {
			if (err) throw err;
			const pageCount = Math.ceil(count[0].itemCount / limit);
			const offset = (page - 1) * limit;
			db.query("select * from Utilisateur limit ? offset ?", [limit, offset], function (err, results) {
			if (err) throw err;
			callback({
				results: results,
				pageCount: pageCount,
				page: page 
			});
			});
		});
		},

		readKeywordPaginated: function (word, page, limit, callback) {
		db.query("select count(*) as itemCount from Utilisateur left outer join Organisation on Organisation.SIREN = Utilisateur.organisation where Utilisateur.nom like ? or Utilisateur.prenom like ? or Utilisateur.tel like ? or Utilisateur.mail like ? or Organisation.nom like ?", ['%' + word + '%', '%' + word + '%', '%' + word + '%', '%' + word + '%', '%' + word + '%'], function (err, count) {
			if (err) throw err;
			const pageCount = Math.ceil(count[0].itemCount / limit);
			const offset = (page - 1) * limit;
			db.query("select * from Utilisateur left outer join Organisation on Organisation.SIREN = Utilisateur.organisation where Utilisateur.nom like ? or Utilisateur.prenom like ? or Utilisateur.tel like ? or Utilisateur.mail like ? or Organisation.nom like ? limit ? offset ?", ['%' + word + '%', '%' + word + '%', '%' + word + '%', '%' + word + '%', '%' + word + '%', limit, offset], function (err, results) {
			if (err) throw err;
			callback({
				results: results,
				pageCount: pageCount,
				page: page 
			});
			});
		});
		},

		readByStatutPaginated: function (statut, page, limit, callback) {
			db.query("select count(*) as itemCount from Utilisateur where statut= ?", statut, function (err, count) {
				if (err) throw err;
				const pageCount = Math.ceil(count[0].itemCount / limit);
				const offset = (page - 1) * limit;
				db.query("select * from Utilisateur where statut= ? limit ? offset ?", [statut, limit, offset], function (err, results) {
				if (err) throw err;
				callback({
					results: results,
					pageCount: pageCount,
					page: page 
				});
				});
			});
			},

		readByUserStatutPaginated: function (liste, page, limit, callback) {
			db.query("select count(*) as itemCount from Utilisateur where (est_recruteur = ? or est_recruteur = ?) and (est_admin = ? or est_admin = ?)", [liste[0], liste[1], liste[2], liste[3]], function (err, count) {
				if (err) throw err;
				const pageCount = Math.ceil(count[0].itemCount / limit);
				const offset = (page - 1) * limit;
				db.query("select * from Utilisateur where (est_recruteur = ? or est_recruteur = ?) and (est_admin = ? or est_admin = ?) limit ? offset ?", [liste[0], liste[1], liste[2], liste[3], limit, offset], function (err, results) {
				if (err) throw err;
				callback({
					results: results,
					pageCount: pageCount,
					page: page 
				});
				});
			});
			},

			readByUserOrga: function (orga, callback) {
				db.query("select * from Utilisateur where organisation = (SELECT SIREN FROM Organisation where nom = ?)", orga, function (err, results) {
					if (err) throw err;
					callback(results);
				});
			},

			readByUserOrgaPaginated: function (orga, page, limit, callback) {
				db.query("select count(*) as itemCount from Utilisateur where organisation = (SELECT SIREN FROM Organisation where nom = ?)", orga, function (err, count) {
					if (err) throw err;
					const pageCount = Math.ceil(count[0].itemCount / limit);
					const offset = (page - 1) * limit;
					db.query("select * from Utilisateur where organisation = (SELECT SIREN FROM Organisation where nom = ?) limit ? offset ?", [orga, limit, offset], function (err, results) {
					if (err) throw err;
					callback({
						results: results,
						pageCount: pageCount,
						page: page 
					});
					});
				});
				},


	readallAdhesionAdmin: function (callback) {
		db.query("select * from Utilisateur where est_admin = 'en_attente'", function (err, results) {
			if (err) throw err;
			callback(results);
		});
	},

	
	readallAdhesionAdminPaginated: function (page, limit, callback) {
		db.query("select count(*) as itemCount from Utilisateur where est_admin = 'en_attente'", function (err, count) {
			if (err) throw err;
			const pageCount = Math.ceil(count[0].itemCount / limit);
			const offset = (page - 1) * limit;
			db.query("select * from Utilisateur where est_admin = 'en_attente' limit ? offset ?", [limit, offset], function (err, results) {
			if (err) throw err;
			callback({
				results: results,
				pageCount: pageCount,
				page: page 
			});
			});
		});
		},

	connexionPost: function (liste, callback) {
		console.log(liste[0]);
		console.log(liste[1]);
		db.query("SELECT * FROM Utilisateur WHERE mail = ? and statut = 'actif'", liste[0], function (err, results) {
		if (err) {
			return callback(err);
		}
		callback(null, results);
		});
	},
	inscriptionPost: function (liste, callback) {
        db.query("INSERT INTO Utilisateur (prenom, nom, mail, tel, pwd, est_admin, est_recruteur, statut) VALUES (?, ?, ?, ?, ?, 'non', 'non', 'actif')", [liste[0], liste[1], liste[2], liste[3], liste[4]], function (err, results) {
		if (err) {
			return callback(err);
		}
		callback(null, results);
		});
    },
	applyUpdate: function (liste, callback) {
        db.query("UPDATE Utilisateur SET " + liste[0] + " = ? WHERE id = ?", [liste[1], liste[2]], function (err, results) {
		if (err) {
			return callback(err);
		}
		callback(null, results);
		});
	},
	supprUser: function (id, callback) {
        db.query("UPDATE Utilisateur SET statut = 'inactif' WHERE id = ?", id, function (err, results) {
		if (err) {
			return callback(err);
		}
		callback(null, results);
		});
	},
	acceptUser: function (id, callback) {
        db.query("UPDATE Utilisateur SET statut = 'actif' WHERE id = ?", id, function (err, results) {
		if (err) {
			return callback(err);
		}
		callback(null, results);
		});
	},
	requestUpdate: function (liste, callback) {
        db.query("UPDATE Utilisateur SET organisation = ?, est_recruteur = 'en_attente' WHERE id = ?", [liste[0], liste[1]], function (err, results) {
		if (err) {
			return callback(err);
		}
		callback(null, results);
		});
	},
	postAcceptUpdate: function (id, callback) {
        db.query("UPDATE Utilisateur SET est_recruteur = 'oui' WHERE id = ?", id, function (err, results) {
		if (err) {
			return callback(err);
		}
		callback(null, results);
		});
	},
	postRefuseUpdate: function (id, callback) {
        db.query("UPDATE Utilisateur SET organisation = NULL, est_recruteur = 'non' WHERE id = ?", id, function (err, results) {
		if (err) {
			return callback(err);
		}
		callback(null, results);
		});
	},
}
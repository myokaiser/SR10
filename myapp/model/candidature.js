var db = require('./db.js');
module.exports = {
	read: function (candidat, callback) {
		db.query("select * from Candidature where candidat= ?", candidat, function
		(err, results) {
			if (err) throw err;
			callback(results);
		});
	},
	readByOfferAndUser: function (liste, callback) {
		db.query("select * from Candidature where candidat= ? and offre = ?", [liste[0], liste[1]], function
		(err, results) {
			if (err) throw err;
			callback(results);
		});
	},
	readall: function (callback) {
		db.query("select * from Candidature", function (err, results) {
			if (err) throw err;
			callback(results);
		});
	},

	readByOrder: function (callback) {
		db.query("select * from Candidature inner join Offre on Offre.id = Candidature.offre inner join Organisation on Offre.organisation = Organisation.SIREN order by date_candidature", function (err, results) {
			if (err) throw err;
			callback(results);
		});
	},
	readByOrderDesc: function (callback) {
		db.query("select * from Candidature inner join Offre on Offre.id = Candidature.offre inner join Organisation on Offre.organisation = Organisation.SIREN order by date_candidature DESC", function (err, results) {
			if (err) throw err;
			callback(results);
		});
	},

	readallAndOrgaAndOffer: function (callback) {
		db.query("select * from Candidature inner join Offre on Offre.id = Candidature.offre inner join Organisation on Offre.organisation = Organisation.SIREN order by date_candidature DESC", function (err, results) {
			if (err) throw err;
			callback(results);
		});
	},

	readAndOrgaAndOfferFromCandidatAndOffer: function (liste, callback) {
		db.query("select * from Candidature inner join Offre on Offre.id = Candidature.offre inner join Organisation on Offre.organisation = Organisation.SIREN where offre = ? and candidat = ? order by date_candidature DESC", [liste[0], liste[1]], function (err, results) {
			if (err) throw err;
			callback(results);
		});
	},


	readallAndOrgaAndOfferByIDPaginated: function (id, page, limit, callback) { //#TODO BARRE DE RECHERCHE
        db.query("select count(*) as itemCount from Candidature inner join Offre on Offre.id = Candidature.offre inner join Organisation on Offre.organisation = Organisation.SIREN where Candidature.candidat = ? order by date_candidature DESC", id, function (err, count) {
          if (err) throw err;
          const pageCount = Math.ceil(count[0].itemCount / limit);
          const offset = (page - 1) * limit;
          db.query("select * from Candidature inner join Offre on Offre.id = Candidature.offre inner join Organisation on Offre.organisation = Organisation.SIREN where Candidature.candidat = ? order by date_candidature DESC limit ? offset ?", [id, limit, offset], function (err, results) {
            if (err) throw err;
            callback({
              results: results,
              pageCount: pageCount,
              page: page 
            });
          });
        });
      },

	  readKeywordByIDPaginated: function (id, word, page, limit, callback) { //#TODO BARRE DE RECHERCHE
        db.query("select count(*) as itemCount  from (Offre inner join Organisation on Organisation.SIREN = Offre.organisation) inner join Candidature on Offre.id = Candidature.offre where (Offre.titre like ? or Organisation.nom like ?) and Candidature.candidat = ?", ['%' + word + '%', '%' + word + '%', id], function (err, count) {
            if (err) throw err;
            const pageCount = Math.ceil(count[0].itemCount / limit);
            const offset = (page - 1) * limit;
            db.query("select *  from (Offre inner join Organisation on Organisation.SIREN = Offre.organisation) inner join Candidature on Offre.id = Candidature.offre where (Offre.titre like ? or Organisation.nom like ?) and Candidature.candidat = ? limit ? offset ?", ['%' + word + '%', '%' + word + '%', id, limit, offset], function (err, results) {
            if (err) throw err;
            callback({
                results: results,
                pageCount: pageCount,
                page: page 
            });
            });
        });
        },

		readFromTypeByIDPaginated: function (id, type, page, limit, callback) { //#TODO BARRE DE RECHERCHE
			db.query("select count(*) as itemCount  from Candidature inner join Offre on Offre.id = Candidature.offre inner join Organisation on Offre.organisation = Organisation.SIREN where lower(Offre.type_metier) = ? and Candidature.candidat = ? order by date_candidature DESC", [type, id], function (err, count) {
				if (err) throw err;
				const pageCount = Math.ceil(count[0].itemCount / limit);
				const offset = (page - 1) * limit;
				db.query("select *  from Candidature inner join Offre on Offre.id = Candidature.offre inner join Organisation on Offre.organisation = Organisation.SIREN where lower(Offre.type_metier) = ? and Candidature.candidat = ? order by date_candidature DESC limit ? offset ?", [type, id, limit, offset], function (err, results) {
				if (err) throw err;
				callback({
					results: results,
					pageCount: pageCount,
					page: page 
				});
				});
			});
			},

			
		readByOrderDescByIDPaginated: function (id, page, limit, callback) { //#TODO BARRE DE RECHERCHE
			db.query("select count(*) as itemCount   from Candidature inner join Offre on Offre.id = Candidature.offre inner join Organisation on Offre.organisation = Organisation.SIREN where Candidature.candidat = ? order by date_candidature DESC", id, function (err, count) {
				if (err) throw err;
				const pageCount = Math.ceil(count[0].itemCount / limit);
				const offset = (page - 1) * limit;
				db.query("select *  from Candidature inner join Offre on Offre.id = Candidature.offre inner join Organisation on Offre.organisation = Organisation.SIREN where Candidature.candidat = ? order by date_candidature DESC limit ? offset ?", [id, limit, offset], function (err, results) {
				if (err) throw err;
				callback({
					results: results,
					pageCount: pageCount,
					page: page 
				});
				});
			});
			},

			readByOrderByIDPaginated: function (id, page, limit, callback) { //#TODO BARRE DE RECHERCHE
				db.query("select count(*) as itemCount   from Candidature inner join Offre on Offre.id = Candidature.offre inner join Organisation on Offre.organisation = Organisation.SIREN where Candidature.candidat = ? order by date_candidature", id, function (err, count) {
					if (err) throw err;
					const pageCount = Math.ceil(count[0].itemCount / limit);
					const offset = (page - 1) * limit;
					db.query("select *  from Candidature inner join Offre on Offre.id = Candidature.offre inner join Organisation on Offre.organisation = Organisation.SIREN where Candidature.candidat = ? order by date_candidature limit ? offset ?", [id, limit, offset], function (err, results) {
					if (err) throw err;
					callback({
						results: results,
						pageCount: pageCount,
						page: page 
					});
					});
				});
				},





	//-------------------------------------------------------------------------AFFICHAGE CONDITIONNEL-------------------------------------------------------------------------\\
	readallAndOrgaAndOfferByID: function (id, callback) {
		db.query("select * from Candidature inner join Offre on Offre.id = Candidature.offre inner join Organisation on Offre.organisation = Organisation.SIREN where Candidature.candidat = ? order by date_candidature DESC", id, function (err, results) {
			if (err) throw err;
			callback(results);
		});
	},

	readFromTypeByID: function (liste, callback) {
		db.query("select * from Candidature inner join Offre on Offre.id = Candidature.offre inner join Organisation on Offre.organisation = Organisation.SIREN where lower(Offre.type_metier) = ? and Candidature.candidat = ? order by date_candidature DESC", [liste[0], liste[1]], function (err, results) {
			if (err) throw err;
			callback(results);
		});
	},

	readByOrderByID: function (id, callback) {
		db.query("select * from Candidature inner join Offre on Offre.id = Candidature.offre inner join Organisation on Offre.organisation = Organisation.SIREN where Candidature.candidat = ? order by date_candidature", id, function (err, results) {
			if (err) throw err;
			callback(results);
		});
	},
	readByOrderDescByID: function (id, callback) {
		db.query("select * from Candidature inner join Offre on Offre.id = Candidature.offre inner join Organisation on Offre.organisation = Organisation.SIREN where Candidature.candidat = ? order by date_candidature DESC", id, function (err, results) {
			if (err) throw err;
			callback(results);
		});
	},

	readKeywordByID: function (word, callback) { //#TODO BARRE DE RECHERCHE
        db.query("select * from (Offre inner join Organisation on Organisation.SIREN = Offre.organisation) inner join Candidature on Offre.id = Candidature.offre where Offre.titre like ? or Organisation.nom like ? and Candidature.candidat = ?", ['%' + word[1] + '%', '%' + word[1] + '%', word[0]], function
        (err, results) {
            if (err) throw err;
            callback(results);
        });
    },

	uploadInsert: function (liste, callback) {
		db.query("INSERT INTO Candidature (candidat, offre, date_candidature, cv, lettre_motivation) VALUES (?, ?, NOW(), NULL, NULL)", [liste[0], liste[1]], function (err, results) {
		if (err) {
			return callback(err);
		}
		callback(null, results);
		});
	},

	uploadUpdate: function (liste, callback) {
		db.query("UPDATE Candidature SET " + liste[0] + " = ? WHERE candidat = ? and offre = ?", [liste[1], liste[2], liste[3]], function (err, results) {
		if (err) {
			return callback(err);
		}
		callback(null, results);
		});
	},
}
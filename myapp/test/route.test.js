const request = require("supertest");
const app = require("../app");
const session = require("supertest-session");

describe("Test the root path", () => {
    //-------------INDEX-------------
    test("ROOT GET method", done => {
        request(app)
        .get("/")
        .then(response => {
            expect(response.statusCode).toBe(200);
            expect(response.type).toBe('text/html');
            done();
        });
    });
    test("LOGIN GET method", done => {
        request(app)
        .get("/login")
        .then(response => {
            expect(response.statusCode).toBe(200);
            expect(response.type).toBe('text/html');
            done();
        });
    });
    test("SUBSCRIBE GET method", done => {
        request(app)
        .get("/subscribe")
        .then(response => {
            expect(response.statusCode).toBe(200);
            expect(response.type).toBe('text/html');
            done();
        });
    });
    test("CANDIDAT GET method", done => {
        request(app)
        .get("/candidat")
        .then(response => {
            expect(response.statusCode).toBe(200);
            expect(response.type).toBe('text/html');
            done();
        });
    });
    test("ADMIN GET method", done => {
        request(app)
        .get("/admin")
        .then(response => {
            expect(response.statusCode).toBe(200);
            expect(response.type).toBe('text/html');
            done();
        });
    });
    test("RECRUITER GET method", done => {
            request(app)
        .get("/recruiter")
        .then(response => {
            expect(response.statusCode).toBe(200); // redirection
            expect(response.type).toBe('text/html'); // pqs de text car redirection
            done();
        });
    });
    test("CONNEXION POST method", done => {
        request(app)
        .post("/connexion")
        .send({username: "oreo.lu@gmail.com", password: "ori"})
        .then(response => {
            expect(response.statusCode).toBe(200);
            done();
        });
    });
    test('INSCRIPTION POST method', async () => {
        request(app)
        .post('/inscription')
        .send({
            prenom: 'Bob',
            nom: 'Dupont',
            mail: 'bob@example.com',
            tel: '0123456789',
            pwd: 'secret'
          })
        .then(response => {
            expect(response.statusCode).toBe(302);
            expect(response.header['location']).toBe('/login'); 
        });
    });

    
    test("RECRUITER_FORM GET method", done => {
        request(app)
        .get("/candidat/recruiter_form")
        .then(response => {
            expect(response.statusCode).toBe(200);
            expect(response.type).toBe('text/html');
            done();
        });
    });

    test("RECRUITER_REQUEST POST method", done => { 
        request(app)
        .post("/candidat/recruiter_request")
        .send({
            organisation: 'AIRBUS'
          })
        .then(response => {
            expect(response.statusCode).toBe(200);
            expect(response.type).toBe('text/html');
            done();
        });
    });

    test("ADD_ORGA POST method", done => {
        request(app)
        .post("/candidat/add_organisation_request")
        .send({
            siren: '000000009',
            nom: 'ORGA',
            type: 'ORGA',
            adresse: 'ORGA'
          })
        .then(response => {
            expect(response.statusCode).toBe(200);
            expect(response.type).toBe('text/html');
            done();
        });
    });

//-------------------------------------------------------------------------LISTE OFFRES-------------------------------------------------------------------------\\

    test("LISTE_OFFRES GET method", done => {
        request(app)
        .get("/candidat/liste_offres")
        .then(response => {
            expect(response.statusCode).toBe(200);
            expect(response.type).toBe('text/html');
            expect(response.text).toContain('"asc" selected');
            expect(response.text).toContain('"cdi" selected');
            done();
        });
    });

    test("LISTE_OFFRES SEARCH ACCURATE GET method", done => { //#TODO SEARCH ACCURATE GET
        request(app)
        .get("/candidat/liste_offres/search")
        .query({ keyword: "dior" })
        .then(response => {
            expect(response.statusCode).toBe(200);
            expect(response.type).toBe("text/html");
            expect(response.text).toContain('"asc" selected');
            expect(response.text).toContain('"cdi" selected');
            expect(response.text).toContain("resultTitle");
            done();
        });
    });

    test("LISTE_OFFRES SEARCH INACCURATE GET method", done => { //#TODO SEARCH INACCURATE GET
        request(app)
        .get("/candidat/liste_offres/search")
        .query({ keyword: "developper" })
        .then(response => {
            expect(response.statusCode).toBe(200);
            expect(response.type).toBe("text/html");
            expect(response.text).toContain('"asc" selected');
            expect(response.text).toContain('"cdi" selected');
            expect(response.text).not.toContain("resultTitle");
            done();
        });
    });

    test("LISTE_OFFRES TEMPOREL ASC GET method", done => { //#TODO TEMPOREL ASC GET
        request(app)
        .get("/candidat/liste_offres/sort")
        .query({ order: "asc" })
        .then(response => {
            expect(response.statusCode).toBe(200);
            expect(response.type).toBe("text/html");
            expect(response.text).toContain('"asc" selected');
            expect(response.text).not.toContain('"desc" selected');
            expect(response.text).toContain("resultTitle");
            done();
        });
    });

    test("LISTE_OFFRES TEMPOREL DESC GET method", done => { //#TODO TEMPOREL DESC GET
        request(app)
        .get("/candidat/liste_offres/sort")
        .query({ order: "desc" })
        .then(response => {
            expect(response.statusCode).toBe(200);
            expect(response.type).toBe("text/html");
            expect(response.text).toContain('"desc" selected');
            expect(response.text).not.toContain('"asc" selected');
            expect(response.text).toContain("resultTitle");
            done();
        });
    });

    
    test("LISTE_OFFRES POSTE GET method", done => { //#TODO POSTE GET
        request(app)
        .get("/candidat/liste_offres/type")
        .query({ poste: "stage" })
        .then(response => {
            expect(response.statusCode).toBe(200);
            expect(response.type).toBe("text/html");
            expect(response.text).toContain('"stage" selected');
            expect(response.text).not.toContain('"cdi" selected');
            expect(response.text).toContain("resultTitle");
            done();
        });
    });
    
//-------------------------------------------------------------------------LISTE OFFRES-------------------------------------------------------------------------\\

    // test("MES_CANDIDATURES GET method", done => {
    //     const testSession = session(app); // créer la variable testSession
    //     testSession
    //       .post("/connexion") // la route qui crée la session et l'id
    //       .send({ username: "oreo.lu@gmail.com", password: "ori" }) // les données du user test2
    //       .expect(200)
    //       .end(err => {
    //         if (err) return done(err);  
    //         testSession
    //           .get("/candidat/mes_candidatures")
    //           .then(response => {
    //             expect(response.statusCode).toBe(200);  
    //             expect(response.type).toBe("text/html");
    //             expect(response.text).toContain("asc");
    //             expect(response.text).toContain("cdi");
    //             done();
    //           });  
    //       });    
    //   });    

      test("MES_CANDIDATURES DETAILS GET method", done => {
        const offre_id = 9;
        const candidat_id = 4;
        request(app)
        .get(`/candidat/mes_candidatures/details/${offre_id}/${candidat_id}`)
        .query({ order: "desc" })
        .then(response => {
            expect(response.statusCode).toBe(200);
            expect(response.type).toBe("text/html");
            done(); 
          });    
      });    

      test("LISTE OFFRES DETAILS GET method", done => {
        const offre_id = 16;
        request(app)
        .get(`/candidat/liste_offres/details/${offre_id}`)
        .then(response => {
            expect(response.statusCode).toBe(200);
            expect(response.type).toBe("text/html");
            done(); 
          });    
      });    
            
      test("MESSAGE COMPLETE GET method", done => {
        const offre_id = 16;
        request(app)
        .get(`/candidat/liste_offres/details/${offre_id}/candidater/candidature_complete`)
        .then(response => {
            expect(response.statusCode).toBe(200);
            expect(response.type).toBe("text/html");
            done(); 
          });    
      });   

      test("RECRUITERMODE GET method", done => {
        request(app)
        .get("/recruiter/recruitermode")
        .then(response => {
            expect(response.statusCode).toBe(200);
            expect(response.type).toBe('text/html');
            done();
        });
    });

    test("RECRUITERMODE OFFER DEPOSITE GET method", done => {
        request(app)
        .get("/recruiter/recruitermode/offer_deposite")
        .then(response => {
            expect(response.statusCode).toBe(200);
            expect(response.type).toBe('text/html');
            done();
        });
    });

    test("RECRUITERMODE OFFER MODIFICATION GET method", done => {
        const offre_id = 16;
        request(app)
        .get(`/recruiter/recruitermode/list_offers/details/${offre_id}/modifier`)
        .then(response => {
            expect(response.statusCode).toBe(200);
            expect(response.type).toBe('text/html');
            done();
        });
    });

    test("RECRUITERMODE OFFER DETAILS GET method", done => {
        const offre_id = 16;
        request(app)
        .get(`/recruiter/recruitermode/list_offers/details/${offre_id}`)
        .then(response => {
            expect(response.statusCode).toBe(200);
            expect(response.type).toBe('text/html');
            done();
        });
    });

    test("ADMINMODE GET method", done => {
        request(app)
        .get("/admin/adminmode")
        .then(response => {
            expect(response.statusCode).toBe(200);
            expect(response.type).toBe('text/html');
            done();
        });
    });

    test("LISTE_USERS GET method", done => {
        request(app)
        .get("/admin/adminmode/liste_utilisateurs")
        .then(response => {
            expect(response.statusCode).toBe(200);
            expect(response.type).toBe('text/html');
            expect(response.text).toContain('"actif" selected');
            expect(response.text).toContain('"recruteur" selected');
            done();
        });
    });

    test("LISTE_USERS SEARCH ACCURATE GET method", done => { //#TODO SEARCH ACCURATE GET
        request(app)
        .get("/admin/adminmode/liste_utilisateurs/search")
        .query({ keyword: "ori" })
        .then(response => {
            expect(response.statusCode).toBe(200);
            expect(response.type).toBe("text/html");
            expect(response.text).toContain('"actif" selected');
            expect(response.text).toContain('"recruteur" selected');
            expect(response.text).toContain("col p-3 text-center info-list-style-button info-list-bdr8-2");
            done();
        });
    });

    test("LISTE_USERS SEARCH INACCURATE GET method", done => { //#TODO SEARCH INACCURATE GET
        request(app)
        .get("/admin/adminmode/liste_utilisateurs/search")
        .query({ keyword: "developper" })
        .then(response => {
            expect(response.statusCode).toBe(200);
            expect(response.type).toBe("text/html");
            expect(response.text).toContain('"actif" selected');
            expect(response.text).toContain('"recruteur" selected');
            expect(response.text).not.toContain("col p-3 text-center info-list-style-button info-list-bdr8-2");
            done();
        });
    });

    test("LISTE_USERS ACTIVITE GET method", done => { //#TODO POSTE GET
        request(app)
        .get("/admin/adminmode/liste_utilisateurs/activity")
        .query({ activity: "inactif" })
        .then(response => {
            expect(response.statusCode).toBe(200);
            expect(response.type).toBe("text/html");
            expect(response.text).toContain('"inactif" selected');
            expect(response.text).toContain('"recruteur" selected');
            expect(response.text).toContain("col p-3 text-center info-list-style-button info-list-bdr8-2");
            done();
        });
    });

    test("LISTE_USERS TYPE GET method", done => { //#TODO POSTE GET
        request(app)
        .get("/admin/adminmode/liste_utilisateurs/type")
        .query({ type: "admin" })
        .then(response => {
            expect(response.statusCode).toBe(200);
            expect(response.type).toBe("text/html");
            expect(response.text).toContain('"actif" selected');
            expect(response.text).toContain('"admin" selected');
            expect(response.text).toContain("col p-3 text-center info-list-style-button info-list-bdr8-2");
            done();
        });
    });

    test("LISTE_USERS USER MODIFICATION GET method", done => {
        const candidat_id = 4;
        request(app)
        .get(`/admin/adminmode/liste_utilisateurs/details/${candidat_id}/modifier`)
        .then(response => {
            expect(response.statusCode).toBe(200);
            expect(response.type).toBe('text/html');
            done();
        });
    });

    test("LISTE_USERS USER DETAILS GET method", done => {
        const candidat_id = 4;
        request(app)
        .get(`/admin/adminmode/liste_utilisateurs/details/${candidat_id}`)
        .then(response => {
            expect(response.statusCode).toBe(200);
            expect(response.type).toBe('text/html');
            done();
        });
    });

    test("LISTE_ADHESION GET method", done => {
        request(app)
        .get("/admin/adminmode/demandes_adhesion")
        .then(response => {
            expect(response.statusCode).toBe(200);
            expect(response.type).toBe('text/html');
            done();
        });
    });

    test("LISTE_ORGA GET method", done => {
        request(app)
        .get("/admin/adminmode/liste_organisations")
        .then(response => {
            expect(response.statusCode).toBe(200);
            expect(response.text).toContain('"validée" selected');
            expect(response.type).toBe('text/html');
            done();
        });
    });

    test("LISTE_ORGA ACTIVITE GET method", done => { //#TODO POSTE GET
        request(app)
        .get("/admin/adminmode/liste_organisations/activity")
        .query({ activity: "en_attente" })
        .then(response => {
            expect(response.statusCode).toBe(200);
            expect(response.type).toBe("text/html");
            expect(response.text).toContain('"en_attente" selected');
            expect(response.text).toContain("col p-3 text-center info-list-style-button info-list-bdr8-2");
            done();
        });
    });

    test("LISTE_ORGA SEARCH GET method", done => { //#TODO POSTE GET
        request(app)
        .get("/admin/adminmode/liste_organisations/search")
        .query({ keyword: "cha" })
        .then(response => {
            expect(response.statusCode).toBe(200);
            expect(response.type).toBe("text/html");
            expect(response.text).toContain('"validée" selected');
            expect(response.text).toContain("col p-3 text-center info-list-style-button info-list-bdr8-2");
            done();
        });
    });

    test("ORGA DETAILS GET method", done => {
        const orga_siren = 542052766;
        request(app)
        .get(`/admin/adminmode/liste_organisations/details/${orga_siren}`)
        .then(response => {
            expect(response.statusCode).toBe(200);
            expect(response.type).toBe('text/html');
            done();
        });
    });

    test("ORGA DETAILS MODIFICATION GET method", done => {
        const orga_siren = 542052766;
        request(app)
        .get(`/admin/adminmode/liste_organisations/details/${orga_siren}/modifier`)
        .then(response => {
            expect(response.statusCode).toBe(200);
            expect(response.type).toBe('text/html');
            done();
        });
    });

    test("DECONNEXION GET method", done => {
        request(app)
        .get("/deconnexion")
        .then(response => {
            expect(response.statusCode).toBe(302);
            expect(response.type).toBe('text/plain');
            done();
        });
    });

});
const DB= require ("../model/db.js");
const modelCandidat= require ("../model/candidat.js");
const modelAdmin= require ("../model/admin.js");
const modelRecruteur= require ("../model/recruteur.js");
const modelOffres= require ("../model/offres.js");
const modelOrganisation= require ("../model/organisation.js");
const modelCandidature= require ("../model/candidature.js");

/*Sur les conseils du chargé de TD (M. Akheraz), nous avons choisi de ne pas tester chaque élément des modèles.
En effet : les requêtes sql demeurent sensiblement similaires entre les modèles.
Toutes les requêtes SQL du modèle candidat, recruteur et admin ont été testées. Une partie des requêtes du modèle Offres également.
Les requêtes des autres modèles étant structurées de manière identique, nous avons préféré les omettre et concentrer nos efforts sur d'autres éléments du site Web.
*/

jest.mock('../model/db.js', () => ({
    query: jest.fn(),
  }));

describe("Model Tests", () => {

    beforeAll(() => {
    // des instructions à exécuter avant le lancement des tests
    });

    //------------------------------------------TESTS CANDIDATS------------------------------------------//

    test ("candidat : read", ()=>{
        const mockUserData = [{ id: 29, mail: 'test@test.test', pwd : 'test', prenom:'test', nom: 'test', tel: '0123456789', est_recruteur: 'non', organisation: null, est_admin: 'non', date_creation: '2023-05-17 10:59:24', statut: 'actif' }]; // Mock data to be returned by the query

        // Configure the mock behavior for db.query
        DB.query.mockImplementation((query, id, callback) => {
        // Simulate the callback with the mock user data
        callback(null, mockUserData);
        });

        modelCandidat.read(29, (results) => {
            // Assertions on the results
            expect(results).toEqual(mockUserData);
          });

        expect(DB.query).toHaveBeenCalledWith(
            'select * from Utilisateur where id = ?',
            29,
            expect.any(Function)
          );
    });

    test ("candidat : readall",()=>{
        const mockUserData = [{ id: 29, mail: 'test@test.test', pwd : 'test', prenom:'test', nom: 'test', tel: '0123456789', est_recruteur: 'non', organisation: null, est_admin: 'non', date_creation: '2023-05-17 10:59:24', statut: 'actif' },
        { id: 30, mail: 'test1@test1.test1', pwd : 'test1', prenom:'test1', nom: 'test1', tel: '1234563765', est_recruteur: 'oui', organisation: 1, est_admin: 'non', date_creation: '2023-05-17 10:59:24', statut: 'actif' },
        { id: 31, mail: 'test2@test2.test2', pwd : 'test2', prenom:'test2', nom: 'test2', tel: '1234563785', est_recruteur: 'non', organisation: null, est_admin: 'oui', date_creation: '2023-05-17 10:59:24', statut: 'actif' },
        { id: 32, mail: 'test3@test3.test3', pwd : 'test3', prenom:'test3', nom: 'test3', tel: '1334563785', est_recruteur: 'non', organisation: null, est_admin: 'non', date_creation: '2023-05-17 10:59:24', statut: 'inactif' }]; // Mock data to be returned by the query

        // Configure the mock behavior for db.query
        DB.query.mockImplementation((query, callback) => {
        // Simulate the callback with the mock user data
        callback(null, mockUserData);
        });

        modelCandidat.readall((results) => {
            // Assertions on the results
            expect(results).toEqual(mockUserData);
        });

        expect(DB.query).toHaveBeenCalledWith(
            'select * from Utilisateur',
            expect.any(Function));
    });

    test ("candidat : readallCandidat",()=>{
        const mockUserData = [{ id: 29, mail: 'test@test.test', pwd : 'test', prenom:'test', nom: 'test', tel: '0123456789', est_recruteur: 'non', organisation: null, est_admin: 'non', date_creation: '2023-05-17 10:59:24', statut: 'actif' },
        { id: 32, mail: 'test3@test3.test3', pwd : 'test3', prenom:'test3', nom: 'test3', tel: '1334563785', est_recruteur: 'non', organisation: null, est_admin: 'non', date_creation: '2023-05-17 10:59:24', statut: 'inactif' }]; // Mock data to be returned by the query

        // Configure the mock behavior for db.query
        DB.query.mockImplementation((query, callback) => {
        // Simulate the callback with the mock user data
        callback(null, mockUserData);
        });

        modelCandidat.readallCandidat((results) => {
            // Assertions on the results
            expect(results).toEqual(mockUserData);
        });

        expect(DB.query).toHaveBeenCalledWith(
            "select * from Utilisateur where est_admin = 'non' and est_recruteur = 'non'",
            expect.any(Function));
    });

    test ("candidat : readByOrder",()=>{
        const mockUserData = [{ id: 29, mail: 'test@test.test', pwd : 'test', prenom:'test', nom: 'test', tel: '0123456789', est_recruteur: 'non', organisation: null, est_admin: 'non', date_creation: '2023-05-17 10:59:24', statut: 'actif' },
        { id: 30, mail: 'test1@test1.test1', pwd : 'test1', prenom:'test1', nom: 'test1', tel: '1234563765', est_recruteur: 'oui', organisation: 1, est_admin: 'non', date_creation: '2023-05-17 10:59:24', statut: 'actif' },
        { id: 31, mail: 'test2@test2.test2', pwd : 'test2', prenom:'test2', nom: 'test2', tel: '1234563785', est_recruteur: 'non', organisation: null, est_admin: 'oui', date_creation: '2023-05-17 10:59:24', statut: 'actif' },
        { id: 32, mail: 'test3@test3.test3', pwd : 'test3', prenom:'test3', nom: 'test3', tel: '1334563785', est_recruteur: 'non', organisation: null, est_admin: 'non', date_creation: '2023-05-17 10:59:24', statut: 'inactif' }]; // Mock data to be returned by the query

        // Configure the mock behavior for db.query
        DB.query.mockImplementation((query, callback) => {
        // Simulate the callback with the mock user data
        callback(null, mockUserData);
        });

        modelCandidat.readByOrder((results) => {
            // Assertions on the results
            expect(results).toEqual(mockUserData);
        });

        expect(DB.query).toHaveBeenCalledWith(
            "select * from Utilisateur order by date_creation",
            expect.any(Function));
    });

    test ("candidat : readByOrderDesc",()=>{
        const mockUserData = [{ id: 29, mail: 'test@test.test', pwd : 'test', prenom:'test', nom: 'test', tel: '0123456789', est_recruteur: 'non', organisation: null, est_admin: 'non', date_creation: '2023-05-17 10:59:24', statut: 'actif' },
        { id: 30, mail: 'test1@test1.test1', pwd : 'test1', prenom:'test1', nom: 'test1', tel: '1234563765', est_recruteur: 'oui', organisation: 1, est_admin: 'non', date_creation: '2023-05-17 10:59:24', statut: 'actif' },
        { id: 31, mail: 'test2@test2.test2', pwd : 'test2', prenom:'test2', nom: 'test2', tel: '1234563785', est_recruteur: 'non', organisation: null, est_admin: 'oui', date_creation: '2023-05-17 10:59:24', statut: 'actif' },
        { id: 32, mail: 'test3@test3.test3', pwd : 'test3', prenom:'test3', nom: 'test3', tel: '1334563785', est_recruteur: 'non', organisation: null, est_admin: 'non', date_creation: '2023-05-17 10:59:24', statut: 'inactif' }]; // Mock data to be returned by the query

        // Configure the mock behavior for db.query
        DB.query.mockImplementation((query, callback) => {
        // Simulate the callback with the mock user data
        callback(null, mockUserData);
        });

        modelCandidat.readByOrderDesc((results) => {
            // Assertions on the results
            expect(results).toEqual(mockUserData);
        });

        expect(DB.query).toHaveBeenCalledWith(
            "select * from Utilisateur order by date_creation desc",
            expect.any(Function));
    });

    test ("candidat : readByUserStatut",()=>{
        const mockUserData = [{ id: 29, mail: 'test@test.test', pwd : 'test', prenom:'test', nom: 'test', tel: '0123456789', est_recruteur: 'non', organisation: null, est_admin: 'non', date_creation: '2023-05-17 10:59:24', statut: 'actif' },
        { id: 30, mail: 'test1@test1.test1', pwd : 'test1', prenom:'test1', nom: 'test1', tel: '1234563765', est_recruteur: 'oui', organisation: 1, est_admin: 'non', date_creation: '2023-05-17 10:59:24', statut: 'actif' },
        { id: 31, mail: 'test2@test2.test2', pwd : 'test2', prenom:'test2', nom: 'test2', tel: '1234563785', est_recruteur: 'non', organisation: null, est_admin: 'oui', date_creation: '2023-05-17 10:59:24', statut: 'actif' }]; // Mock data to be returned by the query

        // Configure the mock behavior for db.query
        DB.query.mockImplementation((query, list, callback) => {
        // Simulate the callback with the mock user data
        callback(null, mockUserData);
        });

        modelCandidat.readByUserStatut(['non', 'oui', 'non', 'oui'], (results) => {
            // Assertions on the results
            expect(results).toEqual(mockUserData);
        });

        expect(DB.query).toHaveBeenCalledWith(
            "select * from Utilisateur where (est_recruteur = ? or est_recruteur = ?) and (est_admin = ? or est_admin = ?)",
            ['non', 'oui', 'non', 'oui'],
            expect.any(Function));
    });

    test ("candidat : readByUserOrga",()=>{
        const mockUserData = [{ id: 30, mail: 'test1@test1.test1', pwd : 'test1', prenom:'test1', nom: 'test1', tel: '1234563765', est_recruteur: 'oui', organisation: 1, est_admin: 'non', date_creation: '2023-05-17 10:59:24', statut: 'actif' }]; // Mock data to be returned by the query

        // Configure the mock behavior for db.query
        DB.query.mockImplementation((query, organisation, callback) => {
        // Simulate the callback with the mock user data
        callback(null, mockUserData);
        });

        modelCandidat.readByUserOrga(1, (results) => {
            // Assertions on the results
            expect(results).toEqual(mockUserData);
        });

        expect(DB.query).toHaveBeenCalledWith(
        "select * from Utilisateur where organisation = (SELECT SIREN FROM Organisation where nom = ?)",
            1,
            expect.any(Function));
    });

    test ("candidat : readByName",()=>{
        const mockUserData = [{ id: 30, mail: 'test1@test1.test1', pwd : 'test1', prenom:'test1', nom: 'test1', tel: '1234563765', est_recruteur: 'oui', organisation: 1, est_admin: 'non', date_creation: '2023-05-17 10:59:24', statut: 'actif' }]; // Mock data to be returned by the query

        // Configure the mock behavior for db.query
        DB.query.mockImplementation((query, nom, callback) => {
        // Simulate the callback with the mock user data
        callback(null, mockUserData);
        });

        modelCandidat.readByName('test1', (results) => {
            // Assertions on the results
            expect(results).toEqual(mockUserData);
        });

        expect(DB.query).toHaveBeenCalledWith(
            "select * from Utilisateur where nom= ?",
                "test1",
                expect.any(Function));
    });

    test ("candidat : readByFirstname",()=>{
        const mockUserData = [{ id: 30, mail: 'test1@test1.test1', pwd : 'test1', prenom:'test1', nom: 'test1', tel: '1234563765', est_recruteur: 'oui', organisation: 1, est_admin: 'non', date_creation: '2023-05-17 10:59:24', statut: 'actif' }]; // Mock data to be returned by the query

        // Configure the mock behavior for db.query
        DB.query.mockImplementation((query, prenom, callback) => {
        // Simulate the callback with the mock user data
        callback(null, mockUserData);
        });

        modelCandidat.readByFirstname('test1', (results) => {
            // Assertions on the results
            expect(results).toEqual(mockUserData);
        });

        expect(DB.query).toHaveBeenCalledWith(
            "select * from Utilisateur where prenom= ?",
                "test1",
                expect.any(Function));
    });
    
    test ("candidat : readByStatut",()=>{
        const mockUserData = [{ id: 29, mail: 'test@test.test', pwd : 'test', prenom:'test', nom: 'test', tel: '0123456789', est_recruteur: 'non', organisation: null, est_admin: 'non', date_creation: '2023-05-17 10:59:24', statut: 'actif' },
        { id: 30, mail: 'test1@test1.test1', pwd : 'test1', prenom:'test1', nom: 'test1', tel: '1234563765', est_recruteur: 'oui', organisation: 1, est_admin: 'non', date_creation: '2023-05-17 10:59:24', statut: 'actif' },
        { id: 31, mail: 'test2@test2.test2', pwd : 'test2', prenom:'test2', nom: 'test2', tel: '1234563785', est_recruteur: 'non', organisation: null, est_admin: 'oui', date_creation: '2023-05-17 10:59:24', statut: 'actif' }]; // Mock data to be returned by the query

        // Configure the mock behavior for db.query
        DB.query.mockImplementation((query, statut, callback) => {
        // Simulate the callback with the mock user data
        callback(null, mockUserData);
        });

        modelCandidat.readByStatut('actif', (results) => {
            // Assertions on the results
            expect(results).toEqual(mockUserData);
        });

        expect(DB.query).toHaveBeenCalledWith(
            "select * from Utilisateur where statut= ?",
                "actif",
                expect.any(Function));
    });

    test ("candidat : readByTel",()=>{
        const mockUserData = [{ id: 30, mail: 'test1@test1.test1', pwd : 'test1', prenom:'test1', nom: 'test1', tel: '1234563765', est_recruteur: 'oui', organisation: 1, est_admin: 'non', date_creation: '2023-05-17 10:59:24', statut: 'actif' }]; // Mock data to be returned by the query

        // Configure the mock behavior for db.query
        DB.query.mockImplementation((query, tel, callback) => {
        // Simulate the callback with the mock user data
        callback(null, mockUserData);
        });

        modelCandidat.readByTel('1234563765', (results) => {
            // Assertions on the results
            expect(results).toEqual(mockUserData);
        });

        expect(DB.query).toHaveBeenCalledWith(
            "select * from Utilisateur where tel= ?",
                "1234563765",
                expect.any(Function));
    });

    test ("candidat : readallAdhesionRecruteurByOrga",()=>{
        const mockUserData = [{ id: 29, mail: 'test@test.test', pwd : 'test', prenom:'test', nom: 'test', tel: '0123456789', est_recruteur: 'en_attente', organisation: 1, est_admin: 'non', date_creation: '2023-05-17 10:59:24', statut: 'actif' },
        { id: 31, mail: 'test2@test2.test2', pwd : 'test2', prenom:'test2', nom: 'test2', tel: '1234563785', est_recruteur: 'en_attente', organisation: 1, est_admin: 'oui', date_creation: '2023-05-17 10:59:24', statut: 'actif' }];

        // Configure the mock behavior for db.query
        DB.query.mockImplementation((query, id, callback) => {
        // Simulate the callback with the mock user data
        callback(null, mockUserData);
        });

        modelCandidat.readallAdhesionRecruteurByOrga(1, (results) => {
            // Assertions on the results
            expect(results).toEqual(mockUserData);
        });

        expect(DB.query).toHaveBeenCalledWith(
            "select * from Utilisateur where est_recruteur = 'en_attente' and organisation = (select organisation from Utilisateur where id = ?)",
                1,
                expect.any(Function));
    });

    test ("candidat : readallAdhesionAdmin",()=>{
        const mockUserData = [{ id: 29, mail: 'test@test.test', pwd : 'test', prenom:'test', nom: 'test', tel: '0123456789', est_recruteur: 'non', organisation: null, est_admin: 'en_attente', date_creation: '2023-05-17 10:59:24', statut: 'actif' },
        { id: 31, mail: 'test2@test2.test2', pwd : 'test2', prenom:'test2', nom: 'test2', tel: '1234563785', est_recruteur: 'non', organisation: null, est_admin: 'en_attente', date_creation: '2023-05-17 10:59:24', statut: 'actif' }];

        // Configure the mock behavior for db.query
        DB.query.mockImplementation((query, callback) => {
        // Simulate the callback with the mock user data
        callback(null, mockUserData);
        });

        modelCandidat.readallAdhesionAdmin((results) => {
            // Assertions on the results
            expect(results).toEqual(mockUserData);
        });

        expect(DB.query).toHaveBeenCalledWith(
            "select * from Utilisateur where est_admin = 'en_attente'",
                expect.any(Function));
    });

    test ("candidat : connexionPost",()=>{
        const mockUserData = [{ id: 29, mail: 'test@test.test', pwd : 'test', prenom:'test', nom: 'test', tel: '0123456789', est_recruteur: 'non', organisation: null, est_admin: 'en_attente', date_creation: '2023-05-17 10:59:24', statut: 'actif' }];

        // Configure the mock behavior for db.query
        DB.query.mockImplementation((query, list, callback) => {
        // Simulate the callback with the mock user data
        callback(null, mockUserData);
        });

        modelCandidat.connexionPost(['test@test.test', 'test'], (err, results) => {
            // Assertions on the results
            expect(results).toEqual(mockUserData);
        });

        expect(DB.query).toHaveBeenCalledWith(
            "SELECT * FROM Utilisateur WHERE mail = ? AND pwd = ?",
            ['test@test.test', 'test'],
                expect.any(Function));
    });

    test ("candidat : readKeyword",()=>{
        const mockUserData = [{ id: 29, mail: 'test@test.test', pwd : 'test', prenom:'test', nom: 'test', tel: '0123456789', est_recruteur: 'non', organisation: null, est_admin: 'non', date_creation: '2023-05-17 10:59:24', statut: 'actif' },
        { id: 30, mail: 'test1@test1.test1', pwd : 'test1', prenom:'test1', nom: 'test1', tel: '1234563765', est_recruteur: 'oui', organisation: 1, est_admin: 'non', date_creation: '2023-05-17 10:59:24', statut: 'actif' },
        { id: 31, mail: 'test2@test2.test2', pwd : 'test2', prenom:'test2', nom: 'test2', tel: '1234563785', est_recruteur: 'non', organisation: null, est_admin: 'oui', date_creation: '2023-05-17 10:59:24', statut: 'actif' }]; // Mock data to be returned by the query

        // Configure the mock behavior for db.query
        DB.query.mockImplementation((query, word, callback) => {
        // Simulate the callback with the mock user data
        callback(null, mockUserData);
        });

        modelCandidat.readKeyword('test', (results) => {
            // Assertions on the results
            expect(results).toEqual(mockUserData);
        });

        expect(DB.query).toHaveBeenCalledWith(
            "select * from Utilisateur left outer join Organisation on Organisation.SIREN = Utilisateur.organisation where Utilisateur.nom like ? or Utilisateur.prenom like ? or Utilisateur.tel like ? or Utilisateur.mail like ? or Organisation.nom like ?",
            ['%test%', '%test%', '%test%', '%test%', '%test%'],
                expect.any(Function));
    });

    test ("candidat : inscriptionPost",()=>{
    const mockInsertedData = ['test', 'test', 'test@test.test', '0123456789', 'test'];
        
    // Configure the mock behavior for connection.query
    DB.query.mockImplementation((query, data, callback) => {
            // Simulate the callback with no error
            callback(null);
        });
    
        // Call the function you want to test
        modelCandidat.inscriptionPost(mockInsertedData, (error, results) => {
            // Assertions on the error
            expect(error).toBeNull();
        });

        expect(DB.query).toHaveBeenCalledWith(
            "INSERT INTO Utilisateur (prenom, nom, mail, tel, pwd, est_admin, est_recruteur, statut) VALUES (?, ?, ?, ?, ?, 'non', 'non', 'actif')",
            ['test', 'test', 'test@test.test', '0123456789', 'test'],
                expect.any(Function));
    });

    test ("candidat : applyUpdate",()=>{
        const mockUpdatedData = ["prenom", "test", 29];
            
        // Configure the mock behavior for connection.query
        DB.query.mockImplementation((query, data, callback) => {
                // Simulate the callback with no error
                callback(null);
        });
        
        // Call the function you want to test
        modelCandidat.applyUpdate(mockUpdatedData, (error, results) => {
            // Assertions on the error
            expect(error).toBeNull();
        });
        
        expect(DB.query).toHaveBeenCalledWith(
            "UPDATE Utilisateur SET prenom = ? WHERE id = ?",
            ['test', 29],
            expect.any(Function));
    });

    test ("candidat : supprUser",()=>{
        const mockDeletedId = 1;
            
        // Configure the mock behavior for connection.query
        DB.query.mockImplementation((query, id, callback) => {
                // Simulate the callback with no error
                callback(null);
            });
        
            // Call the function you want to test
            modelCandidat.supprUser(mockDeletedId, (error, results) => {
                // Assertions on the error
                expect(error).toBeNull();
            });

            expect(DB.query).toHaveBeenCalledWith(
                "UPDATE Utilisateur SET statut = 'inactif' WHERE id = ?",
               1,
                expect.any(Function));
    });

    test ("candidat : requestUpdate",()=>{
            
        // Configure the mock behavior for connection.query
        DB.query.mockImplementation((query, id, callback) => {
                // Simulate the callback with no error
                callback(null);
            });
        
            // Call the function you want to test
            modelCandidat.requestUpdate([1, 1], (error, results) => {
                // Assertions on the error
                expect(error).toBeNull();
            });

            expect(DB.query).toHaveBeenCalledWith(
                "UPDATE Utilisateur SET organisation = ?, est_recruteur = 'en_attente' WHERE id = ?",
                [1, 1],
                expect.any(Function));
    });

    test ("candidat : postAcceptUpdate",()=>{
            
        // Configure the mock behavior for connection.query
        DB.query.mockImplementation((query, id, callback) => {
                // Simulate the callback with no error
                callback(null);
            });
        
            // Call the function you want to test
            modelCandidat.postAcceptUpdate(1, (error, results) => {
                // Assertions on the error
                expect(error).toBeNull();
            });

            expect(DB.query).toHaveBeenCalledWith(
                "UPDATE Utilisateur SET est_recruteur = 'oui' WHERE id = ?",
                1,
                expect.any(Function));
    });

    test ("candidat : postRefuseUpdate",()=>{
            
        // Configure the mock behavior for connection.query
        DB.query.mockImplementation((query, id, callback) => {
                // Simulate the callback with no error
                callback(null);
            });
        
            // Call the function you want to test
            modelCandidat.postRefuseUpdate(1, (error, results) => {
                // Assertions on the error
                expect(error).toBeNull();
            });

            expect(DB.query).toHaveBeenCalledWith(
                "UPDATE Utilisateur SET organisation = NULL, est_recruteur = 'non' WHERE id = ?",
                1,
                expect.any(Function));
    });

    //------------------------------------------TESTS ADMINS------------------------------------------//

    test ("admin : read", ()=>{
        const mockUserData = [{ id: 29, mail: 'test@test.test', pwd : 'test', prenom:'test', nom: 'test', tel: '0123456789', est_recruteur: 'non', organisation: null, est_admin: 'oui', date_creation: '2023-05-17 10:59:24', statut: 'actif' }]; // Mock data to be returned by the query

        // Configure the mock behavior for db.query
        DB.query.mockImplementation((query, id, callback) => {
        // Simulate the callback with the mock user data
        callback(null, mockUserData);
        });

        modelAdmin.read(29, (results) => {
            // Assertions on the results
            expect(results).toEqual(mockUserData);
          });
    });

    test ("admin : readall",()=>{
        const mockUserData = [{ id: 29, mail: 'test@test.test', pwd : 'test', prenom:'test', nom: 'test', tel: '0123456789', est_recruteur: 'non', organisation: null, est_admin: 'oui', date_creation: '2023-05-17 10:59:24', statut: 'actif' },
        { id: 30, mail: 'test1@test1.test1', pwd : 'test1', prenom:'test1', nom: 'test1', tel: '1234563765', est_recruteur: 'non', organisation: null, est_admin: 'oui', date_creation: '2023-05-17 10:59:24', statut: 'actif' },
        { id: 31, mail: 'test2@test2.test2', pwd : 'test2', prenom:'test2', nom: 'test2', tel: '1234563785', est_recruteur: 'non', organisation: null, est_admin: 'oui', date_creation: '2023-05-17 10:59:24', statut: 'actif' },
        { id: 32, mail: 'test3@test3.test3', pwd : 'test3', prenom:'test3', nom: 'test3', tel: '1334563785', est_recruteur: 'non', organisation: null, est_admin: 'oui', date_creation: '2023-05-17 10:59:24', statut: 'inactif' }]; // Mock data to be returned by the query

        // Configure the mock behavior for db.query
        DB.query.mockImplementation((query, callback) => {
        // Simulate the callback with the mock user data
        callback(null, mockUserData);
        });

        modelAdmin.readall((results) => {
            // Assertions on the results
            expect(results).toEqual(mockUserData);
        });
    });

    test ("admin : readByOrder",()=>{
        const mockUserData = [{ id: 29, mail: 'test@test.test', pwd : 'test', prenom:'test', nom: 'test', tel: '0123456789', est_recruteur: 'non', organisation: null, est_admin: 'oui', date_creation: '2023-05-17 10:59:24', statut: 'actif' },
        { id: 30, mail: 'test1@test1.test1', pwd : 'test1', prenom:'test1', nom: 'test1', tel: '1234563765', est_recruteur: 'non', organisation: null, est_admin: 'oui', date_creation: '2023-05-17 10:59:24', statut: 'actif' },
        { id: 31, mail: 'test2@test2.test2', pwd : 'test2', prenom:'test2', nom: 'test2', tel: '1234563785', est_recruteur: 'non', organisation: null, est_admin: 'oui', date_creation: '2023-05-17 10:59:24', statut: 'actif' },
        { id: 32, mail: 'test3@test3.test3', pwd : 'test3', prenom:'test3', nom: 'test3', tel: '1334563785', est_recruteur: 'non', organisation: null, est_admin: 'oui', date_creation: '2023-05-17 10:59:24', statut: 'inactif' }]; // Mock data to be returned by the query

        // Configure the mock behavior for db.query
        DB.query.mockImplementation((query, callback) => {
        // Simulate the callback with the mock user data
        callback(null, mockUserData);
        });

        modelAdmin.readByOrder((results) => {
            // Assertions on the results
            expect(results).toEqual(mockUserData);
        });
    });

    test ("admin : readByOrderDesc",()=>{
        const mockUserData = [{ id: 29, mail: 'test@test.test', pwd : 'test', prenom:'test', nom: 'test', tel: '0123456789', est_recruteur: 'non', organisation: null, est_admin: 'oui', date_creation: '2023-05-17 10:59:24', statut: 'actif' },
        { id: 30, mail: 'test1@test1.test1', pwd : 'test1', prenom:'test1', nom: 'test1', tel: '1234563765', est_recruteur: 'non', organisation: null, est_admin: 'oui', date_creation: '2023-05-17 10:59:24', statut: 'actif' },
        { id: 31, mail: 'test2@test2.test2', pwd : 'test2', prenom:'test2', nom: 'test2', tel: '1234563785', est_recruteur: 'non', organisation: null, est_admin: 'oui', date_creation: '2023-05-17 10:59:24', statut: 'actif' },
        { id: 32, mail: 'test3@test3.test3', pwd : 'test3', prenom:'test3', nom: 'test3', tel: '1334563785', est_recruteur: 'non', organisation: null, est_admin: 'oui', date_creation: '2023-05-17 10:59:24', statut: 'inactif' }]; // Mock data to be returned by the query

        // Configure the mock behavior for db.query
        DB.query.mockImplementation((query, callback) => {
        // Simulate the callback with the mock user data
        callback(null, mockUserData);
        });

        modelAdmin.readByOrderDesc((results) => {
            // Assertions on the results
            expect(results).toEqual(mockUserData);
        });
    });

    test ("admin : readByName", ()=>{
        const mockUserData = [{ id: 29, mail: 'test@test.test', pwd : 'test', prenom:'test', nom: 'test', tel: '0123456789', est_recruteur: 'non', organisation: null, est_admin: 'oui', date_creation: '2023-05-17 10:59:24', statut: 'actif' }]; // Mock data to be returned by the query

        // Configure the mock behavior for db.query
        DB.query.mockImplementation((query, name, callback) => {
        // Simulate the callback with the mock user data
        callback(null, mockUserData);
        });

        modelAdmin.readByName('test', (results) => {
            // Assertions on the results
            expect(results).toEqual(mockUserData);
          });
    });

    test ("admin : readByFirstname", ()=>{
        const mockUserData = [{ id: 29, mail: 'test@test.test', pwd : 'test', prenom:'test', nom: 'test', tel: '0123456789', est_recruteur: 'non', organisation: null, est_admin: 'oui', date_creation: '2023-05-17 10:59:24', statut: 'actif' }]; // Mock data to be returned by the query

        // Configure the mock behavior for db.query
        DB.query.mockImplementation((query, fname, callback) => {
        // Simulate the callback with the mock user data
        callback(null, mockUserData);
        });

        modelAdmin.readByFirstname('test', (results) => {
            // Assertions on the results
            expect(results).toEqual(mockUserData);
          });
    });

    test ("admin : readByStatut", ()=>{
        const mockUserData = [{ id: 29, mail: 'test@test.test', pwd : 'test', prenom:'test', nom: 'test', tel: '0123456789', est_recruteur: 'non', organisation: null, est_admin: 'oui', date_creation: '2023-05-17 10:59:24', statut: 'actif' },
        { id: 30, mail: 'test1@test1.test1', pwd : 'test1', prenom:'test1', nom: 'test1', tel: '1234563765', est_recruteur: 'non', organisation: null, est_admin: 'oui', date_creation: '2023-05-17 10:59:24', statut: 'actif' }]; // Mock data to be returned by the query

        // Configure the mock behavior for db.query
        DB.query.mockImplementation((query, status, callback) => {
        // Simulate the callback with the mock user data
        callback(null, mockUserData);
        });

        modelAdmin.readByStatut('actif', (results) => {
            // Assertions on the results
            expect(results).toEqual(mockUserData);
          });
    });

    test ("admin : readByTel", ()=>{
        const mockUserData = [{ id: 29, mail: 'test@test.test', pwd : 'test', prenom:'test', nom: 'test', tel: '0123456789', est_recruteur: 'non', organisation: null, est_admin: 'oui', date_creation: '2023-05-17 10:59:24', statut: 'actif' }]; // Mock data to be returned by the query

        // Configure the mock behavior for db.query
        DB.query.mockImplementation((query, tel, callback) => {
        // Simulate the callback with the mock user data
        callback(null, mockUserData);
        });

        modelAdmin.readByTel('0123456789', (results) => {
            // Assertions on the results
            expect(results).toEqual(mockUserData);
          });
    });

    //------------------------------------------TESTS RECRUTEURS------------------------------------------//

    test ("recruteur : read", ()=>{
        const mockUserData = [{ id: 29, mail: 'test@test.test', pwd : 'test', prenom:'test', nom: 'test', tel: '0123456789', est_recruteur: 'oui', organisation: 1, est_admin: 'non', date_creation: '2023-05-17 10:59:24', statut: 'actif' }]; // Mock data to be returned by the query

        // Configure the mock behavior for db.query
        DB.query.mockImplementation((query, id, callback) => {
        // Simulate the callback with the mock user data
        callback(null, mockUserData);
        });

        modelRecruteur.read(29, (results) => {
            // Assertions on the results
            expect(results).toEqual(mockUserData);
          });
    });

    test ("recruteur : readall",()=>{
        const mockUserData = [{ id: 29, mail: 'test@test.test', pwd : 'test', prenom:'test', nom: 'test', tel: '0123456789', est_recruteur: 'oui', organisation: 4, est_admin: 'non', date_creation: '2023-05-17 10:59:24', statut: 'actif' },
        { id: 30, mail: 'test1@test1.test1', pwd : 'test1', prenom:'test1', nom: 'test1', tel: '1234563765', est_recruteur: 'oui', organisation: 1, est_admin: 'non', date_creation: '2023-05-17 10:59:24', statut: 'actif' },
        { id: 31, mail: 'test2@test2.test2', pwd : 'test2', prenom:'test2', nom: 'test2', tel: '1234563785', est_recruteur: 'oui', organisation: 2, est_admin: 'non', date_creation: '2023-05-17 10:59:24', statut: 'actif' },
        { id: 32, mail: 'test3@test3.test3', pwd : 'test3', prenom:'test3', nom: 'test3', tel: '1334563785', est_recruteur: 'oui', organisation: 3, est_admin: 'non', date_creation: '2023-05-17 10:59:24', statut: 'inactif' }]; // Mock data to be returned by the query

        // Configure the mock behavior for db.query
        DB.query.mockImplementation((query, callback) => {
        // Simulate the callback with the mock user data
        callback(null, mockUserData);
        });

        modelRecruteur.readall((results) => {
            // Assertions on the results
            expect(results).toEqual(mockUserData);
        });
    });

    test ("recruteur : readByOrga", ()=>{
        const mockUserData = [{ id: 29, mail: 'test@test.test', pwd : 'test', prenom:'test', nom: 'test', tel: '0123456789', est_recruteur: 'oui', organisation: 1, est_admin: 'non', date_creation: '2023-05-17 10:59:24', statut: 'actif' }]; // Mock data to be returned by the query

        // Configure the mock behavior for db.query
        DB.query.mockImplementation((query, organisation, callback) => {
        // Simulate the callback with the mock user data
        callback(null, mockUserData);
        });

        modelRecruteur.readByOrga(1, (results) => {
            // Assertions on the results
            expect(results).toEqual(mockUserData);
          });
    });

    test ("recruteur : readByOrder",()=>{
        const mockUserData = [{ id: 29, mail: 'test@test.test', pwd : 'test', prenom:'test', nom: 'test', tel: '0123456789', est_recruteur: 'oui', organisation: 4, est_admin: 'non', date_creation: '2023-05-17 10:59:24', statut: 'actif' },
        { id: 30, mail: 'test1@test1.test1', pwd : 'test1', prenom:'test1', nom: 'test1', tel: '1234563765', est_recruteur: 'oui', organisation: 1, est_admin: 'non', date_creation: '2023-05-17 10:59:24', statut: 'actif' },
        { id: 31, mail: 'test2@test2.test2', pwd : 'test2', prenom:'test2', nom: 'test2', tel: '1234563785', est_recruteur: 'oui', organisation: 2, est_admin: 'non', date_creation: '2023-05-17 10:59:24', statut: 'actif' },
        { id: 32, mail: 'test3@test3.test3', pwd : 'test3', prenom:'test3', nom: 'test3', tel: '1334563785', est_recruteur: 'oui', organisation: 3, est_admin: 'non', date_creation: '2023-05-17 10:59:24', statut: 'inactif' }]; // Mock data to be returned by the query

        // Configure the mock behavior for db.query
        DB.query.mockImplementation((query, callback) => {
        // Simulate the callback with the mock user data
        callback(null, mockUserData);
        });

        modelRecruteur.readByOrder((results) => {
            // Assertions on the results
            expect(results).toEqual(mockUserData);
        });
    });

    test ("recruteur : readByOrderDesc",()=>{
        const mockUserData = [{ id: 29, mail: 'test@test.test', pwd : 'test', prenom:'test', nom: 'test', tel: '0123456789', est_recruteur: 'oui', organisation: 4, est_admin: 'non', date_creation: '2023-05-17 10:59:24', statut: 'actif' },
        { id: 30, mail: 'test1@test1.test1', pwd : 'test1', prenom:'test1', nom: 'test1', tel: '1234563765', est_recruteur: 'oui', organisation: 1, est_admin: 'non', date_creation: '2023-05-17 10:59:24', statut: 'actif' },
        { id: 31, mail: 'test2@test2.test2', pwd : 'test2', prenom:'test2', nom: 'test2', tel: '1234563785', est_recruteur: 'oui', organisation: 2, est_admin: 'non', date_creation: '2023-05-17 10:59:24', statut: 'actif' },
        { id: 32, mail: 'test3@test3.test3', pwd : 'test3', prenom:'test3', nom: 'test3', tel: '1334563785', est_recruteur: 'oui', organisation: 3, est_admin: 'non', date_creation: '2023-05-17 10:59:24', statut: 'inactif' }]; // Mock data to be returned by the query

        // Configure the mock behavior for db.query
        DB.query.mockImplementation((query, callback) => {
        // Simulate the callback with the mock user data
        callback(null, mockUserData);
        });

        modelRecruteur.readByOrderDesc((results) => {
            // Assertions on the results
            expect(results).toEqual(mockUserData);
        });
    });

    test ("recruteur : readByName", ()=>{
        const mockUserData = [{ id: 29, mail: 'test@test.test', pwd : 'test', prenom:'test', nom: 'test', tel: '0123456789', est_recruteur: 'oui', organisation: 1, est_admin: 'non', date_creation: '2023-05-17 10:59:24', statut: 'actif' }]; // Mock data to be returned by the query

        // Configure the mock behavior for db.query
        DB.query.mockImplementation((query, name, callback) => {
        // Simulate the callback with the mock user data
        callback(null, mockUserData);
        });

        modelRecruteur.readByName('test', (results) => {
            // Assertions on the results
            expect(results).toEqual(mockUserData);
          });
    });

    test ("recruteur : readByFirstname", ()=>{
        const mockUserData = [{ id: 29, mail: 'test@test.test', pwd : 'test', prenom:'test', nom: 'test', tel: '0123456789', est_recruteur: 'oui', organisation: 1, est_admin: 'non', date_creation: '2023-05-17 10:59:24', statut: 'actif' }]; // Mock data to be returned by the query

        // Configure the mock behavior for db.query
        DB.query.mockImplementation((query, fname, callback) => {
        // Simulate the callback with the mock user data
        callback(null, mockUserData);
        });

        modelRecruteur.readByFirstname('test', (results) => {
            // Assertions on the results
            expect(results).toEqual(mockUserData);
          });
    });

    test ("recruteur : readByStatut",()=>{
        const mockUserData = [{ id: 29, mail: 'test@test.test', pwd : 'test', prenom:'test', nom: 'test', tel: '0123456789', est_recruteur: 'oui', organisation: 4, est_admin: 'non', date_creation: '2023-05-17 10:59:24', statut: 'actif' },
        { id: 30, mail: 'test1@test1.test1', pwd : 'test1', prenom:'test1', nom: 'test1', tel: '1234563765', est_recruteur: 'oui', organisation: 1, est_admin: 'non', date_creation: '2023-05-17 10:59:24', statut: 'actif' },
        { id: 31, mail: 'test2@test2.test2', pwd : 'test2', prenom:'test2', nom: 'test2', tel: '1234563785', est_recruteur: 'oui', organisation: 2, est_admin: 'non', date_creation: '2023-05-17 10:59:24', statut: 'actif' }]; // Mock data to be returned by the query

        // Configure the mock behavior for db.query
        DB.query.mockImplementation((query, status, callback) => {
        // Simulate the callback with the mock user data
        callback(null, mockUserData);
        });

        modelRecruteur.readByStatut('actif', (results) => {
            // Assertions on the results
            expect(results).toEqual(mockUserData);
        });
    });

    test ("recruteur : readByTel", ()=>{
        const mockUserData = [{ id: 29, mail: 'test@test.test', pwd : 'test', prenom:'test', nom: 'test', tel: '0123456789', est_recruteur: 'oui', organisation: 1, est_admin: 'non', date_creation: '2023-05-17 10:59:24', statut: 'actif' }]; // Mock data to be returned by the query

        // Configure the mock behavior for db.query
        DB.query.mockImplementation((query, fname, callback) => {
        // Simulate the callback with the mock user data
        callback(null, mockUserData);
        });

        modelRecruteur.readByTel('0123456789', (results) => {
            // Assertions on the results
            expect(results).toEqual(mockUserData);
          });
    });

    //------------------------------------------TESTS OFFRES------------------------------------------//
    
    test ("recruteur : read", ()=>{
        const mockUserData = [{ id: 1, organisation : 1, recruteur: 1, titre: "test", statut: "publiée", descr:"test", lieu: "test", rythme: "Plein temps", salaire: 1000.50, type_meter: "cdd"}]        // Configure the mock behavior for db.query
        
        DB.query.mockImplementation((query, id, callback) => {
        // Simulate the callback with the mock user data
        callback(null, mockUserData);
        });

        modelOffres.read(1, (results) => {
            // Assertions on the results
            expect(results).toEqual(mockUserData);
          });
    });

    test ("recruteur : readAndOrga", ()=>{
        const mockUserData = [{ id: 1, organisation : 1, recruteur: 3, titre: "test", statut: "publiée", descr:"test", lieu: "test", rythme: "Plein temps", salaire: 1000.50, type_meter: "cdd"}]; // Mock data to be returned by the query
         // Mock data to be returned by the query

        // Configure the mock behavior for db.query
        DB.query.mockImplementation((query, id, callback) => {
        // Simulate the callback with the mock user data
        callback(null, mockUserData);
        });

        modelOffres.readAndOrga(1, (results) => {
            // Assertions on the results
            console.log(results);
            expect(results).toEqual(mockUserData);
          });
    });

    test ("recruteur : readallAndOrgaValidASC", ()=>{
        const mockUserData = [{ id: 1, organisation : 1, recruteur: 3, titre: "test", statut: "publiée", descr:"test", lieu: "test", rythme: "Plein temps", salaire: 1000.50, type_meter: "cdd"},
        { id: 2, organisation : 1, recruteur: 2, titre: "test", statut: "publiée", descr:"test", lieu: "test", rythme: "Plein temps", salaire: 1000.50, type_meter: "cdd"},
        { id: 3, organisation : 2, recruteur: 3, titre: "test", statut: "publiée", descr:"test", lieu: "test", rythme: "Alternance", salaire: 1000.50, type_meter: "cdi"}]; // Mock data to be returned by the query
         // Mock data to be returned by the query

        // Configure the mock behavior for db.query
        DB.query.mockImplementation((query, callback) => {
        // Simulate the callback with the mock user data
        callback(null, mockUserData);
        });

        modelOffres.readallAndOrgaValidASC((results) => {
            // Assertions on the results
            expect(results).toEqual(mockUserData);
          });
    });

    test ("recruteur : readFromType", ()=>{
        const mockUserData = [{ id: 1, organisation : 1, recruteur: 3, titre: "test", statut: "publiée", descr:"test", lieu: "test", rythme: "Plein temps", salaire: 1000.50, type_meter: "cdd"},
        { id: 2, organisation : 1, recruteur: 2, titre: "test", statut: "publiée", descr:"test", lieu: "test", rythme: "Plein temps", salaire: 1000.50, type_meter: "cdd"}]; // Mock data to be returned by the query
         // Mock data to be returned by the query

        // Configure the mock behavior for db.query
        DB.query.mockImplementation((query, postetype, callback) => {
        // Simulate the callback with the mock user data
        callback(null, mockUserData);
        });

        modelOffres.readFromType("cdd", (results) => {
            // Assertions on the results
            expect(results).toEqual(mockUserData);
          });
    });

    test ("recruteur : readKeyword", ()=>{
        const mockUserData = [{ id: 1, organisation : 1, recruteur: 3, titre: "test", statut: "publiée", descr:"test", lieu: "test", rythme: "Plein temps", salaire: 1000.50, type_meter: "cdd"},
        { id: 2, organisation : 1, recruteur: 2, titre: "test", statut: "publiée", descr:"test", lieu: "test", rythme: "Plein temps", salaire: 1000.50, type_meter: "cdd"}]; // Mock data to be returned by the query
         // Mock data to be returned by the query

        // Configure the mock behavior for db.query
        DB.query.mockImplementation((query, postetype, callback) => {
        // Simulate the callback with the mock user data
        callback(null, mockUserData);
        });

        modelOffres.readKeyword("test", (results) => {
            // Assertions on the results
            expect(results).toEqual(mockUserData);
          });
    });

    test ("recruteur : readRecruiter", ()=>{
        const mockUserData = [{ id: 1, organisation : 1, recruteur: 2, titre: "test", statut: "publiée", descr:"test", lieu: "test", rythme: "Plein temps", salaire: 1000.50, type_meter: "cdd"},
        { id: 2, organisation : 1, recruteur: 2, titre: "test", statut: "publiée", descr:"test", lieu: "test", rythme: "Plein temps", salaire: 1000.50, type_meter: "cdd"}]; // Mock data to be returned by the query
         // Mock data to be returned by the query

        // Configure the mock behavior for db.query
        DB.query.mockImplementation((query, postetype, callback) => {
        // Simulate the callback with the mock user data
        callback(null, mockUserData);
        });

        modelOffres.readRecruiter(2, (results) => {
            // Assertions on the results
            expect(results).toEqual(mockUserData);
          });
    });

    //const mockUserData = [{ SIREN: 1, nom: 'test', type_organisation : 'test', siege:'test', statut: 'validée'}]; // Mock data to be returned by the query
/*
    test ("offre : readRecruiterFromType",()=>{
        lenght=null;
        function cbRead(resultat){
            lenght = resultat.lenght;
            expect(lenght).toBe(1);
        }
        list = ["cdd", 2];
        modelOffres.readRecruiterASC(list, cbRead);
    });   
    
    test ("offre : readRecruiterFromStatut",()=>{
        lenght=null;
        function cbRead(resultat){
            lenght = resultat.lenght;
            expect(lenght).toBe(1);
        }
        list = ["publiée", 2];
        modelOffres.readRecruiterFromStatut(list, cbRead);
    });

    test ("offre : readRecruiterFromStatut",()=>{
        lenght=null;
        function cbRead(resultat){
            lenght = resultat.lenght;
            expect(lenght).toBe(2);
        }
        list = [2, "O", "C"];
        modelOffres.readRecruiterFromStatut(list, cbRead);
    });

    test ("offre : readall",()=>{
        lenght=null;
        function cbRead(resultat){
            lenght = resultat.lenght;
            expect(lenght).toBe(10);
        }
        modelOffres.readall(cbRead);
    });

    test ("offre : readallAndOrga",()=>{
        lenght=null;
        function cbRead(resultat){
            lenght = resultat.lenght;
            expect(lenght).toBe(10);
        }
        modelOffres.readallAndOrga(cbRead);
    });

    test ("offre postPublishOffer",()=>{
        id = null;
        function cbRead(resultat){
            id = resultat.insertId;
            expect(id).toBe(6);
        }
        modelOffres.postPublishOffer([2, "test_titre", "test_descr", "test_type", 123], cbRead);
    });

    test ("offre expiredUpdate",()=>{
        affected_rows = null;
        function cbRead(resultat){
            affected_rows = resultat.affectedRows;
            expect(affected_rows).toBe(1);
        }
        modelOffres.expiredUpdate(6, cbRead);
    });

    test ("offre applyUpdate",()=>{
        affected_rows = null;
        function cbRead(resultat){
            affected_rows = resultat.affectedRows;
            expect(affected_rows).toBe(1);
        }
        list = ["titre", "TEST", 1];
        modelOffres.applyUpdate(list, cbRead);
    });

    //------------------------------------------TESTS ORGANISATIONS------------------------------------------//

    test ("organisation : read",()=>{
        nom=null;
        function cbRead(resultat){
            nom = resultat[0].nom;
            expect(nom).toBe("MOUSQUETAIRES DU ROI");
        }
        modelOrganisation.read(1, cbRead);
    });

    test ("organisation : readall",()=>{
        lenght=null;
        function cbRead(resultat){
            lenght = resultat.lenght;
            expect(lenght).toBe(7);
        }
        modelOrganisation.readall(cbRead);
    });

    test ("organisation : readByStatut",()=>{
        lenght=null;
        function cbRead(resultat){
            lenght = resultat.lenght;
            expect(lenght).toBe(4);
        }
        modelOrganisation.readByStatut(cbRead);
    });

    test ("organisation : readKeyword",()=>{
        lenght=null;
        function cbRead(resultat){
            lenght = resultat.lenght;
            expect(lenght).toBe(6);
        }
        modelOrganisation.readKeyword("o", cbRead);
    });

    test ("organisation : requestOrga",()=>{
        id = null;
        function cbRead(resultat){
            id = resultat.insertId;
            expect(id).toBe(666);
        }
        modelOffres.postPublishOffer([666, "test_orga_nom", "test_type_orga", "test_siege"], cbRead);
    });

    test ("organisation : readNameValide",()=>{
        lenght=null;
        function cbRead(resultat){
            lenght = resultat.lenght;
            expect(lenght).toBe(4);
        }
        modelOrganisation.readNameValide(cbRead);
    });

    test ("organisation : readLowerName",()=>{
        nom=null;
        function cbRead(resultat){
            nom = resultat.nom;
            expect(nom).toBe("CHANEL");
        }
        modelOrganisation.readLowerName("cHanel", cbRead);
    });

    test ("organisation : applyUpdate",()=>{
        affectedRows =null;
        function cbRead(resultat){
            affectedRows  = resultat.affectedRows ;
            expect(affectedRows ).toBe(1);
        }
        modelOrganisation.applyUpdate(["nom", "TEST_JEST", 666], cbRead);
    });

    test ("organisation : supprOrga",()=>{
        affectedRows =null;
        function cbRead(resultat){
            affectedRows  = resultat.affectedRows ;
            expect(affectedRows ).toBe(1);
        }
        modelOrganisation.supprOrga(666, cbRead);
    });

    //------------------------------------------TESTS CANDIDATURES------------------------------------------//

    test ("candidature : read",()=>{
        lenght=null;
        function cbRead(resultat){
            lenght = resultat.lenght;
            expect(lenght).toBe(5);
        }
        modelCandidature.read(1, cbRead);
    });

    test ("candidature : readByOfferAndUser",()=>{
        lenght=null;
        function cbRead(resultat){
            lenght = resultat.lenght;
            expect(lenght).toBe(1);
        }
        modelCandidature.readByOfferAndUser([1, 1], cbRead);
    });

    test ("candidature : readall",()=>{
        lenght=null;
        function cbRead(resultat){
            lenght = resultat.lenght;
            expect(lenght).toBe(17);
        }
        modelCandidature.readall(cbRead);
    });

    test ("candidature : readByOrder",()=>{
        lenght=null;
        function cbRead(resultat){
            lenght = resultat.lenght;
            expect(lenght).toBe(17);
        }
        modelCandidature.readByOrder(cbRead);
    });

    test ("candidature : readByOrderDesc",()=>{
        lenght=null;
        function cbRead(resultat){
            lenght = resultat.lenght;
            expect(lenght).toBe(17);
        }
        modelCandidature.readByOrderDesc(cbRead);
    });

    test ("candidature : readallAndOrgaAndOffer",()=>{
        lenght=null;
        function cbRead(resultat){
            lenght = resultat.lenght;
            expect(lenght).toBe(17);
        }
        modelCandidature.readallAndOrgaAndOffer(cbRead);
    });

    test ("candidature : readAndOrgaAndOfferFromCandidatAndOffer",()=>{
        siren=null;
        function cbRead(resultat){
            siren = resultat.organisation;
            expect(siren).toBe(612035832);
        }
        modelCandidature.readAndOrgaAndOfferFromCandidatAndOffer([1, 1], cbRead);
    });

    test ("candidature : readallAndOrgaAndOfferByID",()=>{
        count=null;
        function cbRead(resultat){
            count = resultat.lenght;
            expect(count).toBe(5);
        }
        modelCandidature.readallAndOrgaAndOfferByID(1, cbRead);
    });

    test ("candidature : readFromTypeByID",()=>{
        count=null;
        function cbRead(resultat){
            count = resultat.lenght;
            expect(count).toBe(5);
        }
        modelCandidature.readFromTypeByID(["cdd", 1], cbRead);
    });

    test ("candidature : readByOrderByID",()=>{
        count=null;
        function cbRead(resultat){
            count = resultat.lenght;
            expect(count).toBe(5);
        }
        modelCandidature.readByOrderByID(1, cbRead);
    });

    test ("candidature : readByOrderDescByID",()=>{
        count=null;
        function cbRead(resultat){
            count = resultat.lenght;
            expect(count).toBe(5);
        }
        modelCandidature.readByOrderDescByID(1, cbRead);
    });

    test ("candidature : readKeywordByID",()=>{
        count=null;
        function cbRead(resultat){
            count = resultat.lenght;
            expect(count).toBe(3);
        }
        modelCandidature.readKeywordByID(["Jardinier", 1], cbRead);
    });    

    test ("candidature : uploadInsert",()=>{
        count=null;
        function cbRead(resultat){
            count = resultat.affectedRows;
            expect(count).toBe(1);
        }
        modelCandidature.uploadInsert([1, 1], cbRead);
    });    

    /* idk how to do that
    test ("candidature : uploadUpdate",()=>{
        count=null;
        function cbRead(resultat){
            count = resultat.affectedRows;
            expect(count).toBe(1);
        }
        modelCandidature.uploadUpdate([1, 1], cbRead);
    });
    */

    afterAll((/*done*/) => {
        /*
        function callback (err){
            if (err) done (err);
            else done();
        }
        DB.end(callback);*/
    });

});
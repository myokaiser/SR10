INSERT INTO Organisation
VALUES (612035832, "CHRISTIAN DIOR COUTURE", "Luxe, couture", "30 AV MONTAIGNE 75008 PARIS", "validée");
INSERT INTO Organisation
VALUES (542052766, "CHANEL", "Luxe", "135 AV CHARLES DE GAULLE 92200 NEUILLY-SUR-SEINE", "validée");
INSERT INTO Organisation
VALUES (383474814, "AIRBUS", "Aéronautique, aérospatial", "2 RPT EMILE DEWOITINE 31700 BLAGNAC", "validée");
INSERT INTO Organisation
VALUES (000000001, "MOUSQUETAIRES DU ROI", "Mousquerataires", "QUELQUE PART A PARIS", "validée");
INSERT INTO Organisation
VALUES (000000002, "ENTREPRISE DOUTEUSE", "Secret", "QUELQUE PART", "supprimée");
INSERT INTO Organisation
VALUES (000000003, "ENTREPRISE DOUTEUSE 2e du nom", "Secret", "QUELQUE PART", "en_attente");

INSERT INTO Utilisateur
VALUES (1, "ori.lan@gmail.com", "motDePasse", "Ori", "Lan", "0612345678", "non", NULL, "oui", '2019-02-24 14:15:56', "actif");
INSERT INTO Utilisateur
VALUES (2, "charles.dartagnan@gmail.com", "unpourTous", "Charles", "D'Artagnan", "0613345678", "oui", 000000001, "non", '2020-05-24 14:15:56', "actif");
INSERT INTO Utilisateur
VALUES (3, "rene.aramis@gmail.com", "tousPourUn", "René", "Aramis", "0613445678", "oui", 612035832, "non", '2023-02-24 14:15:56', "actif");
INSERT INTO Utilisateur
VALUES (4, "isaac.deportau@gmail.com", "pswd", "Isaac", "De Portau", "0613445678", "non", NULL, "non", '2023-02-24 14:15:56', "actif");
INSERT INTO Utilisateur
VALUES (5, "olivier.athos@gmail.com", "password", "Olivier", "Athos", "0613455678", "en_attente", 1, "non", '2023-02-24 14:15:56', "actif");
INSERT INTO Utilisateur
VALUES (6, "tom.blaireau@gmail.com", "ortie", "Tom", "Blaireau", "0613456678", "non", NULL, "en_attente", '2023-01-14 07:15:56', "actif");
INSERT INTO Utilisateur
VALUES (7, "umbre.tombetoile@gmail.com", "art", "Umbre", "Tombétoile", "0613456778", "non", NULL, "non", '2019-01-14 07:15:56', "inactif");
INSERT INTO Utilisateur
VALUES (8, "royal.loinvoyant@gmail.com", "pascontent", "Royal", "Loinvoyant", "0613456788", "en_attente", 542052766, "non", '2022-01-14 07:15:56', "actif");


INSERT INTO Offre
VALUES (1, 612035832, 3, "Couturier", "publiée", '2023-02-24 14:15:56', "Couturier chez Dior c'est stylé", "Paris", "Plein temps", 1300.34, "CDD");
INSERT INTO Offre
VALUES (2, 612035832, 3, "Ingénieur Informatique", "expirée", '2020-02-24 14:15:56', "Dior jdr", "Paris", "Plein temps", 1300.34, "CDI");
INSERT INTO Offre
VALUES (3, 612035832, 3, "Chef de projet", "publiée", '2023-02-24 14:15:56', "Couturier chez Dior c'est stylé", "Paris", "Plein temps", 1300.34, "Alternance");
INSERT INTO Offre
VALUES (4, 612035832, 3, "Développeur", "non publiée", '2023-02-24 14:15:56', "Dior jdr", "Paris", "Plein temps", 1300.34, "CDI");
INSERT INTO Offre
VALUES (5, 000000001, 2, "Mousquetaire", "publiée", '2020-10-24 09:15:56', "Mousqetaire du Roi c'est stylé", "Paris", "Plein temps", 10.34, "stage");

INSERT INTO Candidature
VALUES (5, 4, '2020-10-24 09:15:56', NULL, NULL);
INSERT INTO Candidature
VALUES (3, 2, '2020-10-24 09:15:56', NULL, NULL);
INSERT INTO Candidature
VALUES (3, 4, '2020-10-24 09:15:56', NULL, NULL);
INSERT INTO Candidature
VALUES (1, 3, '2020-10-24 09:15:56', NULL, NULL);
INSERT INTO Candidature
VALUES (5, 1, '2020-10-24 09:15:56', NULL, NULL);
INSERT INTO Candidature
VALUES (5, 3, '2020-10-24 09:15:56', NULL, NULL);
INSERT INTO Candidature
VALUES (5, 5, '2020-10-24 09:15:56', NULL, NULL);


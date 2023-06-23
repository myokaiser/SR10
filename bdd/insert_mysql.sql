INSERT INTO Organisation VALUES (000000001, 'DUPOND Corp', 'SAS', '10 Rue du Général de Gaule 60000 BEAUVAIS');
INSERT INTO Organisation VALUES (000000002, 'DURAND Corp', 'SAS', '21 Rue du Général 38400 Saint-Martin_dhères');
INSERT INTO Organisation VALUES (000000003, 'CHAN Corp', 'SAS', '54 Avenue de la Gare 60000 BEAUVAIS');

INSERT INTO Recruteur VALUES ('lejeune.martin@gmail.com', 'pswd1', 000000001, 'LEJEUNE', 'Martin', '0756439851', '2019-02-24 14:15:56', 'actif');
INSERT INTO Recruteur VALUES ('leblan.marie@gmail.com', 'pswd2', 000000002, 'LEBLAN', 'Marie', '0756875851', '2020-02-24 14:15:56', 'inactif');

INSERT INTO Admin VALUES ('leroux.bernard@gmail.com', 'pswd3', 'LEROUX', 'Bernard', '0756439851', '2019-02-24 14:15:56', 'actif');
INSERT INTO Admin VALUES ('lenoir.paul@gmail.com', 'pswd4', 'LENOIR', 'Paul', '0756875851', '2020-02-24 14:15:56', 'inactif');

INSERT INTO Candidat VALUES ('legrand.jacques@gmail.com', 'pswd5', 'LEGRAND', 'Jacques', '0756439851', '2019-02-24 14:15:56', 'actif');
INSERT INTO Candidat VALUES ('lepetit.paul@gmail.com', 'pswd6', 'LEPETIT', 'Paul', '0756875851', '2020-02-24 14:15:56', 'inactif');

INSERT INTO Offre VALUES (000000011, "Offre de stage", 000000001, 'publiée', '2019-02-24 14:15:56', 'Description de l''offre 1', 4, 'LEMOINE', '10 Rue du Général de Gaule 60000 BEAUVAIS', '35H par semaine', 1500);
INSERT INTO Offre VALUES (000000012, "Developpeur C/C++", 000000002, 'expirée', '2020-02-24 14:15:56', 'Description de l''offre 2', 4, 'LEBELIER', '21 Rue du Général 38400 Saint-Martin_dhères', '30H par semaine', 1200);

INSERT INTO Poste VALUES (000000111, 000000011, 'stagiaire', 'Data Analyst');
INSERT INTO Poste VALUES (000000112, 000000012, 'stagiaire', 'Data Engineer');

INSERT INTO Document VALUES ('CV');
INSERT INTO Document VALUES ('Pièce d identité');
INSERT INTO Document VALUES ('Lettre de motivation');
INSERT INTO Document VALUES ('Photo');
INSERT INTO Document VALUES ('Dernier diplôme');
INSERT INTO Document VALUES ('RIB');
INSERT INTO Document VALUES ('CPAM');
INSERT INTO Document VALUES ('Permis');

INSERT INTO Controle VALUES (000000001, 'lenoir.paul@gmail.com');
INSERT INTO Controle VALUES (000000002, 'leroux.bernard@gmail.com');
INSERT INTO Controle VALUES (000000003, 'lenoir.paul@gmail.com');

INSERT INTO Candidature VALUES ('legrand.jacques@gmail.com', 000000011, '2019-02-24 14:15:56');
INSERT INTO Candidature VALUES ('legrand.jacques@gmail.com', 000000012, '2020-02-24 14:15:56');
INSERT INTO Candidature VALUES ('lepetit.paul@gmail.com', 000000011, '2022-03-12 20:18:56');

INSERT INTO ModifieCandidat VALUES ('lenoir.paul@gmail.com', 'lepetit.paul@gmail.com');
INSERT INTO ModifieCandidat VALUES ('lenoir.paul@gmail.com', 'legrand.jacques@gmail.com');

INSERT INTO ModifieRecruteur VALUES ('lenoir.paul@gmail.com', 'lejeune.martin@gmail.com');
INSERT INTO ModifieRecruteur VALUES ('leroux.bernard@gmail.com', 'leblan.marie@gmail.com');

INSERT INTO Ajoute VALUES ('lejeune.martin@gmail.com', 'leblan.marie@gmail.com');

INSERT INTO Edite VALUES ('lejeune.martin@gmail.com', 000000011);
INSERT INTO Edite VALUES ('leblan.marie@gmail.com', 000000012);

INSERT INTO Necessite VALUES (000000011, 'CV');
INSERT INTO Necessite VALUES (000000011, 'Lettre de motivation');
INSERT INTO Necessite VALUES (000000011, 'Dernier diplôme');
INSERT INTO Necessite VALUES (000000011, 'Photo');
INSERT INTO Necessite VALUES (000000012, 'CV');
INSERT INTO Necessite VALUES (000000012, 'Lettre de motivation');
INSERT INTO Necessite VALUES (000000012, 'Dernier diplôme');
INSERT INTO Necessite VALUES (000000012, 'Pièce d identité');

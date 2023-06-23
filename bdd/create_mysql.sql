/*
DROP TABLE Necessite;
DROP TABLE Edite;
DROP TABLE Ajoute;
DROP TABLE ModifieRecruteur;
DROP TABLE ModifieCandidat;
DROP TABLE Candidature;
DROP TABLE Controle;
DROP TABLE Document;
DROP TABLE Poste;
DROP TABLE Offre;
DROP TABLE Candidat;
DROP TABLE Admin;
DROP TABLE Recruteur;
DROP TABLE Organisation;
*/

CREATE TABLE Organisation(
    SIREN INTEGER,
    nom VARCHAR(250),
    type VARCHAR(250),
    siege VARCHAR(250),
    PRIMARY KEY (SIREN)
);

CREATE TABLE Recruteur(
    mail VARCHAR(250),
    pwd VARCHAR(250),
    orga INTEGER,
    nom VARCHAR(250),
    prenom VARCHAR(250),
    tel VARCHAR(250),
    date_creation TIMESTAMP,
    statut VARCHAR(250),
    PRIMARY KEY (mail),
    FOREIGN KEY (orga) REFERENCES Organisation(SIREN),
    CHECK (statut = 'actif' OR statut = 'inactif')
);

CREATE TABLE Admin(
    mail VARCHAR(250),
    pwd VARCHAR(250),
    nom VARCHAR(250),
    prenom VARCHAR(250),
    tel VARCHAR(250),
    date_creation TIMESTAMP,
    statut VARCHAR(250),
    PRIMARY KEY (mail),
    CHECK (statut = 'actif' OR statut = 'inactif')
);

CREATE TABLE Candidat(
    mail VARCHAR(250),
    pwd VARCHAR(250),
    nom VARCHAR(250),
    prenom VARCHAR(250),
    tel VARCHAR(250),
    date_creation TIMESTAMP,
    statut VARCHAR(250),
    PRIMARY KEY (mail),
    CHECK (statut = 'actif' OR statut = 'inactif')
);

CREATE TABLE Offre(
    id INTEGER,
    titre VARCHAR(250),
    orga INTEGER,
    statut VARCHAR(250),
    validite TIMESTAMP,
    description TEXT,
    nb_pieces INTEGER,
    resp VARCHAR(250),
    lieu VARCHAR(250),
    rythme VARCHAR(250),
    salaire FLOAT,
    PRIMARY KEY (id),
    FOREIGN KEY (orga) REFERENCES Organisation(SIREN),
    CHECK (statut = 'non publiée' OR statut = 'publiée' OR statut = 'expirée')
);

CREATE TABLE Poste(
    id INTEGER,
    offre INTEGER,
    statut VARCHAR(250),
    type_metier VARCHAR(250),
    PRIMARY KEY (id),
    FOREIGN KEY (offre) REFERENCES Offre(id)
);

CREATE TABLE Document(
    type VARCHAR(250),
    PRIMARY KEY (type)
);

CREATE TABLE Controle(
    orga INTEGER,
    admin VARCHAR(250),
    FOREIGN KEY (orga) REFERENCES Organisation(SIREN),
    FOREIGN KEY (admin) REFERENCES Admin(mail),
    PRIMARY KEY (orga, admin)
);

CREATE TABLE Candidature(
    candidat VARCHAR(250),
    offre INTEGER,
    date_candidature TIMESTAMP,
    FOREIGN KEY (candidat) REFERENCES Candidat(mail),
    FOREIGN KEY (offre) REFERENCES Offre(id),
    PRIMARY KEY (candidat, offre)
);

CREATE TABLE ModifieCandidat(
    admin VARCHAR(250),
    candidat VARCHAR(250),
    FOREIGN KEY (admin) REFERENCES Admin(mail),
    FOREIGN KEY (candidat) REFERENCES Candidat(mail),
    PRIMARY KEY (admin, candidat)
);

CREATE TABLE ModifieRecruteur(
    admin VARCHAR(250),
    recruteur VARCHAR(250),
    FOREIGN KEY (admin) REFERENCES Admin(mail),
    FOREIGN KEY (recruteur) REFERENCES Recruteur(mail),
    PRIMARY KEY (admin, recruteur)
);

CREATE TABLE Ajoute(
    recruteur1 VARCHAR(250),
    recruteur2 VARCHAR(250),
    FOREIGN KEY (recruteur1) REFERENCES Recruteur(mail),
    FOREIGN KEY (recruteur2) REFERENCES Recruteur(mail),
    PRIMARY KEY (recruteur1, recruteur2)
);

CREATE TABLE Edite(
    recruteur VARCHAR(250),
    offre INTEGER,
    FOREIGN KEY (recruteur) REFERENCES Recruteur(mail),
    FOREIGN KEY (offre) REFERENCES Offre(id),
    PRIMARY KEY (recruteur, offre)
);

CREATE TABLE Necessite(
    offre INTEGER, 
    document VARCHAR(250),
    FOREIGN KEY (offre) REFERENCES Offre(id),
    FOREIGN KEY (document) REFERENCES Document(type),
    PRIMARY KEY (offre, document)
);

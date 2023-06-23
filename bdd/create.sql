/*
DROP TABLE Edite;
DROP TABLE Ajoute;
DROP TABLE ModifieUtilisateur;
DROP TABLE ControleOrganisation;
DROP TABLE Candidature;
DROP TABLE Poste;
DROP TABLE Offre;
DROP TABLE Utilisateur;
DROP TABLE Organisation;
*/

CREATE TABLE Organisation(
    SIREN INTEGER,
    nom VARCHAR(250),
    type_organisation VARCHAR(250),
    siege VARCHAR(250),
    statut VARCHAR(250),
    PRIMARY KEY (SIREN),
    CHECK (statut = 'validée' OR statut = 'en_attente' OR statut = 'supprimée')
);

CREATE TABLE Utilisateur (
    id INTEGER,
    mail VARCHAR(250),
    pwd VARCHAR(250),
    prenom VARCHAR(250),
    nom VARCHAR(250),
    tel VARCHAR(250),
    est_recruteur VARCHAR(250),
    organisation INTEGER,
    est_admin VARCHAR(250),
    date_creation TIMESTAMP,
    statut VARCHAR(250),
    PRIMARY KEY (id),
    FOREIGN KEY (organisation) REFERENCES Organisation(SIREN),
    CHECK (statut = 'actif' OR statut = 'inactif'),
    CHECK (est_recruteur = 'oui' OR est_recruteur = 'en_attente' OR est_recruteur = 'non'),
    CHECK (est_admin = 'oui' OR est_admin = 'en_attente' OR est_admin = 'non'),
    CHECK (NOT (est_recruteur = 'oui' AND est_admin = 'oui'))
);

CREATE TABLE Offre(
    id INTEGER,
    organisation INTEGER,
    recruteur INTEGER,
    titre VARCHAR(250),
    statut VARCHAR(250),
    date_creation TIMESTAMP,
    descr TEXT,
    lieu VARCHAR(250),
    rythme VARCHAR(250),
    salaire FLOAT,
    type_metier VARCHAR(250),
    CHECK (type_metier = 'stage' OR type_metier = 'CDD' OR type_metier = 'CDI' OR type_metier = 'alternance'),
    PRIMARY KEY (id),
    FOREIGN KEY (organisation) REFERENCES Organisation(SIREN),
    FOREIGN KEY (recruteur) REFERENCES Utilisateur(id),
    CHECK (statut = 'non publiée' OR statut = 'publiée' OR statut = 'expirée')
);

/*CREATE TABLE Poste(
    id INTEGER,
    offre INTEGER,
    type_metier VARCHAR(250),
    CHECK (type_metier = 'stage' OR type_metier = 'CDD' OR type_metier = 'CDI' OR type_metier = 'alternance'),
    FOREIGN KEY (offre) REFERENCES Organisation(SIREN),
    PRIMARY KEY (id, offre)
);*/


CREATE TABLE Candidature(
    candidat INTEGER,
    offre INTEGER,
    date_candidature TIMESTAMP,
    cv MEDIUMBLOB,
    lettre_motivation MEDIUMBLOB,
    FOREIGN KEY (candidat) REFERENCES Utilisateur(id),
    FOREIGN KEY (offre) REFERENCES Offre(id),
    PRIMARY KEY (candidat, offre)
);

CREATE TABLE ControleOrganisation (
    organisation INTEGER,
    admin INTEGER,
    FOREIGN KEY (organisation) REFERENCES Organisation(SIREN),
    FOREIGN KEY (admin) REFERENCES Utilisateur(id),
    PRIMARY KEY (organisation, admin)
);

CREATE TABLE ModifieUtilisateur (
    admin INTEGER,
    user INTEGER,
    CHECK (NOT (user = admin)),
    FOREIGN KEY (admin) REFERENCES Utilisateur(id),
    FOREIGN KEY (user) REFERENCES Utilisateur(id),
    PRIMARY KEY (admin, user)
);

CREATE TABLE Ajoute(
    recruteur1 INTEGER,
    recruteur2 INTEGER,
    FOREIGN KEY (recruteur1) REFERENCES Utilisateur(id),
    FOREIGN KEY (recruteur2) REFERENCES Utilisateur(id),
    PRIMARY KEY (recruteur1, recruteur2)
);

CREATE TABLE Edite(
    recruteur INTEGER,
    offre INTEGER,
    FOREIGN KEY (recruteur) REFERENCES Utilisateur(id),
    FOREIGN KEY (offre) REFERENCES Offre(id),
    PRIMARY KEY (recruteur, offre)
);
-- Creation de la base
CREATE DATABASE myam_madera;

-- Creations des tables
CREATE TABLE utilisateur_roles(
    idRole VARCHAR NOT NULL,
    nomRole VARCHAR,
    CONSTRAINT utilisateur_roles_pk PRIMARY KEY(idRole)
);

CREATE TABLE utilisateurs(
    idUtilisateur SMALLINT AUTO_INCREMENT NOT NULL,
    login VARCHAR NOT NULL,
    mdpUtilisateur VARCHAR NOT NULL,
    nomUtilisateur VARCHAR,
    prenomUtilisateur VARCHAR,
    idRole VARCHAR,
    CONSTRAINT utilisateurs_pk PRIMARY KEY(idUtilisateur),
    CONSTRAINT utilisateurs_utilisateur_roles_fk FOREIGN KEY(idRole) REFERENCES utilisateur_roles(idRole)
);

CREATE TABLE gammes(
    idGamme SMALLINT AUTO_INCREMENT NOT NULL,
    nomGamme VARCHAR,
    CONSTRAINT gammes_pk PRIMARY KEY(idGamme)
);

CREATE TABLE fournisseurs(
    idFournisseur SMALLINT AUTO_INCREMENT NOT NULL,
    nomFournisseur VARCHAR,
    CONSTRAINT fournisseurs_pk PRIMARY KEY(idFournisseur)
);

CREATE TABLE clients(
    idClient SMALLINT AUTO_INCREMENT NOT NULL,
    nomClient VARCHAR,
    prenomClient VARCHAR,
    adrRueClient VARCHAR,
    adrCpClient VARCHAR,
    adrVilleClient VARCHAR,
    telClient VARCHAR,
    emailClient VARCHAR,
    CONSTRAINT clients_pk PRIMARY KEY(idClient)
);

CREATE TABLE composants(
    idComposant SMALLINT AUTO_INCREMENT NOT NULL,
    nomComposant VARCHAR,
    idGamme SMALLINT NOT NULL,
    idFournisseur SMALLINT NOT NULL,
    prixComposant FLOAT,
    CONSTRAINT composants_pk PRIMARY KEY(idComposant),
    CONSTRAINT composants_gammes_fk FOREIGN KEY(idGamme) REFERENCES gammes(idGamme),
    CONSTRAINT composants_fournisseur_fk FOREIGN KEY(idFournisseur) REFERENCES fournisseurs(idFournisseur)
);

CREATE TABLE devis(
    idDevis SMALLINT AUTO_INCREMENT NOT NULL,
    nomDevis VARCHAR,
    idClient SMALLINT,
    dateDevis DATE,
    etatDevis TINYINT(1) DEFAULT 0,
    prixDevis FLOAT,
    paiementDevis SMALLINT,
    CONSTRAINT devis_pk PRIMARY KEY(idDevis),
    CONSTRAINT devis_clients_fk FOREIGN KEY(idClient) REFERENCES clients(idClient)
);

CREATE TABLE devis_composants(
    idDevis SMALLINT NOT NULL,
    idComposant SMALLINT NOT NULL,
    quantite SMALLINT DEFAULT 0,
    CONSTRAINT devis_composants_pk PRIMARY KEY(idDevis, idComposant),
    CONSTRAINT devis_composants_devis_fk FOREIGN KEY(idDevis) REFERENCES devis(idDevis),
    CONSTRAINT devis_composants_composants_fk FOREIGN KEY(idComposant) REFERENCES composants(idComposant)
);

-- Ajout de données à la base
INSERT INTO utilisateur_roles
VALUES('com', 'Commercial'),
    ('be', "Bureau d'étude"),
    ('compt', 'Comptable'),
    ('admin', 'Adminisatrateur');

INSERT INTO utilisateurs(login, mdpUtilisateur, nomUtilisateur, prenomUtilisateur, idRole)
VALUES ('admin','admin', 'LACROIX', 'Joël', 'admin'),
    ('be1', 'be1', 'DURAN', 'Paul', 'be'),
    ('com1', 'com1', 'DUPOND', 'Jean', 'com'),
    ('compt1', 'compt1', 'MENIER', 'Axel', 'compt');

INSERT INTO gammes(nomGamme),
VALUES('basse'),
    ('moyenne'),
    ('haute');

INSERT INTO fournisseurs(nomFournisseur)
VALUES("Chêne d'acier"),
    ('Hêtre ou ne pas hêtre'),
    ("Naturellement votre");

INSERT INTO clients(nomClient, prenomClient, adrRueClient, adrCpClient, adrVilleClient, telClient, emailClient)
VALUES('GARCIN', 'Lazare', '11 Rue de Brest', '29800', 'Landerneau', '02 55 28 65 95', 'glazare@mail.fr'),
    ('TELMAET', 'Louise', '1 Rue Amiral Nielly', '29200', 'Brest', '02 55 29 75 95', 'telmaetlouise@mail.fr');

INSERT INTO composants(nomComposant, idGamme, idFournisseur, prixComposant)
VALUES ("Toiture hêtre 1m2", 2, 2, 118),
    ("Toiture bois de chêne 1m2", 1, 1, 112),
    ("Mur extérieur bois de hêtre 1m2", 1, 2, 450),
    ("Mur extérieur bois de chêne 1m2", 2, 1, 300),
    ("Escalier bois de hêtre", 1, 2, 1000),
    ("Escalier bois de chêne", 3, 1, 950),
    ("Lattes parquet hêtre 1m2",3, 2, 75),
    ("Lattes parquet chêne 1m2", 2, 1, 70),
    ("Mur intérieur hêtre 1m2", 1, 2, 300),
    ("Mur intérieur chêne 1m2", 2, 1, 325),
    ("Isolant thermique naturelle 1m2", 3, 3, 19),
    ("Fondation hêtre 1m2", 2, 2, 80),
    ("Fondation chêne 1m2", 1, 1, 78);

INSERT INTO devis(nomDevis, idClient, dateDevis, etatDevis, prixDevis, paiementDevis)
VALUES ("Maison bois de Hêtre - GARCIN", 1, '2018-03-07', 0, 420300, 50),
    ("Maison bois de Chêne - TELMAET", 2, '2018-03-07', 1, 430050, 10);

INSERT INTO devis_composants(idDevis, idComposant, quantite)
VALUES (1, 1, 300),
    (1, 3, 600),
    (1, 5, 3),
    (1, 7, 600),
    (1, 9, 25),
    (1, 11, 600),
    (1, 12, 600),
    (2, 2, 400),
    (2, 4, 800),
    (2, 6, 2),
    (2, 8, 800),
    (2, 10, 30),
    (2, 11, 800),
    (2, 13, 800);
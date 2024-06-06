# NaviNote

# Manuel de Déploiement

Ce manuel vous guidera à travers les étapes nécessaires pour déployer le front-end Angular et le back-end Spring en utilisant Docker.
Prérequis

Assurez-vous d'avoir les éléments suivants installés sur votre machine :

    Node.js
    Docker

# Déploiement du Front-End Angular

## Étape 1 : Installation de Node.js

Si Node.js n'est pas déjà installé sur votre machine, installez-le en utilisant le gestionnaire de paquets approprié pour votre système d'exploitation.


## Étape 2 : Installation des dépendances du projet avec npm

npm install est utilisé pour installer toutes les dépendances nécessaires définies dans le fichier package.json de votre projet Angular. Cela prépare votre environnement de développement en téléchargeant tous les modules nécessaires.

Dans le terminal, naviguez vers le répertoire racine de votre projet Angular et exécutez :

    npm install
    

## Étape 3 : Installation de Angular CLI

Installez Angular CLI globalement en utilisant npm (le gestionnaire de paquets de Node.js) :

    npm install -g @angular/cli
    

## Étape 4 : Démarrage de l'application Angular

Pour lancer l'application, utilisez la commande suivante dans le répertoire racine de votre projet Angular :

    ng serve

Vous pouvez ensuite accéder à l'application sur http://localhost:4300/ par défaut.


# Déploiement du Back-End Spring

## Étape 1 : Installation de Docker

Si Docker n'est pas déjà installé sur votre machine, téléchargez et installez Docker depuis le site officiel : https://www.docker.com/products/docker-desktop


## Étape 2 : Démarrage du conteneur Docker

Après l'installation de Docker, assurez-vous d'entrer la commande ci-dessous pour créer et démarrer le conteneur Docker :

    docker compose up
    

## Étape 3 : Configuration de la Base de Données

Après avoir lancé "BackendApplication" assurez-vous que la configuration de votre base de données est correctement définie dans votre fichier de configuration Spring. Les détails de la configuration doivent être :

    Nom d'utilisateur : navi_note
    Mot de passe : navi_note
    Port : 5439


## Étape 4 : Insérer les Données SQL dans la Base de Données

Insérez les données dans la base de données à l'aide du fichier insert.sql en exécutant celui-ci.



# Conclusion

Vous avez maintenant tous les éléments nécessaires pour naviguer sur notre site. Bon surfing !

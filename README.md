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

Tapez dans le terminal : 
npm install

## Étape 2 : Installation de Angular CLI

Installez Angular CLI globalement en utilisant npm (le gestionnaire de paquets de Node.js) :
npm install -g @angular/cli

Il suffit ensuite de lancer l'application en appuyant sur le bouton "Start"


# Déploiement du Back-End Spring
## Étape 1 : Installation de Docker

Si Docker n'est pas déjà installé sur votre machine, téléchargez et installez Docker depuis le site officiel : https://www.docker.com/products/docker-desktop

## Étape 2 : Configuration de la Base de Données

Après avoir lancé "BackendApplication" assurez-vous que la configuration de votre base de données est correctement définie dans votre fichier de configuration Spring. Les détails de la configuration doivent être :

    Nom d'utilisateur : navi_note
    Mot de passe : navi_note
    Port : 5439

## Étape 3 : Insérer les Données SQL dans la Base de Données

Insérez les données dans la base de données à l'aide du fichier "insert.sql" en exécutant celui-ci, situé dans le dossier "ressources"



### Vous avez dorénavant tous les éléments nécessaires pour naviguer sur notre site. Bon surfing !

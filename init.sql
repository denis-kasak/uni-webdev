CREATE DATABASE Vergleich24;
CREATE TABLE Vergleich24.Kommentare ( userid VARCHAR(100), kommentar VARCHAR(2000));
CREATE TABLE Vergleich24.Favoriten (id INT AUTO_INCREMENT PRIMARY KEY, userid VARCHAR(100), beschreibung VARCHAR(1000), query VARCHAR(2000));
CREATE TABLE Vergleich24.User (dbid INT AUTO_INCREMENT PRIMARY KEY, id VARCHAR(100) , username VARCHAR(3000));
CREATE TABLE Vergleich24.Pages (pagename VARCHAR(300), userid VARCHAR(100));
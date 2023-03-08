#!/bin/bash
# Funktioniert nur auf Unix-Systeme (Linux, Mac...). Für Windows diesen Befehl einfach in cmd ausführen.

docker run --name mysql-webdev -p 3306:3306 -e MYSQL_ROOT_PASSWORD=passwort -d mysql:latest
node setup.js
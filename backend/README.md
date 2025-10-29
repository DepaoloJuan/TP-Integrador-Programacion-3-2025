#TP Integrador Back

#Configuracion inicial de proyecto

-Instalamos Node.js y NPM e inicializamos el proyecto con npm init -y

-Instalacion de dependencias

--express: Framework web para crear el servidor
--mysql2: Cliente mysql para Node.js
--nodemon: Herramienta que reinicia automaticamente la app Node.js cuando detecta cambios en los archivos
--doteenv: Modulo que carga variables de entorno desde un archivo .env al entorno de ejecucion de Node.js

npm install express mysql2 nodemon dotenv

-Setup del proyecto
--Creacion de .gitignore y .env
--Creamos un script personalizado en package.json
--Agregamos el type module para poder usar sintaxis moderna ES6

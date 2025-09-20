# Galería de imágenes.
## Introducción.
En este proyecto se desarrolla una galería de fotos utilizando Ionic y Angular, tomando como base el tutorial proporcionado en la actividad(.
El enfoque principal es mostrar cómo se pueden integrar las funcionalidades nativas del dispositivo móvil dentro de una aplicación híbrida.
Para la galería se hace uso de la cámara del dispositivo y del almacenamiento interno, de manera que el usuario pueda capturar imágenes, guardarlas y visualizarlas directamente desde la aplicación.
Gracias a las capacidades de Ionic con Capacitor, se logra acceder a la cámara y gestionar las fotos de forma sencilla, creando una experiencia cercana a las aplicaciones móviles nativas, pero con la ventaja del desarrollo multiplataforma.

##Herramientas 🔨:
Dentro de las utilidades que se emplearon para realizar la actividad se encuentran las siguientes:
### Software:
1. Visual Studio Code: Editor de código
2. GitHub: Almacenar el proyecto en la nube.
3. Ionic: Crear el proyecto.
4. Capacitor y Firebase: Acceso a los plugins necesarios.
###Lenguajes de programación:
- Angular.
- TypeScript.
- Ionic.
- SCSS.
##Plugins.
En el desarrollo del proyecto se utilizaron los siguientes plugins que permiten el uso de la cámara, el almacenamiento y acceso a las imágenes desde el navegador provenientes de Capacitor:
1. @Capacitor/pwa-elements:
Es el plugin más importante ya que, es el que permite la utilización de los demás que se comentarán a continuación, por tal motivo es el primero que debe instalarse en el proyecto.
2. @Capacitor/camera:
Este plugin ofrece la oportunidad de utilizar la cámara de un dispositivo, ya sea en móvil o en un navegador.
3. @Capacitor/Storage:
Aunque este plugin se considera obsoleto en la actualidad tecnológica, es vital para almacenar las fotos o imágenes que se carguen en el aplicativo de forma local.
4. @Capacitor/FileSystem:
Este último plugin que se enfoca en almacenamiento del dispositivo, consiste en gestionar los archivos del dispositivo, en este caso únicamente funciona en la aplicación web.
5. Autenticación de google con Firebase:
Esta plataforma permite que el usuario se loguee en el aplicativo, tanto en web como en android. Cabe aclarar que esta función se ha intentado implementar, pero debido a algunas complicaciones en el backend únicamente se encontrará el front del formulario. Próximamente se añadirá.
##Desarrollo de la aplicación 🤖:
Este proyecto cuenta con el desarrollo del tutorial proporcionado ([Tutorial](http://https://www.youtube.com/watch?v=Vo8-d2f2dTg "Tutorial")) y cuenta con las siguientes funcionalidades:
a. Inicio de sesión con correo electrónico y contraseña.
b. Inicio de sesión con Google.
c. Botones de registro y autenticación.
d. Galería de imágenes en el cual el usuario tiene la oportunidad de tomar una cantidad ilimitada de fotos y cargar una imagen del almacenamiento del dispositivo (web) y así mismo almacenar en la aplicación las que desee.
Próximamente se agregarán las siguientes funciones:
1- Editar o eliminar una imagen almacenada.
2- Autenticación de inicio de sesión con Google
3- Inicio de sesión con correo electrónico y contraseña.

# Repositorio de GitHub:
https://github.com/fernandosandoval3466/Galeria-de-fotos-.git


#Cómo instalar:
Paso 1: Al ingresar al repositorio de GitHub dará una opción para descargar el proyecto en un archivo comprimido.
Paso 2: Una vez descargado el proyecto, se descomprime y se abre el proyecto en VS code o el editor de código de preferencia desde la carpeta raíz del mismo.
Paso 3: Una vez abierto el proyecto, se abre la terminal (ctrl+ñ) y se ingresa el siguiente comando: ionic serve.


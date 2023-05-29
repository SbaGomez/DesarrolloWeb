// Espera a que el DOM se cargue completamente
document.addEventListener("DOMContentLoaded", function() {
    // Obtiene los enlaces del menú de navegación
    var enlaces = document.querySelectorAll("nav ul li a");

    // Itera sobre cada enlace y agrega un evento de clic
    enlaces.forEach(function(enlace) {
        enlace.addEventListener("click", function(e) {
            e.preventDefault(); // Evita el comportamiento predeterminado del enlace

            // Obtiene la URL del enlace
            var url = this.getAttribute("id")+".html";
            // Carga el contenido de la URL en el contenedor
            cargarContenido(url); // Carga el contenido de la URL en el contenedor
        });
    });

    // Función para cargar el contenido de una URL en el contenedor
    function cargarContenido(url) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("contenido").innerHTML = this.responseText;
            }
        };
        xhttp.open("GET", url, true);
        xhttp.send();
    }

    cargarContenido("inicio.html");
});

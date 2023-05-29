// Espera a que el DOM se cargue completamente
document.addEventListener("DOMContentLoaded", function() {
    // Obtiene los enlaces del menú de navegación
    var enlaces = document.querySelectorAll("nav ul li a");

    // Itera sobre cada enlace y agrega un evento de clic
    enlaces.forEach(function(enlace) {
        enlace.addEventListener("click", function(e) {
            e.preventDefault(); // Evita el comportamiento predeterminado del enlace

            // Obtiene la URL del enlace
            var url = this.getAttribute("id") + ".html";
            // Carga el contenido de la URL en el contenedor
            cargarContenido(url);
        });
    });

    // Función para cargar el contenido de una URL en el contenedor
    function cargarContenido(url) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("contenido").innerHTML = this.responseText;
                ajustarAlturaContenido(); // Ajusta la altura del contenido después de cargar el nuevo contenido
            }
        };
        xhttp.open("GET", url, true);
        xhttp.send();
    }

    // Ajusta la altura del contenido según su contenido
    function ajustarAlturaContenido() {
        var contenido = document.getElementById("contenido");
        contenido.style.height = "auto"; // Restablece la altura a "auto" para recalcularla correctamente
        contenido.style.height = (contenido.scrollHeight + 120) + "px"; // Establece la altura según el contenido

    }

    cargarContenido("inicio.html");

    window.addEventListener("resize", ajustarAlturaContenido);
});


// Espera a que el DOM se cargue completamente
document.addEventListener("DOMContentLoaded", function () {
    // Obtiene los enlaces del menú de navegación
    var enlaces = document.querySelectorAll("nav ul li a");

    // Itera sobre cada enlace y agrega un evento de clic
    enlaces.forEach(function (enlace) {
        enlace.addEventListener("click", function (e) {
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
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("contenido").innerHTML = this.responseText;
                ajustarAlturaContenido(); // Ajusta la altura del contenido después de cargar el nuevo contenido

                // Verificar la URL actual
                var esInicio = url.includes("inicio.html");
                var esSomos = url.includes("somos.html");
                var esIdeas = url.includes("ideas.html");
                var esContacto = url.includes("contacto.html");

                // Cambiar la clase y estilos del banner segun la URL
                var vidriera = document.getElementById("vidriera");
                var texto = document.getElementById("vidriera").querySelector("p");
                var newsletter = document.getElementById("newsletter");
                var titulo = document.getElementById("vidriera").querySelector("h1");

                if (esInicio) {
                    vidriera.style.height = "400px";
                    vidriera.style.padding = "150px 40px";
                    texto.style.display = "block";
                    //newsletter.style.display = "block";
                    titulo.textContent = "Proporción áurea y fractales";
                    titulo.classList.remove("tituloBanner");
                    vidriera.style.backgroundImage = "url('../img/seccion.jpg')";
                }
                else if (esSomos) {
                    vidriera.style.height = "200px";
                    vidriera.style.padding = "70px 20px";
                    texto.style.display = "none"
                    //newsletter.style.display = "none";
                    titulo.textContent = "Diseño Web";
                    titulo.classList.add("tituloBanner");
                    vidriera.style.backgroundImage = "url('../img/header1.jpg')";
                }

                // Obtener los elementos de navegación
                var inicio = document.getElementById("inicio");
                var somos = document.getElementById("somos");
                var ideas = document.getElementById("ideas");
                var contacto = document.getElementById("contacto");

                // Función para activar el elemento de navegación correspondiente
                function activarElemento(elemento) {
                    elemento.classList.add("active");
                }

                // Función para desactivar todos los elementos de navegación
                function desactivarElementos() {
                    inicio.classList.remove("active");
                    somos.classList.remove("active");
                    ideas.classList.remove("active");
                    contacto.classList.remove("active");
                }

                // Asignar eventos de clic a los elementos de navegación
                inicio.addEventListener("click", function () {
                    desactivarElementos();
                    activarElemento(inicio);
                });

                somos.addEventListener("click", function () {
                    desactivarElementos();
                    activarElemento(somos);
                });

                ideas.addEventListener("click", function () {
                    desactivarElementos();
                    activarElemento(ideas);
                });

                contacto.addEventListener("click", function () {
                    desactivarElementos();
                    activarElemento(contacto);
                });

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


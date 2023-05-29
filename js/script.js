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
                ajustarAlturaContenido();

                // Variable para titulo de la pagina
                var tituloPagina = "";

                // Cambiar la clase y estilos del banner segun la URL
                var banner = document.getElementById("banner");
                var texto = document.getElementById("banner").querySelector("p");
                var titulo = document.getElementById("banner").querySelector("h1");
                var newsletter = document.getElementById("newsletter");

                if (url.includes("inicio.html")) {
                    banner.style.height = "400px";                                  //height del banner
                    banner.style.padding = "150px 40px";                            //paddings del banner
                    texto.style.display = "block";                                  //Mostrar el p del banner en el index.html
                    titulo.textContent = "Proporción áurea y fractales";            //Cambiar titulo del banner
                    newsletter.style.display = "block";                             //Mostrar el newsletter en el index.html
                    titulo.classList.remove("tituloBanner");                        //Remover estilo del titulo del banner en el index.html
                    banner.style.backgroundImage = "url('../img/seccion.jpg')";     //Imagen del banner de index.html
                    tituloPagina = "Diseño y Desarrollo Web - Home";                //Cambiar titulo de la pagina
                }
                else if (url.includes("somos.html")) {
                    banner.style.height = "200px";                                  //height del banner
                    banner.style.padding = "70px 20px";                             //paddings del banner
                    texto.style.display = "none"                                    //Esconder el p del banner en el somos.html
                    titulo.textContent = "Diseño Web";                              //Cambiar titulo del banner
                    newsletter.style.display = "none";                              //Escoder el newsletter en el somos.html
                    titulo.classList.add("tituloBanner");                           //Agregarle el estilo del titulo del banner en el somos.html
                    banner.style.backgroundImage = "url('../img/header1.jpg')";     //Imagen del banner de index.html
                    tituloPagina = "Diseño y Desarrollo Web - Somos";               //Cambiar titulo de la pagina
                }
                else if (url.includes("ideas.html")) {
                    banner.style.height = "200px";
                    banner.style.padding = "70px 20px";
                    texto.style.display = "none"
                    titulo.textContent = "Ideas";
                    titulo.classList.add("tituloBanner");
                    newsletter.style.display = "none";
                    banner.style.backgroundImage = "url('../img/ideas3.jpg')";
                    tituloPagina = "Diseño y Desarrollo Web - Ideas";
                }
                else if (url.includes("contacto.html")) {
                    banner.style.height = "200px";
                    banner.style.padding = "70px 20px";
                    texto.style.display = "none"
                    titulo.textContent = "Contacto";
                    titulo.classList.add("tituloBanner");
                    newsletter.style.display = "none";
                    banner.style.backgroundImage = "url('../img/header1.jpg')";
                    tituloPagina = "Diseño y Desarrollo Web - Contacto";
                }

                // Le asigna el titulo de la pagina que corresponda
                document.title = tituloPagina;

                // Obtener los elementos de navegación
                var elementosNavegacion = document.querySelectorAll("#inicio, #somos, #ideas, #contacto");

                // Función para activar el elemento de navegación correspondiente
                function activarElemento(elemento) {
                    elemento.classList.add("active");
                }

                // Función para desactivar todos los elementos de navegación
                function desactivarElementos() {
                    elementosNavegacion.forEach(function (elemento) {
                        elemento.classList.remove("active");
                    });
                }

                // Asignar eventos de clic a los elementos de navegación
                elementosNavegacion.forEach(function (elemento) {
                    elemento.addEventListener("click", function () {
                        desactivarElementos();
                        activarElemento(elemento);
                    });
                });
            }
        };
        xhttp.open("GET", url, true);
        xhttp.send();
    }

    // Ajusta la altura del contenido según su contenido
    function ajustarAlturaContenido() {
        var contenido = document.getElementById("contenido");
        contenido.style.height = "420px"; // Restablece la altura a "auto" para recalcularla correctamente
        contenido.style.height = (contenido.scrollHeight + 100) + "px"; // Establece la altura según el contenido
    }

    cargarContenido("inicio.html");

    window.addEventListener("resize", ajustarAlturaContenido);
});


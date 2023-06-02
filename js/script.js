// Espera a que el DOM se cargue completamente
document.addEventListener("DOMContentLoaded", () => {
    // Obtiene los enlaces del menú de navegación
    const enlaces = document.querySelectorAll("nav ul li a");

    //Como se usa la funcion scrollToTop
    const botonScrollArriba = document.getElementById("botonScrollArriba");
    botonScrollArriba.addEventListener("click", scrollToTop);

    // Verificar la posición de desplazamiento al cargar la página
    verificarPosicionDesplazamiento();

    // Verificar la posición de desplazamiento al desplazar la página
    window.addEventListener("scroll", verificarPosicionDesplazamiento);

    // Itera sobre cada enlace y agrega un evento de clic
    enlaces.forEach(function (enlace) {
        enlace.addEventListener("click", function (e) {
            e.preventDefault(); // Evita el comportamiento predeterminado del enlace

            // Funcion para desplazarse hacia la sección correspondiente            
            const targetSectionId = enlace.getAttribute("href").substring(1);
            scrollToSection(targetSectionId);

            // Obtiene la URL del enlace
            var url = this.getAttribute("id") + ".html";
            // Carga el contenido de la URL en el contenedor
            cargarContenido(url);
        });
    });

    // Función para desplazarse suavemente hacia una sección
    function scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        section.scrollIntoView({ behavior: "smooth" });
    }

    // Función para desplazarse hacia arriba en la página
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    // Verificar la posición de desplazamiento al desplazar o cargar la página
    function verificarPosicionDesplazamiento() {
        var botonScrollArriba = document.getElementById("botonScrollArriba");

        if (window.pageYOffset > 0) {
            botonScrollArriba.style.display = "block"; // Mostrar el botón
        } else {
            botonScrollArriba.style.display = "none"; // Ocultar el botón
        }
    }

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
                const banner = document.getElementById("banner");
                const texto = document.getElementById("banner").querySelector("p");
                const titulo = document.getElementById("banner").querySelector("h1");
                const newsletter = document.getElementById("newsletter");

                if (url.includes("inicio.html")) {
                    banner.style.height = "400px";                                  //height del banner
                    banner.style.padding = "150px 40px";                            //paddings del banner
                    texto.style.display = "block";                                  //Mostrar el p del banner en el index.html
                    titulo.textContent = "Proporción áurea y fractales";            //Cambiar titulo del banner
                    newsletter.style.display = "block";                             //Mostrar el newsletter en el index.html
                    titulo.classList.add("tituloBannerHome");                       //Remover estilo del titulo del banner en el index.html
                    titulo.classList.remove("tituloBanner");
                    banner.style.backgroundImage = "url('../img/seccion.jpg')";     //Imagen del banner de index.html
                    tituloPagina = "Diseño y Desarrollo Web - Home";                //Cambiar titulo de la pagina
                }
                else if (url.includes("somos.html")) {
                    banner.style.height = "200px";                                  //height del banner
                    banner.style.padding = "70px 20px";                             //paddings del banner
                    texto.style.display = "none"                                    //Esconder el p del banner en el somos.html
                    titulo.textContent = "Diseño Web";                              //Cambiar titulo del banner
                    newsletter.style.display = "block";                             //Escoder el newsletter en el somos.html
                    titulo.classList.add("tituloBanner");                           //Agregarle el estilo del titulo del banner en el somos.html
                    titulo.classList.remove("tituloBannerHome");
                    banner.style.backgroundImage = "url('../img/header1.jpg')";     //Imagen del banner de index.html
                    tituloPagina = "Diseño y Desarrollo Web - Somos";               //Cambiar titulo de la pagina
                }
                else if (url.includes("ideas.html")) {
                    banner.style.height = "200px";
                    banner.style.padding = "70px 20px";
                    texto.style.display = "none"
                    titulo.textContent = "Ideas";
                    titulo.classList.add("tituloBanner");
                    titulo.classList.remove("tituloBannerHome");
                    newsletter.style.display = "block";
                    banner.style.backgroundImage = "url('../img/ideas3.jpg')";
                    tituloPagina = "Diseño y Desarrollo Web - Ideas";
                }
                else if (url.includes("contacto.html")) {
                    banner.style.height = "200px";
                    banner.style.padding = "70px 20px";
                    texto.style.display = "none"
                    titulo.textContent = "Contacto";
                    titulo.classList.add("tituloBanner");
                    titulo.classList.remove("tituloBannerHome");
                    newsletter.style.display = "block";
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
        contenido.style.height = "440px"; // Restablece la altura a "auto" para recalcularla correctamente
        contenido.style.height = (contenido.scrollHeight + 100) + "px"; // Establece la altura según el contenido
    }

    window.addEventListener("resize", ajustarAlturaContenido);

    //Carga como default el inicio.html
    cargarContenido("inicio.html");

});


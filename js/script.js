// Espera a que el DOM se cargue completamente
document.addEventListener("DOMContentLoaded", () => {

    //Carga como default el inicio.html
    cargarContenido("inicio.html");
    //Cargar como default el footer.html
    cargarFooter("footer.html");

    // Obtiene los enlaces del menú de navegación
    const enlaces = document.querySelectorAll("ul li a");

    //Como se usa la funcion scrollToTop
    const botonScrollTop = document.getElementById("botonScrollTop");
    botonScrollTop.addEventListener("click", scrollToTop);

    // Verificar la posición de desplazamiento al cargar la página
    verificarPosicionDesplazamiento();

    // Verificar la posición de desplazamiento al desplazar la página
    window.addEventListener("scroll", verificarPosicionDesplazamiento);

    // Itera sobre cada enlace y agrega un evento de clic
    enlaces.forEach(function (enlace) {
        // Verifica si el enlace tiene un atributo href
        if (enlace.hasAttribute("href")) {

            if (enlace.getAttribute("href") === "#") {
                return; // No hacer nada si el href es "#"
            }
            enlace.addEventListener("click", function (e) {
                e.preventDefault(); // Evita el comportamiento predeterminado del enlace

                // Funcion para desplazarse hacia la sección correspondiente
                const targetSectionId = enlace.getAttribute("href").substring(1);
                scrollToSection(targetSectionId);

                // Obtiene la URL del enlace
                var id = this.getAttribute("id");
                if (id.endsWith("Footer")) {
                    id = id.slice(0, -6);
                }
                var url = id + ".html";
                // Carga el contenido de la URL en el contenedor
                cargarContenido(url);
            });
        }
    });

    // Obtener los enlaces del menú
    const menuLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const menuDropDownLinks = document.querySelectorAll('.dropdown-menu .dropdown-item');

    // Obtener el menú hamburguesa y el menú colapsable
    const menuToggle = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    // Agregar evento click a los enlaces del menú
    menuLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            // Verificar si el enlace es el elemento con id "dropdown"
            if (this.id !== "dropdown") {
                // Cerrar el menú hamburguesa
                navbarCollapse.classList.remove('show');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // Agregar evento click a los enlaces del menú desplegable
    menuDropDownLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            // Cerrar el menú hamburguesa
            navbarCollapse.classList.remove('show');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });

    // Función para desplazarse suavemente hacia una sección
    function scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);

        if (section) {
            section.scrollIntoView({
                behavior: "smooth"
            });
        }
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
        var botonScrollTop = document.getElementById("botonScrollTop");

        if (window.pageYOffset > 0) {
            botonScrollTop.style.display = "block"; // Mostrar el botón
        } else {
            botonScrollTop.style.display = "none"; // Ocultar el botón
        }
    }

    //Footer
    function cargarFooter(url) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("footer").innerHTML = this.responseText;
            }
        };
        xhttp.open("GET", url, true);
        xhttp.send();
    }

    //Funcion footer para cargar el contenido de la url de los liks en el contenedor
    function cargarFooter(url) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("footer").innerHTML = this.responseText;

                // Asignar eventos de clic a los enlaces del menú del footer
                var enlacesFooter = document.querySelectorAll("#footer ul li a");

                enlacesFooter.forEach(function (enlace) {
                    if (enlace.hasAttribute("href")) {
                        enlace.addEventListener("click", function (e) {
                            e.preventDefault(); // Evitar el comportamiento predeterminado del enlace

                            // Obtener la URL del enlace
                            var url = this.getAttribute("href");

                            // Cargar el contenido de la URL en el contenedor
                            cargarContenido(url);
                        });
                    }
                });
            }
        };
        xhttp.open("GET", url, true);
        xhttp.send();
    }

    // Función para cargar el contenido de una URL en el contenedor
    function cargarContenido(url) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("contenido").innerHTML = this.responseText;

                // Variable para titulo de la pagina
                var tituloPagina = "";

                // Cambiar la clase y estilos del banner segun la URL
                const banner = document.getElementById("banner");
                const texto = document.getElementById("banner").querySelector("p");
                const titulo = document.getElementById("banner").querySelector("h1");
                const newsletter = document.getElementById("newsletter");
                const video = document.getElementById("video");

                if (url.includes("inicio.html")) {
                    banner.style.height = "400px";                                  //height del banner
                    banner.style.lineHeight = "400px";                              //LineHeight del banner para que este centrado
                    texto.style.display = "block";                                  //Mostrar el p del banner en el index.html
                    titulo.textContent = "Next Fest steam";                         //Cambiar titulo del banner
                    texto.textContent = "Siete dias, cientos de demos y un monton de retransmisiones en directo.";
                    newsletter.style.display = "block";                             //Mostrar el newsletter en el index.html
                    banner.style.backgroundPosition = "center";                     //Centrar banner image
                    titulo.classList.add("tituloBannerHome");                       //Remover estilo del titulo del banner en el index.html
                    titulo.classList.remove("tituloBanner");                        //Remover titulo banner style de otras secciones
                    //banner.style.backgroundImage = "url('../img/Seccion.jpg')";     //Imagen del banner de index.html
                    tituloPagina = "Steam fan Web - Home";                          //Cambiar titulo de la pagina
                    video.style.display = "block";                                  //Mostrar video de banner
                }
                else if (url.includes("somos.html")) {
                    banner.style.height = "200px";                                  //height del banner
                    banner.style.lineHeight = "200px";                              //LineHeight del banner para que este centrado
                    texto.style.display = "none"                                    //Esconder el p del banner en el somos.html
                    titulo.textContent = "¿Quienes Somos?";                         //Cambiar titulo del banner
                    banner.style.backgroundPosition = "center";                     //Centrar banner image
                    newsletter.style.display = "block";                             //Escoder el newsletter en el somos.html
                    titulo.classList.add("tituloBanner");                           //Agregarle el estilo del titulo del banner en el somos.html
                    titulo.classList.remove("tituloBannerHome");                    //remover estilo del titulo de inicio
                    banner.style.backgroundImage = "url('img/somos.webp')";         //Imagen del banner de index.html
                    tituloPagina = "Steam fan Web - Somos";                         //Cambiar titulo de la pagina
                    video.style.display = "none";                                   //Ocultar video de banner
                }
                else if (url.includes("juegos.html")) {
                    banner.style.height = "350px";
                    banner.style.lineHeight = "350px";
                    banner.style.backgroundPosition = "top";
                    texto.style.display = "block"
                    titulo.textContent = "Biblioteca de Juegos";
                    texto.textContent = "Lista de los juegos mas importantes de steam 2023";
                    titulo.classList.add("tituloBanner");
                    titulo.classList.remove("tituloBannerHome");
                    newsletter.style.display = "block";
                    banner.style.backgroundImage = "url('img/juegos.webp')";
                    tituloPagina = "Steam fan Web - Juegos";
                    video.style.display = "none";
                }
                else if (url.includes("contacto.html")) {
                    banner.style.height = "200px";
                    banner.style.lineHeight = "200px";
                    banner.style.backgroundPosition = "center";
                    texto.style.display = "none"
                    titulo.textContent = "Contacto";
                    titulo.classList.add("tituloBanner");
                    titulo.classList.remove("tituloBannerHome");
                    newsletter.style.display = "block";
                    banner.style.backgroundImage = "url('img/contacto.webp')";
                    tituloPagina = "Steam fan Web - Contacto";
                    video.style.display = "none";
                }

                // Le asigna el titulo de la pagina que corresponda
                document.title = tituloPagina;

                // Obtener los elementos de navegación
                var elementosNavegacion = document.querySelectorAll("#inicio, #somos, #juegos, #contacto, #inicioFooter, #somosFooter, #contactoFooter, #juegosFooter, #dropdown");

                // Función para activar el elemento de navegación correspondiente
                function activarElemento(elemento) {
                    if (elemento.id !== "dropdown") {
                        elemento.classList.add("active");
                    }
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
                        if (elemento.id !== "dropdown") {
                            desactivarElementos();
                        }
                        activarElemento(elemento);
                    });
                });
            }
        };
        xhttp.open("GET", url, true);
        xhttp.send();
    }
});


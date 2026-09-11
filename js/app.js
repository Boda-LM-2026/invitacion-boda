document.addEventListener("DOMContentLoaded", () => {

    /* =====================================
       ELEMENTOS PRINCIPALES
    ===================================== */

    const envelope = null; // La portada nueva controla la apertura del sobre
    const cover = document.getElementById("cover");
    const invitation = document.getElementById("invitation");
    const musicBtn = document.getElementById("musicBtn");
    const music = document.getElementById("music");
    const closeModal = document.getElementById("closeModal");


    /* =====================================
       ABRIR INVITACIÓN
    ===================================== */

    if (envelope) {

        envelope.addEventListener("click", openInvitation);

    }


    function openInvitation() {

        // Evitar múltiples clics
        if (!envelope || envelope.classList.contains("opening")) {
            return;
        }

        envelope.classList.add("opening");

        envelope.style.pointerEvents = "none";


        // Animación del sobre
        envelope.classList.add("open");


        // Lanzar pétalos
        startPetals();


        // Esperar a que termine la animación
        setTimeout(() => {

            if (!cover) return;


            // Desvanecer portada
            cover.style.transition = "opacity 1s ease";
            cover.style.opacity = "0";


            setTimeout(() => {

                // Ocultar portada
                cover.style.display = "none";


                // Mostrar invitación
                if (invitation) {

                    invitation.classList.remove("hidden");

                }


                // Mostrar botón de música
                if (musicBtn) {

                    musicBtn.classList.remove("hidden");

                }


                // Activar scroll
                document.body.style.overflow = "auto";


                // Intentar reproducir música
                if (music) {

                    music.play().catch(() => {
                        console.log("El navegador bloqueó la reproducción automática.");
                    });

                }

            }, 1000);

        }, 1200);

    }


    /* =====================================
       BOTÓN X
    ===================================== */

    if (closeModal) {

        closeModal.addEventListener("click", (event) => {

            // Evitar que el clic llegue al sobre
            event.stopPropagation();


            if (!cover) return;


            // Ocultar portada
            cover.style.transition = "opacity .6s ease";
            cover.style.opacity = "0";


            setTimeout(() => {

                cover.style.display = "none";

            }, 600);

        });

    }


    /* =====================================
       PÉTALOS
    ===================================== */

    function startPetals() {

        const container = document.getElementById("petals");

        if (!container) return;


        // Limpiar pétalos anteriores
        container.innerHTML = "";


        for (let i = 0; i < 25; i++) {

            const petal = document.createElement("div");

            petal.classList.add("petal");

            petal.innerHTML = "💍👰🏻🤵🏻";


            // Posición horizontal aleatoria
            petal.style.left =
                Math.random() * 100 + "vw";


            // Duración aleatoria
            petal.style.animationDuration =
                (5 + Math.random() * 5) + "s";


            // Tamaño aleatorio
            petal.style.fontSize =
                (18 + Math.random() * 18) + "px";


            // Pequeño retraso aleatorio
            petal.style.animationDelay =
                Math.random() * 1.5 + "s";


            container.appendChild(petal);


            // Eliminar después de la animación
            setTimeout(() => {

                petal.remove();

            }, 11000);

        }

    }


    /* =====================================
       CONFIGURACIÓN DE LA INVITACIÓN
    ===================================== */

    if (typeof CONFIG !== "undefined") {


        // Iglesia
        const iglesia = document.getElementById("iglesia");

        if (iglesia && CONFIG.iglesia) {

            iglesia.textContent = CONFIG.iglesia;

        }


        // Recepción
        const recepcion = document.getElementById("recepcion");

        if (recepcion && CONFIG.recepcion) {

            recepcion.textContent = CONFIG.recepcion;

        }


       // =====================================
// UBICACIÓN CEREMONIA
// =====================================

// Google Maps - Catedral
const iglesiaGoogleMaps =
    document.getElementById("iglesiaGoogleMaps");

if (iglesiaGoogleMaps && CONFIG.iglesiaGoogleMaps) {
    iglesiaGoogleMaps.href = CONFIG.iglesiaGoogleMaps;
}


// Waze - Catedral
const iglesiaWaze =
    document.getElementById("iglesiaWaze");

if (iglesiaWaze && CONFIG.iglesiaWaze) {
    iglesiaWaze.href = CONFIG.iglesiaWaze;
}


// =====================================
// UBICACIÓN RECEPCIÓN
// =====================================

// Google Maps - Teatro Abril
const recepcionGoogleMaps =
    document.getElementById("recepcionGoogleMaps");

if (recepcionGoogleMaps && CONFIG.recepcionGoogleMaps) {
    recepcionGoogleMaps.href = CONFIG.recepcionGoogleMaps;
}


// Waze - Teatro Abril
const recepcionWaze =
    document.getElementById("recepcionWaze");

if (recepcionWaze && CONFIG.recepcionWaze) {
    recepcionWaze.href = CONFIG.recepcionWaze;
}

    }


    /* =====================================
       CONFIRMACIÓN POR WHATSAPP
    ===================================== */

    const confirmButton =
        document.getElementById("confirmButton");


    if (confirmButton) {

        confirmButton.addEventListener("click", () => {


            const guestName =
                document.getElementById("guestName");


            const guests =
                document.getElementById("guests");


            if (!guestName || !guests) {
                return;
            }


            const nombre =
                guestName.value.trim();


            const cantidad =
                guests.value;


            // Validar nombre
            if (!nombre) {

                alert("Por favor, escribe tu nombre.");

                guestName.focus();

                return;

            }


            // Validar cantidad
            if (!cantidad || Number(cantidad) < 1) {

                alert("Por favor, indica la cantidad de invitados.");

                guests.focus();

                return;

            }


            // Verificar configuración
            if (
                typeof CONFIG === "undefined" ||
                !CONFIG.whatsapp
            ) {

                alert("No se ha configurado el número de WhatsApp.");

                return;

            }


            // Crear mensaje
            const mensaje =
`Hola Ludwin y Mishel ❤️

Mi nombre es ${nombre}.

Confirmo ${cantidad} invitado(s).

¡Nos vemos en su boda! 💍❤️`;


            // Crear enlace de WhatsApp
            const whatsappURL =
                `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(mensaje)}`;


            // Abrir WhatsApp
            window.open(
                whatsappURL,
                "_blank"
            );

        });

    }


    /* =====================================
       PREVENIR SCROLL MIENTRAS ESTÁ LA PORTADA
    ===================================== */

    if (cover && !cover.classList.contains("hidden")) {

        document.body.style.overflow = "hidden";

    }


});
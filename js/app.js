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
                        console.log(
                            "El navegador bloqueó la reproducción automática."
                        );
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

        const container =
            document.getElementById("petals");

        if (!container) return;


        // Limpiar pétalos anteriores
        container.innerHTML = "";


        for (let i = 0; i < 25; i++) {

            const petal =
                document.createElement("div");

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
        const iglesia =
            document.getElementById("iglesia");

        if (iglesia && CONFIG.iglesia) {

            iglesia.textContent =
                CONFIG.iglesia;

        }


        // Recepción
        const recepcion =
            document.getElementById("recepcion");

        if (recepcion && CONFIG.recepcion) {

            recepcion.textContent =
                CONFIG.recepcion;

        }


        // =====================================
        // UBICACIÓN CEREMONIA
        // =====================================

        // Google Maps - Catedral
        const iglesiaGoogleMaps =
            document.getElementById(
                "iglesiaGoogleMaps"
            );

        if (
            iglesiaGoogleMaps &&
            CONFIG.iglesiaGoogleMaps
        ) {

            iglesiaGoogleMaps.href =
                CONFIG.iglesiaGoogleMaps;

        }


        // Waze - Catedral
        const iglesiaWaze =
            document.getElementById(
                "iglesiaWaze"
            );

        if (
            iglesiaWaze &&
            CONFIG.iglesiaWaze
        ) {

            iglesiaWaze.href =
                CONFIG.iglesiaWaze;

        }


        // =====================================
        // UBICACIÓN RECEPCIÓN
        // =====================================

        // Google Maps - Teatro Abril
        const recepcionGoogleMaps =
            document.getElementById(
                "recepcionGoogleMaps"
            );

        if (
            recepcionGoogleMaps &&
            CONFIG.recepcionGoogleMaps
        ) {

            recepcionGoogleMaps.href =
                CONFIG.recepcionGoogleMaps;

        }


        // Waze - Teatro Abril
        const recepcionWaze =
            document.getElementById(
                "recepcionWaze"
            );

        if (
            recepcionWaze &&
            CONFIG.recepcionWaze
        ) {

            recepcionWaze.href =
                CONFIG.recepcionWaze;

        }

    }


    /* =====================================
       INVITADO SEGÚN URL
    ===================================== */

    // Leer parámetros de la URL
    const params =
        new URLSearchParams(
            window.location.search
        );


    const nombreInvitado =
        params.get("nombre");


    let maxAdultos =
        parseInt(params.get("adultos"));


    let maxNinos =
        parseInt(params.get("ninos"));


    const nombreInvitacion =
        document.getElementById(
            "nombreInvitacion"
        );


    if (
        nombreInvitacion &&
        nombreInvitado
    ) {

        nombreInvitacion.textContent =
            nombreInvitado;

    }


    /* =====================================
       VALIDAR CANTIDADES MÁXIMAS
    ===================================== */

    // Adultos
    if (
        isNaN(maxAdultos) ||
        maxAdultos < 1
    ) {

        maxAdultos = 1;

    }


    if (maxAdultos > 10) {

        maxAdultos = 10;

    }


    // Niños
    if (
        isNaN(maxNinos) ||
        maxNinos < 0
    ) {

        maxNinos = 0;

    }


    if (maxNinos > 10) {

        maxNinos = 10;

    }


    /* =====================================
       COLOCAR NOMBRE AUTOMÁTICAMENTE
    ===================================== */

    const guestNameInput =
        document.getElementById(
            "guestName"
        );


    if (guestNameInput) {

        if (nombreInvitado) {

            guestNameInput.value =
                nombreInvitado;

            guestNameInput.readOnly =
                true;

        } else {

            guestNameInput.readOnly =
                false;

        }

    }


    /* =====================================
       CREAR COMBO DE ADULTOS
    ===================================== */

    const adultsSelect =
        document.getElementById(
            "adults"
        );


    if (adultsSelect) {

        for (
            let i = 1;
            i <= maxAdultos;
            i++
        ) {

            const option =
                document.createElement(
                    "option"
                );


            option.value = i;


            option.textContent =
                i === 1
                    ? "1 adulto"
                    : `${i} adultos`;


            adultsSelect.appendChild(
                option
            );

        }

    }


    /* =====================================
       CREAR / OCULTAR COMBO DE NIÑOS
    ===================================== */

    const childrenGroup =
        document.getElementById(
            "childrenGroup"
        );


    const childrenSelect =
        document.getElementById(
            "children"
        );


    // Si esta invitación NO tiene niños,
    // ocultamos completamente el combo.
    if (maxNinos === 0) {

        if (childrenGroup) {

            childrenGroup.style.display =
                "none";

        }

    } else {

        // Si sí tiene niños permitidos,
        // mostramos el combo.
        if (childrenGroup) {

            childrenGroup.style.display =
                "";

        }


        if (childrenSelect) {

            for (
                let i = 0;
                i <= maxNinos;
                i++
            ) {

                const option =
                    document.createElement(
                        "option"
                    );


                option.value = i;


                option.textContent =
                    i === 0
                        ? "0 niños"
                        : i === 1
                            ? "1 niño"
                            : `${i} niños`;


                childrenSelect.appendChild(
                    option
                );

            }

        }

    }


    /* =====================================
       CONFIRMACIÓN POR WHATSAPP
    ===================================== */

    const confirmButton =
        document.getElementById(
            "confirmButton"
        );


    if (confirmButton) {

        confirmButton.addEventListener(
            "click",
            () => {


                const guestName =
                    document.getElementById(
                        "guestName"
                    );


                const adults =
                    document.getElementById(
                        "adults"
                    );


                const children =
                    document.getElementById(
                        "children"
                    );


                if (
                    !guestName ||
                    !adults
                ) {

                    return;

                }


                const nombre =
                    guestName.value.trim();


                const cantidadAdultos =
                    adults.value;


                /* =====================================
                   VALIDAR NOMBRE
                ===================================== */

                if (!nombre) {

                    alert(
                        "Por favor, escribe tu nombre."
                    );

                    guestName.focus();

                    return;

                }


                /* =====================================
                   VALIDAR ADULTOS
                ===================================== */

                if (
                    !cantidadAdultos ||
                    Number(
                        cantidadAdultos
                    ) < 1
                ) {

                    alert(
                        "Por favor, indica la cantidad de adultos."
                    );

                    adults.focus();

                    return;

                }


                if (
                    Number(
                        cantidadAdultos
                    ) > maxAdultos
                ) {

                    alert(
                        `Esta invitación permite un máximo de ${maxAdultos} adulto(s).`
                    );

                    return;

                }


                /* =====================================
                   VALIDAR NIÑOS
                ===================================== */

                let cantidadNinos = 0;


                // Solamente validamos niños
                // si esta invitación permite niños.
                if (maxNinos > 0) {


                    if (
                        !children ||
                        children.value === ""
                    ) {

                        alert(
                            "Por favor, indica la cantidad de niños."
                        );


                        if (children) {

                            children.focus();

                        }


                        return;

                    }


                    cantidadNinos =
                        Number(
                            children.value
                        );


                    if (
                        cantidadNinos >
                        maxNinos
                    ) {

                        alert(
                            `Esta invitación permite un máximo de ${maxNinos} niño(s).`
                        );

                        return;

                    }

                }


                /* =====================================
                   VERIFICAR WHATSAPP
                ===================================== */

                if (
                    typeof CONFIG ===
                        "undefined" ||
                    !CONFIG.whatsapp
                ) {

                    alert(
                        "No se ha configurado el número de WhatsApp."
                    );

                    return;

                }


                /* =====================================
                   CREAR TEXTO DE ASISTENCIA
                ===================================== */

                let asistenciaTexto = "";


                // Adultos
                if (
                    Number(
                        cantidadAdultos
                    ) === 1
                ) {

                    asistenciaTexto =
                        "1 adulto";

                } else {

                    asistenciaTexto =
                        `${cantidadAdultos} adultos`;

                }


                // Agregamos niños solamente
                // si realmente asistirán niños.
                if (
                    cantidadNinos > 0
                ) {

                    if (
                        cantidadNinos === 1
                    ) {

                        asistenciaTexto +=
                            " y 1 niño";

                    } else {

                        asistenciaTexto +=
                            ` y ${cantidadNinos} niños`;

                    }

                }


                /* =====================================
                   CREAR MENSAJE WHATSAPP
                ===================================== */

                const mensaje =
`Hola Ludwin y Mishel ❤️

Mi nombre es ${nombre}.

Confirmo ${asistenciaTexto}.

¡Nos vemos en su boda! 💍❤️`;


                /* =====================================
                   CREAR ENLACE WHATSAPP
                ===================================== */

                const whatsappURL =
                    `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(mensaje)}`;


                /* =====================================
                   ABRIR WHATSAPP
                ===================================== */

                window.open(
                    whatsappURL,
                    "_blank"
                );

            }
        );

    }


    /* =====================================
       NO CONFIRMAR ASISTENCIA
    ===================================== */

    const noconfirmButton =
        document.getElementById(
            "noconfirmButton"
        );


    if (noconfirmButton) {

        noconfirmButton.addEventListener(
            "click",
            () => {


                const guestName =
                    document.getElementById(
                        "guestName"
                    );


                if (!guestName) {

                    return;

                }


                const nombre =
                    guestName.value.trim();


                /* =====================================
                   VALIDAR NOMBRE
                ===================================== */

                if (!nombre) {

                    alert(
                        "Por favor, escribe tu nombre."
                    );

                    guestName.focus();

                    return;

                }


                /* =====================================
                   VERIFICAR WHATSAPP
                ===================================== */

                if (
                    typeof CONFIG ===
                        "undefined" ||
                    !CONFIG.whatsapp
                ) {

                    alert(
                        "No se ha configurado el número de WhatsApp."
                    );

                    return;

                }


                /* =====================================
                   MENSAJE NO ASISTIRÉ
                ===================================== */

                const mensaje =
`Hola Ludwin y Mishel ❤️

Mi nombre es ${nombre}.

Lamento mucho no poder acompañarlos en este día tan especial.

Les deseo toda la felicidad del mundo en esta nueva etapa de sus vidas. 💍🤍

¡Que Dios bendiga siempre su matrimonio!`;


                /* =====================================
                   CREAR ENLACE WHATSAPP
                ===================================== */

                const whatsappURL =
                    `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(mensaje)}`;


                /* =====================================
                   ABRIR WHATSAPP
                ===================================== */

                window.open(
                    whatsappURL,
                    "_blank"
                );

            }
        );

    }


    /* =====================================
       PREVENIR SCROLL MIENTRAS ESTÁ LA PORTADA
    ===================================== */

    if (
        cover &&
        !cover.classList.contains(
            "hidden"
        )
    ) {

        document.body.style.overflow =
            "hidden";

    }


});
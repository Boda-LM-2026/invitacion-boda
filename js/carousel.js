// =========================================
// CARRUSELES INDEPENDIENTES
// =========================================

const carousels = document.querySelectorAll(".carousel");

carousels.forEach((carousel) => {

    // Agarra únicamente las fotos de ESTE carrusel
    const slides = carousel.querySelectorAll(".slide");

    let current = 0;

    // Si no hay fotos, no hace nada
    if (slides.length === 0) {
        return;
    }

    // Dejamos activa solamente la primera foto
    slides.forEach((slide) => {
        slide.classList.remove("active");
    });

    slides[0].classList.add("active");


    function nextSlide() {

        // Quitar foto actual
        slides[current].classList.remove("active");

        // Siguiente foto
        current = (current + 1) % slides.length;

        // Mostrar siguiente foto
        slides[current].classList.add("active");
    }


    // Cambiar cada 4 segundos
    setInterval(nextSlide, 4000);

});
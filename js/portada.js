const cover = document.getElementById("cover");
const envelope = document.getElementById("envelope");
const waxSeal = document.getElementById("waxSeal");
const invitation = document.getElementById("invitation");

let opened = false;

function openInvitation() {
  if (opened) return;
  opened = true;

  // Abre la solapa hacia arriba
  envelope.classList.add("lm-open");

  // Desvanece la portada después de que abra el sobre
  setTimeout(() => {
    cover.classList.add("lm-fade-out");
  }, 1350);

  // Muestra la invitación
  setTimeout(() => {
    cover.style.display = "none";
    invitation.classList.remove("hidden");

    const musicBtn = document.getElementById("musicBtn");
    const music = document.getElementById("music");
    if (musicBtn) musicBtn.classList.remove("hidden");
    if (music) music.play().catch(() => {});

    // Lanzar los pétalos/anillos al entrar a la invitación
    const petals = document.getElementById("petals");
    if (petals) {
      petals.innerHTML = "";
      for (let i = 0; i < 25; i++) {
        const petal = document.createElement("div");
        petal.classList.add("petal");
        //petal.innerHTML = "cosas que caen";
        petal.style.left = Math.random() * 100 + "vw";
        petal.style.animationDuration = (5 + Math.random() * 5) + "s";
        petal.style.fontSize = (18 + Math.random() * 18) + "px";
        petal.style.animationDelay = Math.random() * 1.5 + "s";
        petals.appendChild(petal);
        setTimeout(() => petal.remove(), 11000);
      }
    }

    document.body.style.overflow = "auto";
  }, 2150);
}

waxSeal.addEventListener("click", (e) => {
  e.stopPropagation();
  openInvitation();
});

envelope.addEventListener("click", openInvitation);

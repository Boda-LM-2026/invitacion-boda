const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");
let playing = false;

if (music && musicBtn) {
  musicBtn.addEventListener("click", () => {
    if (music.paused) {
      music.play().catch(() => {});
      playing = true;
      musicBtn.textContent = "⏸️";
    } else {
      music.pause();
      playing = false;
      musicBtn.textContent = "🎵";
    }
  });
}

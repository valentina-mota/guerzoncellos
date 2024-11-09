// Selezione degli elementi necessari
const hamburger = document.querySelector(".hamburger-menu");
const overlay = document.querySelector(".overlay-hidden-menu-page");
const fader = document.getElementById("fader"); // Seleziona l'elemento fader

// Funzione per attivare le animazioni del menu
function toggleMenu() {
  const topLine = document.querySelector(".line.top");
  const middleLine = document.querySelector(".line.middle");
  const bottomLine = document.querySelector(".line.bottom");

  topLine.classList.toggle("top-active");
  middleLine.classList.toggle("middle-active");
  bottomLine.classList.toggle("bottom-active");
}

// Funzione per il comportamento di scorrimento su/giù dell'overlay con l'hamburger
hamburger.addEventListener("click", () => {
  toggleMenu(); // Attiva/disattiva le animazioni dell'hamburger

  // Se l'overlay è visibile (scorre verso l'alto), facciamolo scorrere verso il basso
  if (overlay.classList.contains("visible")) {
    overlay.classList.remove("visible"); // Rimuove la classe visibile per farlo scorrere giù
    overlay.classList.add("hidden"); // Aggiunge la classe per lo scorrimento verso il basso
  } else {
    overlay.classList.remove("hidden"); // Rimuove la classe per lo scorrimento verso il basso
    overlay.classList.add("visible"); // Aggiunge la classe per lo scorrimento verso l'alto
  }
});

// Selezione dei link del menu
const menuLinks = document.querySelectorAll(
  ".overlay-hidden-menu-page ul li a"
);

// Aggiunge l'evento ai link del menu per chiudere l'overlay e resettare l'hamburger
menuLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault(); // Evita lo scroll automatico

    // Se il link è Home (href="#"), scrolla all'inizio
    if (link.getAttribute("href") === "#") {
      overlay.classList.remove("visible"); // Chiude l'overlay
      overlay.classList.add("hidden"); // Torna allo stato iniziale

      toggleMenu(); // Resetta le animazioni dell'hamburger

      // Mostra il fader (fade-in)
      fader.style.opacity = "1";

      // Attendi 500ms e torna in cima
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll all'inizio

        // Nasconde il fader (fade-out lento)
        setTimeout(() => {
          fader.style.opacity = "0";
        }, 700); // Tempo per il fade-out (2 secondi)
      }, 500);
    } else {
      const target = document.querySelector(link.getAttribute("href"));
      const offset = 0;
      const targetPosition =
        target.getBoundingClientRect().top + window.scrollY - offset;

      overlay.classList.remove("visible");
      overlay.classList.add("hidden");

      toggleMenu();

      fader.style.opacity = "1";

      setTimeout(() => {
        window.scrollTo({ top: targetPosition, behavior: "smooth" });

        setTimeout(() => {
          fader.style.opacity = "0";
        }, 700);
      }, 500);
    }
  });
});


//pulsante circolare
document.getElementById("audioButton").addEventListener("click", function () {
  const audioPlayer = document.getElementById("audioPlayer");

  if (audioPlayer.paused) {
    audioPlayer.currentTime = 0; // Riavvia l'audio dall'inizio
    audioPlayer.play();
    this.classList.add("active"); // Nasconde l'effetto pulse
  } else {
    audioPlayer.pause();
    audioPlayer.currentTime = 0; // Riavvia l'audio dall'inizio per il prossimo click
    this.classList.remove("active"); // Ripristina l'effetto pulse
  }
});


// pulse button su schermi piccoli
if (window.matchMedia("(max-width: 375px)").matches) {
  window.addEventListener("scroll", function () {
    const pulseButton = document.getElementById("audioButton");

    if (window.scrollY > 300) {
      pulseButton.style.opacity = 1;
      pulseButton.style.transition = ".5s";

    } else {
      pulseButton.style.opacity = 0;
      pulseButton.style.transition = ".5s";
    }
  });
}

// end pulse

//function per iphone8

function adjustHeroHeight() {
  const heroSection = document.querySelector(".hero");
  heroSection.style.height = `${window.innerHeight}px`;
}

// Definisce la media query per iPhone8 (max-width: 375px e max-height: 667px)
const iPhone8MediaQuery = window.matchMedia(
  "(max-width: 375px) and (max-height: 667px)"
);

// Controlla se la media query è soddisfatta e applica adjustHeroHeight di conseguenza
if (iPhone8MediaQuery.matches) {
  window.addEventListener("resize", adjustHeroHeight);
  window.addEventListener("load", adjustHeroHeight);
}

// Chiudi l'overlay se si clicca fuori dai link
overlay.addEventListener("click", (e) => {
  // Verifica se il target del click non è un link
  if (!e.target.closest("a")) {
    overlay.classList.remove("visible"); // Chiude l'overlay
    overlay.classList.add("hidden"); // Torna allo stato iniziale

    // Reset delle animazioni dell'hamburger
    toggleMenu();
  }
});

function textAnimationA(selector, flag, texts) {
  const textWrapper = document.querySelector(selector);

  textWrapper.textContent = texts[0];
  textWrapper.innerHTML = textWrapper.textContent.replace(
    /\S/g,
    "<span class='letter'>$&</span>"
  );

  anime
    .timeline({
      loop: false,
      run: function (anim) {
        const progess = Math.round(anim.progress);
        if (progess === 100 && flag) {
          flag = false;
          textAnimationB(selector, flag, texts);
        } else if (progess === 1) {
          flag = true;
        }
      },
    })
    .add({
      targets: `${selector} .letter`,
      translateX: [40, 0],
      translateZ: 0,
      opacity: [0, 1],
      easing: "easeOutExpo",
      duration: 600,
      delay: (_el, i) => 500 + 15 * i,
    })
    .add({
      targets: `${selector} .letter`,
      translateX: [0, -30],
      opacity: [1, 0],
      easing: "easeInExpo",
      duration: 1200,
      delay: (_el, i) => 100 + 10 * i,
    });
}

function textAnimationB(selector, flag, texts) {
  const textWrapper = document.querySelector(selector);

  textWrapper.textContent = texts[1];
  textWrapper.innerHTML = textWrapper.textContent.replace(
    /\S/g,
    "<span class='letter'>$&</span>"
  );

  anime
    .timeline({
      loop: false,
      run: function (anim) {
        const progess = Math.round(anim.progress);
        if (progess === 100 && flag) {
          flag = false;
          textAnimationA(selector, flag, texts);
        } else if (progess === 1) {
          flag = true;
        }
      },
    })
    .add({
      targets: `${selector} .letter`,
      translateX: [40, 0],
      translateZ: 0,
      opacity: [0, 1],
      easing: "easeOutExpo",
      duration: 600,
      delay: (_el, i) => 500 + 15 * i,
    })
    .add({
      targets: `${selector} .letter`,
      translateX: [0, -30],
      opacity: [1, 0],
      easing: "easeInExpo",
      duration: 1200,
      delay: (_el, i) => 100 + 10 * i,
    });
}

const subtitleTexts = [
  "Tu proyecto comienza con una buena decisión: calidad, confianza y experiencia al servicio de tu reforma.",
  "Especialistas en reformas integrales, rehabilitación y construcción a medida. Tu hogar, como siempre lo soñaste.",
];
let mainSubtitleFlag = false;
textAnimationA("#main-subtitle", mainSubtitleFlag, subtitleTexts);

const servicesTexts = [
  "Conoce todo lo que podemos hacer por tu espacio: reformas personalizadas, construcción, interiorismo y más. Tu futuro, bien construido.",
  "Te acompañamos en cada etapa de tu proyecto: planificación, diseño, ejecución y acabados. Reformas eficientes, modernas y a tu medida.",
];
let servicesFlag = false;
textAnimationA("#our-services", servicesFlag, servicesTexts);

const projectsTexts = [
  "Te mostramos una selección de reformas y construcciones que hemos realizado con dedicación, calidad y atención al detalle.",
  "Diseñamos y ejecutamos soluciones reales para personas reales. Conoce los resultados de confiar en 'Reformando tu futuro'.",
];
let projectsFlag = false;
textAnimationA("#our-projects", projectsFlag, projectsTexts);

// scroll animation
function initServicesAnimation(selector) {
  const serviceCards = document.querySelectorAll(selector);

  if (serviceCards.length === 0) {
    console.warn("No service cards found");
    return;
  }

  // Set initial state for all cards
  serviceCards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(50px) scale(0.9)";
  });

  // Create intersection observer for scroll detection
  const observerOptions = {
    threshold: 0.1, // Trigger when 10% of element is visible
    rootMargin: "0px 0px -20px 0px", // Trigger slightly before element enters viewport
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const card = entry.target;
        const cardIndex = Array.from(serviceCards).indexOf(card);

        // Animate the card when it comes into view
        anime({
          targets: card,
          opacity: [0, 1],
          translateY: [50, 0],
          scale: [0.9, 1],
          duration: 800,
          delay: cardIndex * 100, // Stagger animation
          easing: "easeOutExpo",
          complete: () => {
            // Add subtle hover animation after initial animation
            card.addEventListener("mouseenter", () => {
              anime({
                targets: card,
                scale: 1.05,
                duration: 300,
                easing: "easeOutQuad",
              });
            });

            card.addEventListener("mouseleave", () => {
              anime({
                targets: card,
                scale: 1,
                duration: 300,
                easing: "easeOutQuad",
              });
            });
          },
        });

        // Stop observing this card after animation
        observer.unobserve(card);
      }
    });
  }, observerOptions);

  // Start observing each service card
  serviceCards.forEach((card) => {
    observer.observe(card);
  });
}

// Initialize animations when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  initServicesAnimation(".single-services");
  initServicesAnimation(".single-news");
});

// Fallback initialization if DOMContentLoaded already fired
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    initServicesAnimation(".single-services");
    initServicesAnimation(".single-news");
  });
} else {
  initServicesAnimation(".single-services");
  initServicesAnimation(".single-news");
}

// CTES
const root = document.documentElement;

const resumeFiles = {
  en: "./assets/files/cynthiatristan-cv-en.pdf",
  es: "./assets/files/cynthiatristan-cv-es.pdf"
};

// LOCALIZACION
const translations = {
  en: {
    roleDeveloper: "Game developer", 
    roleDesigner: "Game designer",
    profileTitle: "About", 
    skillsTitle: "Experience",
    projectsTitle: "Projects", 
    linksTitle: "Contact",

    profileText: "Hi! I'm Cynthia Tristán, avid gamer and maker based in Spain.\n\nThank you for visting my page, hope you have fun looking around.\n\nMore cool stuff is always on the way!",
    skillsText: "Proin porttitor at ante sit amet feugiat. Ut nec nisi urna. Sed ultricies lacus lectus, quis euismod augue condimentum vitae. Nunc efficitur neque eget turpis posuere, in fringilla odio rhoncus. Maecenas sed quam dui. Maecenas laoreet erat orci, malesuada egestas purus hendrerit ut.\n\nNulla iaculis ullamcorper euismod. Etiam efficitur fringilla diam, ac placerat sapien tempus porttitor. Nulla scelerisque leo quis leo pulvinar, et fermentum lacus ornare. In pulvinar pharetra magna.",
    projectsText: "Proin porttitor at ante sit amet feugiat. Ut nec nisi urna. Sed ultricies lacus lectus, quis euismod augue condimentum vitae. Nunc efficitur neque eget turpis posuere, in fringilla odio rhoncus. Maecenas sed quam dui. Maecenas laoreet erat orci, malesuada egestas purus hendrerit ut.\n\nNulla iaculis ullamcorper euismod. Etiam efficitur fringilla diam, ac placerat sapien tempus porttitor. Nulla scelerisque leo quis leo pulvinar, et fermentum lacus ornare. In pulvinar pharetra magna.",
    linksText: "Proin porttitor at ante sit amet feugiat. Ut nec nisi urna. Sed ultricies lacus lectus, quis euismod augue condimentum vitae. Nunc efficitur neque eget turpis posuere, in fringilla odio rhoncus. Maecenas sed quam dui. Maecenas laoreet erat orci, malesuada egestas purus hendrerit ut.\n\nNulla iaculis ullamcorper euismod. Etiam efficitur fringilla diam, ac placerat sapien tempus porttitor. Nulla scelerisque leo quis leo pulvinar, et fermentum lacus ornare. In pulvinar pharetra magna.",
    resume: "Resume",
    mail:"Mail",

    contactFirst: "Get in touch via",
    contactLast:"or fill this form:",
    formName: "Name:",
    formEmail: "Email:",
    formSubject: "Subject:",
    formMessage: "Message:",
    formSend: "Send",

    footerDate: "August 2026<br>Cynthia Tristán Álvarez",
    footerText: "Made with Figma in HTML, CSS and JS<br>source code on <a href=\"https://github.com/cyntrist/cyntrist.github.io\">Github</a>"

  },
  es: {
    roleDeveloper: "Game developer",
    roleDesigner: "designer",
    profileTitle: "Perfil", 
    skillsTitle: "Experiencia",
    projectsTitle: "Proyectos", 
    linksTitle: "Contacto",
    profileText: "¡Hola! Soy Cynthia Tristán, apasionada jugadora y creadora viviendo en España.\n\nGracias por visitar mi página, espero que te lo pases bien echando un vistazo.\n\n¡Más cosas chulas siempre en camino!",
    skillsText: "Texto en en español.\n\nSalto de línea.",
    projectsText: "Texto en en español.\n\nSalto de línea.",
    linksText: "Texto en en español.\n\nSalto de línea.",
    resume:"CV",
    mail:"Correo",

    contactFirst: "Envía un correo a",
    contactLast:"o rellena este formulario:",
    formName: "Nombre:",
    formEmail: "Correo:",
    formSubject: "Asunto:",
    formMessage: "Mensaje:",
    formSend: "Enviar",

    footerDate: "Agosto de 2026<br>Cynthia Tristán Álvarez",
    footerText: "Hecho con Figma en HTML, CSS y JS<br>código fuente en <a href=\"https://github.com/cyntrist/cyntrist.github.io\">Github</a>"
  }
};

function setLanguage(language) {
  const selectedLanguage = translations[language] ? language : "en";
  document.documentElement.lang = selectedLanguage;
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const value = translations[selectedLanguage][element.dataset.i18n];
    if (value !== undefined) element.innerHTML = value.replace(/\n\n/g, "<br><br>");
  });
  document.querySelectorAll("[data-language]").forEach((link) => {
    link.setAttribute("aria-current", link.dataset.language === selectedLanguage ? "true" : "false");
  });

  const resumeLink = document.querySelector(".resume");
  if (resumeLink) {
    resumeLink.href = resumeFiles[selectedLanguage];
    resumeLink.download = resumeFiles[selectedLanguage].split("/").pop();
  }

  const navbar = document.querySelector("#navbar");
  if (navbar) {
    navbar.classList.toggle("navbar-es", selectedLanguage === "es");
    navbar.style.gap = selectedLanguage == "es" ? "2vw" : "3vw";
  }

  localStorage.setItem("preferred-language", selectedLanguage);
}

document.addEventListener("DOMContentLoaded", () => {
  const savedLanguage = localStorage.getItem("preferred-language");
  const browserLanguage = navigator.language.toLowerCase().startsWith("es") ? "es" : "en";
  setLanguage(savedLanguage || browserLanguage);
  document.querySelectorAll("[data-language]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      setLanguage(link.dataset.language);
    });
  });
});


// ANIMACION DEL FONDO
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  let x0 = 0;
  let y0 = 0;
  let x1 = 0;
  let y1 = 0;
  let angle = -Math.PI / 4;
  let elapsed = 0;
  let previousTime = 0;

  const directionChangeInterval = 4714;
  const directionStep = Math.PI / 4;
  const speed0 = 0.005;
  const speed1 = 0.015;

  function animateBackground(time) {
    const delta = Math.min(time - previousTime, 50);
    previousTime = time;
    elapsed += delta;

    while (elapsed >= directionChangeInterval) {
      angle += directionStep;
      elapsed -= directionChangeInterval;
    }

    x0 += Math.cos(angle) * speed0 * delta;
    y0 += Math.sin(angle) * speed0 * delta;
    x1 += Math.cos(angle) * speed1 * delta;
    y1 += Math.sin(angle) * speed1 * delta;

    root.style.setProperty("--bg0-x", `${x0}px`);
    root.style.setProperty("--bg0-y", `${y0}px`);
    root.style.setProperty("--bg1-x", `${x1}px`);
    root.style.setProperty("--bg1-y", `${y1}px`);

    window.requestAnimationFrame(animateBackground);
  }

  window.requestAnimationFrame(animateBackground);
}


// CONTACT FORM
const root = document.documentElement;

// LOCALIZACION
const translations = {
  en: {
    roleDeveloper: "Game developer", 
    roleDesigner: "designer",
    profileTitle: "Profile", 
    skillsTitle: "Skills", 
    projectsTitle: "Projects", 
    linksTitle: "Links",

    profileText: "Proin porttitor at ante sit amet feugiat. Ut nec nisi urna. Sed ultricies lacus lectus, quis euismod augue condimentum vitae. Nunc efficitur neque eget turpis posuere, in fringilla odio rhoncus. Maecenas sed quam dui. Maecenas laoreet erat orci, malesuada egestas purus hendrerit ut.\n\nNulla iaculis ullamcorper euismod. Etiam efficitur fringilla diam, ac placerat sapien tempus porttitor. Nulla scelerisque leo quis leo pulvinar, et fermentum lacus ornare. In pulvinar pharetra magna.",
    skillsText: "Proin porttitor at ante sit amet feugiat. Ut nec nisi urna. Sed ultricies lacus lectus, quis euismod augue condimentum vitae. Nunc efficitur neque eget turpis posuere, in fringilla odio rhoncus. Maecenas sed quam dui. Maecenas laoreet erat orci, malesuada egestas purus hendrerit ut.\n\nNulla iaculis ullamcorper euismod. Etiam efficitur fringilla diam, ac placerat sapien tempus porttitor. Nulla scelerisque leo quis leo pulvinar, et fermentum lacus ornare. In pulvinar pharetra magna.",
    projectsText: "Proin porttitor at ante sit amet feugiat. Ut nec nisi urna. Sed ultricies lacus lectus, quis euismod augue condimentum vitae. Nunc efficitur neque eget turpis posuere, in fringilla odio rhoncus. Maecenas sed quam dui. Maecenas laoreet erat orci, malesuada egestas purus hendrerit ut.\n\nNulla iaculis ullamcorper euismod. Etiam efficitur fringilla diam, ac placerat sapien tempus porttitor. Nulla scelerisque leo quis leo pulvinar, et fermentum lacus ornare. In pulvinar pharetra magna.",
    linksText: "Proin porttitor at ante sit amet feugiat. Ut nec nisi urna. Sed ultricies lacus lectus, quis euismod augue condimentum vitae. Nunc efficitur neque eget turpis posuere, in fringilla odio rhoncus. Maecenas sed quam dui. Maecenas laoreet erat orci, malesuada egestas purus hendrerit ut.\n\nNulla iaculis ullamcorper euismod. Etiam efficitur fringilla diam, ac placerat sapien tempus porttitor. Nulla scelerisque leo quis leo pulvinar, et fermentum lacus ornare. In pulvinar pharetra magna.",
    resume: "Resume",
    mail:"Mail",

    footerDate: "July 2026<br>Cynthia Tristán Álvarez",
    footerText: "Made with Figma in HTML, CSS and JS<br>source code on <a href=\"https://github.com/cyntrist/cyntrist.github.io\">Github</a>"

  },
  es: {
    roleDeveloper: "Game developer",
    roleDesigner: "designer",
    profileTitle: "Perfil", 
    skillsTitle: "Habilidades", 
    projectsTitle: "Proyectos", 
    linksTitle: "Enlaces",
    profileText: "Texto en en español.\n\nSalto de línea.",
    skillsText: "Texto en en español.\n\nSalto de línea.",
    projectsText: "Texto en en español.\n\nSalto de línea.",
    linksText: "Texto en en español.\n\nSalto de línea.",
    resume:"CV",
    mail:"Correo",
    footerDate: "Julio de 2026<br>Cynthia Tristán Álvarez",
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
  const speed1 = 0.012;

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

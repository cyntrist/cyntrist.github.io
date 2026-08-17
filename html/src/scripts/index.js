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
    roleDesigner: "designer",
    profileTitle: "About", 
    skillsTitle: "Experience",
    projectsTitle: "Projects", 
    linksTitle: "Contact",

    profileText: "Hi! I'm Cynthia Tristán, avid gamer and maker based in Spain.\n\nThank you for visting my page, hope you have fun looking around.\n\nMore cool stuff is always on the way!",
    skillsText: "",
    projectsText: "",
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
    resume:"Currículum",
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

function initializeMailtoLinks() {
  document.querySelectorAll("[data-user][data-domain]").forEach((link) => {
    const user = link.dataset.user;
    const domain = link.dataset.domain;
    link.href = `mailto:${user}@${domain}`;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const savedLanguage = localStorage.getItem("preferred-language");
  const browserLanguage = navigator.language.toLowerCase().startsWith("es") ? "es" : "en";
  initializeMailtoLinks();
  initializePageBackground();
  setLanguage(savedLanguage || browserLanguage);
  document.querySelectorAll("[data-language]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      setLanguage(link.dataset.language);
    });
  });
});


// ANIMACION DEL FONDO
// if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
//   let x0 = 0;
//   let y0 = 0;
//   let x1 = 0;
//   let y1 = 0;
//   let angle = -Math.PI / 4;
//   let elapsed = 0;
//   let previousTime = 0;

//   const directionChangeInterval = 4714;
//   const directionStep = Math.PI / 4;
//   const speed0 = 0.005;
//   const speed1 = 0.015;

//   function animateBackground(time) {
//     const delta = Math.min(time - previousTime, 50);
//     previousTime = time;
//     elapsed += delta;

//     while (elapsed >= directionChangeInterval) {
//       angle += directionStep;
//       elapsed -= directionChangeInterval;
//     }

//     x0 += Math.cos(angle) * speed0 * delta;
//     y0 += Math.sin(angle) * speed0 * delta;
//     x1 += Math.cos(angle) * speed1 * delta;
//     y1 += Math.sin(angle) * speed1 * delta;

//     root.style.setProperty("--bg0-x", `${x0}px`);
//     root.style.setProperty("--bg0-y", `${y0}px`);
//     root.style.setProperty("--bg1-x", `${x1}px`);
//     root.style.setProperty("--bg1-y", `${y1}px`);

//     window.requestAnimationFrame(animateBackground);
//   }

//   window.requestAnimationFrame(animateBackground);
// }

function initializePageBackground() {
  const canvas = document.querySelector(".page-background");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const gap = 40;
  const radiusVmin = 30;
  const speedIn = 0.5;
  const speedOut = 0.6;
  const restScale = 0.09;
  const minHoverScale = 1;
  const maxHoverScale = 3;
  const waveSpeed = 1200;
  const waveWidth = 180;
  const palette = [
    { type: "solid", value: "#22c55e" },
    { type: "solid", value: "#06b6d4" },
    { type: "solid", value: "#f97316" },
    { type: "solid", value: "#ef4444" },
    { type: "solid", value: "#facc15" },
    { type: "solid", value: "#ec4899" },
    { type: "solid", value: "#9ca3af" },
    { type: "solid", value: "#a78bfa" },
    { type: "solid", value: "#60a5fa" },
    { type: "solid", value: "#34d399" },
    { type: "gradient", stops: ["#6366f1", "#3b82f6"] },
    { type: "gradient", stops: ["#06b6d4", "#6366f1"] },
    { type: "gradient", stops: ["#22c55e", "#06b6d4"] },
    { type: "gradient", stops: ["#f97316", "#ef4444"] },
    { type: "gradient", stops: ["#8b5cf6", "#06b6d4"] },
    { type: "gradient", stops: ["#3b82f6", "#8b5cf6"] },
    { type: "gradient", stops: ["#34d399", "#3b82f6"] }
  ];
  const shapeTypes = ["circle", "pill", "star", "star"];

  let grid = null;
  let rafId = null;
  let pointer = null;
  let activity = 0;
  let waves = [];
  let maskRects = [];
  let frameCount = 0;
  let maskOverride = false;

  const rnd = (min, max) => Math.random() * (max - min) + min;
  const rndInt = (min, max) => Math.floor(rnd(min, max + 1));
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

  const smoothstep = (t) => {
    const clamped = Math.max(0, Math.min(1, t));
    return clamped * clamped * (3 - 2 * clamped);
  };

  const durationToFactor = (seconds) => {
    if (seconds <= 0) return 1;
    return 1 - Math.pow(0.05, 1 / (60 * seconds));
  };

  const drawCircle = (size) => {
    ctx.beginPath();
    ctx.arc(0, 0, size, 0, Math.PI * 2);
    ctx.fill();
  };

  const drawPill = (size) => {
    const width = size * 0.96;
    const height = size * 2;
    const radius = width / 2;
    const x = -width / 2;
    const y = -height / 2;
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.fill();
  };

  const drawStar = (size, points, innerRatio) => {
    ctx.beginPath();
    for (let i = 0; i < points * 2; i++) {
      const angle = (i * Math.PI) / points - Math.PI / 2;
      const radius = i % 2 === 0 ? size : size * innerRatio;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
  };

  const drawShape = (shape) => {
    if (shape.type === "circle") drawCircle(shape.size / 1.5);
    if (shape.type === "pill") drawPill(shape.size / 1.4);
    if (shape.type === "star") drawStar(shape.size, shape.points, shape.innerRatio);
  };

  const resolveFill = (colorDef, size) => {
    if (colorDef.type === "solid") return colorDef.value;
    const gradient = ctx.createRadialGradient(0, -size * 0.3, 0, 0, size * 0.3, size * 1.5);
    gradient.addColorStop(0, colorDef.stops[0]);
    gradient.addColorStop(1, colorDef.stops[1]);
    return gradient;
  };

  const randomStarProps = () => ({
    points: rndInt(4, 10),
    innerRatio: rnd(0.1, 0.5)
  });

  const getDocumentHeight = () => Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    window.innerHeight
  );

  const buildGrid = () => {
    const width = window.innerWidth;
    const height = getDocumentHeight();
    const cols = Math.max(1, Math.floor(width / gap));
    const rows = Math.max(1, Math.floor(height / gap));
    const offsetX = (width - (cols - 1) * gap) / 2;
    const offsetY = (height - (rows - 1) * gap) / 2;
    const shapes = [];

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const type = pick(shapeTypes);
        const shape = {
          x: offsetX + col * gap,
          y: offsetY + row * gap,
          type,
          color: pick(palette),
          angle: rnd(0, Math.PI * 2),
          size: gap * 0.38,
          scale: restScale,
          maxScale: rnd(minHoverScale, maxHoverScale),
          hovered: false
        };
        if (type === "star") Object.assign(shape, randomStarProps());
        shapes.push(shape);
      }
    }

    return { shapes, width, height };
  };

  const resizeCanvas = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const pixelRatio = window.devicePixelRatio || 1;
    canvas.width = Math.max(1, Math.round(width * pixelRatio));
    canvas.height = Math.max(1, Math.round(height * pixelRatio));
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    grid = buildGrid();
  };

  const updateMaskRects = () => {
    const scrollY = window.scrollY;
    maskRects = Array.from(document.querySelectorAll("[data-shape-mask]"))
      .map((element) => {
        const rect = element.getBoundingClientRect();
        return {
          left: rect.left,
          right: rect.right,
          top: rect.top + scrollY,
          bottom: rect.bottom + scrollY
        };
      });
  };

  const triggerWave = (x = window.innerWidth / 2, y = window.scrollY + window.innerHeight / 2) => {
    waves.push({ x, y, startTime: performance.now() });
    maskOverride = true;

    const width = window.innerWidth;
    const height = getDocumentHeight();
    const delay = Math.sqrt(width * width + height * height) / waveSpeed;
    window.setTimeout(() => {
      maskOverride = false;
    }, delay * 1000);
  };

  const drawFrame = () => {
    if (!grid) return;

    const { shapes, width, height } = grid;
    const viewportHeight = window.innerHeight;
    const scrollY = window.scrollY;
    const visibleTop = scrollY - gap * maxHoverScale;
    const visibleBottom = scrollY + viewportHeight + gap * maxHoverScale;
    const radius = Math.min(width, viewportHeight) * (radiusVmin / 100);
    const now = performance.now();

    ctx.clearRect(0, 0, width, viewportHeight);
    ctx.fillStyle = "#080808";
    ctx.fillRect(0, 0, width, viewportHeight);

    activity *= 0.93;
    frameCount++;
    if (frameCount % 10 === 0) updateMaskRects();

    const maxDist = Math.sqrt(width * width + height * height);
    waves = waves.filter((wave) => ((now - wave.startTime) / 1000) * waveSpeed < maxDist + waveWidth);

    shapes.forEach((shape) => {
      if (shape.y < visibleTop || shape.y > visibleBottom) return;

      const pad = gap / 2;
      const masked = !maskOverride && maskRects.some((rect) => (
        shape.x >= rect.left - pad &&
        shape.x <= rect.right + pad &&
        shape.y >= rect.top - pad &&
        shape.y <= rect.bottom + pad
      ));

      if (masked) {
        shape.scale += (0 - shape.scale) * durationToFactor(speedOut);
        if (shape.scale < 0.005) shape.scale = 0;
        return;
      }

      let pointerInfluence = 0;
      if (pointer && activity > 0.001) {
        const dx = shape.x - pointer.x;
        const dy = shape.y - (pointer.y + scrollY);
        const dist = Math.sqrt(dx * dx + dy * dy);
        pointerInfluence = smoothstep(1 - dist / radius) * activity;

        if (pointerInfluence > 0.05 && !shape.hovered) {
          shape.hovered = true;
          shape.maxScale = rnd(minHoverScale, maxHoverScale);
          shape.angle = rnd(0, Math.PI * 2);
          if (shape.type === "star") Object.assign(shape, randomStarProps());
        } else if (pointerInfluence <= 0.05) {
          shape.hovered = false;
        }
      } else {
        shape.hovered = false;
      }

      let waveInfluence = 0;
      waves.forEach((wave) => {
        const waveRadius = ((now - wave.startTime) / 1000) * waveSpeed;
        const dx = shape.x - wave.x;
        const dy = shape.y - wave.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const t = 1 - Math.abs(dist - waveRadius) / waveWidth;
        if (t > 0) waveInfluence = Math.max(waveInfluence, Math.sin(Math.PI * t));
      });

      const pointerTarget = restScale + pointerInfluence * (shape.maxScale - restScale);
      const waveTarget = restScale + waveInfluence * (shape.maxScale - restScale);
      const target = Math.max(pointerTarget, waveTarget);
      const factor = target > shape.scale ? durationToFactor(speedIn) : durationToFactor(speedOut);
      shape.scale += (target - shape.scale) * factor;

      if (shape.scale < restScale * 0.15) return;

      ctx.save();
      ctx.translate(shape.x, shape.y - scrollY);
      ctx.rotate(shape.angle);
      ctx.scale(shape.scale, shape.scale);
      ctx.fillStyle = resolveFill(shape.color, shape.size);
      drawShape(shape);
      ctx.restore();
    });
  };

  const tick = () => {
    drawFrame();
    rafId = window.requestAnimationFrame(tick);
  };

  const onMove = (event) => {
    pointer = { x: event.clientX, y: event.clientY };
    activity = 1;
  };

  const onClick = (event) => {
    triggerWave(event.clientX, event.clientY + window.scrollY);
  };

  resizeCanvas();
  updateMaskRects();

  if (prefersReducedMotion) {
    drawFrame();
  } else {
    rafId = window.requestAnimationFrame(tick);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("click", onClick);
    triggerWave();
  }

  window.addEventListener("resize", () => {
    if (rafId) window.cancelAnimationFrame(rafId);
    resizeCanvas();
    updateMaskRects();
    if (prefersReducedMotion) drawFrame();
    else rafId = window.requestAnimationFrame(tick);
  });

  window.addEventListener("scroll", () => {
    if (prefersReducedMotion) {
      updateMaskRects();
      drawFrame();
    }
  }, { passive: true });

  if ("ResizeObserver" in window) {
    const observer = new ResizeObserver(() => {
      resizeCanvas();
      updateMaskRects();
      if (prefersReducedMotion) drawFrame();
    });
    observer.observe(document.body);
  }
}

// Shape Wave
// Adapted from Stijn Van Minnebruggen
// https://codepen.io/donotfold/pen/yyapzOP


// CARDS
// Thanks to Andy Merskin:
// https://codepen.io/andymerskin/pen/XNMWvQ

Vue.config.devtools = true;

Vue.component('card', {
  template: `
    <div class="card-wrap"
      @mousemove="handleMouseMove"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
      ref="card">
      <div class="card"
        :style="cardStyle">
        <div class="card-bg" :style="[cardBgTransform, cardBgImage]"></div>
        <div class="card-info">
          <slot name="header"></slot>
          <slot name="content"></slot>
        </div>
      </div>
    </div>`,
  mounted() {
    this.width = this.$refs.card.offsetWidth;
    this.height = this.$refs.card.offsetHeight;
  },
  props: ['dataImage'],
  data: () => ({
    width: 0,
    height: 0,
    mouseX: 0,
    mouseY: 0,
    mouseLeaveDelay: null
  }),
  computed: {
    mousePX() {
      return this.mouseX / this.width;
    },
    mousePY() {
      return this.mouseY / this.height;
    },
    cardStyle() {
      const rX = this.mousePX * 30;
      const rY = this.mousePY * -30;
      return {
        transform: `rotateY(${rX}deg) rotateX(${rY}deg)`
      };
    },
    cardBgTransform() {
      const tX = this.mousePX * -40;
      const tY = this.mousePY * -40;
      return {
        transform: `translateX(${tX}px) translateY(${tY}px)`
      }
    },
    cardBgImage() {
      return {
        backgroundImage: `url(${this.dataImage})`
      }
    }
  },
  methods: {
    handleMouseMove(e) {
      this.mouseX = e.pageX - this.$refs.card.offsetLeft - this.width/2;
      this.mouseY = e.pageY - this.$refs.card.offsetTop - this.height/2;
    },
    handleMouseEnter() {
      clearTimeout(this.mouseLeaveDelay);
    },
    handleMouseLeave() {
      this.mouseLeaveDelay = setTimeout(()=>{
        this.mouseX = 0;
        this.mouseY = 0;
      }, 1000);
    }
  }
});

const app = new Vue({
  el: '#app'
});

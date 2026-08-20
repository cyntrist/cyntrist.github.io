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

    profileText: "Hi! I'm Cynthia Tristán, avid gamer and maker currently based in Spain.\n\nThank you for visting my portfolio, hope you have fun looking around.\n\nMore cool experiences are always on the way!",
    skillsText: "",
    projectsText: "",
    resume: "Resume",
    mail:"Mail",

    d1: "Rhythm videogame in Godot compatible with guitar controller and data-driven levels by a team of 4 people.",
    d2: "Data-driven Entity-Component 3D game engine written in C++ with hot-reloading and scripting for Windows by a team of 10 people.",
    d3: "Arcade 3D physics-based videogame made in CHAVALES Engine.",
    d4: "Unity videogame and simulator of the physical model of the Chladni plates in 2D with FMOD by a team of 2 people.",
    d5: "Horror videogame in Godot for the 2024 SCREAM JAM, ranked #5 in narrative category.",
    d6: "Deck-building videogame with local 1v1 multiplayer and PSX aesthetic written in C++ with SDL by a team of 11 people.",

    contactFirst: "Get in touch via",
    contactLast:"or fill this form:",
    formName: "Name:",
    formEmail: "Email:",
    formSubject: "Subject:",
    formMessage: "Message:",
    formSend: "Send",
    more: "and more!",

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

    profileText: "¡Hola! Soy Cynthia Tristán, entusiasta jugadora y creadora actualmente viviendo en España.\n\nGracias por visitar mi portafolio, espero que te lo pases bien echando un vistazo.\n\n¡Más experiencias chulas siempre en camino!",
    skillsText: "Texto en en español.\n\nSalto de línea.",
    projectsText: "Texto en en español.\n\nSalto de línea.",
    resume:"CV",
    mail:"Correo",

    d1: "Videojuego de ritmo en Godot compatible con controlador de guitarra y niveles dirigidos por datos realizado en equipo de 4 personas.",
    d2: "Motor Entidad-Componente escrito en C++ y dirigido por datos en Lua con carga en caliente y scripting para Windows hecho por un equipo de 10 personas.",
    d3: "Videojuego arcade basado en físicas 3D hecho en CHAVALES Engine.",
    d4: "Videojuego en Unity con FMOD y simulador del modelo físico de las placas de Chladni en 2D por un equipo de 2 personas.",
    d5: "Videojuego de horror en Godot para la SCREAM JAM 2024, 5º puesto en categoría narrativa.",
    d6: "Videojuego de deck-building con multijugador 1v1 local y estética PSX escrito en C++ con SDL por un equipo de 11 personas.",
    more: "¡y más!",

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
  window.requestAnimationFrame(() => {
    window.dispatchEvent(new Event("cards-content-updated"));
  });
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
  const gap = 64;
  const size_factor = 0.15;
  const in_radio_min = 0.2;
  const in_radio_max = 0.5;
  const radiusVmin = 15;
  const speedIn = 0.5;
  const speedOut = 0.6;
  const restScale = 0.09;
  const minHoverScale = 3;
  const maxHoverScale = 3;
  const waveSpeed = 1200;
  const waveWidth = 180;
  const palette = [
    { type: "solid", value: "#ffa600" },
    { type: "solid", value: "#ffa600" },
    { type: "solid", value: "#DE5A5A" },
    { type: "solid", value: "#DE5A5A" },
    { type: "solid", value: "#E4DDCD" },
    { type: "solid", value: "#E4DDCD" },
    { type: "solid", value: "#E4DDCD" },
    { type: "solid", value: "#275ED6" },
    { type: "solid", value: "#275ED6" },
    { type: "solid", value: "#DFB1F1" },
    { type: "solid", value: "#71BC20" },
    { type: "solid", value: "#71BC20" },
    // { type: "solid", value: "#22c55e" },
    // { type: "solid", value: "#06b6d4" },
    // { type: "solid", value: "#f97316" },
    // { type: "solid", value: "#ef4444" },
    // { type: "solid", value: "#facc15" },
    // { type: "solid", value: "#ec4899" },
    // { type: "solid", value: "#9ca3af" },
    // { type: "solid", value: "#a78bfa" },
    // { type: "solid", value: "#60a5fa" },
    // { type: "solid", value: "#34d399" },
    // { type: "gradient", stops: ["#6366f1", "#3b82f6"] },
    // { type: "gradient", stops: ["#06b6d4", "#6366f1"] },
    // { type: "gradient", stops: ["#22c55e", "#06b6d4"] },
    // { type: "gradient", stops: ["#f97316", "#ef4444"] },
    // { type: "gradient", stops: ["#8b5cf6", "#06b6d4"] },
    // { type: "gradient", stops: ["#3b82f6", "#8b5cf6"] },
    // { type: "gradient", stops: ["#34d399", "#3b82f6"] }
  ];
  const shapeTypes = ["circle", "pill", "star", "star"];

  let grid = null;
  let rafId = null;
  let pointer = null;
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
    drawStar(shape.size, shape.points, shape.innerRatio);
  };

  const resolveFill = (colorDef, size) => {
    if (colorDef.type === "solid") return colorDef.value;
    const gradient = ctx.createRadialGradient(0, -size * 0.3, 0, 0, size * 0.3, size * 1.5);
    gradient.addColorStop(0, colorDef.stops[0]);
    gradient.addColorStop(1, colorDef.stops[1]);
    return gradient;
  };

  const randomStarProps = () => ({
    points: rndInt(3, 10),
    innerRatio: rnd(in_radio_min, in_radio_max)
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
    const diagonalStep = gap / Math.SQRT2;
    const horizontalStep = gap * Math.SQRT2;
    const rows = Math.max(1, Math.ceil(height / diagonalStep) + 2);
    const cols = Math.max(1, Math.ceil(width / horizontalStep) + 3);
    const offsetY = -diagonalStep;
    const shapes = [];

    for (let row = 0; row < rows; row++) {
      const rowOffsetX = row % 2 === 0 ? 0 : diagonalStep;
      for (let col = 0; col < cols; col++) {
        // const type = pick(shapeTypes);
        const type = "star";
        const shape = {
          x: -horizontalStep + rowOffsetX + col * horizontalStep,
          y: offsetY + row * diagonalStep,
          type,
          color: pick(palette),
          angle: rnd(0, Math.PI * 2),
          size: gap * size_factor,
          scale: restScale,
          maxScale: rnd(minHoverScale, maxHoverScale),
          hovered: false
        };
        // if (type === "star") Object.assign(shape, randomStarProps());
        Object.assign(shape, randomStarProps());
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
      if (pointer) {
        const dx = shape.x - pointer.x;
        const dy = shape.y - (pointer.y + scrollY);
        const dist = Math.sqrt(dx * dx + dy * dy);
        pointerInfluence = smoothstep(1 - dist / radius);

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
  };

  const onPointerLeave = () => {
    pointer = null;
  };

  const onClick = (event) => {
    //triggerWave(event.clientX, event.clientY + window.scrollY);
  };

  resizeCanvas();
  updateMaskRects();

  if (prefersReducedMotion) {
    drawFrame();
  } else {
    rafId = window.requestAnimationFrame(tick);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("click", onClick);
    // triggerWave();
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

const enableCardMotion = false;

Vue.config.devtools = true;

Vue.component('card', {
  template: `
    <component
      :is="href ? 'a' : 'div'"
      class="card-wrap"
      :href="href || null"
      :target="href ? target : null"
      :rel="href && target === '_blank' ? 'noopener noreferrer' : null"
      @mousemove="handleMouseMove"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
      @focus="handleMouseEnter"
      @blur="handleMouseLeave"
      ref="card">
      <div class="card"
        :style="cardStyle">
        <video
          v-if="dataVideo"
          class="card-bg card-bg-video"
          :style="cardBgTransform"
          :src="dataVideo"
          :poster="dataImage || null"
          :autoplay="isMobileCard"
          muted
          loop
          playsinline
          preload="metadata"
          ref="video"></video>
        <div
          v-else
          class="card-bg card-bg-image"
          :style="[cardBgTransform, cardBgImage]"></div>
        <div class="card-info" :style="cardInfoStyle" ref="cardInfo">
          <div class="card-info-title" ref="cardTitle">
            <slot name="header"></slot>
          </div>
          <div class="card-info-content">
            <slot name="content"></slot>
          </div>
        </div>
      </div>
    </component>`,
  mounted() {
    this.mobileCardQuery = window.matchMedia("(max-width: 599px)");
    this.isMobileCard = this.mobileCardQuery.matches;
    this.updateCardBounds();
    window.addEventListener("resize", this.updateCardBounds);
    window.addEventListener("cards-content-updated", this.updateCardBounds);
    if (this.mobileCardQuery.addEventListener) {
      this.mobileCardQuery.addEventListener("change", this.handleMobileCardChange);
    } else {
      this.mobileCardQuery.addListener(this.handleMobileCardChange);
    }
    this.$nextTick(this.updateCardBounds);
    this.$nextTick(this.syncMobileCardVideo);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.updateCardBounds);
    window.removeEventListener("cards-content-updated", this.updateCardBounds);
    if (this.mobileCardQuery) {
      if (this.mobileCardQuery.removeEventListener) {
        this.mobileCardQuery.removeEventListener("change", this.handleMobileCardChange);
      } else {
        this.mobileCardQuery.removeListener(this.handleMobileCardChange);
      }
    }
    this.pauseCardVideo();
  },
  props: {
    dataImage: String,
    dataVideo: String,
    href: String,
    target: {
      type: String,
      default: "_blank"
    }
  },
  data: () => ({
    width: 0,
    height: 0,
    mouseX: 0,
    mouseY: 0,
    hiddenInfoOffset: 0,
    mouseLeaveDelay: null,
    isMobileCard: false,
    mobileCardQuery: null
  }),
  computed: {
    mousePX() {
      return this.width ? this.mouseX / this.width : 0;
    },
    mousePY() {
      return this.height ? this.mouseY / this.height : 0;
    },
    cardStyle() {
      if (!enableCardMotion) {
        return {
          transform: "rotateY(0deg) rotateX(0deg)"
        };
      }

      const rX = this.mousePX * 9;
      const rY = this.mousePY * -18;
      return {
        transform: `rotateY(${rX}deg) rotateX(${rY}deg)`
      };
    },
    cardBgTransform() {
      if (!enableCardMotion) {
        return {
          transform: "translateX(0px) translateY(0px)"
        };
      }

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
    },
    cardInfoStyle() {
      return {
        "--card-info-hidden": `${this.hiddenInfoOffset}px`
      };
    }
  },
  methods: {
    updateCardBounds() {
      const rect = this.$refs.card.getBoundingClientRect();
      this.width = rect.width;
      this.height = rect.height;

      const cardInfo = this.$refs.cardInfo;
      const title = this.$refs.cardTitle;
      if (!cardInfo || !title) return;

      const styles = window.getComputedStyle(cardInfo);
      const paddingBottom = parseFloat(styles.paddingBottom) || 0;
      const infoRect = cardInfo.getBoundingClientRect();
      const titleRect = title.getBoundingClientRect();
      this.hiddenInfoOffset = Math.max(0, Math.ceil(infoRect.bottom - titleRect.bottom - paddingBottom));
    },
    handleMouseMove(e) {
      if (!enableCardMotion) return;

      const rect = this.$refs.card.getBoundingClientRect();
      this.width = rect.width;
      this.height = rect.height;
      this.mouseX = e.clientX - rect.left - this.width / 2;
      this.mouseY = e.clientY - rect.top - this.height / 2;
    },
    handleMouseEnter() {
      if (this.isMobileCard) return;

      this.playCardVideo();

      clearTimeout(this.mouseLeaveDelay);
    },
    handleMouseLeave() {
      if (this.isMobileCard) return;

      this.pauseCardVideo();

      if (enableCardMotion) {
        this.mouseLeaveDelay = setTimeout(()=>{
          this.mouseX = 0;
          this.mouseY = 0;
        }, 1000);
      }
    },
    handleMobileCardChange(e) {
      this.isMobileCard = e.matches;
      this.syncMobileCardVideo();
    },
    syncMobileCardVideo() {
      if (this.isMobileCard) {
        this.playCardVideo();
      } else {
        this.pauseCardVideo();
      }
    },
    playCardVideo() {
      const video = this.$refs.video;
      if (!video) return;

      const playRequest = video.play();
      if (playRequest && typeof playRequest.catch === "function") {
        playRequest.catch(() => {});
      }
    },
    pauseCardVideo() {
      const video = this.$refs.video;
      if (!video) return;

      video.pause();
    }
  }
});

const app = new Vue({
  el: '#app'
});


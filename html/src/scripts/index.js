const root = document.documentElement;

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

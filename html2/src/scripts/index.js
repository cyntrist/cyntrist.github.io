const root = document.documentElement;

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  let x0 = 0;
  let y0 = 0;
  let x1 = 0;
  let y1 = 0;
  let angle = -Math.PI / 4;
  let turnStartAngle = angle;
  let targetAngle = angle;
  let elapsed = 0;
  let turnElapsed = 0;
  let previousTime = 0;

  const directionChangeInterval = 4800; // ms que dura una direccion sin cambiar
  const directionStep = Math.PI / 4; // grados al cambiar de dir
  const turnDuration = 100; // ms que dura el tween de cambiar dir

  function easeInOut(value) {
    return value < 0.5
      ? 2 * value * value
      : 1 - Math.pow(-2 * value + 2, 2) / 2;
  }

  function animateBackground(time) {
    const delta = Math.min(time - previousTime, 50);
    previousTime = time;

    elapsed += delta;

    while (elapsed >= directionChangeInterval) {
      turnStartAngle = angle;
      targetAngle += directionStep;
      turnElapsed = 0;
      elapsed -= directionChangeInterval;
    }

    if (angle !== targetAngle) {
      turnElapsed = Math.min(turnElapsed + delta, turnDuration);
      const progress = easeInOut(turnElapsed / turnDuration);
      angle = turnStartAngle + (targetAngle - turnStartAngle) * progress;
    }

    const speed0 = 0.005;
    const speed1 = 0.012;

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

// custom animation library
console.log("[Muv.js] is running.")

function muv(el, fromX, duration = 800, easing = t => t * (2 - t)) {
  const startTime = performance.now();

  function tick(now) {
    const t = Math.min((now - startTime) / duration, 1);
    const eased = easing(t);
    const x = fromX * (1 - eased);

    el.style.transform = `translateX(${x}px)`;
    el.style.opacity = eased;

    if (t < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

function initMuvAutoAnimations() {
  const elements = document.querySelectorAll('.animated-left, .animated-right');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const el = entry.target;
      observer.unobserve(el);

      const fromX = el.classList.contains('animated-left') ? -100 : 100;
      el.style.opacity = 0;
      el.style.transform = `translateX(${fromX}px)`;

      muv(el, fromX);
    });
  }, { threshold: 0.2 });

  elements.forEach(el => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', initMuvAutoAnimations);
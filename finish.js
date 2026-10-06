(() => {
  const section = document.querySelector('#finishing');
  if (!section) return;
  const comparison = section.querySelector('#finish-comparison');
  const range = section.querySelector('#finish-range');
  const output = section.querySelector('#finish-range-output');
  const updateComparison = value => {
    const v = Math.max(0, Math.min(100, Math.round(Number(value))));
    range.value = String(v);
    comparison.style.setProperty('--reveal', v + '%');
    const description = '연마 전 ' + v + '% · 연마 후 ' + (100-v) + '%';
    output.textContent = description;
    range.setAttribute('aria-valuetext', description);
  };
  range.addEventListener('input', () => updateComparison(range.value));
  let draggingPointer = null;
  const updatePointer = event => {
    const rect = comparison.getBoundingClientRect();
    if (rect.width > 0) updateComparison((event.clientX - rect.left) / rect.width * 100);
  };
  comparison.addEventListener('pointerdown', event => {
    if (event.button !== 0) return;
    draggingPointer = event.pointerId;
    comparison.setPointerCapture(event.pointerId);
    updatePointer(event);
  });
  comparison.addEventListener('pointermove', event => {
    if (event.pointerId === draggingPointer) updatePointer(event);
  });
  ['pointerup','pointercancel','lostpointercapture'].forEach(name => comparison.addEventListener(name, () => { draggingPointer = null; }));
  updateComparison(range.value);
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const toggle = section.querySelector('.finish-motion-toggle');
  let paused = false;
  let frame = null;
  const updateLight = () => {
    frame = null;
    if (paused || reducedMotion.matches) return;
    section.querySelectorAll('.finish-texture-photo').forEach(photo => {
      const rect = photo.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (window.innerHeight-rect.top)/(window.innerHeight+rect.height)));
      photo.style.setProperty('--light-travel', (progress * rect.width * 2.4) + 'px');
      photo.style.setProperty('--drop-travel', (progress * rect.width * .22) + 'px');
    });
  };
  const requestLight = () => { if (frame === null && !paused && !reducedMotion.matches) frame = requestAnimationFrame(updateLight); };
  toggle.addEventListener('click', () => {
    paused = !paused;
    section.classList.toggle('motion-paused', paused);
    toggle.setAttribute('aria-pressed', String(paused));
    toggle.textContent = paused ? '모션 재생' : '모션 일시정지';
    if (!paused) requestLight();
  });
  window.addEventListener('scroll', requestLight, {passive:true});
  window.addEventListener('resize', requestLight, {passive:true});
  reducedMotion.addEventListener('change', requestLight);
  requestLight();
  const process = section.querySelector('.finish-process');
  if ('IntersectionObserver' in window && !reducedMotion.matches) {
    process.classList.add('motion-ready');
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        process.classList.add('is-visible');
        observer.disconnect();
      }
    }, {threshold:.1});
    observer.observe(process);
  }
})();

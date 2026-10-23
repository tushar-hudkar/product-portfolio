// Generated from the story page script: reveals, chart bars, live-app frame and the full-screen overlay.
// Returns a cleanup function so listeners are removed when you leave the page.
export function runStory() {
  const listeners = [];
  const realAdd = window.addEventListener.bind(window);
  const addEventListener = (type, fn, opts) => { realAdd(type, fn, opts); listeners.push([type, fn, opts]); };


  // Reveal on scroll; ledger bars grow when the ledger comes into view.
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      e.target.classList.add('in');
      if (e.target.id === 'ledger') e.target.querySelectorAll('.bar i').forEach((i) => {
        // Bars start at ₹40,000 so the gap is visible.
        const pct = ((Number(i.dataset.w) / 100) * 47450 - 40000) / (47450 - 40000) * 100;
        i.style.width = Math.max(4, pct) + '%';
      });
      io.unobserve(e.target);
    }
  }, { threshold: 0.15 });
  document.querySelectorAll('.rv, #ledger').forEach((el) => io.observe(el));

  // Live app only on wide screens: load the iframe and scale the 393 × 852 app to the frame.
  const big = matchMedia('(min-width: 901px)');
  const live = document.getElementById('live');
  const screen = document.getElementById('screen');
  const fit = () => { const s = screen.clientWidth / 393; live.style.transform = `scale(${s})`; };
  const load = () => { if (big.matches && !live.src) live.src = live.dataset.src; fit(); };
  load(); addEventListener('resize', fit); big.addEventListener('change', load); const unBig = () => big.removeEventListener('change', load);

  // "Try the app": the full app from onboarding, in an overlay on this page (no new tab).
  const overlay = document.getElementById('overlay');
  const ovPhone = document.getElementById('ov-phone');
  const closeBtn = document.getElementById('overlay-close');
  const restartBtn = document.getElementById('overlay-restart');
  let runs = 0;
  let lastFocus = null;
  const fitOverlay = () => {
    const f = ovPhone.querySelector('iframe'); if (!f || !big.matches) return;
    f.style.transform = `scale(${ovPhone.querySelector('.scr').clientWidth / 393})`;
  };
  const openApp = (e) => {
    e.preventDefault();
    lastFocus = document.activeElement;
    restartBtn.hidden = true;
    ovPhone.innerHTML = '<div class="scr"><iframe title="Fairmarq app" src="https://fairmarq.vercel.app/?fresh"></iframe></div>';
    overlay.hidden = false; document.body.classList.add('fq-locked');
    requestAnimationFrame(() => { overlay.classList.add('open'); fitOverlay(); closeBtn.focus(); });
  };
  const closeApp = () => {
    overlay.classList.remove('open'); document.body.classList.remove('fq-locked');
    setTimeout(() => { overlay.hidden = true; ovPhone.innerHTML = ''; }, 200);
    if (lastFocus) lastFocus.focus();
  };
  document.querySelectorAll('[data-try]').forEach((a) => a.addEventListener('click', openApp));
  closeBtn.addEventListener('click', closeApp);
  // Restart: start the full app again from onboarding.
  restartBtn.addEventListener('click', () => {
    const f = ovPhone.querySelector('iframe'); if (!f) return;
    restartBtn.hidden = true; closeBtn.focus();
    f.src = 'https://fairmarq.vercel.app/?fresh&r=' + (++runs);
  });
  // The app reports its screen; Restart shows once the visitor has moved past the welcome screen.
  addEventListener('message', (e) => {
    const f = ovPhone.querySelector('iframe');
    if (!f || e.source !== f.contentWindow || !e.data || e.data.type !== 'fairmarq:route') return;
    const p = String(e.data.pathname || '/');
    restartBtn.hidden = p === '/' || p === '/onboarding';
  });
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeApp(); });
  addEventListener('keydown', (e) => { if (e.key === 'Escape' && !overlay.hidden) closeApp(); });
  addEventListener('resize', fitOverlay);

  return () => {
    for (const [type, fn, opts] of listeners) window.removeEventListener(type, fn, opts);
    io.disconnect();
    unBig();
    document.body.classList.remove('fq-locked');
  };
}

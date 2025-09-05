// CRE8XF Mobile Nav Kit (drop-in)
(function(){
  function smoothScrollTo(targetId){
    const el = document.querySelector(targetId);
    if(!el) return;
    const header = document.querySelector('.header');
    const top = el.getBoundingClientRect().top + window.scrollY - (header?.offsetHeight || 0) - 6;
    window.scrollTo({top, behavior:'smooth'});
  }
  // Inject mobile toggle if missing
  const container = document.querySelector('.header .nav, .header nav') || document.querySelector('.header');
  const menu = document.querySelector('.menu');
  if(container && menu && !document.querySelector('.nav-toggle')){
    const btn = document.createElement('button');
    btn.className = 'nav-toggle';
    btn.setAttribute('aria-expanded','false');
    btn.setAttribute('aria-label','Åpne meny');
    btn.innerHTML = '<svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M3 6h18M3 12h18M3 18h18" stroke="#1b4332" stroke-width="2" stroke-linecap="round"/></svg>';
    container.prepend(btn);
    btn.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    // Close when clicking a link
    menu.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));
  }
  // Smooth anchor scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if(href && href.length > 1){
        e.preventDefault();
        smoothScrollTo(href);
      }
    });
  });
})();
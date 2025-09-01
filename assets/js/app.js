// mobilmeny + smooth scroll + demo-submit + nav shadow
document.querySelector('[data-menu-btn]')?.addEventListener('click', ()=>{
  document.querySelector('[data-menu]')?.classList.toggle('open');
});
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const id=a.getAttribute('href'); if(!id) return;
    const el=document.querySelector(id);
    if(el){ e.preventDefault(); el.scrollIntoView({behavior:'smooth',block:'start'}); }
    document.querySelector('[data-menu]')?.classList.remove('open');
  });
});
window.addEventListener('scroll', ()=>{
  const nav = document.querySelector('.nav');
  if (!nav) return;
  if (window.scrollY > 50) nav.classList.add('shadow'); else nav.classList.remove('shadow');
});
document.getElementById('lead-form')?.addEventListener('submit', e=>{
  e.preventDefault(); alert('Guide sendes (demo).'); e.target.reset();
});
document.getElementById('contact-form')?.addEventListener('submit', e=>{
  e.preventDefault(); alert('Forespørsel sendt (demo).'); e.target.reset();
});

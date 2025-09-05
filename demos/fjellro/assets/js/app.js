// Fjellro Hytteutleie – app.js

// Smooth anchor offset scroll (accounts for sticky header)
function smoothScrollTo(targetId){
  const el = document.querySelector(targetId);
  if(!el) return;
  const header = document.querySelector('.header');
  const top = el.getBoundingClientRect().top + window.scrollY - (header?.offsetHeight || 0) - 6;
  window.scrollTo({top, behavior:'smooth'});
}

// Mobile nav
const toggle = document.querySelector('.nav-toggle');
const menu   = document.querySelector('.menu');
if(toggle && menu){
  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  // Close on link click (mobile)
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));
}

// CTA scroll
document.querySelectorAll('[data-scroll]').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const target = btn.getAttribute('data-scroll');
    if(target?.startsWith('#')){
      e.preventDefault();
      smoothScrollTo(target);
    }
  });
});

// Booking Modal
const backdrop = document.getElementById('bookingBackdrop');
const modal    = document.getElementById('bookingModal');
const closeBtn = document.getElementById('closeBooking');

const cabinNameEl   = document.getElementById('bkCabinName');
const priceNightEl  = document.getElementById('bkPriceNight');
const checkInEl     = document.getElementById('checkIn');
const checkOutEl    = document.getElementById('checkOut');
const nightsEl      = document.getElementById('nights');
const totalEl       = document.getElementById('total');
const bookForm      = document.getElementById('bookingForm');

let currentPrice = 0;

function currency(n){ return new Intl.NumberFormat('nb-NO', { style:'currency', currency:'NOK', maximumFractionDigits:0 }).format(n) }

function openBooking({name, price}){
  cabinNameEl.textContent = name;
  currentPrice = price;
  priceNightEl.textContent = currency(price) + ' / natt';
  nightsEl.textContent = '0';
  totalEl.textContent = currency(0);
  // reset dates
  const today = new Date(); today.setHours(0,0,0,0);
  const tomorrow = new Date(today); tomorrow.setDate(tomorrow.getDate()+1);
  checkInEl.valueAsDate = today;
  checkInEl.min = today.toISOString().split('T')[0];
  checkOutEl.valueAsDate = tomorrow;
  checkOutEl.min = checkInEl.min;
  calcTotal();
  backdrop.style.display = 'flex';
}

function closeBooking(){
  backdrop.style.display = 'none';
}

function calcTotal(){
  const inDate  = checkInEl.value ? new Date(checkInEl.value) : null;
  const outDate = checkOutEl.value ? new Date(checkOutEl.value) : null;
  if(inDate && outDate){
    const ms = outDate - inDate;
    const nights = Math.max(0, Math.round(ms / 86400000));
    nightsEl.textContent = nights;
    totalEl.textContent = currency(nights * currentPrice);
  }
}

[checkInEl, checkOutEl].forEach(input => input?.addEventListener('change', () => {
  if(checkOutEl.value && checkInEl.value && checkOutEl.value < checkInEl.value){
    checkOutEl.value = checkInEl.value;
  }
  checkOutEl.min = checkInEl.value || checkInEl.min;
  calcTotal();
}));

closeBtn?.addEventListener('click', closeBooking);
backdrop?.addEventListener('click', (e) => {
  if(e.target === backdrop) closeBooking();
});

// Attach booking buttons
document.querySelectorAll('.book-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const name  = btn.getAttribute('data-name');
    const price = Number(btn.getAttribute('data-price')) || 0;
    openBooking({name, price});
  });
});

// Fake submit (demo only)
bookForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const name  = (document.getElementById('guestName')?.value || '').trim();
  const email = (document.getElementById('guestEmail')?.value || '').trim();
  const nights = Number(nightsEl.textContent || '0');
  if(!name || !email || nights < 1){
    alert('Fyll inn navn/e-post og velg gyldige datoer (min. 1 natt).');
    return;
  }
  closeBooking();
  setTimeout(() => {
    alert('Takk! Forespørselen din er sendt. Vi tar kontakt på e-post.');
  }, 50);
});

// Kontakt-skjema (demo)
const contactForm = document.getElementById('contactForm');
contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Takk! Vi har mottatt din henvendelse.');
  e.target.reset();
});
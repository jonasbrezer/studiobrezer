const menu = document.querySelector('#menu');
const toggle = document.querySelector('.menu-toggle');
const links = document.querySelectorAll('.menu-link');

if (toggle && menu) {
  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  links.forEach((link) => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const slider = document.querySelector('.compare-slider');
const afterImage = document.querySelector('.compare-after');

if (slider && afterImage) {
  slider.addEventListener('input', () => {
    const value = Number(slider.value);
    const rightClip = 100 - value;
    afterImage.style.clipPath = `inset(0 ${rightClip}% 0 0)`;
  });

  slider.dispatchEvent(new Event('input'));
}

const year = document.querySelector('#year');
if (year) {
  year.textContent = new Date().getFullYear();
}

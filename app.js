const menu = document.querySelector('#menu');
const toggle = document.querySelector('.menu-toggle');
const links = document.querySelectorAll('.menu-link');
const sections = document.querySelectorAll('main section');
const filterButtons = document.querySelectorAll('.filter-button');
const galleryCards = document.querySelectorAll('.gallery-card');
const modal = document.querySelector('.modal');
const modalContent = document.querySelector('.modal-content');
const modalClose = document.querySelector('.modal-close');
const modalBackdrop = document.querySelector('.modal-backdrop');
const compareSliders = document.querySelectorAll('.compare-slider');
const year = document.querySelector('#year');

if (year) {
  year.textContent = new Date().getFullYear();
}

if (toggle && menu) {
  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
}

links.forEach((link) => {
  link.addEventListener('click', () => {
    menu.classList.remove('open');
    toggle?.classList.remove('open');
    toggle?.setAttribute('aria-expanded', 'false');
  });
});

const activateLinkOnScroll = () => {
  const scrollPosition = window.scrollY + 140;

  sections.forEach((section) => {
    const id = section.getAttribute('id');
    if (!id) return;
    const link = document.querySelector(`.menu-link[href="#${id}"]`);
    if (!link) return;
    const sectionTop = section.offsetTop;
    const sectionBottom = sectionTop + section.offsetHeight;

    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
      links.forEach((item) => item.classList.remove('active'));
      link.classList.add('active');
    }
  });
};

window.addEventListener('scroll', activateLinkOnScroll);
activateLinkOnScroll();

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((btn) => {
      btn.classList.toggle('active', btn === button);
      btn.setAttribute('aria-selected', String(btn === button));
    });

    galleryCards.forEach((card) => {
      const category = card.dataset.category;
      const shouldShow = filter === 'all' || category === filter;
      card.toggleAttribute('hidden', !shouldShow);
    });
  });
});

const openModal = (content) => {
  if (!modal) return;
  modalContent.innerHTML = '';
  modalContent.append(content.cloneNode(true));
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
};

const closeModal = () => {
  if (!modal) return;
  modal.setAttribute('aria-hidden', 'true');
  modalContent.innerHTML = '';
  document.body.style.overflow = '';
};

if (modalClose) {
  modalClose.addEventListener('click', closeModal);
}

if (modalBackdrop) {
  modalBackdrop.addEventListener('click', closeModal);
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal?.getAttribute('aria-hidden') === 'false') {
    closeModal();
  }
});

galleryCards.forEach((card) => {
  const trigger = card.querySelector('.gallery-trigger');
  if (!trigger) return;
  trigger.addEventListener('click', () => {
    const modalId = trigger.dataset.modal;
    const template = document.querySelector(`#modal-${modalId}`);
    if (template) {
      openModal(template.content);
    }
  });
});

compareSliders.forEach((slider) => {
  const wrapper = slider.closest('.compare-wrapper');
  const after = wrapper?.querySelector('.compare-after');
  if (!after) return;
  slider.addEventListener('input', () => {
    after.style.setProperty('--pos', slider.value);
  });
  slider.dispatchEvent(new Event('input'));
});

const form = document.querySelector('.contact-form');

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const button = form.querySelector('button[type="submit"]');
    if (button) {
      button.textContent = 'Mensagem enviada!';
      button.disabled = true;
      button.classList.add('ghost-button');
    }
  });
}

'use strict';

(function () {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const header = document.querySelector('.site-header');
  const menuToggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('primary-nav');
  const progress = document.getElementById('scroll-progress');
  const modal = document.getElementById('modal');
  const dialog = modal.querySelector('.modal-dialog');
  const modalTitle = document.getElementById('modal-title');
  const modalContent = document.getElementById('modal-content');
  const closeButton = document.getElementById('modal-close');
  let lastFocused = null;

  const projects = {
    nyconcrete: {
      title: 'NY Concrete', type: 'Construction · WordPress & SEO', url: 'https://nyconcrete.us/',
      summary: 'US home-service website work involving WordPress page optimization, location/service content, on-page SEO, internal links and conversion-oriented improvements. My CV identifies this website as part of my current SEO role.',
      tags: ['WordPress', 'On-page SEO', 'Local SEO', 'Service pages'],
      desktop: 'assets/nyconcrete-original-desktop-web.webp', mobile: 'assets/nyconcrete-original-mobile-web.webp'
    },
    nypavers: {
      title: 'NY Pavers', type: 'Paving · WordPress & SEO', url: 'https://www.nypavers.com/',
      summary: 'Service and neighborhood page improvements, SEO content work, technical review, internal linking and lead-focused website updates. Specific live pages are linked in the gallery below.',
      tags: ['WordPress', 'Technical SEO', 'Local SEO', 'Internal linking'],
      desktop: 'assets/nypavers-original-desktop-web.webp', mobile: 'assets/nypavers-original-mobile-web.webp'
    },
    rides: {
      title: 'Your Own Rides', type: 'Dubai / UAE · WordPress SEO', url: 'https://yourownrides.com/',
      summary: 'Project-based website building and SEO for a ride-service business, including responsive Elementor pages, metadata, headings, image alt text, internal linking, sitemaps and indexing checks. Supplied Google Search Console screenshots compare the latest three months in the report against the previous three months; they show observed performance rather than exclusive attribution to particular changes.',
      tags: ['Elementor', 'WordPress', 'On-page SEO', 'Google Search Console'],
      desktop: 'assets/rides-original-desktop-web.webp', mobile: 'assets/rides-original-mobile-web.webp'
    },
    homeflex: {
      title: 'Homeflex Construction', type: 'Construction · Website SEO', url: 'https://homeflexcorp.com/',
      summary: 'Listed in my CV among the US construction and home-service websites I have worked with in my current remote SEO role. The supplied completed desktop and mobile website screenshots are included as examples; exact page-specific contributions can be added as further documentation is approved.',
      tags: ['WordPress SEO', 'Content updates', 'Home services'],
      desktop: 'assets/homeflex-original-desktop-web.webp', mobile: 'assets/homeflex-original-mobile-web.webp'
    }
  };

  const escapeHtml = (str) => String(str).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));

  function setMenu(open) {
    nav.classList.toggle('open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  }
  menuToggle.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('click', event => {
    if (nav.classList.contains('open') && !event.target.closest('.nav-wrap')) setMenu(false);
  });

  function handleScroll() {
    const y = window.scrollY;
    header.classList.toggle('scrolled', y > 30);
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    progress.style.width = (y / maxScroll * 100).toFixed(2) + '%';
  }
  document.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('resize', handleScroll);
  handleScroll();

  if (!reducedMotion && 'IntersectionObserver' in window) {
    document.documentElement.classList.add('js-animations');
    const observer = new IntersectionObserver((entries, self) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          self.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px 35px 0px', threshold: 0.07 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    // Keep everything visible if the tab/browser was restored mid-page.
    window.addEventListener('pageshow', () => {
      document.querySelectorAll('.reveal').forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight && el.getBoundingClientRect().bottom > 0) el.classList.add('visible');
      });
    });
  }

  const navLinks = [...document.querySelectorAll('.nav-link')];
  const anchors = ['home', 'proof', 'projects', 'about', 'tools', 'contact'];
  if ('IntersectionObserver' in window) {
    const currentObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => link.classList.toggle('current', link.getAttribute('href') === '#' + entry.target.id));
        }
      });
    }, { rootMargin: '-25% 0px -62% 0px', threshold: 0 });
    anchors.map(id => document.getElementById(id)).filter(Boolean).forEach(el => currentObserver.observe(el));
  }

  document.querySelectorAll('.filter-pill').forEach(button => {
    button.addEventListener('click', () => {
      const category = button.dataset.filter;
      document.querySelectorAll('.filter-pill').forEach(el => {
        const active = el === button;
        el.classList.toggle('active', active);
        el.setAttribute('aria-pressed', String(active));
      });
      document.querySelectorAll('.page-card').forEach(card => {
        card.hidden = category !== 'all' && card.dataset.category !== category;
      });
    });
  });

  const tabs = [...document.querySelectorAll('.tab')];
  function activateTab(selected, moveFocus = false) {
    tabs.forEach(tab => {
      const active = tab === selected;
      tab.setAttribute('aria-selected', String(active));
      tab.classList.toggle('active', active);
      tab.tabIndex = active ? 0 : -1;
      document.getElementById('panel-' + tab.dataset.tab).hidden = !active;
    });
    if (moveFocus) selected.focus();
  }
  tabs.forEach((button, index) => {
    button.tabIndex = button.classList.contains('active') ? 0 : -1;
    button.addEventListener('click', () => activateTab(button));
    button.addEventListener('keydown', event => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft' || event.key === 'Home' || event.key === 'End') {
        event.preventDefault();
        let next = index;
        if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
        if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
        if (event.key === 'Home') next = 0;
        if (event.key === 'End') next = tabs.length - 1;
        activateTab(tabs[next], true);
      }
    });
  });

  function openModal(title, content) {
    lastFocused = document.activeElement;
    modalTitle.textContent = title;
    modalContent.innerHTML = content;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    dialog.scrollTop = 0;
    closeButton.focus();
  }
  function closeModal() {
    if (!modal.classList.contains('open')) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    modalContent.replaceChildren();
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
  }
  closeButton.addEventListener('click', closeModal);
  modal.querySelectorAll('[data-close-modal]').forEach(el => el.addEventListener('click', closeModal));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') { if (modal.classList.contains('open')) closeModal(); else setMenu(false); }
    if (event.key === 'Tab' && modal.classList.contains('open')) {
      const focusable = [...dialog.querySelectorAll('button:not([disabled]),a[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled])')].filter(el => el.offsetParent !== null);
      if (!focusable.length) return;
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });

  document.querySelectorAll('[data-image]').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const src = trigger.dataset.image;
      const title = trigger.dataset.title || 'Original screenshot';
      if (!/^assets\/[a-zA-Z0-9_./-]+$/.test(src)) return;
      openModal(title, `<img src="${escapeHtml(src)}" alt="${escapeHtml(title)}"><p class="modal-image-title">Original supplied screenshot — displayed without altering its reported values.</p>`);
    });
  });
  document.querySelectorAll('[data-project]').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const project = projects[trigger.dataset.project];
      if (!project) return;
      openModal(project.title, `<p class="case-label">${escapeHtml(project.type)}</p><p class="modal-desc">${escapeHtml(project.summary)}</p><div class="modal-meta">${project.tags.map(t => `<span>${escapeHtml(t)}</span>`).join('')}</div><div class="modal-shots"><figure><img src="${project.desktop}" alt="Final desktop screenshot of ${escapeHtml(project.title)}"><figcaption>Supplied final desktop screenshot</figcaption></figure><figure><img class="mobile-img" src="${project.mobile}" alt="Final mobile screenshot of ${escapeHtml(project.title)}"><figcaption>Supplied final mobile screenshot</figcaption></figure></div>${trigger.dataset.project === 'rides' ? '<p class="modal-desc">For the original Search Console performance, Top Pages and Top Queries screenshots, see the case-study section on this page.</p>' : ''}<a class="btn btn-primary modal-btn" href="${project.url}" target="_blank" rel="noopener noreferrer">Visit Live Website ↗</a>`);
    });
  });

  document.getElementById('back-to-top').addEventListener('click', () => window.scrollTo({ top: 0, behavior: reducedMotion ? 'instant' : 'smooth' }));

  const inquiryForm = document.getElementById('inquiry-form');
  inquiryForm.addEventListener('submit', event => {
    event.preventDefault();
    if (!inquiryForm.reportValidity()) return;
    const formData = new FormData(inquiryForm);
    const name = (formData.get('name') || '').toString().trim();
    const email = (formData.get('email') || '').toString().trim();
    const site = (formData.get('website') || '').toString().trim();
    const service = (formData.get('service') || '').toString().trim();
    const details = (formData.get('details') || '').toString().trim();
    const subject = `Portfolio inquiry — ${service} — ${name}`;
    const body = `Hi Muhammad Tahir,\n\nI'd like to discuss a project.\n\nName: ${name}\nEmail: ${email}\nWebsite: ${site || 'Not provided'}\nService: ${service}\n\nProject details:\n${details}\n\nBest regards,\n${name}`;
    const url = 'mailto:muhammadtahir8600@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    document.getElementById('form-note').textContent = 'Opening your email application with a prepared message. Please press Send in your email app to deliver the inquiry.';
    window.location.href = url;
  });
})();

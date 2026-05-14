// ===== Sticky Bottom Bar: show/hide on scroll =====
(function () {
  const bar = document.getElementById('sticky-bottom-bar');
  if (!bar) return;

  let lastScroll = 0;
  let ticking = false;

  window.addEventListener('scroll', function () {
    lastScroll = window.scrollY;
    if (!ticking) {
      window.requestAnimationFrame(function () {
        // Show bar after scrolling past 300px
        if (lastScroll > 300) {
          bar.style.transform = 'translateY(0)';
          bar.style.opacity = '1';
        } else {
          bar.style.transform = 'translateY(100%)';
          bar.style.opacity = '0';
        }
        ticking = false;
      });
      ticking = true;
    }
  });

  // Initially hidden
  bar.style.transform = 'translateY(100%)';
  bar.style.opacity = '0';
  bar.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
})();

// ===== Lazy loading images (fallback for older browsers) =====
(function () {
  if ('loading' in HTMLImageElement.prototype) return; // Native support

  const images = document.querySelectorAll('img[loading="lazy"]');
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
        }
        observer.unobserve(img);
      }
    });
  });

  images.forEach(function (img) {
    observer.observe(img);
  });
})();

// ===== Smooth scroll for internal links =====
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ===== Dynamic Date: current date minus 1 day, DD/MM/YYYY =====
(function () {
  const dateElements = document.querySelectorAll('[data-dynamic-date]');
  if (!dateElements.length) return;

  const date = new Date();
  date.setDate(date.getDate() - 1);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  const formattedDate = `${day}/${month}/${year}`;

  dateElements.forEach(function (element) {
    element.textContent = formattedDate;
  });
})();


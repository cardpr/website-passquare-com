(function () {
  var links = Array.prototype.slice.call(document.querySelectorAll('.api-nav a[href^="#"]'));
  var sections = links
    .map(function (link) {
      return document.getElementById(decodeURIComponent(link.getAttribute('href').slice(1)));
    })
    .filter(Boolean);

  function setActive(id) {
    links.forEach(function (link) {
      var match = decodeURIComponent(link.getAttribute('href').slice(1)) === id;
      link.classList.toggle('is-active', match);
    });
  }

  function onScroll() {
    var current = sections[0] && sections[0].id;
    var offset = 120;
    sections.forEach(function (section) {
      if (section.getBoundingClientRect().top - offset <= 0) current = section.id;
    });
    if (current) setActive(current);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  var select = document.querySelector('.api-mobile-nav select');
  if (select) {
    select.addEventListener('change', function () {
      if (select.value) window.location.hash = select.value;
    });
  }

  if (window.hljs) {
    if (typeof window.hljs.initHighlighting === 'function') window.hljs.initHighlighting();
    else if (typeof window.hljs.highlightAll === 'function') window.hljs.highlightAll();
  }
})();

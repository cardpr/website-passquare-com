(function () {
  var versionEl = document.createElement("div");
  versionEl.className = "site-version";
  versionEl.textContent = "version: " + SITE_VERSION;
  var footerWrap = document.querySelector(".footer .wrap") || document.querySelector(".footer");
  if (footerWrap) footerWrap.appendChild(versionEl);
  else document.body.appendChild(versionEl);

  var nav = document.getElementById("site-nav");
  var toggle = document.querySelector(".nav-toggle");
  if (nav && toggle) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
      });
    });
  }

  var cookie = document.getElementById("cookie-banner");
  var cookieKey = "t887cookiename_6819980";
  if (cookie && !localStorage.getItem(cookieKey)) {
    cookie.classList.add("is-open");
    var close = cookie.querySelector(".cookie__close");
    if (close) {
      close.addEventListener("click", function () {
        localStorage.setItem(cookieKey, "1");
        cookie.classList.remove("is-open");
      });
    }
  }

  var PREFIX = "pq_cookie_";
  var UTMS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
  var params = new URLSearchParams(window.location.search);
  if (params.has("utm_source")) {
    UTMS.forEach(function (name) {
      document.cookie = PREFIX + name + "=; path=/; max-age=-1";
      var value = params.get(name);
      if (value) {
        document.cookie =
          PREFIX +
          name +
          "=" +
          encodeURIComponent(value) +
          "; path=/; max-age=" +
          14 * 24 * 3600;
      }
    });
  }

  var extras = [];
  document.cookie.split(";").forEach(function (part) {
    var cookiePart = part.trim();
    if (cookiePart.indexOf(PREFIX) === 0) extras.push(cookiePart.slice(PREFIX.length));
  });
  document.querySelectorAll(".js-contact-email").forEach(function (el) {
    var local = el.getAttribute("data-a");
    var domain = el.getAttribute("data-b");
    if (!local || !domain) return;
    var email =
      local.split("").reverse().join("") +
      "@" +
      domain.split("").reverse().join("");
    el.textContent = email;
  });

  if (extras.length) {
    document.querySelectorAll("a[href]").forEach(function (link) {
      try {
        var url = new URL(link.href, window.location.href);
        if (url.hostname.indexOf("passquare.com") === -1) return;
        if (url.hostname === window.location.hostname) return;
        if (url.protocol === "mailto:") return;
        extras.forEach(function (pair) {
          var bits = pair.split("=");
          if (bits[0] && !url.searchParams.has(bits[0])) {
            url.searchParams.set(bits[0], decodeURIComponent(bits.slice(1).join("=") || ""));
          }
        });
        link.href = url.toString();
      } catch (err) {}
    });
  }

  window.dataLayer = window.dataLayer || [];
  window.mainTracker = "gtag";
  window.gtagTrackerID = "G-NP0V1GMDQG";
  window.gtag = window.gtag || function () {
    dataLayer.push(arguments);
  };

  setTimeout(function () {
    (function (w, d, s, i) {
      var f = d.getElementsByTagName(s)[0];
      var j = d.createElement(s);
      j.async = true;
      j.src = "/assets/external/www.googletagmanager.com/gtag/js?id=" + i;
      f.parentNode.insertBefore(j, f);
      w.gtag("js", new Date());
      w.gtag("config", i, {});
    })(window, document, "script", window.gtagTrackerID);

    (function (m, e, t, r, i, k, a) {
      m[i] =
        m[i] ||
        function () {
          (m[i].a = m[i].a || []).push(arguments);
        };
      m[i].l = 1 * new Date();
      k = e.createElement(t);
      a = e.getElementsByTagName(t)[0];
      k.async = 1;
      k.src = r;
      a.parentNode.insertBefore(k, a);
    })(window, document, "script", "/assets/external/mc.yandex.ru/metrika/tag.js", "ym");
    window.mainMetrikaId = "96747582";
    ym(window.mainMetrikaId, "init", {
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
      webvisor: true
    });

    if (!window.mainTracker) window.mainTracker = "tilda";
    (function (d, w, k, o, g) {
      var n = d.getElementsByTagName(o)[0];
      var s = d.createElement(o);
      s.type = "text/javascript";
      s.async = true;
      s.key = k;
      s.id = "tildastatscript";
      s.src = g;
      n.parentNode.insertBefore(s, n);
    })(document, window, "7445bb41ce2aa0c5f1e247aa79359e20", "script", "/assets/js/tilda-stat-1.0.min.js");
  }, 2000);
})();

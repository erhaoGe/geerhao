(function () {
  var body = document.body;
  if (!body) {
    return;
  }

  var langButtons = document.querySelectorAll("[data-set-lang]");
  var defaultLang = localStorage.getItem("preferred-lang") || body.getAttribute("data-default-lang") || "zh";

  function applyLanguage(lang) {
    body.classList.remove("lang-zh", "lang-en");
    body.classList.add("lang-" + lang);
    body.setAttribute("data-lang", lang);
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";

    langButtons.forEach(function (button) {
      button.classList.toggle("is-active", button.getAttribute("data-set-lang") === lang);
    });

    localStorage.setItem("preferred-lang", lang);
  }

  langButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      applyLanguage(button.getAttribute("data-set-lang"));
    });
  });

  applyLanguage(defaultLang);

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelectorAll(".reveal").forEach(function (element) {
      element.classList.add("is-visible");
    });
    return;
  }

  var revealObserver = new IntersectionObserver(
    function (entries, observer) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  document.querySelectorAll(".reveal").forEach(function (element, index) {
    element.style.transitionDelay = Math.min(index * 40, 240) + "ms";
    revealObserver.observe(element);
  });
})();

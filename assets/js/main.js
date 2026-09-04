const menuToggle = document.querySelector("[data-menu-toggle]");
const navigation = document.querySelector("[data-navigation]");
const searchToggle = document.querySelector("[data-search-toggle]");
const searchPanel = document.querySelector("[data-search-panel]");
const searchForm = document.querySelector("[data-search-form]");
const searchStatus = document.querySelector("[data-search-status]");
const contactForm = document.querySelector("[data-contact-form]");

if (menuToggle && navigation) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("is-open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("menu-open", isOpen);
  });
}

if (searchToggle && searchPanel) {
  searchToggle.addEventListener("click", () => {
    const willOpen = searchPanel.hidden;

    searchPanel.hidden = !willOpen;
    searchToggle.setAttribute("aria-expanded", String(willOpen));

    if (willOpen) {
      searchPanel.querySelector("input")?.focus();
    }
  });
}

if (searchForm && searchStatus) {
  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const query = new FormData(searchForm).get("pencarian")?.toString().trim();

    const articleUrl = searchForm.dataset.articleUrl;
    const searchableTerms = [
      "hitogel",
      "game",
      "online",
      "mekanisme",
      "panduan",
      "daftar",
      "login",
      "deposit",
      "akun",
      "transaksi",
    ];

    const hasMatch = searchableTerms.some((term) =>
      query?.toLocaleLowerCase("id-ID").includes(term),
    );

    if (query && articleUrl && hasMatch) {
      window.location.href = articleUrl;
      return;
    }

    searchStatus.textContent = query
      ? `Pencarian untuk “${query}” akan tersedia saat indeks artikel diterbitkan.`
      : "Masukkan kata kunci untuk mencari artikel.";
  });
}

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formStatus = document.querySelector("#status-form");

    if (formStatus) {
      formStatus.textContent =
        "Formulir belum terhubung ke layanan pengiriman. Informasi kontak resmi akan ditambahkan kemudian.";
    }
  });
}

const revealItems = document.querySelectorAll(".reveal");
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

if (prefersReducedMotion || !("IntersectionObserver" in window)) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
    },
  );

  revealItems.forEach((item) => revealObserver.observe(item));
}

const currentYear = document.querySelector("[data-current-year]");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

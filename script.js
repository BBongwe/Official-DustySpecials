// DustySpecials MVP.
// The current version is intentionally catalogue-first and simple. These
// records can later be replaced by an API response from AWS.
const catalogues = [
  {
    retailer: "SPAR",
    dates: "15 Jul 2026 - 26 Jul 2026",
    pdfUrl: "catalogues/spar.pdf",
    fileName: "spar.pdf",
    coverImage: "images/spar-cover.jpg",
    items: ["Albany Brown Bread", "Sunflower Oil", "Basmati Rice", "Apples", "Toilet Paper"],
  },
  {
    retailer: "Checkers",
    dates: "15 Jul 2026 - 26 Jul 2026",
    pdfUrl: "catalogues/checkers.pdf",
    fileName: "checkers.pdf",
    coverImage: "images/checkers-cover.jpg",
    items: ["Clover Fresh Milk", "Beef Mince", "Omo Washing Powder", "Pasta", "Frozen Chips"],
  },
  {
    retailer: "Pick n Pay",
    dates: "15 Jul 2026 - 26 Jul 2026",
    pdfUrl: "catalogues/picnpay.pdf",
    fileName: "picnpay.pdf",
    coverImage: "images/picnpay-cover.jpg",
    items: ["Long Life Milk", "Chicken Portions", "Potatoes", "Eggs", "Rice"],
  },
  {
    retailer: "Woolworths",
    dates: "15 Jul 2026 - 26 Jul 2026",
    pdfUrl: "catalogues/woolworths-kzn.pdf", // Changed to strict lowercase, no spaces
    fileName: "woolworths-kzn.pdf",
    coverImage: "images/woolworths-cover.jpg",
    items: ["Baby Spinach", "Butter Croissants", "Frozen Mixed Vegetables", "Yoghurt", "Coffee"],
  },
];

const state = {
  searchTerm: "",
};

const elements = {};

function cacheElements() {
  elements.navToggle = document.querySelector(".nav-toggle");
  elements.navMenu = document.querySelector(".nav-menu");
  elements.searchForm = document.querySelector("#catalogue-search-form");
  elements.searchInput = document.querySelector("#search-products");
  elements.catalogueGrid = document.querySelector("#catalogue-grid");
  elements.emptyState = document.querySelector("#empty-state");
  elements.currentYear = document.querySelector("#current-year");
}

function getFilteredCatalogues() {
  const query = state.searchTerm.trim().toLowerCase();

  if (!query) {
    return catalogues;
  }

  return catalogues.filter((catalogue) =>
    catalogue.items.some((item) => item.toLowerCase().includes(query))
  );
}

function renderCatalogues() {
  const filteredCatalogues = getFilteredCatalogues();

  elements.emptyState.classList.toggle("hidden", filteredCatalogues.length > 0);

  elements.catalogueGrid.innerHTML = filteredCatalogues
    .map((catalogue) => {
      return `
        <article class="catalogue-card">
          <div class="catalogue-content">
            <h3>${catalogue.retailer}</h3>
            <p>${catalogue.dates}</p>
            <div class="pdf-preview" aria-hidden="true">
              <!-- Replaced the empty span with an actual image tag pointing to your images folder -->
              <img src="${catalogue.coverImage}" alt="${catalogue.retailer} catalogue cover" style="width: 100%; height: 100%; object-fit: cover; border-radius: 4px;" />
            </div>
            <div class="catalogue-actions">
              <a class="btn" href="${catalogue.pdfUrl}" target="_blank" rel="noopener">
                View Catalogue
              </a>
              <a class="btn btn-secondary" href="${catalogue.pdfUrl}" download="${catalogue.fileName}">
                Download PDF
              </a>
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

function bindEvents() {
  elements.navToggle.addEventListener("click", () => {
    const isOpen = elements.navMenu.classList.toggle("active");
    document.body.classList.toggle("nav-open", isOpen);
    elements.navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  elements.navMenu.addEventListener("click", (event) => {
    if (event.target.matches("a")) {
      elements.navMenu.classList.remove("active");
      document.body.classList.remove("nav-open");
      elements.navToggle.setAttribute("aria-expanded", "false");
    }
  });

  elements.searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    document.querySelector("#catalogues").scrollIntoView({ behavior: "smooth" });
  });

  elements.searchInput.addEventListener("input", (event) => {
    state.searchTerm = event.target.value;
    renderCatalogues();
  });

  document.addEventListener("click", (event) => {
    const placeholderElement = event.target.closest("[data-placeholder]");

    if (!placeholderElement) {
      return;
    }

    if (placeholderElement.getAttribute("href") === "#") {
      event.preventDefault();
    }

    alert(placeholderElement.dataset.placeholder);
  });
}

function init() {
  cacheElements();
  renderCatalogues();
  bindEvents();
  elements.currentYear.textContent = new Date().getFullYear();
}

document.addEventListener("DOMContentLoaded", init);
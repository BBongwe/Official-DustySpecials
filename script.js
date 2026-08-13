// DustySpecials MVP
const catalogues = [
  {
    retailer: "SPAR",
    dates: "11 Aug 2026 - 23 Aug 2026",
    pdfUrl: "catalogues/spar.pdf",
    fileName: "spar.pdf",
    coverImage: "images/spar-cover.jpg",
    items: ["Albany Brown Bread", "Sunflower Oil", "Basmati Rice", "Apples", "Toilet Paper"],
  },
  {
    retailer: "Checkers",
    dates: "11 Aug 2026 - 19 Aug 2026",
    pdfUrl: "catalogues/checkers.pdf",
    fileName: "checkers.pdf",
    coverImage: "images/checkers-cover.jpg",
    items: ["Black Cat", "Peanut Butter", "Chicken", "Viennas", "Sunlight", "Liquid", "Doritos", "Snacks", "Cold Drink", "Soft Drink", "Kit Kat", "Chocolate Bars", "Danone", "Double Cream", "Yoghurt", "Bokomo", "Weet-Bix", "Coffee", "Douwe Egberts"]
  },
  {
    retailer: "Pick n Pay",
    dates: "7 Aug 2026 - 24 Aug 2026",
    pdfUrl: "catalogues/picnpay.pdf",
    fileName: "picnpay.pdf",
    coverImage: "images/picnpay-cover.jpg",
    items: ["Long Life Milk", "Chicken Portions", "Potatoes", "Eggs", "Rice"],
  },
  {
    retailer: "Woolworths",
    dates: "3 Aug 2026 - 23 Aug 2026",
    pdfUrl: "catalogues/woolworths-kzn.pdf",
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
            <div class="pdf-preview">
              <img src="${catalogue.coverImage}" alt="${catalogue.retailer} catalogue cover" style="width: 100%; height: 100%; object-fit: cover;" />
            </div>
            <div class="catalogue-actions">
              <a class="btn btn-main" href="${catalogue.pdfUrl}" target="_blank" rel="noopener">
                View
              </a>
              <a class="btn btn-secondary btn-icon-only" href="${catalogue.pdfUrl}" download="${catalogue.fileName}" aria-label="Download ${catalogue.retailer} PDF">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
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

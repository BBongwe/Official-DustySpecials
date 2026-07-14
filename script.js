// DustySpecials MVP.
// The current version is intentionally catalogue-first and simple. These
// records can later be replaced by an API response from AWS.
const catalogues = [
  {
    retailer: "SPAR",
    dates: "15 Jul 2026 - 26 Jul 2026",
    items: ["Albany Brown Bread", "Sunflower Oil", "Basmati Rice", "Apples", "Toilet Paper"],
  },
  {
    retailer: "Checkers",
    dates: "15 Jul 2026 - 26 Jul 2026",
    items: ["Clover Fresh Milk", "Beef Mince", "Omo Washing Powder", "Pasta", "Frozen Chips"],
  },
  {
    retailer: "Pick n Pay",
    dates: "15 Jul 2026 - 26 Jul 2026",
    items: ["Long Life Milk", "Chicken Portions", "Potatoes", "Eggs", "Rice"],
  },
  {
    retailer: "Woolworths",
    dates: "15 Jul 2026 - 26 Jul 2026",
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
            <div class="catalogue-actions">
              <button class="btn" type="button" data-placeholder="${catalogue.retailer} catalogue viewer will be added later.">
                View Catalogue
              </button>
              <button class="btn btn-secondary" type="button" data-placeholder="${catalogue.retailer} PDF download will connect to Amazon S3 later.">
                Download PDF
              </button>
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

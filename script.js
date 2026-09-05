// DustySpecials MVP
let catalogues = [];

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
  elements.privacyLink = document.querySelector("#privacy-link");
  elements.termsLink = document.querySelector("#terms-link");
  elements.privacyModal = document.querySelector("#privacy-modal");
  elements.termsModal = document.querySelector("#terms-modal");
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

function openModal(modalElement) {
  if (!modalElement) return;
  modalElement.classList.remove("hidden");
  modalElement.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");

  const modalBody = modalElement.querySelector(".modal-body");
  if (modalBody) modalBody.scrollTop = 0;
  modalElement.scrollTop = 0;
}

function closeModal(modalElement) {
  if (!modalElement) return;
  modalElement.classList.add("hidden");
  modalElement.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

function bindEvents() {
  elements.navToggle.addEventListener("click", () => {
    const isOpen = elements.navMenu.classList.toggle("active");
    document.body.classList.toggle("nav-open", isOpen);
    elements.navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  elements.navMenu.addEventListener("click", (event) => {
    if (event.target.matches("a") && !event.target.hasAttribute("data-placeholder")) {
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

  elements.privacyLink.addEventListener("click", (e) => {
    e.preventDefault();
    openModal(elements.privacyModal);
  });

  elements.termsLink.addEventListener("click", (e) => {
    e.preventDefault();
    openModal(elements.termsModal);
  });

  document.addEventListener("click", (event) => {
    const closeBtn = event.target.closest("[data-close-modal]");
    if (closeBtn) {
      const modalId = closeBtn.dataset.closeModal;
      closeModal(document.getElementById(modalId));
      return;
    }

    if (event.target.classList.contains("modal-overlay")) {
      closeModal(event.target);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal(elements.privacyModal);
      closeModal(elements.termsModal);
    }
  });
}

async function init() {
  cacheElements();
  elements.currentYear.textContent = new Date().getFullYear();

  try {
    const response = await fetch("catalogues.json");
    if (!response.ok) {
      throw new Error(`Failed to load catalogues.json: ${response.statusText}`);
    }
    catalogues = await response.json();
    renderCatalogues();
  } catch (error) {
    console.error("Error fetching catalogue data:", error);
  }

  bindEvents();
}

document.addEventListener("DOMContentLoaded", init);

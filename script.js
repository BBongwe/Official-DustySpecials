// DustySpecials MVP
const catalogues = [
  {
    retailer: "SPAR",
    dates: "11 Aug 2026 - 23 Aug 2026",
    pdfUrl: "catalogues/spar.pdf",
    fileName: "spar.pdf",
    coverImage: "images/spar-cover.jpg",
    items: ["danone", "yoghurt", "dog food", "tissue", "toilet rolls", "polony", "Cadbury", "lunch bar", "chocolate", "soap", "dettol"],
  },
  {
    retailer: "Checkers",
    dates: "20 Aug 2026 - 06 Sept 2026",
    pdfUrl: "catalogues/checkers.pdf",
    fileName: "checkers.pdf",
    coverImage: "images/checkers-cover.jpg",
    items: ["weet bix", "cereal", "coffee", "milk", "meat", "chicken", "beef", "eggs", "potatoes", "wine", "alcohol", "red label", "seafood", "fish", "chicken breast", "bread", "loaf", "fish fingers", "Krush", "clover", "ice cream", "Fanta", "water", "lays", "snacks", "polony", "mixed vegetables", "sweets", "chocolate", "slab", "nik naks", "koo", "beans", "biscuits", "peanut butter", "tomato sauce", "mayonnaise", "purity", "soups", "noodles", "rusks", "tuna", "cooking oil", "oil", "rice", "spice", "Maggi", "tennis", "joke", "lotion", "spaghetti", "shampoo", "fabric softener", "towels", "doom", "handy Andy", "dog food", "roll on"]
  },
  {
    retailer: "Pick n Pay",
    dates: "7 Aug 2026 - 24 Aug 2026",
    pdfUrl: "catalogues/picnpay.pdf",
    fileName: "picnpay.pdf",
    coverImage: "images/picnpay-cover.jpg",
    items: ["chicken", "drumsticks", "thighs", "lancewood", "cheese", "Jacobs", "coffee", "Doritos", "auto", "washing powder", "detergent", "air fryer", "Philips", "eggs", "bread", "milk", "tissue", "maize meal", "tastic", "rice", "mince", "ground beef", "lamb", "braai", "pork chops", "wors", "full chicken", "skinless", "breasts", "stir fry", "sasko", "vegetables", "cake", "burger", "Russians", "chips", "pizza", "soup", "cheese", "blue cheese", "Vienna", "bacon", "polony", "seafood", "margarine", "stock", "yoghurt", "juice", "braai pack", "fish", "ice cream", "pros", "snacks", "beans", "too", "tomato sauce", "sugar", "deodorant", "Colgate", "toothpaste", "sunlight", "dog food", "oven", "kettle", "mug", "batteries", "paper", "liquor"],
  },
  {
    retailer: "Woolworths",
    dates: "3 Aug 2026 - 23 Aug 2026",
    pdfUrl: "catalogues/woolworths-kzn.pdf",
    fileName: "woolworths-kzn.pdf",
    coverImage: "images/woolworths-cover.jpg",
    items: ["wors", "pasta", "cheddar", "macaroni", "Jacobs coffee", "coffee", "baby soft", "tissue", "plain yoghurt", "flowers", "apples", "mushrooms", "vegetables", "salad", "tomato", "tomatoes", "lamb", "meatballs", "chicken", "drumsticks", "salmon", "salami", "roti", "lasagne", "burrito", "Italian", "prepared", "meals", "crumbed chicken", "nuggets", "butter", "spread", "stock", "sourdough", "tiramisu", "carrot cake", "100% juice", "sparkling", "drinks", "Coca Cola", "spring water", "basmati rice", "rice", "olive oil", "ketchup", "futurelife", "cereal", "oats", "wine", "pretzels", "chips", "charcoal", "refuse bags", "Lindt", "chocolate", "skip", "laundry powder", "wipes", "dog food", "tin roof", "canned tomatoes"],
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

  // Ensure scroll is at top when opening
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

  // Privacy & Terms Modal Triggers
  elements.privacyLink.addEventListener("click", (e) => {
    e.preventDefault();
    openModal(elements.privacyModal);
  });

  elements.termsLink.addEventListener("click", (e) => {
    e.preventDefault();
    openModal(elements.termsModal);
  });

  // Modal Close via Close Button or Overlay Click
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

  // Modal Close via Escape Key
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal(elements.privacyModal);
      closeModal(elements.termsModal);
    }
  });
}

function init() {
  cacheElements();
  renderCatalogues();
  bindEvents();
  elements.currentYear.textContent = new Date().getFullYear();
}

document.addEventListener("DOMContentLoaded", init);

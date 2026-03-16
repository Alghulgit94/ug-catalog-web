/* ============================================
   UG Hogar Catalog — app.js
   Main application logic: rendering + events
   ============================================ */

/* ---- Shared: WhatsApp icon SVG ---- */
const WHATSAPP_ICON = `<svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`;

/* ---- Shared: render product card ---- */
function renderProductCard(product) {
  const image = product.images && product.images[0]
    ? product.images[0]
    : "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=60";

  const badge = product.featured
    ? `<span class="product-card__badge">Destacado</span>`
    : "";

  const priceHtml = product.showPrice && product.price
    ? `<p class="product-card__price">${formatPrice(product.price)}</p>`
    : "";

  const detailHref = buildDetailHref(product.slug);
  const waLink = generateWhatsAppLink(product.name);

  return `
    <article class="product-card">
      <a href="${detailHref}" class="product-card__image-wrap">
        <img
          src="${image}"
          alt="${product.name}"
          class="product-card__image"
          loading="lazy"
        />
        ${badge}
      </a>
      <div class="product-card__body">
        <span class="product-card__category">${product.category}</span>
        <h3 class="product-card__name">${product.name}</h3>
        ${priceHtml}
      </div>
      <div class="product-card__footer">
        <a href="${detailHref}" class="product-card__link">Ver detalle</a>
        <a href="${waLink}" class="product-card__whatsapp" target="_blank" rel="noopener">
          ${WHATSAPP_ICON} Consultar
        </a>
      </div>
    </article>
  `;
}

/**
 * Build the correct href to product.html depending on current page location.
 */
function buildDetailHref(slug) {
  const page = document.body.dataset.page;
  if (page === "home") {
    return `pages/product.html?slug=${slug}`;
  }
  // catalog and product pages are already inside /pages/
  return `product.html?slug=${slug}`;
}

/* ---- Shared: render empty state ---- */
function renderEmptyState(container, message) {
  container.innerHTML = `
    <div class="empty-state">
      <div class="empty-state__icon">🪑</div>
      <h3 class="empty-state__title">Sin resultados</h3>
      <p class="empty-state__description">${message || "No se encontraron productos. Intenta ajustar tu búsqueda o filtros."}</p>
    </div>
  `;
}

/* ============================================
   Homepage
   ============================================ */
function renderFeaturedProducts() {
  const container = document.getElementById("featured-products");
  if (!container) return;

  const featured = PRODUCTS.filter(p => p.featured).slice(0, 4);

  if (!featured.length) {
    renderEmptyState(container);
    return;
  }

  container.innerHTML = featured.map(renderProductCard).join("");
}

/* ============================================
   Catalog page
   ============================================ */
let currentQuery = "";
let currentCategory = "Todos";

function initCatalog() {
  // Read URL params for pre-selected category and search query
  const categoryParam = getQueryParam("category");
  if (categoryParam) {
    currentCategory = categoryParam;
  }
  const qParam = getQueryParam("q");
  if (qParam) {
    currentQuery = qParam;
    const inp = document.getElementById("catalog-search");
    if (inp) inp.value = qParam;
  }

  // Render grid
  renderCatalogProducts();

  // Activate correct filter pill
  const pills = document.querySelectorAll(".filter-pill");
  pills.forEach(pill => {
    const val = pill.dataset.category;
    if (val === currentCategory || (!categoryParam && val === "Todos")) {
      pill.classList.add("filter-pill--active");
    } else {
      pill.classList.remove("filter-pill--active");
    }
    pill.addEventListener("click", () => {
      pills.forEach(p => p.classList.remove("filter-pill--active"));
      pill.classList.add("filter-pill--active");
      currentCategory = val;
      renderCatalogProducts();
    });
  });

  // Search input
  const searchInput = document.getElementById("catalog-search");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      currentQuery = e.target.value;
      renderCatalogProducts();
    });
  }
}

function renderCatalogProducts() {
  const container = document.getElementById("product-grid");
  if (!container) return;

  const results = getFilteredProducts(currentQuery, currentCategory);

  if (!results.length) {
    renderEmptyState(container);
    return;
  }

  container.innerHTML = results.map(renderProductCard).join("");
}

/* ============================================
   Product detail page
   ============================================ */
function renderProductDetail() {
  const slug = getQueryParam("slug");

  if (!slug) {
    showProductError("No se especificó un producto.");
    return;
  }

  const product = findProductBySlug(slug);

  if (!product) {
    showProductError("Producto no encontrado.");
    return;
  }

  // Category
  const categoryEl = document.getElementById("product-category");
  if (categoryEl) categoryEl.textContent = product.category;

  // Name
  const nameEl = document.getElementById("product-name");
  if (nameEl) nameEl.textContent = product.name;

  // Price
  const priceEl = document.getElementById("product-price");
  if (priceEl) {
    if (product.showPrice && product.price) {
      priceEl.textContent = formatPrice(product.price);
      priceEl.style.display = "";
    } else {
      priceEl.style.display = "none";
    }
  }

  // Description
  const descEl = document.getElementById("product-description");
  if (descEl) descEl.textContent = product.description || product.shortDescription || "";

  // Gallery
  renderProductGallery(product.images || [], product.name);

  // WhatsApp button
  const waLinks = document.querySelectorAll("[data-whatsapp-link]");
  waLinks.forEach(el => {
    el.href = generateWhatsAppLink(product.name);
  });

  // Breadcrumb product name
  const breadcrumbName = document.getElementById("breadcrumb-product-name");
  if (breadcrumbName) breadcrumbName.textContent = product.name;

  // Page title
  document.title = `${product.name} — ${BUSINESS_NAME}`;

  // Related products
  renderRelatedProducts(product);
}

function renderProductGallery(images, altText) {
  const mainWrap = document.getElementById("product-main-image-wrap");
  const thumbsContainer = document.getElementById("product-thumbs");

  if (!mainWrap) return;

  const firstImage = images[0] || "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80";

  // Main image
  mainWrap.innerHTML = `
    <img
      src="${firstImage}"
      alt="${altText}"
      class="product-detail__main-image"
      id="product-main-image"
    />
  `;

  // Thumbs — only show if more than one image
  if (!thumbsContainer) return;

  if (images.length <= 1) {
    thumbsContainer.style.display = "none";
    return;
  }

  thumbsContainer.style.display = "";
  thumbsContainer.innerHTML = images.map((src, i) => `
    <button
      class="product-detail__thumb ${i === 0 ? "product-detail__thumb--active" : ""}"
      data-index="${i}"
      aria-label="Imagen ${i + 1}"
    >
      <img src="${src}" alt="${altText} — vista ${i + 1}" loading="lazy" />
    </button>
  `).join("");

  // Thumb click handler
  thumbsContainer.querySelectorAll(".product-detail__thumb").forEach(btn => {
    btn.addEventListener("click", () => {
      const idx = parseInt(btn.dataset.index, 10);
      const mainImg = document.getElementById("product-main-image");
      if (mainImg) mainImg.src = images[idx];

      thumbsContainer.querySelectorAll(".product-detail__thumb").forEach(b =>
        b.classList.remove("product-detail__thumb--active")
      );
      btn.classList.add("product-detail__thumb--active");
    });
  });
}

function renderRelatedProducts(product) {
  const container = document.getElementById("related-products");
  if (!container) return;

  const related = getRelatedProducts(product);

  if (!related.length) {
    container.closest(".related") && (container.closest(".related").style.display = "none");
    return;
  }

  container.innerHTML = related.map(renderProductCard).join("");
}

function showProductError(message) {
  const detail = document.getElementById("product-detail");
  if (detail) {
    detail.innerHTML = `
      <div class="empty-state" style="padding: 80px 24px;">
        <div class="empty-state__icon">🔍</div>
        <h3 class="empty-state__title">Producto no encontrado</h3>
        <p class="empty-state__description">${message}</p>
        <a href="../pages/catalog.html" class="btn btn--primary" style="margin-top: 24px;">Ver catálogo</a>
      </div>
    `;
  }
  const related = document.querySelector(".related");
  if (related) related.style.display = "none";
}

/* ============================================
   Mobile menu
   ============================================ */
function initMobileMenu() {
  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const menuClose = document.getElementById("menu-close");

  if (!menuBtn || !mobileMenu) return;

  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.add("mobile-menu--open");
    document.body.style.overflow = "hidden";
  });

  const closeMenu = () => {
    mobileMenu.classList.remove("mobile-menu--open");
    document.body.style.overflow = "";
  };

  if (menuClose) menuClose.addEventListener("click", closeMenu);

  mobileMenu.addEventListener("click", (e) => {
    if (e.target === mobileMenu) closeMenu();
  });
}

/* ============================================
   Init
   ============================================ */
document.addEventListener("DOMContentLoaded", () => {
  const page = document.body.dataset.page;

  initMobileMenu();

  if (page === "home") {
    renderFeaturedProducts();
  } else if (page === "catalog") {
    initCatalog();
  } else if (page === "product") {
    renderProductDetail();
  }
});

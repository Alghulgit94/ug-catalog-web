/* ============================================
   UG Hogar — utils/helpers.js
   Pure helper functions. All filter/search
   functions take a products array as argument.
   ============================================ */

function isVisibleCategory(category) {
  return category != null && category.isVisible === true;
}

function isVisibleProduct(product) {
  return product.isVisible === true && product.categoryIsVisible === true;
}

function filterVisibleCategories(categories) {
  return categories.filter(isVisibleCategory);
}

function filterVisibleProducts(products) {
  return products.filter(isVisibleProduct);
}

function getQueryParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

function findProductBySlug(slug, products) {
  return products.find(function (p) { return p.slug === slug; });
}

/**
 * Relative path to a product detail page, correct from any page depth.
 */
function buildProductPath(slug) {
  const page = document.body.dataset.page;
  const query = "?slug=" + encodeURIComponent(slug);
  return page === "home" ? "pages/product.html" + query : "product.html" + query;
}

/**
 * Absolute URL to a product detail page. Uses APP_CONFIG.SITE_URL when set,
 * otherwise resolves against the current page (works on localhost and subpaths).
 */
function buildProductUrl(slug) {
  const base = window.APP_CONFIG.SITE_URL;
  if (base) {
    const root = base.charAt(base.length - 1) === "/" ? base : base + "/";
    return new URL("pages/product.html?slug=" + encodeURIComponent(slug), root).href;
  }
  return new URL(buildProductPath(slug), window.location.href).href;
}

/**
 * WhatsApp deep link with a prefilled message: product name, price (only when
 * it is meant to be shown) and a direct link to the product detail page.
 * Accepts a product object; a bare name string is still tolerated.
 */
function generateWhatsAppLink(product) {
  const phone = window.APP_CONFIG.WHATSAPP_PHONE;
  const isProduct = product && typeof product === "object";
  const name = isProduct ? product.name : product;

  const lines = ["Hola, estoy interesado/a en este producto:", "", "*" + name + "*"];

  if (isProduct) {
    if (product.showPrice && product.price) {
      lines.push("Precio: " + formatPrice(product.price));
    }
    lines.push("Ver producto: " + buildProductUrl(product.slug));
  }

  return "https://wa.me/" + phone + "?text=" + encodeURIComponent(lines.join("\n"));
}

function searchProducts(query, products) {
  if (!query || !query.trim()) return products;
  const q = query.toLowerCase().trim();
  return products.filter(function (p) {
    return (
      p.name.toLowerCase().includes(q) ||
      (p.category && p.category.name && p.category.name.toLowerCase().includes(q)) ||
      (p.tags && p.tags.some(function (tag) { return tag.toLowerCase().includes(q); }))
    );
  });
}

function filterByCategory(category, products) {
  if (!category || category === "all" || category === "Todos") return products;
  if (category === "Destacados") return products.filter(function (p) { return p.featured; });
  return products.filter(function (p) { return p.category && p.category.name === category; });
}

function getFilteredProducts(query, category, products) {
  var results = searchProducts(query, products);
  if (category && category !== "all" && category !== "Todos") {
    if (category === "Destacados") {
      results = results.filter(function (p) { return p.featured; });
    } else {
      results = results.filter(function (p) { return p.category && p.category.name === category; });
    }
  }
  return results;
}

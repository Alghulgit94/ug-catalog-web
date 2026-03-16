/* ============================================
   UG Hogar Catalog — utils.js
   Helper functions (no rendering logic)
   ============================================ */

const WHATSAPP_NUMBER = "595981000000"; // Replace with real number
const BUSINESS_NAME = "UG Hogar";

/**
 * Get a URL query parameter value by name.
 * @param {string} name
 * @returns {string|null}
 */
function getQueryParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

/**
 * Find a product by its slug.
 * @param {string} slug
 * @returns {object|undefined}
 */
function findProductBySlug(slug) {
  return PRODUCTS.find(p => p.slug === slug);
}

/**
 * Generate a WhatsApp wa.me link with a pre-filled message for a product.
 * @param {string} productName
 * @returns {string}
 */
function generateWhatsAppLink(productName) {
  const message = `Hola, estoy interesado/a en el producto: ${productName}`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Format a numeric price as Paraguayan Guaraní string.
 * e.g. 3200000 → "Gs 3.200.000"
 * @param {number} price
 * @returns {string}
 */
function formatPrice(price) {
  if (typeof price !== "number") return "";
  return "Gs " + price.toLocaleString("es-PY");
}

/**
 * Search products by name, category, or tags (case-insensitive).
 * @param {string} query
 * @returns {object[]}
 */
function searchProducts(query) {
  if (!query || !query.trim()) return PRODUCTS;
  const q = query.toLowerCase().trim();
  return PRODUCTS.filter(p => {
    return (
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      (p.tags && p.tags.some(tag => tag.toLowerCase().includes(q)))
    );
  });
}

/**
 * Filter products by category. "all" returns all products.
 * "Destacados" returns featured products.
 * @param {string} category
 * @returns {object[]}
 */
function filterByCategory(category) {
  if (!category || category === "all" || category === "Todos") return PRODUCTS;
  if (category === "Destacados") return PRODUCTS.filter(p => p.featured);
  return PRODUCTS.filter(p => p.category === category);
}

/**
 * Combine search and category filter.
 * @param {string} query
 * @param {string} category
 * @returns {object[]}
 */
function getFilteredProducts(query, category) {
  let results = searchProducts(query);
  if (category && category !== "all" && category !== "Todos") {
    if (category === "Destacados") {
      results = results.filter(p => p.featured);
    } else {
      results = results.filter(p => p.category === category);
    }
  }
  return results;
}

/**
 * Get up to 4 related products from the same category, excluding the current product.
 * @param {object} product
 * @returns {object[]}
 */
function getRelatedProducts(product) {
  return PRODUCTS
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
}

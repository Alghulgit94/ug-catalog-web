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

function generateWhatsAppLink(productName) {
  const phone = window.APP_CONFIG.WHATSAPP_PHONE;
  const message = "Hola, estoy interesado/a en el producto: " + productName;
  return "https://wa.me/" + phone + "?text=" + encodeURIComponent(message);
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

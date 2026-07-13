/* ============================================
   UG Hogar — services/catalog-service.js
   Fetches products + categories in parallel.
   ============================================ */

(function () {
  async function getCatalogData() {
    const [products, categories] = await Promise.all([
      window.productService.getAllProducts(),
      window.categoryService.getAllCategories()
    ]);
    return { products, categories };
  }

  window.catalogService = { getCatalogData };
})();

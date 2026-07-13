/* ============================================
   UG Hogar — services/product-service.js
   Composes repository + mapper. Handles errors.
   ============================================ */

(function () {
  async function getAllProducts() {
    const { data, error } = await window.productRepository.getAllProducts();
    if (error || !data) {
      console.error("[product-service] getAllProducts:", error);
      return [];
    }
    return filterVisibleProducts(window.productMapper.mapProducts(data));
  }

  async function getFeaturedProducts() {
    const { data, error } = await window.productRepository.getFeaturedProducts();
    if (error || !data) {
      console.error("[product-service] getFeaturedProducts:", error);
      return [];
    }
    return filterVisibleProducts(window.productMapper.mapProducts(data));
  }

  async function getProductBySlug(slug) {
    const { data, error } = await window.productRepository.getProductBySlug(slug);
    if (error || !data) {
      if (error && error.code !== "PGRST116") {
        console.error("[product-service] getProductBySlug:", error);
      }
      return null;
    }
    const product = window.productMapper.mapProduct(data);
    return isVisibleProduct(product) ? product : null;
  }

  async function getRelatedProducts(product) {
    if (!product || !product.category || !product.category.id) return [];
    const { data, error } = await window.productRepository.getRelatedProducts(product.category.id, product.id);
    if (error || !data) {
      console.error("[product-service] getRelatedProducts:", error);
      return [];
    }
    return filterVisibleProducts(window.productMapper.mapProducts(data));
  }

  window.productService = { getAllProducts, getFeaturedProducts, getProductBySlug, getRelatedProducts };
})();

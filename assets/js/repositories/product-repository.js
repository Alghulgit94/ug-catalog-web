/* ============================================
   UG Hogar — repositories/product-repository.js
   Raw Supabase queries for products.
   ============================================ */

(function () {
  const SELECT_FIELDS = "*, categories(id, name, slug, is_visible)";

  function getAllProducts() {
    return window.supabaseService.query(function (client) {
      return client.from("products").select(SELECT_FIELDS).eq("is_active", true).eq("is_visible", true);
    });
  }

  function getFeaturedProducts() {
    return window.supabaseService.query(function (client) {
      return client.from("products").select(SELECT_FIELDS).eq("is_active", true).eq("is_visible", true).eq("featured", true);
    });
  }

  function getProductBySlug(slug) {
    return window.supabaseService.queryOne(function (client) {
      return client.from("products").select(SELECT_FIELDS).eq("is_active", true).eq("is_visible", true).eq("slug", slug);
    });
  }

  function getRelatedProducts(categoryId, excludeProductId) {
    return window.supabaseService.query(function (client) {
      return client
        .from("products")
        .select(SELECT_FIELDS)
        .eq("is_active", true)
        .eq("is_visible", true)
        .eq("category_id", categoryId)
        .neq("id", excludeProductId)
        .limit(4);
    });
  }

  window.productRepository = { getAllProducts, getFeaturedProducts, getProductBySlug, getRelatedProducts };
})();

/* ============================================
   UG Hogar — repositories/category-repository.js
   Raw Supabase queries for categories.
   ============================================ */

(function () {
  function getAllCategories() {
    return window.supabaseService.query(function (client) {
      return client
        .from("categories")
        .select("*")
        .eq("is_active", true)
        .eq("is_visible", true)
        .order("sort_order", { ascending: true })
        .order("name", { ascending: true });
    });
  }

  window.categoryRepository = { getAllCategories };
})();

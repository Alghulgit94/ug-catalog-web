/* ============================================
   UG Hogar — services/category-service.js
   Composes repository + mapper for categories.
   ============================================ */

(function () {
  async function getAllCategories() {
    const { data, error } = await window.categoryRepository.getAllCategories();
    if (error || !data) {
      console.error("[category-service] getAllCategories:", error);
      return [];
    }
    return window.categoryMapper.mapCategories(data);
  }

  window.categoryService = { getAllCategories };
})();

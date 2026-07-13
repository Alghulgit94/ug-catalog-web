/* ============================================
   UG Hogar — mappers/category-mapper.js
   Maps raw Supabase rows to UI category shape.
   ============================================ */

(function () {
  function mapCategory(row) {
    return {
      id: row.id,
      name: row.name,
      slug: row.slug,
      description: row.description ?? "",
      imageUrl: window.cloudinaryService.getCategoryImageUrl(row),
      isVisible: row.is_visible ?? false
    };
  }

  function mapCategories(rows) {
    return rows.map(mapCategory);
  }

  window.categoryMapper = { mapCategory, mapCategories };
})();

/* ============================================
   UG Hogar — mappers/product-mapper.js
   Maps raw Supabase rows to UI product shape.
   ============================================ */

(function () {
  function mapProduct(row) {
    const categoryRow = row.categories ?? null;
    return {
      id: row.id,
      name: row.name,
      slug: row.slug,
      category: categoryRow ?? { id: null, name: "Sin categoría", slug: "", is_visible: false },
      featured: row.featured ?? false,
      price: row.price ?? null,
      showPrice: row.show_price ?? false,
      shortDescription: row.short_description ?? "",
      description: row.description ?? "",
      coverImage: window.cloudinaryService.getProductCoverUrl(row),
      galleryImages: window.cloudinaryService.getProductGalleryUrls(row),
      tags: row.tags ?? [],
      isVisible: row.is_visible ?? false,
      categoryIsVisible: categoryRow ? (categoryRow.is_visible ?? false) : false
    };
  }

  function mapProducts(rows) {
    return rows.map(mapProduct);
  }

  window.productMapper = { mapProduct, mapProducts };
})();

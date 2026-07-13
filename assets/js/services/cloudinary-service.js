/* ============================================
   UG Hogar — services/cloudinary-service.js
   Builds Cloudinary image URLs. No DOM, no fetch.
   ============================================ */

(function () {
  const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_BASE_FOLDER, PLACEHOLDER_IMAGE_URL } = window.APP_CONFIG;

  function buildTransform(options) {
    const parts = [];
    if (options.width) parts.push(`w_${options.width}`);
    if (options.quality) parts.push(`q_${options.quality}`);
    if (options.format) parts.push(`f_${options.format}`);
    return parts.join(",");
  }

  function getImageUrl(publicId, options) {
    if (!publicId) return PLACEHOLDER_IMAGE_URL;
    options = options || {};
    const transform = buildTransform(options);
    const folder = CLOUDINARY_BASE_FOLDER ? `${CLOUDINARY_BASE_FOLDER}/` : "";
    const transformPart = transform ? `${transform}/` : "";
    return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${transformPart}${folder}${publicId}`;
  }

  function getProductCoverUrl(rawProduct) {
    return getImageUrl(rawProduct.cover_image, { width: 800, quality: "auto", format: "auto" });
  }

  function getProductGalleryUrls(rawProduct) {
    const gallery = rawProduct.gallery_images;
    if (!Array.isArray(gallery) || !gallery.length) return [];
    return gallery.map(function (id) {
      return getImageUrl(id, { width: 800, quality: "auto", format: "auto" });
    });
  }

  function getCategoryImageUrl(rawCategory) {
    return getImageUrl(rawCategory.image_path, { width: 400, quality: "auto", format: "auto" });
  }

  window.cloudinaryService = { getImageUrl, getProductCoverUrl, getProductGalleryUrls, getCategoryImageUrl };
})();

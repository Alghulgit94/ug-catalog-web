/* ============================================
   UG Hogar — utils/formatters.js
   Display formatting helpers.
   ============================================ */

function formatPrice(price) {
  if (typeof price !== "number") return "";
  return "Gs " + price.toLocaleString("es-PY");
}

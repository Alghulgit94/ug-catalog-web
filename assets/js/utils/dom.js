/* ============================================
   UG Hogar — utils/dom.js
   DOM utility functions: loading, empty, error states.
   ============================================ */

function renderLoadingState(container, count) {
  if (!container) return;
  count = count || 4;
  var cards = [];
  for (var i = 0; i < count; i++) {
    cards.push(`
      <article class="product-card product-card--skeleton">
        <div class="product-card__image-wrap"></div>
        <div class="product-card__body">
          <div class="skeleton-line skeleton-line--short"></div>
          <div class="skeleton-line"></div>
          <div class="skeleton-line skeleton-line--price"></div>
        </div>
      </article>
    `);
  }
  container.innerHTML = cards.join("");
}

function renderEmptyState(container, message) {
  if (!container) return;
  container.innerHTML = `
    <div class="empty-state">
      <div class="empty-state__icon">🪑</div>
      <h3 class="empty-state__title">Sin resultados</h3>
      <p class="empty-state__description">${message || "No se encontraron productos. Intenta ajustar tu búsqueda o filtros."}</p>
    </div>
  `;
}

function renderErrorState(container, message) {
  if (!container) return;
  container.innerHTML = `
    <div class="empty-state">
      <div class="empty-state__icon">⚠️</div>
      <h3 class="empty-state__title">Error al cargar</h3>
      <p class="empty-state__description">${message || "No se pudieron cargar los productos. Por favor, intentá más tarde."}</p>
    </div>
  `;
}

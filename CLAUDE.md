# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

UG Hogar Catalog is a static furniture catalog website built with vanilla HTML5, CSS3, and JavaScript. The site acts as a digital showroom that generates WhatsApp sales conversations rather than functioning as a full e-commerce platform.

## Technology Stack

- HTML5, CSS3, Vanilla JavaScript (no frameworks, no build step)
- Static site deployment via Dokploy/Nginx

## Development Commands

No build process. Preview locally with:

```bash
python3 -m http.server 8000
# or
npx serve .
```

Always serve via HTTP — do not open HTML files directly as `file://` (breaks relative paths for `/pages/`).

## Architecture

### File Structure

```
/
├── index.html              # Homepage (data-page="home")
├── pages/
│   ├── catalog.html        # Product catalog with filters (data-page="catalog")
│   └── product.html        # Product detail (data-page="product")
├── assets/
│   ├── css/styles.css      # All styles — single file, BEM naming
│   ├── js/
│   │   ├── data.js         # PRODUCTS array — data only, no logic
│   │   ├── utils.js        # Pure helper functions
│   │   └── app.js          # Rendering + event logic
│   └── img/
│       ├── products/
│       ├── categories/
│       └── brand/
├── mockups/                # Tailwind-based visual references (read-only)
└── docs/                   # STYLES_GUIDES.md, arquitectura-tecnica.md
```

### Script Load Order

All three scripts must be loaded in this order on every page — `utils.js` depends on `PRODUCTS` from `data.js`, and `app.js` depends on both:

```html
<script src="assets/js/data.js"></script>
<script src="assets/js/utils.js"></script>
<script src="assets/js/app.js"></script>
```

Pages inside `/pages/` use `../assets/js/...` paths.

### Page Detection

`app.js` reads `document.body.dataset.page` on `DOMContentLoaded` to branch into the correct init function — never use URL detection. Valid values: `"home"`, `"catalog"`, `"product"`.

### JavaScript Responsibilities

**`data.js`** — exports only the `PRODUCTS` array as a global. No functions.

**`utils.js`** — pure functions and two configurable constants at the top:
- `WHATSAPP_NUMBER` — change this to update all WhatsApp links site-wide
- `BUSINESS_NAME` — used in page titles and WhatsApp messages
- Key functions: `formatPrice`, `generateWhatsAppLink`, `findProductBySlug`, `getQueryParam`, `searchProducts`, `filterByCategory`, `getFilteredProducts`, `getRelatedProducts`

**`app.js`** — all rendering and DOM event logic:
- `renderProductCard(product)` — shared card template used on all three pages
- `buildDetailHref(slug)` — returns `pages/product.html?slug=...` from homepage, `product.html?slug=...` from inside `/pages/` (reads `body.dataset.page` to decide)
- Homepage: `renderFeaturedProducts()` → injects into `#featured-products`
- Catalog: `initCatalog()` → reads `?category=` and `?q=` URL params, binds search input (`#catalog-search`) and filter pills (`.filter-pill[data-category]`)
- Product: `renderProductDetail()` → reads `?slug=`, populates IDs, calls `renderProductGallery()` and `renderRelatedProducts()`

### URL Parameters

- `catalog.html?category=Living` — pre-selects a filter pill
- `catalog.html?q=sofa` — pre-fills and runs search
- `product.html?slug=sofa-minimalista-velvet` — loads a specific product

### Product Data Schema

```javascript
{
  id: "sofa-minimalista-velvet",     // required, unique
  slug: "sofa-minimalista-velvet",   // required, used in URLs
  name: "Sofá Minimalista Velvet",   // required
  category: "Living",                // required — must be one of the 5 below
  featured: true,                    // optional boolean
  price: 4200000,                    // optional number (Guaraníes)
  showPrice: true,                   // if false or absent, price is hidden
  shortDescription: "...",           // optional
  description: "...",                // optional, shown on detail page
  images: ["https://..."],           // required array; first image = card thumbnail
  tags: ["sofa", "nordico"]          // optional, searched by searchProducts()
}
```

**Valid categories (Spanish, exact spelling):** `Living`, `Comedor`, `Dormitorio`, `Oficina`, `Decoración`

The filter pill `"Destacados"` is handled as a special case in `filterByCategory()` — it returns all products where `featured: true`.

### Image Path Convention

- In `data.js` and JS-generated HTML: use absolute paths `/assets/img/...`
- In static HTML attributes inside `/pages/`: use `../assets/img/...`
- Always include `loading="lazy"` except the hero image (`loading="eager"`)

## Design System

### CSS Variables (defined in `:root`)

```css
--primary: #537688    /* buttons, active nav, headings */
--secondary: #B8AA92  /* accents, hover, secondary buttons */
--text: #252728
--bg: #FDFDFC
--border: #D3D5D0
--whatsapp: #25D366   /* ONLY for WhatsApp actions — never repurpose */
```

### Key CSS Conventions

- **BEM naming**: `.product-card__body`, `.filter-pill--active`
- **Mobile-first**: base styles = mobile, then `@media (min-width: 640px)` and `@media (min-width: 1024px)`
- All styles in `assets/css/styles.css` — no `<style>` tags, no inline styles
- Transition duration: 200–300ms (`--transition: 220ms ease`)
- Card border-radius: `--radius-card: 22px` | Button: `--radius-btn: 14px` | Pill: `--radius-pill: 9999px`

### Responsive Breakpoints

- Mobile: 0–640px (1-column grids)
- Tablet: 640px+ (2-column product grid, 3-column categories)
- Desktop: 1024px+ (4-column product grid, 6-column categories, 2-column product detail)

## Important Conventions

- **Adding a product**: add an entry to `PRODUCTS` in `data.js` — no other file needs to change
- **Changing WhatsApp number**: update `WHATSAPP_NUMBER` in `utils.js` — propagates everywhere
- **Product not found**: `showProductError()` renders an inline error inside `#product-detail` and hides the related section
- **Empty search/filter**: `renderEmptyState(container)` renders inside the grid — uses `grid-column: 1 / -1` to span full width
- **Gallery**: thumbs are hidden (via `display: none`) when a product has only one image

## Future Extensibility

Rendering logic in `app.js` is intentionally decoupled from `data.js`. Replacing `PRODUCTS` with an async API call requires only changing `data.js` and making the render functions `async` — the templates stay the same.

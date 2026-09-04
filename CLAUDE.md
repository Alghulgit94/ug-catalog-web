# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

UG Hogar Catalog is a static furniture catalog website built with vanilla HTML5, CSS3, and JavaScript. The site acts as a digital showroom that generates WhatsApp sales conversations rather than functioning as a full e-commerce platform.

There is no build step, but the site is **not** self-contained: products and categories are read at runtime from **Supabase**, and images are served from **Cloudinary**. Content is loaded through a sibling admin panel (`../ug-panel-admin-carga`), not by editing files in this repo.

## Technology Stack

- HTML5, CSS3, Vanilla JavaScript (no frameworks, no bundler, no npm)
- Supabase (Postgres + REST) as the data source, via the `@supabase/supabase-js@2` UMD build from jsDelivr
- Cloudinary for product and category images
- Static site deployment via Dokploy/Nginx

## Development Commands

No build process. Preview locally with:

```bash
python -m http.server 8000
# or
npx serve .
```

Always serve via HTTP — do not open HTML files directly as `file://` (breaks relative paths for `/pages/` and the Supabase client).

## Architecture

### File Structure

```
/
├── index.html                  # Homepage (data-page="home")
├── pages/
│   ├── catalog.html            # Catalog with filters (data-page="catalog")
│   └── product.html            # Product detail (data-page="product")
├── assets/
│   ├── css/styles.css          # All styles — single file, BEM naming
│   ├── js/
│   │   ├── config/env.js       # window.APP_CONFIG — all config values
│   │   ├── services/
│   │   │   ├── supabase-client.js    # Singleton client
│   │   │   ├── supabase-service.js   # query / queryOne with error capture
│   │   │   ├── cloudinary-service.js # Builds image URLs
│   │   │   ├── category-service.js   # repository + mapper
│   │   │   ├── product-service.js    # repository + mapper + visibility
│   │   │   └── catalog-service.js    # products + categories in parallel
│   │   ├── repositories/       # Raw Supabase queries only
│   │   ├── mappers/            # Raw DB rows → UI shape
│   │   ├── utils/
│   │   │   ├── formatters.js   # formatPrice
│   │   │   ├── helpers.js      # Pure helpers + URL/WhatsApp builders
│   │   │   └── dom.js          # Loading / empty / error states
│   │   └── app.js              # Rendering + event logic
│   └── img/                    # Static assets only (brand, decorative)
├── mockups/                    # Tailwind-based visual references (read-only)
└── docs/                       # README.md, STYLES_GUIDES.md, arquitectura-tecnica.md
```

### Layering

Data flows in one direction. Do not skip a layer:

```
repository  →  mapper  →  service  →  app.js
(raw query)    (shape)    (errors)    (DOM)
```

- **repositories/** — build Supabase queries. No error handling, no mapping, no DOM.
- **mappers/** — convert snake_case DB rows to the camelCase UI shape. Also where Cloudinary URLs get resolved.
- **services/** — await the repository, log and swallow errors, return a safe default (`[]` or `null`), then map. `app.js` never sees a Supabase error object.
- **app.js** — all DOM rendering and event binding. Never queries Supabase directly.

Every module except `app.js` and the three `utils/` files is an IIFE that assigns a single global (`window.productService`, `window.cloudinaryService`, …). The `utils/` files declare bare global functions.

### Script Load Order

All 15 scripts must load in this exact order on every page — each layer depends on the globals declared above it, and `config/env.js` must come first:

```html
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.js"></script>
<script src="assets/js/config/env.js"></script>
<script src="assets/js/services/supabase-client.js"></script>
<script src="assets/js/services/cloudinary-service.js"></script>
<script src="assets/js/services/supabase-service.js"></script>
<script src="assets/js/repositories/category-repository.js"></script>
<script src="assets/js/repositories/product-repository.js"></script>
<script src="assets/js/mappers/category-mapper.js"></script>
<script src="assets/js/mappers/product-mapper.js"></script>
<script src="assets/js/services/category-service.js"></script>
<script src="assets/js/services/product-service.js"></script>
<script src="assets/js/services/catalog-service.js"></script>
<script src="assets/js/utils/formatters.js"></script>
<script src="assets/js/utils/helpers.js"></script>
<script src="assets/js/utils/dom.js"></script>
<script src="assets/js/app.js"></script>
```

Pages inside `/pages/` use `../assets/js/...` paths. Note that `formatters.js` must precede `helpers.js` (`generateWhatsAppLink` calls `formatPrice`).

### Page Detection

`app.js` reads `document.body.dataset.page` on `DOMContentLoaded` to branch into the correct init function — never use URL detection. Valid values: `"home"`, `"catalog"`, `"product"`. `initMobileMenu()` runs on all three.

### Configuration — `config/env.js`

Single source of truth: a frozen `window.APP_CONFIG` object. No logic, no functions.

| Key | Purpose |
|---|---|
| `SUPABASE_URL`, `SUPABASE_ANON_KEY` | Supabase project credentials (the anon key is public by design; access must be enforced with RLS) |
| `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_BASE_FOLDER` | Image URL construction |
| `SITE_URL` | Public origin used for product links in WhatsApp messages. Empty = derived at runtime from `window.location.href` |
| `WHATSAPP_PHONE` | Change this to update every JS-generated WhatsApp link |
| `BUSINESS_NAME` | Used in page titles |
| `PLACEHOLDER_IMAGE_URL` | Fallback when a product has no image |

### JavaScript Responsibilities

**`utils/formatters.js`** — `formatPrice(price)` returns `"Gs 350.000"`, or `""` if the argument is not a number.

**`utils/helpers.js`** — pure helpers, no fetching:

- Visibility: `isVisibleProduct`, `isVisibleCategory`, `filterVisibleProducts`, `filterVisibleCategories`
- Search and filter: `searchProducts`, `filterByCategory`, `getFilteredProducts` — all take the products array as an argument
- Lookup: `getQueryParam`, `findProductBySlug`
- URLs: `buildProductPath(slug)` (relative, page-aware, slug escaped) and `buildProductUrl(slug)` (absolute, honors `SITE_URL`)
- `generateWhatsAppLink(product)` — takes the **product object** and builds a prefilled message with the name, the price (only when `showPrice && price`) and the absolute product URL

**`utils/dom.js`** — `renderLoadingState(container, count)` (skeleton cards), `renderEmptyState(container, message)`, `renderErrorState(container, message)`.

**`app.js`** — all rendering and DOM event logic:

- `renderProductCard(product)` — shared card template used on all three pages
- `buildDetailHref(slug)` — thin wrapper over `buildProductPath(slug)`
- Homepage: `renderFeaturedProducts()` → `#featured-products`; `renderCategoryCards()` → `#categories-grid`
- Catalog: `initCatalog()` → reads `?category=` and `?q=`, **builds the filter pills dynamically** from the visible categories, binds `#catalog-search` and the pills; `renderCatalogProducts()` re-renders from the module-level `allProducts` / `currentQuery` / `currentCategory`
- Product: `renderProductDetail()` → reads `?slug=`, populates elements by ID, then calls `renderProductGallery()` and `renderRelatedProducts()`

### URL Parameters

- `catalog.html?category=Living` — pre-selects a filter pill
- `catalog.html?q=sofa` — pre-fills and runs search
- `product.html?slug=sofa-minimalista-velvet` — loads a specific product

### Data Model

**Supabase tables:** `products` and `categories`, joined via `products.category_id`. The product select is always `"*, categories(id, name, slug, is_visible)"`.

Mapped product shape (`mappers/product-mapper.js`) — this is what `app.js` sees:

```javascript
{
  id, name, slug,
  category: { id, name, slug, is_visible },  // never null — falls back to "Sin categoría"
  featured: false,          // from featured
  price: null,              // from price
  showPrice: false,         // from show_price — if false, the price is hidden everywhere
  shortDescription: "",     // from short_description
  description: "",
  coverImage: "https://res.cloudinary.com/...",   // from the cover_image public ID
  galleryImages: [],        // from the gallery_images public IDs
  tags: [],                 // searched by searchProducts()
  isVisible: false,         // from is_visible
  categoryIsVisible: false  // from categories.is_visible
}
```

The mapped category shape adds `imageUrl` (from `image_path`) and `description`.

### Visibility Rules

Filtered twice, on purpose:

1. **At the query** — every repository call chains `.eq("is_active", true).eq("is_visible", true)`; categories also require `is_active`.
2. **After mapping** — `product-service.js` runs `filterVisibleProducts()`, which drops any product whose **category** is hidden. Hiding a category therefore hides all of its products without touching them.

### Categories

Categories are **data, not constants** — they come from the `categories` table, ordered by `sort_order` then `name`, and the catalog filter pills are generated from them at runtime. Do not hardcode a category list.

Two special pill values are handled in `filterByCategory()` / `getFilteredProducts()`:

- `"Todos"` (and `"all"`) — no filtering
- `"Destacados"` — returns products where `featured` is true

The only place category names are still hardcoded is `CATEGORY_FALLBACK_IMAGES` in `renderCategoryCards()` (`app.js`), used as a per-name `onerror` fallback image.

### Image Conventions

- Product and category images live in Cloudinary. The DB stores **public IDs only**; `cloudinary-service.js` builds the URL with `w_*,q_auto,f_auto` transforms (800px for products, 400px for categories).
- `assets/img/` holds only static assets (brand, decorative). In static HTML inside `/pages/`, reference them as `../assets/img/...`.
- Always include `loading="lazy"` except the hero image (`loading="eager"`).
- Any missing image resolves to `PLACEHOLDER_IMAGE_URL`.

## Design System

### CSS Variables (defined in `:root`)

```css
--primary: #537688        /* buttons, active nav, headings */
--secondary: #B8AA92      /* accents, hover, secondary buttons */
--text: #252728
--bg: #FDFDFC
--border: #D3D5D0
--whatsapp: #25D366       /* ONLY for WhatsApp actions — never repurpose */
--whatsapp-dark: #1ebe5d
```

Also defined: `--shadow-sm/md/lg`, `--radius-card: 22px`, `--radius-btn: 14px`, `--radius-pill: 9999px`, `--transition: 220ms ease`.

### Key CSS Conventions

- **BEM naming**: `.product-card__body`, `.filter-pill--active`
- **Mobile-first**: base styles = mobile, then `@media (min-width: 640px)` and `@media (min-width: 1024px)`
- All styles in `assets/css/styles.css` — no `<style>` tags, no inline styles
- Transition duration: 200–300ms

### Responsive Breakpoints

- Mobile: 0–640px (1-column grids)
- Tablet: 640px+ (2-column product grid, 3-column categories)
- Desktop: 1024px+ (4-column product grid, 6-column categories, 2-column product detail)

## Important Conventions

- **Adding or editing a product**: done in Supabase, through the `../ug-panel-admin-carga` panel. No file in this repo changes.
- **Changing the WhatsApp number**: update `WHATSAPP_PHONE` in `config/env.js` — it propagates to every JS-generated link. The static buttons (header CTA, mobile menu, footer, floating FAB, hero CTA) have the number **hardcoded in each HTML page** and must be updated by hand.
- **Setting the public domain**: fill `SITE_URL` in `config/env.js`. Left empty, product links fall back to the current origin — fine for local dev, but a link shared from `localhost` will point at `localhost`.
- **Product not found**: `showProductError()` renders an inline error inside `#product-detail` and hides the related section.
- **Empty search/filter**: `renderEmptyState(container)` renders inside the grid — uses `grid-column: 1 / -1` to span full width.
- **Loading**: call `renderLoadingState(container, n)` before every await that will replace a grid.
- **Gallery**: thumbs are hidden (`display: none`) when a product has only one image.
- Services never throw — they log to the console and return `[]` / `null`. Render code should check for an empty result rather than wrapping calls in try/catch.

## Known Gaps

- `renderErrorState()` is defined but never called — service-level failures currently surface as an empty state, which reads as "no products" rather than "something broke".
- `findProductBySlug()`, `filterByCategory()` and `filterVisibleCategories()` are defined in `helpers.js` but are currently unused by `app.js`.

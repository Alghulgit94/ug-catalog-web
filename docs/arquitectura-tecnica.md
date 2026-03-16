Technical Specification & JavaScript Architecture
1. Architecture Overview

The UG Hogar catalog website is a lightweight static web application built using:

HTML

CSS

Vanilla JavaScript

The system must not rely on heavy frameworks or external libraries.

The architecture should follow a simple client-side rendering approach where JavaScript reads product data and dynamically renders UI components.

Architecture Diagram

Technical Specification & JavaScript Architecture
1. Architecture Overview

The UG Hogar catalog website is a lightweight static web application built using:

HTML

CSS

Vanilla JavaScript

The system must not rely on heavy frameworks or external libraries.

The architecture should follow a simple client-side rendering approach where JavaScript reads product data and dynamically renders UI components.

Architecture Diagram
flowchart TD


User --> HomePage
User --> CatalogPage
User --> ProductPage


HomePage --> JS_Render
CatalogPage --> JS_Render
ProductPage --> JS_Render


JS_Render --> DataSource


DataSource --> Products
Products --> RenderedUI
RenderedUI --> WhatsAppLink
2. Rendering Strategy

Rendering must be client-side using JavaScript.

The workflow:

Load page HTML

Load data.js

Load app.js

JavaScript reads product data

JavaScript renders components into the DOM

3. Data Source Specification

The product catalog must initially load from a local file:

assets/js/data.js

This file exports the catalog dataset.

Product Object Schema

Each product must follow this structure:

{
  id: "sofa-minimalist-velvet",
  slug: "sofa-minimalist-velvet",

  name: "Minimalist Velvet Sofa",

  category: "Living",

  featured: true,

  price: 3200000,
  showPrice: true,

  shortDescription: "Modern minimalist sofa for living spaces.",

  description: "Full detailed product description.",

  images: [
    "/assets/img/products/sofa-1.jpg",
    "/assets/img/products/sofa-2.jpg"
  ],

  tags: [
    "sofa",
    "living",
    "modern"
  ]
}
Required Product Fields
Field	Type	Required
id	string	yes
slug	string	yes
name	string	yes
category	string	yes
featured	boolean	no
price	number	optional
showPrice	boolean	optional
shortDescription	string	optional
description	string	optional
images	array	required
tags	array	optional
4. JavaScript File Responsibilities

The project must contain three JavaScript files.

data.js

Purpose:

Contains catalog product data.

Example:

export const PRODUCTS = [...]

This file must contain no logic.

Only data.

utils.js

Purpose:

Contains helper functions used across the site.

Examples:

query parameter parsing

slug utilities

WhatsApp link generation

formatting functions

app.js

Purpose:

Main application logic.

Responsibilities:

page detection

product rendering

search

filtering

product detail loading

related product logic

5. Page Detection Logic

The application must detect which page is currently loaded.

Example approach:

const page = document.body.dataset.page

Example usage in HTML:

<body data-page="home">
<body data-page="catalog">
<body data-page="product">
6. Rendering Functions

The following rendering functions must exist.

renderFeaturedProducts()

Purpose:

Render featured products on the homepage.

Logic:

filter products where featured === true

take first 4 items

render product cards

renderCatalogProducts()

Purpose:

Render all catalog products.

Logic:

load products

apply search filter

apply category filter

render product grid

renderProductCard(product)

Purpose:

Generate HTML for a product card.

Card must include:

product image

category label

product name

optional price

WhatsApp button

link to detail page

Example link:

product.html?slug=product-slug
renderProductDetail()

Purpose:

Render a single product page.

Steps:

read slug from URL

find product

populate UI fields

build WhatsApp link

render related products

7. URL Parameter Handling

The product detail page must read a slug parameter.

Example URL:

product.html?slug=minimalist-velvet-sofa

Function required:

getQueryParam(name)

Example:

getQueryParam("slug")
8. Product Lookup

The system must include a function:

findProductBySlug(slug)

Implementation concept:

PRODUCTS.find(product => product.slug === slug)
9. Search System

Search must work across:

product name

category

tags

Required function:

searchProducts(query)

Behavior:

Case-insensitive search.

Example logic:

product.name.includes(query)
10. Category Filtering

The catalog must support category filtering.

Required function:

filterByCategory(category)

Behavior:

If category is "all", return full catalog.

Otherwise filter products matching the category.

11. Combined Filtering

Catalog results should support both:

Search + Category.

Required function:

getFilteredProducts(query, category)

Steps:

start with all products

apply category filter

apply search filter

12. Related Products Logic

Product detail page must display related items.

Required function:

getRelatedProducts(product)

Logic:

filter products with same category

exclude current product

return first 4

13. WhatsApp Link Generation

Each product must generate a WhatsApp contact link.

Required function:

generateWhatsAppLink(productName)

Example result:

https://wa.me/595XXXXXXXXX?text=Hello,%20I%20am%20interested%20in%20the%20product:%20Minimalist%20Velvet%20Sofa
14. Price Formatting

Optional helper:

formatPrice(price)

Example result:

Gs 3.200.000

If showPrice === false the price should not render.

15. Empty State Handling

The catalog must handle empty results.

Example message:

No products found.
Try adjusting your search or filters.
16. Image Handling

Product images must support:

Single image or gallery.

If only one image exists, hide gallery controls.

Use lazy loading for images.

Example attribute:

loading="lazy"
17. DOM Rendering Strategy

Use simple rendering methods.

Example:

element.innerHTML = html

or

document.createElement()

Avoid overly complex DOM manipulation.

18. Event Handling

Events required:

Search input

input event

Category filter

click event

Product cards

navigation to product page
19. Performance Rules

The site must remain lightweight.

Rules:

no large libraries

avoid unnecessary DOM re-renders

lazy load images

minimize JS complexity

20. Error Handling

The application must handle:

Invalid product slug

Example message:

Product not found.

Missing images

Use placeholder image.

Empty catalog

Display empty state.

21. CSS Architecture

CSS should follow a simple structure.

Example sections:

Reset
Typography
Layout
Components
Buttons
Cards
Catalog
Product Detail
Footer
Responsive
22. Responsive Breakpoints

Suggested breakpoints:

Mobile

0–640px

Tablet

640–1024px

Desktop

1024px+
23. Image Folder Structure

Images must be organized as follows:

assets/img/products
assets/img/categories
assets/img/brand
24. Future Data Integration

The architecture must allow replacing data.js with:

API

CMS

Supabase

Admin panel

This means:

Rendering logic must remain independent from the data source.

25. Minimal Code Philosophy

Code should remain:

readable

modular

simple

maintainable

Avoid premature complexity.

26. Final Output Requirements

Claude Code must generate:

index.html
catalog.html
product.html

assets/css/styles.css

assets/js/data.js
assets/js/app.js
assets/js/utils.js

assets/img placeholders

The result must be a fully functional static catalog website ready for deployment on Dokploy.
2. Rendering Strategy

Rendering must be client-side using JavaScript.

The workflow:

Load page HTML

Load data.js

Load app.js

JavaScript reads product data

JavaScript renders components into the DOM

3. Data Source Specification

The product catalog must initially load from a local file:

assets/js/data.js

This file exports the catalog dataset.

Product Object Schema

Each product must follow this structure:

{
  id: "sofa-minimalist-velvet",
  slug: "sofa-minimalist-velvet",

  name: "Minimalist Velvet Sofa",

  category: "Living",

  featured: true,

  price: 3200000,
  showPrice: true,

  shortDescription: "Modern minimalist sofa for living spaces.",

  description: "Full detailed product description.",

  images: [
    "/assets/img/products/sofa-1.jpg",
    "/assets/img/products/sofa-2.jpg"
  ],

  tags: [
    "sofa",
    "living",
    "modern"
  ]
}
Required Product Fields
Field	Type	Required
id	string	yes
slug	string	yes
name	string	yes
category	string	yes
featured	boolean	no
price	number	optional
showPrice	boolean	optional
shortDescription	string	optional
description	string	optional
images	array	required
tags	array	optional
4. JavaScript File Responsibilities

The project must contain three JavaScript files.

data.js

Purpose:

Contains catalog product data.

Example:

export const PRODUCTS = [...]

This file must contain no logic.

Only data.

utils.js

Purpose:

Contains helper functions used across the site.

Examples:

query parameter parsing

slug utilities

WhatsApp link generation

formatting functions

app.js

Purpose:

Main application logic.

Responsibilities:

page detection

product rendering

search

filtering

product detail loading

related product logic

5. Page Detection Logic

The application must detect which page is currently loaded.

Example approach:

const page = document.body.dataset.page

Example usage in HTML:

<body data-page="home">
<body data-page="catalog">
<body data-page="product">
6. Rendering Functions

The following rendering functions must exist.

renderFeaturedProducts()

Purpose:

Render featured products on the homepage.

Logic:

filter products where featured === true

take first 4 items

render product cards

renderCatalogProducts()

Purpose:

Render all catalog products.

Logic:

load products

apply search filter

apply category filter

render product grid

renderProductCard(product)

Purpose:

Generate HTML for a product card.

Card must include:

product image

category label

product name

optional price

WhatsApp button

link to detail page

Example link:

product.html?slug=product-slug
renderProductDetail()

Purpose:

Render a single product page.

Steps:

read slug from URL

find product

populate UI fields

build WhatsApp link

render related products

7. URL Parameter Handling

The product detail page must read a slug parameter.

Example URL:

product.html?slug=minimalist-velvet-sofa

Function required:

getQueryParam(name)

Example:

getQueryParam("slug")
8. Product Lookup

The system must include a function:

findProductBySlug(slug)

Implementation concept:

PRODUCTS.find(product => product.slug === slug)
9. Search System

Search must work across:

product name

category

tags

Required function:

searchProducts(query)

Behavior:

Case-insensitive search.

Example logic:

product.name.includes(query)
10. Category Filtering

The catalog must support category filtering.

Required function:

filterByCategory(category)

Behavior:

If category is "all", return full catalog.

Otherwise filter products matching the category.

11. Combined Filtering

Catalog results should support both:

Search + Category.

Required function:

getFilteredProducts(query, category)

Steps:

start with all products

apply category filter

apply search filter

12. Related Products Logic

Product detail page must display related items.

Required function:

getRelatedProducts(product)

Logic:

filter products with same category

exclude current product

return first 4

13. WhatsApp Link Generation

Each product must generate a WhatsApp contact link.

Required function:

generateWhatsAppLink(productName)

Example result:

https://wa.me/595XXXXXXXXX?text=Hello,%20I%20am%20interested%20in%20the%20product:%20Minimalist%20Velvet%20Sofa
14. Price Formatting

Optional helper:

formatPrice(price)

Example result:

Gs 3.200.000

If showPrice === false the price should not render.

15. Empty State Handling

The catalog must handle empty results.

Example message:

No products found.
Try adjusting your search or filters.
16. Image Handling

Product images must support:

Single image or gallery.

If only one image exists, hide gallery controls.

Use lazy loading for images.

Example attribute:

loading="lazy"
17. DOM Rendering Strategy

Use simple rendering methods.

Example:

element.innerHTML = html

or

document.createElement()

Avoid overly complex DOM manipulation.

18. Event Handling

Events required:

Search input

input event

Category filter

click event

Product cards

navigation to product page
19. Performance Rules

The site must remain lightweight.

Rules:

no large libraries

avoid unnecessary DOM re-renders

lazy load images

minimize JS complexity

20. Error Handling

The application must handle:

Invalid product slug

Example message:

Product not found.

Missing images

Use placeholder image.

Empty catalog

Display empty state.

21. CSS Architecture

CSS should follow a simple structure.

Example sections:

Reset
Typography
Layout
Components
Buttons
Cards
Catalog
Product Detail
Footer
Responsive
22. Responsive Breakpoints

Suggested breakpoints:

Mobile

0–640px

Tablet

640–1024px

Desktop

1024px+
23. Image Folder Structure

Images must be organized as follows:

assets/img/products
assets/img/categories
assets/img/brand
24. Future Data Integration

The architecture must allow replacing data.js with:

API

CMS

Supabase

Admin panel

This means:

Rendering logic must remain independent from the data source.

25. Minimal Code Philosophy

Code should remain:

readable

modular

simple

maintainable

Avoid premature complexity.

26. Final Output Requirements

Claude Code must generate:

index.html
catalog.html
product.html

assets/css/styles.css

assets/js/data.js
assets/js/app.js
assets/js/utils.js

assets/img placeholders

The result must be a fully functional static catalog website ready for deployment on Dokploy.
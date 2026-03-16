Project Name

UG Hogar Catalog Website

Project Description

This project consists of building a catalog-style website for UG Hogar.

The website will showcase furniture and home products while allowing customers to contact the business directly through WhatsApp.

The platform is not intended to be a full e-commerce system.

Instead, it acts as a digital showroom that generates WhatsApp sales conversations.

Main Goals

Allow visitors to:

browse products

explore categories

search for items

view product details

contact the business through WhatsApp

Technology Stack

The project must use:

HTML5

CSS3

Vanilla JavaScript

No heavy frameworks.

The website must be deployable as a static website.

Deployment

The project will be deployed using Dokploy.

The final output must work as a static site that can be served by a web server such as Nginx.

Pages
Home Page

The homepage should include:

hero section

category section

featured products

catalog entry point

WhatsApp contact CTA

footer

Catalog Page

The catalog page should include:

product grid

search bar

category filters

featured filter

product cards

navigation to product detail

Product Detail Page

The product detail page must include:

product name

product category

optional price

product description

product image gallery

WhatsApp CTA

related products

Functional Requirements
Product Navigation

Users must be able to navigate:

Home → Catalog → Product Detail.

Category navigation must filter the catalog.

Product Search

Search must work by:

product name

category

keywords

Search should update the catalog results dynamically.

Category Filters

Catalog must allow filtering by category.

Example categories

Living

Dining

Bedroom

Office

Decoration

Featured Products

Products should support a flag:

featured: true

Featured products appear:

on homepage

optionally in catalog filter

WhatsApp Integration

Each product must include a WhatsApp contact button.

The WhatsApp link must automatically include the product name.

Example URL

https://wa.me/595XXXXXXXXX?text=Hello,%20I%20am%20interested%20in%20the%20product:%20[PRODUCT_NAME]

Example message

Hello, I am interested in the product: [Product Name]
Could you provide more information?
Optional Price

The system must support products with or without price.

Example field

showPrice: true

If price is hidden the layout must remain stable.

Data Source

The initial version should use a simple local data source.

Recommended approach:

data.js

or

products.json

Example structure

const PRODUCTS = [
{
id: "sofa-minimalist-velvet",
slug: "sofa-minimalist-velvet",
name: "Minimalist Velvet Sofa",
category: "Living",
featured: true,
price: 3200000,
showPrice: true,
shortDescription: "Modern minimalist sofa.",
description: "Full product description here.",
images: [
"/assets/img/products/sofa1.jpg",
"/assets/img/products/sofa2.jpg"
],
tags: ["sofa","living","modern"]
}
]
Suggested Project Structure
ug-hogar-catalog

index.html

/pages
catalog.html
product.html

/assets
/css
styles.css

/js
app.js
data.js
utils.js

/img
/products
/categories
/brand

README.md
JavaScript Responsibilities

JavaScript should handle:

Product rendering

Catalog filtering

Search

Product detail loading

WhatsApp message generation

Related product logic

Product Detail Routing

Product detail page should read a parameter such as:

product.html?slug=sofa-minimalist-velvet

JavaScript should then find the matching product and render the content.

If the product does not exist, show a "product not found" message.

Related Products

Related products should:

share the same category

exclude the current product

display up to 4 items

Edge Cases

The system must gracefully handle:

products without price

products with a single image

search with no results

invalid product slug

empty categories

long product names

Configurable Variables

The following values should be easy to change:

WhatsApp phone number

business name

hero text

categories

product list

contact information

social links

price visibility

Performance Requirements

The website must:

load quickly

optimize images

avoid unnecessary libraries

use lazy loading where appropriate

remain lightweight

Basic SEO

Each page must include:

title tag

meta description

proper heading hierarchy

alt text for images

clean structure

Docker Deployment (Optional)

Example Dockerfile

FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80
Expected Deliverables

Claude Code should generate:

index.html

catalog.html

product.html

styles.css

data.js

app.js

utils.js

image placeholders

README.md

fully functional static catalog

Acceptance Criteria

Home page loads correctly

Catalog lists products

Search works

Filters work

Product detail loads correctly

WhatsApp links include product name

Website is responsive

Website is deployable as static project
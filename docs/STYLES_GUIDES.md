UG Hogar Catalog Website – Design Style Guide
Product Vision

UG Hogar does not need a complex e-commerce platform.

The goal is to build a clean, elegant digital showroom where users can:

browse furniture products

explore categories

view product details

contact the business directly through WhatsApp

The website should feel like a premium catalog, not a marketplace.

The design must communicate:

warmth

trust

simplicity

product quality

ease of contact

The main conversion action is WhatsApp conversation, not checkout.

Design Principles
1. Product first

Images sell the product.
The UI must stay minimal and never compete with the product photos.

2. Simplicity over complexity

No heavy UI patterns, no unnecessary components.

Navigation must remain extremely simple:

Home → Catalog → Product Detail → WhatsApp.

3. Editorial aesthetic

The website should feel closer to a furniture magazine layout than a generic online store.

4. Mobile-first thinking

Most users will arrive from mobile and click the WhatsApp button.

If mobile UX fails, the site fails.

5. Speed matters

Pages must load quickly.

Avoid heavy libraries and unnecessary dependencies.

Visual Identity
Primary Colors

Official palette derived from the provided homepage and catalog layouts.

Primary brand color

#537688

Secondary accent color

#B8AA92

Main text color

#252728

Main background

#FDFDFC

Soft border color

#D3D5D0
Color Usage Rules

Primary (#537688)

Used for:

main buttons

active navigation

key headings

links

Secondary (#B8AA92)

Used for:

secondary buttons

subtle accents

hover states

Text (#252728)

Used for:

body text

headings

labels

Background (#FDFDFC)

Used for:

page background

sections

WhatsApp Green

Used ONLY for WhatsApp buttons.

Never reuse WhatsApp green for general UI elements.

Typography
Primary Font
Inter

Font weights recommended:

400

500

600

700

800

Typography Scale

Hero title

Desktop:
48–64px

Mobile:
32–42px

Section titles

28–36px

Product titles

18–22px

Body text

15–17px

Labels / categories

11–13px uppercase

Buttons

14–16px semibold

Layout and Spacing

Spacing scale

Use a consistent spacing system based on:

4px
8px
16px
24px
32px
40px
48px
64px
80px
Container Width

Maximum content width

1280px – 1400px

Horizontal padding

Mobile

16px

Tablet

24px

Desktop

40px
Border Radius

Cards

20px – 24px

Buttons

12px – 16px

Pill filters

9999px
Shadows

Use very subtle shadows.

Cards should slightly elevate on hover.

Avoid heavy or dramatic shadows.

UI Components
Header

Header must include:

logo

navigation links

search input

catalog link

optional WhatsApp CTA

Behavior:

sticky header

light background

subtle bottom border

Hero Section

The hero section should include:

large lifestyle image

strong headline

short description

primary CTA (view catalog)

secondary CTA (WhatsApp)

No complex sliders unless absolutely necessary.

Category Section

Categories should be visually displayed using cards with images.

Example categories:

Living Room

Dining Room

Bedroom

Office

Decoration

Each category card should navigate to the catalog filtered by that category.

Product Cards

Each product card must include:

product image

optional featured badge

category label

product name

optional price

WhatsApp button

click area to open product detail

Rules:

Product names should not exceed two lines.

Cards must remain visually clean.

Images should maintain consistent aspect ratio.

Search

Search should allow users to find products by:

product name

category

keywords

Search should be available in:

header

catalog page

Filters

Catalog filters should include:

all products

category filters

featured products

search filtering

Filters should appear as pill buttons.

Active state must be visually clear.

Product Detail Page

The product detail page should contain:

breadcrumb navigation

main product image

optional image gallery

product name

category

optional price

description

large WhatsApp CTA

related products

The WhatsApp button must be visually prominent.

Related Products

Display up to 4 related products.

Logic:

Products from the same category excluding the current product.

Buttons

Primary button

Background

#537688

Text

white

Secondary button

Background

#B8AA92

Text

#252728

WhatsApp button

Use official WhatsApp green.

Include WhatsApp icon.

Example label:

"Ask on WhatsApp"

Footer

Footer should include:

company information

navigation links

product categories

contact information

social links

Footer background should be dark.

Text should be light.

Motion and Interaction

Animations must remain minimal.

Recommended transitions

200ms – 300ms

Use for:

card hover

button hover

image zoom

Avoid complex animations.

Accessibility

The site must ensure:

sufficient color contrast

alt text for images

visible focus states

accessible buttons

readable font sizes

Technical UI Rules

Final implementation must:

use semantic HTML

avoid heavy frameworks

use vanilla JavaScript

use a custom CSS file

remain lightweight and maintainable
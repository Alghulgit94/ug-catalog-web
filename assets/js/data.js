/* ============================================
   UG Hogar Catalog — data.js
   Product data only (no logic)
   ============================================ */

const PRODUCTS = [
  // --- Living ---
  {
    id: "sofa-minimalista-velvet",
    slug: "sofa-minimalista-velvet",
    name: "Sofá Minimalista Velvet",
    category: "Living",
    featured: true,
    price: 4200000,
    showPrice: true,
    shortDescription: "Sofá de terciopelo con estructura nórdica. Elegante, confortable y atemporal.",
    description: "Diseño escandinavo con tapizado de terciopelo suave y patas de madera maciza. Ideal para salas modernas. Disponible en múltiples colores. Dimensiones: 220 × 85 × 80 cm.",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&q=80"
    ],
    tags: ["sofa", "living", "velvet", "nordico", "moderno"]
  },
  {
    id: "sillon-individual-nordic",
    slug: "sillon-individual-nordic",
    name: "Sillón Individual Nordic",
    category: "Living",
    featured: true,
    price: 1850000,
    showPrice: true,
    shortDescription: "Sillón tapizado con diseño nórdico minimalista. Perfecto para lectura y descanso.",
    description: "Sillón de líneas limpias con tapizado en tela de alta resistencia y patas cónicas de madera. Combina perfectamente con cualquier sofá de la colección. Dimensiones: 75 × 80 × 85 cm.",
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80"
    ],
    tags: ["sillon", "living", "nordico", "lectura"]
  },
  {
    id: "mesa-ratona-marmol",
    slug: "mesa-ratona-marmol",
    name: "Mesa de Centro Mármol",
    category: "Living",
    featured: false,
    price: 980000,
    showPrice: true,
    shortDescription: "Mesa de centro con tapa de mármol y base de metal dorado mate.",
    description: "Mesa ratona con tapa de mármol natural y base metálica con acabado dorado mate. Añade elegancia a cualquier sala. Dimensiones: 90 × 50 × 45 cm.",
    images: [
      "https://images.unsplash.com/photo-1594563703937-fdc640497dcd?w=800&q=80"
    ],
    tags: ["mesa", "marmol", "living", "centro", "dorado"]
  },

  // --- Comedor ---
  {
    id: "mesa-nordica-roble",
    slug: "mesa-nordica-roble",
    name: "Mesa Nórdica Roble",
    category: "Comedor",
    featured: true,
    price: 3400000,
    showPrice: true,
    shortDescription: "Mesa de comedor en madera de roble macizo. Para 6 personas, estilo escandinavo.",
    description: "Mesa de comedor fabricada en roble macizo con acabado natural al aceite. Estructura robusta y diseño atemporal. Dimensiones: 200 × 90 × 76 cm. Capacidad para 6–8 personas.",
    images: [
      "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80",
      "https://images.unsplash.com/photo-1549497538-303791108f95?w=800&q=80"
    ],
    tags: ["mesa", "comedor", "roble", "nordico", "madera"]
  },
  {
    id: "silla-osaka",
    slug: "silla-osaka",
    name: "Silla Osaka",
    category: "Comedor",
    featured: false,
    price: 560000,
    showPrice: true,
    shortDescription: "Silla de comedor con asiento tapizado y estructura de madera. Pack de 2 unidades.",
    description: "Silla de diseño japonés con estructura de madera curvada y asiento tapizado en tela antideslizante. Apilable. Precio por unidad. Dimensiones: 45 × 51 × 82 cm.",
    images: [
      "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800&q=80"
    ],
    tags: ["silla", "comedor", "osaka", "japones", "tapizado"]
  },

  // --- Dormitorio ---
  {
    id: "cama-king-somnia",
    slug: "cama-king-somnia",
    name: "Cama King Somnia",
    category: "Dormitorio",
    featured: true,
    price: 5800000,
    showPrice: true,
    shortDescription: "Cama king size con cabecera tapizada y estructura de madera de primera calidad.",
    description: "Cama king con cabecera tapizada en tela lino y estructura de madera maciza con terminaciones en lacado blanco. Incluye somier de láminas. Medidas: 200 × 200 cm. No incluye colchón.",
    images: [
      "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=800&q=80",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80"
    ],
    tags: ["cama", "king", "dormitorio", "cabecera", "tapizado"]
  },
  {
    id: "mesita-luz-minimalist",
    slug: "mesita-luz-minimalist",
    name: "Mesita de Luz Minimalist",
    category: "Dormitorio",
    featured: false,
    price: 680000,
    showPrice: true,
    shortDescription: "Mesita de noche flotante en MDF lacado con cajón de cierre suave.",
    description: "Mesita de noche de pared con cajón y compartimento abierto. Fabricada en MDF lacado blanco o gris. Cierre suave en el cajón. Dimensiones: 50 × 35 × 40 cm.",
    images: [
      "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800&q=80"
    ],
    tags: ["mesita", "noche", "dormitorio", "flotante", "minimalista"]
  },
  {
    id: "ropero-escandinavo",
    slug: "ropero-escandinavo",
    name: "Ropero Escandinavo 3 Puertas",
    category: "Dormitorio",
    featured: false,
    showPrice: false,
    shortDescription: "Ropero de 3 puertas con interior organizado. Diseño escandinavo en blanco mate.",
    description: "Amplio ropero con 3 puertas batientes, espejo interior, barra portaropa y estantes regulables. Acabado blanco mate. Dimensiones: 180 × 60 × 220 cm. Armado e instalación incluidos.",
    images: [
      "https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=800&q=80"
    ],
    tags: ["ropero", "dormitorio", "escandinavo", "3 puertas", "blanco"]
  },

  // --- Oficina ---
  {
    id: "escritorio-industrial-pro",
    slug: "escritorio-industrial-pro",
    name: "Escritorio Industrial Pro",
    category: "Oficina",
    featured: true,
    price: 2100000,
    showPrice: true,
    shortDescription: "Escritorio con tablero de madera y estructura metálica. Estilo industrial moderno.",
    description: "Escritorio de trabajo con tablero en madera de pino natural y base metálica de hierro pintado negro. Incluye travesaño inferior para mayor estabilidad. Dimensiones: 140 × 70 × 75 cm.",
    images: [
      "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&q=80"
    ],
    tags: ["escritorio", "oficina", "industrial", "madera", "hierro"]
  },
  {
    id: "silla-ergonomica-pro",
    slug: "silla-ergonomica-pro",
    name: "Silla Ergonómica Pro",
    category: "Oficina",
    featured: false,
    price: 1650000,
    showPrice: true,
    shortDescription: "Silla de oficina ergonómica con soporte lumbar regulable y apoyabrazos ajustables.",
    description: "Silla ejecutiva con malla transpirable, soporte lumbar regulable en altura y profundidad, apoyabrazos 4D y base de aluminio con ruedas. Ideal para jornadas largas de trabajo. Carga máxima: 120 kg.",
    images: [
      "https://images.unsplash.com/photo-1541558869434-2840d308329a?w=800&q=80"
    ],
    tags: ["silla", "ergonomica", "oficina", "lumbar", "ejecutiva"]
  },

  // --- Decoración ---
  {
    id: "lampara-pie-luna",
    slug: "lampara-pie-luna",
    name: "Lámpara de Pie Luna",
    category: "Decoración",
    featured: false,
    price: 890000,
    showPrice: true,
    shortDescription: "Lámpara de pie con pantalla esférica en papel de arroz y pie de bambú.",
    description: "Lámpara de pie de inspiración japonesa con pantalla esférica en papel de arroz resistente y estructura de bambú. Luz cálida y difusa. Ideal para ambientes relajados. Altura: 165 cm. Incluye foco LED E27.",
    images: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80"
    ],
    tags: ["lampara", "pie", "decoracion", "bambu", "japones", "luz"]
  },
  {
    id: "estanteria-modular-zen",
    slug: "estanteria-modular-zen",
    name: "Estantería Modular Zen",
    category: "Decoración",
    featured: false,
    showPrice: false,
    shortDescription: "Estantería modular en madera de pino. Configurable en múltiples disposiciones.",
    description: "Sistema de estantería modular fabricado en madera de pino con acabado natural. Se puede configurar en vertical, horizontal o en esquina. Incluye todos los herrajes. Cada módulo: 40 × 30 × 30 cm.",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80"
    ],
    tags: ["estanteria", "modular", "decoracion", "madera", "pino", "zen"]
  }
];

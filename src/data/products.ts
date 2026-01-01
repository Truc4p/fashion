import { Product, Collection } from '@/types'

export const products: Product[] = [
  {
    id: 1,
    name: "Structured Silk Blazer",
    category: "woman",
    price: 895.00,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1608234808654-2a8875faa7fd?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1608234808654-2a8875faa7fd?w=800&q=80",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80",
    ],
    badge: "new",
    new: true,
    description: "Impeccably tailored silk blazer with structured shoulders. A timeless piece that transitions effortlessly from boardroom to evening.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [{ name: "Black", hex: "#1a1a1a" }, { name: "Ivory", hex: "#f5f3ef" }]
  },
  {
    id: 2,
    name: "Premium Linen Shirt",
    category: "man",
    price: 425.00,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?w=800&q=80",
    badge: null,
    new: false,
    description: "Luxuriously soft Italian linen shirt with mother-of-pearl buttons. Perfect for warm weather sophistication.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [{ name: "White", hex: "#ffffff" }, { name: "Navy", hex: "#1e3a5f" }]
  },
  {
    id: 3,
    name: "Wide Leg Wool Trousers",
    category: "woman",
    price: 625.00,
    originalPrice: 890.00,
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80",
    badge: "sale",
    new: false,
    description: "High-waisted wool trousers with elegant wide leg silhouette. Crafted from premium Italian wool.",
    sizes: ["XS", "S", "M", "L"],
    colors: [{ name: "Charcoal", hex: "#2c2c2c" }, { name: "Camel", hex: "#c9a87c" }]
  },
  {
    id: 4,
    name: "Italian Leather Jacket",
    category: "man",
    price: 1995.00,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80",
    badge: null,
    new: true,
    description: "Hand-stitched Italian leather jacket with signature hardware. A statement piece for the modern gentleman.",
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Black", hex: "#1a1a1a" }, { name: "Brown", hex: "#5c4033" }]
  },
  {
    id: 5,
    name: "Silk Midi Dress",
    category: "woman",
    price: 785.00,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80",
    badge: "new",
    new: true,
    description: "Flowing silk midi dress with flattering silhouette. Elegance personified for special occasions.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [{ name: "Champagne", hex: "#f7e7ce" }, { name: "Black", hex: "#1a1a1a" }]
  },
  {
    id: 6,
    name: "Selvedge Denim Jacket",
    category: "man",
    price: 695.00,
    originalPrice: 895.00,
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80",
    badge: "sale",
    new: false,
    description: "Japanese selvedge denim jacket with raw edge details. Each piece develops unique character with wear.",
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Indigo", hex: "#3f5c94" }]
  },
  {
    id: 7,
    name: "Cashmere Sweater",
    category: "woman",
    price: 1295.00,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80",
    badge: null,
    new: false,
    description: "Ultra-soft Mongolian cashmere sweater with ribbed details. The ultimate in everyday luxury.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [{ name: "Cream", hex: "#faf8f5" }, { name: "Grey", hex: "#9a9a9a" }]
  },
  {
    id: 8,
    name: "Bespoke Tailored Suit",
    category: "man",
    price: 2995.00,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80",
    badge: null,
    new: true,
    description: "Hand-tailored suit in premium Super 150s wool. The pinnacle of sartorial excellence.",
    sizes: ["38R", "40R", "42R", "44R", "46R"],
    colors: [{ name: "Navy", hex: "#1e3a5f" }, { name: "Charcoal", hex: "#2c2c2c" }]
  },
  {
    id: 9,
    name: "Leather Crossbody Bag",
    category: "accessories",
    price: 495.00,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80",
    badge: "new",
    new: true,
    description: "Versatile crossbody bag in buttery soft leather. The perfect companion for modern living.",
    colors: [{ name: "Tan", hex: "#d2b48c" }, { name: "Black", hex: "#1a1a1a" }]
  },
  {
    id: 10,
    name: "Wool & Cashmere Coat",
    category: "woman",
    price: 1895.00,
    originalPrice: 2495.00,
    image: "https://images.unsplash.com/photo-1548624313-0396c75e4b1a?w=800&q=80",
    badge: "sale",
    new: false,
    description: "Luxurious wool-cashmere blend coat with timeless silhouette. A wardrobe investment piece.",
    sizes: ["XS", "S", "M", "L"],
    colors: [{ name: "Camel", hex: "#c9a87c" }, { name: "Black", hex: "#1a1a1a" }]
  },
  {
    id: 11,
    name: "Handcrafted Leather Sneakers",
    category: "accessories",
    price: 595.00,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&q=80",
    badge: null,
    new: false,
    description: "Italian-made sneakers in premium leather. Where comfort meets craftsmanship.",
    sizes: ["39", "40", "41", "42", "43", "44", "45"],
    colors: [{ name: "White", hex: "#ffffff" }, { name: "Navy", hex: "#1e3a5f" }]
  },
  {
    id: 12,
    name: "Merino Wool Cardigan",
    category: "man",
    price: 795.00,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&q=80",
    badge: null,
    new: true,
    description: "Fine merino wool cardigan with horn buttons. Understated elegance for layered looks.",
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Navy", hex: "#1e3a5f" }, { name: "Grey", hex: "#9a9a9a" }]
  }
]

export const collections: Collection[] = [
  {
    id: "women",
    title: "Women's Collection",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80",
    link: "/collection/women"
  },
  {
    id: "men",
    title: "Men's Collection",
    image: "https://images.unsplash.com/photo-1507680434567-5739c80be1ac?w=800&q=80",
    link: "/collection/men"
  },
  {
    id: "accessories",
    title: "Accessories",
    image: "https://images.unsplash.com/photo-1606522754091-a3bbf9ad4cb3?w=800&q=80",
    link: "/collection/accessories"
  }
]

export const heroSlides = [
  {
    id: 1,
    badge: "Spring/Summer 2026",
    title: "Timeless Elegance",
    subtitle: "Curated pieces for the discerning individual",
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1920&q=80",
    cta: "Explore Collection"
  },
  {
    id: 2,
    badge: "New Arrivals",
    title: "Modern Classics",
    subtitle: "Where tradition meets contemporary design",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1920&q=80",
    cta: "Shop Now"
  }
]

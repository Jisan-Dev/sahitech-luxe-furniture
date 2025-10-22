import dotenv from "dotenv";
import mongoose from "mongoose";
import Product from "./models/product.js";
dotenv.config();

export const products = [
  {
    name: "Modern Velvet Sofa",
    description:
      "Luxurious velvet sofa with deep seating and elegant design. Perfect for contemporary living spaces.",
    price: 1299,
    category: {
      $oid: "68f9316c3ca36c541e33ac0d",
    },
    images: [
      {
        url: "/modern-velvet-sofa.jpg",
        alt: "Modern Velvet Sofa",
      },
    ],
    stock: 25,
    rating: 5,
    numReviews: 2,
    isFeatured: true,
    inSale: false,
  },
  {
    name: "Scandinavian Dining Chair",
    description: "Minimalist dining chair with solid wood legs and comfortable upholstered seat.",
    price: 249,
    salePrice: 199,
    category: {
      $oid: "68f9316c3ca36c541e33ac0e",
    },
    images: [
      {
        url: "/scandinavian-dining-chair.png",
        alt: "Scandinavian Dining Chair",
      },
    ],
    stock: 25,
    rating: 4,
    numReviews: 2,
    isFeatured: true,
    inSale: true,
  },
  {
    name: "Marble Coffee Table",
    description: "Elegant coffee table featuring genuine marble top and brass-finished metal base.",
    price: 599,
    category: {
      $oid: "68f9316c3ca36c541e33ac0f",
    },
    images: [
      {
        url: "/marble-coffee-table.png",
        alt: "Marble Coffee Table",
      },
    ],
    stock: 25,
    rating: 5,
    numReviews: 1,
    isFeatured: true,
    inSale: false,
  },
  {
    name: "Upholstered King Bed",
    description:
      "Sophisticated upholstered bed frame with tufted headboard and solid wood construction.",
    price: 1899,
    category: {
      $oid: "68f9316c3ca36c541e33ac10",
    },
    images: [
      {
        url: "/upholstered-king-bed.jpg",
        alt: "Upholstered King Bed",
      },
    ],
    stock: 25,
    rating: 4,
    numReviews: 2,
    isFeatured: true,
    inSale: false,
  },
  {
    name: "Leather Lounge Chair",
    description:
      "Classic leather lounge chair with ottoman. Timeless design and premium materials.",
    price: 899,
    salePrice: 699,
    category: {
      $oid: "68f9316c3ca36c541e33ac0e",
    },
    images: [
      {
        url: "/leather-lounge-chair.jpg",
        alt: "Leather Lounge Chair",
      },
    ],
    stock: 25,
    rating: 5,
    numReviews: 1,
    isFeatured: false,
    inSale: true,
  },
  {
    name: "Sectional Sofa",
    description: "Spacious L-shaped sectional with plush cushions and durable fabric upholstery.",
    price: 2199,
    category: {
      $oid: "68f9316c3ca36c541e33ac0d",
    },
    images: [
      {
        url: "/modern-sectional-sofa.png",
        alt: "Sectional Sofa",
      },
    ],
    stock: 25,
    rating: 4,
    numReviews: 1,
    isFeatured: false,
    inSale: false,
  },
  {
    name: "Oak Dining Table",
    description: "Solid oak dining table with natural finish. Seats 6-8 people comfortably.",
    price: 1299,
    category: {
      $oid: "68f9316c3ca36c541e33ac0f",
    },
    images: [
      {
        url: "/rustic-oak-table.png",
        alt: "Oak Dining Table",
      },
    ],
    stock: 25,
    rating: 5,
    numReviews: 1,
    isFeatured: false,
    inSale: false,
  },
  {
    name: "Accent Armchair",
    description: "Statement armchair with curved silhouette and luxurious fabric upholstery.",
    price: 449,
    category: {
      $oid: "68f9316c3ca36c541e33ac0e",
    },
    images: [
      {
        url: "/modern-accent-armchair.png",
        alt: "Accent Armchair",
      },
    ],
    stock: 25,
    rating: 4,
    numReviews: 1,
    isFeatured: false,
    inSale: false,
  },
  {
    name: "Platform Bed Frame",
    description: "Low-profile platform bed with clean lines and integrated storage drawers.",
    price: 799,
    salePrice: 649,
    category: {
      $oid: "68f9316c3ca36c541e33ac10",
    },
    images: [
      {
        url: "/platform-bed-frame.jpg",
        alt: "Platform Bed Frame",
      },
    ],
    stock: 25,
    rating: 4,
    numReviews: 1,
    isFeatured: false,
    inSale: true,
  },
  {
    name: "Console Table",
    description:
      "Sleek console table perfect for entryways. Features slim profile and metal frame.",
    price: 399,
    category: {
      $oid: "68f9316c3ca36c541e33ac0f",
    },
    images: [
      {
        url: "/modern-console-table.jpg",
        alt: "Console Table",
      },
    ],
    stock: 25,
    rating: 3,
    numReviews: 1,
    isFeatured: false,
    inSale: false,
  },
  {
    name: "Chesterfield Sofa",
    description: "Classic Chesterfield sofa with deep button tufting and rolled arms.",
    price: 1799,
    category: {
      $oid: "68f9316c3ca36c541e33ac0d",
    },
    images: [
      {
        url: "/chesterfield-sofa.jpg",
        alt: "Chesterfield Sofa",
      },
    ],
    stock: 25,
    rating: 5,
    numReviews: 1,
    isFeatured: false,
    inSale: false,
  },
  {
    name: "Bar Stool Set",
    description: "Set of 2 adjustable bar stools with swivel seats and footrests.",
    price: 349,
    category: {
      $oid: "68f9316c3ca36c541e33ac0e",
    },
    images: [
      {
        url: "/modern-bar-stools.jpg",
        alt: "Bar Stool Set",
      },
    ],
    stock: 25,
    rating: 4,
    numReviews: 1,
    isFeatured: false,
    inSale: false,
  },
  {
    name: "Wingback Accent Chair",
    description: "Classic wingback chair upholstered in premium velvet with nailhead trim.",
    price: 649,
    salePrice: 499,
    category: {
      $oid: "68f9316c3ca36c541e33ac0e",
    },
    images: [
      {
        url: "/elegant-wingback-chair-in-velvet-fabric.jpg",
        alt: "Wingback Accent Chair",
      },
    ],
    stock: 25,
    rating: 5,
    numReviews: 1,
    isFeatured: false,
    inSale: true,
  },
  {
    name: "Canopy Bed Frame",
    description: "Dramatic four-poster canopy bed with clean lines and metal construction.",
    price: 2299,
    category: {
      $oid: "68f9316c3ca36c541e33ac10",
    },
    images: [
      {
        url: "/modern-four-poster-canopy-bed-frame.jpg",
        alt: "Canopy Bed Frame",
      },
    ],
    stock: 25,
    rating: 4,
    numReviews: 1,
    isFeatured: false,
    inSale: false,
  },
  {
    name: "Loveseat Sofa",
    description: "Compact loveseat perfect for small spaces. Comfortable and stylish.",
    price: 899,
    category: {
      $oid: "68f9316c3ca36c541e33ac0d",
    },
    images: [
      {
        url: "/compact-loveseat-sofa-in-neutral-fabric.jpg",
        alt: "Loveseat Sofa",
      },
    ],
    stock: 25,
    rating: 4,
    numReviews: 1,
    isFeatured: false,
    inSale: false,
  },
  {
    name: "Nesting Coffee Tables",
    description: "Set of 3 nesting tables with marble tops and gold-finished metal frames.",
    price: 449,
    category: {
      $oid: "68f9316c3ca36c541e33ac0f",
    },
    images: [
      {
        url: "/set-of-nesting-coffee-tables-with-metal-frames.jpg",
        alt: "Nesting Coffee Tables",
      },
    ],
    stock: 25,
    rating: 5,
    numReviews: 1,
    isFeatured: false,
    inSale: false,
  },
  {
    name: "Rocking Chair",
    description: "Contemporary rocking chair with ergonomic design and plush cushioning.",
    price: 549,
    category: {
      $oid: "68f9316c3ca36c541e33ac0e",
    },
    images: [
      {
        url: "/modern-rocking-chair-with-cushioned-seat.jpg",
        alt: "Rocking Chair",
      },
    ],
    stock: 25,
    rating: 4,
    numReviews: 1,
    isFeatured: false,
    inSale: false,
  },
];

export const categories = [
  {
    name: "Sofas",
    slug: "sofas",
    description: "Comfortable and stylish sofas for any living space.",
    image: "/categories/sofas.jpg",
    productCount: 0,
  },
  {
    name: "Chairs",
    slug: "chairs",
    description: "Find the perfect accent, dining, or office chair.",
    image: "/categories/chairs.jpg",
    productCount: 0,
  },
  {
    name: "Tables",
    slug: "tables",
    description: "Discover coffee tables, dining tables, and side tables.",
    image: "/categories/tables.jpg",
    productCount: 0,
  },
  {
    name: "Beds",
    slug: "beds",
    description: "Stylish and comfortable beds for a restful night's sleep.",
    image: "/categories/beds.jpg",
    productCount: 0,
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected");

    // Clear existing data
    await Product.deleteMany({});
    // await Category.deleteMany({});
    console.log("Cleared existing data");

    // Insert categories
    // const insertedCategories = await Category.insertMany(categories);
    // console.log(`Inserted ${insertedCategories.length} categories`);

    // Insert products
    const insertedProducts = await Product.insertMany(products);
    console.log(`Inserted ${insertedProducts.length} products`);

    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();

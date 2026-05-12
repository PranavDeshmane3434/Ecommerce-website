import dotenv from "dotenv";
import mongoose from "mongoose";
import Product from "./models/Product.js";

dotenv.config();

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");

    await Product.deleteMany();

   const products = [
  {
    name: "iPhone 15",
    description: "Latest Apple smartphone with amazing camera.",
    price: 79999,
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
    category: "Mobile",
    countInStock: 10,
  },
  {
    name: "Samsung Galaxy S24",
    description: "Flagship Android smartphone.",
    price: 69999,
    image:
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80",
    category: "Mobile",
    countInStock: 8,
  },
  {
    name: "Gaming Laptop",
    description: "Powerful gaming laptop for professionals.",
    price: 120000,
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80",
    category: "Laptop",
    countInStock: 5,
  },
  {
    name: "MacBook Pro",
    description: "Apple M3 powered professional laptop.",
    price: 180000,
    image:
      "https://images.unsplash.com/photo-1517336714739-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
    category: "Laptop",
    countInStock: 4,
  },
  {
    name: "Wireless Headphones",
    description: "Premium noise cancellation headphones.",
    price: 9999,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    category: "Accessories",
    countInStock: 15,
  },
  {
    name: "Smart Watch",
    description: "Fitness tracking smart watch.",
    price: 14999,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
    category: "Accessories",
    countInStock: 20,
  },
  {
    name: "Bluetooth Speaker",
    description: "Portable high bass speaker.",
    price: 4999,
    image:
      "https://images.unsplash.com/photo-1589003077984-894e133dabab?auto=format&fit=crop&w=800&q=80",
    category: "Accessories",
    countInStock: 18,
  },
  {
    name: "DSLR Camera",
    description: "Professional photography camera.",
    price: 65000,
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80",
    category: "Camera",
    countInStock: 6,
  },
  {
    name: "PlayStation 5",
    description: "Next generation gaming console.",
    price: 54999,
    image:
      "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=800&q=80",
    category: "Gaming",
    countInStock: 7,
  },
  {
    name: "Xbox Series X",
    description: "Powerful gaming console from Microsoft.",
    price: 52999,
    image:
      "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?auto=format&fit=crop&w=800&q=80",
    category: "Gaming",
    countInStock: 5,
  },
  {
    name: "Mechanical Keyboard",
    description: "RGB gaming mechanical keyboard.",
    price: 5999,
    image:
      "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=800&q=80",
    category: "Accessories",
    countInStock: 14,
  },
  {
    name: "Gaming Mouse",
    description: "Ergonomic gaming mouse with RGB.",
    price: 2999,
    image:
      "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=800&q=80",
    category: "Accessories",
    countInStock: 25,
  },
  {
    name: "4K Monitor",
    description: "Ultra HD professional monitor.",
    price: 24999,
    image:
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80",
    category: "Monitor",
    countInStock: 9,
  },
  {
    name: "Office Chair",
    description: "Comfortable ergonomic office chair.",
    price: 12999,
    image:
      "https://images.unsplash.com/photo-1505843490701-5be5d5b19f8f?auto=format&fit=crop&w=800&q=80",
    category: "Furniture",
    countInStock: 11,
  },
  {
    name: "Tablet Pro",
    description: "Powerful tablet for productivity.",
    price: 45999,
    image:
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80",
    category: "Tablet",
    countInStock: 8,
  },
  {
    name: "AirPods Pro",
    description: "Apple premium wireless earbuds.",
    price: 21999,
    image:
      "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f37?auto=format&fit=crop&w=800&q=80",
    category: "Accessories",
    countInStock: 17,
  },
  {
    name: "Smart TV",
    description: "55 inch Ultra HD smart television.",
    price: 69999,
    image:
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80",
    category: "Electronics",
    countInStock: 6,
  },
  {
    name: "Canon Printer",
    description: "Wireless all-in-one printer.",
    price: 8999,
    image:
      "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=800&q=80",
    category: "Electronics",
    countInStock: 13,
  },
  {
    name: "External SSD",
    description: "1TB high speed portable SSD.",
    price: 7499,
    image:
      "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=800&q=80",
    category: "Storage",
    countInStock: 16,
  },
  {
    name: "Webcam HD",
    description: "1080p streaming webcam.",
    price: 3999,
    image:
      "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=800&q=80",
    category: "Accessories",
    countInStock: 22,
  },
];
    await Product.insertMany(products);

    console.log("Products Seeded Successfully");

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seedProducts();
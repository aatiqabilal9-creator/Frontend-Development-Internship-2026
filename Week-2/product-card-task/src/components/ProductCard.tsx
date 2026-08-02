type Product = {
  name: string;
  price: string;
  description: string;
  image: string;
  category: string;
};

const products: Product[] = [
  {
    name: "Wireless Headphones",
    category: "Audio",
    price: "$79.99",
    description: "Noise-cancelling over-ear headphones with 30-hour battery life.",
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&q=80",
  },
  {
    name: "Minimalist Watch",
    category: "Wearables",
    price: "$149.99",
    description: "Classic leather-strap watch with a clean, minimal dial.",
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=500&q=80",
  },
  {
    name: "Canvas Tote Bag",
    category: "Accessories",
    price: "$34.99",
    description: "Sturdy canvas tote, perfect for everyday errands and travel.",
    image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=500&q=80",
  },
  {
    name: "Ceramic Coffee Mug",
    category: "Home",
    price: "$14.99",
    description: "12oz handcrafted mug, microwave and dishwasher safe.",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&q=80",
  },
  {
    name: "Cotton Knit Sweater",
    category: "Clothing",
    price: "$54.99",
    description: "Soft, breathable cotton sweater for cool-weather layering.",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&q=80",
  },
  {
    name: "Denim Jacket",
    category: "Clothing",
    price: "$68.99",
    description: "Classic light-wash denim jacket with a relaxed fit.",
    image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=500&q=80",
  },
  {
    name: "Running Sneakers",
    category: "Footwear",
    price: "$89.99",
    description: "Lightweight everyday sneakers with breathable mesh uppers.",
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&q=80",
  },
  {
    name: "Leather Wallet",
    category: "Accessories",
    price: "$39.99",
    description: "Slim bifold wallet in full-grain leather, ages beautifully.",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&q=80",
  },
];

function ProductCardItem({ product }: { product: Product }) {
  return (
    <div className="group bg-white rounded-2xl border border-stone-200 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-stone-200/60 hover:-translate-y-1.5">
      <div className="relative bg-stone-100 mx-auto mt-4 w-[85%] aspect-[4/5] overflow-hidden rounded-xl">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur text-stone-700 text-xs font-medium px-2.5 py-1 rounded-full shadow-sm">
          {product.category}
        </span>
      </div>

      <div className="p-5">
        <h3 className="font-semibold text-stone-900 text-base leading-snug">
          {product.name}
        </h3>
        <p className="text-stone-500 text-sm mt-1.5 mb-4 leading-relaxed">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-stone-900">{product.price}</span>
          <button className="bg-stone-900 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-all duration-200 hover:bg-stone-700 active:scale-95">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProductCard() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-stone-50 to-stone-100 px-4 py-14 sm:py-20">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 sm:mb-12 text-center">
          <span className="text-sm font-medium text-amber-700 uppercase tracking-wide">
            New arrivals
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 mt-2">
            Featured products
          </h1>
          <p className="text-stone-500 mt-3 max-w-md mx-auto">
            Handpicked essentials, delivered straight to your door.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <ProductCardItem key={index} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
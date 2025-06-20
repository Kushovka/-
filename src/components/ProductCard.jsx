import { Link } from "react-router-dom";

const ProductCard = ({ product, color }) => {
  return (
    <Link
      to={`/product/${product.id}`}
      className="bg-black/70 p-12 rounded-[40px]  hover:scale-105 hover:-translate-y-4 transition-all duration-300"
    >
      <div className="flex flex-col items-center justify-center space-y-8">
        <div className="border-[14px] rounded-[40px] border-black/50 overflow-hidden">
          <img
            src={color.images[0]}
            alt={product.name}
            className="w-full h-96 object-cover"
          />
        </div>
        <h2 className="text-2xl text-white">{product.name}</h2>
      </div>
    </Link>
  );
};

export default ProductCard;

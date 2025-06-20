import React, { useEffect, useState } from "react";
import { getProducts } from "../services/api";
import ProductCard from "../components/ProductCard";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);
  return (
    <div className="flex items-center justify-center container mx-auto px-8 md:px-12 py-8 md:py-12">
      <div className="flex flex-col md:flex-row items-center justify-between gap-10">
        {products.map((product) => {
          const firstColor = product.colors[0];

          return (
            <ProductCard
              key={product.id}
              product={product}
              color={firstColor}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;

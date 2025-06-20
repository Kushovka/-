import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";

import { getProduct, getSizes } from "../services/api";

export default function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [sizes, setSizes] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    getProduct(productId).then((data) => {
      setProduct(data);
      setSelectedColor(data.colors[0]);
    });
    getSizes().then(setSizes);
  }, [productId]);

  const handleColorChange = (color) => {
    setSelectedColor(color);
    setSelectedImageIndex(0);
    setSelectedSize(null);
  };

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) return;
    const item = {
      productId: product.id,
      colorId: selectedColor.id,
      sizeId: selectedSize.id,
      productName: product.name,
      colorName: selectedColor.name,
      sizeLabel: selectedSize.label,
      price: selectedColor.price,
      image: selectedColor.images[0],
    };
    addToCart(item);
  };

  if (!product || !selectedColor)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-2xl text-black/30">Загрузка...</p>
      </div>
    );

  return (
    <section className="container mx-auto px-8 md:px-12 py-8 md:py-12">
      <div className="flex flex-col items-center justify-center p-4 gap-12">
        <h1 className="text-3xl font-semibold">{product.name}</h1>
        <div className="flex flex-col md:flex-row items-center gap-24">
          
          <div>
            <img
              src={selectedColor.images[selectedImageIndex]}
              alt="product"
              className="w-64 my-4"
            />
            <div className="flex gap-2 mb-4">
              {selectedColor.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt="preview"
                  className={`w-16 h-16 object-cover cursor-pointer border ${
                    selectedImageIndex === i
                      ? "border-black"
                      : "border-gray-300"
                  }`}
                  onClick={() => setSelectedImageIndex(i)}
                />
              ))}
            </div>
          </div>

          <div>
            <div className="flex flex-col items-center justify-center gap-6">
              <div className="py-6">
                <p className="mb-4 ">{selectedColor.description}</p>
              </div>

              <div className="mb-4">
                <p className="font-semibold mb-2">Цвет:</p>
                <div className="flex gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => handleColorChange(color)}
                      className={`px-3 py-1 border ${
                        selectedColor.id === color.id
                          ? "border-black font-bold"
                          : "border-gray-300"
                      }`}
                    >
                      {color.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <p className="font-semibold mb-2">Размер:</p>
                <div className="flex gap-2">
                  {sizes.map((size) => {
                    const available = selectedColor.sizes.includes(size.id);
                    return (
                      <button
                        key={size.id}
                        disabled={!available}
                        onClick={() => available && setSelectedSize(size)}
                        className={`px-3 py-1 border ${
                          !available
                            ? "opacity-50 cursor-not-allowed"
                            : selectedSize?.id === size.id
                            ? "border-black font-bold"
                            : "border-gray-300"
                        }`}
                      >
                        {size.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <p className="text-xl font-semibold mb-2">
                {selectedColor.price} ₽
              </p>

              <button
                onClick={handleAddToCart}
                disabled={!selectedSize}
                className="px-4 py-2 bg-black text-white disabled:opacity-50"
              >
                Добавить в корзину
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

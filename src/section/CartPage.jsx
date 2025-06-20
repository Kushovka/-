import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { cart, removeFromCart } = useCart();

  if (cart.length === 0) {
    return <div className="text-center py-16 text-xl">Корзина пуста</div>;
  }

  return (
    <section className="container mx-auto px-8 md:px-12 py-8 md:py-12">
      <h1 className="text-3xl font-bold mb-6">Корзина</h1>
      <div className="space-y-6">
        {cart.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center gap-6 border p-4 rounded"
          >
            <img
              src={item.image}
              alt={item.productName}
              className="w-24 h-24 object-cover"
            />
            <div className="flex flex-col">
              <p className="font-bold">{item.productName}</p>
              <p>Цвет: {item.colorName}</p>
              <p>Размер: {item.sizeLabel}</p>
              <p>Цена: {item.price} ₽</p>
            </div>
            <div>
              <button
                onClick={() => removeFromCart(index)}
                className="px-3 py-1 border border-red-500 text-red-500 hover:bg-red-100"
              >
                Удалить
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

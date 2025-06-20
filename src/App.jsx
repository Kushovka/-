import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import ProductList from "./section/ProductList";
import ProductDetails from "./section/ProductDetails";

import CartPage from "./section/CartPage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

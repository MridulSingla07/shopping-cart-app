import "./App.css";
import { Routes, Route } from "react-router-dom";
import ProductListPage from "./Pages/ProductListPage";
import ProductDetailsPage from "./Pages/ProductDetailsPage";
import CartPage from "./Pages/CartPage";
function App() {
  return (
    <>
      <Routes>
        <Route path="/products" element={<ProductListPage />} />
        <Route path="/product-details/:id" element={<ProductDetailsPage />} />
        <Route path="/shopping-cart" element={<CartPage />} />
      </Routes>
    </>
  );
}

export default App;

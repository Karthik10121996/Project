import "./App.css";
import "./styles.css";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useContext } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ThemeContext } from "./components/ThemeContext";
import Home from "./pages/Home";
import Products from './pages/Products';
import Users from "./pages/Users";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/ProductDetails";

function App() {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <Router>
        <Header />
        <div
          className={`container min-h-screen  transition duration-300 ${theme === "dark" ? "bg-[#121212] text-white" : "bg-white text-gray-900"}`}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/users" element={<Users />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </>
  );
}

export default App;

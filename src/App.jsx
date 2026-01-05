import "./App.css";
import "./styles.css";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { useContext, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ThemeContext } from "./components/ThemeContext";
import Home from "./pages/Home";
import Products from './pages/Products';
import Users from "./pages/Users";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/ProductDetails";
import Animation from "./pages/Animation";

function App() {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration in ms
      easing: "ease-in-out", // easing style
      once: true, // whether animation should happen only once
    });
  }, []);

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
            <Route path="/animation" element={<Animation />} />
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

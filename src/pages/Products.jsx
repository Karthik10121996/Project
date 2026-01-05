import React, { useState, useRef } from "react";
import Loading from "../assets/loading1.gif";
import UseFetch from "../components/UseFetch";
import flyToCart from "../components/Animation_CartIcon";
import useConvertCurrency from "../components/ConvertPrice";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, increaseQty, decreaseQty } from "../redux/CartSlice";
import { IoMdCart } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function products() {
  const { data, loading, error } = UseFetch("https://dummyjson.com/products");
  const [category, setCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(6);
  const rate = useConvertCurrency("USD", "INR");
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);

  const getCartItem = (id) => {
    return cartItems.find((item) => item.id === id);
  };

  const imgRefs = useRef({});

  const cartCount = useSelector(
    (state) =>
      state.cart?.items?.reduce((total, item) => total + item.qty, 0) || 0
  );

  const navigate = useNavigate();

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <img src={Loading} alt="Loading" className="w-20" />
      </div>
    );

  if (error)
    return (
      <p className="text-red-500 text-center mt-10 font-semibold">{error}</p>
    );

  const categories = ["All", ...new Set(data.products?.map((p) => p.category))];

  const filtered = data.products?.filter(
    (p) => category === "All" || p.category === category
  );

  const productCountByCategory = (cat) => {
    // cat === "All"
    // ? data?.products?.length || 0
    // : data?.products?.filter((p) => p.category === cat).length || 0;
    if (cat === "All") return data?.products.length;
    return data?.products.filter((p) => p.category === cat).length;
  };

  function formatINR(amount) {
    return new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    }).format(amount);
  }

  return (
    <>
      <div className="prods_container">
        <h2>Products Lists</h2>
        <div id="cart-icon" className="cartIconFixed">
          {cartCount > 0 ? (
            <div className="cartIcon pointer" onClick={() => navigate("/cart")}>
              <IoMdCart className="cart_icon" />
              <p className="font-bold cart_count">{cartCount}</p>
            </div>
          ) : null}
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-4 py-2 border rounded-lg text-sm 
            ${
              category === cat ? "bg-blue-600 text-white" : "dark:bg-gray-700"
            }`}
              onClick={() => setCategory(cat)}>
              {cat} ({productCountByCategory(cat)})
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-6">
          {filtered.slice(0, visibleCount).map((product) => (
            <div
              key={product.id}
              className="border p-4 rounded-xl shadow-md dark:bg-gray-800 dark:text-white 
                       bg-[#f5f3f4] hover:shadow-2xl transition-transform duration-300 
                       hover:-translate-y-2 cursor-pointer">
              <img
                ref={(el) => (imgRefs.current[product.id] = el)}
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-40 object-cover rounded-md thumb-img"
              />
              <h3 className="font-semibold mt-3 text-lg truncate">
                {product.title}
              </h3>
              <p className="text-gray-500 dark:text-gray-300 text-sm mt-1 line-clamp-2">
                {product.description}
              </p>
              <p className="text-xl font-bold mt-3">
                ${product.price}{" "}
                <span className="text-sm">
                  (₹{rate ? formatINR(product.price * rate) : "..."})
                </span>
              </p>
              <div>
                {(() => {
                  const cartItem = getCartItem(product.id);

                  return cartItem && cartItem.qty > 0 ? (
                    <div className="flex items-center justify-center gap-3 mt-2 transition-all duration-300 ease-out opacity-0 scale-90 animate-qty-in">
                      <button
                        onClick={() => dispatch(decreaseQty(product.id))}
                        className="px-3 py-1 bg-gray-300 rounded">
                        -
                      </button>
                      <span className="font-bold">{cartItem.qty}</span>
                      <button
                        onClick={() => dispatch(increaseQty(product.id))}
                        className="px-3 py-1 bg-gray-300 rounded hover:scale-110 transition">
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                      onClick={() => {
                        console.log("IMG:", imgRefs.current[product.id]);
                        console.log(
                          "CART:",
                          document.getElementById("cart-icon")
                        );
                        flyToCart(imgRefs.current[product.id]);
                        dispatch(addToCart(product));
                      }}>
                      Add to Cart
                    </button>
                  );
                })()}
              </div>
            </div>
          ))}
        </div>
        {visibleCount < filtered.length && (
          <div className="text-center mt-6">
            <button
              className="bg-blue-600 text-white px-6 py-2 rounded-lg"
              onClick={() => setVisibleCount((prev) => prev + 6)}>
              Load More
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default products;

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  increaseQty,
  decreaseQty,
  removeFromCart,
  clearCart,
} from "../redux/CartSlice";
import useHoverTooltip from "../components/UseHoverTooltip";
import emptyCartIcon from "../assets/empty-cart.gif";
import { Link } from "react-router-dom";
import { MdCancel } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import useConvertCurrency from "../components/ConvertPrice";


function Cart() {
  const rate = useConvertCurrency("USD", "INR");
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  const { ref, show, onMouseEnter, onMouseLeave } = useHoverTooltip();

  function formatINR(amount) {
    return new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    }).format(amount);
  }

  if (items.length === 0)
    return (
      <div>
        <h2 className="text-center mt-20 text-xl font-bold">
          Your cart is empty
        </h2>
        <img
          src={emptyCartIcon}
          alt="Empty Cart"
          className="w-100 h-100 rounded object-cover"
        />
        <p>
          <Link className="text-center mt-20 text-xl font-bold" to="/products">
            Add products
          </Link>
        </p>
      </div>
    );

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>

      <AnimatePresence>
        {items.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-between border-b py-4 border p-4 rounded-xl shadow-md mb-5 dark:bg-gray-800 dark:text-white bg-[#f5f3f4]">
            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-20 h-20 rounded object-cover"
            />

            <div className="flex items-center justify-around relative w-[150px]">
              <h3
                ref={ref}
                className="font-semibold truncate pointer"
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}>
                {item.title}
              </h3>

              {/* Tooltip */}
              {show && (
                <h3 className="absolute left-0 top-8 z-20 bg-[#d3d3d3] text-white text-sm px-2 py-1 rounded shadow-lg whitespace-nowrap">
                  {item.title}
                </h3>
              )}
            </div>

            <p className="text-gray-600 mx-10">${item.price}</p>

            <div className="flex items-center gap-3 mt-2">
              <button
                onClick={() => dispatch(decreaseQty(item.id))}
                className="px-3 py-1 bg-gray-300 rounded">
                -
              </button>

              <span className="font-bold">{item.qty}</span>

              <button
                onClick={() => dispatch(increaseQty(item.id))}
                className="px-3 py-1 bg-gray-300 rounded">
                +
              </button>
            </div>

            <MdCancel
              className="pointer remove_icon"
              onClick={() => dispatch(removeFromCart(item.id))}
            />
          </motion.div>
        ))}
      </AnimatePresence>

      <div className="text-right mt-6">
        <motion.h2
          key={total}
          initial={{ opacity: 0.5, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
          className="text-xl font-bold">
          Total: ${total.toFixed(2)}<span className="text-sm">
                  (₹{formatINR(rate * total)})
                </span>
        </motion.h2>
        <button
          onClick={() => dispatch(clearCart())}
          className="mt-4 bg-red-600 text-white px-5 py-2 rounded">
          Clear Cart
        </button>
      </div>
      <p>
        Add more products?{" "}
        <Link className="text-center mt-20 text-xl font-bold" to="/products">
          Go to Products Page
        </Link>
      </p>
    </div>
  );
}

export default Cart;

// function flyToCart(imgEl) {
//   const cart = document.getElementById("cart-icon");
//   if (!imgEl || !cart) return;

//   const imgRect = imgEl.getBoundingClientRect();
//   const cartRect = cart.getBoundingClientRect();

//   const clone = imgEl.cloneNode(true);
//   clone.style.position = "fixed";
//   clone.style.left = imgRect.left + "px";
//   clone.style.top = imgRect.top + "px";
//   clone.style.width = imgRect.width + "px";
//   clone.style.height = imgRect.height + "px";
//   clone.style.transition = "all 0.7s ease-in-out";
//   clone.style.zIndex = 1000;
//   clone.style.borderRadius = "12px";

//   document.body.appendChild(clone);

//   requestAnimationFrame(() => {
//     clone.style.left = cartRect.left + "px";
//     clone.style.top = cartRect.top + "px";
//     clone.style.width = "30px";
//     clone.style.height = "30px";
//     clone.style.opacity = "0";
//   });

//   setTimeout(() => {
//     clone.remove();
//     cart.classList.add("cart-bounce");
//     setTimeout(() => cart.classList.remove("cart-bounce"), 300);
//   }, 700);
// }

// export default flyToCart;


export default function flyToCart(imgEl) {
  const cart = document.getElementById("cart-icon");

  if (!imgEl || !cart) {
    console.warn("flyToCart: missing element", { imgEl, cart });
    return;
  }

  const imgRect = imgEl.getBoundingClientRect();
  const cartRect = cart.getBoundingClientRect();

  const clone = imgEl.cloneNode(true);

  Object.assign(clone.style, {
    position: "fixed",
    left: imgRect.left + "px",
    top: imgRect.top + "px",
    width: imgRect.width + "px",
    height: imgRect.height + "px",
    zIndex: 9999,
    borderRadius: "12px",
    transition: "all 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
    pointerEvents: "none",
  });

  document.body.appendChild(clone);

  // force repaint
  clone.getBoundingClientRect();

  requestAnimationFrame(() => {
    clone.style.left = cartRect.left + cartRect.width / 2 + "px";
    clone.style.top = cartRect.top + cartRect.height / 2 + "px";
    clone.style.width = "24px";
    clone.style.height = "24px";
    clone.style.opacity = "0";
  });

  setTimeout(() => {
    clone.remove();
    cart.classList.add("cart-bounce");
    setTimeout(() => cart.classList.remove("cart-bounce"), 300);
  }, 700);
}

import React from "react";
import reactLogo from "../assets/react.svg";

function Animation() {
  return (
    <>
    <div data-aos="fade-down">
        <img src={reactLogo} className="logo" alt="Vite logo" />
    </div>
      <div data-aos="fade-right">
        <h1>Hello, I will fade up on scroll!</h1>
      </div>

      <div data-aos="fade-right" data-aos-delay="200">
        <p>This paragraph zooms in with a delay</p>
      </div>

      <div data-aos="fade-right">
        <h1>Hello, I will fade up on scroll!</h1>
      </div>

      <div data-aos="fade-right" data-aos-delay="200">
        <p>This paragraph zooms in with a delay</p>
      </div>

      <div data-aos="fade-right">
        <h1>Hello, I will fade up on scroll!</h1>
      </div>

      <div data-aos="fade-right" data-aos-delay="200">
        <p>This paragraph zooms in with a delay</p>
      </div>
    </>
  );
}

export default Animation;

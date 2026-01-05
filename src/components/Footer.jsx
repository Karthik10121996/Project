import React from "react";

function Footer() {
  return (
    <>
      <footer className="footer">
        © {new Date().getFullYear()}. All rights reserved.
      </footer>
    </>
  );
}

export default Footer;

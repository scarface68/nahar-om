import React from "react";

const Footer = () => {
  return (
    <footer className="fixed bottom-0 w-full bg-gray-200 shadow-md p-2">
      <div className="container mx-auto flex justify-center">
        <a href="/" className="text-custom-orange hover:text-black px-4">
          Home
        </a>
        <a href="/" className="text-custom-orange hover:text-black px-4">
          About Us
        </a>
      </div>
    </footer>
  );
};

export default Footer;

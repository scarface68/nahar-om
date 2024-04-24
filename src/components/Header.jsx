import React from "react";

const Header = () => {
  return (
    <header className="bg-custom-orange p-6">
  <div className="container mx-auto flex justify-end items-center">
    <a href="/" className="text-gray-300 hover:text-white px-4">
      Home
    </a>
    <a href="/" className="text-gray-300 hover:text-white px-4">
      About Us
    </a>
    <a href="/login" className="text-gray-300 hover:text-white px-4">
      Login
    </a>
    <a href="/" className="text-gray-300 hover:text-white px-4">
      Register User
    </a>
  </div>
</header>
  );
};

export default Header;

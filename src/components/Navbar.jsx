import React from 'react';
import logo from './assests/Gravitilogo.png'
function Navbar() {
  return (
    <nav className="bg-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <img src={logo} alt="Graviti Logo" />
      </div>
    </nav>
  );
}

export default Navbar;

import React from 'react';
import logo from './assests/Gravitilogo.png'
function Navbar() {
  return (
    <nav className="bg-white sm:block hidden">
      <div className="ms-16 py-2 flex">
        <img src={logo} alt="Graviti Logo" />
      </div>
    </nav>
  );
}

export default Navbar;

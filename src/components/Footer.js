import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-4">
      <div className="container mx-auto flex items-center justify-between px-4">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Medsy. All rights reserved.
        </p>
        <p className="text-sm">Designed with ❤️ by Manvendra</p>
      </div>
    </footer>
  );
};

export default Footer;

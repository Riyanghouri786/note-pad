import React from "react";

const Footer = () => {
  return (
    <footer className="bg-primary py-6 text-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <p className="text-base sm:text-lg md:text-xl">
          © {new Date().getFullYear()} Notepad. All Rights Reserved.
        </p>
        <p className="text-sm sm:text-base mt-2">Created by Riyan Ghouri.</p>
      </div>
    </footer>
  );
};

export default Footer;

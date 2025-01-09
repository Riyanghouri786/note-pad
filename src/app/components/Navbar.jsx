"use client";

import { useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-primary text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="text-2xl font-bold">
          <a href="/">Notepad</a>
        </div>

        {/* Hamburger Menu for Mobile */}
        <button
          className="block md:hidden focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>

        {/* Sidebar for Mobile */}
        <div
          className={`${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          } fixed inset-0 bg-primary bg-opacity-90 backdrop-blur-lg md:hidden transition-transform duration-300 z-20 shadow-xl`}
        >
          {/* Sidebar Links */}
          <div className="flex flex-col pl-20 mt-24 space-y-6">
            <ul>
              <li>
                <a
                  href="/"
                  className="flex items-center space-x-2 px-4 py-2 hover:bg-primary-focus rounded-md text-white transition-all duration-300"
                  onClick={() => setMenuOpen(false)}
                >
                  <svg
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 4h16M4 12h16M4 20h16"
                    />
                  </svg>
                  <span>Home</span>
                </a>
              </li>
              <li>
                <a
                  href="/notes"
                  className="flex items-center space-x-2 px-4 py-2 hover:bg-primary-focus rounded-md text-white transition-all duration-300"
                  onClick={() => setMenuOpen(false)}
                >
                  <svg
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 12l-7 7-7-7"
                    />
                  </svg>
                  <span>My Notes</span>
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="flex items-center space-x-2 px-4 py-2 hover:bg-primary-focus rounded-md text-white transition-all duration-300"
                  onClick={() => setMenuOpen(false)}
                >
                  <svg
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 3v18m9-9H3"
                    />
                  </svg>
                  <span>About</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Close Button */}
          <div className="absolute top-4 right-4">
            <button className="text-white" onClick={() => setMenuOpen(false)}>
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Main Navigation Links (For Desktop) */}
        <div className="hidden md:flex md:items-center md:flex-row md:space-x-6">
          <ul className="flex space-x-6 text-center md:text-left">
            <li>
              <a
                href="/"
                className="block px-4 py-2 hover:bg-primary-focus rounded-md"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/notes"
                className="block px-4 py-2 hover:bg-primary-focus rounded-md"
              >
                My Notes
              </a>
            </li>
            <li>
              <a
                href="/about"
                className="block px-4 py-2 hover:bg-primary-focus rounded-md"
              >
                About
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

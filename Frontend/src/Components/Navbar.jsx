import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { handleSuccess } from "../utils";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const logout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (!confirmLogout) return;

    try {
      const response = await fetch("https://yoga-backend-53u6.onrender.com/logout", {
        method: "GET",
        credentials: "include",
      });
      const result = await response.json();

      if (response.ok) {
        handleSuccess("User Logout");
        localStorage.clear()
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between p-4">
        {/* Brand */}
        <div className="flex items-center space-x-3">
          <img
            src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600"
            className="h-10 w-10 rounded-full"
            alt="Logo"
          />
          <span className="text-2xl font-bold text-gray-800">Yoga Path</span>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-700 hover:text-black"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor">
            <path d="M4 6h16M4 12h16M4 18h16" strokeWidth="2" />
          </svg>
        </button>

        {/* Navigation Menu */}
        <div className={`${menuOpen ? "block" : "hidden"} md:block`}>
          <ul className="flex flex-col md:flex-row md:items-center md:space-x-6 text-gray-700 font-medium">
            <li>
              <Link to="/sessions" className="hover:text-blue-600 py-2 px-3">
                Home
              </Link>
            </li>

            {/* Animated Dropdown */}
            <li
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
              ref={dropdownRef}
            >
              <button
                // onClick={() => setDropdownOpen((prev) => !prev)}
                className="flex items-center space-x-1 py-2 px-3 hover:text-blue-600"
              >
                <span>Dashboard</span>
                <motion.span
                  animate={{ rotate: dropdownOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </motion.span>
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.ul
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full mt-2 left-0 bg-white shadow-lg rounded-md py-2 w-48 z-50"
                  >
                    <li>
                      <Link
                        to="/sessions"
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Sessions
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/mysessions"
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={() => setDropdownOpen(false)}
                      >
                        My Sessions
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/publishsession"
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Create Session
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/draft"
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Draft
                      </Link>
                    </li>
                  </motion.ul>
                )}
              </AnimatePresence>
            </li>

            {/* Auth */}
            <li>
              {localStorage.getItem("isloggedIn") ? (
                <button
                  onClick={logout}
                  className="py-2 px-3 cursor-pointer hover:text-red-500"
                >
                  Sign Out
                </button>
              ) : (
                <Link to="/login" className="py-2 px-3 hover:text-blue-600">
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

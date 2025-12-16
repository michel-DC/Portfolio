"use client";

import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuItems = [
    { label: "Accueil", href: "#" },
    { label: "À propos", href: "#" },
    { label: "Projets", href: "#" },
  ];

  return (
    <header className="fixed top-2 left-0 right-0 z-50 mix-blend-difference text-white">
      <div className="px-8 py-6 flex justify-between items-center w-full">
        <div className="text-4xl font-light ">M</div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8 font-extralight mr-12">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="hover:text-gray-400 transition-colors text-lg "
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden z-50 relative focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>

        {/* Mobile Nav Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed inset-0 bg-black/5 text-white flex flex-col items-center justify-center space-y-8 text-4xl z-40"
            >
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={toggleMenu}
                  className="hover:text-gray-400 transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

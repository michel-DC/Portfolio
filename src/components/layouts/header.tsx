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
    { label: "Mes projets", href: "#" },
  ];

  return (
    <header className="fixed top-2 left-0 right-0 z-50 text-black">
      <div className="px-8 py-6 mr-4 flex justify-between items-center w-full">
        <motion.div
          whileHover={{ x: [0, -2, 2, -2, 2, 0] }}
          transition={{ duration: 0.4 }}
          className="text-4xl font-light "
        >
          <Link href="/">M</Link>
        </motion.div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8 font-extralight mr-12">
          {menuItems.map((item) => (
            <motion.div
              key={item.label}
              whileHover={{ x: [0, -2, 2, -2, 2, 0] }}
              transition={{ duration: 0.4 }}
            >
              <Link
                href={item.href}
                className="hover:text-gray-400 transition-colors text-lg "
              >
                {item.label}
              </Link>
            </motion.div>
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
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={toggleMenu}
                  whileHover={{ x: [0, -4, 4, -4, 4, 0] }}
                  transition={{ duration: 0.4 }}
                  className="hover:text-gray-400 transition-colors"
                >
                  {item.label}
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

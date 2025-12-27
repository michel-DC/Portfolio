"use client";

import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: "Accueil", href: "/" },
    { label: "À propos", href: "/a-propos" },
    { label: "Mes projets", href: "/mes-projets" },
  ];

  return (
    <header className="sticky top-0 left-0 right-0 z-50 h-full text-black transition-all duration-300">
      <div
        className={cn(
          "px-8 mr-4 flex justify-between items-center w-full transition-all duration-300",
          isScrolled ? "py-1 bg-transparent" : "py-2 bg-white"
        )}
      >
        <motion.div
          whileHover={{ x: [0, -2, 2, -2, 2, 0] }}
          transition={{ duration: 0.4 }}
          className="text-4xl font-light mr-4"
        >
          <Link href="/">M</Link>
        </motion.div>

        {/* Desktop Nav - Hidden when scrolled */}
        {!isScrolled && (
          <nav className="hidden md:flex items-center space-x-8 font-extralight">
            {menuItems.map((item) => (
              <motion.div
                key={item.label}
                whileHover={{ x: [0, -2, 2, -2, 2, 0] }}
                transition={{ duration: 0.4 }}
              >
                <Link
                  href={item.href}
                  className="hover:text-[#008366] transition-colors text-lg "
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
            <Button asChild className="">
              <Link href="/#contact">Me contacter</Link>
            </Button>
          </nav>
        )}

        {/* Mobile/Burger Menu Button - Visible on mobile OR when scrolled */}
        <button
          className={cn(
            "z-50 relative focus:outline-none",
            !isScrolled && "md:hidden"
          )}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={32} className="text-white" /> : <Menu size={32} />}
        </button>

        {/* Mobile Nav Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 bottom-0 w-1/2 bg-black text-white flex flex-col items-center justify-center space-y-8 text-4xl z-40 shadow-2xl"
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
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  href="#contact"
                  onClick={toggleMenu}
                  className="text-2xl mt-4 px-8 py-3 border border-white rounded-full hover:bg-white hover:text-black transition-colors"
                >
                  Me contacter
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

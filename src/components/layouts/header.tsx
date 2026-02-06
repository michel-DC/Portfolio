"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight, Search } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

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
    <header className="fixed top-0 left-0 right-0 z-50 text-black transition-all duration-300">
      <div
        className={cn(
          "px-8 flex items-center w-full transition-all duration-300",
          isScrolled
            ? "py-4 bg-transparent justify-end"
            : "py-8 bg-transparent justify-between"
        )}
      >
        {!isScrolled && (
          <motion.div
            whileHover={{ x: [0, -2, 2, -2, 2, 0] }}
            transition={{ duration: 0.4 }}
            className="text-4xl font-light"
          >
            <Link href="/">
              <Image
                src="/images/svg/logo-noir.svg"
                alt="Teamify"
                width={35}
                height={35}
              />
            </Link>
          </motion.div>
        )}

        {/* Desktop Nav - Hidden when scrolled */}
        {!isScrolled && (
          <nav className="hidden md:flex items-center space-x-8 font-medium">
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

            <Link href="/#contact" className="flex items-center group">
              <motion.div
                whileHover={{ x: [0, -3, 3, -3, 0] }}
                transition={{ duration: 0.4 }}
                className="relative overflow-hidden bg-black text-white px-5 py-2 rounded-full font-bold text-sm"
              >
                <span className="absolute inset-0 bg-white translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-in-out" />
                <span className="relative z-10 transition-colors duration-500 group-hover:text-[#008366]">
                  Contact
                </span>
              </motion.div>
              <motion.div
                whileHover={{ x: [0, -3, 3, -3, 0] }}
                transition={{ duration: 0.4 }}
                className="relative overflow-hidden bg-black text-white p-2 rounded-full flex items-center justify-center"
              >
                <span className="absolute inset-0 bg-white translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-in-out" />
                <span className="relative z-10 transition-colors duration-500 group-hover:text-[#008366]">
                  <ArrowUpRight size={16} />
                </span>
              </motion.div>
            </Link>
          </nav>
        )}

        {/* Mobile/Burger Menu Button - Visible on mobile OR when scrolled */}
        <div className="flex items-center gap-2">
          <button
            onClick={() =>
              document.dispatchEvent(new CustomEvent("toggle-command-menu"))
            }
            className={cn(
              "z-50 relative focus:outline-none cursor-pointer flex items-center justify-center w-12 h-12 rounded-full transition-colors duration-300",
              isOpen ? "bg-white text-black" : "bg-black text-white"
            )}
            aria-label="Rechercher"
          >
            <Search size={24} />
          </button>

          <button
            className={cn(
              "z-50 relative focus:outline-none cursor-pointer",
              "flex items-center justify-center",
              "w-12 h-12 rounded-full transition-colors duration-300",
              isOpen ? "bg-white" : "bg-black",
              !isScrolled && "md:hidden"
            )}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X size={24} className="text-black" />
            ) : (
              <Menu size={24} className="text-white" />
            )}
          </button>
        </div>

        {/* Mobile Nav Overlay */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop - Transparent overlay to allow closing on click outside */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={toggleMenu}
                className="fixed inset-0 z-30"
              />
              
              <motion.div
                initial={{ opacity: 0, x: "100%" }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: "100%" }}
                transition={{ type: "tween", duration: 0.4, ease: "circOut" }}
                className="fixed top-0 right-0 bottom-0 w-full md:w-1/2 bg-black text-white flex flex-col items-center justify-center space-y-12 text-5xl z-40 shadow-2xl"
              >
                <div className="absolute top-10">
                  <Image
                    src="/images/svg/logo-blanc.svg"
                    alt="Logo"
                    width={60}
                    height={60}
                  />
                </div>
                {menuItems.map((item) => (
                  <motion.div
                    key={item.label}
                    whileHover={{ x: [0, -4, 4, -4, 4, 0] }}
                    transition={{ duration: 0.4 }}
                  >
                    <Link
                      href={item.href}
                      onClick={toggleMenu}
                      className="hover:text-gray-400 transition-colors text-3xl md:text-5xl"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
                <Link
                  href="/#contact"
                  onClick={toggleMenu}
                  className="flex items-center mt-8 group"
                >
                  <motion.div
                    whileHover={{ x: [0, -3, 3, -3, 0] }}
                    transition={{ duration: 0.4 }}
                    className="relative overflow-hidden bg-white text-black px-8 py-3 md:px-10 md:py-4 rounded-full text-xl md:text-2xl border border-white"
                  >
                    <span className="absolute inset-0 bg-black translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-in-out" />
                    <span className="relative z-10 transition-colors duration-500 group-hover:text-white">
                      Contact
                    </span>
                  </motion.div>
                  <motion.div
                    whileHover={{ x: [0, -3, 3, -3, 0] }}
                    transition={{ duration: 0.4 }}
                    className="relative overflow-hidden bg-white text-black p-3 md:p-4 rounded-full flex items-center justify-center border border-white"
                  >
                    <span className="absolute inset-0 bg-black translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-in-out" />
                    <span className="relative z-10 transition-colors duration-500 group-hover:text-white">
                      <ArrowUpRight size={24} />
                    </span>
                  </motion.div>
                </Link>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </header>

  );
}

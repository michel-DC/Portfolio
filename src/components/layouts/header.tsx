import React from "react";

export default function header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-10">
      <div className="px-8 py-6 flex justify-between items-center w-full">
        <div className="text-4xl font-bold">M</div>
        <nav className="flex items-center space-x-8 font-bricolage-grotesque">
          <a href="#" className="hover:text-gray-400">
            Accueil
          </a>
          <a href="#" className="hover:text-gray-400">
            À propos
          </a>
          <a href="#" className="hover:text-gray-400">
            Projets
          </a>
        </nav>
      </div>
    </header>
  );
}

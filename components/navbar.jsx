"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest(".nav-menu") && !event.target.closest(".menu-toggle")) {
                closeMenu();
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    return (
        <nav className="bg-purple-500 bg-opacity-90 shadow-md p-4 flex items-center justify-start relative z-50">
            {/* Logo - À gauche */}
            <div className="text-white text-xl font-bold mr-6">
                <Link href="/">
                    <span>YOULIVEVENT</span>
                </Link>
            </div>

            {/* Menu Toggle (Burger) - Visible uniquement en mobile */}
            <button
                className="menu-toggle md:hidden flex flex-col space-y-1.5 p-2 z-50"
                onClick={toggleMenu}
            >
                <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
                <span className={`block w-6 h-0.5 bg-white transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`}></span>
                <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
            </button>

            {/* Menu Links - Affiché en mobile si menuOpen est `true`, toujours visible en desktop */}
            <ul className={`nav-menu absolute top-full left-0 w-full bg-purple-700 shadow-lg transform transition-all duration-300 ease-in-out ${
                menuOpen ? "opacity-100 translate-y-0 flex flex-col" : "opacity-0 -translate-y-5 hidden"
            } md:relative md:flex md:opacity-100 md:translate-y-0 md:bg-transparent md:w-auto md:flex-row md:space-x-6`}>
                {[
                    { name: "Accueil", path: "/" },
                    { name: "Evénements", path: "/events" },
                    { name: "Gallerie", path: "/gallery" },
                    { name: "Prestations", path: "/services" },
                    { name: "Contact", path: "/contact" },
                ].map((item, index) => (
                    <li key={index} className="nav-item">
                        <Link
                            href={item.path}
                            className="block px-6 py-3 text-white transition-all duration-300 hover:bg-blue-900 opacity-90 hover:text-pink-300"
                            onClick={closeMenu}
                        >
                            {item.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

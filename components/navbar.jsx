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
            setTimeout(() => {
                if (!event.target.closest(".nav-menu") && !event.target.closest(".menu-toggle")) {
                    closeMenu();
                }
            }, 200); // Ajoute un delai de 200ms pour éviter les conflits avec le toggleMenu
        };

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    return (
        <nav className="bg-purple-500 shadow-md p-4 relative flex justify-between items-center">
            {/* Logo */}
            <div className="text-white text-xl font-bold">MonLogo
                <Link href="/">
                    <span>YOULIVEVENT</span>
                </Link>
            </div>

            {/* Menu Toggle (Burger) */}
            <button
                className="menu-toggle flex flex-col space-y-1.5 p-2 z-50 md:hidden"
                onClick={toggleMenu}
            >
                <span
                    className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${menuOpen ? "transform translate-y-2 rotate-45" : ""
                        }`}
                ></span>
                <span className={`block w-6 h-0.5 bg-white transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`}></span>
                <span
                    className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${menuOpen ? "transform -translate-y-2 -rotate-45" : ""
                        }`}
                ></span>
            </button>

            {/* Menu Links */}
            <ul
                className={`nav-menu absolute top-full left-0 w-full bg-purple-700 transition-all duration-300 ease-in-out transform ${menuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"
                    } hidden md:flex md:opacity-100 md:translate-y-0 md:bg-transparent`}
            >
                {[
                    { name: "Accueil", path: "/" },
                    { name: "Evénements", path: "/events" },
                    { name: "Gallerie", path: "/gallery" },
                    { name: "Prestations", path: "/services" },
                    { name: "Contact", path: "/contact" },
                ].map((item, index) => (
                    <li
                        key={index}
                        className={`nav-item opacity-0 animate-fade-in md:opacity-100`}
                        style={{ animationDelay: `${index * 0.1}s` }}
                    >
                        <Link
                            href={item.path}
                            className="block px-6 py-3 text-white transition-all duration-300 hover:bg-purple-500 hover:text-gray-300 md:px-4"
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

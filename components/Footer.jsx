import React from 'react';
import { FaInstagram, FaTwitter, FaSnapchatGhost, FaDiscord } from 'react-icons/fa';

export const Footer = () => {
    return (
        <footer className="bg-black text-white text-center py-34 mt-5 flex flex-col items-center">
            <p className="mb-6">© 2024 YOULIVE. Tous droits réservés.</p>

            {/* Réseaux sociaux */}
            <div className="w-full bg-black-900 p-6 text-center">
                <div className="flex justify-center gap-6 mb-10">
                    <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer">
                        <FaInstagram size={30} className="hover:text-purple-500 transition" />
                    </a>
                    <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
                        <FaTwitter size={30} className="hover:text-blue-500 transition" />
                    </a>
                    <a href="https://snapchat.com/" target="_blank" rel="noopener noreferrer">
                        <FaSnapchatGhost size={30} className="hover:text-yellow-500 transition" />
                    </a>
                    <a href="https://discord.com/" target="_blank" rel="noopener noreferrer">
                        <FaDiscord size={30} className="hover:text-indigo-500 transition" />
                    </a>
                </div>

                {/* Liens Légaux */}
                <div className="flex justify-center space-x-6 mt-4">
                    <a href="/privacy-policy" className="hover:text-gray-400 transition">
                        Politique de confidentialité
                    </a>
                    <a href="/terms-of-service" className="hover:text-gray-400 transition">
                        Conditions d'utilisation
                    </a>
                </div>
            </div>
        </footer>
    );
};

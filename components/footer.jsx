import React from 'react';

export const Footer = () => {
    return (
        <footer className="bg-black text-white text-center py-7 mt-15 flex flex-col items-center">
            <p className="mb-6">© 2024 YOULIVE. Tous droits réservés.</p>

            {/* Icônes Réseaux Sociaux */}
            <div className="flex justify-center space-x-6 mt-4">
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition">
                    <i className="fab fa-facebook-f text-xl"></i>
                </a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition">
                    <i className="fab fa-instagram text-xl"></i>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition">
                    <i className="fab fa-twitter text-xl"></i>
                </a>
                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition">
                    <i className="fab fa-linkedin-in text-xl"></i>
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
        </footer>
    );
};

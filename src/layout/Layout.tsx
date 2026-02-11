import React, { useState } from 'react';
import { FaPlayCircle, FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useLayout } from '../context/LayoutContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { showSearch } = useLayout();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedSearch = searchTerm.trim();
    if (trimmedSearch) {
      navigate(`/search?search=${trimmedSearch}`);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-red-500/30">
      <header className="fixed top-0 left-0 w-full z-50 border-b border-white/5 bg-zinc-950/80 backdrop-blur-md transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link 
              to="/" 
              className="flex items-center gap-3 group focus:outline-none"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-red-500 blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-300 rounded-full"></div>
                <FaPlayCircle className="relative text-red-500 group-hover:text-red-400 transition-colors duration-300" size={28} />
              </div>
              <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent group-hover:to-white transition-all duration-300">
                Videy Lokal
              </h1>
            </Link>

            {showSearch && (
              <div className="flex-1 max-w-md ml-4 lg:ml-8">
                <form onSubmit={handleSearch} className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaSearch className="text-zinc-500 group-focus-within:text-red-500 transition-colors duration-300" size={14} />
                  </div>
                  <input
                    type="text"
                    placeholder="Search videos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block w-full bg-zinc-900/50 border border-zinc-800 text-sm text-white rounded-full py-2.5 pl-10 pr-4 placeholder-zinc-500 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 focus:bg-zinc-900 transition-all duration-300"
                  />
                </form>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 animate-fade-in">
        {children}
      </main>

      <footer className="border-t border-white/5 bg-zinc-950 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-zinc-500">
            &copy; {new Date().getFullYear()} <span className="text-zinc-300 font-medium">Lulu Stream</span>. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
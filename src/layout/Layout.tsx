import React from 'react';
import { FaPlayCircle, FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useLayout } from '../context/LayoutContext';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchTerm, setSearchTerm] = React.useState('');
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
    <div className="flex flex-col min-h-screen bg-neutral-950">
      <header className="bg-red-900 fixed top-0 left-0 w-full p-4 text-white flex items-center justify-between shadow-lg shadow-red-900/20 z-50">
        <Link to="/" className="flex items-center flex-shrink-0 hover:opacity-80 transition-opacity">
          <FaPlayCircle className="mr-3 text-white" size={24} />
          <h1 className="text-xl font-bold tracking-wide">Videy Lokal</h1>
        </Link>
        
        {showSearch && (
          <div className="w-full max-w-sm ml-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search other videos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-red-950 text-white rounded-full py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-red-400 placeholder-red-200/50 border border-red-800"
              />
              <button type="submit" className="absolute right-0 top-0 mt-2 mr-3 text-red-200 hover:text-white transition-colors">
                <FaSearch />
              </button>
            </form>
          </div>
        )}
      </header>

      <main className="flex-1 text-white pt-20">
        {children}
      </main>

      <footer className="bg-red-900 p-4 text-white text-center border-t border-red-800">
        <p className="text-sm opacity-90">© {new Date().getFullYear()} Lulu Stream. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
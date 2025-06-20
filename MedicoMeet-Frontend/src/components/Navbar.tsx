import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const { user, isAuthenticated, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Handle scroll event to change navbar style
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate('/');
    setIsProfileDropdownOpen(false);
  };

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2"
          >
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <span className={`text-xl font-bold ${isScrolled ? 'text-blue-600' : 'text-blue-500'}`}>
              MedicoMeet
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`font-medium ${
                location.pathname === '/' 
                  ? 'text-blue-500' 
                  : (isScrolled ? 'text-gray-800 hover:text-blue-500' : 'text-gray-800 hover:text-blue-500')
              } transition-colors duration-200`}
            >
              Home
            </Link>
            <Link 
              to="/doctors" 
              className={`font-medium ${
                location.pathname.includes('/doctors') 
                  ? 'text-blue-500' 
                  : (isScrolled ? 'text-gray-800 hover:text-blue-500' : 'text-gray-800 hover:text-blue-500')
              } transition-colors duration-200`}
            >
              Doctors
            </Link>
            <Link 
              to="/about" 
              className={`font-medium ${
                location.pathname === '/about' 
                  ? 'text-blue-500' 
                  : (isScrolled ? 'text-gray-800 hover:text-blue-500' : 'text-gray-800 hover:text-blue-500')
              } transition-colors duration-200`}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className={`font-medium ${
                location.pathname === '/contact' 
                  ? 'text-blue-500' 
                  : (isScrolled ? 'text-gray-800 hover:text-blue-500' : 'text-gray-800 hover:text-blue-500')
              } transition-colors duration-200`}
            >
              Contact
            </Link>
          </nav>

          {/* User Authentication */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <User size={18} className="text-blue-500" />
                  </div>
                  <span className="font-medium text-gray-800">{user?.name}</span>
                  <ChevronDown size={16} className="text-gray-500" />
                </button>
                
                {/* Dropdown menu */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    {isAdmin && (
                      <Link
                        to="/admin"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    <Link
                      to="/appointments"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileDropdownOpen(false)}
                    >
                      My Appointments
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                    >
                      <LogOut size={16} className="mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="btn-secondary text-sm"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn-primary text-sm"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X size={24} className="text-gray-800" />
            ) : (
              <Menu size={24} className="text-gray-800" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg py-4 px-4 absolute w-full">
          <nav className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className={`font-medium ${location.pathname === '/' ? 'text-blue-500' : 'text-gray-800'}`}
            >
              Home
            </Link>
            <Link 
              to="/doctors" 
              className={`font-medium ${location.pathname.includes('/doctors') ? 'text-blue-500' : 'text-gray-800'}`}
            >
              Doctors
            </Link>
            <Link 
              to="/about" 
              className={`font-medium ${location.pathname === '/about' ? 'text-blue-500' : 'text-gray-800'}`}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className={`font-medium ${location.pathname === '/contact' ? 'text-blue-500' : 'text-gray-800'}`}
            >
              Contact
            </Link>
            
            {isAuthenticated ? (
              <>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="font-medium text-gray-800"
                  >
                    Admin Dashboard
                  </Link>
                )}
                <Link
                  to="/appointments"
                  className="font-medium text-gray-800"
                >
                  My Appointments
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center font-medium text-red-600"
                >
                  <LogOut size={16} className="mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <div className="flex flex-col space-y-2 pt-2">
                <Link
                  to="/login"
                  className="btn-secondary text-center text-sm"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn-primary text-center text-sm"
                >
                  Register
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
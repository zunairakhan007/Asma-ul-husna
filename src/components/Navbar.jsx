import { Link, useLocation } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";

const Navbar = () => {
  const { pathname } = useLocation();

  const linkClasses = (path) =>
    `relative px-3 py-1 transition duration-200 ease-in-out
     rounded focus:outline-none focus:ring-0
     text-base sm:text-lg font-bold
     hover:text-yellow-200 hover:bg-green-800
     ${pathname === path ? "text-yellow-200" : "text-white"}`;

  return (
    <nav className="bg-green-700 text-white px-4 py-3 sm:px-8 shadow-md flex items-center justify-between">
      {/* Left: Logo */}
      <div className="flex items-center">
        <img
          src="/logo.png"
          width={90}
          height={90}
          alt="Logo"
          className="mr-2 rounded-full"
        />
        
      </div>

      {/* Center: Navigation Links */}
      <div className="flex gap-4 sm:gap-6">
        <Link to="/" className={linkClasses("/")}>Home</Link>
        <Link to="/quiz" className={linkClasses("/quiz")}>Quiz</Link>
        <Link to="/aboutus" className={linkClasses("/aboutus")}>About Us</Link>
        <Link to="/contactus" className={linkClasses("/contactus")}>Contact</Link>
      </div>

      {/* Right: Dark Mode Toggle */}
      <div className="scale-90 sm:scale-100">
        <DarkModeToggle />
      </div>
    </nav>
  );
};

export default Navbar;

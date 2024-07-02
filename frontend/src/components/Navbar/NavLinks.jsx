import { Link } from "react-router-dom";
const NavLinks = () => {
  return (
    <div className="flex *:px-4 *:py-4 gap-[0.625rem] *:font-medium *:tracking-[-.00875rem] *:text-sm">
      <Link to="/" className="nav-link">
        Home
      </Link>
      <Link to="#" className="nav-link">
        Why Learn
      </Link>
      <Link to="/about" className="nav-link">
        About
      </Link>
      <Link to="/contact" className="nav-link">
        Contact
      </Link>
      <Link to="#" className="nav-link">
        Resources
      </Link>
      <Link to="#" className="nav-link">
        Store
      </Link>
    </div>
  );
};

export default NavLinks;

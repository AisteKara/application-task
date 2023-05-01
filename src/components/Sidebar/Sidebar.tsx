import { Link } from "react-router-dom";
import { locale } from "../../locale";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <nav className="sidebar">
      <div className="menuList">
        <Link to="/about" className="menuItem">
          {locale.ABOUT}
        </Link>
      </div>
      <Link to="/" className="menuItem">
        {locale.FILMS}
      </Link>
    </nav>
  );
};

export default Sidebar;

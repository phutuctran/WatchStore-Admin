import "./sidebar.scss";
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import LocalActivityOutlinedIcon from "@mui/icons-material/LocalActivityOutlined";
import { Link, useNavigate } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

const Sidebar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  const { dispatch } = useContext(DarkModeContext);
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">App watch</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <p className="title">LISTS</p>
          <Link to="/orders" style={{ textDecoration: "none" }}>
            <li>
              <PaymentsOutlinedIcon className="icon" />
              <span>Orders</span>
            </li>
          </Link>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>
          <Link to="/shops" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Shops</span>
            </li>
          </Link>
          <Link to="/categories" style={{ textDecoration: "none" }}>
            <li>
              <CreditCardIcon className="icon" />
              <span>Categories</span>
            </li>
          </Link>
          <Link to="/products" style={{ textDecoration: "none" }}>
            <li>
              <LocalShippingIcon className="icon" />
              <span>Products</span>
            </li>
          </Link>
          <Link to="/promotions" style={{ textDecoration: "none" }}>
            <li>
              <AttachMoneyIcon className="icon" />
              <span>Promotions</span>
            </li>
          </Link>
          <Link to="/banners" style={{ textDecoration: "none" }}>
            <li>
              <LocalActivityOutlinedIcon className="icon" />
              <span>Banner</span>
            </li>
          </Link>
          <li onClick={handleLogout}>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

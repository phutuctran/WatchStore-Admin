import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { useEffect, useState } from "react";
import { listUser } from "../../lib/api/user";
import { listShop } from "../../lib/api/shop";
import { listCategory } from "../../lib/api/category";
import { listProduct } from "../../lib/api/product";

const Home = () => {
  const [amount, setAmount] = useState({
    categories: 0,
    shops: 0,
    users: 0,
    products: 0,
  });
  useEffect(() => {
    const getInfo = async () => {
      const users = await listUser();
      const shops = await listShop();
      const categories = await listCategory();
      const products = await listProduct();
      setAmount({
        users: users?.data?.data?.length,
        shops: shops?.data?.data?.length,
        categories: categories?.data?.data?.length,
        products: products?.data?.data?.length,
      });
    };
    getInfo();
  }, []);

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget
            title={"USERS"}
            amount={amount?.users}
            icon={
              <PersonOutlinedIcon
                className="icon"
                style={{
                  color: "crimson",
                  backgroundColor: "rgba(255, 0, 0, 0.2)",
                }}
              />
            }
          />
          <Widget
            title={"SHOPS"}
            amount={amount?.shops}
            icon={
              <ShoppingCartOutlinedIcon
                className="icon"
                style={{
                  backgroundColor: "rgba(218, 165, 32, 0.2)",
                  color: "goldenrod",
                }}
              />
            }
          />
        </div>
        <div className="widgets">
          <Widget
            title={"CATEGORIES"}
            amount={amount?.categories}
            icon={
              <MonetizationOnOutlinedIcon
                className="icon"
                style={{
                  backgroundColor: "rgba(0, 128, 0, 0.2)",
                  color: "green",
                }}
              />
            }
          />
          <Widget
            title={"PRODUCTS"}
            amount={amount?.products}
            icon={
              <AccountBalanceWalletOutlinedIcon
                className="icon"
                style={{
                  backgroundColor: "rgba(128, 0, 128, 0.2)",
                  color: "purple",
                }}
              />
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Home;

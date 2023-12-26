import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./style/dark.scss";
import { useContext, useEffect } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import Users from "./pages/users/Users";
import NewUser from "./pages/new-user/NewUser";
import UpdateUser from "./pages/update-user/UpdateUser";
import Products from "./pages/products/Products";
import NewProduct from "./pages/new-product/NewProduct";
import UpdateProduct from "./pages/update-product/UpdateProduct";
import Categories from "./pages/categories/Categories";
import NewCategory from "./pages/new-category/NewCategory";
import UpdateCategory from "./pages/update-category/UpdateCategory";
import Shops from "./pages/shops/Shops";
import NewShop from "./pages/new-shop/NewShop";
import UpdateShop from "./pages/update-shop/UpdateShop";
import Map from "./pages/map/Map";
import Promotions from "./pages/promotions/Promotions";
import NewPromotion from "./pages/new-promotion/NewPromotion";
import UpdatePromotion from "./pages/update-promotion/UpdateProduct";
import Banners from "./pages/banners/Banners";
import NewBanner from "./pages/new-banner/NewBanner";
import UpdateBanner from "./pages/update-banner/UpdateBanner";

function App() {
  const { darkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    if (!currentUser) {
      navigate("/login");
    }
  }, []);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="users">
            <Route index element={<Users />} />
            <Route path=":info" element={<UpdateUser />} />
            <Route path="new" element={<NewUser />} />
          </Route>
          <Route path="shops">
            <Route index element={<Shops />} />
            <Route path=":id" element={<UpdateShop />} />
            <Route path="new" element={<NewShop />} />
          </Route>
          <Route path="categories">
            <Route index element={<Categories />} />
            <Route path=":id" element={<UpdateCategory />} />
            <Route path="new" element={<NewCategory />} />
          </Route>
          <Route path="products">
            <Route index element={<Products />} />
            <Route path=":id" element={<UpdateProduct />} />
            <Route path="new" element={<NewProduct />} />
          </Route>
          <Route path="promotions">
            <Route index element={<Promotions />} />
            <Route path=":id" element={<UpdatePromotion />} />
            <Route path="new" element={<NewPromotion />} />
          </Route>
          <Route path="banners">
            <Route index element={<Banners />} />
            <Route path=":id" element={<UpdateBanner />} />
            <Route path="new" element={<NewBanner />} />
          </Route>
          <Route path="maps">
            <Route index element={<Map />} />
          </Route>
          {/* <Route path="products">
            <Route index element={<Users />} />
            <Route path=":productId" element={<Single />} />
            <Route
              path="new"
              element={<New inputs={productInputs} title="Add New Product" />}
            />
          </Route> */}
        </Route>
      </Routes>
    </div>
  );
}

export default App;

import "./shops.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Datatable from "../../components/datatable/Datatable";
import { useEffect, useState } from "react";
import { listShop } from "../../lib/api";
import { Link } from "react-router-dom";

const Shops = () => {
  const [currentShopList, setCurrentList] = useState(null);

  const shopColumns = [
    {
      field: "name",
      headerName: "Name",
      width: 230,
    },
    {
      field: "address",
      headerName: "Address",
      width: 230,
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 230,
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: params => {
        return (
          <div className="cellAction">
            <Link
              to={`/shops/${params.row.id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">Chỉnh sửa</div>
            </Link>
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    const getListShops = async () => {
      const shopList = await listShop();
      const data = shopList?.data?.data;
      setCurrentList(data);
    };
    getListShops();
  }, []);
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <Datatable
          listData={currentShopList}
          columns={shopColumns}
          title={"Thêm mới shops"}
          urlAdd={"/shops/new"}
        />
      </div>
    </div>
  );
};

export default Shops;

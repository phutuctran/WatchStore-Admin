import "./orders.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Datatable from "../../components/datatable/Datatable";
import { useEffect, useState } from "react";
import { listOrder } from "../../lib/api";
import { Link } from "react-router-dom";
import DialogDelete from "../../components/dialog/DialogDelete";
import { toast } from "react-toastify";

const Orders = () => {
  const [currentOrderList, setCurrentOrderList] = useState(null);
  const orderColumns = [
    {
      field: "id",
      headerName: "id",
      width: 10,
    },
    {
      field: "createdAt",
      headerName: "Ngày tạo",
      width: 150,
    },
    {
      field: "address",
      headerName: "Địa chỉ giao tới",
      width: 150,
    },
    {
      field: "shopname",
      headerName: "Chi nhánh",
      width: 150,
    },
    {
      field: "price",
      headerName: "Tổng tiền",
      width: 150,
    },
    {
      field: "states",
      headerName: "Trạng thái",
      width: 150,
    },
    {
      field: "user",
      headerName: "Người đặt",
      width: 150,
      renderCell: (params) => {
        const userName = params.row.user?.name;
    
        return (
          <div className="cellAction">
            {userName}
          </div>
        );
      },
    },
    {
      field: "shipper",
      headerName: "Người giao",
      width: 150,
      renderCell: (params) => {
        const shipperId = params.row.shipper?.name;
    
        return (
          <div className="cellAction">
            {shipperId}
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 180,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={`/orders/${params.row.id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">Chi tiết</div>
            </Link>
          </div>
        );
      },
    },
    
  ];

  useEffect(() => {
    const getlistOrder = async () => {
      const orderList = await listOrder();
      const data = orderList?.data?.data;
      setCurrentOrderList(data);
    };
    getlistOrder();
  }, []);

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <Datatable
          listData={currentOrderList}
          columns={orderColumns}
          title={"Đơn hàng"}
        />
      </div>
    </div>
  );
};

export default Orders;

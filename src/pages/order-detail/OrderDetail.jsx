import "./order-detail.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { getDetailOrder } from "../../lib/api";
import { Box } from "@mui/material";
import Datatable from "../../components/datatable/Datatable";
import { Link } from "react-router-dom";

const OrderDetail = () => {
  const productColumns = [
    {
      field: "name",
      headerName: "Name",
      width: 230,
      renderCell: params => {
        return (
          <div className="cellWithImg">
            <img
              className="cellImg"
              src={
                params.row?.product.imageUrl ||
                "https://en.lovebox.love/cdn/shop/products/LB-Lovers-first-1200x1200.png?v=1668249295"
              }
              alt="avatar"
            />
            {params.row.name}
          </div>
        );
      },
    },
    {
      field: "price",
      headerName: "Price",
      width: 230,
    },

    {
      field: "quantity",
      headerName: "Quantity",
      width: 160,
    },
  ];
  const navigate = useNavigate();
  const { id } = useParams();
  const [currentListProduct, setCurrentListProduct] = useState(null);


  useEffect(() => {
    const getCurrentOrderDetail = async () => {
      const order = await getDetailOrder(id);
      setCurrentListProduct(order?.data?.data?.orderItems);
    };
    getCurrentOrderDetail();
  }, [id]);

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{"Chi tiết sản phẩm trong đơn hàng"}</h1>
        </div>
        <div className="bottom">
          <Box width={"100%"}>
            <Box mt={4}>
              <Datatable
                listData={currentListProduct}
                columns={productColumns}
              />
            </Box>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;

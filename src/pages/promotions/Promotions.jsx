import "./promotions.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Datatable from "../../components/datatable/Datatable";
import { useEffect, useState } from "react";
import { deletePromotion, listPromotion } from "../../lib/api";
import { Link } from "react-router-dom";
import DialogDelete from "../../components/dialog/DialogDelete";
import { toast } from "react-toastify";

const Promotions = () => {
  const [currentListPromotion, setCurrentListPromotion] = useState([]);

  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [idDelete, setIdDelete] = useState(null);
  const handleOpenDialogDelete = (id) => {
    setIdDelete(id);
    setIsOpenDelete(true);
  };
  const handleClose = () => {
    setIdDelete(null);
    setIsOpenDelete(false);
  };
  const handleConfirmDelete = async () => {
    try {
      await deletePromotion(idDelete);
      setCurrentListPromotion(
        currentListPromotion?.filter((e) => e.id !== idDelete)
      );
      toast.success("Xoá thành công");
      handleClose();
    } catch (error) {
      toast.error("Xóa thất bại");
    }
  };
  const promotionColumns = [
    {
      field: "name",
      headerName: "Name",
      width: 230,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img
              className="cellImg"
              src={
                params.row?.imageUrl ||
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
      field: "status",
      headerName: "Status",
      width: 230,
    },
    {
      field: "value",
      headerName: "Value",
      width: 230,
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={`/promotions/${params.row.id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">Chỉnh sửa</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleOpenDialogDelete(params.row.id)}
            >
              Xóa
            </div>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    const getListPromotion = async () => {
      const promotionList = await listPromotion();
      const data = promotionList?.data?.data;
      setCurrentListPromotion(data);
    };

    getListPromotion();
  }, []);

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <Datatable
          listData={currentListPromotion}
          columns={promotionColumns}
          title={"Thêm mới promotions"}
          urlAdd={"/promotions/new"}
        />
      </div>
      <DialogDelete
        open={isOpenDelete}
        handleClose={handleClose}
        handleOk={handleConfirmDelete}
      />
    </div>
  );
};

export default Promotions;

import "./banners.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Datatable from "../../components/datatable/Datatable";
import { useEffect, useState } from "react";
import { deleteCategory } from "../../lib/api";
import { Link } from "react-router-dom";
import DialogDelete from "../../components/dialog/DialogDelete";
import { toast } from "react-toastify";
import { deleteBanner, listBanner } from "../../lib/api/banner";

const Banners = () => {
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [currentBannerList, setCurrentBannerList] = useState(null);
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
      await deleteBanner(idDelete);
      setCurrentBannerList(currentBannerList?.filter((e) => e.id !== idDelete));
      handleClose();
      toast.success("Xoá thành công");
    } catch (error) {
      toast.error("Xóa thất bại");
    }
  };
  const bannerColumns = [
    {
      field: "avatarUrl",
      headerName: "Image",
      width: 230,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img
              src={
                params.row?.avatarUrl ||
                "https://valq.com/wp-content/uploads/8-step-process-for-category-planning-a-1536x864.png"
              }
              alt="avatar"
              style={{
                width: 180,
                height: 150,
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
          </div>
        );
      },
    },
    {
      field: "name",
      headerName: "Name",
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
              to={`/banners/${params.row.id}`}
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
    const getListBanner = async () => {
      const categoryList = await listBanner();
      const data = categoryList?.data?.data;
      setCurrentBannerList(data);
    };
    getListBanner();
  }, []);

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <Datatable
          listData={currentBannerList}
          columns={bannerColumns}
          title={"Thêm mới banner"}
          urlAdd={"/banners/new"}
          rowHeight={200}
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

export default Banners;

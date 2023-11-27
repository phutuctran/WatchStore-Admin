import "./categories.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Datatable from "../../components/datatable/Datatable";
import { useEffect, useState } from "react";
import { deleteCategory, listCategory } from "../../lib/api";
import { Link } from "react-router-dom";
import DialogDelete from "../../components/dialog/DialogDelete";
import { toast } from "react-toastify";

const Category = () => {
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [currentCategoryList, setCurrentList] = useState(null);
  const [idDelete, setIdDelete] = useState(null);
  const handleOpenDialogDelete = id => {
    setIdDelete(id);
    setIsOpenDelete(true);
  };
  const handleClose = () => {
    setIdDelete(null);
    setIsOpenDelete(false);
  };
  const handleConfirmDelete = async () => {
    try {
      toast.success("Xoá thành công");
      await deleteCategory(idDelete);
      setCurrentList(currentCategoryList?.filter(e => e.id !== idDelete));
      handleClose();
    } catch (error) {
      toast.error("Xóa thất bại");
    }
  };
  const categoriesColumns = [
    {
      field: "categoryUrl",
      headerName: "Image",
      width: 230,
      renderCell: params => {
        return (
          <div className="cellWithImg">
            <img
              className="cellImg"
              src={
                params.row?.categoryUrl ||
                "https://valq.com/wp-content/uploads/8-step-process-for-category-planning-a-1536x864.png"
              }
              alt="avatar"
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
      renderCell: params => {
        return (
          <div className="cellAction">
            <Link
              to={`/categories/${params.row.id}`}
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
    const getListCategories = async () => {
      const categoryList = await listCategory();
      const data = categoryList?.data?.data;
      setCurrentList(data);
    };
    getListCategories();
  }, []);
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <Datatable
          listData={currentCategoryList}
          columns={categoriesColumns}
          title={"Thêm mới categories"}
          urlAdd={"/categories/new"}
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

export default Category;

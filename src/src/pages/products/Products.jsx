import "./products.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Datatable from "../../components/datatable/Datatable";
import { useEffect, useState } from "react";
import { deleteProduct, listCategory, listProduct } from "../../lib/api";
import { Link } from "react-router-dom";
import DialogDelete from "../../components/dialog/DialogDelete";
import { toast } from "react-toastify";

const Products = () => {
  const [currentListCategory, setCurrentListCategory] = useState([]);
  const findCategoryId = (listCategory, id) => {
    const findCategory = currentListCategory?.map((category) => {
      const existCategory = category?.products?.filter(
        (product) => product.id == id
      );
      if (existCategory?.length > 0) return category;
    });
    const filteredArray = findCategory.filter(
      (element) => element !== undefined && element !== null
    );
    return filteredArray[0];
  };

  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [currentProductList, setCurrentProductList] = useState(null);
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
      const category = findCategoryId(currentListCategory, idDelete);
      toast.success("Xoá thành công");
      await deleteProduct(category.id, idDelete);
      setCurrentProductList(
        currentProductList?.filter((e) => e.id !== idDelete)
      );
      handleClose();
    } catch (error) {
      toast.error("Xóa thất bại");
    }
  };
  const productColumns = [
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
      field: "description",
      headerName: "Description",
      width: 230,
    },
    {
      field: "price",
      headerName: "Price",
      width: 150,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      width: 150,
    },
    {
      field: "origin",
      headerName: "Nguồn gốc",
      width: 150,
    },
    {
      field: "material",
      headerName: "Nguyên liệu",
      width: 150,
    },
    {
      field: "action",
      headerName: "Action",
      width: 180,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={`/products/${params.row.id}`}
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
    const getListProduct = async () => {
      const productList = await listProduct();
      const data = productList?.data?.data;
      setCurrentProductList(data);
    };

    const getCurrentListCategory = async () => {
      const data = await listCategory();
      setCurrentListCategory(data?.data?.data);
    };

    getCurrentListCategory();
    getListProduct();
  }, []);

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <Datatable
          listData={currentProductList}
          columns={productColumns}
          title={"Thêm mới products"}
          urlAdd={"/products/new"}
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

export default Products;

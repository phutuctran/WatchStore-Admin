import "./update-category.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { getDetailCategory, updateCategory } from "../../lib/api";
import { Box } from "@mui/material";
import Datatable from "../../components/datatable/Datatable";
import { Link } from "react-router-dom";

const UpdateCategory = () => {
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
      width: 230,
    },

    {
      field: "quantity",
      headerName: "Quantity",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 250,
      renderCell: params => {
        return (
          <div className="cellAction">
            <Link
              to={`/products/${params.row.id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">Chi tiết</div>
            </Link>
          </div>
        );
      },
    },
  ];
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [categoryUrl, setCategoryUrl] = useState("");
  const [currentListProduct, setCurrentListProduct] = useState(null);

  const handleUpdateCateogry = async e => {
    try {
      e.preventDefault();
      await updateCategory({
        id,
        name,
        categoryUrl,
        products: currentListProduct,
      });
      navigate("/categories");
      return toast.success("Cập nhật category thành công");
    } catch (error) {
      return toast.error(
        "Cập nhật category thất bại, vui lòng kiểm tra sự hợp lệ các trường"
      );
    }
  };

  useEffect(() => {
    const getCurrentCategory = async () => {
      const category = await getDetailCategory(id);
      category?.data?.data?.name && setName(category?.data?.data?.name);
      category?.data?.data?.categoryUrl &&
        setCategoryUrl(category?.data?.data?.categoryUrl);
      setCurrentListProduct(category?.data?.data?.products);
    };

    getCurrentCategory();
  }, [id]);
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{"Cập nhật category"}</h1>
        </div>
        <div className="bottom">
          <form onSubmit={handleUpdateCateogry}>
            <div className="formInput">
              <label>Name</label>
              <input
                type="text"
                placeholder={"Nhập name"}
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>
            <div className="formInput">
              <label>Category Url</label>
              <input
                type="text"
                placeholder={"Nhập số category url"}
                value={categoryUrl}
                onChange={e => setCategoryUrl(e.target.value)}
              />
            </div>
            <div style={{ width: "100%", textAlign: "center" }}>
              <button type={"submit"}>Cập nhật Category</button>
            </div>
          </form>
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

export default UpdateCategory;

import "./update-product.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import {
  getDetailProduct,
  listCategory,
  updateCategory,
  updateProduct,
} from "../../lib/api";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const UpdateProduct = () => {
  const [category, setCategory] = useState({});
  const [currentListCategory, setCurrentListCategory] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleUpdateProduct = async e => {
    try {
      e.preventDefault();
      await updateCategory({
        ...category,
        products: [{ id, name, description, price, imageUrl, quantity }],
      });
      navigate("/products");
      return toast.success("Cập nhật product thành công");
    } catch (error) {
      return toast.error(
        "Cập nhật product thất bại, vui lòng kiểm tra sự hợp lệ các trường"
      );
    }
  };

  const handleChange = event => {
    const {
      target: { value },
    } = event;
    setCategory(value);
  };

  useEffect(() => {
    const getCurrentProduct = async () => {
      const product = await getDetailProduct(id);
      product?.data?.data?.name && setName(product?.data?.data?.name);
      product?.data?.data?.price && setPrice(product?.data?.data?.price);
      product?.data?.data?.description &&
        setDescription(product?.data?.data?.description);
      product?.data?.data?.imageUrl &&
        setImageUrl(product?.data?.data?.imageUrl);
      product?.data?.data?.quantity &&
        setQuantity(product?.data?.data?.quantity);
      product?.data?.data?.category &&
        setCategory(product?.data?.data?.category);
    };
    getCurrentProduct();
  }, [id]);

  useEffect(() => {
    const getCurrentListCategory = async () => {
      try {
        const data = await listCategory();
        setCurrentListCategory(data?.data?.data);
      } catch (error) {
        toast.error(error);
      }
    };
    getCurrentListCategory();
  }, []);

  useEffect(() => {
    const findCategory = currentListCategory?.map(category => {
      const existCategory = category?.products?.filter(
        product => product.id == id
      );
      if (existCategory?.length > 0) return category;
    });
    const filteredArray = findCategory.filter(
      element => element !== undefined && element !== null
    );
    setCategory(filteredArray[0]);
  }, [currentListCategory, id]);

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{"Cập nhật product"}</h1>
        </div>
        <div className="bottom">
          <form onSubmit={handleUpdateProduct}>
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
              <label>Description</label>
              <input
                type="text"
                placeholder={"Nhập số description"}
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </div>
            <div className="formInput">
              <label>Price</label>
              <input
                type="text"
                placeholder={"Nhập price"}
                value={price}
                onChange={e => setPrice(e.target.value)}
              />
            </div>
            <div className="formInput">
              <label>imageUrl</label>
              <input
                type="text"
                placeholder={"Nhập imageUrl"}
                value={imageUrl}
                onChange={e => setImageUrl(e.target.value)}
              />
            </div>
            <div className="formInput">
              <label>Quantity</label>
              <input
                type="text"
                placeholder={"Nhập quantity"}
                value={quantity}
                onChange={e => setQuantity(e.target.value)}
              />
            </div>
            <div className="formInput">
              <label>Danh mục</label>
              <Select
                value={category}
                onChange={handleChange}
                input={<OutlinedInput />}
                MenuProps={MenuProps}
                size="small"
                fullWidth
              >
                {currentListCategory?.map(option => (
                  <MenuItem key={option.id} value={option}>
                    {option?.name}
                  </MenuItem>
                ))}
              </Select>
            </div>

            <div style={{ width: "100%", textAlign: "center" }}>
              <button type={"submit"}>Cập nhật Product</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;

import "./new-product.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { createProduct, listCategory } from "../../lib/api";
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

const NewProduct = () => {
  const [category, setCategory] = useState({});
  const handleChange = event => {
    const {
      target: { value },
    } = event;
    setCategory(value);
  };
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [quantity, setQuantity] = useState(null);

  const [currentListCategory, setCurrentListCategory] = useState([]);

  const handleCreateUser = async e => {
    try {
      e.preventDefault();
      const data = await createProduct({
        name,
        description,
        price,
        imageUrl,
        quantity,
        category,
      });
      if (data?.data?.status == 200) {
        navigate("/products");
        return toast.success("Tạo mới Product thành công");
      } else {
        return toast.error(
          "Tạo Product thất bại, vui lòng kiểm tra sự hợp lệ các trường"
        );
      }
    } catch (error) {
      return toast.error(
        "Tạo Product thất bại, vui lòng kiểm tra sự hợp lệ các trường"
      );
    }
  };

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

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{"Thêm mới product"}</h1>
        </div>
        <div className="bottom">
          <form onSubmit={handleCreateUser}>
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
                placeholder={"Nhập description"}
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
              <label>Img Url</label>
              <input
                type="text"
                placeholder={"Nhập Img Url"}
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
              <button type={"submit"}>Tạo mới Product</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;

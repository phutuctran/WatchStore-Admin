import "./update-shop.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { getDetailShop, listCategory, updateShop } from "../../lib/api";
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

const UpdateShop = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState(null);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setCategory(value);
  };

  const [currentListCategory, setCurrentListCategory] = useState([]);

  const handleUpdateShop = async (e) => {
    try {
      e.preventDefault();
      const ctg = currentListCategory?.find((e) => e.id === category);
      await updateShop({ id, name, address, phone, categories: [ctg] });
      navigate("/shops");
      return toast.success("Cập nhật shop thành công");
    } catch (error) {
      return toast.error(
        "Cập nhật shop thất bại, vui lòng kiểm tra sự hợp lệ các trường"
      );
    }
  };

  useEffect(() => {
    const getCurrentShop = async () => {
      const shop = await getDetailShop(id);
      shop?.data?.data?.name && setName(shop?.data?.data?.name);
      shop?.data?.data?.address && setAddress(shop?.data?.data?.address);
      shop?.data?.data?.phone && setPhone(shop?.data?.data?.phone);
    };
    getCurrentShop();
  }, [id]);

  useEffect(() => {
    const getCurrentListCategory = async () => {
      try {
        const data = await listCategory();
        setCurrentListCategory(
          data?.data?.data?.map((e) => ({
            id: e?.id,
            name: e?.name,
            categoryUrl: e?.categoryUrl,
          }))
        );
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
          <h1>{"Cập nhật shop"}</h1>
        </div>
        <div className="bottom">
          <form onSubmit={handleUpdateShop}>
            <div className="formInput">
              <label>Name</label>
              <input
                type="text"
                placeholder={"Nhập name"}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="formInput">
              <label>Address</label>
              <input
                type="text"
                placeholder={"Nhập số address"}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="formInput">
              <label>Phone</label>
              <input
                type="text"
                placeholder={"Nhập số phone"}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="formInput">
              <label>Category</label>
              <Select
                value={category}
                defaultValue={category}
                onChange={handleChange}
                input={<OutlinedInput />}
                MenuProps={MenuProps}
                size="small"
                fullWidth
              >
                {currentListCategory?.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option?.name}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <div style={{ width: "100%", textAlign: "center" }}>
              <button type={"submit"}>Cập nhật Shop</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateShop;

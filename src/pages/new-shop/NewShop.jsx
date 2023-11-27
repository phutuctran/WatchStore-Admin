import "./new-shop.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { createShop } from "../../lib/api";

const NewShop = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const handleCreateShop = async e => {
    try {
      e.preventDefault();

      const data = await createShop({ name, address, phone });
      if (data?.data?.status == 200) {
        navigate("/shops");
        return toast.success("Tạo mới shop thành công");
      } else {
        return toast.error(
          "Tạo shop thất bại, vui lòng kiểm tra sự hợp lệ các trường"
        );
      }
    } catch (error) {
      return toast.error(
        "Tạo shop thất bại, vui lòng kiểm tra sự hợp lệ các trường"
      );
    }
  };
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{"Thêm mới Shop"}</h1>
        </div>
        <div className="bottom">
          <form onSubmit={handleCreateShop}>
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
              <label>Address</label>
              <input
                type="text"
                placeholder={"Nhập address"}
                value={address}
                onChange={e => setAddress(e.target.value)}
              />
            </div>
            <div className="formInput">
              <label>Phone</label>
              <input
                type="text"
                placeholder={"Nhập phone"}
                value={phone}
                onChange={e => setPhone(e.target.value)}
              />
            </div>
            <div style={{ width: "100%", textAlign: "center" }}>
              <button type={"submit"}>Tạo mới Shop</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewShop;

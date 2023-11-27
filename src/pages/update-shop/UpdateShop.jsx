import "./update-shop.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { getDetailShop, updateShop } from "../../lib/api";

const UpdateShop = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const handleUpdateShop = async e => {
    try {
      e.preventDefault();
      await updateShop({ id, name, address, phone, categories: [] });
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
                onChange={e => setName(e.target.value)}
                required
              />
            </div>
            <div className="formInput">
              <label>Address</label>
              <input
                type="text"
                placeholder={"Nhập số address"}
                value={address}
                onChange={e => setAddress(e.target.value)}
              />
            </div>
            <div className="formInput">
              <label>Phone</label>
              <input
                type="text"
                placeholder={"Nhập số phone"}
                value={phone}
                onChange={e => setPhone(e.target.value)}
              />
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

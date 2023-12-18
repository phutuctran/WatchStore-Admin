import "./new-promotion.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { createPromotion } from "../../lib/api";

const NewPromotion = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [value, setValue] = useState("");

  const handleCreatePromotion = async (e) => {
    try {
      e.preventDefault();
      const data = await createPromotion({
        name,
        status,
        value,
      });
      if (data?.data?.status == 200) {
        navigate("/promotions");
        return toast.success("Tạo mới promotion thành công");
      } else {
        return toast.error(
          "Tạo promotion thất bại, vui lòng kiểm tra sự hợp lệ các trường"
        );
      }
    } catch (error) {
      return toast.error(
        "Tạo promotion thất bại, vui lòng kiểm tra sự hợp lệ các trường"
      );
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{"Thêm mới promotion"}</h1>
        </div>
        <div className="bottom">
          <form onSubmit={handleCreatePromotion}>
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
              <label>Status</label>
              <input
                placeholder={"Nhập status"}
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              />
            </div>
            <div className="formInput">
              <label>Value</label>
              <input
                type="text"
                placeholder={"Nhập value"}
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
            <div style={{ width: "100%", textAlign: "center" }}>
              <button type={"submit"}>Tạo mới Promotion</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewPromotion;

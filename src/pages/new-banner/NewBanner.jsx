import "./new-banner.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { createCategory } from "../../lib/api";
import { createBanner } from "../../lib/api/banner";

const NewBanner = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  const handleCreateUser = async (e) => {
    try {
      e.preventDefault();

      const data = await createBanner({ name, avatarUrl });
      if (data?.data?.status == 200) {
        navigate("/banners");
        return toast.success("Tạo mới banner thành công");
      } else {
        return toast.error(
          "Tạo banner thất bại, vui lòng kiểm tra sự hợp lệ các trường"
        );
      }
    } catch (error) {
      return toast.error(
        "Tạo banner thất bại, vui lòng kiểm tra sự hợp lệ các trường"
      );
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{"Thêm mới banner"}</h1>
        </div>
        <div className="bottom">
          <form onSubmit={handleCreateUser}>
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
              <label>Avatar Url</label>
              <input
                type="text"
                placeholder={"Nhập avatar url"}
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
              />
            </div>
            <div style={{ width: "100%", textAlign: "center" }}>
              <button type={"submit"}>Tạo mới Banner</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewBanner;

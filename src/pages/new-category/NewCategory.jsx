import "./new-category.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { createCategory } from "../../lib/api";

const NewCategory = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [categoryUrl, setCategoryUrl] = useState("");

  const handleCreateUser = async e => {
    try {
      e.preventDefault();

      const data = await createCategory({ name, categoryUrl });
      if (data?.data?.status == 200) {
        navigate("/categories");
        return toast.success("Tạo mới Category thành công");
      } else {
        return toast.error(
          "Tạo category thất bại, vui lòng kiểm tra sự hợp lệ các trường"
        );
      }
    } catch (error) {
      return toast.error(
        "Tạo category thất bại, vui lòng kiểm tra sự hợp lệ các trường"
      );
    }
  };
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{"Thêm mới category"}</h1>
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
              <label>Image Url</label>
              <input
                type="text"
                placeholder={"Nhập img url"}
                value={categoryUrl}
                onChange={e => setCategoryUrl(e.target.value)}
              />
            </div>
            <div style={{ width: "100%", textAlign: "center" }}>
              <button type={"submit"}>Tạo mới Category</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewCategory;

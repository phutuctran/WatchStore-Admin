import "./update-banner.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { updateCategory } from "../../lib/api";
import { getDetailBanner, updateBanner } from "../../lib/api/banner";

const UpdateBanner = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  const handleUpdateBanner = async (e) => {
    try {
      e.preventDefault();
      await updateBanner({
        id,
        name,
        avatarUrl,
      });
      navigate("/banners");
      return toast.success("Cập nhật banner thành công");
    } catch (error) {
      return toast.error(
        "Cập nhật banner thất bại, vui lòng kiểm tra sự hợp lệ các trường"
      );
    }
  };

  useEffect(() => {
    const getCurrentBanner = async () => {
      const banner = await getDetailBanner(id);
      banner?.data?.data?.name && setName(banner?.data?.data?.name);
      banner?.data?.data?.avatarUrl &&
        setAvatarUrl(banner?.data?.data?.avatarUrl);
    };

    getCurrentBanner();
  }, [id]);
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{"Cập nhật banner"}</h1>
        </div>
        <div className="bottom">
          <form onSubmit={handleUpdateBanner}>
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
                placeholder={"Nhập số avatar url"}
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
              />
            </div>
            <div style={{ width: "100%", textAlign: "center" }}>
              <button type={"submit"}>Cập nhật Banner</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateBanner;

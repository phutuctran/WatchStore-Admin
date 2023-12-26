import "./update-promotion.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { getDetailPromotion, updatePromotion } from "../../lib/api";

const UpdatePromotion = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [value, setValue] = useState("");

  const handleUpdatePromotion = async (e) => {
    try {
      e.preventDefault();
      await updatePromotion({
        id,
        name,
        value,
        status,
      });
      navigate("/promotions");
      return toast.success("Cập nhật promotion thành công");
    } catch (error) {
      return toast.error(
        "Cập nhật promotion thất bại, vui lòng kiểm tra sự hợp lệ các trường"
      );
    }
  };

  useEffect(() => {
    const getCurrentPromotion = async () => {
      try {
        const data = await getDetailPromotion(id);
        setName(data?.data?.data?.name);
        setStatus(data?.data?.data?.status);
        setValue(data?.data?.data?.value);
      } catch (error) {
        toast.error(error);
      }
    };
    getCurrentPromotion();
  }, [id]);

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{"Cập nhật promotion"}</h1>
        </div>
        <div className="bottom">
          <form onSubmit={handleUpdatePromotion}>
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
                type="text"
                placeholder={"Nhập status"}
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              />
            </div>
            <div className="formInput">
              <label>value</label>
              <input
                type="text"
                placeholder={"Nhập value"}
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>

            <div style={{ width: "100%", textAlign: "center" }}>
              <button type={"submit"}>Cập nhật Promotion</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePromotion;

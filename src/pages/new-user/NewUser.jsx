import "./new-user.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import { toast } from "react-toastify";
import { createUser } from "../../lib/api/user";
import { useNavigate } from "react-router-dom";

const NewUser = () => {
  const navigate = useNavigate();
  const [age, setAge] = useState("");
  const [name, setName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [username, setUsername] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [password, setPassword] = useState("");
  const [homeAddress, setHomeAddress] = useState("");
  const [birthdate, setBirthdate] = useState("");

  const handleCreateUser = async e => {
    try {
      e.preventDefault();
      const formdata = new FormData();
      age && formdata.append("age", age);
      name && formdata.append("name", name);
      avatarUrl && formdata.append("avatarUrl", avatarUrl);
      username && formdata.append("username", username);
      phonenumber && formdata.append("phonenumber", phonenumber);
      password && formdata.append("password", password);
      homeAddress && formdata.append("homeAddress", homeAddress);
      birthdate && formdata.append("birthdate", birthdate);

      const data = await createUser(formdata);
      if (data?.data?.status == 200) {
        navigate("/users");
        return toast.success("Tạo mới User thành công");
      } else {
        return toast.error(
          "Tạo user thất bại, vui lòng kiểm tra sự hợp lệ các trường"
        );
      }
    } catch (error) {
      return toast.error(
        "Tạo user thất bại, vui lòng kiểm tra sự hợp lệ các trường"
      );
    }
  };
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{"Thêm mới user"}</h1>
        </div>
        <div className="bottom">
          <form onSubmit={handleCreateUser}>
            <div className="formInput">
              <label>Username</label>
              <input
                type="text"
                placeholder={"Nhập username"}
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="formInput">
              <label>Password</label>
              <input
                type="password"
                placeholder={"Nhập password"}
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <div className="formInput">
              <label>Họ tên</label>
              <input
                type="text"
                placeholder={"Nhập họ tên"}
                required
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>
            <div className="formInput">
              <label>Tuổi</label>
              <input
                type="text"
                placeholder={"Nhập tuổi"}
                value={age}
                onChange={e => setAge(e.target.value)}
              />
            </div>
            <div className="formInput">
              <label>Avatar</label>
              <input
                type="text"
                placeholder={"Nhập avatar"}
                value={avatarUrl}
                onChange={e => setAvatarUrl(e.target.value)}
              />
            </div>

            <div className="formInput">
              <label>Số điện thoại</label>
              <input
                type="text"
                placeholder={"Nhập số điện thoại"}
                value={phonenumber}
                onChange={e => setPhonenumber(e.target.value)}
              />
            </div>
            <div className="formInput">
              <label>Địa chỉ</label>
              <input
                type="text"
                placeholder={"Nhập địa chỉ"}
                value={homeAddress}
                onChange={e => setHomeAddress(e.target.value)}
              />
            </div>
            <div className="formInput">
              <label>Ngày sinh</label>
              <input
                type="text"
                placeholder={"Nhập ngày sinh (dd/mm/yyyy)"}
                value={birthdate}
                onChange={e => setBirthdate(e.target.value)}
              />
            </div>
            <div style={{ width: "100%", textAlign: "center" }}>
              <button type={"submit"}>Tạo mới User</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewUser;

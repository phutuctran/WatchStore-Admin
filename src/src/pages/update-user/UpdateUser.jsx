import "./update-user.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { createUser, getUser, updateUser } from "../../lib/api/user";
import { useNavigate, useParams } from "react-router-dom";

const UpdateUser = () => {
  const navigate = useNavigate();
  const { info } = useParams();
  const [id, setId] = useState("");
  const [age, setAge] = useState("");
  const [name, setName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [username, setUsername] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [password, setPassword] = useState("");
  const [homeAddress, setHomeAddress] = useState("");
  const [birthdate, setBirthdate] = useState("");

  const handleUpdateUser = async e => {
    try {
      e.preventDefault();
      const formdata = new FormData();
      id && formdata.append("id", id);
      age && formdata.append("age", age);
      name && formdata.append("name", name);
      avatarUrl && formdata.append("avatarUrl", avatarUrl);
      username && formdata.append("username", username);
      phonenumber && formdata.append("phonenumber", phonenumber);
      password && formdata.append("password", password);
      homeAddress && formdata.append("homeAddress", homeAddress);
      birthdate && formdata.append("birthdate", birthdate);
      await updateUser(formdata);
      navigate("/users");
      return toast.success("Cập nhật User thành công");
    } catch (error) {
      return toast.error(
        "Cập nhật user thất bại, vui lòng kiểm tra sự hợp lệ các trường"
      );
    }
  };

  useEffect(() => {
    const getCurrentUser = async () => {
      const arrInfo = info.split("-");
      const user = await getUser({
        username: arrInfo[0],
        password: arrInfo[1],
      });
      user?.data?.data?.id && setId(user?.data?.data?.id);
      user?.data?.data?.age && setAge(user?.data?.data?.age);
      user?.data?.data?.name && setName(user?.data?.data?.name);
      user?.data?.data?.avatarUrl && setAvatarUrl(user?.data?.data?.avatarUrl);
      user?.data?.data?.username && setUsername(user?.data?.data?.username);
      user?.data?.data?.phonenumber &&
        setPhonenumber(user?.data?.data?.phonenumber);
      user?.data?.data?.password && setPassword(user?.data?.data?.password);
      user?.data?.data?.homeAddress &&
        setHomeAddress(user?.data?.data?.homeAddress);
      user?.data?.data?.birthdate && setBirthdate(user?.data?.data?.birthdate);
    };
    getCurrentUser();
  }, [info]);
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{"Cập nhật user"}</h1>
        </div>
        <div className="bottom">
          <form onSubmit={handleUpdateUser}>
            <div className="formInput">
              <label>Username</label>
              <input
                type="text"
                placeholder={"Nhập username"}
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
                disabled
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
              <button type={"submit"}>Cập nhật User</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;

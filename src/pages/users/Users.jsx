import "./users.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Datatable from "../../components/datatable/Datatable";
import { useEffect, useState } from "react";
import { deleteUser, listUser } from "../../lib/api";
import { Link } from "react-router-dom";
import DialogDelete from "../../components/dialog/DialogDelete";
import { toast } from "react-toastify";

const Users = () => {
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [currentUserList, setCurrentList] = useState(null);
  const [idDelete, setIdDelete] = useState(null);
  const handleOpenDialogDelete = id => {
    setIdDelete(id);
    setIsOpenDelete(true);
  };
  const handleClose = () => {
    setIdDelete(null);
    setIsOpenDelete(false);
  };
  const handleConfirmDelete = async () => {
    try {
      toast.success("Xoá thành công");
      await deleteUser(idDelete);
      setCurrentList(currentUserList?.filter(e => e.id !== idDelete));
      handleClose();
    } catch (error) {
      toast.error("Xóa thất bại");
    }
  };
  const userColumns = [
    {
      field: "user",
      headerName: "Username",
      width: 230,
      renderCell: params => {
        return (
          <div className="cellWithImg">
            <img
              className="cellImg"
              src={
                params.row?.avatarUrl ||
                "https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg"
              }
              alt="avatar"
            />
            {params.row.username}
          </div>
        );
      },
    },
    {
      field: "name",
      headerName: "Name",
      width: 230,
    },
    {
      field: "birthdate",
      headerName: "Birth Day",
      width: 230,
    },

    {
      field: "age",
      headerName: "Age",
      width: 100,
    },
    {
      field: "homeAddress",
      headerName: "Address",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: params => {
        return (
          <div className="cellAction">
            <Link
              to={`/users/${params.row.username}-${params.row.password}`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">Chỉnh sửa</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleOpenDialogDelete(params.row.id)}
            >
              Xóa
            </div>
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    const getListUser = async () => {
      const userList = await listUser();
      const data = userList?.data?.data;
      data.shift();
      setCurrentList(data);
    };
    getListUser();
  }, []);
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <Datatable
          listData={currentUserList}
          columns={userColumns}
          title={"Thêm mới User"}
          urlAdd={"/users/new"}
        />
      </div>
      <DialogDelete
        open={isOpenDelete}
        handleClose={handleClose}
        handleOk={handleConfirmDelete}
      />
    </div>
  );
};

export default Users;

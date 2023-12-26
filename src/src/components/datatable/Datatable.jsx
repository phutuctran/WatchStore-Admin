import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";

const Datatable = ({ listData, columns, title, urlAdd, ...props }) => {
  return (
    <div className="datatable">
      <div className="datatableTitle">
        {title}
        {urlAdd && (
          <Link to={urlAdd} className="link">
            Thêm mới
          </Link>
        )}
      </div>
      {listData && (
        <DataGrid
          className="datagrid"
          rows={listData}
          columns={columns}
          pageSize={50}
          rowsPerPageOptions={[50]}
          {...props}
        />
      )}
    </div>
  );
};

export default Datatable;

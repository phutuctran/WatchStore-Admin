import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const DialogDelete = ({ handleClose, handleOk, open }) => {
  return (
    // update dialoge
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Hộp thoại xóa "}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Bạn có chắc chắn xóa không ? Nếu xóa thì sẽ không khôi phuc được !!
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained" color="error">
          Hủy
        </Button>
        <Button onClick={handleOk} autoFocus variant="contained">
          Đồng ý
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogDelete;

import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useTheme } from "@mui/material/styles";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function DialogAdd({
  open,
  handleClose,
  handleOk,
  title,
  options,
}) {
  const theme = useTheme();
  const [value, setValue] = React.useState([]);
  const handleChange = event => {
    const {
      target: { value },
    } = event;
    setValue(typeof value === "string" ? value.split(",") : value);
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {title || "Hộp thoại thêm"}
        </DialogTitle>
        <FormControl sx={{ m: 1, width: 300 }}>
          <Select
            multiple
            value={value}
            onChange={handleChange}
            input={<OutlinedInput />}
            MenuProps={MenuProps}
            size="small"
          >
            {options?.map(option => (
              <MenuItem
                key={option.id}
                value={option}
                style={getStyles(option, value, theme)}
              >
                {option?.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <DialogActions>
          <Button
            onClick={handleClose}
            variant="contained"
            color="error"
            size="small"
          >
            Hủy
          </Button>
          <Button
            onClick={() => handleOk(value)}
            autoFocus
            variant="contained"
            size="small"
          >
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

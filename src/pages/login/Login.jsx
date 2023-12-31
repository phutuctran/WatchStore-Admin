import { Paper, TextField, Typography, Button } from "@mui/material";
import Box from "@mui/material/Box";
import { toast } from "react-toastify";
import { login } from "../../lib/api/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    if (currentUser) {
      navigate("/");
    }
  }, []);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async e => {
    try {
      e.preventDefault();
      const data = await login({
        username,
        password,
      });
      if (data?.data?.data) {
        localStorage.setItem("user", JSON.stringify(data?.data?.data));
        navigate("/");
        toast.success("Đăng nhập thành công");
      } else {
        toast.error("Đăng nhập thất bại");
      }
    } catch (err) {
      console.log(err);
      toast.error("Đăng nhập thất bại");
    }
  };
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      height={"100vh"}
    >
      <Paper>
        <Box width={{ xs: "90vw", lg: "25vw" }} p={2}>
          <Typography variant="h6" fontWeight={"bold"} textAlign={"center"}>
            Watch Store
          </Typography>
          <Box mt={3} component={"form"} onSubmit={handleLogin}>
            <TextField
              fullWidth
              size="small"
              placeholder="Nhập username"
              required
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            <Box mt={2}>
              <TextField
                value={password}
                fullWidth
                size="small"
                placeholder="Nhập password"
                type="password"
                required
                onChange={e => setPassword(e.target.value)}
              />
            </Box>

            <Box mt={2}>
              <Button fullWidth variant="contained" type="submit">
                Đăng nhập
              </Button>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;

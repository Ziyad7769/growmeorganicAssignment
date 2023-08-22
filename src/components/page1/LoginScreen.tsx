import { Typography, Stack, TextField, Button, Box } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginScreen = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [mobile, setMobile] = useState<any>();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let data = {
      name: name,
      email: email,
      mobile: mobile,
    };
    localStorage.setItem("loginData", JSON.stringify(data));

    navigate("/table");
}

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vW",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <Box mt="-100px">
        <Typography variant="h3" fontFamily="sans-serif" textAlign="center">
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack
            sx={{
              width: "400px",
            }}
          >
            <TextField
              fullWidth
              required
              margin="normal"
              label="Your Name"
              type="name"
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
            />

            <TextField
              fullWidth
              required
              margin="normal"
              label="Mobile Number"
              type="tel"
              value={mobile}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setMobile(e.target.value)
              }
            />

            <TextField
              fullWidth
              margin="normal"
              label="Email"
              type="email"
              required
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
            />
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default LoginScreen;

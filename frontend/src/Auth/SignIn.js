import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Box, Button, TextField } from "@mui/material";
import { Link } from 'react-router-dom';
import { useAuth } from "./AuthContext";

const SignIn = () => {

  const {login} = useAuth();
  const [email,setEmail]  = useState("");
  const [password,setPassword] = useState("");


  const handleLogin = async () => {
    try {
      console.log("Sending login request with :" , {Email:email,Password:password});
      const response = await axios.post(`http://localhost:3005/user/login`, {
        Email:email,
        Password:password
      });

      console.log("Login response:" , response.data);


      if (response.data.success) {
        console.log('Login successfull, token :' , response.data.token);
      login(response.data.token ,{
        id:response.data.userId,
        email:email
      });
      toast.success("Login Successfull");
    } else{
      console.log("login failed:",response.data.message);
      toast.error(response.data.message || "Login Failed");
    }
  }
    catch (error) {
      console.error('Error Logging in:', error);
      toast.error(error.response?.data?.message || 'Failed to Login');
    }
  };

  return (
    <>
      <Box
        component="form"
        sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
        noValidate
        autoComplete="off"
        className="register">
        
        <Box className="header_title">Login</Box>
        <Box className="signUp">
        <TextField
  type="email"
  required
  id="Email"
  variant="standard"
  label="Enter Email Id"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>

<TextField
  type="password"
  required
  variant="standard"
  id="Password"
  label="Enter Password"
  value={password}
  onChange={(e) => setPassword(e.target.value)} // typo fix: s ✅
/>


          <Button className="primary_button" onClick={handleLogin}>
            Log In
          </Button>

         
          <Box className="account">
            <Link to="/sign-up" style={{ textDecoration: 'none', color: '#1976d2' }}>Don't have an account? Sign up</Link>
          </Box>

        </Box>
      </Box>
    </>
  );
};

export default SignIn;

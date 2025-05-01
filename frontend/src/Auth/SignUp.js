import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await axios.post("http://localhost:3005/user/createuser", {
        Email: email,
        Password: password
      });
      
      if (response.data.success) {
        toast.success("Registration successful! Please login.");
        navigate("/SignIn");
      } else {
        toast.error(response.data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(error.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box
        component="form"
        sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
        noValidate
        autoComplete="off"
        className="register"
        onSubmit={handleSubmit}
      >
        <Box className="header_title">Register</Box>

        <Box className="signIn">
          <TextField 
            type="email" 
            required 
            id="email" 
            variant="standard" 
            label="Enter Email Id"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField 
            type="password" 
            required 
            variant="standard" 
            id="password" 
            label="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button 
            type="submit"
            className="primary_button" 
            sx={{ width: "400px" }}
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </Button>
          <Box className="account">
            <Box className="" sx={{ marginLeft: "110px", marginTop: "20px" }}>
              Already have an account? <Link to="/SignIn">Sign In</Link>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SignUp;
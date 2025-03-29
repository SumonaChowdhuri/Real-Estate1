import React from "react";
import {Box, Button, TextField} from "@mui/material"

const SignIn=()=>
{
      return (
        <>
          <Box
            component="form"// define how it work like - form , link
            sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}// style property dakne ke liye 
            noValidate// user bina email or password ke submit kare to submit ho jata hai//if you submit the form then your details are saved automatically , next time your form is automatically filed 
            autoComplete="off" className="register"> 

            <Box className="header_title">Register</Box>     

            <Box className="signIn">  

           <TextField 
           type="email"
           required
           id="email"
           variant="standard"
           label="Enter Email Id"
        />
        
         <TextField
          type="password"
          required
           variant="standard"
          id="password"
          label="Enter Password"
        />
            
         <Box className="forgot_password">
            <Box className="forgot">Forgot Password</Box>
         </Box>
          
          <Button className="primary_button">Register</Button>
            
         <Box className="account">
            <Box>Already an account</Box>
            <Box className="forgot">Login</Box>
         </Box>

          </Box> 
        
        </Box> 
        </>
      )
}

export default SignIn;
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

            <Box className="header_title">Login</Box>     

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
          
          <Button className="primary_button " sx={{width:"400px"}}>Login</Button>
          <Box className="forgot_password">
            <Box className="forgot">Forgot Password</Box>
         </Box>
            
         <Box className="account">
            <Button className="primary_button" sx={{width:"400px"}}>Already an account</Button>
         </Box>

          </Box> 
        
        </Box> 
        </>
      )
}

export default SignIn;
import React from 'react'
import {  InputAdornment,TextField,Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';

const Search = () => {
  return (
<div className='flex'>
    <TextField
        //   className='search'

        label="Search"
        variant="outlined"
       // fullWidth
      //  value={searchQuery}
       // onChange={handleSearchChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        style={{ marginBottom: '20px',width:'160px',display:'flex',marginRight:'200px',justifyContent:'flex-end',marginLeft:'600px' }}
      />


    <Button 
    variant="contained" 
   // color="primary" 
 //onClick={handleAddNew}
 startIcon={<AddIcon />}
    style={{  textAlign:"center", marginBottom: '20px',textWrap:'wrap',marginRight:'50px' ,padding:'10px 10px 10px 10px',borderRadius:'5px',height:'50px',width:'130px'}}
  >
    Add New
  </Button>
  

  
  </div>
  
      )
}

export default Search;
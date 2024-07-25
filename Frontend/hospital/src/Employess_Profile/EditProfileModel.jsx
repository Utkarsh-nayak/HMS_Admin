import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import axios from "axios";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600, // Increased width
    bgcolor: "background.paper",
      background: 'linear-gradient(45deg, #c4f5c7 10%, #87CEEB 100%, #FF8E53 5%)',
    boxShadow: 24,
    p: 4,
    maxHeight: "80vh", // Set maximum height for the modal
    overflowY: "auto", // Enable vertical scrolling if content overflows
    "& .MuiDialogContent-root": {  // Target the Modal's content area
      overflowX: "auto"            // Enable horizontal scrolling for the content
    }
  };
  
export default function EditProfile({ fetchData, rowData }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    emp_id: rowData?.emp_id || "",
    emp_name: rowData?.emp_name || "",
    dob: rowData?.dob || "",
    qualification: rowData?.qualification || "",
    gender: rowData?.gender || "",
    mobile: rowData?.mobile || "",
    email: rowData?.email || "",
    address: rowData?.address || "",
    image: rowData?.image || "",


  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const EditEmployeeData = async () => {
    try {
    const data = new FormData();
    Object.keys(formData).forEach((key) =>{
        data.append(key,formData[key]);
    });
      const response = await axios.put(
        `http://localhost:4000/emp_profileupdate/emp_id${formData.emp_id}`,
        data,
     
      );
      console.log("Employee updated:", response.data);
      handleClose();
      fetchData();
    } catch (error) {
      console.error("Error updating Employee:", error);
    }
  };

  return (
    <>
        <span onClick={handleOpen}>
        <EditCalendarIcon sx={{ marginRight: "10px" }} />
      </span>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          style={{
            border: '1px solid grey',
            borderRadius: '0px',
            boxShadow: 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px',
          }}
        >
            <div style={{textAlign:'center', fontSize:'20px', }}>
                <h1>Update Profile List</h1>
                </div>
          <TextField
            fullWidth
            required
            label="Employee ID"
            variant="filled"
            defaultValue={rowData.emp_id}
            onChange={(e) => {
              setFormData((prevFormData) => ({
                ...prevFormData,
                emp_id: e.target.value,
              }));
            }}
            style={{ marginBottom: '1rem' }}
          />
             <TextField
            fullWidth
            required
            label="Employee Name"
            variant="filled"
            defaultValue={rowData.emp_name}
            onChange={(e) => {
              setFormData({ ...formData, emp_name: e.target.value });
            }}
            style={{ marginBottom: '1rem' }}
          />
         
        
       
           
          <TextField
            fullWidth
          
            label="dob"
            variant="filled"
            defaultValue={rowData.dob}
            onChange={(e) => {
              setFormData({ ...formData, dob: e.target.value });
            }}
            style={{ marginBottom: '1rem' }}
          />
          <TextField
            fullWidth
            
            label="Qualification"
            variant="filled"
            defaultValue={rowData.qualification}
            onChange={(e) => {
              setFormData({ ...formData, qualification: e.target.value });
            }}
            style={{ marginBottom: '1rem' }}
          />
          <TextField
            fullWidth
            
            label="Gender"
            variant="filled"
            defaultValue={rowData.gender}
            onChange={(e) => {
              setFormData({ ...formData, gender: e.target.value });
            }}
            style={{ marginBottom: '1rem' }}
          />
            <TextField
            fullWidth
            required
            label="Mobile"
            variant="filled"
            defaultValue={rowData.mobile}
            onChange={(e) => {
              setFormData({ ...formData, mobile: e.target.value });
            }}
            style={{ marginBottom: '1rem' }}
          />
          <TextField
            fullWidth
            required
            label="Email"
            variant="filled"
            defaultValue={rowData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
            }}
            style={{ marginBottom: '1rem' }}
          />
            <TextField
            fullWidth
            required
            label="Address"
            variant="filled"
            defaultValue={rowData.address}
            onChange={(e) => {
              setFormData({ ...formData, address: e.target.value });
            }}
            style={{ marginBottom: '1rem' }}
          />
          <TextField
            fullWidth
            type="file"
            required
            label="image"
            variant="filled"
            defaultValue={''}
            onChange={(e) => {
              setFormData({ ...formData, image: e.target.value });
            }}
            style={{ marginBottom: '1rem' }}
          />
        
        
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                gap: '4rem',
                paddingTop: '1rem',
              }}
            >
              <Button
                type="submit"
                variant="contained"
                onClick={handleClose}
                style={{
                  backgroundColor: 'grey',
                  color: 'white',
                  border: '2px solid #04AA6D',
                }}
              >
                Close
              </Button>
              <Button
                type="submit"
                variant="contained"
                onClick={EditEmployeeData}
                style={{
                  backgroundColor: 'red',
                  color: 'white',
                  border: '2px solid #04AA6D',
                }}
              >
                Submit
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
}
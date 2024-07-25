import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import { useEffect, useState } from "react";

import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
    background: 'linear-gradient(45deg, #c4f5c7 10%, #87CEEB 100%, #FF8E53 5%)',
  boxShadow: 24,
  p: 4,
};
const initialValue = {
  emp_id: "",
  emp_name: "",
};
export default function AddEmployeeModal({ refreshData }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(initialValue);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const AddEmployeeModal = async () => {
    const response = await axios.post(
      "http://localhost:4000/employesspost",
      formData
    );
    handleClose();
    refreshData();
  };
  //////insert emp detail/////
  const [input, setinput]=useState({
    emp_id:"",
    emp_name:"",
    emp_email:"",
    emp_password:"",
    department_id:"",

  })
  const handelsubmit = async (e) =>{
    e.preventDefault();
    const res = await axios.post('http://localhost:4000/employesspost',input)
    try{
      console.log(res.data)
      console.log("data posted")
      handleClose();
      refreshData();
    }catch (error){
      console.log("error",error)
      
    }
  }

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Add Employees
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            variant="h5"
            gutterBottom
            style={{ textAlign: "center", marginBottom: "20px" }}
          >
            Add Employees
          </Typography>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <TextField
              fullWidth
              required
              label="Employees Id"
              variant="filled"
              onChange={(e) => {
                setinput({ ...input, emp_id: e.target.value });
              }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <TextField
              fullWidth
              required
              label="Employees Name"
              variant="filled"
              onChange={(e) => {
                setinput({ ...input, emp_name: e.target.value });
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextField
              fullWidth
              required
              label="Email"
              variant="filled"
              onChange={(e) => {
                setinput({ ...input, emp_email: e.target.value });
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextField
              fullWidth
              required
              label="enter password"
              variant="filled"
              onChange={(e) => {
                setinput({ ...input, emp_password: e.target.value });
              }}
            />
            </div>

            
            <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextField
              fullWidth
              required
              label="department_id"
              variant="filled"
              onChange={(e) => {
                setinput({ ...input, department_id: e.target.value });
              }}
            />
            </div>
           
              <div style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Button
              type="submit"
              variant="contained"
              onClick={handelsubmit}
            >
              Submit
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

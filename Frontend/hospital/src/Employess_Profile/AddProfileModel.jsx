import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  background: 'linear-gradient(45deg, #c4f5c7 10%, #87CEEB 100%, #FF8E53 5%)' ,
  boxShadow: 24,
  p: 4,
  overflowY: "auto",
  maxHeight: "80vh",
};

const initialValue = {
  emp_id: "",
  emp_name: "",
  dob: "",
  qualification: "",
  gender: "",
  email: "",
  mobile: "",
  address: "",
  image: null,
};

export default function AddProfileModal({ fetchData }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(initialValue);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const AddemployeeData = async () => {
    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });
      
      const response = await axios.post(
        "http://localhost:4000/emp_profilepost",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Employee added:", response.data);
      handleClose();
      fetchData();
    } catch (error) {
      console.error("Error adding Employee:", error);
    }
  };

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Employee
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={style}
          style={{
            border: '1px solid grey',
            borderRadius: '35px 10px / 20px 10px',
            boxShadow: 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px',
          }}
        >
          <h1>Add Employee Here</h1>
          <TextField
            fullWidth
            required
            label="Employee ID"
            variant="filled"
            name="emp_id"
            value={formData.emp_id}
            onChange={handleChange}
            style={{ marginBottom: '1rem' }}
          />
          <TextField
            fullWidth
            required
            label="Employee Name"
            variant="filled"
            name="emp_name"
            value={formData.emp_name}
            onChange={handleChange}
            style={{ marginBottom: '1rem' }}
          />
          <TextField
            fullWidth
          
            variant="filled"
            name="dob"
            type="date"
            value={formData.dob}
            onChange={handleChange}
            style={{ marginBottom: '1rem' }}
          />
          <TextField
            fullWidth
            label="Qualification"
            variant="filled"
            name="qualification"
            value={formData.qualification}
            onChange={handleChange}
            style={{ marginBottom: '1rem' }}
          />
          <TextField
            fullWidth
            label="Gender"
            variant="filled"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            style={{ marginBottom: '1rem' }}
          />
          <TextField
            fullWidth
            label="Mobile"
            variant="filled"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            style={{ marginBottom: '1rem' }}
          />
          <TextField
            fullWidth
            label="Email"
            variant="filled"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{ marginBottom: '1rem' }}
          />
          <TextField
            fullWidth
            label="Address"
            variant="filled"
            name="address"
            value={formData.address}
            onChange={handleChange}
            style={{ marginBottom: '1rem' }}
          />
          <input
            type="file"
            name="image"
            onChange={handleChange}
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
                variant="contained"
                onClick={AddemployeeData}
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
    </div>
  );
}
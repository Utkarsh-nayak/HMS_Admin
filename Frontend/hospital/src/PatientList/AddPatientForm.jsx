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
  bgcolor: "background.paper",
    background: 'linear-gradient(45deg, #c4f5c7 10%, #87CEEB 100%, #FF8E53 5%)',
  boxShadow: 24,
  p: 4,
  overflowY: "auto",
  maxHeight: "80vh",
};

const initialValue = {
  patient_id: "",
  patient_name: "",
  gender: "",
  age: "",
  mobile_no: "",
  blood_group: "",
  symptoms: "",
  city: "",
  date: "",
  time: "",
};

export default function AddPatientModal({ refreshData }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(initialValue);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const AddPatientData = async () => {
    try {
      // Ensure the date is in yyyy-mm-dd format
     
      const response = await axios.post(
        "http://localhost:4000/patientpost",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Patient added:", response.data);
      handleClose();
      refreshData();
    } catch (error) {
      console.error("Error adding patient:", error);
    }
  };

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Add Patient
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={style}
          style={{
            border: "1px solid grey",
            borderRadius: "35px 10px / 20px 10px",
            boxShadow:
              "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
          }}
        >
          <h1>Add Patient Here</h1>
          <TextField
            fullWidth
            required
            label="Patient ID"
            variant="filled"
            name="patient_id"
            value={formData.patient_id}
            onChange={handleChange}
            style={{ marginBottom: "1rem" }}
          />
          <TextField
            fullWidth
            required
            label="Patient Name"
            variant="filled"
            name="patient_name"
            value={formData.patient_name}
            onChange={handleChange}
            style={{ marginBottom: "1rem" }}
          />
          <TextField
            fullWidth
            label="Gender"
            variant="filled"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            style={{ marginBottom: "1rem" }}
          />
          <TextField
            fullWidth
            label="Age"
            variant="filled"
            name="age"
            value={formData.age}
            onChange={handleChange}
            style={{ marginBottom: "1rem" }}
          />
          <TextField
            fullWidth
            label="Mobile Number"
            variant="filled"
            name="mobile_no"
            value={formData.mobile_no}
            onChange={handleChange}
            style={{ marginBottom: "1rem" }}
          />
          <TextField
            fullWidth
            label="Blood Group"
            variant="filled"
            name="blood_group"
            value={formData.blood_group}
            onChange={handleChange}
            style={{ marginBottom: "1rem" }}
          />
          <TextField
            fullWidth
            label="Symptoms"
            variant="filled"
            name="symptoms"
            value={formData.symptoms}
            onChange={handleChange}
            style={{ marginBottom: "1rem" }}
          />
          <TextField
            fullWidth
            required
            label="City"
            variant="filled"
            name="city"
            value={formData.city}
            onChange={handleChange}
            style={{ marginBottom: "1rem" }}
          />
          <TextField
            fullWidth
            label="Date"
            type="date"
            variant="filled"
            name="date"
            value={formData.date}
            onChange={handleChange}
            style={{ marginBottom: "1rem" }}
          />
          <TextField
            fullWidth
            required
            label="Time"
            type="time"
            variant="filled"
            name="time"
            value={formData.time}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            style={{ marginBottom: "1rem" }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "4rem",
                paddingTop: "1rem",
              }}
            >
              <Button
                variant="contained"
                onClick={handleClose}
                style={{
                  backgroundColor: "grey",
                  color: "white",
                  border: "2px solid #04AA6D",
                }}
              >
                Close
              </Button>
              <Button
                variant="contained"
                onClick={AddPatientData}
                style={{
            
                  color: "white",
                  border: "2px solid #04AA6D",
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

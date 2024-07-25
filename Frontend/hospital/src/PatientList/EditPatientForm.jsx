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
  "& .MuiDialogContent-root": {
    // Target the Modal's content area
    overflowX: "auto", // Enable horizontal scrolling for the content
  },
};

export default function EditPatient({ refreshData, rowData }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    patient_id: rowData?.patient_id || "",
    patient_name: rowData?.patient_name || "",
    gender: rowData?.gender || "",
    age: rowData?.age || "",
    mobile_no: rowData?.mobile_no || "",
    blood_group: rowData.blood_group || "",
    symptoms: rowData.symptoms || "",
    city: rowData.city || "",
    date: rowData.date || "",
    time: rowData.time || "",
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const EditPatientData = async () => {
    try {
      const response = await axios.put(
        `http://localhost:4000/patientupdate/${formData.patient_id}`,
        formData
      );

      console.log("Patient updated:", response.data);
      handleClose();
      refreshData();
    } catch (error) {
      console.error("Error updating Patient:", error);
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
            border: "1px solid grey",
            borderRadius: "0px",
            boxShadow:
              "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
          }}
        >
          <div style={{ textAlign: "center", fontSize: "20px" }}>
            <h1>Update Patient List</h1>
          </div>
          <TextField
            fullWidth
            required
            label="Patient Id"
            variant="filled"
            value={formData.patient_id}
            onChange={(e) => {
              setFormData((prevFormData) => ({
                ...prevFormData,
                patient_id: e.target.value,
              }));
            }}
            style={{ marginBottom: "1rem" }}
          />
          <TextField
            fullWidth
            required
            label="Patient Name"
            variant="filled"
            value={formData.patient_name}
            onChange={(e) => {
              setFormData({ ...formData, patient_name: e.target.value });
            }}
            style={{ marginBottom: "1rem" }}
          />
          <TextField
            fullWidth
            label="gender"
            variant="filled"
            value={formData.gender}
            onChange={(e) => {
              setFormData({ ...formData, gender: e.target.value });
            }}
            style={{ marginBottom: "1rem" }}
          />
          <TextField
            fullWidth
            label="age"
            variant="filled"
            value={formData.age}
            onChange={(e) => {
              setFormData({ ...formData, age: e.target.value });
            }}
            style={{ marginBottom: "1rem" }}
          />
          <TextField
            fullWidth
            label="Mobile No"
            variant="filled"
            value={formData.mobile_no}
            onChange={(e) => {
              setFormData({ ...formData, mobile_no: e.target.value });
            }}
            style={{ marginBottom: "1rem" }}
          />

          <TextField
            fullWidth
            label="Blood Group"
            variant="filled"
            value={formData.blood_group}
            onChange={(e) => {
              setFormData({ ...formData, blood_group: e.target.value });
            }}
            style={{ marginBottom: "1rem" }}
          />

          <TextField
            fullWidth
            label="Symptoms"
            variant="filled"
            value={formData.symptoms}
            onChange={(e) => {
              setFormData({ ...formData, symptoms: e.target.value });
            }}
            style={{ marginBottom: "1rem" }}
          />

          <TextField
            fullWidth
            label="city"
            variant="filled"
            value={formData.city}
            onChange={(e) => {
              setFormData({ ...formData, city: e.target.value });
            }}
            style={{ marginBottom: "1rem" }}
          />

          <TextField
            fullWidth
            label="date"
            variant="filled"
            value={formData.date}
            onChange={(e) => {
              setFormData({ ...formData, date: e.target.value });
            }}
            style={{ marginBottom: "1rem" }}
          />

          <TextField
            fullWidth
            label="time"
            variant="filled"
            value={formData.time}
            onChange={(e) => {
              setFormData({ ...formData, time: e.target.value });
            }}
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
                type="button"
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
                type="button"
                variant="contained"
                onClick={EditPatientData}
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
    </>
  );
}

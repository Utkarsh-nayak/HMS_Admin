import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
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
};

const initialValue = {
  lab_id: "",
  lab_name: "",
  room_id: "",
};

export default function AddLabsModal({ refreshData }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(initialValue);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const AddLabData = async () => {
    try {
      const response = await axios.post("http://localhost:4000/labpost", formData);
      console.log(response.data); // Add this line to log the response from the backend
      handleClose();
      refreshData();
    } catch (error) {
      console.error("There was an error adding the lab data!", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Add Lab
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h5" gutterBottom style={{ textAlign: "center", marginBottom: "20px" }}>
            Add Lab
          </Typography>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <InputLabel style={{ width: "20%" }} htmlFor="lab_id">Lab ID</InputLabel>
            <TextField
              style={{ marginBottom: "16px", width: "80%" }}
              required
              id="lab_id"
              variant="filled"
              onChange={handleChange}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <InputLabel style={{ width: "20%" }} htmlFor="lab_name">Lab Name</InputLabel>
            <TextField
              required
              id="lab_name"
              variant="filled"
              style={{ marginBottom: "16px", width: "80%" }}
              onChange={handleChange}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <InputLabel style={{ width: "20%" }} htmlFor="room_id">Room ID</InputLabel>
            <TextField
              style={{ marginBottom: "16px", width: "80%" }}
              required
              id="room_id"
              variant="filled"
              onChange={handleChange}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button type="submit" variant="contained" onClick={AddLabData}>
              Submit
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

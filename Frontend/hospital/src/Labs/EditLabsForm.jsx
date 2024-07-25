import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import axios from "axios";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";

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

export default function EditLabModal({ refreshData, rowData }) {
  const initialValue = {
    lab_id: rowData.lab_id,
    lab_name: rowData.lab_name,
    room_id: rowData.room_id,
  };

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(initialValue);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const EditLabsData = async (id) => {
    try {
      console.log(id)
      const response = await axios.put(
        `http://localhost:4000/labupdate/${id}`,
        formData
      );
      console.log(response.data); // Log the response for debugging
      handleClose();
      refreshData();
    } catch (error) {
      console.error("There was an error updating the lab data!", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  useEffect(() => {
    setFormData(initialValue);
  }, [rowData]);

  return (
    <>
      <span onClick={handleOpen}><EditCalendarIcon sx={{ marginRight: "10px" }} /></span>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField
            fullWidth
            required
            id="lab_id"
            label="Lab ID"
            variant="filled"
            onChange={handleChange}
            defaultValue={rowData.lab_id}
          />
          <TextField
            fullWidth
            required
            id="lab_name"
            label="Lab Name"
            variant="filled"
            onChange={handleChange}
            defaultValue={rowData.lab_name}
          />
          <TextField
            fullWidth
            required
            id="room_id"
            label="Room ID"
            variant="filled"
            onChange={handleChange}
            defaultValue={rowData.room_id}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "16px"
            }}
          >
            <Button type="submit" variant="contained" onClick={() => EditLabsData(rowData.lab_id)}>
              Update
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
}

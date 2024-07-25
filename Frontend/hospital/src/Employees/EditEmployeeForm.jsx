import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
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
export default function EditEmployeeModal( {refreshData,rowData} ) {
  const initialValue = {
    emp_id: rowData.emp_id,
    emp_name: rowData.emp_name,
  };

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(initialValue);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const EditEmployeeData = async () => {
    const response = await axios.put(
      `http://localhost:4000/employessupdate/${rowData.id}`,
      formData
    );
    handleClose();
    refreshData()
  };

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
            label="employess ID"
            variant="filled"
            onChange={(e) => {
              setFormData({ ...formData, emp_id: e.target.value });
            }}
            defaultValue={rowData.id}
          />
          <TextField
            fullWidth
            required
            label="Employee Name"
            variant="filled"
            onChange={(e) => {
              setFormData({ ...formData, emp_name: e.target.value });
            }}
            defaultValue={rowData.name}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button type="submit" variant="contained" onClick={EditEmployeeData}>
              Update
            </Button>{" "}
          </div>
        </Box>
      </Modal>
    </>
  );
}

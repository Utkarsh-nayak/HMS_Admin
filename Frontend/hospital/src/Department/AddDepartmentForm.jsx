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
  department_id: "",
  department_name: "",
};
export default function AddDepartmentModal({ refreshData }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(initialValue);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const AddDepartmentData = async () => {
    const response = await axios.post(
      "http://localhost:4000/departmentpost",
      formData
    );
    handleClose();
    refreshData();
  };

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Add Department
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
            Add department
          </Typography>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <InputLabel style={{ width: "30%" }} htmlFor="role-id">
              <div style={{ justifyContent: "center", marginTop: "16px" }}>
                Department ID
              </div>
            </InputLabel>
            <TextField
              style={{ marginBottom: "16px", width: "80%" }}
              fullWidth
              required
              label="Department ID"
              variant="filled"
              onChange={(e) => {
                setFormData({ ...formData, department_id: e.target.value });
              }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <InputLabel style={{ width: "30%" }} htmlFor="department-name ">
              <div style={{ justifyContent: "center", marginTop: "15px" }}>
                Department Name
              </div>
            </InputLabel>
            <TextField
              fullWidth
              required
              label="Department Name"
              variant="filled"
              style={{ marginBottom: "16px", width: "80%" }}
              onChange={(e) => {
                setFormData({ ...formData, department_name: e.target.value });
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
            <Button
              type="submit"
              variant="contained"
              onClick={AddDepartmentData}
            >
              Submit
            </Button>{" "}
          </div>
        </Box>
      </Modal>
    </div>
  );
}

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

export default function EditProfile({ refreshData, rowData }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    test_id: rowData?.test_id || "",
    test_name: rowData?.test_name || "",
    test_cost: rowData?.test_cost || "",
    updateion: rowData?.updateion || "",
    lab_id: rowData?.lab_id || ""
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const EditEmployeeData = async () => {
    try {
      const response = await axios.put(
        `http://localhost:4000/testupdate/${formData.test_id}`,
        formData
      );

      console.log("Employee updated:", response.data);
      handleClose();
      refreshData();
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
            label="Test ID"
            variant="filled"
            value={formData.test_id}
            onChange={(e) => {
              setFormData((prevFormData) => ({
                ...prevFormData,
                test_id: e.target.value,
              }));
            }}
            style={{ marginBottom: '1rem' }}
          />
          <TextField
            fullWidth
            required
            label="Test Name"
            variant="filled"
            value={formData.test_name}
            onChange={(e) => {
              setFormData({ ...formData, test_name: e.target.value });
            }}
            style={{ marginBottom: '1rem' }}
          />
          <TextField
            fullWidth
            label="Test Cost"
            variant="filled"
            value={formData.test_cost}
            onChange={(e) => {
              setFormData({ ...formData, test_cost: e.target.value });
            }}
            style={{ marginBottom: '1rem' }}
          />
          <TextField
            fullWidth
            label="Updateion"
            variant="filled"
            value={formData.updateion}
            onChange={(e) => {
              setFormData({ ...formData, updateion: e.target.value });
            }}
            style={{ marginBottom: '1rem' }}
          />
          <TextField
            fullWidth
            label="Lab ID"
            variant="filled"
            value={formData.lab_id}
            onChange={(e) => {
              setFormData({ ...formData, lab_id: e.target.value });
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
                type="button"
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
                type="button"
                variant="contained"
                onClick={EditEmployeeData}
                style={{
              
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

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
    test_id: "",
    test_name: "",
    test_cost:"",
    updateion:"",
    lab_id:""


};

export default function AddTestModal({ refreshData }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(initialValue);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const AddTestData = async () => {
    const response = await axios.post(
      "http://localhost:4000/testpost",
      formData
    );
    handleClose();
    refreshData();
  };

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Add Test
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h5" gutterBottom style={{textAlign:"center",marginBottom:"20px"}}>
            Add Test
          </Typography>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <InputLabel style={{width:"20%"}} htmlFor="test-id">Test Id ID</InputLabel>
            <TextField
              style={{ marginBottom: "16px",width:"80%" }}
              required
              id="test_id"
              variant="filled"
              onChange={(e) => {
                setFormData({ ...formData, test_id: e.target.value });
              }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <InputLabel style={{width:"20%"}} htmlFor="test-name">Test Name</InputLabel>
            <TextField
              
              required
              id="test-name"
              variant="filled"
              style={{ marginBottom: "16px",width:"80%" }}
              onChange={(e) => {
                setFormData({ ...formData, test_name: e.target.value });
              }}
            />
          </div>


          <div style={{ display: "flex", flexDirection: "row" }}>
            <InputLabel style={{width:"20%"}} htmlFor="test-cost">Test Cost</InputLabel>
            <TextField
              style={{ marginBottom: "16px",width:"80%" }}
              required
              id="test-cost"
              variant="filled"
              onChange={(e) => {
                setFormData({ ...formData, test_cost: e.target.value });
              }}
            />
          </div>


          <div style={{ display: "flex", flexDirection: "row" }}>
            <InputLabel style={{width:"20%"}} htmlFor="updateion">Updateion</InputLabel>
            <TextField
              style={{ marginBottom: "16px",width:"80%" }}
              required
              id="updateion"
              variant="filled"
              onChange={(e) => {
                setFormData({ ...formData, updateion: e.target.value });
              }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "row" }}>
            <InputLabel style={{width:"20%"}} htmlFor="lab_id">lab_id</InputLabel>
            <TextField
              style={{ marginBottom: "16px",width:"80%" }}
              required
              id="lab_id"
              variant="filled"
              onChange={(e) => {
                setFormData({ ...formData, lab_id: e.target.value });
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
            <Button type="submit" variant="contained" onClick={AddTestData}>
              Submit
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Stack from "@mui/material/Stack";
import AddLabsModal from "./AddLabsForm";
import EditLabModal from "./EditLabsForm";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import swal from "sweetalert";
import axios from "axios";

function LabsList() {
  const [data, setData] = useState([]);
  const [records, setRecords] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:4000/labget");
      setData(response.data);
      setRecords(response.data);
    };
    fetchData();
  }, []);

  const Filter = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setRecords(data.filter((f) => f.lab_id.toLowerCase().includes(searchTerm)));
    setCurrentPage(1); // Reset to the first page after filtering
  };

  const refreshData = async () => {
    const response = await axios.get("http://localhost:4000/labget");
    setData(response.data);
    setRecords(response.data);
    setCurrentPage(1); // Reset to the first page after refreshing
  };

  const deleteData = async (id) => {
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this lab?",
      icon: "warning",
      buttons: ["Cancel", "Delete"],
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          await axios.delete(`http://localhost:4000/labdelete/${id}`);
          swal("Deleted!", "Your lab has been deleted!", "success");
          refreshData();
        } catch (error) {
          swal("Error!", "There was a problem deleting your lab.", "error");
        }
      }
    });
  };

  const indexOfLastRecord = currentPage * rowsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - rowsPerPage;
  const currentRecords = records.slice(indexOfFirstRecord, indexOfLastRecord);

  const totalPages = Math.ceil(records.length / rowsPerPage);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => (prev === 1 ? prev : prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev === totalPages ? prev : prev + 1));
  };

  const handlePageSelect = (event) => {
    setCurrentPage(event.target.value);
  };

  return (
    <>
      <div style={{ margin: "10px" }}>
        <div
          style={{
            maxWidth: "300px",
            backgroundColor: "#c4f5c7",
            borderRadius: "10px",
          }}
        >
          <h1>Labs List </h1>
        </div>
      </div>
      <div>
        <Row>
          <Col>
            <Form.Control
              style={{ width: "300px" }}
              type="text"
              onChange={Filter}
              placeholder="Search"
            />
          </Col>
          <Col style={{ display: "flex", justifyContent: "flex-end" }}>
            <Stack spacing={2}>
              <AddLabsModal refreshData={refreshData} />
            </Stack>
          </Col>
        </Row>
      </div>
      <TableContainer component={Paper} style={{ marginTop: "20px" }}>
        <Table
          sx={{ minWidth: 650,
            background: 'linear-gradient(45deg, #c4f5c7 10%, #87CEEB 100%, #FF8E53 5%)' ,border: "20px" }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow style={{ backgroundColor: "#50BFFE" }}>
              <TableCell>lab_id</TableCell>
              <TableCell>lab_name</TableCell>
              <TableCell>room_id</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentRecords.map((row) => (
              <TableRow
                key={row.lab_id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.lab_id}
                </TableCell>
                <TableCell>{row.lab_name}</TableCell>
                <TableCell>{row.room_id}</TableCell>
                <TableCell
                  align="left"
                  style={{ display: "flex", justifyContent: "center", float:"end"  }}
                >
                  <span onClick={() => deleteData(row.lab_id)}>
                    <DeleteForeverIcon />
                  </span>
                  <EditLabModal
                    refreshData={refreshData}
                    rowData={{
                      lab_id: row.lab_id,
                      lab_name: row.lab_name,
                      room_id: row.room_id,
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div
      
        style={{
          
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
          gap: 10,
        }}
      >
        <Button
          variant="contained"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          &lt;
        </Button>
        <Select value={currentPage} onChange={handlePageSelect}>
          {Array.from({ length: totalPages }, (_, index) => (
            <MenuItem key={index + 1} value={index + 1}>
              {index + 1}
            </MenuItem>
          ))}
        </Select>
        <Button
          variant="contained"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          &gt;
        </Button>
      </div>
    </>
  );
}

export default LabsList;

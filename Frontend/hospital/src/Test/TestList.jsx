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
import AddTestModal from "./AddTestForm";
import EditTestModal from "./EditTestform";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import swal from "sweetalert";
import axios from "axios";

function TestList() {
  // State for holding the fetched room data
  const [data, setData] = useState([]);
  const [records, setRecords] = useState([]);
  // State for managing the current page in pagination
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5; // Number of rows to display per page

  // Fetch data from the server when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/testget");
        console.log("API response:", response.data); // Log the API response
        setData(response.data);
        setRecords(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Log state updates
  useEffect(() => {
    console.log("Data state updated:", data);
  }, [data]);

  // Filter function to search records based on test_id
  const Filter = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setRecords(data.filter((f) => f.test_id.toLowerCase().includes(searchTerm)));
    setCurrentPage(1); // Reset to the first page after filtering
  };

  // Function to refresh the data by fetching from the server again
  const refreshData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/testget");
      setData(response.data);
      setRecords(response.data);
      setCurrentPage(1); 
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
  };

  const deleteData = async (id) => {
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this test?",
      icon: "warning",
      buttons: ["Cancel", "Delete"],
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          await axios.delete(`http://localhost:4000/testdelete/${id}`);
          swal("Deleted!", "Your test has been deleted!", "success");
          refreshData();
        } catch (error) {
          swal("Error!", "There was a problem deleting your test.", "error");
        }
      }
    });
  };

  // Calculate the indices for the current page's records
  const indexOfLastRecord = currentPage * rowsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - rowsPerPage;
  const currentRecords = records.slice(indexOfFirstRecord, indexOfLastRecord);

  // Calculate total number of pages
  const totalPages = Math.ceil(records.length / rowsPerPage);

  // Function to handle the previous page button click
  const handlePreviousPage = () => {
    setCurrentPage((prev) => (prev === 1 ? prev : prev - 1));
  };

  // Function to handle the next page button click
  const handleNextPage = () => {
    setCurrentPage((prev) => (prev === totalPages ? prev : prev + 1));
  };

  // Function to handle page selection from dropdown
  const handlePageSelect = (event) => {
    setCurrentPage(event.target.value);
  };

  return (
    <>
      <div style={{ margin: "10px" }}>
        <div style={{ maxWidth: "300px",background: 'linear-gradient(45deg, #c4f5c7 10%, #87CEEB 100%, #FF8E53 5%)', borderRadius: "10px" }}>
          <h1>Test List </h1>
        </div>
      </div>
      <div>
        <Row>
          <Col>
            <Form.Control
              style={{ width: "300px" }}
              type="text"
              onChange={Filter}
              placeholder="Search" ////// search bar
            />
          </Col>
          <Col style={{ display: "flex", justifyContent: "flex-end" }}>
            <Stack spacing={2}>
              <AddTestModal refreshData={refreshData} />
            </Stack>
          </Col>
        </Row>
      </div>
      <TableContainer component={Paper} style={{ marginTop: "20px" }}>
        <Table sx={{ minWidth: 650,
                    background: 'linear-gradient(45deg, #c4f5c7 10%, #87CEEB 100%, #FF8E53 5%)', border: "20px" }} aria-label="simple table">
          <TableHead>
            <TableRow style={{ backgroundColor: "#50BFFE" }}>
              <TableCell>Test Id</TableCell>
              <TableCell>Test Name</TableCell>
              <TableCell>Test Cost</TableCell>
              <TableCell>Updateion</TableCell>
              <TableCell>Lab Id</TableCell>
              
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentRecords.map((row) => (
              <TableRow key={row.test_id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row.test_id}
                </TableCell>
                <TableCell>{row.test_name}</TableCell>
                <TableCell>{row.test_cost}</TableCell>
                <TableCell>{row.updateion}</TableCell>
                <TableCell>{row.lab_id}</TableCell>

                <TableCell align="right" style={{ display: "flex", justifyContent: "center" }}>
                  <span onClick={() => deleteData(row.test_id)}>
                    <DeleteForeverIcon />
                  </span>
                  <EditTestModal refreshData={refreshData} rowData={{ test_id: row.test_id, test_name: row.test_name, test_cost: row.test_cost, updateion: row.updateion, lab_id: row.lab_id }} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "20px", gap: 10 }}>
        <Button variant="contained" onClick={handlePreviousPage} disabled={currentPage === 1}>
          &lt;
        </Button>
        <Select value={currentPage} onChange={handlePageSelect}>
          {Array.from({ length: totalPages }, (_, index) => (
            <MenuItem key={index + 1} value={index + 1}>
              {index + 1}
            </MenuItem>
          ))}
        </Select>
        <Button variant="contained" onClick={handleNextPage} disabled={currentPage === totalPages}>
          &gt;
        </Button>
      </div>
    </>
  );
}

export default TestList;

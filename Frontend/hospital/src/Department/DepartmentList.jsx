import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import axios from "axios";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Stack from "@mui/material/Stack";
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import AddDepartmentModal from "./AddDepartmentForm";
import EditDepartmentModal from "./EditDepartmentForm";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import swal from "sweetalert";

function DepartmentList() {
  const [data, setData] = useState([]);
  const [records, setRecords] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10); // You can adjust this value

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:4000/departmentget");
      setData(response.data);
      setRecords(response.data); // Initialize records with fetched data
    };
    fetchData();
  }, []);

  const Filter = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setRecords(data.filter((f) => f.room_id.toLowerCase().includes(searchTerm)));
    setCurrentPage(1); // Reset to the first page after filtering
  };

  const refreshData = async () => {
    const response = await axios.get("http://localhost:4000/departmentget");
    setData(response.data);
    setRecords(response.data); // Refresh records with fetched data
  };

  const deleteData = async (department_id) => {
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this data?",
      icon: "warning",
      buttons: ["Cancel", "Delete"],
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          await axios.delete(`http://localhost:4000/departmentdelete/${department_id}`);
          swal("Deleted!", "Your data has been deleted!", "success");
          refreshData();
        } catch (error) {
          swal("Error!", "There was a problem deleting your data.", "error");
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
        <div style={{ maxWidth: "300px", background: 'linear-gradient(45deg, #c4f5c7 10%, #87CEEB 100%, #FF8E53 5%)' , borderRadius: "10px" }}>
          <h1>Department List</h1>
        </div>
        <div>
          <Row>
            <Col>
              <Form.Control
                style={{ width: '300px' }}
                type="text"
                placeholder="Search"
                onChange={Filter}
              />
            </Col>
            <Col style={{ display: "flex", justifyContent: "flex-end" }}>
              <Stack spacing={2}>
                <AddDepartmentModal refreshData={refreshData} />
              </Stack>
            </Col>
          </Row>
        </div>
        <TableContainer component={Paper} style={{ marginTop: '20px' }}>
          <Table sx={{ minWidth: 650, background: 'linear-gradient(45deg, #c4f5c7 10%, #87CEEB 100%, #FF8E53 5%)' , border: "20px" }} aria-label="simple table">
            <TableHead>
              <TableRow style={{ backgroundColor: "#50BFFE" }}>
                <TableCell>Department Id</TableCell>
                <TableCell>Department Name</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentRecords.map((row) => (
                <TableRow
                  key={row.department_id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.department_id}
                  </TableCell>
                  <TableCell>{row.department_name}</TableCell>
                  <TableCell align="right" style={{ display: "flex", justifyContent: "center" }}>
                    <span
                      onClick={() => {
                        deleteData(row.department_id);
                      }}
                    >
                      <DeleteForeverIcon />
                    </span>
                    <EditDepartmentModal refreshData={refreshData} rowData={{ id: row.department_id, name: row.department_name }} />
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
      </div>
    </>
  );
}

export default DepartmentList;

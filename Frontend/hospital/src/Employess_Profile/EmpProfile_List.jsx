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
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import swal from "sweetalert";
import axios from "axios";
import EditProfile from "./EditProfileModel";
import AddProfileModal from "./AddProfileModel";



function ProfileList() {
  const [data, setData] = useState([]);
  console.log(data)
  const [records, setRecords] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const fetchData = async () => {
    const response = await axios.get(
      "http://localhost:4000/emp_profileget"
    );
    setData(response.data);
    setRecords(response.data);
  };
  useEffect(() => {
    fetchData();
 
  }, []);



  const Filter = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setRecords(data.filter((f) => f.emp_id.toLowerCase().includes(searchTerm)));
    setCurrentPage(1); 
  };


  const deleteData = async (id) => {
    const willDelete = await swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this data?",
      icon: "warning",
      buttons: ["Cancel", "Delete"],
      dangerMode: true,
    });
  
    if (willDelete) {
      try {
        await axios.delete(`http://localhost:4000/emp_profiledelete/${id}`);
        swal("Deleted!", "Your data has been deleted.", "success");
      } catch (error) {
        swal("Error!", "There was a problem deleting your data.", "error");
      }
    }
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
      
        <div class='text-3xl text-slate-700 text-center font-serif font-medium'>
          <h1>Employee Profile</h1>
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
            <AddProfileModal  fetchData={fetchData} />
            </Stack>
          </Col>
        </Row>
      </div>
      <TableContainer component={Paper} style={{ marginTop: "20px" }}>
        <Table
          sx={{ minWidth: 650,
            background: 'linear-gradient(45deg, #c4f5c7 10%, #87CEEB 100%, #FF8E53 5%)', border: "20px" }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow style={{ backgroundColor: "#50BFFE" }}>
              <TableCell>Profile</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>DOB</TableCell>
              <TableCell>Qualification</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Mobile</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Address</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            
            {currentRecords.map((row) => (
              <TableRow
                key={row.emp_id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                <img src={row.image} alt="" width='58' height='50' style={{borderRadius:'10rem'}} />

                </TableCell>
               
                <TableCell>{row.emp_name}</TableCell>
                <TableCell>{row.dob}</TableCell>
                <TableCell>{row.qualification}</TableCell>
                <TableCell>{row.gender}</TableCell>
                <TableCell>{row.mobile}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.address}</TableCell>
                
                
              
                <TableCell
                  align="right"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <span onClick={() => deleteData(row.emp_id)}>
                    <DeleteForeverIcon />
                  </span>
                  <EditProfile
                    fetchData= {fetchData}
                    rowData={ row }
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

export default ProfileList;
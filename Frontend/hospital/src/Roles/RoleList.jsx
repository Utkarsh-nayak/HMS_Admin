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
import AddRoleModal from "./AddRoleForm";
import EditRoleModal from "./EditRoleForm";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import swal from "sweetalert";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";


function RoleList() {
  const [data, setData] = useState([]);
  const[records,setRecords]=useState([])

   // State for managing the current page in pagination
   const [currentPage, setCurrentPage] = useState(1);
   const rowsPerPage = 5; // Number of rows to display per page
 

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:4000/roleget");
      setData(response.data);
      setRecords(response.data);
    };
    fetchData();
  }, []);
  /////search table by name/////
  const Filter = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setRecords(data.filter(f => f.role_id.toLowerCase().includes(searchTerm))) || setRecords(data.filter(f => f.role_name.toLowerCase().includes(searchTerm)));
  };
  

  const refreshData = async () => {
    const response = await axios.get("http://localhost:4000/roleget");
    setData(response.data);
    setRecords(response.data);
  };
  const deleteData = async (id) => {
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this data?",
      icon: "warning",
      buttons: ["Cancel", "Delete"],
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
    const response = await axios.delete(
      `http://localhost:4000/roledelete/${id}`
    );
    swal("Deleted!", "Your data has been deleted!", "success");
          refreshData();
        } catch (error) {
          swal("Error!", "There was a problem deleting your data.", "error");
        }
      }
      refreshData();
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
    <div style={{margin: "10px"}}>
    <div style={{maxWidth:"300px",background: 'linear-gradient(45deg, #c4f5c7 10%, #87CEEB 100%, #FF8E53 5%)' ,borderRadius:"10px"}}>
     <h1>Role List </h1>
     </div>
     </div>
    <div>
      
        <Row>
          <Col>
            <Form.Control
            style={{width:'300px'}}
              type="text"
              onChange={Filter}placeholder="Search"
             
              
            
            />
          </Col>
          
      <Col style={{display:"flex",justifyContent:"flex-end"}}>     
       <Stack spacing={2} >
        <AddRoleModal refreshData={refreshData} />
      </Stack>
      </Col>
      </Row>
      </div>
      <TableContainer component={Paper}style={{marginTop:'20px'}} >
        <Table sx={{ minWidth: 650 , background: 'linear-gradient(45deg, #c4f5c7 10%, #87CEEB 100%, #FF8E53 5%)' ,border:"20px"}} aria-label="simple table">
          <TableHead>
            <TableRow style={{backgroundColor:"#50BFFE"}}>
              <TableCell>RoleId</TableCell>
              <TableCell>Role Name</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentRecords.map((row) => (
              <TableRow
                key={row.role_id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.role_id}
                </TableCell>
                <TableCell>{row.role_name}</TableCell>
                <TableCell align="right" style={{display:"flex",justifyContent:"center"}}>
                  <EditRoleModal refreshData={refreshData} rowData={{id : row.role_id, name : row.role_name}}/>
                  <span
                    onClick={() => {
                      deleteData(row.role_id);
                    }}
                  >
                    <DeleteForeverIcon />
                  </span>
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

export default RoleList;

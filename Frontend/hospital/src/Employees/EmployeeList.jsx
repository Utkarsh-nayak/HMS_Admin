// Import necessary libraries and components from React, MUI, Bootstrap, and other dependencies
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
import AddRoomModal from "./AddEmployeeForm";
import EditRoomModal from "./EditEmployeeForm";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import swal from "sweetalert";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { MdPreview } from "react-icons/md";

// Define styles for the modal
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  background: "linear-gradient(45deg, #c4f5c7 10%, #87CEEB 100%, #FF8E53 5%)",
  boxShadow: 24,
  p: 4,
};

function EmployeeList() {
  // State variables to manage data, pagination, and form inputs
  const [data, setData] = useState([]);
  const [records, setRecords] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // Fetch employee data
  const fetchData = async () => {
    const response = await axios.get("http://localhost:4000/employessget");
    setData(response.data);
    setRecords(response.data);
  };

  // Fetch data and roles
  useEffect(() => {
    fetchData();
    getroles();
  }, []);

  // State variables to manage role assignment form
  const [postrole, setpostroles] = useState("");
  const [postRoleName, setroleName] = useState("");
  const [empidget, setempidget] = useState("");

  // Function to set role assignment form data
  function postroledata(role_id, role_name, emp_id) {
    setpostroles(role_id);
    setroleName(role_name);
    setempidget(emp_id);
  }

  // Data to be posted for role assignment
  const postdata = {
    role_id: postrole,
    emp_id: empidget,
  };

  // Handler to role_assignpost
  const handlerolepost = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      "http://localhost:4000/role_assignpost",
      postdata
    );
    try {
      console.log(res.data);
      fetchData(); // Refresh data after posting
      console.log("data posted");
      handleClose(); // Close the modal
    } catch (err) {
      console.log("data not insert", err);
    }
  };

  // Filter employee data based on search term
  const Filter = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setRecords(data.filter((f) => f.emp_id.toLowerCase().includes(searchTerm)));
    setCurrentPage(1); // Reset to the first page after filtering
  };

  // Refresh employee data
  const refreshData = async () => {
    const response = await axios.get("http://localhost:4000/employessget");
    setData(response.data);
    setRecords(response.data);
    setCurrentPage(1); // Reset to the first page after refreshing
  };

  // State variable to manage roles
  const [roles, setroles] = useState([]);

  // Fetch roles data
  const getroles = async () => {
    try {
      const res = await axios.get("http://localhost:4000/roleget");
      setroles(res.data);
      console.log(res.data);
    } catch (err) {
      console.log("err", err);
    }
  };

  // Delete employee data with sweet alert
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
          await axios.delete(`http://localhost:4000/employessdelete/${id}`);
          swal("Deleted!", "Your data has been deleted!", "success");
          refreshData();
        } catch (error) {
          swal("Error!", "There was a problem deleting your data.", "error");
        }
      }
    });
  };

  // Pagination logic
  const indexOfLastRecord = currentPage * rowsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - rowsPerPage;
  const currentRecords = records.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(records.length / rowsPerPage);

  //pagination controls
  const handlePreviousPage = () => {
    setCurrentPage((prev) => (prev === 1 ? prev : prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev === totalPages ? prev : prev + 1));
  };

  const handlePageSelect = (event) => {
    setCurrentPage(event.target.value);
  };

  // State variables to manage the modal visibility
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //////role delete model ///

  const [open1, setOpen1] = useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);
  const [rolesDelete, setrolesDelete] = useState([]);
  const [empid, setempid] = useState([]);

  function DeleteRole(emp_id, role_id) {
    setempid(emp_id);
    setrolesDelete(role_id);
  }
  const RoleDelete = {
    emp_id: empid,
    role_id: rolesDelete,
  };
  const handlerolesDelete = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      "http://localhost:4000/role_assigndelete",
      RoleDelete
    );
    try {
      console.log(res.data);
      fetchData(); // Refresh data after posting
      console.log("data posted");
      handleClose1(); // Close the modal
    } catch (err) {
      console.log("data not insert", err);
    }
  };
  const [Profile, setProfile] = useState([]);
  console.log(Profile);
  async function Getprofile(k) {
    try {
      let res = await axios.get(
        `http://localhost:4000/emp_profileGetbyid/${k}`
      );
      setProfile(res.data);
    } catch (err) {
      console.log("Error", err);
    }
  }

  const [open5, setOpen5] = React.useState(false);
  const handleOpen5 = (emp_id) => {
    setOpen5(true);
    Getprofile(emp_id);
  };
  const handleClose5 = () => setOpen5(false);
  return (
    <>
     <Modal
  open={open5}
  onClose={handleClose5}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={{
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
    width: '80%', // Adjust width as needed
    maxWidth: '600px', // Adjust maximum width as needed
    margin: 'auto', // Center align the modal content
    fontFamily: 'Arial, sans-serif',
  }}>
    {Profile.map((item, index) => (
      <div key={index} style={{
        display: 'flex',
        justifyContent:'space-between',
        flexDirection: 'column',
        justifyContent:'end',
        marginBottom: '20px',

        marginBottom: '20px', // Space between each profile section
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        background: 'linear-gradient(45deg, #c4f5c7 10%, #87CEEB 100%, #FF8E53 5%)',
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'scale(1.02)',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
        },
      }}>
        <div style={{
          marginBottom: '20px',   display: 'flex',
          justifyContent:'space-between',// Space between heading and value
        }}>
          <h2 style={{ margin: 0, fontSize: '1.4em', color: '#333', letterSpacing: '1px', display:'flex',justifyContent: 'space-between' , textTransform: 'uppercase' }}>EmpName</h2>
          <h3 style={{ margin: 0, fontSize: '1.2em', color: '#666', fontWeight: 'normal', lineHeight: '1.4' }}>{item.emp_name}</h3>
        </div>
        <div style={{
          marginBottom: '15px' , display: 'flex',
          justifyContent:'space-between', // Space between heading and value
        }}>
          <h2 style={{ margin: 0, fontSize: '1.4em', color: '#333', letterSpacing: '1px', textTransform: 'uppercase' }}>Empid</h2>
          <h3 style={{ margin: 0, fontSize: '1.2em', color: '#666', fontWeight: 'normal', lineHeight: '1.4' }}>{item.emp_id}</h3>
        </div>
        <div style={{
          marginBottom: '15px',  display: 'flex',
          justifyContent:'space-between', // Space between heading and value
        }}>
          <h2 style={{ margin: 0, fontSize: '1.4em', color: '#333', letterSpacing: '1px', textTransform: 'uppercase' }}>DOB</h2>
          <h3 style={{ margin: 0, fontSize: '1.2em', color: '#666', fontWeight: 'normal', lineHeight: '1.4' }}>{item.dob}</h3>
        </div>
        <div style={{
          marginBottom: '15px',   display: 'flex',
          justifyContent:'space-between',// Space between heading and value
        }}>
          <h2 style={{ margin: 0, fontSize: '1.4em', color: '#333', letterSpacing: '1px', textTransform: 'uppercase' }}>Qualification</h2>
          <h3 style={{ margin: 0, fontSize: '1.2em', color: '#666', fontWeight: 'normal', lineHeight: '1.4' }}>{item.qualification}</h3>
        </div>
        <div style={{
          marginBottom: '15px',  display: 'flex',
          justifyContent:'space-between', // Space between heading and value
        }}>
          <h2 style={{ margin: 0, fontSize: '1.4em', color: '#333', letterSpacing: '1px', textTransform: 'uppercase' }}>Gender</h2>
          <h3 style={{ margin: 0, fontSize: '1.2em', color: '#666', fontWeight: 'normal', lineHeight: '1.4' }}>{item.gender}</h3>
        </div>
        <div style={{
          marginBottom: '15px',  display: 'flex',
          justifyContent:'space-between', // Space between heading and value
        }}>
          <h2 style={{ margin: 0, fontSize: '1.4em', color: '#333', letterSpacing: '1px', textTransform: 'uppercase' }}>Mobile</h2>
          <h3 style={{ margin: 0, fontSize: '1.2em', color: '#666', fontWeight: 'normal', lineHeight: '1.4' }}>{item.mobile}</h3>
        </div>
        <div style={{
          marginBottom: '15px',  display: 'flex',
          justifyContent:'space-between', // Space between heading and value
        }}>
          <h2 style={{ margin: 0, fontSize: '1.4em', color: '#333', letterSpacing: '1px', textTransform: 'uppercase' }}>Email</h2>
          <h3 style={{ margin: 0, fontSize: '1.2em', color: '#666', fontWeight: 'normal', lineHeight: '1.4' }}>{item.email}</h3>
        </div>
        <div style={{
          marginBottom: '0', // No space at the end
        }}>
          <h2 style={{ margin: 0, fontSize: '1.4em', color: '#333', letterSpacing: '1px', textTransform: 'uppercase' }}>Address</h2>
          <h3 style={{ margin: 0, fontSize: '1.2em', color: '#666', fontWeight: 'normal', lineHeight: '1.4', whiteSpace: 'pre-wrap' }}>{item.address}</h3>
        </div>
      </div>
    ))}
  </Box>
</Modal>


      <div style={{ margin: "10px" }}>
        <div
          style={{
            maxWidth: "300px",
            background:
              "linear-gradient(45deg, #c4f5c7 10%, #87CEEB 100%, #FF8E53 5%)",
            borderRadius: "10px",
          }}
        >
          <h1>Employee List </h1>
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
              <AddRoomModal refreshData={refreshData} />
            </Stack>
          </Col>
        </Row>
      </div>
      <TableContainer component={Paper} style={{ marginTop: "20px" }}>
        <Table
          sx={{
            minWidth: 650,
            background:
              "linear-gradient(45deg, #c4f5c7 10%, #87CEEB 100%, #FF8E53 5%)",
            border: "20px",
          }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow style={{ backgroundColor: "#50BFFE" }}>
              <TableCell>Employee Id</TableCell>
              <TableCell>Employee Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Department Id</TableCell>
              <TableCell>Role Name</TableCell>
              <TableCell>Role Assign</TableCell>
              <TableCell align="end">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentRecords.map((row) => (
              <TableRow
                key={row.emp_id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.emp_id}
                </TableCell>
                <TableCell>{row.emp_name}</TableCell>
                <TableCell>{row.emp_email}</TableCell>
                <TableCell>{row.department_id}</TableCell>
                <TableCell>{row.roles}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    onClick={() => {
                      handleOpen(
                        postroledata(row.role_id, row.role_name, row.emp_id)
                      );
                    }}
                  >
                    Role Assign
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => {
                      handleOpen1(DeleteRole(row.role_id, row.emp_id));
                    }}
                  >
                    Role delete
                  </Button>
                </TableCell>
                <TableCell>
                  <Button onClick={() => handleOpen5(row.emp_id)}>
                    <MdPreview />
                  </Button>

                  <span onClick={() => deleteData(row.emp_id)}>
                    <DeleteForeverIcon />
                  </span>
                  <EditRoomModal
                    refreshData={refreshData}
                    rowData={{ id: row.emp_id, name: row.emp_name }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

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
              Assign Role
            </Typography>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <TextField
                fullWidth
                required
                label="Employees Id"
                variant="filled"
                value={empidget}
                onChange={(e) => {
                  setempidget(e.target.value);
                }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <select
                value={postrole}
                onChange={(e) => {
                  setpostroles(e.target.value);
                }}
                style={{
                  borderRadius: "12px",
                  height: "40px",
                  border: "none",
                }}
              >
                <option value="">select a role </option>
                {roles.map((role) => (
                  <option key={role.role_id} value={role.role_id}>
                    {role.role_name}
                  </option>
                ))}
              </select>
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
                onClick={handlerolepost}
              >
                Submit
              </Button>
            </div>
          </Box>
        </Modal>

        <Modal
          open={open1}
          onClose={handleClose1}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography
              variant="h5"
              gutterBottom
              style={{ textAlign: "center", marginBottom: "20px" }}
            ></Typography>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <TextField
                fullWidth
                required
                label="Employees Id"
                variant="filled"
                value={empid}
                onChange={(e) => {
                  setempid(e.target.value);
                }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "row" }}>
              <select
                value={rolesDelete}
                onChange={(e) => {
                  setrolesDelete(e.target.value);
                }}
                style={{
                  borderRadius: "12px",
                  height: "40px",
                  border: "none",
                }}
              >
                <option value="">select a role </option>
                {roles.map((role) => (
                  <option key={role.role_id} value={role.role_id}>
                    {role.role_name}
                  </option>
                ))}
              </select>
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
                onClick={handlerolesDelete}
              >
                Submit
              </Button>
            </div>
          </Box>
        </Modal>

        <Modal
          open={open1}
          onClose={handleClose1}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography
              variant="h5"
              gutterBottom
              style={{ textAlign: "center", marginBottom: "20px" }}
            >
              Assign Delete
            </Typography>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <TextField
                fullWidth
                required
                label="Employees Id"
                variant="filled"
                value={empid}
                onChange={(e) => {
                  setempid(e.target.value);
                }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "row" }}>
              <select
                value={rolesDelete}
                onChange={(e) => {
                  setrolesDelete(e.target.value);
                }}
                style={{
                  borderRadius: "12px",
                  height: "40px",
                  border: "none",
                }}
              >
                <option value="">select a role </option>
                {roles.map((role) => (
                  <option key={role.role_id} value={role.role_id}>
                    {role.role_name}
                  </option>
                ))}
              </select>
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
                onClick={handlerolesDelete}
              >
                Submit
              </Button>
            </div>
          </Box>
        </Modal>
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

export default EmployeeList;

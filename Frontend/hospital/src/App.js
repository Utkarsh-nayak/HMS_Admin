import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider, AuthContext } from './contexts/AuthContext';
import Dashboard from './Dashboard/Components/Dashboard';
import Drawer1 from './Dashboard/Components/Drawer';
import RoomList from './Room/RoomList';
import DepartmentList from './Department/DepartmentList';
import RoleList from './Roles/RoleList';
import LabsList from './Labs/LabsList';
import TestList from './Test/TestList';
import EmployeeList from './Employees/EmployeeList';
import EmpProfile_List from './Employess_Profile/EmpProfile_List';
import PatientList from './PatientList/PatientList';
import TreatmentList from './Treatment/TreatmentList';
import PrescriptionList from './Prescription/PrescriptionList';
import TestReport_List from './Test_report/TestReport_List';
import Login from './Auth/Login';
import Register from './Auth/Register';

import './App.css';

function App() {
  const { isAuthenticated, loading } = useContext(AuthContext);

  const PrivateRoute = ({ children }) => {
    if (loading) {
      return <div>Loading...</div>; // or a loading spinner
    }
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<PrivateRoute><Drawer1 page={<Dashboard />} /></PrivateRoute>} />
          <Route path="/room" element={<PrivateRoute><Drawer1 page={<RoomList />} /></PrivateRoute>} />
          <Route path="/department" element={<PrivateRoute><Drawer1 page={<DepartmentList />} /></PrivateRoute>} />
          <Route path="/roles" element={<PrivateRoute><Drawer1 page={<RoleList />} /></PrivateRoute>} />
          <Route path="/Labs" element={<PrivateRoute><Drawer1 page={<LabsList />} /></PrivateRoute>} />
          <Route path="/test" element={<PrivateRoute><Drawer1 page={<TestList />} /></PrivateRoute>} />
          <Route path="/employees" element={<PrivateRoute><Drawer1 page={<EmployeeList />} /></PrivateRoute>} />
          <Route path="/emp_profile" element={<PrivateRoute><Drawer1 page={<EmpProfile_List />} /></PrivateRoute>} />
          <Route path="/patientlist" element={<PrivateRoute><Drawer1 page={<PatientList />} /></PrivateRoute>} />
          <Route path="/treatement" element={<PrivateRoute><Drawer1 page={<TreatmentList />} /></PrivateRoute>} />
          <Route path="/Prescription" element={<PrivateRoute><Drawer1 page={<PrescriptionList />} /></PrivateRoute>} />
          <Route path="/test_report" element={<PrivateRoute><Drawer1 page={<TestReport_List />} /></PrivateRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

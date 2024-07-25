import {BrowserRouter,Routes,Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
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

import './App.css'

function App() {
return (
<>
<BrowserRouter>
<Routes>
<Route path='/' element={<Drawer1 page={<Dashboard/>}/>}/>
<Route path='/room' element={<Drawer1 page={<RoomList/>}/>} ></Route>
<Route path='/department' element={<Drawer1 page={<DepartmentList/>}/>} ></Route>
<Route path='/roles' element={<Drawer1 page={<RoleList/>}/>}></Route>
<Route path='/Labs' element={<Drawer1 page={<LabsList/>}/>}></Route>
<Route path='/test' element={<Drawer1 page={<TestList/>}/>}></Route>
<Route path='/employees' element={<Drawer1 page={<EmployeeList/>}/>} ></Route>
<Route path= '/emp_profile' element={<Drawer1 page={<EmpProfile_List/>}/>}></Route>
<Route path= '/patientlist' element={<Drawer1 page={<PatientList/>}/>}></Route>
<Route path= '/treatement' element={<Drawer1 page={<TreatmentList/>}/>}></Route>
<Route path= '/Prescription'element={<Drawer1 page={<PrescriptionList/>}/>}></Route>
<Route path= '/test_report' element={<Drawer1 page={<TestReport_List/>}/>}></Route>

   </Routes>
   </BrowserRouter>
  {/* <Drawer/> */}
   </>
  );
}
export default App;
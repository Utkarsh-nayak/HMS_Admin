import * as React from "react";
import { useContext,useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import BedroomParentIcon from "@mui/icons-material/BedroomParent";
import { HiOfficeBuilding } from "react-icons/hi";
import { IoPeopleSharp } from "react-icons/io5";
import { ImProfile } from "react-icons/im";
import { HiIdentification } from "react-icons/hi2";
import { PiFaceMask } from "react-icons/pi";
import { AiFillProfile } from "react-icons/ai";
import { FaHospitalUser } from "react-icons/fa";
import { FaFileMedical } from "react-icons/fa";
import { FaPrescriptionBottleAlt } from "react-icons/fa";
import { TbReportMedical } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import ProfileModal from "../../components/ProfileModal"

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  background: 'linear-gradient(45deg, #c4f5c7 10%, #87CEEB 100%, #FF8E53 5%)',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Drawer1({ page }) {
  // const navigate = useNavigate()

  // const card = ()=>{
  //   navigate('/card')
  // }

  // const room =()=>{

  //   navigate('dashboard/room')
  // }

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const { user, isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileOpen = () => {
    setProfileOpen(true);
    handleMenuClose();
  };

  const handleProfileClose = () => {
    setProfileOpen(false);
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        <Box style={{ display: "flex" }}>
          <CssBaseline />
          <AppBar position="fixed" open={open}>
            <Toolbar style={{ background: 'linear-gradient(45deg, #c4f5c7 10%, #87CEEB 100%, #FF8E53 5%)'}}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                  marginRight: 5,
                  ...(open && { display: "none" }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap sx={{ marginLeft: "auto" }}>
                Admin
              </Typography>
              {isAuthenticated && (
                <div>
                  <Typography variant="body1" sx={{ marginRight: 2 }}>
                    {user?.name}
                  </Typography>
                  <IconButton
                    color="inherit"
                    onClick={handleMenuOpen}
                    edge="end"
                  >
                    <img
                      src={
                        user?.avatar ||
                        "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg"
                      }
                      alt="Profile"
                      style={{ width: 40, height: 40, borderRadius: "50%" }}
                    />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                  >
                    <MenuItem onClick={handleProfileOpen}>Profile</MenuItem>{" "}
                    <MenuItem
                      onClick={async () => {
                        await handleMenuClose();
                        try {
                          await logout();
                          navigate("/login");
                          window.location.reload()
                        } catch (error) {
                          console.error("Login failed:", error);
                        }
                      }}
                    >
                      Logout
                    </MenuItem>
                  </Menu>
                </div>
              )}
              {/* <div style={{ marginLeft: "end", fontSize: "2rem" }}>
                <IconButton
                  sx={{
                    backgroundImage: `url(https://static.toiimg.com/thumb/msid-83808290,imgsize-119723,width-900,height-1200,resizemode-6/83808290.jpg)`,
                    backgroundSize: "cover",
                    backgroundposition: "center",
                  }}
                  className="w-22 h-12 rounded-full"
                  edge="end"
                  aria-lable="account of current user"
                  aria-controls="menu-app"
                  aria-haspopup="true"
                  color="inherit"
                  
                ></IconButton>
                <Menu
                  id="menu-appbar"
                  anchorOrigin={{
                    variant: "bottom",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    variant: "bottom",
                    horizontal: "right",
                  }}
                  open={Boolean}
                >
                  <MenuItem>
                    <h3>Profile</h3>
                  </MenuItem>
                  <MenuItem>
                    <h3>setting</h3>
                  </MenuItem>
                  <MenuItem>
                    <h3>logout</h3>
                  </MenuItem>
                </Menu>
              </div> */}
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={open}>
            <DrawerHeader>
              <img
                src="https://hospitalmanagementsystem.org/images/hospital-management-system-logo-dark.png"
                alt="logo"
                style={{ width: "150px" }}
              />
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === "rtl" ? (
                  <ChevronRightIcon />
                ) : (
                  <ChevronLeftIcon />
                )}
              </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
              {["Dashboard"].map((text, index) => (
                <ListItem
                  key={text}
                  disablePadding
                  sx={{ display: "block", height: "2.5vw" }}
                >
                  <NavLink className={"navlink"} to={"/"}>
                    <ListItemButton
                      sx={{
                        minHeight: 20,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        {index % 1 === 0 ? (
                          <MailIcon size={20} className="icoColr" />
                        ) : (
                          <MailIcon size={20} className="icoColr" />
                        )}
                      </ListItemIcon>
                      <ListItemText
                        primary={text}
                        sx={{ opacity: open ? 1 : 0 }}
                      />
                    </ListItemButton>
                  </NavLink>
                </ListItem>
              ))}
            </List>
            <Divider />

            <Divider />
            <List>
              {["Room"].map((text, index) => (
                <ListItem
                  key={text}
                  disablePadding
                  sx={{ display: "block", height: "2.5vw" }}
                >
                  <NavLink className={"navlink"} to={"/room"}>
                    <ListItemButton
                      sx={{
                        minHeight: 20,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        {index % 1 === 0 ? (
                          <BedroomParentIcon size={20} className="icoColr" />
                        ) : (
                          <BedroomParentIcon size={20} className="icoColr" />
                        )}
                      </ListItemIcon>
                      <ListItemText
                        primary={text}
                        sx={{ opacity: open ? 1 : 0 }}
                      />
                    </ListItemButton>
                  </NavLink>
                </ListItem>
              ))}
            </List>
            <Divider />

            <Divider />
            <List>
              {["Department"].map((text, index) => (
                <ListItem
                  key={text}
                  disablePadding
                  sx={{ display: "block", height: "2.5vw" }}
                >
                  <NavLink className={"navlink"} to={"/department"}>
                    <ListItemButton
                      sx={{
                        minHeight: 20,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        {index % 1 === 0 ? (
                          <HiOfficeBuilding size={20} className="icoColr" />
                        ) : (
                          <HiOfficeBuilding size={20} className="icoColr" />
                        )}
                      </ListItemIcon>
                      <ListItemText
                        primary={text}
                        sx={{ opacity: open ? 1 : 0 }}
                      />
                    </ListItemButton>
                  </NavLink>
                </ListItem>
              ))}
            </List>
            <Divider />

            <Divider />
            <List>
              {["Roles"].map((text, index) => (
                <ListItem
                  key={text}
                  disablePadding
                  sx={{ display: "block", height: "2.5vw" }}
                >
                  <NavLink className={"navlink"} to={"/roles"}>
                    <ListItemButton
                      sx={{
                        minHeight: 20,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        {index % 1 === 0 ? (
                          <IoPeopleSharp size={20} className="icoColr" />
                        ) : (
                          <IoPeopleSharp size={20} className="icoColr" />
                        )}
                      </ListItemIcon>
                      <ListItemText
                        primary={text}
                        sx={{ opacity: open ? 1 : 0 }}
                      />
                    </ListItemButton>
                  </NavLink>
                </ListItem>
              ))}
            </List>
            <Divider />

            <Divider />
            <List>
              {["Labs"].map((text, index) => (
                <ListItem
                  key={text}
                  disablePadding
                  sx={{ display: "block", height: "2.5vw" }}
                >
                  <NavLink className={"navlink"} to={"/labs"}>
                    <ListItemButton
                      sx={{
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        {index % 1 === 0 ? (
                          <ImProfile size={20} className="icoColr" />
                        ) : (
                          <ImProfile size={20} className="icoColr" />
                        )}
                      </ListItemIcon>
                      <ListItemText
                        primary={text}
                        sx={{ opacity: open ? 1 : 0 }}
                      />
                    </ListItemButton>
                  </NavLink>
                </ListItem>
              ))}
            </List>
            <Divider />
            <Divider />
            <List>
              {["Test"].map((text, index) => (
                <ListItem
                  key={text}
                  disablePadding
                  sx={{ display: "block", height: "2.5vw" }}
                >
                  <NavLink className={"navlink"} to={"/test"}>
                    <ListItemButton
                      sx={{
                        minHeight: 20,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        {index % 1 === 0 ? (
                          <HiIdentification size={20} className="icoColr" />
                        ) : (
                          <HiIdentification size={20} className="icoColr" />
                        )}
                      </ListItemIcon>
                      <ListItemText
                        primary={text}
                        sx={{ opacity: open ? 1 : 0 }}
                      />
                    </ListItemButton>
                  </NavLink>
                </ListItem>
              ))}
            </List>
            <Divider />
            <Divider />
            <List>
              {["Employess"].map((text, index) => (
                <ListItem
                  key={text}
                  disablePadding
                  sx={{ display: "block", height: "2.5vw" }}
                >
                  <NavLink className={"navlink"} to={"/employees"}>
                    <ListItemButton
                      sx={{
                        minHeight: 20,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        {index % 1 === 0 ? (
                          <PiFaceMask size={20} className="icoColr" />
                        ) : (
                          <PiFaceMask size={20} className="icoColr" />
                        )}
                      </ListItemIcon>
                      <ListItemText
                        primary={text}
                        sx={{ opacity: open ? 1 : 0 }}
                      />
                    </ListItemButton>
                  </NavLink>
                </ListItem>
              ))}
            </List>
            <Divider />
            <List>
              {["EmpProfile_List"].map((text, index) => (
                <ListItem
                  key={text}
                  disablePadding
                  sx={{ display: "block", height: "2.5vw" }}
                >
                  <NavLink className={"navlink"} to={"/emp_profile"}>
                    <ListItemButton
                      sx={{
                        minHeight: 20,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        {index % 1 === 0 ? (
                          <AiFillProfile size={20} className="icoColr" />
                        ) : (
                          <AiFillProfile size={20} className="icoColr" />
                        )}
                      </ListItemIcon>
                      <ListItemText
                        primary={text}
                        sx={{ opacity: open ? 1 : 0 }}
                      />
                    </ListItemButton>
                  </NavLink>
                </ListItem>
              ))}
            </List>
            <Divider />
            <List>
              {["PatientList"].map((text, index) => (
                <ListItem
                  key={text}
                  disablePadding
                  sx={{ display: "block", height: "2.5vw" }}
                >
                  <NavLink className={"navlink"} to={"/patientlist"}>
                    <ListItemButton
                      sx={{
                        minHeight: 20,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        {index % 1 === 0 ? (
                          <FaHospitalUser size={20} className="icoColr" />
                        ) : (
                          <FaHospitalUser size={20} className="icoColr" />
                        )}
                      </ListItemIcon>
                      <ListItemText
                        primary={text}
                        sx={{ opacity: open ? 1 : 0 }}
                      />
                    </ListItemButton>
                  </NavLink>
                </ListItem>
              ))}
            </List>
            <Divider />
            <List>
              {["TreatmentList"].map((text, index) => (
                <ListItem
                  key={text}
                  disablePadding
                  sx={{ display: "block", height: "2.5vw" }}
                >
                  <NavLink className={"navlink"} to={"/treatement"}>
                    <ListItemButton
                      sx={{
                        minHeight: 20,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        {index % 1 === 0 ? (
                          <FaFileMedical size={20} className="icoColr" />
                        ) : (
                          <FaFileMedical size={20} className="icoColr" />
                        )}
                      </ListItemIcon>
                      <ListItemText
                        primary={text}
                        sx={{ opacity: open ? 1 : 0 }}
                      />
                    </ListItemButton>
                  </NavLink>
                </ListItem>
              ))}
            </List>
            <Divider />
            <List>
              {["PrescriptionList"].map((text, index) => (
                <ListItem
                  key={text}
                  disablePadding
                  sx={{ display: "block", height: "2.5vw" }}
                >
                  <NavLink className={"navlink"} to={"/Prescription"}>
                    <ListItemButton
                      sx={{
                        minHeight: 20,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        {index % 1 === 0 ? (
                          <FaPrescriptionBottleAlt
                            size={20}
                            className="icoColr"
                          />
                        ) : (
                          <FaPrescriptionBottleAlt
                            size={20}
                            className="icoColr"
                          />
                        )}
                      </ListItemIcon>
                      <ListItemText
                        primary={text}
                        sx={{ opacity: open ? 1 : 0 }}
                      />
                    </ListItemButton>
                  </NavLink>
                </ListItem>
              ))}
            </List>
            <Divider />
            <List>
              {["TestReport_List"].map((text, index) => (
                <ListItem
                  key={text}
                  disablePadding
                  sx={{ display: "block", height: "2.5vw" }}
                >
                  <NavLink className={"navlink"} to={"/test_report"}>
                    <ListItemButton
                      sx={{
                        minHeight: 20,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        {index % 1 === 0 ? (
                          <TbReportMedical size={20} className="icoColr" />
                        ) : (
                          <TbReportMedical size={20} className="icoColr" />
                        )}
                      </ListItemIcon>
                      <ListItemText
                        primary={text}
                        sx={{ opacity: open ? 1 : 0 }}
                      />
                    </ListItemButton>
                  </NavLink>
                </ListItem>
              ))}
            </List>
          </Drawer>
        </Box>

        <Box component="main" sx={{ flexGrow: 1, p: 3, background: "#EEEEEE" }}>
          <DrawerHeader />
          {page}
          {/* <Outlet/> */}
        </Box>
      </div>
      <ProfileModal open={profileOpen} handleClose={handleProfileClose} />

    </>
  );
}

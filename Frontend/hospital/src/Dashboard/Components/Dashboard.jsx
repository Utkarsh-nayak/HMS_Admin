import React from "react";
import BedroomParentIcon from '@mui/icons-material/BedroomParent';
import Card1 from '../Components/Card1';
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DvrIcon from "@mui/icons-material/Dvr";
import {MyChart} from '../../Dashboard/Components/chart';
import {Chart2} from '../../Dashboard/Components/Chart2';

const Dashboard = () => {
  return (
    <div>
      <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
          >
            <Card1
              icon={<BedroomParentIcon sx={{ fontSize: "45px" }} />}
              title="TOTAL ROOM USES"
              count="200"
            />
            <Card1
              icon={<ContentPasteIcon sx={{ fontSize: "40px" }} />}
              title="TOTAL EMPLOYESS"
              count="220"
            />
            <Card1
              icon={<CalendarMonthIcon sx={{ fontSize: "40px" }} />}
              title="TOTAL PATIENT"
              count="400"
            />
            <Card1
              icon={<DvrIcon sx={{ fontSize: "40px" }} />}
              title="DEPARTMENT"
              count="25"
            />
          </div>

          <div
            style={{
              display: "flex",
              marginBottom: "20px",
              justifyContent: "space-between",
            }}
          >
            <div>
              <MyChart />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                width: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              ></div>
            </div>
            <div>
              <Chart2 />
            </div>
          </div>
    </div>
  );
};

export default Dashboard;

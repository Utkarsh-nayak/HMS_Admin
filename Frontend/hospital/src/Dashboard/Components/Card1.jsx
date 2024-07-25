import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';



export default function Card1({icon,title,count}) {
    return (
      <Card sx={{ width:300,maxWidth: 300,}}>
        <CardContent>
          <Typography
            sx={{
              
              marginBottom: "10px",
              display: "flex",
              justifyContent: "space-between",
            }}
            component="div"
          >
            {icon}
            
          </Typography>
          <Typography
            gutterBottom
            style={{ fontWeight: "700", color: "#87CEFA " }}
            variant="h6"
            component="div"
          >
            {title}
          </Typography>
          <Typography variant="h4" color="text.secondary">
            {count}
          </Typography>
        </CardContent>
      </Card>
    );
  }
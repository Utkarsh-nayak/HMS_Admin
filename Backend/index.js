const express = require('express');
const roomRouter = require('./Route/roomRoute');
const departmentRouter = require('./Route/departmentRoute');
const roleRouter = require('./Route/roleRoute');
const labsRouter = require('./Route/labsRoute');
const testRouter = require('./Route/testRoute');
const employessRouter = require('./Route/employessRoute');
const role_assignRouter = require('./Route/role_assignRoute');
const emp_profileRouter = require('./Route/emp_profileRoute');
const patientRouter = require('./Route/patientRoute');
const treatmentRouter = require('./Route/treatmentRoute');
const prescriptionRouter = require('./Route/prescriptionRoute');
const test_reportRouter = require('./Route/test_reportRoute');
const authRouter = require('./Route/authRoutes');
const swaggerjsdoc = require('swagger-jsdoc');
const swaggerui = require('swagger-ui-express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(express.static('public'));
app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:3000',  // Replace with your frontend URL
  credentials: true  // Required to allow cookies from the frontend
}));

app.use("/", roomRouter);
app.use("/", departmentRouter);
app.use("/", roleRouter);
app.use("/", labsRouter);
app.use("/", testRouter);
app.use("/", employessRouter);
app.use("/", role_assignRouter);
app.use("/", emp_profileRouter);
app.use("/", patientRouter);
app.use("/", treatmentRouter);
app.use("/", prescriptionRouter);
app.use("/", test_reportRouter);
app.use("/", authRouter);

const option = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Node.js API Documentation for PostgreSQL",
      version: "1.0.0"
    },
    servers: [
      {
        url: "http://localhost:4000/"
      }
    ]
  },
  apis: ['./Route/*.js']
};

app.use('/testing', swaggerui.serve, swaggerui.setup(swaggerjsdoc(option)));

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});

// Uncomment if you need to export the app
// module.exports = app;

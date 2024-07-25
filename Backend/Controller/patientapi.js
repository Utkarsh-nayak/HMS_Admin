const connection = require("../Model/dbconfig");

let patientGet = (req, res) => {
  let query = "select * from patient";
  connection.query(query, (err, result) => {
    if (err) {
      console.log("error", err.sqlMessage);
    } else {
      res.send(result.rows);
    }
  });
};


let patientGetbyid = (req, res) => {
  const patient_id = req.params.patient_id
  let query = "select * from patient where patient_id = $1";
  connection.query(query,[patient_id], (err, result) => {
    if (err) {
      console.log("error", err);
    } else {
      res.send(result.rows);
    }
  });
};


let patientPost =  (req, res) => {
  let { patient_id,patient_name,gender,age,mobile_no,blood_group,symptoms,city,date,time } = req.body;
  let sqlquery = "INSERT INTO patient VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)";
  connection.query(sqlquery,[patient_id,patient_name,gender,age,mobile_no,blood_group,symptoms,city,date,time], function (error, result) {
      if (error) {
        console.log("Error", error.message);
      } else {
        res.send(result);
      }
    }
  );
}


let patientDelete = (req, res) => {



  let id = req.params.patient_id;
  
  let sqlquery = "DELETE FROM patient WHERE patient_id = $1";
  

  connection.query(sqlquery, [id], (error, result) => {
    if (error) {
      console.error("Error deleting patient:", error.sqlMessage);
      return res.status(500).send("Error deleting patient.");
    } else {
      if (result.affectedRows === 0) {
      
        return res.status(404).send("patient not found.");
      }
      return res.status(200).send("patient deleted successfully.");
    }
  });
};


let patientUpdate=(req, res) => {
  const patient_id= req.params.patient_id
  let {patient_name} = req.body;
  let sqlquery =
    "UPDATE patient SET  patient_name=$1 WHERE patient_id =$2";
  connection.query(
    sqlquery,
    [patient_name,patient_id],
    function (error, result) {
      if (error) {
        console.log("Error", error.sqlMessage);
        res.status(404).json({ message: "item not found" });
      } else {
        res.send(`${result.rows} data update`);
      }
    }
  );
};


module.exports = { patientGet,patientPost,patientDelete,patientUpdate,patientGetbyid};

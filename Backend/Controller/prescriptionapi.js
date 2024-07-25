const connection = require("../Model/dbconfig");

let prescriptionGet = (req, res) => {
  let query = "select * from prescription";
  connection.query(query, (err, result) => {
    if (err) {
      console.log("error", err.sqlMessage);
    } else {
      res.send(result.rows);
    }
  });
};


let prescriptionGetbyid = (req, res) => {
  const prescription_id = req.params.prescription
  let query = "select * from prescription where prescription_id = $1";
  connection.query(query,[prescription_id], (err, result) => {
    if (err) {
      console.log("error", err);
    } else {
      res.send(result.rows);
    }
  });
};


let prescriptionPost =  (req, res) => {
  let {patient_id,emp_id,medicine_name,quantity,dosage} = req.body;
  let sqlquery = "INSERT INTO prescription VALUES ($1,$2,$3,$4,$5)";
  connection.query(sqlquery,[patient_id,emp_id,medicine_name,quantity,dosage ], function (error, result) {
      if (error) {
        console.log("Error", error.message);
      } else {
        res.send(result);
      }
    }
  );
}


let prescriptionDelete = (req, res) => {



  let id = req.params.prescription_id;
  
  let sqlquery = "DELETE FROM prescription WHERE prescription_id = $1";
  

  connection.query(sqlquery, [id], (error, result) => {
    if (error) {
      console.error("Error deleting prescription:", error.sqlMessage);
      return res.status(500).send("Error deleting prescription.");
    } else {
      if (result.affectedRows === 0) {
      
        return res.status(404).send("prescription not found.");
      }
      return res.status(200).send("prescription deleted successfully.");
    }
  });
};


let prescriptionUpdate=(req, res) => {
  const prescription_id= req.params.prescription_id
  let {prescription_name} = req.body;
  let sqlquery =
    "UPDATE prescription SET  prescription_name=$1 WHERE prescription_id =$2";
  connection.query(
    sqlquery,
    [prescription_name,prescription_id],
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


module.exports = { prescriptionGet,prescriptionPost,prescriptionDelete,prescriptionUpdate,prescriptionGetbyid};

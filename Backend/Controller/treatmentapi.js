const connection = require("../Model/dbconfig");

let treatmentGet = (req, res) => {
  let query = "select * from treatment";
  connection.query(query, (err, result) => {
    if (err) {
      console.log("error", err.sqlMessage);
    } else {
      res.send(result.rows);
    }
  });
};


// let treatmentGetbyid = (req, res) => {
//   const treatment_id = req.params.treatment_id
//   let query = "select * from treatment where treatment_id = $1";
//   connection.query(query,[treatment_id], (err, result) => {
//     if (err) {
//       console.log("error", err);
//     } else {
//       res.send(result.rows);
//     }
//   });
// };


let treatmentPost =  (req, res) => {
  let {patient_id,emp_id,date} = req.body;
  let sqlquery = "INSERT INTO treatment VALUES ($1,$2,$3)";
  connection.query(sqlquery,[patient_id,emp_id,date], function (error, result) {
      if (error) {
        console.log("Error", error.message);
      } else {
        res.send(result);
      }
    }
  );
}


let treatmentDelete = (req, res) => {



  let id = req.params.data;
  
  let sqlquery = "DELETE FROM treatment WHERE data= $1";
  

  connection.query(sqlquery, [id], (error, result) => {
    if (error) {
      console.error("Error deleting treatment:", error.sqlMessage);
      return res.status(500).send("Error deleting treatment.");
    } else {
      if (result.affectedRows === 0) {
      
        return res.status(404).send("treatment not found.");
      }
      return res.status(200).send("treatment deleted successfully.");
    }
  });
};


let treatmentUpdate=(req, res) => {
  const date= req.params.date
  let sqlquery =
    "UPDATE treatment SET WHERE date =$1";
  connection.query(
    sqlquery,
    [treatment_name,treatment_id],
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


module.exports = { treatmentGet,treatmentPost,treatmentDelete,treatmentUpdate,};

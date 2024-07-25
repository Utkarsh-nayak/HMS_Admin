const connection = require("../Model/dbconfig");

let test_reportGet = (req, res) => {
  let query = "select * from test_report";
  connection.query(query, (err, result) => {
    if (err) {
      console.log("error", err.sqlMessage);
    } else {
      res.send(result.rows);
    }
  });
};


let test_reportGetbyid = (req, res) => {
  const test_report_id = req.params.test_report_id
  let query = "select * from test_report where test_report_id = $1";
  connection.query(query,[test_report_id], (err, result) => {
    if (err) {
      console.log("error", err);
    } else {
      res.send(result.rows);
    }
  });
};


let test_reportPost =  (req, res) => {
  let {patient_id,test_id,emp_id} = req.body;
  let sqlquery = "INSERT INTO test_report ('patient_id','test_id','emp_id') VALUES ($1,$2,$3)";
  connection.query(sqlquery,[patient_id,test_id,emp_id], function (error, result) {
      if (error) {
        console.log("Error", error.message);
      } else {
        res.send(result);
      }
    }
  );
}


let test_reportDelete = (req, res) => {



  let id = req.params.test_report_id;
  
  let sqlquery = "DELETE FROM test_report WHERE test_report_id = $1";
  

  connection.query(sqlquery, [id], (error, result) => {
    if (error) {
      console.error("Error deleting test_report:", error.sqlMessage);
      return res.status(500).send("Error deleting test_report.");
    } else {
      if (result.affectedRows === 0) {
      
        return res.status(404).send("test_report not found.");
      }
      return res.status(200).send("test_report deleted successfully.");
    }
  });
};


let test_reportUpdate=(req, res) => {
  const test_report_id= req.params.test_report_id
  let {test_report_name} = req.body;
  let sqlquery =
    "UPDATE test_report SET  test_report_name=$1 WHERE test_report_id =$2";
  connection.query(
    sqlquery,
    [test_report_name,test_report_id],
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


module.exports = { test_reportGet,test_reportPost,test_reportDelete,test_reportUpdate,test_reportGetbyid};

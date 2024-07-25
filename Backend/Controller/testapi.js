const connection = require("../Model/dbconfig");

let testGet = (req, res) => {
  let query = "select * from test";
  connection.query(query, (err, result) => {
    if (err) {
      console.log("error", err.sqlMessage);
    } else {
      res.send(result.rows);
    }
  });
};


let testGetbyid = (req, res) => {
  const test_id = req.params.test_id
  let query = "select * from test where test_id = $1";
  connection.query(query,[test_id], (err, result) => {
    if (err) {
      console.log("error", err);
    } else {
      res.send(result.rows);
    }
  });
};


let testPost =  (req, res) => {
  let { test_id,test_name,test_cost,updateion,lab_id } = req.body;
  let sqlquery = "INSERT INTO test VALUES ($1,$2,$3,$4,$5)";
  connection.query(sqlquery,[test_id,test_name,test_cost,updateion,lab_id], function (error, result) {
      if (error) {
        console.log("Error", error.message);
      } else {
        res.send(result);
      }
    }
  );
}


let testDelete = (req, res) => {



  let id = req.params.test_id;
  
  let sqlquery = "DELETE FROM test WHERE test_id = $1";
  

  connection.query(sqlquery, [id], (error, result) => {
    if (error) {
      console.error("Error deleting test:", error.sqlMessage);
      return res.status(500).send("Error deleting test.");
    } else {
      if (result.affectedRows === 0) {
      
        return res.status(404).send("test not found.");
      }
      return res.status(200).send("test deleted successfully.");
    }
  });
};


let testUpdate = (req, res) => {
  const { test_id } = req.params;
  const { test_name, test_cost, updateion, lab_id } = req.body;

  // Corrected SQL query
  let sqlquery =
    "UPDATE test SET test_name = $1, test_cost = $2, updateion = $3, lab_id = $4 WHERE test_id = $5";
  
  // Correct parameter order
  connection.query(
    sqlquery,
    [test_name, test_cost, updateion, lab_id, test_id],
    function (error, result) {
      if (error) {
        console.log("Error", error.message);
        res.status(500).json({ message: "Error updating data" });
      } else {
        res.json({ message: "Data updated successfully", rowsAffected: result.rowCount });
      }
    }
  );
};



module.exports = { testGet,testPost,testDelete,testUpdate,testGetbyid};

const connection = require("../Model/dbconfig");

let role_assignGet = (req, res) => {
  let query = "select * from role_assign";
  connection.query(query, (err, result) => {
    if (err) {
      console.log("error", err.sqlMessage);
    } else {
      res.send(result.rows);
    }
  });
};


let role_assignGetbyid = (req, res) => {
  const role_assign_id = req.params.role_assign_id
  let query = "select * from role_assign where role_assign_id = $1";
  connection.query(query,[role_assign_id], (err, result) => {
    if (err) {
      console.log("error", err);
    } else {
      res.send(result.rows);
    }
  });
};


let role_assignPost =  (req, res) => {
  let { role_id , emp_id} = req.body;
  let sqlquery = "INSERT INTO role_assign VALUES ($1,$2)";
  connection.query(sqlquery,[role_id, emp_id], function (error, result) {
      if (error) {
        console.log("Error", error.message);
      } else {
        res.send(result);
      }
    }
  );
}


let role_assignDelete = (req, res) => {



  let {role_id,emp_id}=req.body
  let sqlquery = "DELETE FROM role_assign WHERE role_id=$1 and emp_id=$2";
  

  connection.query(sqlquery, [role_id,emp_id], (error, result) => {
    if (error) {
      console.error("Error deleting role_assign:", error.sqlMessage);
      return res.status(500).send("Error deleting role_assign.");
    } else {
      if (result.affectedRows === 0) {
      
        return res.status(404).send("role_assign not found.");
      }
      return res.status(200).send("role_assign deleted successfully.");
    }
  });
};


let role_assignUpdate=(req, res) => {
  const role_assign_id= req.params.role_assign_id
  let sqlquery =
    "UPDATE role_assign SET  role_assign_id=$1;"
  connection.query(
    sqlquery,
    [role_assign_id],
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


module.exports = { role_assignGet,role_assignPost,role_assignDelete,role_assignUpdate,role_assignGetbyid};

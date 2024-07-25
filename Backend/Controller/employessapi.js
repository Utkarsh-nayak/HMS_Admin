const connection = require("../Model/dbconfig");

let employessGet = (req, res) => {
  let query = "select employess.emp_id,employess.emp_name,employess.emp_email,employess.department_id,string_agg(role.role_name,',') AS roles FROM employess LEFT JOIN role_assign ON employess.emp_id=role_assign.emp_id LEFT JOIN role ON role_assign.role_id= role.role_id GROUP BY employess.emp_id,employess.emp_name,employess.emp_email,employess.department_id";
  connection.query(query, (err, result) => {
    if (err) {
      console.log("error", err.sqlMessage);
    } else {
      console.log(result.rows)
      res.send(result.rows);
    }
  });
};


let employessGetbyid = (req, res) => {
  const emp_id = req.params.emp_id
  let query = "select * from employess where emp_id = $1";
  connection.query(query,[emp_id], (err, result) => {
    if (err) {
      console.log("error", err);
    } else {
      res.send(result.rows);
    }
  });
};


let employessPost =  (req, res) => {
  let {emp_id,emp_name,emp_email,emp_password,department_id} = req.body;
  let sqlquery = "INSERT INTO employess VALUES ($1,$2,$3,$4,$5)";
  connection.query(sqlquery,[emp_id,emp_name,emp_email,emp_password,department_id], function (error, result) {
      if (error) {
        console.log("Error", error.message);
      } else {
        res.send(result);
      }
    }
  );
}





let employessDelete = (req, res) => {



  let id = req.params.employess_id;
  
  let sqlquery = "DELETE FROM employess WHERE emp_id = $1";
  

  connection.query(sqlquery, [id], (error, result) => {
    if (error) {
      console.error("Error deleting employess:", error.sqlMessage);
      return res.status(500).send("Error deleting employess.");
    } else {
      if (result.affectedRows === 0) {
      
        return res.status(404).send("employess not found.");
      }
      return res.status(200).send("employess deleted successfully.");
    }
  });
};

let employessUpdate=(req, res) => {
  const emp_id= req.params.emp_id
  let { emp_name, emp_email, room_id, department_id, role_id } = req.body;
  console.log(emp_id)
  let sqlquery =
  "UPDATE employess SET  emp_name = $1, emp_email = $2, room_id = $3, department_id = $4, role_id = $5 WHERE emp_id = $6";
  connection.query(
    sqlquery,
    [emp_name, emp_email, room_id, department_id, role_id, emp_id], // Corrected order of parameters
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


module.exports = { employessGet,employessPost,employessDelete,employessUpdate,employessGetbyid};

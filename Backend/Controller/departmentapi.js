const connection = require("../Model/dbconfig");



let departmentGet = (req, res) => {
  let query = "select * from department";
  connection.query(query, (err, result) => {
    if (err) {
      console.log("error", err.sqlMessage);
    } else {
      res.send(result.rows);
    }
  });
};


let departmentGetbyid = (req, res) => {
  const department_id = req.params.department_id
  let query = "select * from department where department_id = $1";
  connection.query(query,[department_id], (err, result) => {
    if (err) {
      console.log("error", err);
    } else {
      res.send(result.rows);
    }
  });
};


let departmentPost =  (req, res) => {
  let { department_id,department_name } = req.body;
  let sqlquery = "INSERT INTO department VALUES ($1,$2)";
  connection.query(sqlquery,[department_id,department_name ], function (error, result) {
      if (error) {
        console.log("Error", error.message);
      } else {
        res.send(result);
      }
    }
  );
}


let departmentDelete = (req, res) => {
  let id = req.params.department_id;
  console.log(id)
  let sqlquery = "DELETE FROM department WHERE department_id = $1";
  console.log(sqlquery)
  connection.query(sqlquery,[id], (error, result) => {
    if(error){
      console.log("not deleted",error)
      res.send(error.rows)
    }
    else{
      console.log("deleted",result)
      res.send(result.rows)
    }
})
};


let departmentUpdate=(req, res) => {
  const department_id= req.params.department_id
  let {department_name} = req.body;
  let sqlquery =
    "UPDATE department SET  department_name=$1 WHERE department_id =$2";
  connection.query(
    sqlquery,
    [department_name,department_id],
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






  module.exports = {departmentGet,departmentPost,departmentDelete,departmentUpdate,departmentGetbyid};
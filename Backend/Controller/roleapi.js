const connection = require("../Model/dbconfig");

let roleGet = (req, res) => {
  let query = "select * from role";
  connection.query(query, (err, result) => {
    if (err) {
      console.log("error", err.sqlMessage);
    } else {
      res.send(result.rows);
    }
  });
};


let roleGetbyid = (req, res) => {
  const role_id = req.params.role_id
  let query = "select * from role where role_id = $1";
  connection.query(query,[role_id], (err, result) => {
    if (err) {
      console.log("error", err);
    } else {
      res.send(result.rows);
    }
  });
};


let rolePost =  (req, res) => {
  let { role_id,role_name } = req.body;
  let sqlquery = "INSERT INTO role VALUES ($1,$2)";
  connection.query(sqlquery,[role_id,role_name ], function (error, result) {
      if (error) {
        console.log("Error", error.message);
      } else {
        res.send(result);
      }
    }
  );
}


let roleDelete = (req, res) => {



  let id = req.params.role_id;
  
  let sqlquery = "DELETE FROM role WHERE role_id = $1";
  

  connection.query(sqlquery, [id], (error, result) => {
    if (error) {
      console.error("Error deleting role:", error.sqlMessage);
      return res.status(500).send("Error deleting role.");
    } else {
      if (result.affectedRows === 0) {
      
        return res.status(404).send("role not found.");
      }
      return res.status(200).send("role deleted successfully.");
    }
  });
};


let roleUpdate=(req, res) => {
  const role_id= req.params.role_id
  let {role_name} = req.body;
  let sqlquery =
    "UPDATE role SET  role_name=$1 WHERE role_id =$2";
  connection.query(
    sqlquery,
    [role_name,role_id],
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


module.exports = { roleGet,rolePost,roleDelete,roleUpdate,roleGetbyid};

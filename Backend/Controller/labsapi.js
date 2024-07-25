const connection = require("../Model/dbconfig");

let labGet = (req, res) => {
  let query = "select * from labs";
  connection.query(query, (err, result) => {
    if (err) {
      console.log("error", err.sqlMessage);
    } else {
      res.send(result.rows);
    }
  });
};


let labGetbyid = (req, res) => {
  const lab_id = req.params.lab_id
  let query = "select * from labs where lab_id = $1";
  connection.query(query,[lab_id], (err, result) => {
    if (err) {
      console.log("error", err);
    } else {
      res.send(result.rows);
    }
  });
};


let labPost =  (req, res) => {
  let { lab_id,lab_name,room_id } = req.body;
  const sqlquery = "INSERT INTO labs (lab_id, lab_name, room_id) VALUES ($1, $2, $3)";
  connection.query(sqlquery,[lab_id,lab_name,room_id ], function (error, result) {
      if (error) {
        console.log("Error", error.message);
      } else {
        res.send(result);
      }
    }
  );
}


let labDelete = (req, res) => {



  let id = req.params.lab_id;
  
  let sqlquery = "DELETE FROM labs WHERE lab_id = $1";
  

  connection.query(sqlquery, [id], (error, result) => {
    if (error) {
      console.error("Error deleting lab:", error.sqlMessage);
      return res.status(500).send("Error deleting lab.");
    } else {
      if (result.affectedRows === 0) {
      
        return res.status(404).send("lab not found.");
      }
      return res.status(200).send("lab deleted successfully.");
    }
  });
};


let labUpdate = (req, res) => {
  const lab_id = req.params.lab_id;
  const { lab_name, room_id } = req.body;
  console.log(lab_id, lab_name, room_id);

  let sqlquery =
    "UPDATE labs SET lab_name = $1, room_id = $2 WHERE lab_id = $3";
  connection.query(
    sqlquery,
    [lab_name, room_id, lab_id],
    function (error, result) {
      if (error) {
        console.log("Error updating lab:", error.sqlMessage);
        res.status(500).json({ message: "Error updating lab." });
      } else {
        if (result.rowCount === 0) {
          res.status(404).json({ message: "Lab not found." });
        } else {
          res.status(200).json({ message: "Lab updated successfully." });
        }
      }
    }
  );
};



module.exports = { labGet,labPost,labDelete,labUpdate,labGetbyid};

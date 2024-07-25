const connection = require("../Model/dbconfig");

let roomGet = (req, res) => {
  let query = "select * from room";
  connection.query(query, (err, result) => {
    if (err) {
      console.log("error", err.sqlMessage);
    } else {
      res.send(result.rows);
    }
  });
};


let roomGetbyid = (req, res) => {
  const room_id = req.params.room_id
  let query = "select * from room where room_id = $1";
  connection.query(query,[room_id], (err, result) => {
    if (err) {
      console.log("error", err);
    } else {
      res.send(result.rows);
    }
  });
};


let roomPost =  (req, res) => {
  let { room_id,room_name } = req.body;
  let sqlquery = "INSERT INTO room VALUES ($1,$2)";
  connection.query(sqlquery,[room_id,room_name ], function (error, result) {
      if (error) {
        console.log("Error", error.message);
      } else {
        res.send(result);
      }
    }
  );
}


let roomDelete = (req, res) => {



  let id = req.params.room_id;
  
  let sqlquery = "DELETE FROM room WHERE room_id = $1";
  

  connection.query(sqlquery, [id], (error, result) => {
    if (error) {
      console.error("Error deleting room:", error.sqlMessage);
      return res.status(500).send("Error deleting room.");
    } else {
      if (result.affectedRows === 0) {
      
        return res.status(404).send("Room not found.");
      }
      return res.status(200).send("Room deleted successfully.");
    }
  });
};


let roomUpdate=(req, res) => {
  const room_id= req.params.room_id
  let {room_name} = req.body;
  let sqlquery =
    "UPDATE room SET  room_name=$1 WHERE room_id =$2";
  connection.query(
    sqlquery,
    [room_name,room_id],
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


module.exports = { roomGet,roomPost,roomDelete,roomUpdate,roomGetbyid};

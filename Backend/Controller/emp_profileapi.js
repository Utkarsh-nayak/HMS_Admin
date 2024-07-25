const connection = require("../Model/dbconfig");

let emp_profileGet = (req, res) => {
  let query = "select * from emp_profile";
  connection.query(query, (err, result) => {
    if (err) {
      console.log("error", err.sqlMessage);
    } else {
      res.send(result.rows);
    }
  });
};


let emp_profileGetbyid = (req, res) => {

  const emp_id = req.params.emp_id
  let query = "select * from emp_profile where emp_id = $1";
  connection.query(query,[emp_id], (err, result) => {
    if (err) {
      console.log("error", err);
    } else {
      res.send(result.rows);
    }
  });
};


let emp_profilePost =  (req, res) => {
  var fullUrl = req.protocol + "://" + req.get("host") + "/Images/";
    
  let imageUrl = null;
  if (req.file && req.file.filename) {
      imageUrl =` ${fullUrl}${req.file.filename}`;
      
  }

  let image = imageUrl
  let {emp_id,emp_name,dob,qualification,gender,mobile,email,address} = req.body;
  console.log(req.body)
  let sqlquery = "INSERT INTO emp_profile VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)";
  connection.query(sqlquery,[emp_id,emp_name,dob,qualification,gender,mobile,email,address,image ], function (error, result) {
      if (error) {
        console.log("Error", error.message);
      } else {
        res.send(result);
      }
    }
  );
}


let emp_profileDelete = (req, res) => {
  let id = req.params.emp_id;
  
  let query = "DELETE FROM emp_profile WHERE emp_id = $1 ";
  connection.query(query, [id], (error, result) => {
    if (error) {
      console.log("Err", error); // Log the entire error object
      
    } else {
     console.log("deleted")
      res.json(result)
    }
  });
};



let emp_profileUpdate = (req, res) => {
  const emp_id = req.params.emp_id;
  let { emp_name, dob, qualification, gender, mobile, email, address, image } = req.body;

  let value=[emp_name, dob, qualification, gender, mobile, email, address, image]
console.log(value)
  let sqlquery = `
    UPDATE emp_profile
    SET emp_name=$1, dob=$2, qualification=$3, gender=$4, mobile=$5, email=$6, address=$7, image=$8
    WHERE emp_id=$9
  `;

  connection.query(
    sqlquery,
    [emp_id,emp_name, dob, qualification, gender, mobile, email, address, image,],
    function (error, result) {
      if (error) {
        console.log("Error", error.sqlMessage);
        res.status(404).json({ message: "Item not found" });
      } else {
        if (result.rowCount > 0) {
          res.status(200).json({ message: "Data updated successfully" });
        } else {
          res.status(404).json({ message: "Item not found" });
        }
      }
    }
  );
};


module.exports = { emp_profileGet,emp_profilePost,emp_profileDelete,emp_profileUpdate,emp_profileGetbyid};

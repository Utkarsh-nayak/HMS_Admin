const joi = require('joi')

const departmentSchema = joi.object({
    department_id: joi.string().min(1).max(20).required(),
    department_name: joi.string().required(),
   

})
const validateSchema = (req,res,next) =>{
    const{error,value} = departmentSchema.validate(req.body);
    if(error){
        console.log(error);
       return res.send("Invalid register");
    }
   
    next();
}
module.exports = {validateSchema}
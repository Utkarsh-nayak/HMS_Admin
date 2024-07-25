const joi = require('joi')

const employessSchema = joi.object({
    emp_id: joi.string().min(1).max(20).required(),
    emp_name: joi.string().required(),
    emp_email: joi.string().required(),
    emp_password: joi.string().required(),
   

   

}).unknown(true);
const validateSchema = (req,res,next) =>{
    const{error,value} = employessSchema.validate(req.body);
    if(error){
        console.log(error);
       return res.send("Invalid register");
    }
   
    next();
}
module.exports = {validateSchema}
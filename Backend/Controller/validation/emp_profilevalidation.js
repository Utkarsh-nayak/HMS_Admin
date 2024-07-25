const joi = require('joi')

const emp_profileSchema = joi.object({
    emp_id: joi.string().min(1).max(20).required(),
    emp_name: joi.string().required(),
    dob: joi.date(),
    qualification: joi.string().min(3).max(50).required(),
    gender: joi.string().min(3).max(10).required(),
    mobile: joi.string().min(1).max(10).required(),
    email: joi.string().min(1).max(100).required(),
    address: joi.string().min(1).max(250).required(),
    // image: joi.image().required(),

})
const validateSchema = (req,res,next) =>{
    const{error} = emp_profileSchema.validate(req.body);
    if(error){
        console.log(error);
       return res.send("Invalid register");
    }
   
    next();
}
module.exports = {validateSchema}
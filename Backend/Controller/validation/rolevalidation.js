const joi = require('joi')

const roleSchema = joi.object({
    role_id: joi.string().min(1).max(20).required(),
    role_name: joi.string().required(),
   

})
const validateSchema = (req,res,next) =>{
    const{error,value} = roleSchema.validate(req.body);
    if(error){
        console.log(error);
       return res.send("Invalid register");
    }
   
    next();
}
module.exports = {validateSchema}
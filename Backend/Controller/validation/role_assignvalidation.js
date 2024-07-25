const joi = require('joi')

const role_assign_assignSchema = joi.object({
    role_assign_id: joi.string().min(1).max(20).required(),
   

})
const validateSchema = (req,res,next) =>{
    const{error} = role_assign_assignSchema.validate(req.body);
    if(error){
        console.log(error);
       return res.send("Invalid register");
    }
   
    next();
}
module.exports = {validateSchema}
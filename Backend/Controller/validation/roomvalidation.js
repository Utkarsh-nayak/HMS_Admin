const joi = require('joi')

const roomSchema = joi.object({
    room_id: joi.string().min(1).max(20).required(),
    room_name: joi.string().min(1).max(20).required(),
   

})
const validateSchema = (req,res,next) =>{
    const{error,value} = roomSchema.validate(req.body);
    if(error){
        console.log(error);
       return res.send("Invalid register");
    }
   
    next();
}
module.exports = {validateSchema}
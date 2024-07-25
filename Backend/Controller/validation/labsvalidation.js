const joi = require('joi')

const labsSchema = joi.object({
    lab_id: joi.string().required(),
    lab_name: joi.string().required(),
    room_id: joi.string().required(),
})
const validateSchema = (req,res,next) =>{
    const{error} = labsSchema.validate(req.body);
    if(error){
        console.log(error);
       return res.send("Invalid register");
    }
   
    next();
}
module.exports = {validateSchema}
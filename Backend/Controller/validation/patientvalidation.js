const joi = require('joi')

const patientSchema = joi.object({
    patient_id: joi.string().min(1).max(20).required(),
    patient_name: joi.string().required(),
    gender: joi.string().min(1).max(10).required(),
    age: joi.number().required(),
    mobile_no: joi.string().min(1).max(11).required(),
    blood_group: joi.string().required(),
    symptoms: joi.string().min(10).max(250).required(),
    city: joi.string().min(1).max(20).required(),
    date: joi.date().required(),
    time: joi.string(),
    
   

})
const validateSchema = (req,res,next) =>{
    const{error} = patientSchema.validate(req.body);
    if(error){
        console.log(error);
       return res.send("Invalid register");
    }
   
    next();
}
module.exports = {validateSchema}
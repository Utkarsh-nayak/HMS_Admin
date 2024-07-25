const joi = require('joi')

const testSchema = joi.object({
    test_id: joi.string().min(1).max(20).required(),
    test_name: joi.string().required(),
    test_cost: joi.number().required(),
    updateion: joi.date().required(),      
   

})
const validateSchema = (req,res,next) =>{
    const{error} = testSchema.validate(req.body);
    if(error){
        console.log(error);
       return res.send("Invalid register");
    }
   
    next();
}
module.exports = {validateSchema}
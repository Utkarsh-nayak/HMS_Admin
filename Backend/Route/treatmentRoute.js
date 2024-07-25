const express = require('express')
const{treatmentGet, treatmentPost,treatmentDelete,treatmentUpdate}= require('../Controller/treatmentapi')
const treatmentRouter = express.Router()


treatmentRouter.get('/treatmentget',treatmentGet)
// treatmentRouter.get('/treatmentGetbyid/:treatment_id',treatmentGetbyid)
treatmentRouter.post('/treatmentpost',treatmentPost)
treatmentRouter.delete('/treatmentdelete/:treatment_id',treatmentDelete)
treatmentRouter.put('/treatmentupdate/:treatment_id',treatmentUpdate)






module.exports = treatmentRouter
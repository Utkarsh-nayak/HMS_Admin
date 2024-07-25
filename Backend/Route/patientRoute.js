const express = require('express')
const{patientGet, patientPost,patientDelete,patientUpdate, patientGetbyid}= require('../Controller/patientapi')
const patientRouter = express.Router()
const {validateSchema}=require('../Controller/validation/patientvalidation')

patientRouter.get('/patientget',patientGet)
patientRouter.get('/patientGetbyid/:patient_id',patientGetbyid)
patientRouter.post('/patientpost',validateSchema,patientPost)
patientRouter.delete('/patientdelete/:patient_id',patientDelete)
patientRouter.put('/patientupdate/:patient_id',patientUpdate)






module.exports = patientRouter
const express = require('express')
const{prescriptionGet, prescriptionPost,prescriptionDelete,prescriptionUpdate, prescriptionGetbyid}= require('../Controller/prescriptionapi')
const prescriptionRouter = express.Router()


prescriptionRouter.get('/prescriptionget',prescriptionGet)
prescriptionRouter.get('/prescriptionGetbyid/:prescription_id',prescriptionGetbyid)
prescriptionRouter.post('/prescriptionpost',prescriptionPost)
prescriptionRouter.delete('/prescriptiondelete/:prescription_id',prescriptionDelete)
prescriptionRouter.put('/prescriptionupdate/:prescription_id',prescriptionUpdate)






module.exports = prescriptionRouter
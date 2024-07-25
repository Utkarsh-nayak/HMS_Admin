const express = require('express')
const{labGet, labPost,labDelete,labUpdate, labGetbyid}= require('../Controller/labsapi')
const labsRouter = express.Router()
const {validateSchema}=require('../Controller/validation/labsvalidation')


labsRouter.get('/labget',labGet)
labsRouter.get('/labGetbyid/:lab_id',labGetbyid)
labsRouter.post('/labpost',validateSchema,labPost)
labsRouter.delete('/labdelete/:lab_id',labDelete)
labsRouter.put('/labupdate/:lab_id',labUpdate)






module.exports = labsRouter
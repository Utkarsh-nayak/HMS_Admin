const express = require('express')
const{employessGet, employessPost,employessDelete,employessUpdate, employessGetbyid}= require('../Controller/employessapi')
const employessRouter = express.Router()
const{validateSchema}=require('../Controller/validation/employessvalidation')


employessRouter.get('/employessget',employessGet)
employessRouter.get('/employessGetbyid/:employess_id',employessGetbyid)
employessRouter.post('/employesspost',validateSchema,employessPost)
employessRouter.delete('/employessdelete/:employess_id',employessDelete)
employessRouter.put('/employessupdate/:emp_id',employessUpdate)






module.exports = employessRouter
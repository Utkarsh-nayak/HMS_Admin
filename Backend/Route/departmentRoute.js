const express = require('express')
const { departmentGet,departmentPost,departmentGetbyid,departmentUpdate, departmentDelete}= require('../Controller/departmentapi')
const departmentRouter = express.Router()
const {validateSchema}=require('../Controller/validation/departmentvalidation')



departmentRouter.get('/departmentget',departmentGet)
departmentRouter.get('/departmentgetbyid',departmentGetbyid)
departmentRouter.put('/departmentUpdate/:department_id',departmentUpdate)
departmentRouter.delete('/departmentdelete/:department_id',departmentDelete)
departmentRouter.post('/departmentpost',validateSchema,departmentPost)

module.exports = departmentRouter
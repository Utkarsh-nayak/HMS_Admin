const express = require('express')
const{emp_profileGet, emp_profilePost,emp_profileDelete,emp_profileUpdate, emp_profileGetbyid}= require('../Controller/emp_profileapi')
const emp_profileRouter = express.Router()
const {validateSchema}=require('../Controller/validation/emp_profilevalidation')
const {upload} = require('../Controller/multer/multer')


emp_profileRouter.get('/emp_profileget',emp_profileGet)
emp_profileRouter.get('/emp_profileGetbyid/:emp_id', emp_profileGetbyid)
emp_profileRouter.post('/emp_profilepost',upload.single('image'),validateSchema,emp_profilePost)
emp_profileRouter.delete('/emp_profiledelete/:emp_id',emp_profileDelete)
emp_profileRouter.put('/emp_profileupdate/:emp_id',emp_profileUpdate)






module.exports = emp_profileRouter
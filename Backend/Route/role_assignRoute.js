const express = require('express')
const{role_assignGet, role_assignPost,role_assignDelete,role_assignUpdate, role_assignGetbyid}= require('../Controller/role_assignapi')
const role_assignRouter = express.Router()
// const {validateSchema}=require('../Controller/validation/role_assignvalidation')


role_assignRouter.get('/role_assignget',role_assignGet)
role_assignRouter.get('/role_assignGetbyid/:role_assign_id',role_assignGetbyid)
role_assignRouter.post('/role_assignpost',role_assignPost)
role_assignRouter.post('/role_assigndelete',role_assignDelete)
role_assignRouter.put('/role_assignupdate/:role_assign_id',role_assignUpdate)






module.exports = role_assignRouter
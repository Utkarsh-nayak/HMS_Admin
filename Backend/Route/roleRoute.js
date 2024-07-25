const express = require('express')
const{roleGet, rolePost,roleDelete,roleUpdate, roleGetbyid}= require('../Controller/roleapi')
const roleRouter = express.Router()
const {validateSchema}=require('../Controller/validation/rolevalidation')


roleRouter.get('/roleget',roleGet)
roleRouter.get('/roleGetbyid/:role_id',roleGetbyid)
roleRouter.post('/rolepost',validateSchema,rolePost)
roleRouter.delete('/roledelete/:role_id',roleDelete)
roleRouter.put('/roleupdate/:role_id',roleUpdate)







module.exports = roleRouter
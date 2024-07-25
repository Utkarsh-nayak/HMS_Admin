const express = require('express')
const{testGet, testPost,testDelete,testUpdate, testGetbyid}= require('../Controller/testapi')
const testRouter = express.Router()
const {validateSchema} = require('../Controller/validation/testvalidation')


testRouter.get('/testget',testGet)
testRouter.get('/testGetbyid/:test_id',testGetbyid)
testRouter.post('/testpost',testPost)
testRouter.delete('/testdelete/:test_id',testDelete)
testRouter.put('/testupdate/:test_id',testUpdate)






module.exports = testRouter
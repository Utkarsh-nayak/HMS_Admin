const express = require('express')
const{test_reportGet, test_reportPost,test_reportDelete,test_reportUpdate, test_reportGetbyid}= require('../Controller/test_reportapi')
const test_reportRouter = express.Router()


test_reportRouter.get('/test_reportget',test_reportGet)
test_reportRouter.get('/test_reportGetbyid/:test_report_id',test_reportGetbyid)
test_reportRouter.post('/test_reportpost',test_reportPost)
test_reportRouter.delete('/test_reportdelete/:test_report_id',test_reportDelete)
test_reportRouter.put('/test_reportupdate/:test_report_id',test_reportUpdate)






module.exports = test_reportRouter
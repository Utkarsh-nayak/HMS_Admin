const express = require('express')
const{roomGet, roomPost,roomDelete,roomUpdate, roomGetbyid}= require('../Controller/roomapi')
const {validateSchema}=require('../Controller/validation/roomvalidation')
const roomRouter = express.Router()


roomRouter.get('/roomget',roomGet)
roomRouter.get('/roomGetbyid/:room_id',roomGetbyid)
roomRouter.post('/roompost',validateSchema,roomPost)
roomRouter.delete('/roomdelete/:room_id',roomDelete)
roomRouter.put('/roomupdate/:room_id',roomUpdate)



//////http://localhost:4000/testing/roomget#/default/////////

/**
  * @swagger
  * components:
  *       schemas:
  *              room:
  *                  type: object
  *                  properties:
  *                           room_id:
  *                                type: string
  *                           room_name:
  *                                type: string
  *        
  */
  /**
   * @swagger
   * /roomget:
   *         get:
   *              summary: Retrieve all room records
   *              description: node js get api testing
   *              responses:
   *                   200:
   *                        description: Successful retrievel of room records
   *                        content:
   *                             application/json:
   *                                      schema:
   *                                          type: array
   *                                          items:
   *                                               $ref : '#components/schemas/room'
   */


  /**
   * @swagger
   * /roompost:
   *        post:
   *              summary: This api is used to chek post method is working or not 
   *              description: This api is used to chek post method is working or not
   *              requestBody:
   *                     required: true
   *                     content:
   *                          application/json:
   *                              schema: 
   *                                   $ref: '#component/schemas/room'
   *              responses:
   *                   200:
   *                        description: added successfully
   */

  /**
 * @swagger
 * /roomupdate/{room_id}:
 *             put:
 *                 summary: node js api
 *                 description: node js api
 *                 parameters: 
 *                      - in: path
 *                        name: room_id
 *                        required: true
 *                        description: string room_id required
 *                        schema: 
 *                              type: string 
 *                 requestBody:
 *                     required: true
 *                     content:
 *                       application/json:
 *                         schema:
 *                            $ref: '#components/schemas/room'
 *                 responses:
 *                      200:     
 *                         description: added successfully
 *                         content:
 *                           application/json:
 *                                     schema:
 *                                         type: array
 *                                         items:
 *                                             $ref:'#components/schemas/room'        
 */
  /**
   * @swagger
   * /roomdelete/{room_id}:
   *                delete:
   *                       summary : This api is used to chek delete method is working or not 
   *                       desription: This api is used to chek delete method is working or not
   *                       parameters:
   *                          - in: path
   *                            name: room_id
   *                            required: true
   *                            description: string room_id required
   *                            schema:
   *                               type: string
   *                       responses:
   *                            200:
   *                                 description: delete successfully
   */







module.exports = roomRouter
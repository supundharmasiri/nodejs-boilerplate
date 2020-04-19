const express = require("express");
const getUsers = require("../controllers/users/getUsers");
const postUser = require("../controllers/users/postUser");
const deleteUser = require("../controllers/users/deleteUser");
const validator = require("../../helpers/validator");

const router = express.Router();

/**
 * @swagger
 * /app/users:
 *    get:
 *      tags:
 *       - Users
 *      security:
 *       - bearer: []
 *      summary: Get users.
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: query
 *          name: limit
 *        - in: query
 *          name: skip
 *        - in: query
 *          name: sort
 *        - in: query
 *          name: sortDir
 *        - in: query
 *          name: keyword
 *      responses:
 *        200:
 *          description: Returns user list.
 */
router.get("/users", getUsers.handler);

/**
 * @swagger
 * /app/user:
 *    post:
 *      tags:
 *       - Users
 *      security:
 *       - bearer: []
 *      summary: Get users.
 *      consumes:
 *        - application/json
 *      parameters:
 *        - name: body
 *          in: body
 *          schema:
 *            $ref: '#/definitions/post_user'
 *      responses:
 *        200:
 *          description: Returns success.
 */
router.post("/user", validator(postUser.validationSchema), postUser.handler);

/**
 * @swagger
 * /app/user/{idUser}:
 *    delete:
 *      tags:
 *       - Users
 *      security:
 *       - bearer: []
 *      summary: Get users.
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: path
 *          name: idUser
 *          description: ID to delete
 *          required: true
 *          type: string
 *      responses:
 *        200:
 *          description: Returns success.
 */
router.delete(
  "/user/:idUser",
  validator(deleteUser.validationSchema),
  deleteUser.handler
);

module.exports = router;

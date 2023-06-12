const express = require('express');
const userController = require('./../controllers/user.controller');
const router = express.Router();

//todo defininir endpoints
//Los metodos que llevan diagona
router.route('/').get(userController.findAllUsers).post(userController.createUser);

//Los metodos que llevan id
router
    .route('/:id')
    .get(userController.findUser)
    .patch(userController.update)
    .delete(userController.delete);

module.exports = router;
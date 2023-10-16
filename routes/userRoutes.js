const express = require('express')

const router = express.Router();

const {postUser, getUser, getUsers, deleteUser, updateUser} = require('../controller/userController')

router.route('/').get(getUsers);

router.route('/:id').get(getUser);

router.route('/:id').put(updateUser);
    
router.route('/').post(postUser);

router.route('/:id').delete(deleteUser);       
            

router.route('/myname').get(function(req, res){
    res.status(200).json({name:'name is jay dawg'})
    });

module.exports = router;
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel')
/**
 * @description Get Users
 * @route GET /api/users/
 * @access public
 */

const getUsers = asyncHandler(async function(req, res){
    const users = await User.find();
    //res.status(200).json({message:'get all users'})
   res.status(200).json(users)
});

/**
 * @description Get Specific User
 * @route GET /api/users/:id
 * @access public
 */

const getUser = asyncHandler(async function(req, res){
    const id = req.params.id;
    res.status(200).json({message:`get user with id ${id}`})})

/**
 * @description Update Specific User
 * @route PUT /api/users/:id
 * @access public
 */

const updateUser = asyncHandler(async function(req, res){
    const id = req.params.id;
    res.status(200).json({message:`update user with id ${id}`})});

/**
 * @description Delete Specific User
 * @route DELETE /api/users/:id
 * @access public
 */

const deleteUser = function(req, res){
    const id = req.params.id;
    res.status(200).json({message:`Delete user with id ${id}`})
}

/**
 * @description Post Specific User
 * @route   POST /api/users/:id
 * @access public
 */

const postUser = asyncHandler(async function(req, res){
    console.log('reg.body === ',req.body)
    const {name,age,email} = req.body
    if(!email||!age||!name){
        res.status(400) //.json({message:"all fields must be filled"})
        throw new Error('All fields must be filled');
        
    }
    const user = await User.create({name,email,age})
    //res.status(201).json({message:"create user"})
    res.status(201).json(user)

})


module.exports = {getUser, getUsers, updateUser, deleteUser, postUser}
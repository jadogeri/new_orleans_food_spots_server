const asyncHandler = require('express-async-handler');
const User = require('../models/userModel')
const bcrypt = require('bcrypt');
/**
 * @description Get Register 
 * @route PUT /api/Users/register
 * @access public
 */

const registerUser = asyncHandler(async (req, res) => {
    const {username,password,email} = req.body;

    if(!username||!password||!email){
        res.status(400) //.json({message:"all fields must be filled"})
        throw new Error('All fields are mandatory');
        
    }
    const unavailableUserEmail = await User.findOne({email});
    if(unavailableUserEmail){
        res.status(400) //.json({message:"all fields must be filled"})
        throw new Error(`Email ${unavailableUserEmail} already taken`);
    }

    const unavailableUserUsername = await User.findOne({username});
    if(unavailableUserUsername){
        res.status(400) //.json({message:"all fields must be filled"})
        throw new Error(`Username ${unavailableUserUsername} already taken`);
    }

    //hash the password 
    const hashedPassword = await bcrypt.hash(password,20);
    console.log(hashedPassword);

    const user = await User.create({username,hashedPassword,email})
    res.status(201).json(user)
  
});
/**
 * @description Login a User
 * @route PUT /api/users/login
 * @access public
 */

const loginUser = asyncHandler(async (req, res) => {
    res.json({ message: "Login the user" });
});

/**
 * @description Retrieve Current User
 * @route GET /api/users/currentUser
 * @access public
 */

const currentUser = asyncHandler(async (req, res) => {
    res.json({ message: "get current user" });
});

module.exports = {registerUser, loginUser, currentUser}
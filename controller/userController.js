const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
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
    
    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(400) //.json({message:"all fields must be filled"})
        throw new Error(`email already registered`);
    }

     //hash the password 
    const hashedPassword = await bcrypt.hash(password,5);
    console.log("hashed password ",hashedPassword);

    const user = await User.create({username,password:hashedPassword,email})
    res.status(201).json(user)
    if(user){
        res.status(201).json({_id: user.id, username: user.username, email: user.email})
    }else{
        res.status(400);
        throw new Error('User data is not valid')
    }
res.json({ message: 'Register the user'})

  
});


/**
 * @description Login a User
 * @route PUT /api/users/login
 * @access public
 */

const loginUser = asyncHandler(async (req, res) => {

    const {email, password} = req.body
    if(!password && (!username || !email)){
        res.status(404);
        throw new Error('All fields are mandatory')
    }
    const user = await User.findOne({ email });
    if(user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign({
            user:{
                username : user.username,
                email : user.email,
                id: user.id,
            },

        } , process.env.ACCESS_TOKEN_SECRET,{expiresIn : "15m"} );
        res.status(200).json({accessToken})
    }else{
        res.status(401);
        throw new Error('password or email not valid');
    }
});

/**
 * @description Retrieve Current User
 * @route GET /api/users/currentUser
 * @access public
 */

const currentUser = asyncHandler(async (req, res) => {
   // res.json({ message: "get current user" });
   res.json(req.user);
});

module.exports = {registerUser, loginUser, currentUser}
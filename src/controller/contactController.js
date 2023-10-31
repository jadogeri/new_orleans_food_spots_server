const asyncHandler = require('express-async-handler');
const Contact = require('../models/ContactModel')
/**
 * @description Get Contacts
 * @route GET /api/Contacts/
 * @access private
 */

const getContacts = asyncHandler(async function(req, res){
    const contacts = await Contact.find({user_id:req.user.id});
    //res.status(200).json({message:'get all Contacts'})
   res.status(200).json(contacts)
});

/**
 * @description Get Specific Contact
 * @route GET /api/Contacts/:id
 * @access private
 */

const getContact = asyncHandler(async function(req, res){
    //const id = req.params.id;
    //res.status(200).json({message:`get Contact with id ${id}`})
    const contact = await Contact.findById(req.params.id);
    console.log(JSON.stringify(contact));
    if(!contact){
        res.status(404);
        throw new Error(`Contact not found`);
    }
    res.status(200).json(contact);
});

/**
 * @description Update Specific Contact
 * @route PUT /api/Contacts/:id
 * @access private
 */

const updateContact = asyncHandler(async function(req, res){
    //const id = req.params.id;
    //res.status(200).json({message:`update Contact with id ${id}`})
    const contact = await Contact.findById(req.params.id);
    console.log(JSON.stringify(contact));
    if(!contact){
        res.status(404);
        throw new Error(`Contact not found`);
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User donest' have permission to  update other user contact")
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id, 
        req.body,
        {new: true}

    )
    res.status(200).json(updatedContact);


});

/**
 * @description Delete Specific Contact
 * @route DELETE /api/Contacts/:id
 * @access private
 */

const deleteContact = asyncHandler(async function(req, res){
    //const id = req.params.id;
    //res.status(200).json({message:`Delete Contact with id ${id}`})
    const contact = await Contact.findById(req.params.id);
    console.log(JSON.stringify(contact));
    if(!contact){
        res.status(404);
        throw new Error(`Contact not found`);
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User donest' have permission to  update other user contact")
    }

    console.log(typeof req.params.id)
    await Contact.deleteOne({_id : req.params.id});
    res.status(200).json(contact);
});

/**
 * @description Post Specific Contact
 * @route   POST /api/Contacts/:id
 * @access private
 */

const createContact = asyncHandler(async function(req, res){
    console.log('reg.body === ',req.body)
    const {name,age,email} = req.body
    if(!email||!age||!name){
        res.status(400) //.json({message:"all fields must be filled"})
        throw new Error('All fields must be filled');
        
    }
    const contact = await Contact.create({
        name,
        email,
        age,
        user_id:req.user.id
    })
    //res.status(201).json({message:"create Contact"})
    res.status(201).json(contact)

})


module.exports = {getContact, getContacts, updateContact, deleteContact, createContact}
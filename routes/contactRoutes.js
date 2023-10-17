const express = require('express')

const router = express.Router();

const {createContact, getContact, getContacts, deleteContact, updateContact} = require('../controller/contactController')

router.route('/').get(getContacts);

router.route('/:id').get(getContact);

router.route('/:id').put(updateContact);
    
router.route('/').post(createContact);

router.route('/:id').delete(deleteContact);       
            

router.route('/myname').get(function(req, res){
    res.status(200).json({name:'name is jay dawg'})
    });

module.exports = router;
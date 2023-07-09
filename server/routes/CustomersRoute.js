const express = require('express');
const router = express.Router();
const {getAllCustomer,createCustomer,getCustomerById,updateCustomer,deleteCustomer} = require('../controllers/CustomerController.js');


router.get('/', getAllCustomer);
// Route for creating a new customer
router.post('/add', createCustomer);

// Route for retrieving customer details
router.get('/get/:id',getCustomerById);

// Route for updating customer information
router.put('/update/:id', updateCustomer);

// Route for deleting a customer
router.delete('/delete/:id',deleteCustomer);

module.exports = router;

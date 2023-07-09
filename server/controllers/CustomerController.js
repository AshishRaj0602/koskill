//const {createCustomer,getCustomerById,updateCustomer,deleteCustomer}
const Customer=require('../models/CustomerModel');
const createCustomer=async(req,res)=>{
    try {
        const customer = new Customer(req.body);
        const savedCustomer = await customer.save();
        res.status(201).json(savedCustomer);
      } catch (error) {
        res.status(400).json({ error: 'Failed to create customer' });
      }
}



const getAllCustomer=async(req,res)=>{
    try {
        const customer = await Customer.find();
        res.status(200).json(customer);
      } catch (error) {
        res.status(404).json({ error: 'Customer not found' });
      }
}


const getCustomerById=async(req,res)=>{
    try {
        const customer = await Customer.findById(req.params.id);
        res.status(200).json(customer);
      } catch (error) {
        res.status(404).json({ error: 'Customer not found' });
      }
}



const updateCustomer=async(req,res)=>{
    try {
        const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(customer);
      } catch (error) {
        res.status(400).json({ error: 'Failed to update customer' });
      }
}



const deleteCustomer=async(req,res)=>{
    try {
        await Customer.findByIdAndRemove(req.params.id);
        res.status(200).json({ message: 'Customer deleted successfully' });
      } catch (error) {
        res.status(400).json({ error: 'Failed to delete customer' });
      }
}

module.exports ={createCustomer,getAllCustomer,getCustomerById, updateCustomer, deleteCustomer}
const express = require('express');
const app = express();
// const router = require('../routes/index.js/index');
const cors = require('cors');
const CustomersRoute = require('../routes/CustomersRoute')
const UserRoute = require('../routes/userRoute')
app.use(cors());
app.use(express.json());
app.use('/api/users', UserRoute);
app.use('/api/customers', CustomersRoute);

module.exports = app;
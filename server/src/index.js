const app = require('./app');
const dotenv = require('dotenv');
const mongoose = require('mongoose');


dotenv.config();
//connect to DB

mongoose.connect(process.env.DATABASE_URL).then(()=>{
    console.log("connecting to DB");
}).catch(err => console.log(err));

app.listen(8080, () => console.log('Server running......'));
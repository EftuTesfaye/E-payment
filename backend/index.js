
// Import necessary packages and modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

var corOptions = {
  origin: 'https://localhost:8081'
}

//middleware
app.use(cors())
app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({extended : true}))

//
const db = require('./models/index.js')
db.sequelize.sync();

db.sequelize.sync({force: false })
.then(() => {
  console.log('it is working');
}); 

// Import controllers
const billController = require('./controller/billController.js')
const serviceController = require('./controller/serviceProviderController.js')
const paymentController = require('./controller/paymentController');
const userController = require('./controller/userController.js');
const AgentContoller = require('./controller/agentController.js');
// Import routes

const billsRouter = require('./routes/billRoute.js');
const serviceProvidersRouter = require('./routes/serviceProviderRoute.js');
const paymentRouter = require('./routes/paymentRoute.js');
const usersRouter = require('./routes/userRoute.js');
const AgentsRouter = require('./routes/agentRoute.js');
const AdminRouter = require('./routes/AdminRoutes.js')

// Mount routes
app.use('/bills', billsRouter);
app.use('/serviceprovider', serviceProvidersRouter);
app.use('/payment', paymentRouter);
app.use('/Users', usersRouter);
app.use('/agent', AgentsRouter);
app.use('/api/admin', AdminRouter);
app.use ('/Images',express.static('./Images'))

//testing api
app.get('/',(req,res)=>{
  res.json({message: 'hello there'})
})
app.post('/',(req,res)=>{
  res.json({message: 'hello from post....'})
})

//Port
const PORT = process.env.PORT || 3000

// start server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});


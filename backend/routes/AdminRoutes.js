const express = require('express');
const AdminRouter = express.Router();
const { adminLogin } = require('../controller/AdminLoginController.js');
const adminAuth = require('../middleware/AdminAuthMiddleware.js');

// Admin login route
AdminRouter.post('/login', adminLogin);
// Protected admin route 
AdminRouter.get('/dashboard', adminAuth, (req, res) => {
    
});


module.exports = AdminRouter;
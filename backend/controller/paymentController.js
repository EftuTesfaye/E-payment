const asyncHandler = require('express-async-handler');
  const db = require('../models');
  const { User, ServiceProviders, Payment, Bill, Agents } = require('../models');
  
  exports.create = asyncHandler(async (req, res) => {
    const requiredFields = [
      'TransactionNo',
      'paymentDate',
      'UserId',
      'serviceProviderBIN',
      'paymentMethod',
      'paymentDescription',
      'ReferenceNo'
    ];
  
    const missingFields = requiredFields.filter((field) => !req.body[field]);
  
    if (missingFields.length > 0) {
      res.status(400).send({
        message: `${missingFields.join(', ')} cannot be empty`,
      });
      return;
    }
  
    try {
       // Create payment data object
      const paymentData = {
        TransactionNo: req.body.TransactionNo,
        paymentDate: req.body.paymentDate,
        amount: req.body.amount,
        payerID: req.body.UserId,
        payeeID: req.body.serviceProviderBIN,
        paymentMethod: req.body.paymentMethod,
        paymentDescription: req.body.paymentDescription,
        ReferenceNo: req.body.ReferenceNo,
        UserId: req.body.UserId,
        serviceProviderBIN: req.body.serviceProviderBIN,
        agentBIN: req.body.agentBIN,
        billId: req.body.billId,

      };
       // Check if UserId exists and retrieve associated user
  
      if (req.body.UserId) {
        const user = await User.findByPk(req.body.UserId);
        if (!user) {
          res.status(404).send({
            message: `User with ID ${req.body.UserId} not found`,
          });
          return;
        }
      }

   // Check if serviceProviderBIN exists and retrieve associated service provider
      if (req.body.serviceProviderBIN) {
        const serviceProvider = await ServiceProviders.findByPk(req.body.serviceProviderBIN);
        if (!serviceProvider) {
          res.status(404).send({
            message: `Service Provider with BIN ${req.body.serviceProviderBIN} not found`,
          });
          return;
        }
      }
   // Check if agentBIN exists and retrieve associated agent
      if (req.body.agentBIN) {
        const agent = await db.Agents.findByPk(req.body.agentBIN);
        if (!agent) {
          res.status(404).send({
            message: `Agent with BIN ${req.body.agentBIN} not found`,
          });
          return;
        }
        paymentData.paymentMethod = `${agent.agentName} ${req.body.paymentMethod}`;
      }
  
       // Check if billId exists and retrieve associated bill
      if (req.body.billId) {
        const bill = await Bill.findOne({ where: { billNumber: paymentData.ReferenceNo } });
        paymentData.amount = bill.amountDue;
        if (!bill) {
          res.status(404).send({
            message: `Bill with id ${req.body.billId} not found`,
          });
          return;
        }
      }
  
      // Create payment with associated models
      const data = await Payment.create(paymentData, {
        include: [
          {
            model: ServiceProviders,
            as: 'ServiceProvider',
            attributes: ['serviceProviderBIN', 'serviceProviderName'],
          },
          {
            model: Bill,
            as: 'Bill',
          },
          {
            model: User,
            as: 'User',
            attributes: ['UserID', 'UserName', 'Email'],
          },
        ],
      });
  
      res.send(data);
    } catch (error) {
      res.status(500).send({
        message: 'An error occurred while creating the payment',
        error: error.message,
      });
    }
  });
  
// Retrieve all payments from the database
exports.findAll = asyncHandler(async (req, res) => {
  const data = await Payment.findAll({
    include: [Agents, User, ServiceProviders, Bill],
  });
  res.send(data);
});

// Find a single payment by ID
exports.findOne = asyncHandler(async (req, res) => {
  const id = req.params.id;

    // Find the payment with the specified ID and include associated models
  const data = await Payment.findByPk(id, {
    include: [Agents, User, ServiceProviders, Bill],
  });

  if (!data) {
     // If payment is not found, send a 404 error response
    res.status(404).send({
      message: `payment with ID ${id} not found`,
    });
  } else {
      // If payment is found, send the payment data in the response
    res.send(data);
  }
});

// Update a payment by ID
exports.update = asyncHandler(async (req, res) => {
  const id = req.params.id;

  try {
      // Find the payment with the specified ID and include associated models
    const payment = await Payment.findByPk(id, {
      include: [Agents, User, ServiceProviders, Bill],
    });

    if (!payment) {
        // If payment is not found, send a 404 error response
      res.status(404).send({
        message: `Payment with ID ${id} not found`,
      });
      return;
    }

    // Update the payment association with User
    if (req.body.UserId) {
      const user = await User.findByPk(req.body.UserId);

      if (!user) {
        // If user is not found, send a 404 error response
        res.status(404).send({
          message: `User with ID ${req.body.UserId} not found`,
        });
        return;
      }

      payment.UserId = req.body.UserId;
    }

    // Update the payment association with ServiceProviders
    if (req.body.serviceProviderBIN) {
      const serviceProvider = await ServiceProviders.findByPk(req.body.serviceProviderBIN);

      if (!serviceProvider) {
          // If service provider is not found, send a 404 error response
        res.status(404).send({
          message: `Service Provider with BIN ${req.body.serviceProviderBIN} not found`,
        });
        return;
      }

      // Associate the service provider with the ServiceProviders
    payment.ServiceProviderServiceProviderBIN = req.body.serviceProviderBIN;
    }
    if (req.body.agentBIN) {
      const agent = await Agents.findByPk(req.body.agentBIN);

      if (!agent) {
         // If agent is not found, send a 404 error response
        res.status(404).send({
          message: `Agent with BIN ${req.body.agentBIN} not found`,
        });
        return;
      }

      payment.agentBIN = req.body.agentBIN;
    }

    // Update the payment with other attributes
    await payment.update(req.body);

    res.send({
      message: 'Payment updated successfully',
      payment: payment,
    });
  } catch (error) {
    res.status(500).send({
      message: 'An error occurred while updating the payment',
      error: error.message,
    });
  }
});

// Delete a payment by ID
exports.delete = asyncHandler(async (req, res) => {
  const id = req.params.id;

  // Delete the payment with the specified ID
  const num = await Payment.destroy({
    where: { id: id },
  });

  if (num === 1) {
     // If one payment is deleted, send a success message in the response
    res.send({
      message: 'payment deleted successfully',
    });
  } else {
    // If no payment is deleted, send an error message in the response
    res.send({
      message: `Cannot delete payment with ID ${id}. payment not found`,
    });
  }
});

module.exports = exports;

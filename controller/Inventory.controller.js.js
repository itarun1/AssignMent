const express = require('express');
const Inventory = require('../model/Inventory.model');
const router = express.Router();



// Modify Inventory Route
router.post('/modify', async (req, res) => {
  const updates = req.body;
  for (let update of updates) {
    const product = await Inventory.findOne({ productId: update.productId });
    if(product)
    {
      if (update.operation === 'add') product.quantity += update.quantity;
      else product.quantity -= update.quantity;
      await product.save();
    }
    
   
  }
  return res.send({ message: 'Inventory updated successfully' });
});
router.post('/product', (req, res) => {
  const { productId, quantity } = req.body;

  if (!productId) {
    return res.status(400).send({
      message: 'Product ID is required'
    });
  }

  if (!quantity) {
    return res.status(400).send({
      message: 'Quantity is required'
    });
  }

  const inventoryItem = new Inventory({ productId, quantity });
  
  inventoryItem.save().then(() => {
    res.send({ message: 'Product added successfully' });
  }).catch(error => {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  });
});


module.exports = router;
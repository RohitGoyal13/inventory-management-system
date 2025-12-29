const express = require('express');
const router = express.Router();
const Item = require('../models/Item');
const Transaction = require('../models/Transaction');

// 1. GET ALL ITEMS
router.get('/items', async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 2. ADD NEW ITEM
router.post('/items', async (req, res) => {
  const { name, sku, category, quantity, minLevel, price } = req.body;
  
  try {
    const newItem = new Item({ name, sku, category, quantity, minLevel, price });
    const savedItem = await newItem.save();
    
    // Log the initial stock as a transaction
    await Transaction.create({
        itemId: savedItem._id,
        type: 'IN',
        quantity: quantity
    });

    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 3. UPDATE STOCK (CHECK-IN / CHECK-OUT)
router.post('/transaction', async (req, res) => {
  const { itemId, type, quantity } = req.body;

  try {
    const item = await Item.findById(itemId);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    // Update quantity based on type
    if (type === 'IN') {
      item.quantity += Number(quantity);
    } else if (type === 'OUT') {
      if (item.quantity < quantity) {
        return res.status(400).json({ message: 'Not enough stock!' });
      }
      item.quantity -= Number(quantity);
    }

    await item.save();

    // Create transaction log
    await Transaction.create({ itemId, type, quantity });

    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 4. GET LOW STOCK ALERTS
router.get('/alerts', async (req, res) => {
  try {
    // Find items where quantity is less than or equal to minLevel
    const lowStockItems = await Item.find({ $expr: { $lte: ["$quantity", "$minLevel"] } });
    res.json(lowStockItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    required: true,
  },
  type: {
    type: String,
    enum: ['IN', 'OUT'], // "IN" = Stock Arrived, "OUT" = Stock Sold/Lost
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Transaction', TransactionSchema);
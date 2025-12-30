import { useState } from 'react';
import { X, ArrowDownCircle, ArrowUpCircle } from 'lucide-react';
import api from '../utils/api';
import { Item } from '../types/inventory';

interface StockActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRefresh: () => void;
  item: Item | null;
  initialType?: 'IN' | 'OUT';
}

export default function StockActionModal({ isOpen, onClose, onRefresh, item, initialType = 'IN' }: StockActionModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [type, setType] = useState<'IN' | 'OUT'>(initialType);

  if (!isOpen || !item) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/transaction', {
        itemId: item._id,
        type,
        quantity: Number(quantity)
      });
      onRefresh();
      onClose();
      setQuantity(1);
    } catch (error) {
      alert('Error updating stock. Check if you have enough items to remove.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">
            Update Stock: <span className="text-blue-600">{item.name}</span>
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-red-500">
            <X size={24} />
          </button>
        </div>

        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setType('IN')}
            className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-2 font-semibold transition ${
              type === 'IN' ? 'bg-green-100 text-green-700 border-2 border-green-500' : 'bg-gray-100 text-gray-500'
            }`}
          >
            <ArrowDownCircle size={20} /> Stock IN
          </button>
          <button
            onClick={() => setType('OUT')}
            className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-2 font-semibold transition ${
              type === 'OUT' ? 'bg-red-100 text-red-700 border-2 border-red-500' : 'bg-gray-100 text-gray-500'
            }`}
          >
            <ArrowUpCircle size={20} /> Stock OUT
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quantity to {type === 'IN' ? 'Add' : 'Remove'}
            </label>
            <input
              type="number"
              min="1"
              required
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-black outline-none text-lg"
              value={quantity || ''}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </div>

          <button
            type="submit"
            className={`w-full py-3 rounded-lg font-bold text-white transition ${
              type === 'IN' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
            }`}
          >
            Confirm {type === 'IN' ? 'Check-In' : 'Check-Out'}
          </button>
        </form>
      </div>
    </div>
  );
}
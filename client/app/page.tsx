"use client";
import { useEffect, useState } from 'react';
import api from '../utils/api';
import { Item } from '../types/inventory';
import { AlertTriangle, Package, TrendingUp, PlusCircle, MinusCircle } from 'lucide-react';
import AddItemModal from '../components/AddItemModal';
import StockActionModal from '../components/StockActionModal';

export default function Dashboard() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isStockModalOpen, setIsStockModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [actionType, setActionType] = useState<'IN' | 'OUT'>('IN');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const { data } = await api.get('/items');
      setItems(data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch items', error);
      setLoading(false);
    }
  };

  const openStockModal = (item: Item, type: 'IN' | 'OUT') => {
    setSelectedItem(item);
    setActionType(type);
    setIsStockModalOpen(true);
  };

  const totalStock = items.reduce((acc, item) => acc + item.quantity, 0);
  const totalValue = items.reduce((acc, item) => acc + (item.quantity * item.price), 0);
  const lowStockItems = items.filter(item => item.quantity <= item.minLevel);

  if (loading) return <div className="p-10 text-center">Loading Inventory...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Inventory Dashboard</h1>

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Items</p>
                <h2 className="text-3xl font-bold text-gray-900">{totalStock}</h2>
              </div>
              <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                <Package size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Value</p>
                <h2 className="text-3xl font-bold text-gray-900">₹{totalValue.toLocaleString()}</h2>
              </div>
              <div className="bg-green-100 p-3 rounded-full text-green-600">
                <TrendingUp size={24} />
              </div>
            </div>
          </div>

          <div className={`p-6 rounded-xl shadow-sm border ${lowStockItems.length > 0 ? 'bg-red-50 border-red-200' : 'bg-white border-gray-100'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`${lowStockItems.length > 0 ? 'text-red-600' : 'text-gray-500'} text-sm`}>Low Stock Alerts</p>
                <h2 className={`text-3xl font-bold ${lowStockItems.length > 0 ? 'text-red-700' : 'text-gray-900'}`}>{lowStockItems.length}</h2>
              </div>
              <div className={`${lowStockItems.length > 0 ? 'bg-red-200 text-red-700' : 'bg-gray-100 text-gray-600'} p-3 rounded-full`}>
                <AlertTriangle size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* INVENTORY TABLE */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-semibold text-gray-800">Current Inventory</h3>
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="bg-black text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800 transition"
            >
              + Add Item
            </button>
          </div>
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 text-sm">
              <tr>
                <th className="p-4">Item Name</th>
                <th className="p-4">SKU</th>
                <th className="p-4">Quantity</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {items.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="p-4 font-medium text-gray-900">
                    {item.name}
                    <div className="text-xs text-gray-400">{item.category}</div>
                  </td>
                  <td className="p-4 text-gray-500">{item.sku}</td>
                  <td className="p-4 font-semibold text-gray-900">{item.quantity}</td>
                  <td className="p-4">
                    {item.quantity <= item.minLevel ? (
                      <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold">Low Stock</span>
                    ) : (
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">In Stock</span>
                    )}
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button 
                      onClick={() => openStockModal(item, 'IN')}
                      className="text-green-600 hover:bg-green-50 p-2 rounded-lg transition" 
                      title="Stock In"
                    >
                      <PlusCircle size={20} />
                    </button>
                    <button 
                      onClick={() => openStockModal(item, 'OUT')}
                      className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition" 
                      title="Stock Out"
                    >
                      <MinusCircle size={20} />
                    </button>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    No items found. Add some inventory to get started!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* MODALS */}
        <AddItemModal 
          isOpen={isAddModalOpen} 
          onClose={() => setIsAddModalOpen(false)} 
          onRefresh={fetchItems} 
        />
        
        <StockActionModal
          isOpen={isStockModalOpen}
          onClose={() => setIsStockModalOpen(false)}
          onRefresh={fetchItems}
          item={selectedItem}
          initialType={actionType}
        />

      </div>
    </div>
  );
}
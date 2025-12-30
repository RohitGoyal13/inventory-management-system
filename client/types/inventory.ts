export interface Item {
  _id: string;
  name: string;
  sku: string;
  category: string;
  quantity: number;
  minLevel: number;
  price: number;
  createdAt: string;
  updatedAt: string;
}

export interface Transaction {
  _id: string;
  itemId: string;
  type: 'IN' | 'OUT';
  quantity: number;
  date: string;
}
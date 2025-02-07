import React, { useState } from 'react';

interface Item {
    title: string;
    description: string;
    price: number;
}

const  Asset: React.FC = () => {
  const [items, setItems] = useState<Item[]>([
    { description: '', title: '', price: 0 }
  ]);

  const addItem = () => {
    setItems([
      ...items,
      { description: '', title: '', price: 0 }
    ]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleChange = <K extends keyof Item>(index: number, field: K, value: Item[K]) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const calculateItemTotal = (item: Item) => {
    const baseTotal = item.price;
    return baseTotal;
  };

  const total = items.reduce((acc, item) => acc + calculateItemTotal(item), 0);
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Order Items</h2>
      {items.map((item, index) => (
        <div key={index} className="mb-6 p-6 bg-gray-100 rounded-2xl shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Item {index + 1}</h3>
            {items.length > 1 && (
              <button className="text-red-500 font-medium" onClick={() => removeItem(index)}>
                Remove
              </button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input 
                type="text" 
                placeholder="Item Title" 
                value={item.title} 
                onChange={(e) => handleChange(index, 'title', e.target.value)} 
                className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <input 
                type="text" 
                placeholder="Item Description" 
                value={item.description} 
                onChange={(e) => handleChange(index, 'description', e.target.value)} 
                className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Price</label>
              <input 
                type="number" 
                step="1"
                placeholder="Price" 
                value={item.price} 
                onChange={(e) => handleChange(index, 'price', parseFloat(e.target.value))} 
                className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      ))}
      <button 
        onClick={addItem} 
        className="w-full py-2 px-4 bg-black text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 transition duration-200"
      >
        Add Item
      </button>
      <div className="mt-6 text-right text-2xl font-bold">
        Total: ${total.toFixed(2)}
      </div>
    </div>
  );
};

export default Asset;
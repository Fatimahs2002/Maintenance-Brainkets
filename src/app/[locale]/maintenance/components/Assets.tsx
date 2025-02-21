import React, { useState } from 'react';

interface Item {
    title: string;
    description: string;
    price: number;
    location: string;
    serial_number: string;
    status: string;
}

const  Assets: React.FC = () => {
  const [items, setItems] = useState<Item[]>([
    { description: '', title: '', price: 0, location:'', serial_number:'', status:'' }
  ]);

  const addItem = () => {
    setItems([
      ...items,
      { description: '', title: '', price: 0, location:'', serial_number:'', status:''  }
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
    <div className="p-6 ">
      <h2 className="text-2xl font-bold mb-6 text-center">Task Assets</h2>
      {items.map((item, index) => (
        <div key={index} className="mb-6 p-6 bg-gray-100 rounded-2xl shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Asset {index + 1}</h3>
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
                placeholder="Asset Title" 
                value={item.title} 
                onChange={(e) => handleChange(index, 'title', e.target.value)} 
                className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <input 
                type="text" 
                placeholder="Asset Description" 
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 ">
              <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input 
                type="text" 
                placeholder="Asset Location" 
                value={item.location} 
                onChange={(e) => handleChange(index, 'location', e.target.value)} 
                className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
              </div>
              <div>
              <label className="block text-sm font-medium text-gray-700">Serial Number</label>
              <input 
                type="text" 
                placeholder="Serial Number" 
                value={item.serial_number} 
                onChange={(e) => handleChange(index, 'serial_number', e.target.value)} 
                className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
              </div>
              <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select 
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) => handleChange(index, 'status', e.target.value)}>
                <option>Operational</option>
                <option>Under Maintenance</option>
                <option>Out of Service</option>
              </select>
              </div>
            </div>
        </div>
      ))}
      <div className="flex justify-center space-x-4">
        <button 
          onClick={addItem} 
          className="px-1 py-1 text-sm lg:text-xl bg-blue-500 text-white lg:px-4 lg:py-2 rounded-md hover:bg-blue-600 focus:shadow-none ">
          Add Stage
        </button>
        <button 
          className="py-2 px-4 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-400 transition duration-200">
          Save
        </button>
      </div>

      <div className="mt-6 text-right text-2xl font-bold">
        Total: ${total.toFixed(2)}
      </div>
    </div>
  );
};

export default Assets;
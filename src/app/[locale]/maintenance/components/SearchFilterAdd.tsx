import { useState } from "react";
import { Button } from "primereact/button";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import CreateMaintenance from "./CreateMaintenance"; // Import component

import { Dialog } from "primereact/dialog";
interface PriorityOption {
  label: string;
  value: string;
}

const SearchFilterAdd: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedPriority, setSelectedPriority] = useState<string>("all");

  

  const priorityOptions: PriorityOption[] = [
    { label: "All", value: "all" },
    { label: "High", value: "high" },
    { label: "Medium", value: "medium" },
    { label: "Low", value: "low" },
  ];

  return (
    <div className="pl-5">
      <h1 className="text-xl font-semibold mb-4">All Maintenances</h1>

      <div className="flex items-center gap-4">
        <Dropdown
          value={selectedPriority}
          options={priorityOptions}
          optionLabel="label"
          optionValue="value"
          className="w-40"
          onChange={(e: DropdownChangeEvent) => setSelectedPriority(e.value)}

          
        />

        <InputText
          value={searchTerm}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
          placeholder="Search..."
          className="h-10 border border-gray-300 px-3 rounded-lg w-64 focus:rounded-lg"
        />

        {/* <Button
          label="Add Maintenance"
          className="bg-amber-300 text-white px-4 py-2 rounded-lg focus:shadow-none"
          onClick={() => {
            setVisible(true)
           
          }}
        /> */}
      </div>

   
    </div>
    
  );
};

export default SearchFilterAdd;

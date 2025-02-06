
import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";

const SearchFilterAdd = () => {

  const [searchTerm, setSearchTerm] = useState("");
  interface PriorityFilterProps {
    selectedPriority: string;
    setSelectedPriority: (priority: string) => void;
  }
  const priorityOptions = [
    { label: "All", value: "all" },
    { label: "High", value: "high" },
    { label: "Medium", value: "medium" },
    { label: "Low", value: "low" },
   
  ];
  const[selectedPriority,setSelectedPriority]=useState("ALL")
  const itemTemplate = (option: any) => {
    return (
      <div className="flex items-center gap-2 bg-white border-black">
        <span className={`priority-${option.value.toLowerCase()}`}>{option.label}</span>
      </div>
    );
  };
  return (
    <>
   
    <div className="flex items-center justify-between w-full px-5 mt-5">
  {/* Search Input & Button (Left Side) */}
  <div className="flex items-center w-auto">
    
  <Dropdown
        value={selectedPriority}
        options={priorityOptions}
        itemTemplate={itemTemplate}
        onChange={(e) => setSelectedPriority(e.value)}
        optionLabel="label"
        optionValue="value"
        className="bg-white h-10 w-40 rounded-s-lg focus:rounded-s-lg border border-gray-300 px-3"
        placeholder="Select Priority"
      />
    <InputText
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search..."
      className="h-10 w-60  border border-gray-300 px-3"
    />
    <Button
      icon="pi pi-search"
      className="bg-amber-300 hover:bg-amber-200 text-white border border-amber-300 h-10 w-20 rounded-r-lg"
    />
  </div>

  {/* Add Maintenance Button (Right Side) */}
  <Button
    label="Add Maintenance"
    className="text-xl bg-amber-300 text-white p-2 rounded-lg"
    style={{ fontSize: "1.5rem" }}
  />
</div>
</>
  );
};

export default SearchFilterAdd;

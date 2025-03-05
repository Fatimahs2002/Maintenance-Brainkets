"use client";
import { useState } from "react";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

interface PriorityOption {
  label: string;
  value: string;
}

interface SearchFilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedPriority: string;
  setSelectedPriority: (priority: string) => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({
  searchTerm,
  setSearchTerm,
  selectedPriority,
  setSelectedPriority,
}) => {
  const priorityOptions: PriorityOption[] = [
    { label: "All", value: "all" },
    { label: "High", value: "high" },
    { label: "Medium", value: "medium" },
    { label: "Low", value: "low" },
  ];

  return (
    <div className="pl-5 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-2/5">
      <h1 className="text-xl font-semibold mb-4">All Maintenances</h1>

      <div className="flex items-center gap-4 flex-wrap">

        <Dropdown
          value={selectedPriority}
          options={priorityOptions}
          optionLabel="label"
          optionValue="value"
          className="lg:w-40"
          onChange={(e: DropdownChangeEvent) => setSelectedPriority(e.value)}
        />

        <InputText
          value={searchTerm}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchTerm(e.target.value)
          }
          placeholder="Search..."
          className="h-10 border border-gray-300 px-3 rounded-lg lg:w-64 w-40 focus:rounded-lg"
        />
      </div>
    </div>
  );
};

export default SearchFilter;


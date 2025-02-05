
import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

const SearchFilterAdd = () => {

  const [searchTerm, setSearchTerm] = useState("");


  return (
    <div className="flex items-center justify-between w-full px-5 mt-5">
  {/* Search Input & Button (Left Side) */}
  <div className="flex items-center w-80">
    <InputText
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search..."
      className="h-10 w-full rounded-s-lg focus:rounded-s-lg border border-gray-300 px-3"
    />
    <Button
      icon="pi pi-search"
      className="bg-amber-300 hover:bg-amber-200 text-white border border-amber-300 h-10 w-10 rounded-r-lg"
    />
  </div>

  {/* Add Maintenance Button (Right Side) */}
  <Button
    label="Add Maintenance"
    className="text-xl bg-amber-300 text-white p-2 rounded-lg"
    style={{ fontSize: "1.5rem" }}
  />
</div>
  );
};

export default SearchFilterAdd;

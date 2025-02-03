import React, { useState, useRef } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { FileUpload } from "primereact/fileupload";

import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

type Errors = {
  title?: string;
  priority?: string;
  description?: string;
  assignedTo?: string;
  customer?: string;
  file?: string;
};

const UpdateMaintenance = () => {
  const [title, setTitle] = useState<string>("Bug Fix: User Authentication");
  const [selectedPriority, setSelectedPriority] = useState<string | null>("medium");
  const [description, setDescription] = useState<string>(
    "Fixing the user authentication issue where users are unable to log in after recent system update"
  );
  const [selectedAssignedTo, setSelectedAssignedTo] = useState<string | null>("Ali");
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>("Ellie");
  const [errors, setErrors] = useState<Errors>({});

  const fileUploadRef = useRef<FileUpload>(null);
  const [fileSelected, setFileSelected] = useState(false);

   const initialImageUrl: string = "/DALL·E 2025-02-02 18.15.02 - A professional and clean image of a software maintenance task being done by a developer. The image should feature a person sitting at a desk with a la.webp"; // Ensure the path is correct
  
   // const initialImageUrl: string = ""; 
  const [filePreview, setFilePreview] = useState<string>(initialImageUrl);
  const [fileUploaded, setFileUploaded] = useState<boolean>(false);

  const PriorityOption = [
    { label: "High", value: "high" },
    { label: "Medium", value: "medium" },
    { label: "Low", value: "low" },
    { label: "Urgent", value: "urgent" },
  ];

  const CustomerOption = [
    { label: "Jad", value: "Jad" },
    { label: "Hassan", value: "Hassan" },
    { label: "Ali", value: "Ali" },
    { label: "Ellie", value: "Ellie" },
  ];

  const assignedToOptions = [...CustomerOption];

  const validateField = (name: keyof Errors, value: any) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value ? undefined : `${name.charAt(0).toUpperCase() + name.slice(1)} is required`,
    }));
  };

  const handleSubmit = () => {
    const formErrors: Errors = {};
    if (!title) formErrors.title = "Title is required";
    if (!selectedPriority) formErrors.priority = "Priority is required";
    if (!description) formErrors.description = "Description is required";
    if (!selectedAssignedTo) formErrors.assignedTo = "Assign To is required";
    if (!selectedCustomer) formErrors.customer = "Customer is required";
    if (fileSelected && !fileUploaded) formErrors.file = "You must upload the selected file";

    setErrors(formErrors);
    if (Object.keys(formErrors).length === 0) {
      console.log("Maintenance Updated");
    }
  };
const HandelRemoveFile=()=>{
  setFilePreview("");
}

  return (
    
    <div className="bg-white p-6 rounded-lg shadow-md w-full mx-auto max-w-3xl">
      <h2 className="text-center text-lg font-semibold mb-4">Update Maintenance</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-medium mb-1">
            Title <span className="text-red-500">*</span>
          </label>
          <InputText
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              validateField("title", e.target.value);
            }}
            placeholder="Add title"
            className="w-full p-2 rounded-lg bg-gray-100 h-10"
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Priority <span className="text-red-500">*</span>
          </label>
          <Dropdown
            value={selectedPriority}
            onChange={(e) => {
              setSelectedPriority(e.value);
              validateField("priority", e.value);
            }}
            options={PriorityOption}
            optionLabel="label"
            placeholder="Select a Priority"
            className="w-full bg-gray-100 h-10"
          />
          {errors.priority && <p className="text-red-500 text-sm">{errors.priority}</p>}
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Description <span className="text-red-500">*</span>
          </label>
          <InputTextarea
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              validateField("description", e.target.value);
            }}
            placeholder="Description"
            className="w-full p-2 rounded-lg bg-gray-100"
            rows={4}
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Assign To <span className="text-red-500">*</span>
          </label>
          <Dropdown
            value={selectedAssignedTo}
            onChange={(e) => {
              setSelectedAssignedTo(e.value);
              validateField("assignedTo", e.value);
            }}
            options={assignedToOptions}
            optionLabel="label"
            placeholder="Assign To"
            filter
            className="w-full bg-gray-100 h-10"
          />
          {errors.assignedTo && <p className="text-red-500 text-sm">{errors.assignedTo}</p>}
           <div>
                  <label className="block mb-1 font-medium">
                    Customer <span className="text-red-500">*</span>
                  </label>
                  <Dropdown
                    value={selectedCustomer}
                    onChange={(e) => {
                      setSelectedCustomer(e.value);
                      validateField("customer", e.value);
                    }}
                    options={CustomerOption}
                    optionLabel="label"
                    placeholder="Select a Customer"
                    filter
                    className="w-full bg-gray-100 h-10"
                  />
                  {errors.customer && <p className="text-red-500 text-sm">{errors.customer}</p>}
                </div>
        </div>
      </div>
{filePreview && ( 
      <div>
  <label className="block mb-1 font-medium">Old Files</label>
  <div className="flex items-center gap-4 w-full bg-gray-100 rounded-lg p-2">
    <img src={filePreview} alt="No File Choosen" className="w-20 h-25 rounded-md" />
    <Button
      label="Clear"
      icon="pi pi-times"
      className="bg-red-500 text-white px-4 py-2 h-10 rounded-md hover:bg-red-600 focus:shadow-none"
    onClick={HandelRemoveFile}
    />
  </div>
</div>

)}
      <div className="mt-4">
        <label className="block mb-1 font-medium">Upload Files</label>
        <FileUpload
          // ref={fileUploadRef}
          // name="demo[]"
          // url="/api/upload"
          multiple
          // accept="image/*"
          // maxFileSize={1000000}
          chooseOptions={{
            label: "Choose",
            icon: "pi pi-plus",
            className: "bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:shadow-none" ,
          }}
          uploadOptions={{
            label: "Upload",
            icon: "pi pi-upload",
            className: "bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:shadow-none",
          }}
          cancelOptions={{
            label: "Clear",
            icon: "pi pi-times",
            className: "bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600  focus:shadow-none",
          }}
          // onSelect={(e) => {
          //   setFileSelected(e.files.length > 0);
          //   setFileUploaded(false); // Reset uploaded state when new file is selected
          
          // }}
          onUpload={(e) => {
            setFileUploaded(true);
            setErrors((prevErrors) => ({
              ...prevErrors,
              file: undefined, // Remove file error after upload
            }));
          }}
          
          onClear={() => {
            setFileSelected(false);
            setFileUploaded(false);
            setErrors((prevErrors) => ({
              ...prevErrors,
              file: undefined, // Remove file error if the file is cleared
            }));
          }}
          className="w-full bg-gray-100 rounded-lg "
          
        />
        
        {errors.file && <p className="text-red-500 text-sm">{errors.file}</p>}
      </div>

      <div className="flex justify-between mt-6">
        <Button label="Update Maintenance" onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:shadow-none" />
        <Button label="Cancel" className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 
        focus:shadow-none
        " />
      </div>
    </div>
  );
};

export default UpdateMaintenance;



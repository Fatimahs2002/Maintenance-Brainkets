"use client";
import React, { useState, useRef } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { FileUpload } from "primereact/fileupload";
import { Editor, EditorTextChangeEvent } from "primereact/editor";
import { OrderList } from "primereact/orderlist";
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

const CreateMaintenance = ({ onClose }: { onClose: () => void }) => {
  const [selectedPriority, setSelectedPriority] = useState<string | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);
  const [selectedAssignedTo, setSelectedAssignedTo] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [errors, setErrors] = useState<Errors>({});
  const fileUploadRef = useRef<FileUpload>(null);
  const [fileSelected, setFileSelected] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

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
    { label: "Jad", value: "Jad" },
    { label: "Hassan", value: "Hassan" },
    { label: "Ali", value: "Ali" },
    { label: "Ellie", value: "Ellie" }
  ];

  const assignedToOptions = [...CustomerOption];
  const formErrors: Errors = {};
  const validateField = (name: keyof Errors, value: any) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value ? undefined : `${name.charAt(0).toUpperCase() + name.slice(1)} is required`,
    }));
  };


  const handleSubmit = () => {
   

    if (!title) formErrors.title = "Title is required";
    if (!selectedPriority) formErrors.priority = "Priority is required";
    if (!description) formErrors.description = "Description is required";
    if (!selectedAssignedTo) formErrors.assignedTo = "Assign To is required";
    if (!selectedCustomer) formErrors.customer = "Customer is required";

    // File validation
    // if (!fileSelected) {
    //   formErrors.file = "Please choose a file";
    // } else if (!fileUploaded) {
    //   formErrors.file = "You must upload the selected file";
    // }
    if((fileSelected) &&(!fileUploaded)){
      formErrors.file = "You must upload the selected file";
    }

    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      console.log("New Maintenance Submitted");
    }
  };
 
    
  const [text, setText] = useState<string>('');

  //for description editor
  const editorRef = useRef<Editor | null>(null);
  const handleUndo = () => {
    if (editorRef.current) {
      const quill = editorRef.current.getQuill();
      quill.history.undo();
    }
  };
  
  const handleRedo = () => {
    if (editorRef.current) {
      const quill = editorRef.current.getQuill();
      quill.history.redo();
    }
  };
  
  const renderHeader = () => {
    return (
      <span className="ql-formats">
      <button className="ql-bold" aria-label="Bold"></button>
      <button className="ql-italic" aria-label="Italic"></button>
      <button className="ql-list" value="bullet" aria-label="Unordered List"></button>
      <button className="ql-list" value="ordered" aria-label="Ordered List"></button>
      <button onClick={handleUndo} type="button" className="ql-undo" aria-label="Undo">
  <i className="pi pi-undo rotate-0"></i> {/* Default direction */}
</button>
<button onClick={handleRedo} type="button" className="ql-undo" aria-label="Undo">
  <i className="pi pi-undo rotate-180"></i> {/* Flipped direction */}
</button>
    </span>
    );
};

const header = renderHeader();
  return (
    <div className="bg-white p-6 rounded-lg  w-full mx-auto max-w-3xl ">
      

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
            className="w-full p-2 rounded-lg bg-gray-100 h-10 focus:rounded-lg"
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
          <div className="card">
          <Editor 
  ref={editorRef}
  value={text} 
  onTextChange={(e: EditorTextChangeEvent) => setText(e.textValue)} 
  headerTemplate={renderHeader()} 
  className="rounded-lg bg-gray-100 border-none "  placeholder="Add Description" 
/>

        </div>

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

      <div>
        <label className="block mb-1 font-medium">
          Upload Files 
        </label>
        <style>
  {`
    .p-fileupload-filename  {
      display: none; /* Hides the file details */
    }
      .p-fileupload-file-thumbnail{
      width: 5rem;  /* Tailwind w-20 (20 * 0.25rem) = 5rem = 80px */
      height: 5rem;
      border-radius: 0.375rem
      }
     button:focus{

  box-shadow:none;
  }
  .p-fileupload-row{
  padding-top:10px;
  }
  `}
</style>
        <FileUpload
  ref={fileUploadRef}
  name="demo[]"
  multiple
  accept="image/*"
  maxFileSize={1000000}
  chooseOptions={{
    label: "Choose",
    icon: "pi pi-plus",
    className: "px-1 py-1 text-sm bg-blue-500 text-white lg:px-4 lg:py-2 lg:text-xl rounded-md hover:bg-blue-600 focus:shadow-none",
  }}
  uploadOptions={{
    label: "Upload",
    icon: "pi pi-upload",
    className: "px-1 py-1 text-sm bg-green-500 text-white lg: lg:px-4 py-2 lg:text-xl rounded-md hover:bg-green-600 focus:shadow-none",
  }}
  cancelOptions={{
    label: "Clear",
    icon: "pi pi-times",
    className: "px-1 py-1 text-sm bg-red-500 text-white lg:px-4 lg:py-2 lg:text-xl rounded-md hover:bg-red-600 focus:shadow-none",
  }}
  removeIcon="pi pi-times rounded-none focus:outline-none focus:ring-0"
  onSelect={(e) => {
    setSelectedFiles([...selectedFiles, ...e.files]);
    setFileSelected(true);
    setFileUploaded(false);
  }}
  onUpload={() => {
    setFileUploaded(true);
    setErrors((prevErrors) => ({
      ...prevErrors,
      file: undefined,
    }));
  }}
 
  onRemove={(event) => {
    const updatedFiles = selectedFiles.filter(file => file.name !== event.file.name);
    setSelectedFiles(updatedFiles);
    if (updatedFiles.length === 0) {
      setFileSelected(false);
      setErrors((prevErrors) => ({
        ...prevErrors,
        file: undefined,
      }));
    }
  }}
  onClear={() => {
    setSelectedFiles([]);
    setFileSelected(false);
    setFileUploaded(false);
    setErrors((prevErrors) => ({
      ...prevErrors,
      file: undefined,
    }));
  }}
  className="w-full bg-gray-100 rounded-lg   [&_.p-fileupload-remove]:rounded-none 
    [&_.p-fileupload-remove]:focus:rounded-none 
    [&_.p-fileupload-remove]:focus:ring-0"
/>

        {errors.file && <p className="text-red-500 text-sm">{errors.file}</p>}
      </div>

      <div className="flex justify-between ">
        <Button
          label="Add Maintenance"
          onClick={handleSubmit}
          className="px-1 py-1 text-sm lg:text-xl bg-blue-500 text-white lg:px-4 lg:py-2 rounded-md hover:bg-blue-600 focus:shadow-none "
        />
        <Button
        onClick={() => {
          // Reset all state variables to their default values
          setTitle("");
          setSelectedPriority(null);
          setDescription("");
          setSelectedAssignedTo(null);
          setSelectedCustomer(null);
          setFileSelected(false);
          setFileUploaded(false);
          // If you are showing a file preview, clear it here as well:
          // setFilePreview(null);
          // Also clear any errors if needed
          setErrors({});
          onClose()
        }}
          label="Cancel"
          
          className=" px-1 py-1 text-sm lg:text-xl bg-gray-300 text-black lg:px-4 lg:py-2 rounded-md hover:bg-gray-400 focus:shadow-none "
        />
      </div>
    </div>
  );
};

export default CreateMaintenance;

// function elseif(fileSelected: boolean) {
//   throw new Error("Function not implemented.");
// }


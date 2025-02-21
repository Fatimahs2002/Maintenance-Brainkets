"use client";
import React, { useState, useRef } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { FileUpload } from "primereact/fileupload";
import { Editor, EditorTextChangeEvent } from "primereact/editor";
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

const UpdateMaintenance = ({ onClose }: { onClose: () => void }) => {
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
  const [fileUploaded, setFileUploaded] = useState<boolean>(false);
   const initialImageUrl: string = "/DALL·E 2025-02-02 18.15.02 - A professional and clean image of a software maintenance task being done by a developer. The image should feature a person sitting at a desk with a la.webp"; // Ensure the path is correct
  
   // const initialImageUrl: string = ""; 
  const [filePreview, setFilePreview] = useState<string>(initialImageUrl);
  //for remove icon
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
    
    if((fileSelected) && (!fileUploaded)){
      formErrors.file = "You must upload the selected file";
  
    }

    setErrors(formErrors);
    if (Object.keys(formErrors).length === 0) {
      console.log("Maintenance Updated");
    }
  };
const HandelRemoveFile=()=>{
  setFilePreview("");
}
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

  function setText(textValue: string): void {
    throw new Error("Function not implemented.");
  }

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
       
          <Editor 
  ref={editorRef}
  value={description} 
  onTextChange={(e: EditorTextChangeEvent) => {
    setDescription(e.textValue);
    validateField("description", e.textValue); // Use e.textValue instead of e.target.value
  }} 
  headerTemplate={renderHeader()} 
  className="rounded-lg bg-gray-100 border-none"  
  placeholder="Add Description" 
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
      className="px-1 py-1 text-sm bg-red-500 text-white lg:px-4 lg:py-2 lg:text-xl h-10 rounded-md hover:bg-red-600 focus:shadow-none"
    onClick={HandelRemoveFile}
    />
  </div>
</div>

)}
      <div className="mt-4">
        <label className="block mb-1 font-medium">Upload Files</label>
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
          // name="demo[]"
          url="/api/upload"
          multiple
          
          accept="image/*"
          maxFileSize={1000000}
        
       
          chooseOptions={{
            label: "Choose",
            icon: "pi pi-plus",
            className: " px-1 py-1 text-sm bg-blue-500 text-white px-4 py-2 rounded-md lg:px-4 lg:py-2 lg:text-xl hover:bg-blue-600 focus:shadow-none" ,
          }}
          uploadOptions={{
            label: "Upload",
            icon: "pi pi-upload",
            className: " px-1 py-1 text-sm bg-green-500 text-white   lg:px-4 lg:py-2 lg:text-xl rounded-md hover:bg-green-600 focus:shadow-none",
          }}
          cancelOptions={{
            label: "Clear",
            icon: "pi pi-times",
            className: " px-1 py-1 text-sm bg-red-500 text-white lg:px-4 lg:py-2 lg:text-xl rounded-md hover:bg-red-600 focus:shadow-none",
          }}
          onSelect={(e) => {
            // setFileSelected(e.files.length > 0);
            // setFileUploaded(false); // Reset uploaded state when new file is selected
            setSelectedFiles([...selectedFiles, ...e.files]);
            setFileSelected(true);
            setFileUploaded(false);
          }}
          onUpload={(e) => {
            setFileUploaded(true);
            setErrors((prevErrors) => ({
              ...prevErrors,
              file: undefined, // Remove file error after upload
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
            setFileSelected(false);
            setFileUploaded(false);
            setErrors((prevErrors) => ({
              ...prevErrors,
              file: undefined, // Remove file error if the file is cleared
            }));
          }}
          className="w-full bg-gray-100 rounded-lg  "
          
        />
        
        {errors.file && <p className="text-red-500 text-sm">{errors.file}</p>}
      </div>

      <div className="flex justify-between mt-6">
        <Button label="Update Maintenance" onClick={handleSubmit} 
        className=" px-1 py-1 text-sm lg:text-xl bg-blue-500 text-white lg:px-4 lg:py-2 rounded-md hover:bg-blue-600 focus:shadow-none"
         />
        <Button label="Cancel" className=" px-1 py-1 text-sm lg:text-xl bg-gray-300 text-black lg:px-4 lg:py-2 rounded-md hover:bg-gray-400 focus:shadow-none" 
      onClick={()=>{
        onClose()
      }}
        />
      </div>
    </div>
  );
};

export default UpdateMaintenance;



import React, { useState, useRef } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
interface IconDeleteProps{
  className ?:string
}
const IconDelete:React.FC<IconDeleteProps> = ({className=""}) => {
  const [visible, setVisible] = useState<boolean>(false);
  const toast = useRef<Toast>(null);

  const handleDelete = () => {
    toast.current?.show({
      severity: "info",
      summary: "Task Deleted",
      detail: "The task has been successfully deleted.",
      life: 3000,
    });
    setVisible(false);
  };

  const handleCancel = () => {
    toast.current?.show({
      severity: "warn",
      summary: "Action Cancelled",
      detail: "The delete action was cancelled.",
      life: 3000,
    });
    setVisible(false);
  };

  return (
    <>
      <Button
        icon="pi pi-trash"
        className={`lg:text-xl md:text-sm focus:shadow-none ${className}`}
        onClick={() => setVisible(true)}
      />

      <Dialog
        header="Delete Task"
        visible={visible}
        style={{ width: "90vw", maxWidth: "400px" }} // Responsive dialog width
        onHide={handleCancel}
      >
        <p className="text-lg text-gray-800 text-center">
          Are you sure you want to delete this task?
        </p>
        <div className="flex justify-center sm:justify-end mt-6 gap-3">
          <Button
            label="Cancel"
            className="p-button-secondary bg-gray-300 text-gray-700 px-4 py-2 rounded-lg shadow-md  sm:w-auto"
            onClick={handleCancel}
          />
          <Button
            label="Delete"
            className="p-button-danger bg-red-500 text-white px-4 py-2 rounded-lg shadow-md  sm:w-auto"
            onClick={handleDelete}
          />
        </div>
      </Dialog>

      <Toast ref={toast} position="top-right"  className="w-auto"/>
    </>
  );
};

export default IconDelete;

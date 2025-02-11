import React, { useRef } from "react"; // Import useRef
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

const IconDelete = () => {
  const toast = useRef<Toast>(null); // Create a reference for Toast

  const confirmDelete = () => {
    confirmDialog({
      header: (
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold text-gray-800">Delete Task</span>
        </div>
      ),
      message: (
        <div className="flex items-center gap-4">
          <span className="text-lg font-medium text-gray-700">
            Are you sure you want to delete this task?
          </span>
        </div>
      ),
      className: "rounded-lg shadow-lg p-6 border border-gray-200 bg-white",
      acceptClassName:
        "p-button-danger bg-red-500 border-red-600 text-white px-4 py-2 rounded-lg shadow-md ml-3 mt-1",
      rejectClassName:
        "p-button-secondary bg-gray-300 text-gray-700 px-4 py-2 rounded-lg shadow-md mt-1",
      accept: () => {
        toast.current?.show({
          severity: "info",
          summary: "Task Deleted",
          detail: "The task has been successfully deleted.",
          life: 3000,
        });
      },
      reject: () => {
        toast.current?.show({
          severity: "warn",
          summary: "Cancelled",
          detail: "Task was not deleted.",
          life: 3000,
        });
      },
    });
  };

  return (
    <>
      <Button
        icon="pi pi-trash"
        className="text-xl text-red-500 focus:shadow-none"
        onClick={confirmDelete} // No need for an arrow function here
      />
      <Toast ref={toast} position="top-right" />
      <ConfirmDialog />
    </>
  );
};

export default IconDelete;

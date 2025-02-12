import React, { useState, useRef } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";

const IconDelete = () => {
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
        className="text-xl text-red-500 focus:shadow-none"
        onClick={() => setVisible(true)}
      />

      <Dialog
        header="Delete Task"
        visible={visible}
        style={{ width: "30vw" }}
        onHide={handleCancel} // Show toast when closed
      >
        <p>Are you sure you want to delete this task?</p>
        <div className="flex justify-end mt-4 gap-3">
          <Button
            label="Cancel"
            className="p-button-secondary bg-gray-300 text-gray-700 px-4 py-2 rounded-lg shadow-md"
            onClick={handleCancel} // Show toast when clicking Cancel
          />
          <Button
            label="Delete"
            className="p-button-danger bg-red-500 text-white px-4 py-2 rounded-lg shadow-md"
            onClick={handleDelete}
          />
        </div>
      </Dialog>

      <Toast ref={toast} position="top-right" />
    </>
  );
};

export default IconDelete;



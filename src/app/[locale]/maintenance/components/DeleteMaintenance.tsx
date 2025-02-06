"use client";
import React, { useState, useRef } from "react";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Button } from "primereact/button";

interface DeleteMaintenanceProps {
  id: number;
}

const DeleteMaintenance: React.FC<DeleteMaintenanceProps> = ({ id }) => {
  const [tasks, setTasks] = useState<{ [key: string]: { id: number; name: string }[] }>({});
  const toast = useRef<any>(null);

  const handleDelete = (id: number) => {
    setTasks((prev) => {
      const updatedTasks = { ...prev };
      for (const column in updatedTasks) {
        updatedTasks[column] = updatedTasks[column].filter((task) => task.id !== id);
      }
      return updatedTasks;
    });

    toast.current?.show({
      severity: "info",
      summary: (
        <div className="rounded-lg shadow-lg p-6 border border-gray-200 bg-white">
          <div>
            <i className="pi pi-check-circle text-green-500 text-xl"></i>
            <span className="font-semibold text-black ml-2 text-xl">Deleted</span>
          </div>
          <span>Task deleted successfully</span>
        </div>
      ),
      life: 3000,
    });
  };

  const confirmDelete = (id: number) => {
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
      acceptClassName: "p-button-danger bg-red-500 border-red-600 text-white px-4 py-2 rounded-lg shadow-md ml-3 mt-1",
      rejectClassName: "p-button-secondary bg-gray-300 text-gray-700 px-4 py-2  rounded-lg shadow-md mt-1",
      accept: () => handleDelete(id),
      reject: () => {
        toast.current?.show({
          severity: "warn",
          summary: (
            <div className="rounded-lg shadow-lg p-6 border border-gray-200 bg-white">
              <div className="flex items-center">
                <i className="pi pi-times-circle text-red-500 text-2xl"></i>
                <span className="font-semibold text-black ml-3 text-xl">Cancelled</span>
              </div>
              <span className="text-sm">Task was not deleted.</span>
            </div>
          ),
          life: 3000,
        });
      },
    });
  };

  return (
    <>
      <Toast ref={toast} position="top-right" />
      <ConfirmDialog />
      <Button
        onClick={() => confirmDelete(id)} // Use the id prop passed to the component
        icon="pi pi-trash"
        label=""
        className="text-xl text-red-500"
      />
    </>
  );
};

export default DeleteMaintenance;



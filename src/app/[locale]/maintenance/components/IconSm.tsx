"use client";

import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { ListBox } from "primereact/listbox";
import IconEdit from "./IconEdit";
import IconDelete from "./IconDelete";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

interface IconSmProps {
  taskId: number;
  currentStatus: string;
  onMoveTask: (taskId: number, newStatus: string) => void;
}

const IconSm: React.FC<IconSmProps> = ({ taskId, currentStatus, onMoveTask }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  const statuses = ["pending", "inProgress", "completed"];

  const handleMoveTask = () => {
    if (selectedStatus) {
      onMoveTask(taskId, selectedStatus);
      setShowDialog(false);
    }
  };

  return (
    <>
      <div className="flex gap-2 justify-end lg:hidden md:hidden">
        <Button
          icon="pi pi-ellipsis-v"
          className="text-xl focus:shadow-none"
          onClick={() => setShowPopup(true)}
        />
      </div>

      {/* Popup Dialog to Show Icons */}
      <Dialog
        visible={showPopup}
        onHide={() => setShowPopup(false)}
        className="w-auto bg-white shadow-lg border border-gray-200"
        header="Actions"
        closable
      >
        <div className="flex gap-2">
          <Button
            icon="pi pi-eye"
            className="md:text-sx lg:text-lg text-white bg-blue-500 hover:bg-blue-600 rounded-lg w-10 h-10 flex items-center justify-center cursor-pointer focus:shadow-none"
            style={{ fontSize: "1.5rem" }}
          />

          <IconEdit
            className="md:text-sx lg:text-lg text-white bg-green-500 hover:bg-green-600 rounded-lg w-10 h-10 flex items-center justify-center cursor-pointer focus:shadow-none"
            //onClick={() => setShowPopup(false)} // Close the popup
          />

          <IconDelete
            className="md:text-sx lg:text-lg text-white bg-red-500 hover:bg-red-600 rounded-lg w-10 h-10 flex items-center justify-center cursor-pointer focus:shadow-none"
          />

          {currentStatus === "completed" && (
            <Button
              icon="pi pi-list-check"
              className="cursor-pointer focus:shadow-none md:text-sx lg:text-lg text-white bg-gray-500 hover:bg-gray-600 rounded-lg w-10 h-10 flex items-center justify-center"
            />
          )}

          <Button
            icon="pi pi-arrow-right"
            className="text-white bg-amber-300 hover:bg-amber-400 rounded-lg w-10 h-10 focus:shadow-none cursor-pointer"
            onClick={() => {
              setSelectedStatus(currentStatus);
              setShowDialog(true);
              setShowPopup(false);
            }}
          />
        </div>
      </Dialog>

      {/* Move Task Dialog */}
      <Dialog
        visible={showDialog}
        onHide={() => setShowDialog(false)}
        header="Move Task"
        className="w-auto bg-white shadow-lg border border-gray-200"
        footer={
          <Button
            label="Move"
            onClick={handleMoveTask}
            className="bg-blue-500 text-white hover:bg-blue-600 cursor-pointer px-1 py-1 text-sm rounded-md focus:shadow-none"
          />
        }
      >
        <ListBox
          value={selectedStatus}
          options={statuses.map((status) => ({ label: status, value: status }))}
          onChange={(e) => setSelectedStatus(e.value)}
        />
      </Dialog>
    </>
  );
};

export default IconSm;



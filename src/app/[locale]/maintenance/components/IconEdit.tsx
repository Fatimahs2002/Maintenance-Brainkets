import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import UpdateMaintenance from "./UpdateMaintenance";

interface IconEditProps {
  className?: string;
  onClick?: () => void;
}

const IconEdit: React.FC<IconEditProps> = ({ className = "", onClick }) => {
  const [visible, setVisible] = useState(false);

  const handleClick = () => {
    if (onClick) {
      onClick(); // Close the 'Actions' popup first
    }
    setTimeout(() => {
      setVisible(true); // Open the 'Update Maintenance' dialog with a delay to avoid conflicts
    }, 200); // Short delay to ensure the Actions dialog is fully closed
  };

  return (
    <>
      <Button
        icon="pi pi-pen-to-square"
        className={`lg:text-xl md:text-sm focus:shadow-none ${className}`}
        onClick={handleClick}
      />

      <Dialog
        visible={visible}
        onHide={() => setVisible(false)} // Now only hides on explicit action
        header="Update Maintenance"
        className="lg:w-1/2"
        modal
        draggable={false}
        style={{ zIndex: 1000 }}
      >
        <UpdateMaintenance onClose={() => setVisible(false)} />
      </Dialog>
    </>
  );
};

export default IconEdit;





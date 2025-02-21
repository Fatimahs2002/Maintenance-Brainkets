import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import UpdateMaintenance from "./UpdateMaintenance"; // Import your UpdateMaintenance component

interface IconEditProps {
  className?: string;
}

const IconEdit: React.FC<IconEditProps> = ({ className = "" }) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button
        icon="pi pi-pen-to-square"
        className={`lg:text-xl md:text-sm focus:shadow-none ${className}`}
        onClick={() => setVisible(true)}
      />

      <Dialog
        visible={visible}
        onHide={() => setVisible(false)}
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


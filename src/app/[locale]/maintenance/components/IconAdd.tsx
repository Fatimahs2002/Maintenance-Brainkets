// "use client";
// import React from "react";
// import { Button } from "primereact/button";
// import { useState } from "react";
// import {Link} from "react-router-dom"
// import { Dialog } from "primereact/dialog";
// import CreateMaintenance from "./CreateMaintenance";
// const IconAdd :React.FC= () => {
//      const [visible, setVisible] = useState<boolean>(false);
   
//      return (
//        <>
//        <Link to="./CreateMaintenance.tsx">
//          <Button
//            icon="pi pi-plus"
//            className="text-xl focus:shadow-none font-bold bg-white px-3 py-1 rounded-lg shadow-sm w-10 h-10" // Ensure alignment
//            onClick={() => setVisible(true)}
//          />
//      </Link>

//          <Dialog
//            header=""
//            visible={visible}
//            style={{ width: "50vw" }}
//            onHide={() => setVisible(false)}
//          >
//            <CreateMaintenance onClose={() => setVisible(false)} />
//          </Dialog>
//        </>
//      );
//    };
   

// export default IconAdd;
"use client";
import React from "react";
import { Button } from "primereact/button";
interface OpenCreateButtonProps {
  onClick: () => void;
}

const IconAdd: React.FC<OpenCreateButtonProps> = ({ onClick }) => {
  return (
  
    <Button
           icon="pi pi-plus"
           className="text-xl focus:shadow-none font-bold bg-white px-3 py-1 rounded-lg shadow-sm w-10 h-10" // Ensure alignment
           onClick={onClick}
         />
  );
};

export default IconAdd;



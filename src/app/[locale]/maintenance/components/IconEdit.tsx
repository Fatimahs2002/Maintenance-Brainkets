// import React from "react";
// import { Button } from "primereact/button";
// import { useState } from "react";

// import { Dialog } from "primereact/dialog";
// import UpdateMaintenance from "./UpdateMaintenance";
// const IconEdit = () => {
//     //for update
//     const [visible, setVisible] = useState<boolean>(false);
   
//      return (
//        <>
//           <Button
//            icon="pi pi-pen-to-square cursor-pointer"
//           className="text-xl focus:shadow-none"
//       onClick={()=>{
//       setVisible(true)
//      }
//       }
//      />

// <Dialog header="" visible={visible} style={{ width: '50vw' }} onHide={() => {if (!visible) return; setVisible(false); }}>
//                <UpdateMaintenance onClose={() => setVisible(false)}/>
//             </Dialog>
   
     
//        </>
//      );
//    };
   

// export default IconEdit;

"use client";
import React from "react";
import { Button } from "primereact/button";

interface IconEditProps {
  onClick: () => void;
}

const IconEdit: React.FC<IconEditProps> = ({ onClick }) => {
  return (
    <Button
      icon="pi pi-pencil"
      className="text-xl focus:shadow-none"
      onClick={onClick}
    />
  );
};

export default IconEdit;

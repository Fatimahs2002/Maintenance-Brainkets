"use client";
import React, { useState } from "react";
import KanbanBoard from "./components/KanbanBoard";
import CreateMaintenance from "./components/CreateMaintenance";
import UpdateMaintenance from "./components/UpdateMaintenance";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
const Page: React.FC = () => {


  return (
    <div>
   
      <KanbanBoard />
    </div>
  );
};

export default Page;







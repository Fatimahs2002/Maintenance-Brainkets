"use client";
import React from "react";
import CreateMaintenance from "./components/CreateMaintenance";
import UpdateMaintenance from "./components/UpdateMaintenance";
import KanbanBoard from "./components/KanbanBoard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Page = () => {
  return (
   
      <div>
        <KanbanBoard />
        
      
      </div>
   
  );
};

export default Page;



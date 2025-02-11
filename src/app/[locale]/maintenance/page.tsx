"use client";
import React from "react";
import CreateMaintenance from "./components/CreateMaintenance";
import UpdateMaintenance from "./components/UpdateMaintenance";
import KanbanBoard from "./components/KanbanBoard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchFilterAdd from "./components/SearchFilterAdd";
const Page = () => {
  return (
   
      <div>
          <div className="mt-10">
                <SearchFilterAdd />
              </div>
        <KanbanBoard />
        
      
      </div>
   
  );
};

export default Page;



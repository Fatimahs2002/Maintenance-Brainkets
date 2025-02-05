"use client";
import React, { useState, useRef } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Button } from "primereact/button";
import 'primeicons/primeicons.css';
import SearchFilterAdd from "./SearchFilterAdd";
interface MaintenanceTask {
  id: number;
  title: string;
  date: string;
  priority: string;
}

const initialTasks: { [key: string]: MaintenanceTask[] } = {
  pending: [
    { id: 1, title: "Fix Server Issue", priority: "medium", date: "04-Feb-25" },
    { id: 2, title: "Update Database Schema", priority: "high", date: "06-Feb-25" },
    { id: 3, title: "Bug Fix: User Authentication", priority: "low", date: "08-Feb-25" },
    { id: 4, title: "Optimize API Performance", priority: "medium", date: "10-Feb-25" },
  ],
  inProgress: [],
  completed: [],
};

const KanbanBoard: React.FC = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const toast = useRef<Toast>(null);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);

  const handleDelete = (id: number) => {
    setTasks((prev) => {
      const updatedTasks = { ...prev };
      for (const column in updatedTasks) {
        updatedTasks[column] = updatedTasks[column].filter((task) => task.id !== id);
      }
      return updatedTasks;
    });

    toast.current?.show({
      // severity: "info",
      // summary: "Deleted",
      // detail: "Task successfully deleted.",
      // className: "rounded-lg shadow-lg p-6 border border-gray-200 bg-white",
      // life: 3000,
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
    setSelectedTaskId(id);
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
    <div >
    <div className="mt-10">
        <Toast ref={toast} position="top-right" />
       <SearchFilterAdd />
      </div>
      <ConfirmDialog /> {/* ✅ Only One Global Dialog */}

      <DragDropContext onDragEnd={() => {}}>
        <div className="flex gap-4 p-6">
       
          {Object.entries(tasks).map(([columnId, columnTasks]) => (
            <Droppable key={columnId} droppableId={columnId}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} className="w-1/3 bg-gray-200 p-4 rounded-lg min-h-20">
                  <h2 className="text-lg font-bold mb-3 capitalize">{columnId}</h2>
                  {columnTasks.map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                      {(provided) => (
                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <Card className="mb-3 p-3 bg-white shadow-md rounded-md">
                            <div className="flex items-center gap-2">
                              <h1 className="font-bold">Title:</h1> <span>{task.title}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <h1 className="font-bold">Priority:</h1> <span>{task.priority}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <h1 className="font-bold">Date:</h1> <span>{task.date}</span>
                            </div>
                            <div className="flex items-center gap-2 justify-end">
                            
                              <Button
                                
                                icon="pi pi-eye  cursor-pointer"
                                label=""
                                className="text-xl"
                                style={{ fontSize: '1.5rem' }}

                              />
                               <Button
                               
                                icon="pi pi-pen-to-square  cursor-pointer"
                                label=""
                                className="text-xl"
                              />
                              <Button
                                onClick={() => confirmDelete(task.id)}
                                icon="pi pi-trash"
                                label=""
                                className="text-xl text-red-500"
                              />
                            </div>
                          </Card>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
      </div>
    </>
   
  );
};

export default KanbanBoard;


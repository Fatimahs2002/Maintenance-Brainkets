"use client";
import React, { useState, useRef } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Dialog } from "primereact/dialog";
import UpdateMaintenance from "./UpdateMaintenance";
import IcodAdd from "./IconAdd";
import IconAdd from "./IconAdd";

interface MaintenanceTask {
  id: number;
  title: string;
  date: string;
  priority: string;
  CustomerName: string;
}

const initialTasks: { [key: string]: MaintenanceTask[] } = {
  pending: [
    { id: 1, title: "Fix Server Issue", priority: "medium", CustomerName: "Ali", date: "04-Feb-25" },
    { id: 2, title: "Update Database Schema", priority: "high", CustomerName: "Hassan", date: "06-Feb-25" },
    { id: 3, title: "Bug Fix: User Authentication", priority: "low", CustomerName: "Mark", date: "08-Feb-25" },
    { id: 4, title: "Optimize API Performance", priority: "medium", CustomerName: "Jad", date: "10-Feb-25" },
  ],
  inProgress: [],
  completed: [],
};

const KanbanBoard: React.FC = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [taskToDelete, setTaskToDelete] = useState<number | null>(null);
  const toast = useRef<Toast>(null);

  const confirmDelete = (taskId: number) => {
    setTaskToDelete(taskId);
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
      acceptClassName:
        "p-button-danger bg-red-500 border-red-600 text-white px-4 py-2 rounded-lg shadow-md ml-3 mt-1",
      rejectClassName:
        "p-button-secondary bg-gray-300 text-gray-700 px-4 py-2 rounded-lg shadow-md mt-1",
      accept: () => handleTaskDelete(taskId),
      reject: () => {
        toast.current?.show({
          severity: "warn",
          summary: "Cancelled",
          detail: "Task was not deleted.",
          life: 3000,
        });
      },
    });
  };

  const handleTaskDelete = (taskId: number) => {
    const updatedTasks = { ...tasks };
    Object.keys(updatedTasks).forEach((column) => {
      updatedTasks[column] = updatedTasks[column].filter((task) => task.id !== taskId);
    });

    setTasks(updatedTasks);

    toast.current?.show({
      severity: "info",
      summary: "Task Deleted",
      detail: "The task has been successfully deleted.",
      life: 3000,
    });
  };

  const onDragEnd = (result: any) => {
    const { destination, source } = result;
    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return;
    }

    const startColumn = source.droppableId;
    const endColumn = destination.droppableId;
    const movedTask = tasks[startColumn][source.index];

    const newStartTasks = [...tasks[startColumn]];
    newStartTasks.splice(source.index, 1);

    const newEndTasks = [...tasks[endColumn]];
    newEndTasks.splice(destination.index, 0, movedTask);

    setTasks({
      ...tasks,
      [startColumn]: newStartTasks,
      [endColumn]: newEndTasks,
    });
  };
//for update
const [visible, setVisible] = useState<boolean>(false)



  return (
    <div>
      <Dialog header="" visible={visible} style={{ width: '50vw' }} onHide={() => {if (!visible) return; setVisible(false); }}>
               <UpdateMaintenance onClose={() => setVisible(false)}/>
            </Dialog>
      <Toast ref={toast} position="top-right" />
      <ConfirmDialog />
    

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-4 p-6">
          {Object.entries(tasks).map(([columnId, columnTasks]) => (
            <Droppable key={columnId} droppableId={columnId}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="w-1/3 bg-gray-300 p-4 rounded-lg min-h-20 border-gray-300"
                  
                >
<div className="border-b-2 flex w-full justify-between items-center">
  <h2 className="text-lg font-bold capitalize">{columnId}</h2>
  
  <div className="flex items-center gap-2 mb-1">
    <IconAdd />
    <span className="text-gray-600 font-bold bg-white rounded-lg shadow-sm w-10 h-10 text-xl flex items-center justify-center">
  {columnTasks.length}
</span>

  </div>
</div>



                  {columnTasks.map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Card className="mb-3 p-3 bg-white shadow-md rounded-md mt-5">
                            <div className="flex items-center gap-2">
                              <h1 className="font-bold">Title:</h1> <span>{task.title}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <h1 className="font-bold">Priority:</h1> <span>{task.priority}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <h1 className="font-bold">Customer Name:</h1> <span>{task.CustomerName}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <h1 className="font-bold">Date:</h1> <span>{task.date}</span>
                            </div>
                            <div className="flex items-center gap-2 justify-end">
                              <Button
                                icon="pi pi-eye cursor-pointer"
                                className="text-xl focus:shadow-none"
                                style={{ fontSize: "1.5rem" }}
                              />
                              <Button
                                icon="pi pi-pen-to-square cursor-pointer"
                                className="text-xl focus:shadow-none"
                                onClick={()=>{
                                  setVisible(true)
                                }
                                }
                              />
                              <Button
                                icon="pi pi-trash"
                                className="text-xl text-red-500 focus:shadow-none"
                                onClick={() => confirmDelete(task.id)}
                              />
                            {columnId === "completed" && (
  <Button icon="pi pi-book" className="text-xl focus:shadow-none" />
)}
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
  );
};

export default KanbanBoard;

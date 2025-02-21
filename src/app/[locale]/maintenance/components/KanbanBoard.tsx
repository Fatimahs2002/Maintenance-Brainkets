"use client";
import React, { useState, useRef, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { ListBox } from "primereact/listbox";
import { ConfirmPopup } from 'primereact/confirmpopup'; // To use <ConfirmPopup> tag
import { confirmPopup } from 'primereact/confirmpopup'; // To use confirmPopup method
import { Sidebar } from "primereact/sidebar";
import { Dialog } from "primereact/dialog";   
import IconSm from "./IconSm";
import IconAdd from "./IconAdd";
import IconEdit from "./IconEdit";
import IconDelete from "./IconDelete";
import SearchFilterAdd from "./SearchFilter";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Menu } from "primereact/menu";
import Asset from "./asset";
import ViewMore from "./viewtask";

interface Task {
  id: number;
  title: string;
  date: string;
  priority: string;
  CustomerName: string;
}

interface TasksState {
  [columnId: string]: Task[];
}

const initialTasks: TasksState = {
  pending: [
    { id: 1, title: "Fix Server Issue", priority: "medium", CustomerName: "Ali", date: "04-Feb-25" },
    { id: 2, title: "Update Database Schema", priority: "high", CustomerName: "Hassan", date: "06-Feb-25" },
  ],
  inProgress: [
    { id: 3, title: " User Authentication", priority: "low", CustomerName: "Mark", date: "08-Feb-25" },
    { id: 5, title: "Bug Fix: User Authentication", priority: "low", CustomerName: "Mark", date: "08-Feb-25" },
  ],
  completed: [
    { id: 4, title: "Optimize API Performance", priority: "medium", CustomerName: "Jad", date: "10-Feb-25" },
  ],
};

function KanbanBoard() {
  const [tasks, setTasks] = useState(initialTasks);
  const [selectedColumn, setSelectedColumn] = useState<keyof TasksState>("pending");
  const toast = useRef<Toast>(null);
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(window.innerWidth < 768);
  const [iconVisibility, setIconVisibility] = useState<{ [key: number]: boolean }>({});
  const [listboxVisibility, setListboxVisibility] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const onDragEnd = (result: any) => {
    if (!isSmallScreen && result.destination) {
      const { source, destination } = result;
      const sourceColumn = [...tasks[source.droppableId]];
      const destColumn = [...tasks[destination.droppableId]];
      const [movedTask] = sourceColumn.splice(source.index, 1);
      destColumn.splice(destination.index, 0, movedTask);

      setTasks({
        ...tasks,
        [source.droppableId]: sourceColumn,
        [destination.droppableId]: destColumn,
      });
    }
  };


  const moveTask = (taskId: number, newStatus: string) => {
    let taskToMove: Task | null = null;
    const updatedTasks = { ...tasks };
  
    // Find and remove the task from its current column
    Object.keys(updatedTasks).forEach((column) => {
      const taskIndex = updatedTasks[column].findIndex((task) => task.id === taskId);
      if (taskIndex !== -1) {
        taskToMove = updatedTasks[column].splice(taskIndex, 1)[0];
      }
    });
  
    // Add the task to the new column
    if (taskToMove) {
      updatedTasks[newStatus].push(taskToMove);
      setTasks(updatedTasks);
    }
  };

  return (
    <>
      <div className="mt-10">
        <SearchFilterAdd />
    
      </div>

      {isSmallScreen && (
        <div className="flex justify-center gap-2 my-4 ">
          {Object.keys(tasks).map((columnId) => (
            <Button
              key={columnId}
              label={columnId}
              onClick={() => setSelectedColumn(columnId as keyof TasksState)}
              className={`px-1 py-1 text-sm  rounded-md focus:shadow-none  ${
                selectedColumn === columnId ? "bg-gray-200 text-black focus:shadow-none" : "bg-gray-100 text-black hover:bg-gray-200"
              }`}
            />
          ))}
        </div>
      )}

      <div className="p-4">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(tasks).map(([columnId, columnTasks]) => (
              <Droppable key={columnId} droppableId={columnId}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps} className="bg-gray-100 p-4 rounded-lg border shadow-sm min-h-[200px]">
                    <div className="border-b-2 flex justify-between items-center pb-2 mb-2">
                      <h2 className="text-lg font-bold capitalize">{columnId}</h2>
                      <div className="flex items-center gap-2">
                        <IconAdd />
                        <span className="text-white font-bold bg-amber-300 rounded-lg shadow-sm w-10 h-10 flex items-center justify-center">
                          {columnTasks.length}
                        </span>
                      </div>
                    </div>
                    {columnTasks.map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                        {(provided) => (
                          <div className=" grid grid-cols-2 lg:grid-cols-1- md:grid-cols-1" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                            <Card className=" mb-3 bg-white rounded-md mt-5 border-2 p-0 shadow-none ">
                              <div className="flex justify-between items-center w-full">
                                <div className="flex items-center gap-2">
                                  <h1 className="font-bold md:text-sm lg:text-lg">Priority:</h1>
                                  <span className="lg:text-lg md:text-sm">{task.priority}</span>
                                </div>
                                <span className="text-gray-600">({task.date})</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <h1 className="font-bold">Priority:</h1> <span>{task.priority}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <h1 className="font-bold">Customer Name:</h1> <span>{task.CustomerName}</span>
                              </div>
                              <div className="flex items-center justify-end">
                                <Button icon="pi pi-eye cursor-pointer" className="text-xl focus:shadow-none" style={{ fontSize: "1.5rem" }} />
                                <IconEdit />
                                <IconDelete />
                                {columnId === "completed" && <Button icon="pi pi-list-check" className="text-xl focus:shadow-none" />}
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
      {/* <Sidebar className="bg-white min-w-fit custom-sidebar" visible={visibleRight} position="right" onHide={() => setVisibleRight(false)}>
        {selectedTask && (
          <ViewMore
            title={selectedTask.title}
            description="N/A"
            priority={selectedTask.priority}
            state="N/A"
            date_added={selectedTask.date}
            date_completed="NA"
            assigned_by="N/A"
            assigned_to="N/A"  
            customer={selectedTask.CustomerName}
            email="N/A"  
            phone="N/A" 
          />
        )}
      </Sidebar>
      <Sidebar className="bg-white min-w-fit custom-left-sidebar" visible={visibleLeft} position="left" onHide={() => setVisibleLeft(false)}>
        <Asset />
      </Sidebar> */}
    </>
  );
}

export default KanbanBoard;


"use client";
import React, { useState, useRef, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { ConfirmPopup } from 'primereact/confirmpopup';
import { Dialog } from "primereact/dialog";
import SearchFilter from "./SearchFilter";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import IconSm from "./IconSm";
import IconAdd from "./IconAdd";
import IconEdit from "./IconEdit";
import IconDelete from "./IconDelete";
import IconView from "./IconView";
import IconAssets from "./IconAssets";

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
  // Search filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("all");

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

  // Filter tasks based on searchTerm and selectedPriority
  const filteredTasks = Object.entries(tasks).reduce((acc, [columnId, columnTasks]) => {
    const filteredColumnTasks = columnTasks.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPriority = selectedPriority === "all" || task.priority === selectedPriority;
      return matchesSearch && matchesPriority;
    });
    acc[columnId] = filteredColumnTasks;  // Ensure column is always included even if empty
    return acc;
  }, {} as TasksState);

  return (
    <>
      <div className="mt-10">
        <SearchFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedPriority={selectedPriority}
          setSelectedPriority={setSelectedPriority}
        />
      </div>

      {isSmallScreen && (
        <div className="flex justify-center gap-2 my-4">
          {["pending", "inProgress", "completed"].map((columnId) => (
            <Button
              key={columnId}
              label={columnId}
              onClick={() => setSelectedColumn(columnId as keyof TasksState)}
              className={`px-1 py-1 text-sm rounded-md focus:shadow-none ${
                selectedColumn === columnId ? "bg-gray-200 text-black" : "bg-gray-100 text-black hover:bg-gray-200"
              }`}
            />
          ))}
        </div>
      )}

      <div className="p-4">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className={`grid ${isSmallScreen ? "grid-cols-1" : "md:grid-cols-3 lg:grid-cols-3"} gap-4 pt-2`}>
            {Object.entries(filteredTasks).map(([columnId, columnTasks]) => {
              // Only show selected column for small screens
              if (isSmallScreen && columnId !== selectedColumn) return null;

              return (
                <Droppable key={columnId} droppableId={columnId}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="bg-gray-100 p-4 rounded-lg border shadow-sm min-h-[200px]"
                    >
                      <div className="border-b-2 flex justify-between items-center pb-2 mb-2">
                        <h2 className="text-lg font-bold capitalize">{columnId}</h2>
                        <div className="flex items-center gap-2">
                          <IconAdd />
                          <span className="text-white font-bold bg-amber-300 rounded-lg shadow-sm w-10 h-10 flex items-center justify-center">
                            {columnTasks.length || "0"} {/* Display "0" if no tasks */}
                          </span>
                        </div>
                      </div>

                      {columnTasks.map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id.toString()} index={index} isDragDisabled={isSmallScreen}>
                          {(provided) => (
                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                              <Card className="mb-3 bg-white rounded-md mt-5 border-2 p-0 shadow-none">
                                <IconSm taskId={task.id} currentStatus={columnId} onMoveTask={moveTask} />
                                <div className="flex gap-2">
                                  <h1 className="font-bold md:text-xs lg:text-lg">Title:</h1>
                                  <span className="md:text-xs lg:text-lg">{task.title}</span>
                                </div>
                                <div className="flex gap-2">
                                  <h1 className="font-bold md:text-xs lg:text-lg">Date:</h1>
                                  <span className="text-gray-600 md:text-xs lg:text-lg">({task.date})</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <h1 className="font-bold md:text-xs lg:text-lg">Priority:</h1>
                                  <span className="lg:text-lg md:text-xs">{task.priority}</span>
                                </div>
                                <div className="flex items-center gap-2 md:text-sx lg:text-lg">
                                  <h1 className="font-bold md:text-xs lg:text-lg">Customer Name:</h1>
                                  <span className="lg:text-lg md:text-xs">{task.CustomerName}</span>
                                </div>
                                {!isSmallScreen && (
                                  <div className="flex gap-2 items-center justify-end pt-2">
                                    <IconView />
                                    <span className="lg:w-10 lg:h-10 md:w-8 md:h-8 cursor-pointer focus:shadow-none text-sm md:text-base lg:text-lg text-white bg-green-500 hover:bg-green-600 rounded-lg w-8 h-8 flex items-center justify-center">
                                      <IconEdit />
                                    </span>
                                    <span className=" lg:w-10 lg:h-10 md:w-8 md:h-8 cursor-pointer focus:shadow-none text-sm md:text-base lg:text-lg text-white bg-red-500 hover:bg-red-600 rounded-lg w-8 h-8  flex items-center justify-center">
                                      <IconDelete />
                                    </span>
                                    {columnId === "completed" && <IconAssets />}
                                  </div>
                                )}
                              </Card>
                            </div>
                          )}
                        </Draggable>
                      ))}

                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              );
            })}
          </div>
        </DragDropContext>
      </div>
    </>
  );
}

export default KanbanBoard;


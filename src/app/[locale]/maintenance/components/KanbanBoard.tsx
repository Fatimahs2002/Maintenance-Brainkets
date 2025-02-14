"use client";
import React, { useState, useRef } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import IconAdd from "./IconAdd";
import IconEdit from "./IconEdit";
import IconDelete from "./IconDelete";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import SearchFilterAdd from "./SearchFilter";
import { Menu } from "primereact/menu";



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
    { id: 3, title: "Bug Fix: User Authentication", priority: "low", CustomerName: "Mark", date: "08-Feb-25" },
    { id: 4, title: "Optimize API Performance", priority: "medium", CustomerName: "Jad", date: "10-Feb-25" },
    { id: 5, title: "Fix Server Issue", priority: "medium", CustomerName: "Ali", date: "04-Feb-25" },
    { id: 6, title: "Update Database Schema", priority: "high", CustomerName: "Hassan", date: "06-Feb-25" },
    { id: 7, title: "Bug Fix: User Authentication", priority: "low", CustomerName: "Mark", date: "08-Feb-25" },
    { id: 8, title: "Optimize API Performance", priority: "medium", CustomerName: "Jad", date: "10-Feb-25" },
  ],
  inProgress: [],
  completed: [],
};

function KanbanBoard() {
  const [tasks, setTasks] = useState(initialTasks);
  const toast = useRef<Toast>(null);



  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const sourceColumn = tasks[source.droppableId];
    const destColumn = tasks[destination.droppableId];
    const [movedTask] = sourceColumn.splice(source.index, 1);
    destColumn.splice(destination.index, 0, movedTask);

    setTasks({ ...tasks });
  };

  return (
    <>
      <div className="mt-10">
        <SearchFilterAdd />
      </div>
      <div className="p-4">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-4">
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
                          <div className=" grid  " ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                            <Card className=" mb-3 bg-white rounded-md mt-5 border-2 p-0 shadow-none md: grid grid-cols-1">
                              
                                <div className="flex  gap-2">
                                  <h1 className="font-bold md:text-sm lg:text-lg">Title:</h1> 
                                  <span className="md:text-sm lg:text-lg">{task.title}</span>
                                </div>
                                <div className="flex  gap-2">
                                <h1 className="font-bold md:text-sm lg:text-lg">Date:</h1> 
                                <span className="text-gray-600 md:text-sm lg:text-lg">({task.date})</span>
                                </div>
                            
                              <div className="flex items-center gap-2 ">
                                <h1 className="font-bold md:text-sm lg:text-lg">Priority:</h1> <span className="lg:text-lg md:text-sm">{task.priority}</span>
                              </div>
                              <div className="flex items-center gap-2 md:text-sm lg:text-lg">
                                <h1 className="font-bold md:text-sm lg:text-lg">Customer Name:</h1> <span className=" lg:text-lg md:text-sm">{task.CustomerName}</span>
                              </div>
                              <div className="flex items-center justify-end pt-2">
                                <Button icon="pi pi-eye cursor-pointer" className="text-xm md:text-sm focus:shadow-none" style={{ fontSize: "1.5rem" }} />
                                <IconEdit  />
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
    </>
  );
}

export default KanbanBoard;


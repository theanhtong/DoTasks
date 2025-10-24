import { useTodo } from "../../contexts/TodoContext";
import { useRef, useEffect, useState } from "react";
import { Check, Ellipsis, SquarePen, Trash2, CheckCheck } from "lucide-react";
import DoneOverlay from "../common/DoneOverlay";
import TodoEditModal from "./TodoEditModal";

import { themes } from "../../data/themes";
export default function TodoCard({ todo }) {
  const { toggleTodo, deleteTodo } = useTodo();
  // const theme = themes[0];
  const theme = todo.theme;

  const [dropDown, setDropDown] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleDropDown = () => {
    if (dropDown) return setDropDown(false);
    return setDropDown(true);
  };

  const handleDone = () => {
    todo.completed = true;
    todo.tasks.map((task) => {
      task.completed = true;
    });
  };

  return (
    <div
      className={`relative max-w-[500px] break-inside-avoid flex flex-col gap-2 mb-4 p-4 rounded-sm shadow-sm border 
        ${todo.completed ? "opacity-70" : ""}
        `}
      style={{ backgroundColor: theme.bg, border: `1px solid ${theme.border}` }}
    >
      {todo.completed && <DoneOverlay></DoneOverlay>}
      <header className="relative flex flex-row items-baseline gap-4">
        <div className="flex flex-col justify-start gap-2">
          <h3 className="text-xl font-semibold" style={{ color: theme.text }}>
            {todo.title} - <span className="text-sm font-semibold italic">{todo.priority}</span>
          </h3>
          <p className="ml-4 text-base italic font-medium text-gray-600 whitespace-pre-line break-all">
            {todo.description}
          </p>
        </div>

        <button
          onClick={() => handleDropDown()}
          className="absolute top-0 right-0 w-9 h-9 flex justify-center items-center hover:bg-gray-600/20 transform hover:-rotate-90 transition-all rounded-full cursor-pointer duration-300 ease-in"
        >
          <Ellipsis size={18}></Ellipsis>
        </button>
        {dropDown && (
          <div className="absolute w-[180px] z-99 flex  flex-col gap-2 justify-center items-start bg-white/90 top-8 right-8 rounded-sm shadow-sm p-4">
            <div className="w-full flex flex-col text-sm">
              <button
                onClick={() => {
                  handleDone();
                  setDropDown(false);
                }}
                className="flex items-center gap-2 p-2 rounded-md hover:bg-green-100 cursor-pointer transition"
              >
                <CheckCheck className="text-green-600" />
                <span className="font-medium text-green-500">Done</span>
              </button>

              <button
                onClick={() => setIsEditModalOpen(true)}
                className="flex items-center gap-2 p-2 rounded-md hover:bg-blue-100 cursor-pointer transition"
              >
                <SquarePen className="text-blue-600" />
                <span className="font-medium text-blue-700">Edit</span>
              </button>

              <button
                onClick={() => deleteTodo(todo.todoId)}
                className="flex items-center gap-2 p-2 rounded-md hover:bg-red-100 cursor-pointer transition"
              >
                <Trash2 className="text-red-600" />
                <span className="font-medium text-red-700">Delete</span>
              </button>
            </div>
          </div>
        )}
      </header>
      <ul className="ml-6">
        {todo.tasks.map((task) => (
          <li key={task.taskId} className="flex items-center gap-2 p-4 list-none">
            <button
              onClick={() => toggleTodo(todo.todoId, task.taskId)}
              className={`w-6 h-6 flex justify-center items-center rounded-sm cursor-pointer transition-colors duration-300 ease-in`}
              style={{ border: `2px solid ${theme.border}` }}
            >
              {task.completed && <Check size={24} style={{ color: theme.text }}></Check>}
            </button>
            <p
              className={`text-base font-medium whitespace-pre-line break-all ${
                task.completed ? "line-through" : ""
              }`}
              style={{ color: theme.text }}
            >
              {task.text}
            </p>
          </li>
        ))}
      </ul>
      {isEditModalOpen && <TodoEditModal todo={todo} onClose={() => setIsEditModalOpen(false)} />}
    </div>
  );
}

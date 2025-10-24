import { X, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

import { useTodo } from "../../contexts/TodoContext";
import { themes } from "../../data/themes";

export default function TodoCreateModal({ onClose }) {
  const [priority, setPriority] = useState("medium");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState([]);
  const [selectTheme, setSelectTheme] = useState(themes[0]);
  const { addNewTodo } = useTodo();

  const handleAddTodo = () => {
    addNewTodo(title, description, priority, tasks, selectTheme);
    setTitle("");
    setDescription("");
    setPriority("medium");
    setTasks([]);
    setSelectTheme(themes[0]);
  };

  const handleAddNewTask = () => {
    setTasks([...tasks, { taskId: Date.now(), text: "" }]);
  };

  const handleInputTask = (id, value) => {
    setTasks(tasks.map((task) => (task.taskId === id ? { ...task, text: value } : task)));
  };

  const handleRemoveTask = (id) => {
    setTasks(tasks.filter((task) => task.taskId !== id));
  };

  return (
    <div className="fixed inset-0 flex items-start justify-center z-50 p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative bg-white flex flex-col gap-5 p-8 w-full max-w-lg rounded-sm shadow-2xl border border-gray-100 animate-in zoom-in-95 duration-200 my-8">
        <div className="flex items-center justify-between pb-4">
          <div>
            <h2 className="text-2xl font-bold bg-clip-text">Create New Todo</h2>
            <p className="text-sm text-gray-500 mt-1">Fill in the details below</p>
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center transition-all rounded-sm w-10 h-10 hover:bg-gray-100 active:scale-95 group"
          >
            <X size={20} className="text-gray-500 group-hover:text-gray-700" />
          </button>
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">
              Title<span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-gray-500 resize-none transition-all placeholder:text-gray-400"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">Description</label>
            <textarea
              rows={1}
              placeholder="Enter description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-gray-500 resize-none transition-all placeholder:text-gray-400"
            />
            <span className="text-xs text-gray-500">Maximum 500 characters</span>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">Tasks</label>
            {tasks.map((task) => (
              <div key={task.taskId} className="flex gap-2 p-2">
                <input
                  type="text"
                  value={task.text}
                  onChange={(e) => handleInputTask(task.taskId, e.target.value)}
                  placeholder="Enter task..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-gray-500 placeholder:text-gray-400"
                />
                <button
                  onClick={() => handleRemoveTask(task.taskId)}
                  className="px-3 py-2 rounded-sm bg-red-400 hover:bg-red-500 text-white transition"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
            <button
              onClick={handleAddNewTask}
              className="w-full px-3 py-2 rounded-sm bg-blue-400 hover:bg-blue-500 text-white flex items-center justify-center cursor-pointer transition-colors duration-300 ease-in"
            >
              <Plus size={18}></Plus>
            </button>
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-sm font-semibold text-gray-700">Priority</label>
            <div className="flex gap-3">
              {[
                { value: "low", label: "Low" },
                { value: "medium", label: "Medium" },
                { value: "high", label: "High" },
              ].map((item) => (
                <label
                  key={item.value}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-sm border-2 cursor-pointer transition-all 
                    ${
                      priority === item.value
                        ? item.value === "low"
                          ? "border-green-500 bg-green-100 text-green-700"
                          : item.value === "medium"
                          ? "border-yellow-500 bg-yellow-100 text-yellow-700"
                          : "border-red-500 bg-red-100 text-red-700"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700"
                    }`}
                >
                  <input
                    type="radio"
                    name="priority"
                    value={item.value}
                    checked={priority === item.value}
                    onChange={(e) => setPriority(e.target.value)}
                    className="hidden"
                  />
                  <span className="text-sm font-medium text-gray-700">{item.label}</span>
                </label>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-sm font-semibold text-gray-700">Theme</label>
              <div className="flex gap-3 overflow-x-auto flex-nowrap p-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent no-scrollbar">
                {themes.map((theme, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectTheme(theme)}
                    className="w-9 h-9 rounded-full cursor-pointer border-2 flex-shrink-0 focus-within:scale-125 transform duration-300 no-scrollbar"
                    style={{ backgroundColor: theme.bg, borderColor: theme.border }}
                  ></button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-3 pt-5">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all active:scale-95 duration-300 ease-in cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              handleAddTodo();
              onClose();
            }}
            className="px-6 py-2.5 rounded-sm font-medium bg-blue-500 hover:bg-blue-600 text-white hover:shadow-sm transition-all active:scale-95 duration-300 ease-in cursor-pointer"
          >
            Create Todo
          </button>
        </div>
      </div>
    </div>
  );
}

import { createContext, useContext, useState } from "react";

import { contents } from "../data/contents";

export const TodoContext = createContext();

export default function TodoProvider({ children }) {
  const [todos, setTodos] = useState(contents);
  // const [todos, setTodos] = useState([]);

  const toggleTodo = (todoId, taskId) => {
    if (!todos) return;
    setTodos((prev) =>
      prev.map((todo) => {
        if (todo.todoId !== todoId) return todo;
        const tasks = todo.tasks.map((task) =>
          task.taskId === taskId ? { ...task, completed: !task.completed } : task
        );
        const allCompleted = tasks.every((task) => task.completed);
        return { ...todo, tasks, completed: allCompleted };
      })
    );
  };

  const addNewTodo = (title, description, priority, tasks, theme) => {
    if (!title.trim()) {
      alert("Please enter a title!!!");
      return;
    }

    const newTodo = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      priority,
      tasks: tasks,
      completed: false,
      theme: theme,
    };

    setTodos([...todos, newTodo]);
  };

  const deleteTodo = (todoId) => {
    setTodos((prev) => prev.filter((todo) => todo.todoId !== todoId));
  };

  const updateTodo = (todoId, updatedTodo) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.todoId === todoId ? { ...todo, ...updatedTodo } : todo))
    );
  };

  return (
    <TodoContext.Provider value={{ todos, toggleTodo, addNewTodo, deleteTodo, updateTodo }}>
      {children}
    </TodoContext.Provider>
  );
}

export function useTodo() {
  const context = useContext(TodoContext);
  if (!context) throw new Error("Error <TodoProvider>");
  return context;
}

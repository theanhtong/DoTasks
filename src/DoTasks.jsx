import { useState } from "react";
import { NotepadText } from "lucide-react";

import Header from "./layouts/Header";
import TodoCard from "./components/Todo/TodoCard";

import { useTodo } from "./contexts/TodoContext";

export default function DoTasks() {
  const { todos } = useTodo();

  const sortedTodoByPriority = [...todos].sort((a, b) => {
    const order = { high: 3, medium: 2, low: 1 };
    return order[b.priority] - order[a.priority];
  });

  return (
    <div className="min-h-screen max-w-screen">
      <div className="flex flex-col items-center justify-center max-w-5xl mx-auto p-4">
        <Header />

        {todos.length === 0 ? (
          <div className="w-full flex flex-col justify-center items-center gap-8 text-center mt-8">
            <div className="w-9 h-9 text-gray-500">
              <NotepadText size={30}></NotepadText>
            </div>
            <div className="text-4xl font-semibold italic text-gray-500">Not Todo Yet!</div>
          </div>
        ) : (
          <div className="w-full gap-4 columns-1 md:columns-2 mt-6">
            {sortedTodoByPriority.map((todo, idx) => (
              <TodoCard key={`todo_${todo.todoId}` || idx} todo={todo} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

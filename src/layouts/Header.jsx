import { Plus, X } from "lucide-react";
import { useState } from "react";

import TodoCreateModal from "../components/Todo/TodoCreateModal";

export default function Header() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  return (
    <div className="flex flex-col items-center justify-center w-full gap-4 p-4 mx-auto">
      <h3 className="text-3xl font-semibold tracking-tight">DoTasks</h3>
      <span className="text-base italic font-medium text-gray-600">Turn plans into progress.</span>
      <button
        onClick={() => setIsAddModalOpen(true)}
        className="flex items-center justify-center transition-all rounded-full shadow-sm cursor-pointer w-9 h-9 bg-amber-400 hover:bg-amber-500 active:scale-105"
      >
        <Plus size={18} className="text-white" />
      </button>

      {isAddModalOpen && (
        <TodoCreateModal onClose={() => setIsAddModalOpen(false)}></TodoCreateModal>
      )}
    </div>
  );
}

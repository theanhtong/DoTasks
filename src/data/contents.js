import { themes } from "./themes";
const priorities = ["high", "medium", "low"];
export const contents = Array.from({ length: 10 }, (_, idx) => ({
  todoId: idx,
  title: "Title " + (idx + 1),
  description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. ",
  completed: false,
  theme: themes[Math.floor(Math.random() * 12)],
  tasks: Array.from({ length: Math.floor(Math.random() * 3) + 1 }, (_, idx) => ({
    taskId: idx,
    text: "Lorem, ipsum dolor sit.",
    completed: false,
  })),
  priority: priorities[Math.floor(Math.random() * 3)],
}));

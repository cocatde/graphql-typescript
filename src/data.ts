export interface Todo {
  id: string;
  title: string;
  description: string;
}

export const todos: Todo[] = [
  { id: "1", title: "todo 1", description: "todo 1 details" },
  { id: "2", title: "todo 2", description: "todo 2 details" },
  { id: "3", title: "todo 3", description: "todo 3 details" },
];
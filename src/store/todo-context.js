import React from "react";
const TodoContext = React.createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  edit: (payload) => {},
  clearTodoDone: () => {},
  clearTodo: () => {},
});
export default TodoContext;

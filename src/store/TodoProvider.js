import { useReducer } from "react";

import TodoContext from "./todo-context";

const defaultTodoState = {
  items: [],
};

const todoReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedItems = state.items.concat(action.item);

    return {
      items: updatedItems,
    };
  }
  if (action.type === "REMOVE") {
    const updatedItems = state.items.filter((item) => item.id !== action.id);

    return {
      items: updatedItems,
    };
  }

  if (action.type === "EDIT") {
    const flag = action.payload.flag;

    const itemDoneIndex = state.items.findIndex(
      (item) => item.id === action.payload.item.id
    );
    const itemEdit = state.items[itemDoneIndex];

    let updatedItem;
    if (flag === "title") {
      updatedItem = {
        ...itemEdit,
        title: action.payload.item.title,
      };
    }
    if (flag === "done") {
      updatedItem = {
        ...itemEdit,
        isChecked: true,
      };
    }
    if (flag === "todo") {
      updatedItem = {
        ...itemEdit,
        isChecked: false,
      };
    }

    let updatedItems = [...state.items];
    updatedItems[itemDoneIndex] = updatedItem;

    return {
      items: updatedItems,
    };
  }
  if (action.type === "CLEARDONE") {
    const updatedItems = state.items.filter((item) => !item.isChecked);

    return {
      items: updatedItems,
    };
  }
  if (action.type === "CLEAR") {
    return defaultTodoState;
  }
  return defaultTodoState;
};

const TodoProvider = (props) => {
  const [todoState, dispatchTodoAction] = useReducer(
    todoReducer,
    defaultTodoState
  );

  const addItemHandler = (item) => {
    dispatchTodoAction({ type: "ADD", item: item });
  };

  const removeItemHandler = (id) => {
    dispatchTodoAction({ type: "REMOVE", id: id });
  };

  const editItemHandler = (payload) => {
    dispatchTodoAction({ type: "EDIT", payload: payload });
  };
  const clearDoneHandler = () => {
    dispatchTodoAction({ type: "CLEARDONE" });
  };
  const clearHandler = () => {
    dispatchTodoAction({ type: "CLEAR" });
  };
  const todoContext = {
    items: todoState.items,
    addItem: addItemHandler,
    removeItem: removeItemHandler,

    edit: editItemHandler,
    clearTodoDone: clearDoneHandler,
    clearTodo: clearHandler,
  };

  return (
    <TodoContext.Provider value={todoContext}>
      {props.children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;

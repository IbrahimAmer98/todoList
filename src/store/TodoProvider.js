import { useReducer } from "react";

import TodoContext from "./todo-context";

const defaultTodoState = {
  items: [],
};

const todoReducer = (state, action) => {
  if (action.type === "ADD") {
    // console.log("ADD");
    const updatedItems = state.items.concat(action.item);
    // console.log(updatedItems);
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
    console.log(flag);
    const itemDoneIndex = state.items.findIndex(
      (item) => item.id === action.payload.item.id
    );
    const itemEdit = state.items[itemDoneIndex];
    console.log("hey");
    console.log(itemEdit);
    let updatedItem;
    if (flag === "title") {
      console.log("heytitle");
      console.log(action.payload.item.title);

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
    console.log("heyyyyy");
    console.log(updatedItem);

    let updatedItems = [...state.items];
    updatedItems[itemDoneIndex] = updatedItem;

    return {
      items: updatedItems,
    };
  }
  if (action.type === "CLEARDONE") {
    const updatedItems = state.items.filter((item) => !item.isChecked);
    // console.log("eee");
    // console.log(updatedItems);
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
    // console.log("addItemHandler");
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

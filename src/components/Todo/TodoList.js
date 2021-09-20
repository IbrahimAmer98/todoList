import { Fragment, useState, useContext, useEffect } from "react";
import TodoItem from "./TodoItem";
import styles from "./TodoList.module.css";
import TodoContext from "../../store/todo-context";
import ErrorModal from "../UI/ErrorModal";

const TodoList = () => {
  const todoCtx = useContext(TodoContext);
  const items = todoCtx.items;
  const [filteredItems, setFilteredItems] = useState(items);
  const [error, setError] = useState(null);

  useEffect(() => {
    setFilteredItems(items);
  }, [items]);
  const allFilterHandler = () => {
    setFilteredItems(items);
  };
  const doneFilterHandler = () => {
    setFilteredItems(items.filter((item) => item.isChecked));
  };
  const todoFilterHandler = () => {
    setFilteredItems(items.filter((item) => !item.isChecked));
  };
  const deleteDoneHandler = () => {
    setError({
      title: "Done Tasks",
      message: "Are you sure you want to delete all done tasks",
    });
  };

  const deleteAllHandler = () => {
    setError({
      title: "All Tasks",
      message: "Are you sure you want to delete all  tasks",
    });
  };
  const deleteYesHandler = () => {
    if (error.title === "All Tasks") {
      todoCtx.clearTodo();
    } else {
      todoCtx.clearTodoDone();
      setFilteredItems(todoCtx.items);
    }
    setError(null);
  };
  const deleteNoHandler = () => {
    setError(null);
  };
  return (
    <Fragment>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={deleteYesHandler}
          onCancel={deleteNoHandler}
        />
      )}
      <div className={styles.button_container}>
        <h2 className={styles.text}>TodoList</h2>
        <div className={styles.todo_filter}>
          <button
            className={styles.todo_filter_button}
            onClick={allFilterHandler}
          >
            All
          </button>
          <button
            className={styles.todo_filter_button}
            onClick={doneFilterHandler}
          >
            Done
          </button>
          <button
            className={styles.todo_filter_button}
            onClick={todoFilterHandler}
          >
            Todo
          </button>
        </div>
      </div>
      <div className={styles.todo_list}>
        {filteredItems.map((item, index) => (
          <TodoItem
            key={item.id}
            id={item.id}
            title={item.title}
            isChecked={item.isChecked}
            index={index}
          />
        ))}
      </div>
      <div className={styles.todo_filter}>
        <button
          className={styles.todo_delete_button}
          onClick={deleteDoneHandler}
        >
          Delete done tasks
        </button>
        <button
          className={styles.todo_delete_button}
          onClick={deleteAllHandler}
        >
          Delete all tasks
        </button>
      </div>
    </Fragment>
  );
};
export default TodoList;

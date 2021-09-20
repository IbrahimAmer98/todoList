import TodoList from "./TodoList";
import styles from "./Todo.module.css";

import TodoInput from "../NewTodo/TodoInput";

const Todo = () => {
  return (
    <div className={styles.todo}>
      <TodoInput />

      <TodoList />
    </div>
  );
};
export default Todo;

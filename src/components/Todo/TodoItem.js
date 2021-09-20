import { Fragment, useContext, useState } from "react";
import Card from "../UI/Card";
import styles from "./TodoItem.module.css";
import TodoContext from "../../store/todo-context";
import pencil from "../../assets/icons8-pencil-64.png";
import remove from "../../assets/icons8-remove-24.png";
import ErrorModal from "../UI/ErrorModal";

const TodoItem = (props) => {
  const todoCtx = useContext(TodoContext);
  const [isChecked, setIsChecked] = useState(props.isChecked);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(props.title);
  const [error, setError] = useState(null);
  const checkboxHandler = (e) => {
    setIsChecked(e.target.checked);

    if (e.target.checked) {
      todoCtx.edit({ item: props, flag: "done" });
    } else {
      todoCtx.edit({ item: props, flag: "todo" });
    }
  };
  const titleChangeHandler = (event) => {
    setTitle(event.target.value);
  };
  const removeHandler = () => {
    setError({
      title: "Delete Task",
      message: `Are you sure you want to delete ${props.title}`,
    });
  };
  const deleteYesHandler = () => {
    todoCtx.removeItem(props.id);
    setError(null);
  };
  const deleteNoHandler = () => {
    setError(null);
  };
  const pencilHandler = () => {
    setIsEditing(true);
  };
  const onFormSubmit = (event) => {
    event.preventDefault();
    if (title) {
      todoCtx.edit({ item: { ...props, title: title }, flag: "title" });

      setIsEditing(false);
    }
  };
  const editform = (
    <form onSubmit={onFormSubmit} className={styles.edit_form}>
      <input type="text" value={title} onChange={titleChangeHandler} />
      <button type="submit" />
    </form>
  );
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
      <div>
        <Card className={styles.todo_item}>
          <div className={isChecked ? styles.is_checked : styles.not_checked}>
            {isEditing ? editform : <h3>{title}</h3>}
          </div>

          <div className={styles.todo_item__icons}>
            <input
              type="checkbox"
              checked={isChecked}
              onClick={checkboxHandler}
            />
            <img src={pencil} onClick={pencilHandler} alt="icon" />
            <img src={remove} onClick={removeHandler} alt="icon" />
          </div>
        </Card>
      </div>
    </Fragment>
  );
};
export default TodoItem;

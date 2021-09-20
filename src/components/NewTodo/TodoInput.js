import React, { Fragment, useContext, useState } from "react";
import book from "../../assets/icons8-book-30.png";
import styles from "./TodoInput.module.css";
import Card from "../UI/Card";
import TodoContext from "../../store/todo-context";

const TodoInput = () => {
  const todoCtx = useContext(TodoContext);
  const [enteredTitle, setEnteredTitle] = useState("");

  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (enteredTitle) {
      const taskData = {
        id: Math.random().toString(),
        title: enteredTitle,
        status: "Todo",
      };
      // console.log(taskData);
      todoCtx.addItem(taskData);

      setEnteredTitle("");
    }
  };

  return (
    <Fragment>
      <h2 className={styles.text}>TodoInput</h2>
      <form onSubmit={submitHandler}>
        <Card className={styles.input_container}>
          <div className={styles.todo_input}>
            <div className={styles.img_container}>
              <img src={book} alt="icon" />
            </div>
            <input
              value={enteredTitle}
              placeholder="New Todo"
              type="text"
              onChange={titleChangeHandler}
            />
          </div>
          <div className={styles.input_button}>
            <button type="submit">Add New Tasks</button>
          </div>
        </Card>
      </form>
    </Fragment>
  );
};

export default TodoInput;

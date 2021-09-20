import React, { Fragment } from "react";

// import NewExpense from "./components/NewExpense/NewExpense";
import Todo from "./components/Todo/Todo";





const App = () => {
 

 
  return (
    <Fragment>
      {/* <NewExpense onAddExpense={addExpenseHandler} /> */}
      <Todo/>
    </Fragment>
  );
};

export default App;

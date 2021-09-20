import ReactDOM from 'react-dom';
import TodoProvider from "./store/TodoProvider";
import './index.css';
import App from './App';

ReactDOM.render(
  <TodoProvider>
    <App />
  </TodoProvider>,
  document.getElementById("root")
);

import "./components/todo/todo.css";
import TodoData from "./components/todo/TodoData";
import TodoNew from "./components/todo/TodoNew";
import reactLogo from './assets/react.svg'
import { useState } from "react";
function App() {
  const [todoLists, setTodoLists] = useState([])


  const AddData = (props) => {
    const newTodoData = {
      id: randomIntFromInterval(1,100),
      age: props
    };
  
    setTodoLists([...todoLists, newTodoData]);
  };

  const deleteData = (id) =>{
      const newTodo = todoLists.filter(item => item.id !== id)
      setTodoLists(newTodo)
  }
  
  const randomIntFromInterval = (min, max) =>{
    return Math.floor(Math.random() * (max-min + 1) + min); 
  }

  return (
    <div className="todo-container">
      <div className="todo-title">Todo List</div>
      <TodoNew
        AddData = {AddData}
      />

      {todoLists.length > 0 ? 
      
        <TodoData
          todoLists={todoLists}
          deleteData = {deleteData}
        />
        :
        <div className="todo-img">
          <img src={reactLogo} alt="" />
        </div>
      }
      
    </div>
  );
}

export default App;

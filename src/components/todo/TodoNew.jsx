import { useState } from "react";

function TodoNew(props) {
  const [valueInput, setValueInput] = useState("")

  const {AddData} = props;

  const handleClick = () =>{
    AddData(valueInput)
    setValueInput("");
  }
  const handleOnChange = (name) =>{
    setValueInput(name)
  }

  return (
    <div className="todo-new">
      <input type="text" 
        onChange={(e) => handleOnChange(e.target.value)}
        value={valueInput}
      />
      <button 
        onClick={handleClick}
      >Add</button>
      <div>My input is {valueInput}</div>
    </div>
  );
}

export default TodoNew;

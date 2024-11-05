function TodoData(props) {
  const {todoLists, deleteData} = props

  function handleClick (id) {
    deleteData(id)
  }


  return (
    <div className="todo-data">
      {todoLists.map((item, index) => {
          return (
            <div className="todo-item" key={item.id}>
              <div>{item.age}</div>
              <button onClick={() => handleClick(item.id)}>Delete</button>
            </div>
          )
      })}
      
    </div>
  );
}

export default TodoData;

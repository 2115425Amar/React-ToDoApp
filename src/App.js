import "./App.css";
import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { BsCheckLg } from "react-icons/bs";

function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);   //button -> css 
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [completedTodos, setCompletedTodos]=useState([]);

  const handleAddTodo = () => {
    let newTodoItem = {
      title: newTitle,
      description: newDescription,
    };
    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem);
    setTodos(updatedTodoArr);
    localStorage.setItem('todolist', JSON.stringify(updatedTodoArr))
  };

  const handleDeleteToDo = (index)=>{
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index,1);

    localStorage.setItem('todolist',JSON.stringify(reducedTodo));
    setTodos(reducedTodo);
  }

 

  const handleComplete=(index)=>{
    let now = new Date();
    let dd = now.getDate();
    let mm=now.getMonth();
    let yyyy=now.getFullYear();
    let h=now.getHours();
    let m=now.getMinutes();
    let s=now.getSeconds();
    let completedOn = dd+ '-' +mm +'-'+yyyy+' at '+h+':'+m+':'+s;

    let filteredItem={
      ...allTodos[index],
      completedOn:completedOn
    }

    let updatedCompletedArr =[...completedTodos];
    updatedCompletedArr.push(filteredItem);
    setCompletedTodos(updatedCompletedArr);
    handleDeleteToDo(index);
    localStorage.setItem('completedTodos', JSON.stringify(updatedCompletedArr))
  }

  const handleDeleteCompletedToDo = (index)=>{
    let reducedTodo = [...completedTodos];
    reducedTodo.splice(index,1);

    localStorage.setItem('completedTodos',JSON.stringify(reducedTodo));
    setCompletedTodos(reducedTodo);
  }
  

  useEffect(()=>{
   let savedToDo=JSON.parse(localStorage.getItem('todolist'))
   let savedCompleted=JSON.parse(localStorage.getItem('completedTodos'))
  if(savedToDo){
    setTodos(savedToDo);
  }
  if(savedCompleted){
    setCompletedTodos(savedCompleted);
  }
  },[])

  return (
    <div className="App">
      <h1>My Todos</h1>

      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Title</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="text"
              placeholder="What's the task title?"
            />
          </div>

          <div className="todo-input-item">
            <label>Description</label>
            <input
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              className="text"
              placeholder="What's the task Description?"
            />
          </div>

          <div className="todo-input-item">
            <button
              type="button"
              onClick={handleAddTodo}
              className="primaryBtn"
            >
              Add
            </button>
          </div>
        </div>

        <div className="btn-area">
          <button
            className={`secondaryBtn isCompleteScreen ${
              isCompleteScreen === false && "active"
            }`}
            onClick={() => setIsCompleteScreen(false)}
          >
            Todo
          </button>
          <button
            className={`secondaryBtn isCompleteScreen ${
              isCompleteScreen === true && "active"
            }`}
            onClick={() => setIsCompleteScreen(true)}
          >
            Completed
          </button>
        </div>


{/* ------------------------------------------------------------- */}
        <div className="todo-list">
          {isCompleteScreen===false && allTodos.map((item, index) => {
            return (
              <div className="todo-list-item">
                <h3>{item.title}</h3>
                <p>{item.description}</p>

                <div>
                  <MdDelete className="icon" onClick={()=>handleDeleteToDo(index)} />
                  <BsCheckLg className="check-icon" onClick={()=>handleComplete(index)}/>
                </div>
              </div>
            );
          })}

          {isCompleteScreen===true && completedTodos.map((item, index) => {
            return (
              <div className="todo-list-item">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <p><small>Complted on:{item.completedOn}</small></p>
                <div>
                  <MdDelete className="icon" onClick={()=>handleDeleteCompletedToDo(index)} />
                </div>
              </div>
            );
          })}
        </div>
{/* -------------------------------------------------------------- */}


      </div>
    </div>
  );
}

export default App;

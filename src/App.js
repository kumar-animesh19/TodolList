import { useState } from 'react';
import './App.css';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';

function App() {

  let [todolist, setTodolist] = useState([]);

  let saveToDoList=(event)=>{
    event.preventDefault();
    let todoname = event.target.todoname.value;
    if(!todolist.includes(todoname)){
      let finalToDOlist = [...todolist, todoname];
      setTodolist(finalToDOlist);
      NotificationManager.success('Task Added Succesfully!');
    }
    else{
      NotificationManager.error('Task Already Exists!');
    }
  }

  let list = todolist.map((item,i)=>{
    return(
      <ToDoListItems 
        key={i}
        item = {item} 
        index = {i}
        todolist={todolist} 
        setTodolist={setTodolist}
      />
    )
  })

  return (
    <div className="App">
      <NotificationContainer/>
      <h1>ToDo List</h1>
      <form onSubmit={saveToDoList}>
        <input type='text' name='todoname'/>
        <button>Add Task</button>
      </form>
      <div  className="todocontainer">
        <ul>
          {list}
        </ul>
      </div>
    </div>
  );
}

export default App;

function ToDoListItems({item,index,todolist,setTodolist}) {

  let [status, setSatuts] =useState(false);

  let removeItem = ()=>{
      let finalData = todolist.filter((v,i)=>i!=index)
      setTodolist(finalData);
  }

  let checkStauts=()=>{
    setSatuts(!status);
  }
  return(
    <li onClick={checkStauts}>{index+1}. {item} <span className={'status' ? 'completeTodo' : ''} onClick={removeItem}>&times;</span></li>
  );
}

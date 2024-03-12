import React, {useState} from "react";

//include images into your bundle
// import rigoImage from "../../img/rigo-baby.jpg";

//create your first component

const Home = () => {

	const [newTask,setNewTask]=useState("")
	const [tasks,setTasks]=useState([])

//Esta funcion añade una tarea nueva en el Array al presionar ENTER.
function writeTask(event) {
	// console.log(event);
	if (event.key === "Enter") {
		setTasks(tasks.concat(newTask))
		setNewTask("");
	}
}

//Esta funcion elimina una posicion del Array por su index.
function deletetask(position) {
	const arrayfiltered = tasks.filter((item, index) => index !== position)
	setTasks(arrayfiltered)
	}
	
//Add into array -> concat
//Delete from array -> .filter
//Update -> .map
return (
	<>
	<h1 className="text-center"><b>Todolist React</b></h1>
	<div className="container">
		<input className="list container border-0 py-3" type="text" 
				onChange={(event) => {setNewTask(event.target.value)}} 
				onKeyDown={writeTask} value={newTask} placeholder="Añadir tarea"/>
				
		<ul className="list-group list-group-flush">
				{tasks.map((task,index) => { return (<li className="list-group-item py-3 ms-3" key={index}> {task}   
					<span className="delete" onClick={() => deletetask(index)}><i className="fas fa-trash-alt"></i></span></li>)
				}
				)}	
		</ul>
			<div className="contador border-top p-3"><span>{tasks.length} tasks</span></div>	
	</div>
	</>
);
};

export default Home;

import React, {useEffect, useState} from "react";

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
		setTasks(tasks.concat( { label: newTask, done: false }))
		setNewTask("");
		putLista(tasks.concat( { label: newTask, done: false }));
	}
}

//Esta funcion elimina una posicion del Array por su index.
function deletetask(position) {
	const arrayfiltered = tasks.filter((item, index) => index !== position)
	setTasks(arrayfiltered)
	putLista(arrayfiltered);
	}
	
//Add into array -> concat
//Delete from array -> .filter
//Update -> .map

//fetch = promesas - solicitud=respuesta
//primera funcion para crear usuario 

function createUser() {
	fetch('https://playground.4geeks.com/apis/fake/todos/user/Diana024',{
      method: "POST",
      body: JSON.stringify([]),
      headers: {
        "Content-Type": "application/json"
      }
    })
//.then es una función que se ejecuta cuando se rechaza la promesa y recibe el error.
		.then((response) => response.json())
		.then((data) => console.log(data))
		.catch((error) => console.log(error))
}

//fetch = promesas - solicitud=respuesta


//Función que trae la lista de tareas
function getLista() {
	fetch ('https://playground.4geeks.com/apis/fake/todos/user/Diana024', {
		method: "GET"
	}) //Buscamos la url que especificamos con el metodo que especificamos. 
		.then((response) => response.json())
		.then((data) => setTasks(data))
		.catch((error) => console.log(error))
}

//Put obtiene la lista de tareas
function putLista(tasks) {
	console.log(tasks)
	fetch ('https://playground.4geeks.com/apis/fake/todos/user/Diana024', {
		method: "PUT",
		body: JSON.stringify(tasks),
		headers: {
		  "Content-Type": "application/json"
		}
	  })
	  .then(resp => {
		  console.log(resp.ok); // Será true si la respuesta es exitosa
		  console.log(resp.status); // El código de estado 200, 300, 400, etc.
		  console.log(resp.text()); // Intentará devolver el resultado exacto como string
		  return resp.json(); // Intentará parsear el resultado a JSON y retornará una promesa donde puedes usar .then para seguir con la lógica
	  })
	  .then(data => {// Aquí es donde debe comenzar tu código después de que finalice la búsqueda
		  console.log(data); // Esto imprimirá en la consola el objeto exacto recibido del servidor
	  })
	  .catch(error => { // Manejo de errores
		  console.log(error);
	  });
}

// function deleteList(tasks) {
// 	fetch ('https://playground.4geeks.com/apis/fake/todos/user/Diana024', {
// 		method: "DELETE"
// 	}) //Buscamos la url que especificamos con el metodo que especificamos. 
// 		.then((response) => response.json(tasks))
// 		.then((data) => setTasks(data))
// 		.catch((error) => console.log(error))
// }


//fetch - 1 creo una function de useEffect codigo se ejecuta cuando el estado que observamos cambia. Creo usuario.
useEffect(() => {
	getLista()
},[])

return (
	<>
	<h1 className="text-center"><b>Todolist React</b></h1>
	<div className="container">
		<input className="list container border-0 py-3" type="text" 
				onChange={(event) => {setNewTask(event.target.value)}} 
				onKeyDown={writeTask} value={newTask} placeholder="Añadir tarea"/>
				
		<ul className="list-group list-group-flush">
				{tasks.map((task,index) => { return (<li className="list-group-item py-3 ms-3" key={index}> {task.label}   
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





	










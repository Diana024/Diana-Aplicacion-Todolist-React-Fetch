import React, {useEffect, useState} from "react";

const Home = () => {

	const [newTask,setNewTask]=useState("")
	const [tasks,setTasks]=useState([])

//Esta funcion añade una tarea nueva en el Array al presionar ENTER.
function writeTask(event) {
	// console.log(event);
	if (event.key === "Enter") {
		// console.log("Agrega task");
		setTasks(tasks.concat( { label: newTask, done: false }))
		setNewTask("");
		putLista(tasks.concat( { label: newTask, done: false }));
	}
}

//Esta funcion elimina una posicion del Array por su index(posicion)
function deletetask(position) {
	console.log(position);
	const arrayfiltered = tasks.filter((item, index) => index !== position)
	setTasks(arrayfiltered)
	putLista(arrayfiltered);
	}
	
//Add into array -> concat
//Delete from array -> .filter
//Update -> .map

//fetch = promesas - solicitud=respuesta
//1. POST - Crea Usuario.
function createUser() {
	fetch('https://playground.4geeks.com/apis/fake/todos/user/Diana024', {
      method: "POST",
      body: JSON.stringify([]),
      headers: {
        "Content-Type": "application/json"
      }
    })
//.then (Promesas) función que se ejecuta cuando se rechaza la promesa y recibe el error.
		.then((response) => response.json())
		.then((data) => {
			console.log(data)
			getLista()
})
		.catch((error) => console.log(error))
}

//2. GET - funcion que trae/obtiene la lista de tareas de la Api.
	function getLista() {
		fetch ('https://playground.4geeks.com/apis/fake/todos/user/Diana024', {
			method: "GET"
		}) //Buscamos la url que especificamos, con el metodo que especificamos. 
		.then((response)=> {
			if (response.ok) {
				return response.json()
			} else {
				if (response.status == 404) {
					createUser();
				} else {
					console.error("Error en la solicitud", response.status);
				}
			}
		})
		.then((data) => setTasks(data))
		.catch((error) => console.log(error))
	}

//3. PUT - Funcion que actualiza y guarda en servidor la lista de tareas.
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
	  .then(data => {
		// Aquí es donde debe comenzar tu código después de que finalice la búsqueda
		  console.log(data); // Esto imprimirá en la consola el objeto exacto recibido del servidor
	  })
	  .catch(error => 
		// Manejo de errores
		  console.log(error)
	  );
}

//4. DELETE - Función que elimina TODOS los recursos. Usuario & Contenido.
function deleteAll() {
	const arrayFiltered = [{"done": false, "label": "GET/POST/PUT/DELETE"}];
	setTasks(arrayFiltered);
	putLista(arrayFiltered);
}


//FETCH - Importante crear function de useEffect: El codigo se ejecuta cuando el estado que observamos cambia.
useEffect(() => {
	getLista()
},[])

return (
	<>
	<h1 className="text-center"><b>Fetch-React</b></h1>
	<div className="container">
		<input className="list container border-0 py-1 text-secondary" type="text" 
				onChange={(event) => {setNewTask(event.target.value)}} 
				onKeyDown={writeTask} value={newTask} placeholder="Método HTTP"/>
				
		<ul className="list-group list-group-flush">
				{tasks.map((task,index) => { return (<li className="list-group-item py-2 ms-3" key={index}> {task.label}   
					<span className="delete" onClick={() => deletetask(index)}><i className="fas fa-trash-alt"></i></span></li>)
				}
				)}	
		</ul>
			<div className="contador border-top p-4"><span>{tasks.length} tasks</span></div>	
	</div>
	<div>
		<span className="newButton" onClick={() => deleteAll()}><button class="btn btn-outline-light margin-end mt-4" type="button">DELETE</button></span></div>
	</>

	);
};

export default Home;





	










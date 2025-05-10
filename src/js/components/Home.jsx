import React, { useState, useEffect } from "react";


const Home = () => {

	const [todoList, setTodoList] = useState([])
	const [newTodo, setNewTodo] = useState("")
	const [showX, setShowX] = useState(null)

	const handlePressKey = (e) => {
		if (e.key === "Enter") {
			fetch("https://playground.4geeks.com/todo/todos/vj_list", {
				method: "POST",
				body: JSON.stringify({
					"label": newTodo,
					"is_done": false
				}),
				headers: {
					"content-type": "application/json"
				}
			})
				.then((response) => response.json())
				.then((data) => console.log(data))

			setNewTodo("")

			fetch("https://playground.4geeks.com/todo/users/vj_list")
				.then((response) => response.json())
				.then((data) => setTodoList(data.todos))
		}
	};

	const handleDelete = (indexToDelete) => {

		// setTodoList(todoList.filter((elem, index) => index !== indexToDelete))
		fetch("https://playground.4geeks.com/todo/todos/" + indexToDelete, {
			method: "DELETE"
		})

			.then((response) => {
				if (response.ok) {
					console.log("Tarea Eliminada")
					fetch("https://playground.4geeks.com/todo/users/vj_list")
						.then((response) => response.json())
						.then((data) => setTodoList(data.todos))
				}
			})
	}

	const panic = async () => {
		fetch("https://playground.4geeks.com/todo/users/vj_list", {
			method: "DELETE"
		})
			.then(async (response) => {
				if (response.ok) {
					console.log("Eliminacion correcta")
					await fetch("https://playground.4geeks.com/todo/users/vj_list", {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						}
					})
				}
			}).then(async () => {
				await fetch("https://playground.4geeks.com/todo/users/vj_list")
					.then((response) => response.json())
					.then((data) => setTodoList(data.todos))
			})
	}

	useEffect(() => {
		//CREO USUARIO (por el tipo de api no me importa la respuesta)
		fetch("https://playground.4geeks.com/todo/users/vj_list", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			}
		})
		// LEO LOS TODOS DEL USUARIO
		fetch("https://playground.4geeks.com/todo/users/vj_list")
			.then((response) => response.json())
			.then((data) => setTodoList(data.todos))
	}, [])



	return (
		<div id="div">

			<div className="title">List of things to do:</div>
			<div id="contenedor-todo-list">
				<ul className="listado">
					<li>
						<input
							type="text"
							placeholder="What needs to be done?"
							value={newTodo}
							onChange={(e) => setNewTodo(e.target.value)}
							onKeyDown={handlePressKey}
						/>

					</li>
					<div>
						{
							todoList.map((todo) => (
								<li key={todo.id}
									onMouseOver={() => setShowX(todo.id)}
									onMouseLeave={() => setShowX(null)}


								>{todo.label}
									{showX === todo.id && <small onClick={() => handleDelete(todo.id)} id="equis"><i className="fa-solid fa-x"></i></small>}
								</li>
							))
						}
					</div>
					<li className="things">{todoList.length === 0 ? "There are no things to do, add one." : " Things to do: " + todoList.length}</li>
				</ul>
			</div>
			<div id="hoja-uno"></div>
			<div id="hoja-dos"></div>
			<button id="boton" className="button" onClick={() => panic()}>PANIC</button>
		</div>
	);
};

export default Home;
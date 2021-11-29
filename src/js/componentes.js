import { Todo } from "../classes";
import { todoList } from "../index";

const divTodolist = document.querySelector(".todo-list");
const txtInput = document.querySelector(".new-todo");
const btnBorrar = document.querySelector(".clear-completed");
const ulFiltros = document.querySelector(".filters");
const anchorFiltros = document.querySelectorAll(".filtro");



export const crearTodoHtml = (todo) => {
  const htmlTodo = `
    <li class="${todo.completado ? "completed" : ""}" data-id="${todo.id}">
						<div class="view">
                        <input class="toggle" type="checkbox" ${todo.completado ?  "checked" : "unchecked" } ></input>
							<label>${todo.tarea}</label>
							<button class="destroy"></button>
						</div>
						<input class="edit" value="Create a TodoMVC template">
					</li>
                    `;

    const div = document.createElement("div");
    div.innerHTML = htmlTodo;

    divTodolist.append(div.firstElementChild);

    return div.firstElementChild;
};

// eventos
txtInput.addEventListener("keyup", (e) => {
   

    if (e.keyCode === 13 && txtInput.value.length > 0) {

        const nuevoTodo = new Todo(txtInput.value);
        todoList.nuevoTodo( nuevoTodo );
        crearTodoHtml(nuevoTodo);
        txtInput.value = "";

    }

});

divTodolist.addEventListener("click", (e) => {
    const nombreElemento = e.target.localName;
    const todoElemento = e.target.parentElement.parentElement;

    const todoId = todoElemento.getAttribute("data-id");

    if (nombreElemento.includes("input")) {
        todoList.marcarCompletado(todoId);
        todoElemento.classList.toggle("completed");
    }else if( nombreElemento.includes("button")){
        todoList.borrarTodo(todoId);
        divTodolist.removeChild(todoElemento);
    }

});

btnBorrar.addEventListener("click", () =>{
    todoList.borrarCompletados();
    for(let i = divTodolist.children.length-1; i >=0; i--){

        const el = divTodolist.children[i];
        if (el.classList.contains("completed")) {
            divTodolist.removeChild(el);
        }
    

    }
});

ulFiltros.addEventListener("click", (e) =>{
    const filtro = e.target.text;
    if (!filtro) {return};

    anchorFiltros.forEach(el => el.classList.remove("selected"));
    e.target.classList.add("selected");

   for (const el of divTodolist.children) {
       el.classList.remove("hidden");
       const completado = el.classList.contains("completed");
       switch (filtro) {
           case "Pendientes":
               if (completado) {
                   el.classList.add("hidden");
               }               
               break;
            case "Completados":
               if (!completado) {
                   el.classList.add("hidden");
               }               
               break;
       
           default:
               break;
       }
   }

});

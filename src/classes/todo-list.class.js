import { Todo } from "./todo.class";


export class TodoList{

    constructor(){
        //  this.todos = [];
         this.cargarLocalStorage();
    }

    nuevoTodo(todo){
        this.todos.push(todo);
        this.guadarLocalStorage();
    }

    borrarTodo(id){
        this.todos = this.todos.filter( todo => todo.id != id);
        this.guadarLocalStorage();
    }

    marcarCompletado(id){

        for (const todo of this.todos) {
            if (todo.id == id) {
                todo.completado = !todo.completado;
                this.guadarLocalStorage();
                break;
            }
        }

    }

    borrarCompletados(){
        this.todos = this.todos.filter( todo => !todo.completado);
        this.guadarLocalStorage();
    }

    guadarLocalStorage(){

        localStorage.setItem("todo", JSON.stringify(this.todos));

    }

    cargarLocalStorage(){

        this.todos = localStorage.getItem("todo") ? JSON.parse( localStorage.getItem("todo")) : [];
        this.todos = this.todos.map( obj => Todo.fromJson(obj) );

    }

}
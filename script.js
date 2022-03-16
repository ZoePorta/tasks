"use strict";

// Seleccionamos el formulario
const [form] = document.forms;

// Seleccionamos la lista
const taskUl = document.querySelector("ul")

//Seleccionamos el botón de limpiar
const clearButton = document.querySelector("#clear")


// Creamos el array de tareas
let taskList = [];

//Leemos las tareas guardadas
const savedTasks = localStorage.getItem("tasks")

//Si había tareas guardadas... 
if(savedTasks){
  //las asignamos a la variable taskList
  taskList = JSON.parse(savedTasks)

  //y actualizamos la lista
  updateList()
}


console.log(taskList)

// Función para añadir una tarea
function addTask(e){

  //Evitamos el comportamiento por defecto
e.preventDefault();

//Leemos el formulario
const formData = new FormData(e.target)

//Creamos el objeto a partir del formulario
const newTask = Object.fromEntries(formData)

//Añadimos la fecha
newTask.date = new Date().toLocaleDateString()

//Añadimos si está hecha o no (false)
newTask.done = false;


//Añadimso el objeto al array
taskList.push(newTask)

//Actualizamos la lista
updateList()



console.log(taskList)

//Limpiamos el formulario
form.reset()

}



// Crear tarea

function createTask(taskObj){
  //hacemos destructuring del objeto
  const {texto, importante, date, done} = taskObj;

  //Creamos el li
  const li = document.createElement("li");

  //Si es importante, le añadimos la clase importante
  if(+importante){
    li.classList.add("important")
  }



  //Creamos el input y le ponemos tipo checkbox
  const check = document.createElement("input")
  check.setAttribute("type", "checkbox")



  //Si está hecha... 
  if(done){
    //le añadimos la clase hecha
    li.classList.add("done")

    //Le ponemos el atributo checked al checkbox
    check.setAttribute("checked", true)
  }




  //Creamos el párrafo para el texto, le añadimos la clase y el contenido
  const textP = document.createElement("p")
  textP.classList.add("text")
  textP.textContent = texto;

  //Creamos el párrafo para la fecha, le añadimos la clase y el contenido
  const dateP = document.createElement("p");
  dateP.classList.add("date")
  dateP.textContent = date;

  

li.append(check, textP, dateP)
  
return li
}



// Función para actualizar la lista en el DOM
function updateList(){

  //Limpiamos la lista en el DOM para que no se repita
  taskUl.innerHTML = "";


//Guardar la lista actualizada
localStorage.setItem("tasks", JSON.stringify(taskList))

  //Creamos el fragment
  const fragment = document.createDocumentFragment()

  //Recorremos el array de tareas
  for(let i =0; i < taskList.length; i++){

    //Creamos el li de cada tarea
    const task = createTask(taskList[i])
    console.log(taskList[i])

    //Añadimos un atributo personalizado para guardar el índice
    task.dataset.index = i;

    //Añadimos el li al fragment
    fragment.append(task)
  }

  //Ahora que todos los li están en el fragment, añado el fragment al DOM (al ul que está el el HTML)

taskUl.append(fragment)


}


function toggleDone(e){

  //Si el target del evento es el checkbox...
  if(e.target.matches('input[type="checkbox"]')){

    /* //Guardamos el li padre
    const li = e.target.parentElement

    //Sacamos el índice del padre
    const index = li.dataset.index */

    //Sacamos el indice del elemento padre
    const {index} = e.target.parentElement.dataset

    //Ponemos la propiedad done del objeto de la tarea a lo contrario de cómo estaba
    taskList[index].done = !taskList[index].done

//Actualizamos la lista
updateList()
    console.log(taskList[index])
  }


}



//Función de limpiar

function clearList(){
  //Limpiar el array

  taskList = taskList.filter(
    (task) => !task.done
  )

  //Actualizar la lista
  updateList()
}



//Añadimos los event listeners
form.addEventListener("submit", addTask)
taskUl.addEventListener("click", toggleDone)
clearButton.addEventListener("click", clearList)





////////////////// MODO NOCHE ///////////

//Seleccionar el botón
const modeButton = document.querySelector("#mode")

//Seleccionar el HTML para cambiarle la clase
const html = document.querySelector("html")


//Función para cambiar el modo
function toggleMode(){
  html.classList.toggle("noche")
}

modeButton.addEventListener("click", toggleMode)
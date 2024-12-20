var inputTarea=document.getElementById('inputTarea');
var listaTarea=document.getElementById('listaTarea');

//Capturamos el evento al pulsar la tecla "enter " en el campo de texto
inputTarea.addEventListener('keydown', function(event){
    if(event.key ==='Enter'&& inputTarea.value){
      agregarTarea(inputTarea.value);
      inputTarea.value='';
      saveTasks();
    }
});
//funcion para guardar las tareas en el local storage
function saveTasks() {
    const tasks = Array.from(document.querySelectorAll('#listaTarea li')).map(li => ({
        text:li.querySelector('p').textContent,
        completed:li.classList.contains('completed')
    }));
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
// Función para cargar las tareas desde el localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        agregarTarea(task.text, task.completed);
    });
}
//Funcion Para agregar una nueva tarea a la lista
function agregarTarea(textoTarea, completed=false){
    var li=document.createElement('li');//creamos un elemento li 
    var checkbox =document.createElement('input');// creamos un elemmento input
    checkbox.type='checkbox'; //indicamos que el elemnto input es de tipo checkbox
    // Configuramos el estado inicial del checkbox
    checkbox.checked = completed;
    if (completed) {
        li.classList.add('completed');
    }

    //capturamos el evento para detectar cuando hagamos check en el checkbox
    checkbox.addEventListener('change', function(){
        li.classList.toggle('completed');
        saveTasks();
    });
    var texto=document.createElement('p');//creamos un elemento <p>
    texto.innerHTML=textoTarea;//insertamos el elemento tarea en el elemento <p>
    var botonEliminar=document.createElement('span');//Creamos el elemento span que funcionara como boton de eliminar tarea
    botonEliminar.classList.add('delete');//Añadimos la clase delete al boton de eliminar
    botonEliminar.innerHTML='<ion-icon name="close-outline"></ion-icon>';
    //Al hacer click en el boton eliminar, la funcion quita el elemento <li> seleccionado en el que se encuentra el boton eliminar al que hicimos click
    botonEliminar.addEventListener('click',function(){
        li.parentNode.removeChild(li);
        saveTasks();
    });
     //insertamos los nuevos elementos al DOM al agregar una nueva tarea
    li.appendChild(checkbox);
    li.appendChild(texto);
    li.appendChild(botonEliminar);
    listaTarea.appendChild(li);
};
//cargar todas las tareas guardadas al iniciar la pagina 
loadTasks();
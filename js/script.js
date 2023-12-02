//Despliegue del menu principal
let listElements = document.querySelectorAll('.lista-item, .lista-item-2');

listElements.forEach(listElement => {
    listElement.addEventListener('click', () => { //detecta el evento click en los items de la lista del menú
        listElement.classList.toggle('arrow'); //agrega la clase arrow
        let menu = listElement.nextElementSibling;
        menu.classList.toggle('active'); //agrega la clase active para mover el arrow   
    });
});

//ejecutar funcion con click
document.getElementById("btn-open").addEventListener("click", open_close_menu);

//creacion de variables
var side_menu = document.getElementById("menu-principal");
var btn_open = document.getElementById("btn-open");
var body = document.getElementById("body");
var lista = document.getElementById("lista-close");
var contenido = document.getElementById("contenedor-move");

//evento para mostrar y ocultar menu
function open_close_menu(){
    body.classList.toggle("body-move"); //agrega la clase body-manu
    side_menu.classList.toggle("menu-principal-move");//agrega la clase menu-principal-move
    lista.classList.toggle("lista-close");//agrega la clase lista-close
    contenido.classList.toggle("contenedor-move");//agrega la clase contenedor-move
    body.classList.toggle("moved");//agrega la clase moved
}
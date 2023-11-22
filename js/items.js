document.addEventListener('DOMContentLoaded', function() {
    // Obtener todos los elementos con clase "desplegable"
    var desplegables = document.querySelectorAll('.desplegable');

    // Iterar sobre los elementos y agregar un evento de clic
    desplegables.forEach(function(desplegable) {
        desplegable.addEventListener('click', function(event) {
            // Evitar que el evento de clic se propague a elementos secundarios
            event.stopPropagation();

            // Cerrar otros menús desplegables antes de abrir el actual
            desplegables.forEach(function(item) {
                if (item !== desplegable) {
                    item.classList.remove('activo');
                    var submenu = item.querySelector('ul');
                    if (submenu) {
                        submenu.classList.remove('visible');
                    }
                }
            });

            // Alternar la clase "activo" para mostrar/ocultar el menú
            this.classList.toggle('activo');

            // Obtener el menú secundario dentro del elemento desplegable
            var menuSecundario = this.querySelector('ul');

            // Alternar la visibilidad del menú secundario
            if (menuSecundario) {
                menuSecundario.classList.toggle('visible');
            }
        });
    });

    // Obtener el formulario de la página crear_item
    var formularioCrearItem = document.querySelector('main form');

    // Agregar un evento de envío al formulario
    formularioCrearItem.addEventListener('submit', function(event) {
        event.preventDefault(); // Evitar el envío del formulario

        // Obtener el valor del campo de nombre
        var nombreItem = document.getElementById('nombre').value;

        // Crear un objeto para representar el nuevo item
        var newItem = {
            nombre: nombreItem
            // Puedes agregar más propiedades según sea necesario
        };

        // Obtener los items existentes de localStorage o crear un array vacío
        var itemsGuardados = JSON.parse(localStorage.getItem('items')) || [];

        // Obtener el índice del item a editar de la URL
        var urlParams = new URLSearchParams(window.location.search);
        var editIndex = urlParams.get('index');

        // Si hay un índice, significa que se está editando un item existente
        if (editIndex !== null) {
            // Actualizar el item existente en lugar de agregar uno nuevo
            itemsGuardados[editIndex] = newItem;
        } else {
            // Agregar el nuevo item al array
            itemsGuardados.push(newItem);
        }

        // Guardar el array actualizado en localStorage
        localStorage.setItem('items', JSON.stringify(itemsGuardados));

        // Redirigir a la página ver_items.html
        window.location.href = 'ver_items.html';
    });

    // Obtener la lista de items en la página ver_items
    var listaItems = document.querySelector('main ul');

    // Obtener los items de localStorage
    var itemsGuardados = JSON.parse(localStorage.getItem('items')) || [];

    // Iterar sobre los items y mostrarlos en la lista
    itemsGuardados.forEach(function(item, index) {
        var listItem = document.createElement('li');
        listItem.textContent = item.nombre;

        // Crear botones de editar y eliminar
        var botonEditar = document.createElement('button');
        botonEditar.className = 'boton-editar';
        botonEditar.innerHTML = '<img src="../imagenes/editar.png" alt="Editar" style="width: 10px;">';

        var botonEliminar = document.createElement('button');
        botonEliminar.className = 'boton-eliminar';
        botonEliminar.innerHTML = '<img src="../imagenes/eliminar.png" alt="Eliminar" style="width: 10px;">';

        // Agregar eventos a los botones
        botonEditar.addEventListener('click', function() {
            // Redirigir a la página editar_item.html con el índice del item
            window.location.href = 'editar_item.html?index=' + index;
        });

        botonEliminar.addEventListener('click', function() {
            // Eliminar el item del array y actualizar localStorage
            itemsGuardados = itemsGuardados.filter(function(existingItem) {
                return existingItem.nombre !== item.nombre;
            });
            localStorage.setItem('items', JSON.stringify(itemsGuardados));

            // Actualizar la lista de items
            actualizarListaItems();
        });

        // Agregar botones al listItem
        listItem.appendChild(botonEditar);
        listItem.appendChild(botonEliminar);

        // Agregar listItem a la lista
        listaItems.appendChild(listItem);
    });

    // Función para actualizar la lista de items después de eliminar uno
    function actualizarListaItems() {
        // Limpiar la lista actual
        listaItems.innerHTML = '';

        // Iterar sobre los items y mostrarlos en la lista
        itemsGuardados.forEach(function(item, index) {
            var listItem = document.createElement('li');
            listItem.textContent = item.nombre;

            // Crear botones de editar y eliminar
            var botonEditar = document.createElement('button');
            botonEditar.className = 'boton-editar';
            botonEditar.innerHTML = '<img src="../imagenes/editar.png" alt="Editar" style="width: 10px;">';

            var botonEliminar = document.createElement('button');
            botonEliminar.className = 'boton-eliminar';
            botonEliminar.innerHTML = '<img src="../imagenes/eliminar.png" alt="Eliminar" style="width: 10px;">';

            // Agregar eventos a los botones
            botonEditar.addEventListener('click', function() {
                // Redirigir a la página editar_item.html con el índice del item
                window.location.href = 'editar_item.html?index=' + index;
            });

            botonEliminar.addEventListener('click', function() {
                // Eliminar el item del array y actualizar localStorage
                itemsGuardados = itemsGuardados.filter(function(existingItem) {
                    return existingItem.nombre !== item.nombre;
                });
                localStorage.setItem('items', JSON.stringify(itemsGuardados));

                // Actualizar la lista de items
                actualizarListaItems();
            });

            // Agregar botones al listItem
            listItem.appendChild(botonEditar);
            listItem.appendChild(botonEliminar);

            // Agregar listItem a la lista
            listaItems.appendChild(listItem);
        });
    }
});

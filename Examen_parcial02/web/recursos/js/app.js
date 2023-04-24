let listaEmpleados = [];

const objEmpleado = {
    nombre: '',
    puesto: ''
}

let editando = false;

const formulario = document.querySelector('#formulario');
const nombreInput = document.querySelector('#nombre');
const puestoInput = document.querySelector('#puesto');
const btnAgregarInput = document.querySelector('#btnAgregar');

formulario.addEventListener('submit', validarFormulario);

function validarFormulario(e) {
    e.preventDefault();

    if(nombreInput.value === '' || puestoInput.value === '') {
        alert('Todos los campos se deben llenar');
        return;
    }

    if(editando) {
        editarEmpleado();
        editando = false;
    } else {
        
        objEmpleado.nombre = nombreInput.value;
        objEmpleado.puesto = puestoInput.value;

        agregarEmpleado();
    }
}

function agregarEmpleado() {

    listaEmpleados.push({...objEmpleado});

    mostrarEmpleados();

    formulario.reset();
    limpiarObjeto();
}

function limpiarObjeto() {
    objEmpleado.id = '';
    objEmpleado.nombre = '';
    objEmpleado.puesto = '';
}

function mostrarEmpleados() {
    limpiarHTML();
    const divEmpleados = document.querySelector('.div-empleados');
  
    // Crear tabla
    const tabla = document.createElement('table');
    tabla.classList.add('tabla-empleados');
  
    // Crear encabezado de la tabla
    const encabezado = document.createElement('thead');
    encabezado.innerHTML = `
      <tr>
        <th>Titulo</th>
        <th>Descripción</th>
        <th>Acciones</th>
      </tr>
    `;
    tabla.appendChild(encabezado);
  
    // Crear cuerpo de la tabla
    const cuerpoTabla = document.createElement('tbody');
    listaEmpleados.forEach((empleado) => {
      const { id, nombre, puesto } = empleado;
  
      // Crear fila de la tabla
      const fila = document.createElement('tr');
  
      // Crear celda para el nombre del empleado
      const nombreCelda = document.createElement('td');
      nombreCelda.classList.add('nombre-empleado');
      nombreCelda.textContent = nombre;
  
      // Crear celda para el puesto del empleado
      const puestoCelda = document.createElement('td');
      puestoCelda.classList.add('puesto-empleado');
      puestoCelda.textContent = puesto;
  
      // Crear celda para los botones de acción
      const accionesCelda = document.createElement('td');
  
      const editarBoton = document.createElement('button');
      editarBoton.onclick = () => cargarEmpleado(empleado);
      editarBoton.textContent = 'Editar';
      editarBoton.classList.add('btn', 'btn-editar');
      accionesCelda.append(editarBoton);
  
      const eliminarBoton = document.createElement('button');
      eliminarBoton.onclick = () => eliminarEmpleado(id);
      eliminarBoton.textContent = 'Eliminar';
      eliminarBoton.classList.add('btn', 'btn-eliminar');
      accionesCelda.append(eliminarBoton);
  
      // Agregar las celdas a la fila
      fila.appendChild(nombreCelda);
      fila.appendChild(puestoCelda);
      fila.appendChild(accionesCelda);
  
      // Agregar la fila al cuerpo de la tabla
      cuerpoTabla.appendChild(fila);
    });
  
    // Agregar el cuerpo de la tabla a la tabla
    tabla.appendChild(cuerpoTabla);
  
    // Agregar la tabla al div de empleados
    divEmpleados.appendChild(tabla);
    
  }


function cargarEmpleado(empleado) {
    const {id, nombre, puesto} = empleado;

    nombreInput.value = nombre;
    puestoInput.value = puesto;

    objEmpleado.id = id;

    formulario.querySelector('button[type="submit"]').textContent = 'Actualizar';
    
    editando = true;
}

function editarEmple() {

    objEmpleado.nombre = nombreInput.value;
    objEmpleado.puesto = puestoInput.value;

    listaEmpleados.map(empleado => {

        if(empleado.id === objEmpleado.id) {
            empleado.id = objEmpleado.id;
            empleado.nombre = objEmpleado.nombre;
            empleado.puesto = objEmpleado.puesto;

        }

    });

    limpiarHTML();
    mostrarEmpleados();
    formulario.reset();

    formulario.querySelector('button[type="submit"]').textContent = 'Agregar';
    
    editando = false;
}

function eliminleado(id) {

    listaEmpleados = listaEmpleados.filter(empleado => empleado.id !== id);

    limpiarHTML();
    mostrarEmpleados();
}

function limpiarHTML() {
    const divEmpleados = document.querySelector('.div-empleados');
    while(divEmpleados.firstChild) {
        divEmpleados.removeChild(divEmpleados.firstChild);
    }
}
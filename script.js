// Declaración de variables y arrays
const horarios = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM"];
let reservas = JSON.parse(localStorage.getItem('reservas')) || [];

// Referencias a elementos del DOM
const formReserva = document.getElementById('formReserva');
const listaReservas = document.getElementById('listaReservas');
const selectHorario = document.getElementById('horario');

// Cargar opciones de horarios en el select
function cargarHorarios() {
    horarios.forEach(horario => {
        const option = document.createElement('option');
        option.value = horario;
        option.textContent = horario;
        selectHorario.appendChild(option);
    });
}

// Mostrar reservas almacenadas
function mostrarReservas() {
    listaReservas.innerHTML = ''; // Limpiar la lista antes de mostrar
    if (reservas.length === 0) {
        listaReservas.innerHTML = '<li class="list-group-item">No hay reservas realizadas.</li>';
    } else {
        reservas.forEach((reserva, index) => {
            const li = document.createElement('li');
            li.classList.add('list-group-item');
            li.textContent = `${reserva.nombre} a las ${reserva.horario}`;
            listaReservas.appendChild(li);
        });
    }
}

// Agregar una nueva reserva
formReserva.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el envío del formulario
    const nombre = document.getElementById('nombre').value;
    const horario = selectHorario.value;

    const nuevaReserva = { nombre, horario };
    reservas.push(nuevaReserva);

    // Guardar en localStorage
    localStorage.setItem('reservas', JSON.stringify(reservas));

    // Mostrar las reservas actualizadas
    mostrarReservas();

    // Limpiar el formulario
    formReserva.reset();
});

// Inicializar la aplicación
cargarHorarios();
mostrarReservas();

// Declaración de variables y arrays
const horarios = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM"];
let reservas = [];

// mostrar los horarios disponibles
function mostrarHorarios() {
    console.log("Horarios disponibles:");
    horarios.forEach(function(horario, index) {
        console.log(`${index + 1}. ${horario}`);
    });
}

// reservar un horario
function reservarHorario() {
    const nombre = prompt("Ingrese su nombre:");
    mostrarHorarios();
    const seleccion = parseInt(prompt("Seleccione un horario (ingrese el número):")) - 1;

    if (seleccion >= 0 && seleccion < horarios.length) {
        const horarioSeleccionado = horarios[seleccion];
        reservas.push({ nombre, horario: horarioSeleccionado });
        alert(`Reserva confirmada para ${nombre} a las ${horarioSeleccionado}`);
    } else {
        alert("Selección inválida. Inténtelo de nuevo.");
    }

    // Volver al menú principal
    mostrarMenu();
}

// mostrar las reservas
function mostrarReservas() {
    console.log("Reservas confirmadas:");
    if (reservas.length === 0) {
        console.log("No hay reservas realizadas.");
    } else {
        reservas.forEach((reserva, index) => {
            console.log(`${index + 1}. ${reserva.nombre} a las ${reserva.horario}`);
        });
    }

// Volver al menú principal
    mostrarMenu();
}

// mostrar el menú
function mostrarMenu() {
    const opcion = prompt("Seleccione una opción: \n1. Mostrar horarios \n2. Reservar horario \n3. Mostrar reservas \n4. Salir");
    console.log("Opción seleccionada:", opcion);
    switch (opcion) {
        case "1":
            mostrarHorarios();
            mostrarMenu();
            break;
        case "2":
            reservarHorario();
            break;
        case "3":
            mostrarReservas();
            break;
        case "4":
            alert("Gracias por usar el Sistema de Reservas de CodeGym. ¡Hasta luego!");
            break;
        default:
            alert("Opción inválida. Por favor, intente de nuevo.");
            mostrarMenu();
    }
}

// Función para iniciar
function iniciarSimulador() {
    console.log("Bienvenido al Sistema de Reservas de CodeGym");
    mostrarMenu();
}

// Iniciar
iniciarSimulador();


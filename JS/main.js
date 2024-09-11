document.addEventListener("DOMContentLoaded", async function () {
    try {
        const response = await fetch('./JS/data.json'); // Usamos await aquí
        const data = await response.json(); // Esperamos a que se convierta a JSON
        
        const clases = JSON.parse(localStorage.getItem("clases")) || data.clases;
        const horarios = data.horarios;
        let reservas = JSON.parse(localStorage.getItem("reservas")) || [];

        const claseSelect = document.getElementById("clase");
        const horarioSelect = document.getElementById("horario");
        const reservaForm = document.getElementById("reservaForm");
        const reservasConfirmadas = document.getElementById("reservasConfirmadas");
        const btnEliminarTodas = document.getElementById("btnEliminarTodas");

        // Aquí siguen tus funciones y el resto del código
        function cargarClases() {
            claseSelect.innerHTML = '';
            clases.forEach(clase => {
                let option = document.createElement("option");
                option.value = clase.nombre;
                option.textContent = `${clase.nombre} (${clase.cupos} cupos disponibles)`;
                claseSelect.appendChild(option);
            });
        }

        cargarClases();

        horarios.forEach(horario => {
            let option = document.createElement("option");
            option.value = horario;
            option.textContent = horario;
            horarioSelect.appendChild(option);
        });

        reservaForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const nombre = document.getElementById("nombre").value;
            const claseSeleccionada = claseSelect.value;
            const horarioSeleccionado = horarioSelect.value;

            const clase = clases.find(c => c.nombre === claseSeleccionada);

            if (clase.cupos > 0) {
                reservas.push({ nombre, clase: claseSeleccionada, horario: horarioSeleccionado });
                clase.cupos--;

                localStorage.setItem("reservas", JSON.stringify(reservas));
                localStorage.setItem("clases", JSON.stringify(clases));
                actualizarReservas();
                cargarClases();
                alert(`Reserva confirmada para ${nombre} en ${claseSeleccionada} a las ${horarioSeleccionado}`);
            } else {
                alert(`Lo siento, no hay cupos disponibles para ${claseSeleccionada}`);
            }

            reservaForm.reset();
        });

        function actualizarReservas() {
            reservasConfirmadas.innerHTML = "";
            reservas.forEach((reserva, index) => {
                let div = document.createElement("div");
                div.innerHTML = `${index + 1}. ${reserva.nombre} - ${reserva.clase} a las ${reserva.horario} 
                    <button class="btnEliminar" data-index="${index}">
                        <i class="fas fa-trash-alt"></i> Eliminar
                    </button>`;
                reservasConfirmadas.appendChild(div);
            });

            const botonesEliminar = document.querySelectorAll(".btnEliminar");
            botonesEliminar.forEach(boton => {
                boton.addEventListener("click", eliminarReserva);
            });
        }

        function eliminarReserva(e) {
            const index = e.target.dataset.index;
            const claseEliminada = reservas[index].clase;

            const clase = clases.find(c => c.nombre === claseEliminada);
            clase.cupos++;

            reservas.splice(index, 1);
            localStorage.setItem("reservas", JSON.stringify(reservas));
            localStorage.setItem("clases", JSON.stringify(clases));

            actualizarReservas();
            cargarClases();
        }

        actualizarReservas();
        
    } catch (error) {
        console.error('Error al cargar el JSON:', error); // Captura los errores del fetch
    }
});

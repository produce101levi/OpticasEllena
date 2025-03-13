// Cambiar vista a "Agendar otro"
const cambiarPropio = () => {
    const otroUsuario = document.getElementById("otroUsuario");
    const infoPropio = document.getElementById("infoPropio");
    fetch('/user/cliente/agendar-cita/otro-usuario', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(result => result.json())
    .then(data => {
        let html = "";
        html+=`
            <form action="/user/cliente/agendar-cita/otro-usuario" method="POST">
                <strong><a id="botonPropio" onclick="cambiarOtro()" class="is-danger-dark-text">Quiero agendar para mí mism@</a></strong>
                <br><br>
                <div class="field">
                    <p class="control has-icons-left">
                        <input class="input" type="text" onfocus="text" name="nombre" placeholder="Nombre" autocomplete="off">
                        <span class="icon is-small is-left">
                            <i class="fas fa-user"></i>
                        </span>  
                    </p>
                </div>
                <div class="field">
                    <p class="control has-icons-left">
                        <input class="input" type="text" onfocus="text" name="apellido" placeholder="Apellido" autocomplete="off">
                        <span class="icon is-small is-left">
                            <i class="fas fa-user"></i>
                        </span>  
                    </p>
                </div>
                <div class="field">
                    <p class="control has-icons-left">
                        <input class="input" type="text" onfocus="text" name="telefono" placeholder="Teléfono" autocomplete="off">
                        <span class="icon is-small is-left">
                            <i class="fas fa-phone"></i>
                        </span>  
                    </p>
                </div>
                <div class="field">
                    <p class="control has-icons-left">
                        <input class="input" type="text" name="edad" placeholder="Edad(es)" autocomplete="off">
                        <span class="icon is-small is-left">
                            <i class="fas fa-hashtag"></i>
                        </span>  
                    </p>
                </div>
                <div class="field">
                    <p class="control has-icons-left">
                        <input class="input" type="datetime-local" name="fecha_cita" placeholder="Fecha y Hora" autocomplete="off" required>
                        <span class="icon is-small is-left">
                            <i class="fas fa-clock"></i>
                        </span>  
                    </p>
                </div>
                <div class="field">
                    <input class="button is-danger-dark is-medium is-fullwidth" type="submit" value="Guardar">
                </div>
            </form>
        `
        otroUsuario.innerHTML = html;
        infoPropio.innerHTML = "";
        setTimeout(() => {
            flatpickr("input[type=datetime-local]", {
                enableTime: true,
                minTime: "11:00",
                maxTime: "18:00",
                minDate: new Date(),
                minuteIncrement: 30,
            });
        })
    })
}

// Cambiar vista de vuelta a "Agendar Propio"
const cambiarOtro = () => {
    const otroUsuario = document.getElementById("otroUsuario");
    const infoPropio = document.getElementById("infoPropio");
    fetch('/user/cliente/agendar-cita/propio-usuario', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(result => result.json())
    .then(data => {
        let html = "";
        console.log("Data:", data);
        html+=`
        <form action="/user/cliente/agendar-cita/propio-usuario" method="POST">
            <div class="columns is-vcentered">
                <div class="column">
                    <div class="info-usuario my-2">
                        <strong>${data.user.nombre} ${data.user.apellido}
                            <br>
                            ${data.user.telefono}
                            <br>
                            ${data.edad} años
                        </strong>
                    </div>
                </div>
                <div class="column">
                    <strong><a id="botonPropio" onclick="cambiarPropio()" class="is-danger-dark-text">Quiero agendar para alguien más</a></strong>
                </div>
            </div>
            <div class="field">
                <p class="control has-icons-left">
                    <input class="input" type="datetime-local" name="fecha_cita" placeholder="Fecha y Hora" required>
                    <span class="icon is-small is-left">
                        <i class="fas fa-clock"></i>
                    </span>  
                </p>
            </div>
            <div class="field">
                <input class="button is-danger-dark is-medium is-fullwidth" type="submit" value="Guardar">
            </div>
        </form>
        `
        otroUsuario.innerHTML = "";
        infoPropio.innerHTML = html;

        setTimeout(() => {
            flatpickr("input[type=datetime-local]", {
                enableTime: true,
                minTime: "11:00",
                maxTime: "18:00",
                minDate: new Date(),
                minuteIncrement: 30,
            });
        })
    })
}

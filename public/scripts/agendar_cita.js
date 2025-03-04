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
            <div class="field">
                <p class="control has-icons-left">
                    <input class="input" type="text" onfocus="text" name="nombre" placeholder="Nombre">
                    <span class="icon is-small is-left">
                        <i class="fas fa-user"></i>
                    </span>  
                </p>
            </div>
            <div class="field">
                <p class="control has-icons-left">
                    <input class="input" type="text" onfocus="text" name="apellido" placeholder="Apellido">
                    <span class="icon is-small is-left">
                        <i class="fas fa-user"></i>
                    </span>  
                </p>
            </div>
            <div class="field">
                <p class="control has-icons-left">
                    <input class="input" type="text" onfocus="text" name="telefono" placeholder="Teléfono">
                    <span class="icon is-small is-left">
                        <i class="fas fa-phone"></i>
                    </span>  
                </p>
            </div>
            <div class="field">
                <p class="control has-icons-left">
                    <input class="input" type="text" onfocus="text" name="correo" placeholder="Correo electrónico">
                    <span class="icon is-small is-left">
                        <i class="fas fa-at"></i>
                    </span>  
                </p>
            </div>
            <div class="field">
                <p class="control has-icons-left">
                    <input class="input" type="text" onfocus="(this.type = 'date')" onblur="(this.type = 'text')" name="fecha_nacimiento" placeholder="Fecha de Nacimiento">
                    <span class="icon is-small is-left">
                        <i class="fas fa-calendar"></i>
                    </span>  
                </p>
            </div>
        `
        otroUsuario.innerHTML = html;
        infoPropio.innerHTML = "";
    })
}
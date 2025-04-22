// ----------------------
// MÓDULOS INTL
// ----------------------
import paisesEsp from "https://cdn.jsdelivr.net/npm/intl-tel-input@25.3.1/build/js/i18n/es/countries.js";

// ----------------------
// MÓDULOS FIREBASE
// ----------------------

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

const firebaseConfig = window.firebaseEnv;

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

// ----------------------
// VARIABLES
// ----------------------
const Form = document.getElementById('registrarForm');
const inputs = document.getElementById('inputs');
let siguiente, registrar, regresar, contrasenaValida, emailValido, nombreValido, apellidoValido,
telefonoValido, fechaValida, iti;
let emailValor = '';
let contrasenaValor = '';
let nombreValor = '';
let apellidoValor = '';
let telefonoValor = '';
let fechaValor = '';

// En cuanto carga la página, se carga el contenido del paso uno
document.addEventListener('DOMContentLoaded', () => {
    pasoUno();
    eventSiguiente();
});

// ----------------------
// FUNCIONES
// ----------------------

// Función de validación de correo electrónico
const validarCorreo = () => {
    const inputEmail = document.getElementById("email");

    inputEmail.addEventListener("input", (event) => {
        let email = event.target.value;
        const regex = /^[^\s@]+@[a-z]+\.[^\s@]+$/;

        if (regex.test(email)){
            inputEmail.classList.remove("is-danger");
            inputEmail.classList.add("is-success", "has-text-black");
            emailValido = true
        } else {
            inputEmail.classList.remove("is-success")
            inputEmail.classList.add("is-danger", "has-text-black");
            emailValido = false
        }

        if (email == ''){
            inputEmail.classList.remove("is-success", "is-danger")
        }

        siguiente.disabled = !(contrasenaValida && emailValido)
    })
    
}

// Función de validación instantánea de contraseña
const validarContrasena = () => {
    // Variables de validación de contraseña
    const inputContrasena = document.getElementById("contrasena");
    const validacion = document.getElementById("validacion");
    
    inputContrasena.addEventListener("input", (event) => {
        let contrasena = event.target.value;
    
        // Verifica que contraseña cumpla con requisitos
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    
        if (regex.test(contrasena)) {
            inputContrasena.classList.remove("is-danger");
            inputContrasena.classList.add("is-success", "has-text-black");
            validacion.classList.remove("has-text-danger");
            validacion.classList.add("has-text-success");
            validacion.innerHTML = '';
            contrasenaValida = true;
        } else if (!regex.test(contrasena)){
            inputContrasena.classList.remove("is-success")
            inputContrasena.classList.add("is-danger", "has-text-black");
            validacion.classList.remove("has-text-success");
            validacion.classList.add("has-text-danger");
            validacion.innerHTML = `
                La contraseña debe tener mínimo 8 caracteres y contener un número, una mayúscula,
                una minúscula y un caracter especial.
            `
            contrasenaValida = false;
        }
        
        if (contrasena == ''){
            inputContrasena.classList.remove("is-success", "is-danger")
            validacion.innerHTML = ''
        }
        
        siguiente.disabled = !(contrasenaValida && emailValido)
    })

}

// Función para validar información básica
const validarInfo = () => {
    const inputNombre = document.getElementById('nombre');
    const inputApellido = document.getElementById('apellido');
    const inputTelefono = document.getElementById('telefono');
    const inputTelCompleto = document.getElementById('telcompleto');
    const inputFecha = document.getElementById('fecha_nacimiento');

    const telefonoRegex = /^\+?[0-9()-\s]+$/
    const stringRegex = /^[\p{L}\s]+$/u

    // Validar nombre
    inputNombre.addEventListener('input', () => {
        let nombre = inputNombre.value;
        if (stringRegex.test(nombre)){
            inputNombre.classList.remove("is-danger");
            inputNombre.classList.add("is-success", "has-text-black");
            nombreValido = true;
        } else {
            inputNombre.classList.remove("is-success");
            inputNombre.classList.add("is-danger", "has-text-black");
            nombreValido = false;
        }

        if (nombre == '') inputNombre.classList.remove("is-success", "is-danger");
        registrar.disabled = !(nombreValido && apellidoValido && telefonoValido && fechaValida);
    })

    // Validar apellido
    inputApellido.addEventListener('input', () => {
        let apellido = inputApellido.value
        if (stringRegex.test(apellido)){
            inputApellido.classList.remove("is-danger");
            inputApellido.classList.add("is-success", "has-text-black");
            apellidoValido = true;
        } else {
            inputApellido.classList.remove("is-success");
            inputApellido.classList.add("is-danger", "has-text-black");
            apellidoValido = false;
        }

        if (apellido == '') inputApellido.classList.remove("is-success", "is-danger");
        registrar.disabled = !(nombreValido && apellidoValido && telefonoValido && fechaValida);
    })

    // Validar teléfono
    inputTelefono.addEventListener('input', () => {
        let telefono = inputTelefono.value

        inputTelCompleto.value = iti.getNumber();

        if (telefonoRegex.test(telefono) && iti.isValidNumber()){
            inputTelefono.classList.remove("is-danger");
            inputTelefono.classList.add("is-success", "has-text-black");
            telefonoValido = true;
        } else {
            inputTelefono.classList.remove("is-success");
            inputTelefono.classList.add("is-danger", "has-text-black");
            telefonoValido = false;
        }

        if (telefono == '') inputTelefono.classList.remove("is-success", "is-danger");
        registrar.disabled = !(nombreValido && apellidoValido && telefonoValido && fechaValida);
    })

    // Validar fecha
    inputFecha.addEventListener('input', () => {
        let fecha = inputFecha.value
        if (fecha != ''){
            inputFecha.classList.add("is-success", "has-text-black");
            fechaValida = true;
        } else {
            inputFecha.classList.remove("is-success");
            fechaValida = false;
        }
        registrar.disabled = !(nombreValido && apellidoValido && telefonoValido && fechaValida);
    })

    
    
}

// Función para permitir ver contraseña
const verContrasena = () => {
    const inputContrasena = document.getElementById("contrasena");

    const mostrar = document.getElementById('mostrar_contrasena')
    const ojo = document.getElementById('ojo');
    
    // Cambiar tipo de input a "texto" cuando se selecciona el ícono
    // de mostrar contraseña
    mostrar.addEventListener("click", () => {
        if (inputContrasena.type == "text"){
            inputContrasena.type="password"; // Esconder contraseña
            ojo.classList.remove("fa-eye"); // Cambiar ícono
            ojo.classList.add("fa-eye-slash");
        } else if (inputContrasena.type="password"){
            inputContrasena.type="text"; // Mostrar contraseña
            ojo.classList.remove("fa-eye-slash"); // Cambiar ícono
            ojo.classList.add("fa-eye");
        }
    })
}

// Función para detectar uso de tecla mayúscula
const detectarMayus = () => {
    // Detección de tecla mayúscula
    const inputContrasena = document.getElementById("contrasena");
    const control_contrasena = document.getElementById('control_contrasena');
    const span = document.createElement('span');
    const mayusIcono = document.createElement('i');
    
    // Agregar ícono de mayúsculas
    span.classList.add('icon', 'is-small', 'is-right');
    mayusIcono.classList.add('fas', 'fa-arrow-up');
    
    span.appendChild(mayusIcono);
    mayusIcono.style.display = 'none'; // Ícono no se muestra por defecto
    
    control_contrasena.appendChild(span); // Agregar ícono a control_contrasena
    
    mayusIcono.style.marginRight = '50px'; // Dar margen a ícono
    
    // Únicamente muestra el ícono de mayúscula si el input 
    // de contraseña está seleccionado
    inputContrasena.addEventListener('focus', () => {
        document.addEventListener('keydown', (event) => {
            const mayusOn = event.getModifierState('CapsLock');
            if (mayusOn){
                mayusIcono.style.display = 'inline'; // Mostrar ícono
            } else {
                mayusIcono.style.display = 'none'; // Dejar de mostrar ícono
            }
        })
    
        document.addEventListener('keyup', (event) => {
            const mayusOn = event.getModifierState('CapsLock');
            if (mayusOn){
                mayusIcono.style.display = 'inline';
            } else {
                mayusIcono.style.display = 'none';
            }
        })
    })
}

// Detectar validez de datos
const mantCredVal = () => {
    if (emailValido) document.getElementById('email').classList.add('is-success');
    if (contrasenaValida) document.getElementById('contrasena').classList.add('is-success');
}

const mantInfoVal = () => {
    if (nombreValido) document.getElementById('nombre').classList.add('is-success');
    if (apellidoValido) document.getElementById('apellido').classList.add('is-success');
    if (telefonoValido) document.getElementById('telefono').classList.add('is-success');
    if (fechaValida) document.getElementById('fecha_nacimiento').classList.add('is-success');
}

// Paso uno: Correo y Contraseña
const pasoUno = () => {
    inputs.innerHTML = `
        <div class="field">
            <p class="control has-icons-left">
                <input 
                    class="input" 
                    type="text" 
                    id="email" 
                    name="email" 
                    placeholder="Correo" 
                    value="${emailValor}" 
                    autocomplete="off"
                >
                <span class="icon is-small is-left">
                    <i class="fas fa-envelope"></i>
                </span>  
            </p>
        </div>
        <div class="field">
            <p id="control_contrasena" class="control has-icons-left has-icons-right">
                <input 
                    class="input" 
                    type="password" 
                    id="contrasena" 
                    name="contrasena" 
                    placeholder="Contraseña" 
                    value="${contrasenaValor}" 
                    autocomplete="off"
                >
                <span class="icon is-small is-left">
                    <i class="fas fa-lock"></i>
                </span>
                <span class="icon is-small is-right" id="mostrar_contrasena">
                    <i class="fas fa-eye-slash" id="ojo"></i>
                </span>
            </p>
        </div>
        <div class="is-size-7 mb-2" id="validacion">
        </div>
        <div class="field">
            <button id="siguiente" class="button is-danger-dark is-medium is-fullwidth" disabled>Siguiente</button>
        </div>
    `

    siguiente = document.getElementById('siguiente');
    if(contrasenaValida) siguiente.disabled = false;
    validarCorreo();
    validarContrasena();
    verContrasena();
    detectarMayus();
    mantCredVal();
}

// Paso Dos: Nombre, Apellido, Teléfono y Fecha de Nacimiento
const pasoDos = () => {
    inputs.innerHTML = `
        <!-- Valores ocultos para que formen parte de req.body -->
        <input class="input" type="hidden" name="email" value="${emailValor}" autocomplete="off">
        <input class="input" type="hidden" name="contrasena" value="${contrasenaValor}" autocomplete="off">
        <input type="hidden" name="token" id="token" />
        <div class="field">
            <p class="control has-icons-left">
                <input class="input" type="text" id="nombre" name="nombre" placeholder="Nombre" value="${nombreValor}" autocomplete="off">
                <span class="icon is-small is-left">
                    <i class="fas fa-user"></i>
                </span>  
            </p>
        </div>
        <div class="field">
            <p class="control has-icons-left">
                <input class="input" type="text" id="apellido" name="apellido" placeholder="Apellido" value="${apellidoValor}" autocomplete="off">
                <span class="icon is-small is-left">
                    <i class="fas fa-users"></i>
                </span>  
            </p>
        </div>
        <div class="field">
            <p class="control has-icons-left">
                <input class="input" type="tel" id="telefono" placeholder="Número Telefónico" value="${telefonoValor}" autocomplete="off">
            </p>
        </div>
        <input type="hidden" id="telcompleto" name="telefono">
        <div class="field">
            <p class="control has-icons-left">
                <input class="input" type="text" onfocus="(this.type = 'date')" onblur="(this.type = 'text')" id="fecha_nacimiento" name="fecha_nacimiento" value="${fechaValor}" placeholder="Fecha de Nacimiento">
                <span class="icon is-small is-left">
                    <i class="fas fa-calendar"></i>
                </span>  
            </p>
        </div>
        <div class="field">
            <button id="regresar" class="button is-light is-medium is-fullwidth">Regresar</button>
        </div>
        <div class="field">
            <button id="registrar" class="button is-danger-dark is-medium is-fullwidth" disabled>Registrar Usuario</button>
        </div>
        
    `
    regresar = document.getElementById('regresar');
    registrar = document.getElementById('registrar');

    flatpickr("#fecha_nacimiento", {
        locale: {
            firstDayOfWeek: 1,
            weekdays: {
                shorthand: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
                longhand: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
            },
            months: {
                shorthand: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                longhand: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
            }
        }
    });

    const inputTelefono = document.querySelector("#telefono");
    iti = intlTelInput(inputTelefono, {
        separateDialCode: true,
        initialCountry: "MX",
        i18n: paisesEsp,
        loadUtils: () => import("https://cdn.jsdelivr.net/npm/intl-tel-input@25.3.1/build/js/utils.js"),
    });

    document.getElementById('telcompleto').value = iti.getNumber();

    registrar.disabled = !(nombreValido && apellidoValido && telefonoValido && fechaValida);

    validarInfo();
    mantInfoVal();
}

// Funciones para manejar event listener de botones SIGUIENTE, REGRESAR y REGISTRAR
const eventSiguiente = () => {
    const botonSig = document.getElementById('siguiente');

    if (botonSig){
        botonSig.addEventListener('click', (event) => {
            event.preventDefault();

            // Guardar valores introducidos por usuario
            emailValor = document.getElementById('email').value;
            contrasenaValor = document.getElementById('contrasena').value;
            

            pasoDos();
            eventRegresar();
            eventRegistrar();
        })
    }
}

const eventRegresar = () => {
    const botonRegresar = document.getElementById('regresar');
    
    if (botonRegresar){
        botonRegresar.addEventListener('click', (event) => {
            event.preventDefault();

            nombreValor = document.getElementById('nombre').value
            apellidoValor = document.getElementById('apellido').value
            telefonoValor = document.getElementById('telefono').value
            fechaValor = document.getElementById('fecha_nacimiento').value

            pasoUno();
            eventSiguiente();
        })
    }
}

const eventRegistrar = () => {
    const botonRegistrar = document.getElementById('registrar');
    if (botonRegistrar) {
        botonRegistrar.addEventListener('click', (event) => {
            event.preventDefault();

            const tokenField = document.getElementById('token');

            createUserWithEmailAndPassword(auth, emailValor, contrasenaValor)
            .then((userCredential) => {
                console.log("User Credential:", userCredential);
                userCredential.user.getIdToken().then((token) => {
                    console.log("Token", token);
                    tokenField.value = token;
                    Form.submit()
                });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            })
        })
    }
}

// async function createUser(event){
//     event.preventDefault();

//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;

//     try {
//         const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//         const token = await userCredential.user.getIdToken();
//         tokenField.value = token;
//         Form.submit();
//     } catch (error){
//         console.log(error.message);
//     }
// }
// Form.addEventListener('submit', createUser);


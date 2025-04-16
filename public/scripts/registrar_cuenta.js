// ----------------------
// MÓDULOS FIREBASE
// ----------------------

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

const firebaseConfig = window.firebaseEnv;

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

// ----------------------
// VARIABLES
// ----------------------
const Form = document.getElementById('registrarForm');
const inputs = document.getElementById('inputs');
let siguiente;
let registrar;
let regresar;
let emailValor = '';
let contrasenaValor = '';
let contrasenaValida;
let correoValido;

// En cuanto carga la página, se carga el contenido del paso uno
document.addEventListener('DOMContentLoaded', () => {
    pasoUno();
    eventSiguiente();
});

// ----------------------
// FUNCIONES
// ----------------------

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
            validacion.innerHTML = `
                Contraseña segura
            `
            contrasenaValida = true
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

        if (contrasenaValida){
            siguiente.disabled = false;
        } else {
            siguiente.disabled = true;
        }
    
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

// Paso uno: Correo y Contraseña
const pasoUno = () => {

    inputs.innerHTML = `
        <div class="field">
            <p class="control has-icons-left">
                <input class="input" type="text" id="email" name="email" placeholder="Correo" value="${emailValor}" autocomplete="off">
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
    validarContrasena();
    verContrasena();
    detectarMayus();
}

// Paso Dos: Nombre, Apellido, Teléfono y Fecha de Nacimiento
const pasoDos = () => {
    inputs.innerHTML = `
        <input class="input" type="hidden" name="email" value="${emailValor}" autocomplete="off">
        <input class="input" type="hidden" name="contrasena" value="${contrasenaValor}" autocomplete="off">
        <div class="field">
            <p class="control has-icons-left">
                <input class="input" type="text" name="nombre" placeholder="Nombre" autocomplete="off">
                <span class="icon is-small is-left">
                    <i class="fas fa-user"></i>
                </span>  
            </p>
        </div>
        <div class="field">
            <p class="control has-icons-left">
                <input class="input" type="text" name="apellido" placeholder="Apellido" autocomplete="off">
                <span class="icon is-small is-left">
                    <i class="fas fa-users"></i>
                </span>  
            </p>
        </div>
        <div class="field">
            <p class="control has-icons-left">
                <input class="input" type="text" name="telefono" placeholder="Número Telefónico" autocomplete="off">
                <span class="icon is-small is-left">
                    <i class="fas fa-phone"></i>
                </span>  
            </p>
        </div>
        <div class="field">
            <p class="control has-icons-left">
                <input class="input" type="text" onfocus="(this.type = 'date')" onblur="(this.type = 'text')" id="fecha_nacimiento" name="fecha_nacimiento" placeholder="Fecha de Nacimiento">
                <span class="icon is-small is-left">
                    <i class="fas fa-calendar"></i>
                </span>  
            </p>
        </div>
        <div class="field">
            <button id="regresar" class="button is-light is-medium is-fullwidth">Regresar</button>
        </div>
        <div class="field">
            <button id="registrar" class="button is-danger-dark is-medium is-fullwidth">Registrar Usuario</button>
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
}

// Funciones para manejar event listener de botones SIGUIENTE y REGRESAR
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
        })
    }
}

const eventRegresar = () => {
    const botonRegresar = document.getElementById('regresar');
    
    if (botonRegresar){
        botonRegresar.addEventListener('click', (event) => {
            event.preventDefault();
            
            pasoUno();
            eventSiguiente();
        })
    }
}



import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

const firebaseConfig = window.firebaseEnv;

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

// const Form = document.getElementById('registrarForm');

// Form.addEventListener('submit', (event) => {
//     event.preventDefault();

//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;

// })

// Validación instantánea de contraseña
const inputContrasena = document.getElementById("contrasena");
const confirmarContrasena = document.getElementById("confirmar_contrasena");
const validacion = document.getElementById("validacion");

inputContrasena.addEventListener("input", function() {
    console.log(inputContrasena.value)
    let contrasena = this.value;

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
    } else if (!regex.test(contrasena)){
        inputContrasena.classList.remove("is-success")
        inputContrasena.classList.add("is-danger", "has-text-black");
        validacion.classList.remove("has-text-success");
        validacion.classList.add("has-text-danger");
        validacion.innerHTML = `
            La contraseña debe tener mínimo 8 caracteres y contener un número, una mayúscula,
            una minúscula y un caracter especial.
        `
    }
    
    if (contrasena == ''){
        inputContrasena.classList.remove("is-success", "is-danger")
        validacion.innerHTML = ''
    }

})

// Mostrar contraseña
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

// Detección de tecla mayúscula
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

// Control de selección de input
var focus = false;

// Únicamente muestra el ícono de mayúscula si el input 
// de contraseña está seleccionado
inputContrasena.addEventListener('focus', () => {
    focus = true; 
    if (focus){
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
    }
})
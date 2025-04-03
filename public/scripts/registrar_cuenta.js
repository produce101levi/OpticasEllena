// Validación instantánea de contraseña
const inputContrasena = document.getElementById("contrasena");
const confirmarContrasena = document.getElementById("confirmar_contrasena");
const validacion = document.getElementById("validacion");

inputContrasena.addEventListener("input", function() {
    let contrasena = this.value;

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

mostrar.addEventListener("click", () => {
    if (inputContrasena.type == "text"){
        inputContrasena.type="password";
        ojo.classList.remove("fa-eye");
        ojo.classList.add("fa-eye-slash");
    } else if (inputContrasena.type="password"){
        inputContrasena.type="text";
        ojo.classList.remove("fa-eye-slash");
        ojo.classList.add("fa-eye");
    }
})

// Detección de tecla mayúscula
const control_contrasena = document.getElementById('control_contrasena');
const span = document.createElement('span');
const mayusIcono = document.createElement('i');

span.classList.add('icon', 'is-small', 'is-right');
mayusIcono.classList.add('fas', 'fa-arrow-up');

span.appendChild(mayusIcono);
mayusIcono.style.display = 'none';

control_contrasena.appendChild(span);

mayusIcono.style.marginRight = '50px';

inputContrasena.addEventListener('focus', () => {
    document.addEventListener('keydown', (event) => {
        const mayusOn = event.getModifierState('CapsLock');
        if (mayusOn){
            mayusIcono.style.display = 'inline';
        } else {
            mayusIcono.style.display = 'none';
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
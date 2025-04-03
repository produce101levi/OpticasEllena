// Mostrar contraseña
const inputContrasena = document.getElementById('contrasena');
const mostrar = document.getElementById('mostrar_contrasena')
const ojo = document.getElementById('ojo');

mostrar.addEventListener("click", () => {
    if (inputContrasena.type == "text"){
        inputContrasena.type="password";
        ojo.classList.remove("fa-eye-slash");
        ojo.classList.add("fa-eye");
    } else if (inputContrasena.type="password"){
        inputContrasena.type="text";
        ojo.classList.remove("fa-eye");
        ojo.classList.add("fa-eye-slash");
    }
})
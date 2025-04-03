// Validación instantánea de contraseña
const inputContrasena = document.getElementById("contrasena");
const confirmarContrasena = document.getElementById("confirmar_contrasena");

inputContrasena.addEventListener("input", function() {
    let contrasena = this.value;

    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (regex.test(contrasena)) {
        inputContrasena.classList.remove("is-danger");
        inputContrasena.classList.add("is-success", "has-text-black");
        console.log(regex.test(contrasena))
    } else if (!regex.test(contrasena)){
        inputContrasena.classList.remove("is-success")
        inputContrasena.classList.add("is-danger", "has-text-black");
    }
    
    if (contrasena == ''){
        inputContrasena.classList.remove("is-success", "is-danger")
    }

})

// Mostrar contraseña
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
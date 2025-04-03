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

mostrar.addEventListener("mousedown", () => {
    console.log("Mouse down");
    inputContrasena.type="text";
})

mostrar.addEventListener("mouseup", () => {
    console.log("Mouse up");
    inputContrasena.type="password";
})
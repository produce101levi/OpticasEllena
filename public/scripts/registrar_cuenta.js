// document.getElementById("password").addEventListener("input", function() {
//     let password = this.value;
//     let message = document.getElementById("message");
    
//     const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

//     if (regex.test(password)) {
//         message.style.color = "green";
//         message.innerText = "✅ Strong password!";
//     } else {
//         message.style.color = "red";
//         message.innerText = "❌ Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.";
//     }
// });

const inputContrasena = document.getElementById("contrasena");
const confirmarContrasena = document.getElementById("confirmar_contrasena");

inputContrasena.addEventListener("input", function() {
    let contrasena = this.value;

    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (regex.test(contrasena)) {
        inputContrasena.classList.remove("is-danger")
        inputContrasena.classList.add("is-success")
        console.log(regex.test(contrasena))
    } else {
        inputContrasena.classList.remove("is-success")
        inputContrasena.classList.add("is-danger")
    }

})

confirmarContrasena.addEventListener("input", function() {
    let confirmar = this.value;
    let contrasena = inputContrasena.value;
    
    if (confirmar == contrasena){
        confirmarContrasena.classList.remove("is-danger");
        confirmarContrasena.classList.add("is-success");
    } else {
        confirmarContrasena.classList.remove("is-success");
        confirmarContrasena.classList.add("is-danger");
    }
})


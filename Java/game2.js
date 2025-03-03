function verificar() {
    let palabraClave = "";
    let casillasClave = document.querySelectorAll(".clave");

    casillasClave.forEach(input => {
        palabraClave += input.value.toUpperCase();
    });

    if (palabraClave === "FLORECITA") {  // Cambia "SOL" por la palabra clave correcta
        document.getElementById("mensaje").textContent = "¡Correcto!";
        document.getElementById("mensaje").style.color = "green";
    } else {
        document.getElementById("mensaje").textContent = "Inténtalo de nuevo";
        document.getElementById("mensaje").style.color = "red";
    }
}

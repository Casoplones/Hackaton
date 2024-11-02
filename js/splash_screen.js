window.addEventListener("load", function() {
  setTimeout(function() {
      const splashScreen = document.getElementById("splash-screen");
      splashScreen.classList.add("fade-out"); // Añade la clase de desvanecimiento
      setTimeout(function() {
          window.location.href = "./index_pagina_principal.html";
      }, 1000); // Espera a que termine la animación antes de redirigir
  }, 3000); // Ajusta el tiempo inicial si es necesario
});

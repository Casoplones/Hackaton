window.addEventListener('load', function() {
  const audio = document.getElementById('audio');
  audio.play().catch(error => {
      console.log("El navegador impidió la reproducción automática del audio. Interacción del usuario requerida.");
  });
});

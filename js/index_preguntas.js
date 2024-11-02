let puntos = {
    fantasma: 0,
    vampiro: 0,
    zombie: 0,
    hombreLobo: 0,
    bruja: 0,
    cazadorDeFantasmas: 0,
    momia: 0
};

fetch('./json/preguntas.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al cargar las preguntas');
        }
        return response.json();
    })
    .then(preguntas => {
        console.log(preguntas); 
        mostrarPregunta(preguntas);
    })
    .catch(error => console.error('Error al cargar el archivo JSON:', error));

let preguntaActual = 0;

function mostrarPregunta(preguntas) {
    const questionList = document.getElementById('questionList');
    questionList.innerHTML = ''; 

    // Verifica si hay preguntas disponibles
    if (preguntas.length === 0) {
        console.error('No hay preguntas disponibles');
        return;
    }

    const pregunta = preguntas[preguntaActual];
    const h2 = document.getElementById('preguntaTexto');
    h2.textContent = pregunta.text; 

    // Actualiza el encabezado con el número de la pregunta
    document.getElementById('preguntaNumero').textContent = `Pregunta ${preguntaActual + 1}`; 

    // Agregar respuestas a la lista
    pregunta.respuestas.forEach(respuesta => {
        const li = document.createElement('li');
        li.innerHTML = `<label style="display: flex; justify-content: space-between;">
                            <span>${respuesta.text}</span>
                            <input type="radio" name="respuesta" value="${respuesta.value}">
                        </label>`;
        questionList.appendChild(li);
    });

    // Manejar el botón siguiente
    const nextButton = document.getElementById('nextButton');
    nextButton.onclick = function() {
        const respuestaSeleccionada = document.querySelector('input[name="respuesta"]:checked');
        if (respuestaSeleccionada) {
            // Contar puntos
            puntos[respuestaSeleccionada.value]++;
            preguntaActual++;
            if (preguntaActual < preguntas.length) {
                mostrarPregunta(preguntas);
            } else {
                sessionStorage.setItem('puntos', JSON.stringify(puntos));
                location.href = 'index_personaje.html'; 
            }
        } else {
            mostrarMensaje('Si no respondes, Gosht Rider se enfadará...'); 
        }
    };

    // Cambiar texto del botón en la última pregunta
    if (preguntaActual === preguntas.length - 1) {
        nextButton.textContent = 'TERMINAR';
    } else {
        nextButton.textContent = 'SIGUIENTE';
    }
}


// Función para mostrar mensajes (puedes implementarla según tu necesidad)
function mostrarMensaje(mensaje) {
    const modal = document.getElementById('miModal');
    const mensajeModal = document.getElementById('mensajeModal');
    mensajeModal.textContent = mensaje;
    modal.style.display = 'block'; 
}

// Función para cerrar el modal
function cerrarModal() {
    const modal = document.getElementById('miModal');
    modal.style.display = 'none'; 
}

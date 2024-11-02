fetch('./json/personajes.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al cargar el archivo JSON');
        }
        return response.json();
    })
    .then(personajes => {
        const puntos = JSON.parse(sessionStorage.getItem('puntos')) || {}; 
        let maxPuntos = 0;
        let personajesGanadores = [];

        // Ver que personaje tiene mas puntos
        for (const [personaje, puntaje] of Object.entries(puntos)) {
            if (puntaje > maxPuntos) {
                maxPuntos = puntaje;
                personajesGanadores = [personaje];
            } else if (puntaje === maxPuntos) {
                personajesGanadores.push(personaje);
            }
        }

        document.body.innerHTML = '';

        // Aqui se crea el header con el contenido
        const header = document.createElement('header');
        const headerTitle = document.createElement('h1');
        headerTitle.textContent = 'TU PERSONAJE ES...';
        header.appendChild(headerTitle);
        document.body.appendChild(header);

        // Aqui se muestra los datos si sale un solo personaje o sale un empate con varios
        if (personajesGanadores.length === 1) {
            const personajeSeleccionado = personajes[personajesGanadores[0]];
            const contenedorPersonaje = document.createElement('div');
            contenedorPersonaje.classList.add('contenedor-personaje');

            const nombrePersonaje = document.createElement('h1');
            nombrePersonaje.textContent = personajeSeleccionado.nombre.toUpperCase();
            nombrePersonaje.style.color = 'white';

            const imagenPersonaje = document.createElement('img');
            imagenPersonaje.src = `./imagenes_personajes/${personajesGanadores[0]}.png`;
            imagenPersonaje.alt = personajeSeleccionado.nombre;
            imagenPersonaje.classList.add('imagen-pequena'); 

            // Contenedor para el texto, con fondo naranja
            const contenedorTexto = document.createElement('div');
            contenedorTexto.classList.add('contenedor-texto');
            contenedorTexto.appendChild(nombrePersonaje);

            const textoPersonaje = document.createElement('p');
            textoPersonaje.textContent = personajeSeleccionado.text; 
            textoPersonaje.style.color = 'white'; 
            contenedorTexto.appendChild(textoPersonaje);

            contenedorPersonaje.appendChild(imagenPersonaje);
            contenedorPersonaje.appendChild(contenedorTexto);

            document.body.appendChild(contenedorPersonaje);
        } else {
            
            // Mostrar imágenes de personajes en empate
            const mensajeEmpate = document.createElement('p');
            mensajeEmpate.textContent = 'Vaya parece que eres un mix terrorífico';
            mensajeEmpate.style.color = 'white';
            document.body.appendChild(mensajeEmpate);

            // Crear un contenedor para las imágenes y nombres
            const contenedorImagenes = document.createElement('div');
            contenedorImagenes.classList.add('contenedor-imagenes');

            personajesGanadores.forEach(personaje => {
                const divPersonaje = document.createElement('div');
                divPersonaje.classList.add('personaje-empate');
                
                const img = document.createElement('img');
                img.src = `./imagenes_personajes/${personajes[personaje].imagen}`; 
                img.alt = personajes[personaje].nombre;
                img.classList.add('imagen-empate');

                const nombreEmpate = document.createElement('p');
                nombreEmpate.textContent = personajes[personaje].nombre;
                nombreEmpate.style.color = 'white'; 

                // Agregar imagen y nombre al contenedor del personaje
                divPersonaje.appendChild(img);
                divPersonaje.appendChild(nombreEmpate);

                // Agregar el contenedor del personaje al contenedor de imágenes
                contenedorImagenes.appendChild(divPersonaje);
            });

            // Agregar el contenedor de imágenes al body
            document.body.appendChild(contenedorImagenes); 
        }

        // Evento para el botón de "Volver a jugar"
        const buttonReset = document.createElement('button');
        buttonReset.classList.add('button-reset');
        buttonReset.textContent = 'VOLVER A JUGAR';
        document.body.appendChild(buttonReset);

        // Centrar el botón y agregar espacio
        buttonReset.style.display = 'block';
        buttonReset.style.margin = '30px auto'; 
        buttonReset.addEventListener('click', function() {
            sessionStorage.clear(); 
            window.location.href = 'index_pagina_principal.html'; 
        });
    })
    .catch(error => console.error('Error al cargar los personajes:', error));

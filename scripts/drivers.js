const link = `https://67f91aad094de2fe6ea07a32.mockapi.io/people/project/F1`;
let añadirhtml = document.getElementById("driver-card");

axios.get(link)
.then((response) => {
    let data = response.data[0]; // Obtenemos el primer objeto de la respuesta.
    console.log(data)
    console.log(data.pilotos[0].imagen)
    console.log(data.pilotos.length)
    // Verificamos que 'pilotos' y 'monoplazas' existen.
        for (let i = 0; i < data.pilotos.length; i++) {
            // Añadir cada piloto al HTML.
            // if (data.pilotos[i].photo==""){
                añadirhtml.innerHTML += `
                <div class="drivers-container">
                    <div class="driver-card"> 
                        <img src="https://www.formula1.com/content/dam/fom-website/teams/2025/red-bull-racing.jpg" class="driver-background" alt="">
                        
                        <div class="driver-info">
                            <div id="driver-role" class="driver-role">${data.pilotos[i].rol}</div>
                            <div id="driver-name" class="driver-name">${data.pilotos[i].nombre}</div>
                            <div class="driver-number">
                                <span class="team-dot"></span>
                                <span id="team" class="team-text">${data.pilotos[i].escuderia || 'Desconocida'}</span>
                            </div>
                        </div>

                        <img src="${data.pilotos[i].photo}" class="driver-photo" alt="${data.pilotos[i].nombre}">
                    </div>
                </div>
            `
        }
})
.catch((error) => {
    console.error("Hubo un error al hacer la solicitud:", error);
});
let link = `https://67f91aad094de2fe6ea07a32.mockapi.io/people/project/F1`;
let añadirhtml = document.getElementById("teams-grid");

// Referencias al modal
const modal = document.getElementById("myModal");
const modalContent = document.getElementById("cr");
const spanClose = document.getElementsByClassName("close")[0];
const modalImage = document.getElementById("img");
const modalTitle = modalContent.querySelector("h2");
const modalText = modalContent.querySelector("p");

axios.get(link)
    .then((response) => {
        const ruta = response.data[0];
        const equipos = ruta.equipos;
        const monoplazas = ruta.monoplazas;

        for (let i = 0; i < equipos.length; i++) {
            const equipo = equipos[i];
            const monoplaza = monoplazas[i];

            const card = document.createElement("div");
            card.classList.add("team-card");

            card.innerHTML = `
                <img src="${equipo.logo}" alt="Logo ${equipo.nombre}" class="team-logo">
                <img src="${monoplaza.imagen}" alt="Monoplaza de ${equipo.nombre}" class="team-background">
            `;

            // Evento para mostrar el modal con info personalizada
            card.addEventListener("click", () => {
                modal.style.display = "block";
                modalTitle.innerText = equipo.nombre;
                modalImage.src = equipo.logo;
                modalText.innerText = `
                Motor: 
                
                ${equipo.motor}
                
                
                Pais: 
                
                ${equipo.pais}
                
                `;
            });

            añadirhtml.appendChild(card);
        }
    })
    .catch((error) => {
        console.error("Error al cargar equipos:", error);
    });

// Cerrar modal con la X
spanClose.onclick = function () {
    modal.style.display = "none";
}

// Cerrar modal haciendo clic fuera del contenido
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

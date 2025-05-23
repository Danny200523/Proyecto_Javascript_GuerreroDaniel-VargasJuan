const link = `https://67f91aad094de2fe6ea07a32.mockapi.io/people/project/F1`;
let añadirhtml = document.getElementById("driver-card");

const modal = document.getElementById("myModal");
const modalContent = document.getElementById("cr");
const spanClose = document.getElementsByClassName("close")[0];
const modalImage = document.getElementById("img");
const modalTitle = modalContent.querySelector("h2");
const modalText = modalContent.querySelector("p");

axios.get(link)
    .then((response) => {
        let data = response.data[0];

        for (let i = 0; i < data.pilotos.length; i++) {
            const piloto = data.pilotos[i];

            const container = document.createElement("div");
            container.classList.add("drivers-container");

            container.innerHTML = `
                <div class="driver-card">
                    <img src="https://www.formula1.com/content/dam/fom-website/teams/2025/red-bull-racing.jpg" class="driver-background" alt="">
                    
                    <div class="driver-info">
                        <div class="driver-role">${piloto.rol}</div>
                        <div class="driver-name">${piloto.nombre}</div>
                        <div class="driver-number">
                            <span class="team-dot"></span>
                            <span class="team-text">${piloto.escuderia || 'Desconocida'}</span>
                        </div>
                    </div>

                    <img src="${piloto.photo}" class="driver-photo" alt="${piloto.nombre}">
                </div>
            `;

            // Activar modal al hacer clic en la tarjeta del piloto
            container.querySelector(".driver-card").addEventListener("click", () => {
                modal.style.display = "block";
                modalTitle.innerText = piloto.nombre;
                modalImage.src = piloto.photo;
                modalText.innerText = `
                Rol: 
                
                ${piloto.rol || 'Desconocida'} 
                

                Escudería: 
                
                ${piloto.escuderia || 'Desconocida'}
                

                nacionalidad:

                ${piloto.nacionalidad || 'Desconocida'}
                `;
            });

            añadirhtml.appendChild(container);
        }
    })
    .catch((error) => {
        console.error("Hubo un error al hacer la solicitud:", error);
    });

// Cierra el modal al hacer clic en la "X"
spanClose.onclick = function () {
    modal.style.display = "none";
}

// Cierra el modal si se hace clic fuera de él
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

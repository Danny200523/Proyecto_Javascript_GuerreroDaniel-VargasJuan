let link = `https://67f91aad094de2fe6ea07a32.mockapi.io/people/project/F1`;
let cars = document.getElementById("cars-grid");
const modal = document.getElementById("myModal");
const modalContent = document.getElementById("cr");
const spanClose = document.getElementsByClassName("close")[0];

function mostrar() {
    axios.get(link)
        .then((response) => {
            let ruta = response.data[0];
            let añadirhtml = document.getElementById("cars-grid");

            for (let i = 0; i < ruta.monoplazas.length; i++) {
                let monoplaza = ruta.monoplazas[i];

                let carDiv = document.createElement("div");
                carDiv.classList.add("car-card");

                carDiv.innerHTML = `
                    <div class="car-team">
                        <h3>${monoplaza["modelo"]}</h3>
                    </div>
                    <div class="car-image">
                        <div class="car-info">
                            <div class="sketchfab-embed-wrapper">
                                <iframe title="${monoplaza["modelo"]}" frameborder="0" allowfullscreen mozallowfullscreen="true" webkitallowfullscreen="true" allow="autoplay; fullscreen; xr-spatial-tracking" 
                                    src="${monoplaza["model"]}?autostart=1&transparent=1&ui_hint=0"></iframe>
                            </div>
                        </div>
                    </div>
                    <button class="ver-btn">Ver +</button>
                `;

                // Agrega evento para abrir el modal
                carDiv.querySelector(".ver-btn").addEventListener("click", () => {
                    modal.style.display = "block";
                    modalContent.querySelector("h2").innerText = monoplaza["modelo"];
                    modalContent.querySelector("img").src= monoplaza.imagen
                    modalContent.querySelector("p").innerText = `
                    Motor:
                    
                    ${monoplaza.motor}.
                    
                    Velocidad Maxima:

                    ${monoplaza.velocidad_maxima_kmh} km/h.

                    aceleracion 0 -> 100:

                    ${monoplaza.aceleracion_0_100}s.

                    equipo:

                    ${monoplaza.equipo}.
                    `;
                });

                añadirhtml.appendChild(carDiv);
            }
        });
}

spanClose.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

window.onload = () => {
    mostrar();
}

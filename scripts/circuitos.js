const url = `https://67f91aad094de2fe6ea07a32.mockapi.io/people/project/F1`;
let edit = document.getElementById('card')
let modal = document.getElementById("myModal");
let btn = document.getElementById("card");
let span = document.getElementsByClassName("close")[0];
const mod = document.getElementById('cr');


fetch(url)
.then(Response=>Response.json())
.then(data=>{
    let cir = data[0].circuitos
    for (i=0;i<data[0].circuitos.length;i++){
        let circuito = cir[i];
        let tarjeta = document.createElement("div");
        tarjeta.classList.add("circuit-card");
        tarjeta.innerHTML = `
          <div class="circuit-image">
            <img src="${circuito.photo}" alt="${circuito.nombre}" />
          </div>
          <div class="circuit-name">${circuito.nombre}</div>
        `;
  
        tarjeta.onclick = function () {
          modal.style.display = "block";
          mod.innerHTML = `
            <span class="close" onclick="cerrarModal()">&times;</span>
            <h2>${circuito.nombre}</h2>
            <br/>
            <img src="${circuito.imagen}" alt="${circuito.nombre}" style="width: 100%; border-radius: 12px; margin-bottom: 20px;">
            <br/>
            <h3>Pais: </h3>
            <br/>
            <p>${circuito.pais}</p>
            <br/>
            <h3>Longitud en KM:</h3>
            <br/>
            <p>${circuito.longitud_km} Km</p>
            <br/>
            <h3>Vueltas: </h3>
            <br/>
            <p>${circuito.vueltas}</p>
            <br/>
            <h3>Descripcion:</h3>
            <br/>
            <p>${circuito.descripcion || "Descripción no disponible."}</p>
            <br/>
            <br/>
            <h3>Record de Vuelta</h3>
            <br/>
            <h4>Piloto:</h4>
            <br/>
            <p>${circuito.record_vuelta.piloto}</p>
            <br/>
            <h4>Tiempo:</h4>
            <br/>
            <p>${circuito.record_vuelta.tiempo} min</p>
            <br/>
            <h4>Año:</h4>
            <br/>
            <p>${circuito.record_vuelta.año}</p>
          `;
        };
  
        edit.appendChild(tarjeta);

    }
})


span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


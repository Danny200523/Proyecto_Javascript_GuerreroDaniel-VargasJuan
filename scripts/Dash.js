const url = `https://67f91aad094de2fe6ea07a32.mockapi.io/people/project/F1`;
const myHeader = new Headers({
  'Content-Type': 'application/json'
});
const editpit = document.getElementById('p1');
const editpit2 = document.getElementById('p2');
const editpit3 = document.getElementById('p3');
const editcircu = document.getElementById('c1')
const editcircu2 = document.getElementById('c2')

async function renderPit(){
  await fetch(url)
  .then(Response=>Response.json())
  .then(data=>{
    console.log(data)
    editpit.innerHTML = `
              <img src="${data[0].pilotos[6].photo}" alt="Oscar Piastri" />
              <div class="piloto-info">
                <span class="nombre-small">${data[0].pilotos[6].nombre.substring(0,5)}</span>
                <span class="apellido">${data[0].pilotos[6].nombre.substring(5,15)}</span>
              </div>
              `;
    editpit2.innerHTML = `
    <img src="${data[0].pilotos[7].photo}" alt="Oscar Piastri" />
    <div class="piloto-info">
      <span class="nombre-small">${data[0].pilotos[7].nombre.substring(0,5)}</span>
      <span class="apellido ">${data[0].pilotos[7].nombre.substring(5,15)}</span>
    </div>
    `;
    editpit3.innerHTML = `
    <img src="${data[0].pilotos[0].photo}" alt="Oscar Piastri" />
    <div class="piloto-info">
      <span class="nombre-small">${data[0].pilotos[0].nombre.substring(0,4)}</span>
      <span class="apellido ">${data[0].pilotos[0].nombre.substring(4,15)}</span>
    </div>
    `;
    editcircu.innerHTML = `
    <h3>${data[0].circuitos[0].nombre}</h3>
          <img src="${data[0].circuitos[0].imagen}" alt="Mónaco" class="track-layout" />
          <div class="circuit-info">
            <p>Longitud km: ${data[0].circuitos[0].longitud_km}</p>
            <p>Vueltas: ${data[0].circuitos[0].vueltas}</p>
            <p>Record vuelta: ${data[0].circuitos[0].record_vuelta.tiempo}</p>
            <p>Piloto: ${data[0].circuitos[0].record_vuelta.piloto}</p>
            <p>Año: ${data[0].circuitos[0].record_vuelta.año}</p>
          </div>
    `;
    editcircu2.innerHTML = `
    <h3>${data[0].circuitos[1].nombre}</h3>
          <img src="${data[0].circuitos[1].imagen}" alt="Mónaco" class="track-layout" />
          <div class="circuit-info">
            <p>Longitud km: ${data[0].circuitos[1].longitud_km}</p>
            <p>Vueltas: ${data[0].circuitos[1].vueltas}</p>
            <p>Record vuelta: ${data[0].circuitos[1].record_vuelta.tiempo}</p>
            <p>Piloto: ${data[0].circuitos[1].record_vuelta.piloto}</p>
            <p>Año: ${data[0].circuitos[1].record_vuelta.año}</p>
          </div>
    `;
  })
}

document.addEventListener('DOMContentLoaded',renderPit)
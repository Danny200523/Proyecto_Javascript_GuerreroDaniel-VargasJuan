const url = `https://67f91aad094de2fe6ea07a32.mockapi.io/people/project/F1`;
const myHeader = new Headers({
  'Content-Type': 'application/json'
});
const editpit = document.getElementById('pdest');

function renderPit(){
  fetch(url)
  .then(Response=>Response.json())
  .then(data=>{
    console.log(data)
    editpit.innerHTML = `
              <img src="${data[0].pilotos[6].photo}" alt="Oscar Piastri" />
              <div class="piloto-info">
                <span class="nombre-small">${data[0].pilotos[6].nombre}</span>
              </div>
              `;
    
  })
}

document.addEventListener('DOMContentLoaded',renderPit)
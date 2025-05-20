const url = `https://67f91aad094de2fe6ea07a32.mockapi.io/people/project/F1`;
let edit = document.getElementById('card')

async function rendercir(){
    await fetch(url)
    .then(Response=>Response.json())
    .then(data=>{
        let cir = data[0].circuitos
        for (i=0;i<data[0].circuitos.length;i++){
            edit.innerHTML += `
            <div class="circuit-card">
                <div class="circuit-image">
                    <img src="${cir[i].photo}" alt="Circuito de Mónaco" />
                </div>
                <div class="circuit-name">${cir[i].nombre}</div>
            </div>
            `
        }
    })
}

document.addEventListener('DOMContentLoaded',rendercir)
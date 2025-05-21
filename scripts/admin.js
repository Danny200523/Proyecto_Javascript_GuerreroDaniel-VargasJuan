// Script para navegación suave de la pagina
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
        });
    });
});
//////////////////////////////////////////////////////////////////
const url = `https://67f91aad094de2fe6ea07a32.mockapi.io/people/project/F1`;
const editcircuit = document.getElementById('table-circuit')
const editescuderia = document.getElementById('table-escuderia')
const editpiloto = document.getElementById('table-pilotos')
const editmonoplaza = document.getElementById('table-monoplaza')

async function rendercircuit(){
    await fetch(url)
    .then(response=>response.json())
    .then(data=>{
        console.log(data)
        let circuitos = data[0].circuitos
        let html = ``;
        for (i=0;i<circuitos.length;i++){
            let circuito = circuitos[i]
            html += `
            <tr>
                <td></td>
                <td>${circuito.id}</td>
                <td>${circuito.nombre}</td>
                <td>${circuito.pais}</td>
                <td>${circuito.longitud_km} km</td>
                <td>${circuito.vueltas}</td>
                <td>${circuito.record_vuelta.tiempo} (${circuito.record_vuelta.año})</td>
                <td>
                    <button class="action-btn view-btn">Ver</button>
                    <button class="action-btn edit-btn">Editar</button>
                    <button class="action-btn delete-btn">Eliminar</button>
                </td>
            </tr>
            `
        }
    editcircuit.innerHTML = html    
})}

async function renderEscuderias() {
    await fetch(url)
    .then(response=>response.json())
    .then(data=>{
        console.log(data)
        let escuderias = data[0].equipos
        let html = ``;
        for (i=0;i<escuderias.length;i++){
            let escuderia = escuderias[i]
            html += `
            <tr>
                <td></td>
                <td>${escuderia.id}</td>
                <td><img src="${escuderia.logo}" alt="${escuderia.nombre}" class="img-thumbnail"></td>
                <td>${escuderia.nombre}</td>
                <td>${escuderia.pais}</td>
                <td>${escuderia.motor}</td>
                <td></td>
                <td>
                    <button class="action-btn view-btn">Ver</button>
                    <button class="action-btn edit-btn">Editar</button>
                    <button class="action-btn delete-btn">Eliminar</button>
                </td>
            </tr>
            `
        }
    editescuderia.innerHTML = html
})}

async function renderPilotos() {
    await fetch(url)
    .then(response=>response.json())
    .then(data=>{
        console.log(data)
        let pilotos = data[0].pilotos
        let html = ``;
        for (i=0;i<pilotos.length;i++){
            let piloto = pilotos[i]
            html += `
            <tr>
                <td></td>
                <td>${piloto.id}</td>
                <td><img src="${piloto.photo}" alt="${piloto.nombre}" class="img-thumbnail"></td>
                <td>${piloto.nombre}</td>
                <td>${piloto.escuderia}</td>
                <td>${piloto.nacionalidad}</td>
                <td>${piloto.rol}</td>
                <td>
                    <button class="action-btn view-btn">Ver</button>
                    <button class="action-btn edit-btn">Editar</button>
                    <button class="action-btn delete-btn">Eliminar</button>
                </td>
            </tr>
            `
        }
    editpiloto.innerHTML = html
})}

async function renderMonoplaza() {
    await fetch(url)
    .then(response=>response.json())
    .then(data=>{
        console.log(data)
        let monoplazas = data[0].monoplazas
        let html = ``;
        for (i=0;i<monoplazas.length;i++){
            let monoplaza = monoplazas[i]
            html += `
            <tr>
                <td></td>
                <td>${monoplaza.id}</td>
                <td><img src="${monoplaza.imagen}" alt="${monoplaza.nombre}" class="img-thumbnail"></td>
                <td>${monoplaza.modelo}</td>
                <td>${monoplaza.equipo}</td>
                <td></td>
                <td>${monoplaza.motor}</td>
                <td>${monoplaza.velocidad_maxima_kmh} Km</td>
                <td>
                    <button class="action-btn view-btn">Ver</button>
                    <button class="action-btn edit-btn">Editar</button>
                    <button class="action-btn delete-btn">Eliminar</button>
                </td>
            </tr>
            `
        }
    editmonoplaza.innerHTML = html
})}

document.addEventListener('DOMContentLoaded',()=>{
    rendercircuit();
    renderEscuderias();
    renderPilotos();
    renderMonoplaza();
})
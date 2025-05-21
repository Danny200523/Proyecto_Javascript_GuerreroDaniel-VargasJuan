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
//////////////////          Renderizar             ///////////////
//////////////////////////////////////////////////////////////////

const url = `https://67f91aad094de2fe6ea07a32.mockapi.io/people/project/F1`;
const editcircuit = document.getElementById('table-circuit')
const editescuderia = document.getElementById('table-escuderia')
const editpiloto = document.getElementById('table-pilotos')
const editmonoplaza = document.getElementById('table-monoplaza')

async function renderAll(){
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
                    <button id="" class="action-btn edit-btn">Editar</button>
                    <button id="" class="action-btn delete-btn">Eliminar</button>
                </td>
            </tr>
            `
        }
    editcircuit.innerHTML = html
    let escuderias = data[0].equipos
        let html1 = ``;
        for (i=0;i<escuderias.length;i++){
            let escuderia = escuderias[i]
            html1 += `
            <tr>
                <td></td>
                <td>${escuderia.id}</td>
                <td><img src="${escuderia.logo}" alt="${escuderia.nombre}" class="img-thumbnail"></td>
                <td>${escuderia.nombre}</td>
                <td>${escuderia.pais}</td>
                <td>${escuderia.motor}</td>
                <td></td>
                <td>
                    <button id="" class="action-btn edit-btn">Editar</button>
                    <button id="" class="action-btn delete-btn">Eliminar</button>
                </td>
            </tr>
            `
        }
    editescuderia.innerHTML = html1

    let pilotos = data[0].pilotos
        let html2 = ``;
        for (i=0;i<pilotos.length;i++){
            let piloto = pilotos[i]
            html2 += `
            <tr>
                <td></td>
                <td>${piloto.id}</td>
                <td><img src="${piloto.photo}" alt="${piloto.nombre}" class="img-thumbnail"></td>
                <td>${piloto.nombre}</td>
                <td>${piloto.escuderia}</td>
                <td>${piloto.nacionalidad}</td>
                <td>${piloto.rol}</td>
                <td>
                    <button id="" class="action-btn edit-btn">Editar</button>
                    <button id="" class="action-btn delete-btn">Eliminar</button>
                </td>
            </tr>
            `
        }
    editpiloto.innerHTML = html2

    let monoplazas = data[0].monoplazas
        let html3 = ``;
        for (i=0;i<monoplazas.length;i++){
            let monoplaza = monoplazas[i]
            html3 += `
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
                    <button id="" class="action-btn edit-btn">Editar</button>
                    <button id="" class="action-btn delete-btn">Eliminar</button>
                </td>
            </tr>
            `
        }
    editmonoplaza.innerHTML = html3
})}

document.addEventListener('DOMContentLoaded',()=>{
    renderAll();
})
/////////////////////////////////////////////////////////////////////////////////////////
/////////////                    Create CRUD                         ////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

function createCircuit(){
    const modal = document.getElementById('modalCircuito');
    const btnAbrirModal = document.getElementById('btn circuit create');
    const btnCancelar = document.getElementById('btnCancelar');
    const span = document.getElementsByClassName('close')[0];
    const formCircuito = document.getElementById('formCircuito');
    const btnEditar = document.getElementsByClassName('btn-editar');

    btnAbrirModal.onclick = function() {
        document.getElementById('modalTitle').textContent = 'Crear Nuevo Circuito';
        formCircuito.reset();
        modal.style.display = 'block';
    };

    span.onclick = function() {
        modal.style.display = 'none';
    };

    btnCancelar.onclick = function() {
        modal.style.display = 'none';
    };

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };

    formCircuito.onsubmit = function(event) {
        event.preventDefault();

        // Aquí iría la lógica para guardar los datos
        const nombre = document.getElementById('nombre').value;
        const pais = document.getElementById('pais').value;
        const longitud = document.getElementById('longitud').value;
        const vueltas = document.getElementById('vueltas').value;
        const record = document.getElementById('record').value;

        console.log('Datos del circuito:', { nombre, pais, longitud, vueltas, record });

        modal.style.display = 'none';

        alert('Circuito guardado correctamente');
    };
};

function createTeam(){
    console.log("Create Team")
};

function createPilot(){
    console.log("Create Pilot")
};

function createMonoplaza(){
    console.log("Create Monoplaza")
};
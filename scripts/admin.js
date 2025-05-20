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
const editcircuit = document.querySelector('tbody')

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
                <td><input type="checkbox"></td>
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



document.addEventListener('DOMContentLoaded',rendercircuit)
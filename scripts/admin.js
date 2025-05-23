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
                    <button id="btnupdatecircuit" onclick="btnupdatecircuitos()" data-id="${i}" class="action-btn edit-btn">Editar</button>
                    <button id="btndeletecircuit" onclick="btndeletecircuitos()" data-id="${i}" class="action-btn delete-btn">Eliminar</button>
                </td>
            </tr>
            `;
            document.querySelectorAll('.action-btn delete-btn').forEach(button=>{
            button.addEventListener('click',btndeletecircuitos);
          })
            document.querySelectorAll('.action-btn edit-btn').forEach(button=>{
            button.addEventListener('click',btnupdatecircuitos);
          })
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
                    <button id="btnupdateteam" onclick="btnupdateescuderias()" data-id="${i}" class="action-btn edit-btn">Editar</button>
                    <button id="btndeleteteam" onclick="btndeleteescuderias()" data-id="${i}" class="action-btn delete-btn">Eliminar</button>
                </td>
            </tr>
            `;
            document.querySelectorAll('.action-btn delete-btn').forEach(button=>{
              button.addEventListener('click',btndeleteescuderias);
            })
              document.querySelectorAll('.action-btn edit-btn').forEach(button=>{
              button.addEventListener('click',btnupdateescuderias);
            })
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
                    <button id="btnupdatepilot" onclick="btnupdatepilotos()" data-id="${i}" class="action-btn edit-btn">Editar</button>
                    <button id="btndeletepilot" onclick="btndeletepilotos()" data-id="${i}" class="action-btn delete-btn">Eliminar</button>
                </td>
            </tr>
            `;
            document.querySelectorAll('.action-btn delete-btn').forEach(button=>{
              button.addEventListener('click',btndeletepilotos);
            })
              document.querySelectorAll('.action-btn edit-btn').forEach(button=>{
              button.addEventListener('click',btnupdatepilotos);
            })
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
                    <button id="btnupdatemonoplaz" onclick="btnupdatemonoplazas()" data-id="${i}" class="action-btn edit-btn">Editar</button>
                    <button id="btndeletemonoplaz" onclick="btndeletemonoplazas()" data-id="${i}" class="action-btn delete-btn">Eliminar</button>
                </td>
            </tr>
            `;
            document.querySelectorAll('.action-btn delete-btn').forEach(button=>{
              button.addEventListener('click',btndeletemonoplazas);
            })
              document.querySelectorAll('.action-btn edit-btn').forEach(button=>{
              button.addEventListener('click',btnupdatemonoplazas);
            })
        }
    editmonoplaza.innerHTML = html3
})}

document.addEventListener('DOMContentLoaded',()=>{
    renderAll();
})
/////////////////////////////////////////////////////////////////////////////////////////
/////////////                    Create CRUD                         ////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

const modal = document.getElementById('modalCircuito');
const btnAbrirModalCIRCUIT = document.getElementById('btn circuit create');
const btnAbrirModalPilot = document.getElementById('btn pilot create');
const btnAbrirModalMonoplaza = document.getElementById('btn monoplaza create');
const btnAbrirModalEscuderia = document.getElementById('btn teams create');
const btnCancelar = document.getElementById('btnCancelar');
const span = document.getElementsByClassName('close')[0];
const formCircuito = document.getElementById('form');

btnAbrirModalCIRCUIT.onclick = function() {
    document.getElementById('modalTitle').textContent = 'Crear Nuevo Circuito';
    formCircuito.reset();
    modal.style.display = 'block';
    formCircuito.innerHTML = ``;
    formCircuito.innerHTML = `
        <div class="form-group">
            <label for="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre" required>
        </div>
        <div class="form-group">
            <label for="nombre">Link de la Foto:</label>
            <input type="text" id="photo" name="nombre" required>
        </div>
        <div class="form-group">
            <label for="pais">País:</label>
            <input type="text" id="pais" name="pais" required>
        </div>
        <div class="form-group">
            <label for="longitud">Longitud (km):</label>
            <input type="number" id="longitud_km" name="longitud" step="0.01" required>
        </div>
        <div class="form-group">
            <label for="vueltas">Vueltas:</label>
            <input type="number" id="vueltas" name="vueltas" required>
        </div>
        <div class="form-group">
            <label for="vueltas">Descripcion:</label>
            <input type="text" id="descripcion" name="vueltas" required>
        </div>
        <div class="form-group">
            <label for="record">Récord vuelta:</label>
            <label for="record">Tiempo:</label>
            <input type="text" id="tiempo" name="record" placeholder="1:XX.XXX">
        </div>
        <div class="form-group">
            <label for="record">Año:</label>
            <input type="text" id="ano" name="record" placeholder="Año">
        </div>
        <div class="form-group">
            <label for="record">Piloto:</label>
            <input type="text" id="piloto" name="record" placeholder="Piloto">
        </div>
        <div class="modal-footer">
            <button type="button" class="btn-cancelar" id="btnCancelar">Cancelar</button>
            <button type="submit" class="btn-guardar">Guardar</button>
        </div>
            `;
    const btnCancelar = document.getElementById('btnCancelar');
    const span = document.getElementsByClassName('close')[0];
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

        const nombre = document.getElementById('nombre').value;
        const photo = document.getElementById('photo')
        const pais = document.getElementById('pais').value;
        const longitud = document.getElementById('longitud_km').value;
        const vueltas = document.getElementById('vueltas').value;
        const descrip = document.getElementById('descripcion')
        const tiempor = document.getElementById('tiempo').value;
        const añor = document.getElementById('ano').value;
        const pil = document.getElementById('piloto').value;

        fetch(url)
        .then(response=>response.json())
        .then(data=>{
            let neew = {
            "id":(data[0].circuitos.length)+1,
            "nombre":nombre,
            "photo":photo,
            "pais":pais,
            "longitud_km":longitud,
            "vueltas":vueltas,
            "descripcion":descrip,
            "record_vuelta":{
                "tiempo":tiempor,
                "piloto":pil,
                "año":añor
            }
        };
        let nuv = data[0]
        nuv.circuitos.push(neew);

        fetch(`${url}/1`,{
            method:"PUT",
            headers: {
                'Content-Type': 'application/json' // Tell server the data is JSON
            },
            body:JSON.stringify(nuv)
        })
        })

        console.log('Datos del circuito:', { nombre,photo, pais, longitud, vueltas,descrip, tiempor,añor,pil });
        
        
        modal.style.display = 'none';

        alert('Circuito guardado correctamente');
    };
}

btnAbrirModalPilot.onclick = function() {
    document.getElementById('modalTitle').textContent = 'Crear Nuevo Piloto';
    formCircuito.reset();
    modal.style.display = 'block';
    formCircuito.innerHTML = ``;

    formCircuito.innerHTML = `
        <div class="form-group">
            <label for="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre" required>
        </div>
        <div class="form-group">
            <label for="nombre">Link de la Foto:</label>
            <input type="text" id="nombre" name="nombre" required>
        </div>
        <div class="form-group">
            <label for="pais">Rol:</label>
            <input type="text" id="rol" name="pais" required>
        </div>
        <div class="form-group">
            <label for="longitud">Equipo id:</label>
            <input type="number" id="equip" name="longitud" step="0.01" required>
        </div>
        <div class="form-group">
            <label for="vueltas">Nacionalidad:</label>
            <input type="number" id="nacho" name="vueltas" required>
        </div>
        <div class="form-group">
            <label for="vueltas">Escuderia:</label>
            <input type="number" id="escu" name="vueltas" required>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn-cancelar" id="btnCancelar">Cancelar</button>
            <button type="submit" class="btn-guardar">Guardar</button>
        </div>
            `;


    const btnCancelar = document.getElementById('btnCancelar');
    const span = document.getElementsByClassName('close')[0];
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

        const nombre = document.getElementById('nombre').value;
        const photo = document.getElementById('photo')
        const rol = document.getElementById('rol').value;
        const equipoid = document.getElementById('equip').value;
        const nacionalidad = document.getElementById('nacho').value;
        const escuderia = document.getElementById('escu').value;

        fetch(url)
        .then(response=>response.json())
        .then(data=>{
            let neew = {
            "id":(data[0].pilotos.length)+1,
            "nombre":nombre,
            "photo":photo,
            "rol":rol,
            "equipo_id":equipoid,
            "nacionalidad":nacionalidad,
            "escuderia":escuderia
        };
        let nuv = data[0]
        nuv.pilotos.push(neew);

        fetch(`${url}/1`,{
            method:"PUT",
            headers: {
                'Content-Type': 'application/json' // Tell server the data is JSON
            },
            body:JSON.stringify(nuv)
        })
        })

        console.log('Datos del circuito:', { nombre,photo, rol, equipoid, nacionalidad,escuderia}); 
        
        
        modal.style.display = 'none';

        alert('Circuito guardado correctamente');
    };
};

btnAbrirModalMonoplaza.onclick = function() {
    document.getElementById('modalTitle').textContent = 'Crear Nuevo Monoplaza';
    formCircuito.reset();
    modal.style.display = 'block';
    formCircuito.innerHTML = ``;

    formCircuito.innerHTML = `
    <div class="container">
  <div class="section">
    <h2 class="section-title">Registro de Vehículo de Competición</h2>
    
    <form id="vehicleForm">
      <!-- Información básica -->
      <div class="vehicle-form-section">
        <h3 class="vehicle-form-title">Información Básica</h3>
        <div class="vehicle-form-row">
          <div class="vehicle-form-group">
            <label for="equipo" class="vehicle-required">Equipo</label>
            <input type="text" id="equipo" name="equipo" required>
            <div class="vehicle-invalid-feedback">Por favor ingrese el nombre del equipo</div>
          </div>
          <div class="vehicle-form-group">
            <label for="modelo" class="vehicle-required">Modelo</label>
            <input type="text" id="modelo" name="modelo" required>
            <div class="vehicle-invalid-feedback">Por favor ingrese el modelo del vehículo</div>
          </div>
        </div>
        
        <div class="vehicle-form-row">
          <div class="vehicle-form-group">
            <label for="motor" class="vehicle-required">Motor</label>
            <input type="text" id="motor" name="motor" required>
            <div class="vehicle-invalid-feedback">Por favor ingrese los detalles del motor</div>
          </div>
        </div>
        
        <div class="vehicle-form-row">
          <div class="vehicle-form-group">
            <label for="model" class="vehicle-required">Link 3D del Modelo</label>
            <input type="url" id="model" name="model" placeholder="https://example.com/model" required>
            <div class="vehicle-help-text">Ingrese la URL del modelo 3D del vehículo</div>
            <div class="vehicle-invalid-feedback">Por favor ingrese una URL válida</div>
          </div>
          <div class="vehicle-form-group">
            <label for="imagen" class="vehicle-required">Imagen del Auto (URL)</label>
            <input type="url" id="imagen" name="imagen" placeholder="https://example.com/image.jpg" required>
            <div class="vehicle-invalid-feedback">Por favor ingrese una URL válida para la imagen</div>
          </div>
        </div>
      </div>
      
      <!-- Especificaciones técnicas -->
      <div class="vehicle-form-section">
        <h3 class="vehicle-form-title">Especificaciones Técnicas</h3>
        <div class="vehicle-form-row">
          <div class="vehicle-form-group">
            <label for="velocidad" class="vehicle-required">Velocidad Máxima (km/h)</label>
            <input type="number" id="velocidad" name="velocidad_maxima_kmh" min="0" max="500" required>
            <div class="vehicle-invalid-feedback">Por favor ingrese un valor válido</div>
          </div>
          <div class="vehicle-form-group">
            <label for="aceleracion" class="vehicle-required">Aceleración 0-100 km/h (s)</label>
            <input type="number" step="0.1" id="aceleracion" name="aceleracion_0_100" min="0" max="60" required>
            <div class="vehicle-invalid-feedback">Por favor ingrese un valor válido</div>
          </div>
        </div>
        
        <div class="vehicle-form-group">
          <label for="pilotos" class="vehicle-required">Pilotos (IDs separados por coma)</label>
          <input type="text" id="pilotos" name="piloto" placeholder="Ej: 1,2,3" required>
          <div class="vehicle-help-text">Ingrese los IDs de los pilotos asignados a este vehículo, separados por comas</div>
          <div class="vehicle-invalid-feedback">Por favor ingrese al menos un ID de piloto</div>
        </div>
      </div>
      
      <!-- Rendimiento - Conducción Normal -->
      <div class="vehicle-form-section">
  <h3 class="vehicle-form-title" style="color: #e10600; text-transform: uppercase;">RENDIMIENTO - CONDUCCIÓN NORMAL</h3>
  
  <div class="vehicle-form-group">
    <label for="normal_velocidad" class="vehicle-required">Velocidad Promedio (km/h)</label>
    <input type="number" id="normal_velocidad" name="normal_velocidad" min="0" required>
    <div class="vehicle-help-text" style="color: #e10600;">Por favor ingrese un valor válido</div>
  </div>
  
  <div style="margin-top: 20px;">
    <h4 style="color: #ddd; margin-bottom: 15px;">Rendimiento según condiciones climáticas</h4>
    
    <!-- Encabezados de columnas -->
    <div style="display: grid; grid-template-columns: 200px 1fr 1fr 1fr; gap: 10px; margin-bottom: 10px;">
      <div></div>
      <div style="text-align: center; font-weight: bold; color: #e10600;">Seco</div>
      <div style="text-align: center; font-weight: bold; color: #e10600;">Lluvioso</div>
      <div style="text-align: center; font-weight: bold; color: #e10600;">Extremo</div>
    </div>
    
    <!-- Consumo de combustible -->
    <div style="display: grid; grid-template-columns: 200px 1fr 1fr 1fr; gap: 10px; margin-bottom: 20px; align-items: center;">
      <div style="font-weight: bold; color: #ddd;">
        Consumo de Combustible (L/100km)
      </div>
      <div>
        <input type="number" step="0.1" name="normal_comb_seco" min="0" style="width: 100%; padding: 8px; background-color: #333; border: 1px solid #444; color: white; border-radius: 3px;" required>
      </div>
      <div>
        <input type="number" step="0.1" name="normal_comb_lluvia" min="0" style="width: 100%; padding: 8px; background-color: #333; border: 1px solid #444; color: white; border-radius: 3px;" required>
      </div>
      <div>
        <input type="number" step="0.1" name="normal_comb_extremo" min="0" style="width: 100%; padding: 8px; background-color: #333; border: 1px solid #444; color: white; border-radius: 3px;" required>
      </div>
    </div>
    
    <!-- Desgaste de neumáticos -->
    <div style="display: grid; grid-template-columns: 200px 1fr 1fr 1fr; gap: 10px; align-items: center;">
      <div style="font-weight: bold; color: #ddd;">
        Desgaste Neumáticos (%/100km)
      </div>
      <div>
        <input type="number" step="0.1" name="normal_neum_seco" min="0" style="width: 100%; padding: 8px; background-color: #333; border: 1px solid #444; color: white; border-radius: 3px;" required>
      </div>
      <div>
        <input type="number" step="0.1" name="normal_neum_lluvia" min="0" style="width: 100%; padding: 8px; background-color: #333; border: 1px solid #444; color: white; border-radius: 3px;" required>
      </div>
      <div>
        <input type="number" step="0.1" name="normal_neum_extremo" min="0" style="width: 100%; padding: 8px; background-color: #333; border: 1px solid #444; color: white; border-radius: 3px;" required>
      </div>
    </div>
  </div>
</div>
      
      <!-- Rendimiento - Conducción Agresiva -->
      <div class="vehicle-form-section">
        <h3 class="vehicle-form-title">Rendimiento - Conducción Agresiva</h3>
        <div class="vehicle-form-group">
    <label for="agresiva_velocidad" class="vehicle-required">Velocidad Promedio (km/h)</label>
    <input type="number" id="agresiva_velocidad" name="agresiva_velocidad" min="0" required>
    <div class="vehicle-help-text" style="color: #e10600;">Por favor ingrese un valor válido</div>
  </div>
  
  <div style="margin-top: 20px;">
    <h4 style="color: #ddd; margin-bottom: 15px;">Rendimiento según condiciones climáticas</h4>
    
    <!-- Encabezados de columnas -->
    <div style="display: grid; grid-template-columns: 200px 1fr 1fr 1fr; gap: 10px; margin-bottom: 10px;">
      <div></div>
      <div style="text-align: center; font-weight: bold; color: #e10600;">Seco</div>
      <div style="text-align: center; font-weight: bold; color: #e10600;">Lluvioso</div>
      <div style="text-align: center; font-weight: bold; color: #e10600;">Extremo</div>
    </div>
    
    <!-- Consumo de combustible -->
    <div style="display: grid; grid-template-columns: 200px 1fr 1fr 1fr; gap: 10px; margin-bottom: 20px; align-items: center;">
      <div style="font-weight: bold; color: #ddd;">
        Consumo de Combustible (L/100km)
      </div>
      <div>
        <input type="number" step="0.1" name="agresiva_comb_seco" min="0" style="width: 100%; padding: 8px; background-color: #333; border: 1px solid #444; color: white; border-radius: 3px;" required>
      </div>
      <div>
        <input type="number" step="0.1" name="agresiva_comb_lluvia" min="0" style="width: 100%; padding: 8px; background-color: #333; border: 1px solid #444; color: white; border-radius: 3px;" required>
      </div>
      <div>
        <input type="number" step="0.1" name="agresiva_comb_extremo" min="0" style="width: 100%; padding: 8px; background-color: #333; border: 1px solid #444; color: white; border-radius: 3px;" required>
      </div>
    </div>
    
    <!-- Desgaste de neumáticos -->
    <div style="display: grid; grid-template-columns: 200px 1fr 1fr 1fr; gap: 10px; align-items: center;">
      <div style="font-weight: bold; color: #ddd;">
        Desgaste Neumáticos (%/100km)
      </div>
      <div>
        <input type="number" step="0.1" name="agresiva_neum_seco" min="0" style="width: 100%; padding: 8px; background-color: #333; border: 1px solid #444; color: white; border-radius: 3px;" required>
      </div>
      <div>
        <input type="number" step="0.1" name="agresiva_neum_lluvia" min="0" style="width: 100%; padding: 8px; background-color: #333; border: 1px solid #444; color: white; border-radius: 3px;" required>
      </div>
      <div>
        <input type="number" step="0.1" name="agresiva_neum_extremo" min="0" style="width: 100%; padding: 8px; background-color: #333; border: 1px solid #444; color: white; border-radius: 3px;" required>
      </div>
    </div>
  </div>
</div>
      
      <!-- Rendimiento - Ahorro de Combustible -->
      <div class="vehicle-form-section">
        <h3 class="vehicle-form-title">Rendimiento - Ahorro de Combustible</h3>
        <div class="vehicle-form-group">
    <label for="ahorro_velocidad" class="vehicle-required">Velocidad Promedio (km/h)</label>
    <input type="number" id="ahorro_velocidad" name="ahorro_velocidad" min="0" required>
    <div class="vehicle-help-text" style="color: #e10600;">Por favor ingrese un valor válido</div>
  </div>
  
  <div style="margin-top: 20px;">
    <h4 style="color: #ddd; margin-bottom: 15px;">Rendimiento según condiciones climáticas</h4>
    
    <!-- Encabezados de columnas -->
    <div style="display: grid; grid-template-columns: 200px 1fr 1fr 1fr; gap: 10px; margin-bottom: 10px;">
      <div></div>
      <div style="text-align: center; font-weight: bold; color: #e10600;">Seco</div>
      <div style="text-align: center; font-weight: bold; color: #e10600;">Lluvioso</div>
      <div style="text-align: center; font-weight: bold; color: #e10600;">Extremo</div>
    </div>
    
    <!-- Consumo de combustible -->
    <div style="display: grid; grid-template-columns: 200px 1fr 1fr 1fr; gap: 10px; margin-bottom: 20px; align-items: center;">
      <div style="font-weight: bold; color: #ddd;">
        Consumo de Combustible (L/100km)
      </div>
      <div>
        <input type="number" step="0.1" name="ahorro_comb_seco" min="0" style="width: 100%; padding: 8px; background-color: #333; border: 1px solid #444; color: white; border-radius: 3px;" required>
      </div>
      <div>
        <input type="number" step="0.1" name="ahorro_comb_lluvia" min="0" style="width: 100%; padding: 8px; background-color: #333; border: 1px solid #444; color: white; border-radius: 3px;" required>
      </div>
      <div>
        <input type="number" step="0.1" name="ahorro_comb_extremo" min="0" style="width: 100%; padding: 8px; background-color: #333; border: 1px solid #444; color: white; border-radius: 3px;" required>
      </div>
    </div>
    
    <!-- Desgaste de neumáticos -->
    <div style="display: grid; grid-template-columns: 200px 1fr 1fr 1fr; gap: 10px; align-items: center;">
      <div style="font-weight: bold; color: #ddd;">
        Desgaste Neumáticos (%/100km)
      </div>
      <div>
        <input type="number" step="0.1" name="ahorro_neum_seco" min="0" style="width: 100%; padding: 8px; background-color: #333; border: 1px solid #444; color: white; border-radius: 3px;" required>
      </div>
      <div>
        <input type="number" step="0.1" name="ahorro_neum_lluvia" min="0" style="width: 100%; padding: 8px; background-color: #333; border: 1px solid #444; color: white; border-radius: 3px;" required>
      </div>
      <div>
        <input type="number" step="0.1" name="ahorro_neum_extremo" min="0" style="width: 100%; padding: 8px; background-color: #333; border: 1px solid #444; color: white; border-radius: 3px;" required>
      </div>
    </div>
  </div>
</div>
      
      <!-- Botones de acción -->
      <div class="vehicle-btn-group">
        <button type="button" class="btn-cancelar" id="btnCancelar">Cancelar</button>
        <button type="submit" class="btn-guardar">Guardar</button>
      </div>
    </form>
  </div>
</div>
            `;


    const btnCancelar = document.getElementById('btnCancelar');
    const span = document.getElementsByClassName('close')[0];
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

        const equipo = document.getElementById('equipo').value;
        const modelo = document.getElementById('modelo').value;
        const motor = document.getElementById('motor').value;
        const model3DLink = document.getElementById('model').value;
        const imagenURL = document.getElementById('imagen').value;
            
        const velocidadMaxima = document.getElementById('velocidad').value;
        const aceleracion = document.getElementById('aceleracion').value;
        const pilotosIDs = document.getElementById('pilotos').value;
            
        const normalVelocidadPromedio = document.getElementById('normal_velocidad').value;
        const normalConsumoCombustibleSeco = document.getElementsByName('normal_comb_seco')[0].value;
        const normalConsumoCombustibleLluvioso = document.getElementsByName('normal_comb_lluvia')[0].value;
        const normalConsumoCombustibleExtremo = document.getElementsByName('normal_comb_extremo')[0].value;
        const normalDesgasteNeumaticosSeco = document.getElementsByName('normal_neum_seco')[0].value;
        const normalDesgasteNeumaticosLluvioso = document.getElementsByName('normal_neum_lluvia')[0].value;
        const normalDesgasteNeumaticosExtremo = document.getElementsByName('normal_neum_extremo')[0].value;
            
        const agresivaVelocidadPromedio = document.getElementById('agresiva_velocidad').value;
        const agresivaConsumoCombustibleSeco = document.getElementsByName('agresiva_comb_seco')[0].value;
        const agresivaConsumoCombustibleLluvioso = document.getElementsByName('agresiva_comb_lluvia')[0].value;
        const agresivaConsumoCombustibleExtremo = document.getElementsByName('agresiva_comb_extremo')[0].value;
        const agresivaDesgasteNeumaticosSeco = document.getElementsByName('agresiva_neum_seco')[0].value;
        const agresivaDesgasteNeumaticosLluvioso = document.getElementsByName('agresiva_neum_lluvia')[0].value;
        const agresivaDesgasteNeumaticosExtremo = document.getElementsByName('agresiva_neum_extremo')[0].value;
            
        const ahorroVelocidadPromedio = document.getElementById('ahorro_velocidad').value;
        const ahorroConsumoCombustibleSeco = document.getElementsByName('ahorro_comb_seco')[0].value;
        const ahorroConsumoCombustibleLluvioso = document.getElementsByName('ahorro_comb_lluvia')[0].value;
        const ahorroConsumoCombustibleExtremo = document.getElementsByName('ahorro_comb_extremo')[0].value;
        const ahorroDesgasteNeumaticosSeco = document.getElementsByName('ahorro_neum_seco')[0].value;
        const ahorroDesgasteNeumaticosLluvioso = document.getElementsByName('ahorro_neum_lluvia')[0].value;
        const ahorroDesgasteNeumaticosExtremo = document.getElementsByName('ahorro_neum_extremo')[0].value;

        fetch(url)
        .then(response=>response.json())
        .then(data=>{
            let neew = {
              "id": (data[0].monoplazas.length)+1,
              "equipo": equipo,
              "modelo": model3DLink,
              "model": modelo,
              "motor": motor,
              "velocidad_maxima_kmh": velocidadMaxima,
              "aceleracion_0_100": aceleracion,
              "piloto": [pilotosIDs],
              "rendimiento": {
                "conduccion_normal": {
                  "velocidad_promedio_kmh": normalVelocidadPromedio,
                  "consumo_combustible": {
                    "seco": normalConsumoCombustibleSeco,
                    "lluvioso": normalConsumoCombustibleLluvioso,
                    "extremo": normalConsumoCombustibleExtremo
                  },
                  "desgaste_neumaticos": {
                    "seco": normalDesgasteNeumaticosSeco,
                    "lluvioso": normalDesgasteNeumaticosLluvioso,
                    "extremo": normalDesgasteNeumaticosExtremo
                  }
                },
                "conduccion_agresiva": {
                  "velocidad_promedio_kmh": agresivaVelocidadPromedio,
                  "consumo_combustible": {
                    "seco": agresivaConsumoCombustibleSeco,
                    "lluvioso": agresivaConsumoCombustibleLluvioso,
                    "extremo": agresivaConsumoCombustibleExtremo
                  },
                  "desgaste_neumaticos": {
                    "seco": agresivaDesgasteNeumaticosSeco,
                    "lluvioso": agresivaDesgasteNeumaticosLluvioso,
                    "extremo": agresivaDesgasteNeumaticosExtremo
                  }
                },
                "ahorro_combustible": {
                  "velocidad_promedio_kmh": ahorroVelocidadPromedio,
                  "consumo_combustible": {
                    "seco": ahorroConsumoCombustibleSeco,
                    "lluvioso": ahorroConsumoCombustibleLluvioso,
                    "extremo": ahorroConsumoCombustibleExtremo
                  },
                  "desgaste_neumaticos": {
                    "seco": ahorroDesgasteNeumaticosSeco,
                    "lluvioso": ahorroDesgasteNeumaticosLluvioso,
                    "extremo": ahorroDesgasteNeumaticosExtremo
                  }
                }
              },
              "imagen": imagenURL
            };
        let nuv = data[0]
        nuv.monoplazas.push(neew);

        fetch(`${url}/1`,{
            method:"PUT",
            headers: {
                'Content-Type': 'application/json' // Tell server the data is JSON
            },
            body:JSON.stringify(nuv)
        })
        })

        console.log('Datos del circuito:', {velocidadMaxima});
        
        
        modal.style.display = 'none';

        alert('Circuito guardado correctamente');
    };
};

btnAbrirModalEscuderia.onclick = function() {
    document.getElementById('modalTitle').textContent = '';
    formCircuito.reset();
    modal.style.display = 'block';
    formCircuito.innerHTML = ``;


    formCircuito.innerHTML = `
    <div class="monoplaza-form-container">
    <div class="monoplaza-form-header">
        <h2 class="monoplaza-form-title">REGISTRO DE VEHÍCULO DE COMPETICIÓN</h2>
    </div>
    
    <div class="monoplaza-section">
        <h3 class="monoplaza-section-title">INFORMACIÓN BÁSICA</h3>
        <div class="monoplaza-row">
            <div class="monoplaza-col-6">
                <div class="monoplaza-form-group">
                <label for="nombre">Nombre:</label>
                <input type="text" id="nombre" name="nombre" required>
                    <div class="monoplaza-info-tip">Tu debe ingresar el nombre de equipo</div>
                </div>
            </div>
            <div class="monoplaza-col-6">
                <div class="monoplaza-form-group">
                <label for="bg_default">Background Default:</label>
                <input type="text" id="bg_default" name="bg_default" required>
                </div>
            </div>
            <div class="monoplaza-col-6">
                <div class="monoplaza-form-group">
                <label for="pais">País:</label>
                <input type="text" id="pais" name="pais" required>
                </div>
            </div>
            <div class="monoplaza-col-6">
                <div class="monoplaza-form-group">
                <label for="motor">Motor:</label>
                <input type="text" id="motor" name="motor" required>
                </div>
            </div>
            <div class="monoplaza-col-6">
                <div class="monoplaza-form-group">
                <label for="logo">Logo:</label>
                <input type="text" id="logo" name="logo" required>
                </div>
            </div>
            <div class="monoplaza-col-6">
                <div class="monoplaza-form-group">
                <label for="pilotos">Pilotos (separados por coma):</label>
                <textarea id="pilotos" name="pilotos" rows="3" placeholder="id1, id2"></textarea>
                </div>
            </div>
        </div>

    </div>
    
    <div class="modal-footer">
        <button type="button" class="btn-cancelar" id="btnCancelar">Cancelar</button>
        <button type="submit" class="btn-guardar">Guardar</button>
    </div>
</div>
            `;

    const btnCancelar = document.getElementById('btnCancelar');
    const span = document.getElementsByClassName('close')[0];

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

        const nombre = document.getElementById('nombre').value;
        const bg_default = document.getElementById('bg_default').value;
        const pais = document.getElementById('pais').value;
        const motor = document.getElementById('motor').value;
        const logo = document.getElementById('logo').value;
        const pilotos = document.getElementById('pilotos').value;


        fetch(url)
        .then(response=>response.json())
        .then(data=>{
            let neew = {
              "id": (data[0].equipos.length)+1,
              "nombre": nombre,
              "bg_default": bg_default,
              "pais": pais,
              "motor": motor,
              "logo": logo,
              "pilotos": [pilotos]
            };
        let nuv = data[0]
        nuv.equipos.push(neew);

        fetch(`${url}/1`,{
            method:"PUT",
            headers: {
                'Content-Type': 'application/json' // Tell server the data is JSON
            },
            body:JSON.stringify(nuv)
        })
        })

        console.log('Datos del circuito:', { nombre,photo, pais, longitud, vueltas,descrip, tiempor,añor,pil });
        
        
        modal.style.display = 'none';

        alert('Circuito guardado correctamente');
    };
};

/////////////////////////////////////////////////////////////////////////////////////////
/////////////                    DELETE CRUD                         ////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

function btndeletecircuitos(data){
  let id = event.target.getAttribute('data-id')
  console.log(id)
  fetch(url,{
    method:"GET"
  })
  .then(response=>response.json())
  .then(data=>{
    let cir = data[0]
    cir.circuitos.pop(id)
    fetch(`${url}/1`,{
      method:"PUT",
      headers: {
        'Content-Type': 'application/json' // Tell server the data is JSON
      },
      body: JSON.stringify(cir)
    })
  });
}

function btndeleteescuderias(){
  let id = event.target.getAttribute('data-id')
  console.log(id)
  fetch(url,{
    method:"GET"
  })
  .then(response=>response.json())
  .then(data=>{
    let cir = data[0]
    cir.equipos.pop(id)
    fetch(`${url}/1`,{
      method:"PUT",
      headers: {
        'Content-Type': 'application/json' // Tell server the data is JSON
      },
      body: JSON.stringify(cir)
    })
  });
}

function btndeletepilotos(){
  let id = event.target.getAttribute('data-id')
  console.log(id)
  fetch(url,{
    method:"GET"
  })
  .then(response=>response.json())
  .then(data=>{
    let cir = data[0]
    cir.pilotos.pop(id)
    fetch(`${url}/1`,{
      method:"PUT",
      headers: {
        'Content-Type': 'application/json' // Tell server the data is JSON
      },
      body: JSON.stringify(cir)
    })
  });
}

function btndeletemonoplazas(){
  let id = event.target.getAttribute('data-id')
  console.log(id)
  fetch(url,{
    method:"GET"
  })
  .then(response=>response.json())
  .then(data=>{
    let cir = data[0]
    cir.monoplazas.pop(id)
    fetch(`${url}/1`,{
      method:"PUT",
      headers: {
        'Content-Type': 'application/json' // Tell server the data is JSON
      },
      body: JSON.stringify(cir)
    })
  });
}

/////////////////////////////////////////////////////////////////////////////////////////
/////////////                    UPDATE CRUD                         ////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

function btnupdatecircuitos(){
  let id = event.target.getAttribute('data-id')
  console.log('Editando circuito con ID:', id)
  
  // Obtener datos actuales del circuito
  fetch(url)
  .then(response => response.json())
  .then(data => {
      let circuito = data[0].circuitos[id]
      
      // Configurar modal para edición
      document.getElementById('modalTitle').textContent = 'Editar Circuito';
      modal.style.display = 'block';
      formCircuito.innerHTML = `
          <div class="form-group">
              <label for="nombre">Nombre:</label>
              <input type="text" id="nombre" name="nombre" value="${circuito.nombre}" required>
          </div>
          <div class="form-group">
              <label for="photo">Link de la Foto:</label>
              <input type="text" id="photo" name="photo" value="${circuito.photo || ''}" required>
          </div>
          <div class="form-group">
              <label for="pais">País:</label>
              <input type="text" id="pais" name="pais" value="${circuito.pais}" required>
          </div>
          <div class="form-group">
              <label for="longitud">Longitud (km):</label>
              <input type="number" id="longitud_km" name="longitud" value="${circuito.longitud_km}" step="0.01" required>
          </div>
          <div class="form-group">
              <label for="vueltas">Vueltas:</label>
              <input type="number" id="vueltas" name="vueltas" value="${circuito.vueltas}" required>
          </div>
          <div class="form-group">
              <label for="descripcion">Descripción:</label>
              <input type="text" id="descripcion" name="descripcion" value="${circuito.descripcion || ''}" required>
          </div>
          <div class="form-group">
              <label for="tiempo">Récord vuelta - Tiempo:</label>
              <input type="text" id="tiempo" name="tiempo" value="${circuito.record_vuelta.tiempo}" placeholder="1:XX.XXX">
          </div>
          <div class="form-group">
              <label for="ano">Año:</label>
              <input type="text" id="ano" name="ano" value="${circuito.record_vuelta.año}" placeholder="Año">
          </div>
          <div class="form-group">
              <label for="piloto">Piloto:</label>
              <input type="text" id="piloto" name="piloto" value="${circuito.record_vuelta.piloto}" placeholder="Piloto">
          </div>
          <div class="modal-footer">
              <button type="button" class="btn-cancelar" id="btnCancelar">Cancelar</button>
              <button type="submit" class="btn-guardar">Actualizar</button>
          </div>
      `;

      // Event listeners para modal
      const btnCancelar = document.getElementById('btnCancelar');
      const span = document.getElementsByClassName('close')[0];
      
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

      // Submit form para actualizar
      formCircuito.onsubmit = function(event) {
          event.preventDefault();

          const nombre = document.getElementById('nombre').value;
          const photo = document.getElementById('photo').value;
          const pais = document.getElementById('pais').value;
          const longitud = document.getElementById('longitud_km').value;
          const vueltas = document.getElementById('vueltas').value;
          const descripcion = document.getElementById('descripcion').value;
          const tiempo = document.getElementById('tiempo').value;
          const ano = document.getElementById('ano').value;
          const piloto = document.getElementById('piloto').value;

          // Actualizar el circuito
          let updatedCircuito = {
              "id": circuito.id,
              "nombre": nombre,
              "photo": photo,
              "pais": pais,
              "longitud_km": parseFloat(longitud),
              "vueltas": parseInt(vueltas),
              "descripcion": descripcion,
              "record_vuelta": {
                  "tiempo": tiempo,
                  "piloto": piloto,
                  "año": ano
              }
          };

          let updatedData = data[0];
          updatedData.circuitos[id] = updatedCircuito;

          fetch(`${url}/1`, {
              method: "PUT",
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(updatedData)
          })
          .then(() => {
              modal.style.display = 'none';
              alert('Circuito actualizado correctamente');
              renderAll(); // Re-renderizar la tabla
          });
      };
  });
}

function btnupdateescuderias(){
  let id = event.target.getAttribute('data-id')
  console.log('Editando escudería con ID:', id)
  
  fetch(url)
  .then(response => response.json())
  .then(data => {
      let escuderia = data[0].equipos[id]
      
      document.getElementById('modalTitle').textContent = 'Editar Escudería';
      modal.style.display = 'block';
      formCircuito.innerHTML = `
          <div class="monoplaza-form-container">
              <div class="monoplaza-section">
                  <h3 class="monoplaza-section-title">INFORMACIÓN BÁSICA</h3>
                  <div class="monoplaza-row">
                      <div class="monoplaza-col-6">
                          <div class="monoplaza-form-group">
                              <label for="nombre">Nombre:</label>
                              <input type="text" id="nombre" name="nombre" value="${escuderia.nombre}" required>
                          </div>
                      </div>
                      <div class="monoplaza-col-6">
                          <div class="monoplaza-form-group">
                              <label for="bg_default">Background Default:</label>
                              <input type="text" id="bg_default" name="bg_default" value="${escuderia.bg_default || ''}" required>
                          </div>
                      </div>
                      <div class="monoplaza-col-6">
                          <div class="monoplaza-form-group">
                              <label for="pais">País:</label>
                              <input type="text" id="pais" name="pais" value="${escuderia.pais}" required>
                          </div>
                      </div>
                      <div class="monoplaza-col-6">
                          <div class="monoplaza-form-group">
                              <label for="motor">Motor:</label>
                              <input type="text" id="motor" name="motor" value="${escuderia.motor}" required>
                          </div>
                      </div>
                      <div class="monoplaza-col-6">
                          <div class="monoplaza-form-group">
                              <label for="logo">Logo:</label>
                              <input type="text" id="logo" name="logo" value="${escuderia.logo}" required>
                          </div>
                      </div>
                      <div class="monoplaza-col-6">
                          <div class="monoplaza-form-group">
                              <label for="pilotos">Pilotos (separados por coma):</label>
                              <textarea id="pilotos" name="pilotos" rows="3" placeholder="id1, id2">${escuderia.pilotos ? escuderia.pilotos.join(', ') : ''}</textarea>
                          </div>
                      </div>
                  </div>
              </div>
              
              <div class="modal-footer">
                  <button type="button" class="btn-cancelar" id="btnCancelar">Cancelar</button>
                  <button type="submit" class="btn-guardar">Actualizar</button>
              </div>  
          </div>
      `;

      // Event listeners
      const btnCancelar = document.getElementById('btnCancelar');
      const span = document.getElementsByClassName('close')[0];

      span.onclick = () => modal.style.display = 'none';
      btnCancelar.onclick = () => modal.style.display = 'none';
      window.onclick = (event) => {
          if (event.target == modal) modal.style.display = 'none';
      };

      formCircuito.onsubmit = function(event) {
          event.preventDefault();

          const nombre = document.getElementById('nombre').value;
          const bg_default = document.getElementById('bg_default').value;
          const pais = document.getElementById('pais').value;
          const motor = document.getElementById('motor').value;
          const logo = document.getElementById('logo').value;
          const pilotos = document.getElementById('pilotos').value;

          let updatedEscuderia = {
              "id": escuderia.id,
              "nombre": nombre,
              "bg_default": bg_default,
              "pais": pais,
              "motor": motor,
              "logo": logo,
              "pilotos": pilotos
          };

          let updatedData = data[0];
          updatedData.equipos[id] = updatedEscuderia;

          fetch(`${url}/1`, {
              method: "PUT",
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(updatedData)
          })
          .then(() => {
              modal.style.display = 'none';
              alert('Escudería actualizada correctamente');
              renderAll();
          });
      };
  });
}

function btnupdatepilotos(){
  let id = event.target.getAttribute('data-id')
  console.log('Editando piloto con ID:', id)
  
  fetch(url)
  .then(response => response.json())
  .then(data => {
      let piloto = data[0].pilotos[id]
      
      document.getElementById('modalTitle').textContent = 'Editar Piloto';
      modal.style.display = 'block';
      formCircuito.innerHTML = `
          <div class="form-group">
              <label for="nombre">Nombre:</label>
              <input type="text" id="nombre" name="nombre" value="${piloto.nombre}" required>
          </div>
          <div class="form-group">
              <label for="photo">Link de la Foto:</label>
              <input type="text" id="photo" name="photo" value="${piloto.photo || ''}" required>
          </div>
          <div class="form-group">
              <label for="rol">Rol:</label>
              <input type="text" id="rol" name="rol" value="${piloto.rol}" required>
          </div>
          <div class="form-group">
              <label for="equip">Equipo ID:</label>
              <input type="number" id="equip" name="equip" value="${piloto.equipo_id || ''}" required>
          </div>
          <div class="form-group">
              <label for="nacho">Nacionalidad:</label>
              <input type="text" id="nacho" name="nacho" value="${piloto.nacionalidad}" required>
          </div>
          <div class="form-group">
              <label for="escu">Escudería:</label>
              <input type="text" id="escu" name="escu" value="${piloto.escuderia}" required>
          </div>
          <div class="modal-footer">
              <button type="button" class="btn-cancelar" id="btnCancelar">Cancelar</button>
              <button type="submit" class="btn-guardar">Actualizar</button>
          </div>
      `;

      // Event listeners
      const btnCancelar = document.getElementById('btnCancelar');
      const span = document.getElementsByClassName('close')[0];

      span.onclick = () => modal.style.display = 'none';
      btnCancelar.onclick = () => modal.style.display = 'none';
      window.onclick = (event) => {
          if (event.target == modal) modal.style.display = 'none';
      };

      formCircuito.onsubmit = function(event) {
          event.preventDefault();

          const nombre = document.getElementById('nombre').value;
          const photo = document.getElementById('photo').value;
          const rol = document.getElementById('rol').value;
          const equipoid = document.getElementById('equip').value;
          const nacionalidad = document.getElementById('nacho').value;
          const escuderia = document.getElementById('escu').value;

          let updatedPiloto = {
              "id": piloto.id,
              "nombre": nombre,
              "photo": photo,
              "rol": rol,
              "equipo_id": parseInt(equipoid),
              "nacionalidad": nacionalidad,
              "escuderia": escuderia
          };

          let updatedData = data[0];
          updatedData.pilotos[id] = updatedPiloto;

          fetch(`${url}/1`, {
              method: "PUT",
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(updatedData)
          })
          .then(() => {
              modal.style.display = 'none';
              alert('Piloto actualizado correctamente');
              renderAll();
          });
      };
  });
}

function btnupdatemonoplazas(){
  let id = event.target.getAttribute('data-id')
  console.log('Editando monoplaza con ID:', id)
  
  fetch(url)
  .then(response => response.json())
  .then(data => {
      let monoplaza = data[0].monoplazas[id]
      
      document.getElementById('modalTitle').textContent = 'Editar Monoplaza';
      modal.style.display = 'block';
      formCircuito.innerHTML = `
          <div class="container">
              <div class="section">
                  <h2 class="section-title">Editar Vehículo de Competición</h2>
                  
                  <!-- Información básica -->
                  <div class="vehicle-form-section">
                      <h3 class="vehicle-form-title">Información Básica</h3>
                      <div class="vehicle-form-row">
                          <div class="vehicle-form-group">
                              <label for="equipo" class="vehicle-required">Equipo</label>
                              <input type="text" id="equipo" name="equipo" value="${monoplaza.equipo}" required>
                          </div>
                          <div class="vehicle-form-group">
                              <label for="modelo" class="vehicle-required">Modelo</label>
                              <input type="text" id="modelo" name="modelo" value="${monoplaza.modelo}" required>
                          </div>
                      </div>
                      
                      <div class="vehicle-form-row">
                          <div class="vehicle-form-group">
                              <label for="motor" class="vehicle-required">Motor</label>
                              <input type="text" id="motor" name="motor" value="${monoplaza.motor}" required>
                          </div>
                      </div>
                      
                      <div class="vehicle-form-row">
                          <div class="vehicle-form-group">
                              <label for="model" class="vehicle-required">Link 3D del Modelo</label>
                              <input type="url" id="model" name="model" value="${monoplaza.model || ''}" required>
                          </div>
                          <div class="vehicle-form-group">
                              <label for="imagen" class="vehicle-required">Imagen del Auto (URL)</label>
                              <input type="url" id="imagen" name="imagen" value="${monoplaza.imagen}" required>
                          </div>
                      </div>
                  </div>
                  
                  <!-- Especificaciones técnicas -->
                  <div class="vehicle-form-section">
                      <h3 class="vehicle-form-title">Especificaciones Técnicas</h3>
                      <div class="vehicle-form-row">
                          <div class="vehicle-form-group">
                              <label for="velocidad" class="vehicle-required">Velocidad Máxima (km/h)</label>
                              <input type="number" id="velocidad" name="velocidad_maxima_kmh" value="${monoplaza.velocidad_maxima_kmh}" required>
                          </div>
                          <div class="vehicle-form-group">
                              <label for="aceleracion" class="vehicle-required">Aceleración 0-100 km/h (s)</label>
                              <input type="number" step="0.1" id="aceleracion" name="aceleracion_0_100" value="${monoplaza.aceleracion_0_100}" required>
                          </div>
                      </div>
                      
                      <div class="vehicle-form-group">
                          <label for="pilotos" class="vehicle-required">Pilotos (IDs separados por coma)</label>
                          <input type="text" id="pilotos" name="piloto" value="${monoplaza.piloto ? monoplaza.piloto.join(', ') : ''}" required>
                      </div>
                  </div>
                  
                  <!-- Botones de acción -->
                  <div class="vehicle-btn-group">
                      <button type="button" class="btn-cancelar" id="btnCancelar">Cancelar</button>
                      <button type="submit" class="btn-guardar">Actualizar</button>
                  </div>
              </div>
          </div>
      `;

      // Event listeners
      const btnCancelar = document.getElementById('btnCancelar');
      const span = document.getElementsByClassName('close')[0];

      span.onclick = () => modal.style.display = 'none';
      btnCancelar.onclick = () => modal.style.display = 'none';
      window.onclick = (event) => {
          if (event.target == modal) modal.style.display = 'none';
      };

      formCircuito.onsubmit = function(event) {
          event.preventDefault();

          const equipo = document.getElementById('equipo').value;
          const modelo = document.getElementById('modelo').value;
          const motor = document.getElementById('motor').value;
          const model3DLink = document.getElementById('model').value;
          const imagenURL = document.getElementById('imagen').value;
          const velocidadMaxima = document.getElementById('velocidad').value;
          const aceleracion = document.getElementById('aceleracion').value;
          const pilotosIDs = document.getElementById('pilotos').value;

          let updatedMonoplaza = {
              "id": monoplaza.id,
              "equipo": equipo,
              "modelo": modelo,
              "model": model3DLink,
              "motor": motor,
              "velocidad_maxima_kmh": parseInt(velocidadMaxima),
              "aceleracion_0_100": parseFloat(aceleracion),
              "piloto": pilotosIDs,
              "rendimiento": monoplaza.rendimiento || {}, // Mantener rendimiento existente
              "imagen": imagenURL
          };

          let updatedData = data[0];
          updatedData.monoplazas[id] = updatedMonoplaza;

          fetch(`${url}/1`, {
              method: "PUT",
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(updatedData)
          })
          .then(() => {
              modal.style.display = 'none';
              alert('Monoplaza actualizado correctamente');
              renderAll();
          });
      };
  });
}
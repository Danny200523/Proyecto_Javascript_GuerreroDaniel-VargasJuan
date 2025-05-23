// This is your API link
let apiLink = `https://67f91aad094de2fe6ea07a32.mockapi.io/people/project/F1`;

// Get references to the HTML elements
let teamsGrid = document.getElementById("teams-grid");
let car1Select = document.getElementById("car1-select");
let car2Select = document.getElementById("car2-select");
let car1Image = document.getElementById("car1-image");
let car2Image = document.getElementById("car2-image");
let car1Specs = document.getElementById("car1-specs");
let car2Specs = document.getElementById("car2-specs");

// Store fetched car data globally for easy access
let allMonoplazasData = [];

// Function to fetch data and populate the teams grid (similar to your existing code)
function populateTeamsGrid() {
    axios.get(apiLink)
    .then((response) => {
        let data = response.data[0]; // Assuming your relevant data is in the first element of the array
        if (data && data.monoplazas && data.equipos) {
            for (let i = 0; i < data.monoplazas.length; i++) {
                teamsGrid.innerHTML += `
                <div class="team-card">
                    <img src="${data.equipos[i]["logo"]}" alt="Team Logo" class="team-logo">
                    <img src="${data.monoplazas[i]["imagen"]}" alt="Monoplaza Background" class="team-background">
                </div>
                `;
            }
        }
    })
    .catch((error) => {
        console.error("Error fetching teams data:", error);
        teamsGrid.innerHTML = `<p>Error al cargar los equipos.</p>`;
    });
}

// Function to populate the car dropdowns
function populateCarDropdowns() {
    axios.get(apiLink)
    .then((response) => {
        let data = response.data[0];
        if (data && data.monoplazas) {
            allMonoplazasData = data.monoplazas; // Store the data
            // Clear existing options
            car1Select.innerHTML = '<option value="">Selecciona un monoplaza</option>';
            car2Select.innerHTML = '<option value="">Selecciona un monoplaza</option>';

            allMonoplazasData.forEach((monoplaza, index) => {
                const option = `<option value="${index}">${monoplaza.equipo}</option>`;
                car1Select.innerHTML += option;
                car2Select.innerHTML += option;
            });
        }
    })
    .catch((error) => {
        console.error("Error fetching monoplazas data for dropdowns:", error);
        car1Select.innerHTML = '<option value="">Error al cargar monoplazas</option>';
        car2Select.innerHTML = '<option value="">Error al cargar monoplazas</option>';
    });
}

// Function to display car details (image and specifications)
function displayCarDetails(selectElement, imageElement, specsElement) {
    const selectedIndex = selectElement.value;

    // Clear previous content
    imageElement.innerHTML = '';
    specsElement.innerHTML = '<div class="loading">Selecciona un monoplaza para ver las especificaciones</div>';

    if (selectedIndex !== "") {
        const monoplaza = allMonoplazasData[selectedIndex];

        // Display image
        imageElement.innerHTML = `<img src="${monoplaza.imagen}" alt="${monoplaza.equipo}" class="comparison-car-image">`;

        // Display specifications (customize this based on your API's spec structure)
        specsElement.innerHTML = `
            <h3>${monoplaza.equipo}</h3>
            <ul>
                <li><strong>Motor:</strong> ${monoplaza.motor || 'N/A'}</li>
                <li><strong>Velocidad Máxima:</strong> ${monoplaza.velocidad_maxima_kmh ? `${monoplaza.velocidad_maxima_kmh} km/h` : 'N/A'}</li>
                <li><strong>Aceleración 0-100 km/h:</strong> ${monoplaza.aceleracion_0_100 ? `${monoplaza.aceleracion_0_100} s` : 'N/A'}</li>
            </ul>

            <h4>Rendimiento:</h4>
            ${monoplaza.rendimiento ? `
                <br>
                <h3>Conducción Normal:</h3>
                <br>
                <ul>
                    <li><strong>Velocidad Promedio:</strong> ${monoplaza.rendimiento.conduccion_normal.velocidad_promedio_kmh ? `${monoplaza.rendimiento.conduccion_normal.velocidad_promedio_kmh} km/h` : 'N/A'}</li>
                    <li><strong>Consumo Combustible (Seco):</strong> ${monoplaza.rendimiento.conduccion_normal.consumo_combustible.seco || 'N/A'}</li>
                    <li><strong>Consumo Combustible (Lluvioso):</strong> ${monoplaza.rendimiento.conduccion_normal.consumo_combustible.lluvioso || 'N/A'}</li>
                    <li><strong>Consumo Combustible (Extremo):</strong> ${monoplaza.rendimiento.conduccion_normal.consumo_combustible.extremo || 'N/A'}</li>
                    <li><strong>Desgaste Neumáticos (Seco):</strong> ${monoplaza.rendimiento.conduccion_normal.desgaste_neumaticos.seco || 'N/A'}</li>
                    <li><strong>Desgaste Neumáticos (Lluvioso):</strong> ${monoplaza.rendimiento.conduccion_normal.desgaste_neumaticos.lluvioso || 'N/A'}</li>
                    <li><strong>Desgaste Neumáticos (Extremo):</strong> ${monoplaza.rendimiento.conduccion_normal.desgaste_neumaticos.extremo || 'N/A'}</li>
                </ul>
                <br>
                <h3>Conducción Agresiva:</h3>
                <br>
                <ul>
                    <li><strong>Velocidad Promedio:</strong> ${monoplaza.rendimiento.conduccion_agresiva.velocidad_promedio_kmh ? `${monoplaza.rendimiento.conduccion_agresiva.velocidad_promedio_kmh} km/h` : 'N/A'}</li>
                    <li><strong>Consumo Combustible (Seco):</strong> ${monoplaza.rendimiento.conduccion_agresiva.consumo_combustible.seco || 'N/A'}</li>
                    <li><strong>Consumo Combustible (Lluvioso):</strong> ${monoplaza.rendimiento.conduccion_agresiva.consumo_combustible.lluvioso || 'N/A'}</li>
                    <li><strong>Consumo Combustible (Extremo):</strong> ${monoplaza.rendimiento.conduccion_agresiva.consumo_combustible.extremo || 'N/A'}</li>
                    <li><strong>Desgaste Neumáticos (Seco):</strong> ${monoplaza.rendimiento.conduccion_agresiva.desgaste_neumaticos.seco || 'N/A'}</li>
                    <li><strong>Desgaste Neumáticos (Lluvioso):</strong> ${monoplaza.rendimiento.conduccion_agresiva.desgaste_neumaticos.lluvioso || 'N/A'}</li>
                    <li><strong>Desgaste Neumáticos (Extremo):</strong> ${monoplaza.rendimiento.conduccion_agresiva.desgaste_neumaticos.extremo || 'N/A'}</li>
                </ul>
                <br>
                <h3>Ahorro de Combustible:</h3>
                <br>
                <ul>
                    <li><strong>Velocidad Promedio:</strong> ${monoplaza.rendimiento.ahorro_combustible.velocidad_promedio_kmh ? `${monoplaza.rendimiento.ahorro_combustible.velocidad_promedio_kmh} km/h` : 'N/A'}</li>
                    <li><strong>Consumo Combustible (Seco):</strong> ${monoplaza.rendimiento.ahorro_combustible.consumo_combustible.seco || 'N/A'}</li>
                    <li><strong>Consumo Combustible (Lluvioso):</strong> ${monoplaza.rendimiento.ahorro_combustible.consumo_combustible.lluvioso || 'N/A'}</li>
                    <li><strong>Consumo Combustible (Extremo):</strong> ${monoplaza.rendimiento.ahorro_combustible.consumo_combustible.extremo || 'N/A'}</li>
                    <li><strong>Desgaste Neumáticos (Seco):</strong> ${monoplaza.rendimiento.ahorro_combustible.desgaste_neumaticos.seco || 'N/A'}</li>
                    <li><strong>Desgaste Neumáticos (Lluvioso):</strong> ${monoplaza.rendimiento.ahorro_combustible.desgaste_neumaticos.lluvioso || 'N/A'}</li>
                    <li><strong>Desgaste Neumáticos (Extremo):</strong> ${monoplaza.rendimiento.ahorro_combustible.desgaste_neumaticos.extremo || 'N/A'}</li>
                </ul>
            ` : 'N/A'}
        `;
    }
}

// Event Listeners for dropdown changes
car1Select.addEventListener("change", () => {
    displayCarDetails(car1Select, car1Image, car1Specs);
});

car2Select.addEventListener("change", () => {
    displayCarDetails(car2Select, car2Image, car2Specs);
});

// Initial calls to populate the content when the page loads
document.addEventListener("DOMContentLoaded", () => {
    populateTeamsGrid();
    populateCarDropdowns();
});
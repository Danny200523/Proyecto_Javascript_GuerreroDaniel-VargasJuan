let link = `https://67f91aad094de2fe6ea07a32.mockapi.io/people/project/F1`
let cars = document.getElementById("cars-grid")
function mostrar(){
    axios.get(link)
    .then((response)=>{
        let ruta = response.data[0]
        let añadirhtml = document.getElementById("cars-grid")
        console.log(ruta.monoplazas[9])
        for (let i=0;i<response.data[0].monoplazas.length;i++){
            añadirhtml.innerHTML += `
            <div class="car-card" id="car-card">
                <div class="car-team">
                    <h3>${ruta.monoplazas[i]["modelo"]}</h3>
                </div>
                <div class="car-image">
                    <div class="car-info">
                        <div class="sketchfab-embed-wrapper">
                            <iframe title="F1 RedBull RB-20 2024" frameborder="0" allowfullscreen mozallowfullscreen="true" webkitallowfullscreen="true" allow="autoplay; fullscreen; xr-spatial-tracking" xr-spatial-tracking execution-while-out-of-viewport execution-while-not-rendered web-share src="${ruta.monoplazas[i]["model"]}?autostart=1&transparent=1&ui_hint=0"></iframe>
                        </div>
                    </div>
                </div>
                <a href="#" class="ver-btn">Ver +</a>
            </div>`
        }
    })
}
mostrar()
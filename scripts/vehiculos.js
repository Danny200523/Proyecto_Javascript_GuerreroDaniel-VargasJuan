let link = `https://67f91aad094de2fe6ea07a32.mockapi.io/people/project/F1`
let añadirhtml = document.getElementById("teams-grid")
axios.get(link)
.then((response)=>{
    let ruta = response.data[0]
    for (let i=0;i<response.data[0].monoplazas.length;i++){
        console.log("hola")
        añadirhtml.innerHTML += `<div class="team-card">
            <img src="${response.data[0].equipos[i]["logo"]}" alt=" Logo" class="team-logo">

            <img src="${response.data[0].monoplazas[i]["imagen"]}" alt="Background" class="team-background">
        </div>
        `
    }
})
const URL = "https://breakingbadapi.com/api/characters"
const urlFrase= "https://breakingbadapi.com/api/quote/random?author="
let personajes = []
let frases=[]




const fetchFrases=async(url, nombre)=>{
    let nombres = nombre.split(" ").join("+")
    
    let final;
    try {
       const peticion2= await fetch(url+nombres);
       const frases= await peticion2.json()
       
       
       frases.length === 0? final = "Nada relevante 🥺": final = frases[0].quote



       return final
        
    } catch (error) {
        console.error(error);
    }
}



const fetchPersonajes=async(url= URL)=>{
    try {
       const peticion= await fetch(url);
       const  personajes =await peticion.json()

       
       return personajes
        
    } catch (error) {
        console.error(error);
    }
}

const searchCharacter = ()=>{

}

const del=(id)=>{
document.getElementById(id).remove()
personajes = personajes.filter(personaje=> personaje.char_id !=id)


personajes.length===0?document.getElementById("mensajeFinal").innerHTML = "No hay personajes":null
}



const crearNode= async(p)=>{
      
const  nodo = ` <div class="card text-white bg-dark m-1" style="width: 15rem;" id="${p.char_id}">
 
    <img src="${p.img}" class="card-img-top img-fluid" width="100" height="100" alt="${p.nickname}">
        <div class="card-body">
            <h5 class="card-title text-info">${p.name}</h5>
                <p class="card-text">Conocido como: "${p.nickname}" </p>
                <p class="card-text">Frase: "${await fetchFrases(urlFrase, p.name)}" </p>
                <p class="card-text">Temporadas: "${ p.appearance}" </p>
                <p class="card-text">Nombre real: "${ p.portrayed}" </p>
                </div>
                <a class="btn btn-outline-primary mb-2" onClick="del(${p.char_id}) ">Borrar</a>
        
    </div>`

document.getElementById("apiR").insertAdjacentHTML("beforeend", nodo)
}

const iterateCharacter= (p)=>{
    p.map((personaje)=>crearNode(personaje) )
}

const start=async()=>{
    //document.getElementById("buscar").addEventListener("click", ()=>searchCharacter())
    personajes = await fetchPersonajes();
    
    
    
    iterateCharacter(personajes)
}








































window.onload= start()

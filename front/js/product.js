const idNumber = window.location.search
const urlparam = new URLSearchParams(idNumber)
const id = urlparam.get("id")
let imgUrl;


fetch (`http://localhost:3000/api/products/${id}`)
.then ((response) => response.json())
.then ((data) => addobject (data))

function addobject (canape) {

//  image

let image = document.createElement("img")
image.src = canape.imageUrl
let imgClass = document.getElementsByClassName("item__img")

imgClass[0].appendChild(image)
image.alt = canape.altTxt

imgUrl = image

//  titre

let titre = document.getElementById("title")
titre.innerHTML = canape.name

//  price

let prix = document.querySelector("#price")
prix.innerHTML = canape.price

//  description

let texte = document.querySelector("#description")
texte.innerHTML = canape.description

//  Couleur 

let select = document.getElementById('colors')
for (let color_id in canape.colors) {
    
    let myOption = document.createElement('option')
    myOption.setAttribute('value', canape.colors[color_id])
    myOption.innerHTML = canape.colors[color_id]
    select.appendChild(myOption)


let imgUrl = image
}
}



//  bouton



function boutonEvent (panier) {

let bouton = document.querySelector("#addToCart")
bouton.addEventListener ("click", (cana) => {

let color = document.getElementById("colors").value
let quantite = document.getElementById("quantity").value
let price = document.getElementById("price").textContent
let titre = document.getElementById("title").textContent



let panier = {
    couleur: color,
    quantité: quantite,
    prix : price,
    titre : titre,
    image : imgUrl.src,
    

    
}

if (color === "" || color == "null" | quantite == "0" | quantite == "null")
    alert ("veuillez choisir une couleur et une quantité")

    
localStorage.setItem("panier", JSON.stringify(panier)) 



})
}

boutonEvent()










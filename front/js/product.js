const idNumber = window.location.search
const urlparam = new URLSearchParams(idNumber)
const id = urlparam.get("id")


fetch (`http://localhost:3000/api/products/${id}`)
.then ((response) => response.json())
.then ((data) => addobject (data))
.catch((error) => {
    console.log(error)})

function addobject (canape) {

//  image

let image = document.createElement("img")
image.src = canape.imageUrl
let imgClass = document.getElementsByClassName("item__img")

imgClass[0].appendChild(image)
image.alt = canape.altTxt

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


}
}



//  bouton



function boutonEvent () {

let bouton = document.querySelector("#addToCart")
bouton.addEventListener ("click", (e) => {

let color = document.getElementById("colors").value
let quantite = document.getElementById("quantity").value

if (color === "" || color == "null" | quantite == "0" | quantite == "null")
    alert ("veuillez choisir une couleur et une quantité")


panier = {
    id: id,
    couleur: color,
    quantite: quantite,  
}





localStorage.setItem( 'panier', JSON.stringify(panier)) 

if (localStorage.getItem('panier') == "null") {
    localStorage.setItem('panier', '[]' )
}

let cart = JSON.parse(localStorage.getItem('panier'))
cart.push(panier)

localStorage.setItem('panier', JSON.stringify(cart))


})
}



/*let cart = JSON.parse(localStorage.getItem('panier'))
cart = Array()
cart.push(panier)    
if (panier.id == id )
*/

/*function getPanier () {

    boutonEvent()
    let cart = Array()
    cart = JSON.parse(localStorage.getItem('panier'))
console.log(cart);
}

function addPanier () {

    let yoyo = getPanier();
    console.log(yoyo);
}
getPanier()
addPanier()


/*
si (le panier existe) {
    let panier = {
        id: id,
        couleur: color,
        quantité: quantite,  
    }
    si (l'id et la couleur existent) {
        modifier la quantité
    }
    sinon {
        ajouter l'article
    }
    cart.push(panier)    
}
sinon {
    créer le panier
}
*/


//let cart = JSON.parse(localStorage.getItem('panier'))
//cart = Array()
//cart.push(panier) 
//localStorage.setItem( 'panier', JSON.stringify(panier)) 


boutonEvent()

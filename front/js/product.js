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

function boutonEvent() {
    let bouton = document.querySelector("#addToCart")
    bouton.addEventListener ("click", (e) => {

        let color = document.getElementById("colors").value
        let quantite = document.getElementById("quantity").value
        Qty = parseInt(quantite)




        if (color === "" || color == "null" | quantite == 0 | quantite == null) {
            alert ("veuillez choisir une couleur et une quantité")
        }
        else {
            let panier = {
                id: id,
                couleur: color,
                quantite: Qty,  
            }
            addPanier(panier)
        }
    })
}

function getPanier() {
    let cart = localStorage.getItem('panier')

    if (cart == undefined) {
        return [];
    }
    else  {
        return cart = JSON.parse(localStorage.getItem('panier'))
    }
    
}


function addPanier (cart) {
    
    let panier = getPanier();
    //verifier si l'article existe déjà dans le panier et vérifier s'il est à moins de 100 qty
    let foundPanier = panier.find(p => p.id == cart.id & p.couleur == cart.couleur)

    if (foundPanier != undefined) {
       
        if ((foundPanier.quantite + cart.quantite) > 100) {
            alert("quantité supérieur à 100 !! On limite votre nombre de canapés à 100 pour cette couleur");
            foundPanier.quantite = 100
        }                
        else {
            foundPanier.quantite += cart.quantite
        }
    }
    else {
        //cart.quantite = cart.quantite
        panier.push(cart)
    }
    localStorage.setItem('panier', JSON.stringify(panier))
}

boutonEvent ()
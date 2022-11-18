
function displayCartLine(produit) {

    let section = document.getElementById("cart__items")
    let article = document.createElement("article")
    article.className = "cart__item"
    section.appendChild(article)

    let divImage = document.createElement("div")
    divImage.className = "cart__item__img"
    article.appendChild(divImage)


    let imgImage = document.createElement("img")
    divImage.appendChild(imgImage)
    imgImage.src = produit.imageUrl


    let itemsContentClass = document.createElement("div")
    itemsContentClass.className = "cart__item__content"
    article.appendChild(itemsContentClass)

    let itemsContentDescription = document.createElement("div")
    itemsContentDescription.className = "cart__item__content__description"
    itemsContentClass.appendChild(itemsContentDescription)

    let titreH2 = document.createElement("h2")
    titreH2.textContent =  produit.name
    itemsContentDescription.appendChild(titreH2)

    let colorP = document.createElement("p")
    colorP.textContent = produit.couleur
    itemsContentDescription.appendChild(colorP)

    let priceP = document.createElement("p")
    priceP.textContent = produit.price + "€"
    itemsContentDescription.appendChild(priceP)

    let contentSetting = document.createElement("div")
    contentSetting.className = "cart__item__content__settings"
    article.appendChild(contentSetting)

    let contentQuantity = document.createElement("div")
    contentQuantity.className = "cart__item__content__settings__quantity"
    contentSetting.appendChild(contentQuantity)

    let quantityP = document.createElement("p")
    quantityP.textContent = produit.qty
    contentQuantity.appendChild(quantityP)

    let inputQtn = document.createElement("input")
    inputQtn.type = "number"
    inputQtn.className = "itemQuantity"
    inputQtn.value = produit.qty
    inputQtn.min = "1"
    inputQtn.max = "100"
    contentQuantity.appendChild(inputQtn)
    inputQtn.addEventListener("input", () => changeQty(produit, inputQtn.value))

    let contentDelete = document.createElement("div")
    contentDelete.className = "cart__item__content__settings__delete"
    contentSetting.appendChild(contentDelete)
    


    let deleteParagraphe = document.createElement("p")
    deleteParagraphe.className = "deleteItem"
    deleteParagraphe.textContent = "supprimer"
    contentDelete.appendChild(deleteParagraphe)
    deleteParagraphe.addEventListener("click", () => deleteItem(produit, article))

//    let inputQty = document.createElement("input")
    //type text, ajouter la qty en valeur dans le champ
//    inputQty.addEventListener('change', function () {
        // vérifier qu'on tape pas plus de 100
        //mettre à jour le panier => appel d'une fonction setPanier(avec id, couleur, qty)
//    })


    
}

function deleteItem (produit, article) {
    
    
    //let key = `${produit._id}-${produit.couleur}`
    
    let cart = JSON.parse(localStorage.getItem('panier'))
    for (let index in cart) {
        console.log(cart[index])
        console.log(produit)
        if (cart[index].id == produit._id && cart[index].couleur == produit.couleur) {
            cart.splice(index, 1)
        }
    }
    
    console.log(cart);

    //localStorage.removeItem(key)
    article.remove()
    localStorage.setItem('panier', JSON.stringify(cart))
    
    
    
    
}


function changeQty(produit, newValue) {
//    console.log(itemsList[1].id)
//    let itemToUpdate = itemsList.find((item) => item.id === produit._id & item.couleur === produit.couleur)
    produit.qty = Number(newValue)
    //console.log(itemToUpdate);
    setPanier(produit)
    
}

function setPanier (productUpdated) {
    let cart = JSON.parse(localStorage.getItem('panier'))
    for (let index in cart) {
        if (cart[index].id == productUpdated._id && cart[index].couleur == productUpdated.couleur) {
            cart[index].quantite = productUpdated.qty
        
        localStorage.setItem('panier', JSON.stringify(cart))
    }}
    
    
    
    readPanier()

}
   
function readPanier() {
    let itemsList = JSON.parse(localStorage.getItem('panier'))
    let prixTotal = 0
    let section = document.getElementById("cart__items")
    section.innerHTML = ''
    

    for (let produit of itemsList) {
    //colorP.textContent = produit.couleur
    //displayCartLine(produit)
    fetch (`http://localhost:3000/api/products/${produit.id}`)
    .then ((response) => response.json())
    .then ((data) => {
        data['couleur'] = produit.couleur
        data['qty'] = produit.quantite

        displayCartLine(data)

        prixTotal += data.qty * data.price
        
        let TotalQuantity = document.getElementById("totalQuantity")
        TotalQuantity.textContent = itemsList.reduce ((TotalQuantity, produit) => TotalQuantity + produit.quantite, 0);
        

        let totalPrice = document.getElementById('totalPrice')
        totalPrice.textContent = prixTotal

    
    })
        
        //ajouter au qty total et prix total du panier
    .catch((error) => {
        console.log(error)})

    }
   
}

readPanier()

let form = document.querySelector(".cart__order__form")
form.addEventListener("click", (e) => formulaire(e))

        //'^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 
        //'g'

function formulaire (e) {
    e.preventDefault()

    let prenom = document.querySelector("#firstName").value
    let nom = document.querySelector("#lastName").value
    let address = document.querySelector("#address").value
    let ville = document.querySelector("#city").value
    let mail = document.querySelector("#email").value

    validateFirstName(prenom)
    validateLastName(nom)
    validateAddress(address)
    validateCity(ville)
    validateEmail(mail)
}
    
    // first name

const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
const adresseErrorMsg = document.getElementById("addressErrorMsg");
const cityErrorMsg = document.getElementById("cityErrorMsg");
const emailErrorMsg = document.getElementById("emailErrorMsg");

const regexName = /^[a-z][a-z '-.,]{1,31}$|^$/i;

function validateFirstName(prenom) {
    if (regexName.test(prenom) == false) {
        firstNameErrorMsg.innerHTML = 'le prénom doit contenir entre 1 et 31 caractères, caractères speciaux acceptés (,-.\')'
        return false;
    } else {
        firstNameErrorMsg.innerHTML = ''
        return true;

    }
}

function validateLastName(nom) {
    if (regexName.test(nom) == false) {
        lastNameErrorMsg.innerHTML = 'le nom doit contenir entre 1 et 31 caractères, caractères speciaux acceptés (,-.\')'
        return false;
    } else {
        lastNameErrorMsg.innerHTML = '';
        return true;
    }
    }
    
function validateAddress(address) {
    const regexAddress = /^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+/

    if (regexAddress.test(address) == false && address.length > 2) {
        adresseErrorMsg.innerHTML = 'l\'adresse n\'est pas valide'
        return false;
    } else {
        adresseErrorMsg.innerHTML = '';
        return true;
    }
}

function validateCity(ville) {
  if (regexName.test(ville) == false) {
    cityErrorMsg.innerHTML = 'la ville doit contenir entre 1 et 31 caractères, caractères speciaux acceptés (,-.\')'
    return false;
  } else {
    cityErrorMsg.innerHTML = '';
    return true;
  }
}

function validateEmail(mail) {

const regexMail =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
if (regexMail.test(mail) == false && mail.length > 2 ) {
    emailErrorMsg.innerHTML = 'l\'adresse e-mail n\'est pas correct'
    return false;
} else {
    emailErrorMsg.innerHTML = '';
    return true;
  }
}
    
/*let contact = {
        prenom : prenom,
        nom : nom,
        address : adresse,
        ville : ville,
        mail : mail
    }

*/




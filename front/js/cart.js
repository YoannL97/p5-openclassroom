

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
    deleteParagraphe.addEventListener("click", () => deleteItem(produit))

//    let inputQty = document.createElement("input")
    //type text, ajouter la qty en valeur dans le champ
//    inputQty.addEventListener('change', function () {
        // vérifier qu'on tape pas plus de 100
        //mettre à jour le panier => appel d'une fonction setPanier(avec id, couleur, qty)
//    })

function deleteItem (produit) {
    

}





    
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
        }
        
    }
    // mettre à jour le prix total et la quantité totale
    
    localStorage.setItem('panier', JSON.stringify(cart))
    readPanier()
//    console.log(oldData);


    //newData(produit)
}

/*function newData (produit) {
    console.log(produit);
    //let newItem = JSON.stringify(item)
    //localStorage.setItem(produit.id, newItem)
}
*/




//function setPanier(id, couleur, qty) {
    //mettre à jour le contenu
    //lecture du panier => appell d'un fonction
//}

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
         

        console.log(prixTotal);
    
    })
        
        //ajouter au qty total et prix total du panier
    .catch((error) => {
        console.log(error)})

    }
   
}

readPanier()






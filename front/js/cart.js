
function displayCartLine(toto) {
    console.log(toto)
    let section = document.getElementById("cart__items")
    let article = document.createElement("article")
    article.className = "cart__item"
    section.appendChild(article)

    let divImage = document.createElement("div")
    divImage.className = "cart__item__img"
    article.appendChild(divImage)


    let imgImage = document.createElement("img")
    divImage.appendChild(imgImage)
    imgImage.src = toto.imageUrl


    let itemsContentClass = document.createElement("div")
    itemsContentClass.className = "cart__item__content"
    article.appendChild(itemsContentClass)

    let itemsContentDescription = document.createElement("div")
    itemsContentDescription.className = "cart__item__content__description"
    itemsContentClass.appendChild(itemsContentDescription)

    let titreH2 = document.createElement("h2")
    itemsContentDescription.appendChild(titreH2)

    let colorP = document.createElement("p")
    colorP.textContent = toto.couleur
    itemsContentDescription.appendChild(colorP)

    let priceP = document.createElement("p")
    itemsContentDescription.appendChild(priceP)

    let contentSetting = document.createElement("div")
    contentSetting.className = "cart__item__content__settings"
    article.appendChild(contentSetting)

    let contentQuantity = document.createElement("div")
    contentQuantity.className = "cart__item__content__settings__quantity"
    contentSetting.appendChild(contentQuantity)

    let quantityP = document.createElement("p")
    contentQuantity.appendChild(quantityP)
}



let itemsList = JSON.parse(localStorage.getItem('panier'))

for (let produit of itemsList) {
//colorP.textContent = produit.couleur
console.log(produit.id)
//displayCartLine(produit)
fetch (`http://localhost:3000/api/products/${produit.id}`)
.then ((response) => response.json())
.then ((data) => {
    data['couleur'] = produit.couleur
    data['qty'] = produit.quantité
    displayCartLine(data)})
.catch((error) => {
    console.log(error)})

}










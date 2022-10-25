
let nbrItems = localStorage.length
for (let i = 0; i < nbrItems ; i++ ) {
    let items = localStorage.getItem(localStorage.key(i))
    let itemsobjet = JSON.parse(items)
    


}





let section = document.getElementById("cart__items")
let article = document.createElement("article")
article.className = "cart__item"
section.appendChild(article)

let divImage = document.createElement("div")
divImage.className = "cart__item__img"
article.appendChild(divImage)

let imgImage = document.createElement("img")
divImage.appendChild(imgImage)


let itemsContentClass = document.createElement("div")
itemsContentClass.className = "cart__item__content"
article.appendChild(itemsContentClass)


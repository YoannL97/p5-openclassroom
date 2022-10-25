fetch ("http://localhost:3000/api/products")
.then ((res) => res.json())
.then ((data) => addproducts(data))

function addproducts(produits) {
    let items = document.getElementById("items")

    for ( let element in produits) {

        let link = document.createElement("a")
        items.appendChild(link)

        let id = produits[element]._id
        link.href = "./product.html?id=" + id
        
        let articleBox = document.createElement("article")
        link.appendChild(articleBox)
    
        let image = document.createElement("img")
        image.src = produits[element].imageUrl
        image.alt = produits[element].altTxt
        articleBox.appendChild(image)

        let titre = document.createElement("h3")
        titre.innerHTML = produits[element].name
        titre.className = "productName"
        articleBox.appendChild(titre)
        
        let paragraphe = document.createElement("p")
        paragraphe.innerHTML = produits[element].description
        paragraphe.className = "productDescription"
        articleBox.appendChild(paragraphe)
        
}
console.log (addproducts)
console.log (produits)
console.log (items)
}
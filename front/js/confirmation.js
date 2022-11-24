const idNumber = window.location.search
const urlparam = new URLSearchParams(idNumber)
const id = urlparam.get("id")

document.getElementById('orderId').innerHTML = id;
let elinput = document.querySelector(".text")
let ellist = document.querySelector(".list")
let elform = document.querySelector(".form")


let array = JSON.parse(window.localStorage.getItem("lastname")) || [];

elform.addEventListener("submit", function (evt) {
  evt.preventDefault()
  let inputValue = elinput.value;
  
  let obj = {
    id: array.length + 1,
    name: inputValue
  }
  if (inputValue !== "") {
    array.push(obj)
  }

  adds(array)
  window.localStorage.setItem("lastname", JSON.stringify(array));
})

adds(array)

function adds(arr) {
  ellist.innerHTML = "";

  arr.forEach(function (item ) {
    let items = document.createElement("li")
    let tex = document.createElement("span")
    let number = document.createElement("span")
    
    items.classList.add("list-unstyled", "px-4", "py-2", "alert-success", "mt-3", "border", "border-success", "border-4", "border-start-0","w-50", "border-end-0", "rounded-pill","mx-auto")
    tex.classList.add("ms-2","text-success")
    number.classList.add("text-success","fw-bold",)
    
    
    number.textContent = item.id;
    tex.textContent = item.name;
    
    items.appendChild(number)
    items.appendChild(tex)
    ellist.appendChild(items)
      

  })
}

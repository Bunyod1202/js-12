const elinput = document.querySelector(".text")
const ellist = document.querySelector(".list")
const elform = document.querySelector(".form")
const elall = document.querySelector(".all")
const elfalse = document.querySelector(".false")
const eltrue = document.querySelector(".true")
const clistAll = document.querySelector(".clist-all")
const deliteList = document.querySelector(".delitelist")
const clistFalse = document.querySelector(".clist-false")
const clistTrue = document.querySelector(".clist-true")
let editTitle =null
let editInput =null
let editIgroup =null
let editadd = null
let deliteItem;
const elSearchForm = document.querySelector(".forms")
const elSearchinput = document.querySelector(".search-input")




const elTemplateList = document.querySelector(".template-list").content
var fragment = new DocumentFragment();

const array = JSON.parse(window.localStorage.getItem("lastname")) || [];

elform.addEventListener("submit", function (evt) {
  evt.preventDefault()
  const inputValue = elinput.value;
  
  let obj = {
    id: array.length > 0 ? array[array.length -1].id+1 :1,
    name: inputValue,
    chek: false
  }
  if (inputValue !== "") {
    array.push(obj)
  }

  adds(array,ellist,"delite")
  count(array)
  window.localStorage.setItem("lastname", JSON.stringify(array));
})

adds(array,ellist,"delite")

function adds(arr,ellist ,delbtn) {
  ellist.innerHTML = "";

  arr.forEach(function (item) {
    let clonedTemplate = elTemplateList.cloneNode(true)
    clonedTemplate.querySelector(".nmber").textContent = item.id
    clonedTemplate.querySelector(".title").textContent = item.name
    editTitle = clonedTemplate.querySelector(".title")

  clonedTemplate.querySelector(".itms").dataset.idItm = item.id
  clonedTemplate.querySelector(".delited").dataset.idBtn = item.id
  clonedTemplate.querySelector(".chceck").dataset.idcheck = item.id
  clonedTemplate.querySelector(".btnedit").dataset.idedit = item.id
    clonedTemplate.querySelector(".edit-input").dataset.edinid = item.id
    clonedTemplate.querySelector(".delited").textContent = delbtn
  editInput = clonedTemplate.querySelector(".edit-input")
  editIgroup = clonedTemplate.querySelector(".igroup")
  editadd = clonedTemplate.querySelector(".add")
 

if (item.chek) {
     clonedTemplate.querySelector(".chceck").checked = true  ;
   clonedTemplate.querySelector(".title").style.textDecoration = 'line-through'
  }
      
    fragment.append(clonedTemplate)
  })
  ellist.appendChild(fragment)


  elinput.value = ""
}

dellfunction(ellist)

function dellfunction(ellist) {
	ellist.addEventListener("click", (evt) => {
	    
	  if (evt.target.matches(".delited")) {
      let buttonId = Number(evt.target.dataset.idBtn);
  
      let items = array.findIndex(item => item.id == buttonId);
      deliteItem = array.filter(itm => itm.id == buttonId);
// console.log(deliteItem);
      setTimeout(function () {
        adds(deliteItem,deliteList,"reset")
        setTimeout(function () {
          deliteList.innerHTML =""
        },5000)
      },0)
      array.splice(items, 1);
      window.localStorage.setItem("lastname", JSON.stringify(array));
      adds(array ,ellist,"delite")
      count(array)
    };
    if (evt.target.matches(".chceck")) {
      let inputId = Number(evt.target.dataset.idcheck);
      let cek = array.find(item => item.id == inputId)
      cek.chek = !cek.chek;
      window.localStorage.setItem("lastname", JSON.stringify(array));
      adds(array,ellist,"delite")
      count(array)
    };
	  if (evt.target.matches(".btnedit")) {
   
      let edit = Number(evt.target.dataset.idedit)
      let res = array.find(itme => itme.id == edit)

      let editin = evt.target.parentElement.parentElement.childNodes;
      let eldiv = editin[1].childNodes[5];
      let elText = editin[1].childNodes[3];
      let elBtn = editin[1].childNodes[5].childNodes[3];
      let elinput = editin[1].childNodes[5].childNodes[1];

      console.log(res);
      elinput.value = res.name  
      
      elBtn.addEventListener("click", function () {
        eldiv.classList.add("d-none");
        elText.classList.remove("d-none");
       res.name = elinput.value
       window.localStorage.setItem("lastname", JSON.stringify(array));
       adds(array,ellist,"delite")
       count(array)
      }) 
      eldiv.classList.remove("d-none") 
      elText.classList.add("d-none") 
    //  console.log(editTitle.textContent);
    }
	});
}

function count(arr) {
  elall.textContent = arr.length
  
  let completeTrue = arr.filter(itm => itm.chek === true);
  eltrue.textContent = completeTrue.length
  window.localStorage.setItem("lastname", JSON.stringify(array));

  let completeFalse = arr.filter(itm => itm.chek === false);
  elfalse.textContent = completeFalse.length
  window.localStorage.setItem("lastname", JSON.stringify(array));
  
  if (Number(elall.textContent) > 0) {
    clistAll.style.boxShadow = "0 0 15px 5px green"
  } else {
    clistAll.style.boxShadow = "0 0 15px 5px red"
  }
  if (Number(eltrue.textContent) > 0) {
    clistTrue.style.boxShadow = "0 0 15px 5px green"
  } else {
    clistTrue.style.boxShadow = "0 0 15px 5px red"
  }
  if (Number(elfalse.textContent) > 0) {
    clistFalse.style.boxShadow = "0 0 15px 5px green"
  } else {
    clistFalse.style.boxShadow = "0 0 15px 5px red"
  }


  clistAll.addEventListener("click", function () {
    adds(array,ellist,"delite")
  })
  clistTrue.addEventListener("click", function () {
    adds(completeTrue,ellist,"delite")
  })
  clistFalse.addEventListener("click", function () {
    adds(completeFalse,ellist,"delite")
  })

}
count(array)


elSearchForm.addEventListener("keyup", function (evt) {
  evt.preventDefault()
  let inputsearch = elSearchinput.value.toLowerCase()
  let searchbtn = array.filter(itm => {
    return itm.name.toLowerCase().includes(inputsearch)
  })
  console.log(searchbtn);
  adds(searchbtn,ellist,"delite")
})

deliteList.addEventListener("click", function (evt) {
  if (evt.target.matches(".delited")) {
    let resetid = evt.target.dataset.idBtn;
    let resetItem = deliteItem.find(itm => itm.id == resetid)
    array.push(resetItem)
    deliteList.innerHTML = ""
    adds(array,ellist,"delite")
  }
})



// add js for flipping card when click

let card = document.querySelectorAll(".card")

Array.from(card).forEach(c=>{
 c.addEventListener("click",()=>{
    c.classList.add('flipped');
})
})
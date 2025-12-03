

// getting random img
let imgs = ["assets/pic1.jpg","assets/pic1.jpg","assets/pic2.jpg","assets/pic2.jpg","assets/pic3.jpg","assets/pic3.jpg","assets/pic4.jpg","assets/pic4.jpg","assets/pic5.jpg","assets/pic5.jpg","assets/pic6.jpg","assets/pic6.jpg"]

// making cards shuffle
for (let i = imgs.length-1; i>0; i--) {
    let j = Math.floor(Math.random()*(i+1));
       [imgs[i], imgs[j]] = [imgs[j], imgs[i]]; 
}
// creating cards with random pictures

let game_container = document.querySelector(".game_container");

for (let i = 0; i <=11; i++) {
    
    game_container.insertAdjacentHTML("afterbegin",` <div class="card">
        <div class="inner">
            <div class="front">🍒</div>
            <div class="back"><img src="${imgs[i]}" alt=""></div>
        </div>
    </div>`)
    
}

// add js for flipping card when click

let card = document.querySelectorAll(".card")

Array.from(card).forEach(c=>{
 c.addEventListener("click",()=>{
    c.classList.add('flipped');
})
})

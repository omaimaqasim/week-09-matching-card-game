

// getting random img
let imgs = ["assets/pic1.jpg", "assets/pic1.jpg", "assets/pic2.jpg", "assets/pic2.jpg", "assets/pic3.jpg", "assets/pic3.jpg", "assets/pic4.jpg", "assets/pic4.jpg", "assets/pic5.jpg", "assets/pic5.jpg", "assets/pic6.jpg", "assets/pic6.jpg"]

// making cards shuffle
for (let i = imgs.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [imgs[i], imgs[j]] = [imgs[j], imgs[i]];
}
// creating cards with random pictures

let game_container = document.querySelector(".game_container");

for (let i = 0; i <= 11; i++) {

    game_container.insertAdjacentHTML("afterbegin", ` <div class="card">
        <div class="inner">
            <div class="front">🍒</div>
            <div class="back"><img src="${imgs[i]}" alt=""></div>
        </div>
    </div>`)

}

// add js for flipping card when click

let card = document.querySelectorAll(".card")
let count_clicked = 0
let lockboard = false;
let cards_img = []
let past_picname
let current_pic
let click_cards = []
let track_moves = 0
let track_matches = 0
let total_pair = imgs.length / 2;
let moves_div = document.querySelector(".moves_check p")
let matches_div = document.querySelector(".matches_tracking p")
let restart_btn = document.querySelector(".restart");

// updating matches 
matches_div.innerHTML = `${track_matches}/${total_pair}`

Array.from(card).forEach(c => {
    c.addEventListener("click", () => {
        if (lockboard) return;
        // this prevent multiple click on same card
        if (c.classList.contains("flipped")) {
            return
        }

        // saving element in array
        click_cards.push(c)



        c.classList.add('flipped');
        count_clicked++

        // logic for checking matching card
        let img_src = c.querySelector(".back img").src.split("/")
        let pic_name = img_src[img_src.length - 1]
        cards_img.push(pic_name)


        // logic of two card click
        if (count_clicked === 2) {
            [past_picname, current_pic] = cards_img

            track_moves++
            moves_div.innerHTML = track_moves;


            setTimeout(() => {

                if (past_picname === current_pic) {
                    // debuge the error when you got one match then after that if you click
                    // unmatch one it does no flip
                    count_clicked = 0
                    click_cards = []
                    lockboard = false;
                    track_matches++
                    matches_div.innerHTML = `${track_matches}/${total_pair}`

                }
                else {
                    count_clicked = 0
                    console.log(click_cards)
                    click_cards.forEach(card => card.classList.remove("flipped"))
                    //  update click cards

                    click_cards = []
                    lockboard = false;
                }
            }, 1000);


            //   update cards_img array for another round
            cards_img = []
            // showing win message
            // soon hcek if this working correct or not
            if (total_pair===track_matches) {
                setTimeout(() => {
                    alert(`🎉 You won in ${track_moves} moves!`);
                    lockboard = true;
                }, 300);
                
            }


        }
        
        
        
        
        

    })

    
})


restart_btn.addEventListener("click",()=>{
    // for reloading the website
    location.reload()
})
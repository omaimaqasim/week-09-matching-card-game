// ================================
// Images list (pairs)
// ================================
let imgs = [
    "assets/pic1.jpg", "assets/pic1.jpg",
    "assets/pic2.jpg", "assets/pic2.jpg",
    "assets/pic3.jpg", "assets/pic3.jpg",
    "assets/pic4.jpg", "assets/pic4.jpg",
    "assets/pic5.jpg", "assets/pic5.jpg",
    "assets/pic6.jpg", "assets/pic6.jpg"
];

// ================================
// Shuffle cards (Fisher–Yates)
// ================================
for (let i = imgs.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [imgs[i], imgs[j]] = [imgs[j], imgs[i]];
}

// ================================
// Create cards dynamically
// ================================
let game_container = document.querySelector(".game_container");

for (let i = 0; i <= 11; i++) {
    game_container.insertAdjacentHTML(
        "afterbegin",
        `<div class="card">
            <div class="inner">
                <div class="front">🍒</div>
                <div class="back">
                    <img src="${imgs[i]}" alt="">
                </div>
            </div>
        </div>`
    );
}

// ================================
// Game state variables
// ================================
let card = document.querySelectorAll(".card");
let count_clicked = 0;
let lockboard = false;
let cards_img = [];
let past_picname;
let current_pic;
let click_cards = [];

let track_moves = 0;
let track_matches = 0;
let total_pair = imgs.length / 2;

// ================================
// DOM elements
// ================================
let moves_div = document.querySelector(".moves_check p");
let matches_div = document.querySelector(".matches_tracking p");
let restart_btn = document.querySelector(".restart");
let win_cont = document.querySelector(".win_cont")
let win_cont_para = document.querySelector(".win_cont p")
let play_again = document.querySelector(".win_cont .play_again")


// Initial matches display
matches_div.innerHTML = `${track_matches}/${total_pair}`;

// ================================
// Card click logic
// ================================
Array.from(card).forEach(c => {
    c.addEventListener("click", () => {

        if (lockboard) return;
        if (c.classList.contains("flipped")) return;

        // Store clicked card
        click_cards.push(c);

        // Flip card
        c.classList.add("flipped");
        count_clicked++;

        // Get image name
        let img_src = c.querySelector(".back img").src.split("/");
        let pic_name = img_src[img_src.length - 1];
        cards_img.push(pic_name);

        // ============================
        // When two cards are clicked
        // ============================
        if (count_clicked === 2) {

            [past_picname, current_pic] = cards_img;

            track_moves++;
            moves_div.innerHTML = track_moves;

            setTimeout(() => {

                if (past_picname === current_pic) {

                    count_clicked = 0;
                    click_cards = [];
                    lockboard = false;

                    track_matches++;
                    matches_div.innerHTML = `${track_matches}/${total_pair}`;
                    // ============================
                    // Win condition check
                    // ============================
                    if (total_pair === track_matches) {
                            win_cont_para.innerHTML = `moves: ${moves_div.innerHTML}`
                          win_cont.classList.remove("hidden");
                            lockboard = true;
                     
                    }

                } else {

                    count_clicked = 0;
                    console.log(click_cards);

                    click_cards.forEach(card =>
                        card.classList.remove("flipped")
                    );

                    click_cards = [];
                    lockboard = false;
                }

            }, 1000);

            // Reset for next round
            cards_img = [];
            lockboard = true;

        }
    });
});

// ================================
// Restart game
// ================================
restart_btn.addEventListener("click", () => {
    location.reload();
});

play_again.addEventListener("click", () => {
    location.reload();
});

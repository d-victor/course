// var card = document.getElementById('active_click');
// card.addEventListener('click', function () {
//     card.classList.add('active');
// });
var cards = document.getElementsByClassName('about_item');
// console.log(cards);
for (var i = 0; i < cards.length; i++) {
    cards[i].addEventListener('click', function () {
        var card = cards[0];
        while (card) {
            if (card.tagName === "DIV") {
                card.classList.remove("active");
            }
            card = card.nextSibling;
        }
        this.classList.add("active");
    })
}
// https://www.youtube.com/watch?v=RBB2N341tr0
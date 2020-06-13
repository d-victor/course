var cards = document.getElementsByClassName('about_item');
for(var i = 0; i < cards.length; i++){
    cards[i].addEventListener('click', function(){
        var active = document.getElementsByClassName("active");
        if(active.length > 0){
            active[0].className = active[0].className.replace(" active", "");
        }
        this.className += " active"
    });
}
var toggleBox = document.getElementsByClassName('toggle__accordeon');
for(var j = 0; j < toggleBox.length; j++){
    toggleBox[j].addEventListener('click', function(){
        this.classList.toggle('active__box');
        var item = this.nextElementSibling;
        item.classList.toggle('active__toggle');
        if(item.style.maxHeight){
            item.style.maxHeight = null;
        } else {
            item.style.maxHeight = 180 + "px";
            item.classList.add('active__toggle');
        }
    });
}
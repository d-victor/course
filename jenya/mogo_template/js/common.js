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
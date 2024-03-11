
// Change the viewport value based on screen.width
let threshhold = 585;

if (document.title == 'Guess The Map'){
    threshhold = 730;
}

if (document.title == 'Valdle'){
    threshhold = 525;
}

var viewport_set = function() {
    if ( window.innerWidth > threshhold ){
        document.body.style.zoom = 100 + "%";
    }
    else{
        let newZoom = 100 * window.innerWidth / (threshhold) 
        document.body.style.zoom = newZoom + "%";
    }
}

viewport_set();

// Set the correct viewport after device orientation change or resize
window.onresize = function() { 
    if (window.screen.availWidth > 1280){
        viewport_set(); 
    }
}

// document.body.style.visibility = 'hidden'
let gif = $('<img src="static/images/loading.gif" id="loading">')
$('body').prepend(gif)


document.body.onload = function(){
    gif.css('visibility', 'hidden')
    document.body.style.visibility = 'visible'
}

document.addEventListener("DOMContentLoaded", function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      img.setAttribute('loading', 'lazy');
    });
});


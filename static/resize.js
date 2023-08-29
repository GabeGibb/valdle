
// Change the viewport value based on screen.width
let threshhold = 575;

if (document.title == 'Guess The Map'){
    threshhold = 760;
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

// Set the correct viewport value on page load
viewport_set();


// Set the correct viewport after device orientation change or resize
window.onresize = function() { 
    if (window.screen.availWidth > 1280){
        viewport_set(); 
    }
}

// Change the viewport value based on screen.width
var viewport_set = function() {
    if ( window.innerWidth > 500 ){
        // document.body.style.zoom = 100 + "%";
    }
    else{
        let newZoom = 100 * window.innerWidth / (500) 
        document.body.style.zoom = newZoom + "%";
    }
}

// Set the correct viewport value on page load
viewport_set();

// Set the correct viewport after device orientation change or resize
window.onresize = function() { 
	viewport_set(); 
}
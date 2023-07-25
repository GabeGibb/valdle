let url = "https://valorant-api.com/v1/bundles";


let bundleUrl = window.location.href + '/bundleOfDay';
console.log(bundleUrl)

jQuery.ajaxSetup({async:false});
$.get(bundleUrl, function(data, status){ //url defined in current webpage js file
    console.log(data)
    randIndex = data['randIndex']
});


function curGamemode(){
    //WHAT TO DO ON LOAD
    setImage();
}
function displayPartTwo(){
    //WHAT TO DO ON WINNING FIRST MODE
    winConfetti();
}

function setImage(){
    guessImage.src = dataList[randIndex]['displayIcon'];
}

function modeWrongActions(){
    
}
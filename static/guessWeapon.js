let url = "https://valorant-api.com/v1/weapons";


let weaponUrl = window.location.href + '/weaponOfDay';
console.log(weaponUrl)

jQuery.ajaxSetup({async:false});
$.get(weaponUrl, function(data, status){ //url defined in current webpage js file
    console.log(data)
    randIndex = data['randIndex']
});


function curGamemode(){
    // dataList = dataList[randIndex]['skins']
    setImage();
}
function displayPartTwo(){
    //WHAT TO DO ON WINNING FIRST MODE

    // winConfetti();
}

function setImage(){
    guessImage.src = dataList[randIndex]['displayIcon'];
}

function modeWrongActions(){
    
}
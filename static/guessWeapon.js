let url = "static/weapons.json";


let weaponUrl = window.location.href + '/weaponOfDay';
console.log(weaponUrl)

let skinIndex;
jQuery.ajaxSetup({async:false});
$.get(weaponUrl, function(data, status){ //url defined in current webpage js file
    console.log(data)
    randIndex = data['weaponRandIndex'];
    skinIndex = data['skinRandIndex'];
});


function curGamemode(){
    // dataList = dataList[randIndex]['skins']
    setImage();
}
function displayPartTwo(){
    //WHAT TO DO ON WINNING FIRST MODE
    // dataList = dataList[randIndex]['']
    // randIndex = data['skinRandIndex'];
    // makeButtons();
    winConfetti();
}

function setImage(){
    guessImage.src = dataList[randIndex]['skins'][skinIndex]['displayIcon'];
}

function modeWrongActions(){
    
}
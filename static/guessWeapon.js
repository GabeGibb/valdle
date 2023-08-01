let url = "static/weapons.json";

let weaponUrl = window.location.href + '/weaponOfDay';

let dropdownClone = $('#dropdown').clone();

let skinIndex;

// jQuery.ajaxSetup({async:false});
$.get(weaponUrl, function(data, status){ //url defined in current webpage js file
    loadTemplate(url, false);
    console.log(data)
    randIndex = data['weaponRandIndex'];
    skinIndex = data['skinRandIndex'];
});


function curGamemode(){
    setImage();
}

let secondPartStarted = false;
function displayPartTwo(){
    if (secondPartStarted){
        winConfetti();
    }else{
        guessGunSkinTime();
        secondPartStarted = true;
    }
}

function guessGunSkinTime(){
    dataList = dataList[randIndex]['skins'];
    randIndex = skinIndex;

    animateFullImage();
    
    dropdownClone.appendTo('#gameArea');
    $('#searchInput').attr('placeholder','Search Weapon Skin..');

    $('#fullListOfGuesses').attr('id', 'pastListOfGuesses');

    $('#weaponSkinPrompt').removeAttr('hidden');
    jQuery('<div>', {
        id:'fullListOfGuesses'
    }).appendTo($('#gameArea'));

    makeButtons();

    setTimeout(() => {
        document.getElementById("userInputDiv").scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
      }, 500);

}

function setImage(){
    let imgSrc = dataList[randIndex]['skins'][skinIndex]['displayIcon']
    if (imgSrc == null){
        console.log( dataList[randIndex]['skins'][skinIndex])
        console.log(dataList)
        imgSrc = dataList[randIndex]['skins'][skinIndex]['displayIcon']
    }
    guessImage.src = dataList[randIndex]['skins'][skinIndex]['displayIcon'];
    zoomOutMap();
}

function modeWrongActions(){
    zoomOutMap();
}

let insetValue = 30;

// function decreaseInset(){
//     setTimeout(() => {
//         document.getElementById("guessImage").style.clipPath  = 'inset(' + insetValue + '%)';
//         insetValue -= 0.01
//     }, 10);
// }

function animateFullImage(){
    document.getElementById("guessImage").style.clipPath = 'inset(' + 0 + '%)';
    // while(insetValue >= 0){
    //     decreaseInset();
        
    // }
}

function setScaleToInset() {
    // let mapImg = document.getElementById("guessImg");
    // let small = mapSize * (100 - (2 * insetValue)) / 100
    // let big = mapSize;
    // mapImg.style.scale = big / small
}

function zoomOutMap() {
    if (insetValue <= 0) {
        return;
    }
    insetValue -= 2.5;
    let guessImg = document.getElementById("guessImage");
    console.log(guessImg)
    guessImg.style.clipPath = 'inset(' + insetValue + '%)';
    setScaleToInset();
}

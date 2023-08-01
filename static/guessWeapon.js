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
    
    dropdownClone.appendTo('#gameArea');
    $('#searchInput').attr('placeholder','Search Weapon Skin..');

    $('#fullListOfGuesses').attr('id', 'pastListOfGuesses');

    $('#weaponSeparator').removeAttr('hidden');
    jQuery('<div>', {
        id:'fullListOfGuesses'
    }).appendTo($('#gameArea'));

    makeButtons();
}

function setImage(){
    let imgSrc = dataList[randIndex]['skins'][skinIndex]['displayIcon']
    if (imgSrc == null){
        console.log( dataList[randIndex]['skins'][skinIndex])
        console.log(dataList)
        imgSrc = dataList[randIndex]['skins'][skinIndex]['displayIcon']
    }
    guessImage.src = dataList[randIndex]['skins'][skinIndex]['displayIcon'];
}

function modeWrongActions(){
    
}


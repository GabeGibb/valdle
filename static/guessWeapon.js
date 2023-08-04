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
    correctImgSrc = dataList[randIndex]['skins'][skinIndex]['displayIcon'];
    correctName = dataList[randIndex]['skins'][skinIndex]['displayName'];
    setImage();
}

let secondPartStarted = false;
function displayPartTwo(){
    if (secondPartStarted){
        winConfetti();
        createNextPageBox('home');
    }else{
        winConfetti();
        guessGunSkinTime();
        secondPartStarted = true;
    }
}

function guessGunSkinTime(){
    dataList = dataList[randIndex]['skins'];
    randIndex = skinIndex;

    let imgClone = document.getElementsByClassName('guessImageDiv')[0].cloneNode(true)
    imgClone.children[0].style.clipPath = 'inset(' + 0 + '%)';
    document.getElementById('gameArea').appendChild(imgClone)

    dropdownClone.appendTo('#gameArea');
    $('#searchInput').attr('placeholder','Search Weapon Skin..');

    $('#fullListOfGuesses').attr('id', 'pastListOfGuesses');

    $('#weaponSkinPrompt').removeAttr('hidden');
    jQuery('<div>', {
        id:'fullListOfGuesses'
    }).appendTo($('#gameArea'));

    $('#fullListOfGuesses').hide()


    makeButtons(true);

    setTimeout(() => {
        document.getElementById("userInputDiv").scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
        $('#fullListOfGuesses').empty();
        $('#fullListOfGuesses').show()
      }, 500);

      

}

function setImage(){
    guessImage.src = dataList[randIndex]['skins'][skinIndex]['displayIcon']
    zoomOutMap();
}

function modeWrongActions(){
    zoomOutMap();
}

let insetValue = 35;


function zoomOutMap() {
    if (insetValue <= 0) {
        return;
    }
    insetValue -= 2.5;
    // let guessImg = document.getElementById("guessImage");
    guessImage.style.clipPath = 'inset(' + insetValue + '%)';
}

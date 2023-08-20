function getLanguageCookie() {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; googtrans=`);
    return parts.pop().split(';').shift().substring(6);
}
let url = "static/api/weapons/weapons_" + getLanguageCookie() + ".json";

let weaponUrl = window.location.href + '/weaponOfDay';

let dropdownClone = $('#dropdown').clone();
let skinIndex;

// jQuery.ajaxSetup({async:false});
$.get(weaponUrl, function(data, status){ //url defined in current webpage js file
    loadTemplate(url, false, 'weapon');
    console.log(data)
    randIndex = data['weaponRandIndex'];
    skinIndex = data['skinRandIndex'];
});

function addTries(tries){
    templateAddTries(tries);
}

function doP2Guess(attempt){
    // if (attempt != ''){
    //     isCorrectOption(attempt);
    // }
}

function curGamemode(){
    correctImgSrc = dataList[randIndex]['skins'][skinIndex]['displayIcon'];
    correctName = dataList[randIndex]['displayName']
    setImage();

}


let secondPartStarted = false;
function displayPartTwo(){
    if (secondPartStarted){
        winConfetti();
        partTwoWin(dataList[skinIndex]['displayName']);
    }else{
        winConfetti();
        guessGunSkinTime();
        secondPartStarted = true;
    }
}

function guessGunSkinTime(){
    createNextPageBox('quote');
    dataList = dataList[randIndex]['skins'];
    randIndex = skinIndex;

    $('#weaponSkinPrompt').appendTo('#partTwoDiv')
    $('#weaponSkinPrompt').show()
    dropdownClone.appendTo('#partTwoDiv');
    $('#searchInput').attr('placeholder','Search Weapon Skin..');

    $('#fullListOfGuesses').attr('id', 'pastListOfGuesses');

    $('#weaponSkinPrompt').removeAttr('hidden');
    jQuery('<div>', {
        id:'fullListOfGuesses'
    }).appendTo($('#partTwoDiv'));

    $('#fullListOfGuesses').hide()


    makeButtons(false);

    setTimeout(() => {
        document.getElementById("userInputDiv").scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
        $('#fullListOfGuesses').empty();
        $('#fullListOfGuesses').show()
        addEnter();
        secondPartFilter = true;
        filterFunction();
      }, 500);
    
      

}

function setImage(){
    guessImage.src = dataList[randIndex]['skins'][skinIndex]['displayIcon']
    zoomOutMap();
}

function modeWrongActions(){
    if (secondPartStarted){
        partTwoLose( dataList[skinIndex]['displayName']);
    }else{
        zoomOutMap();
    }
}

let insetValue = 30;

let blurVal = 20;

function zoomOutMap() {
    if (insetValue <= 0) {
        return;
    }
    insetValue -= 2.5;
    // let guessImg = document.getElementById("guessImage");
    guessImage.style.clipPath = 'inset(0 ' + insetValue + '% 0)';
    if (blurVal < 0){
        return;
    }
    guessImage.style.filter = "blur(" + blurVal + "px)";
    blurVal -= 2
    
}


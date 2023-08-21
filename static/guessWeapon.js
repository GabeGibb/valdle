let url = "static/api/weapons/weapons_" + getLanguageCookie() + ".json";
let weaponUrl = window.location.href + '/weaponOfDay';
let dropdownClone = $('#dropdown').clone();
let skinIndex;

// jQuery.ajaxSetup({async:false});
$.get(weaponUrl, function(data, status){ //url defined in current webpage js file
    loadTemplate(url, false, 'weapon', data['dayId']);
    console.log(data)
    randIndex = data['weaponRandIndex'];
    skinIndex = data['skinRandIndex'];
});

function addTries(tries){
    templateAddTries(tries);
}

function doP2Guess(attempt){
    setTimeout(() => {
        if (attempt != ''){
            isCorrectOption(attempt);
        }
    }, 500);
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
        document.getElementById("nextPageBox").scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
        $('#fullListOfGuesses').empty();
        $('#fullListOfGuesses').show()
        addEnter();
        secondPartFilter = true;
        filterFunction();
      }, 500);
    
      

}

// Pixelation

let blurFactor = 50; // higher blurFactor means less pixels
var pixelate; // class that houses the pixel functions and images

function setImage(){
    guessImage.src = dataList[randIndex]['displayIcon']; // Defines guessImage image
    var image = document.querySelector('#guessImage');
    pixelate = new Pixelate(image, blurFactor);
    pixelate.initialLoadIn();
}

function modeWrongActions(){
    if (secondPartStarted){
        partTwoLose( dataList[skinIndex]['displayName']);
    }else{
        if (blurFactor == 0) {return;}
        blurFactor -= 5;
        if (blurFactor != 0) {
            pixelate.updateBlurFactor(blurFactor);
        }
        else { // Pixelated image now updates to original unpixelated image
            pixelate.turnIntoOriginalImage();
        }
    }
}
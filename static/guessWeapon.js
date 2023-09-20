let url = "static/api/weapons/weapons_" + getLanguageCookie() + ".json";
let weaponUrl = window.location.href + '/weaponOfDay';
let dropdownClone = $('#dropdown').clone();
let skinIndex;

// jQuery.ajaxSetup({async:false});
$.get(weaponUrl, function(data, status){ //url defined in current webpage js file
    loadTemplate(url, false, 'weapon', data['dayId']);
    // console.log(data)
    randIndex = data['skinRandIndex'];
    gunIndex = data['weaponRandIndex'];
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
    dataList = dataList[gunIndex]['skins'];
    correctImgSrc = dataList[randIndex]['displayIcon'];

    for(let i=0; i < dataList[randIndex]['levels'].length; i++){
        if (dataList[randIndex]['levels'][i]['displayIcon'] != null){
            correctImgSrc = dataList[randIndex]['levels'][i]['displayIcon']
            break;
        }
    }

    correctName = dataList[randIndex]['displayName']

    $("#weaponGuessImage").attr("src", correctImgSrc);
}

function modeWrongActions(){}

function displayPartTwo(){
    winConfetti();
    createNextPageBox('quote');
    $('#correctImg').attr('id', 'correctWeaponImg')
}

// let secondPartStarted = false;
// function displayPartTwo(){
//     if (secondPartStarted){
//         partTwoWin(dataList[skinIndex]['displayName']);
//     }else{
//         winConfetti();
//         guessGunSkinTime();
//         secondPartStarted = true;
//     }
// }

// function guessGunSkinTime(){
//     createNextPageBox('quote');
//     dataList = dataList[randIndex]['skins'];
//     randIndex = skinIndex;

//     $('#weaponSkinPrompt').appendTo('#partTwoDiv')
//     $('#weaponSkinPrompt').show()
//     dropdownClone.appendTo('#partTwoDiv');
//     $('#searchInput').attr('placeholder','Search Weapon Skin..');

//     $('#fullListOfGuesses').attr('id', 'pastListOfGuesses');

//     $('#weaponSkinPrompt').removeAttr('hidden');
//     jQuery('<div>', {
//         id:'fullListOfGuesses'
//     }).appendTo($('#partTwoDiv'));

//     $('#fullListOfGuesses').hide()
//     $('#optionNames').hide();

//     makeButtons(false);

//     $('#fullListOfGuesses').empty();
//     $('#fullListOfGuesses').show()
//     addEnter();
//     secondPartFilter = true;
//     filterFunction();
// }

// // Pixelation

// let blurFactor = 50; // higher blurFactor means less pixels
// var pixelate; // class that houses the pixel functions and images

// function setImage(){
//     $("#guessImage").css("visibility", "hidden");
//     guessImage.src = correctImgSrc // Defines guessImage image
//     var image = document.querySelector('#guessImage');
//     pixelate = new Pixelate(image, blurFactor);
//     pixelate.initialLoadIn();
// }

// function modeWrongActions(){
//     if (secondPartStarted){
//         partTwoLose( dataList[skinIndex]['displayName']);
//     }else{
//         // console.log(blurFactor)
//         if (blurFactor <= 0) {return;}
//         blurFactor -= 5;
//         if (blurFactor > 0) {
//             pixelate.updateBlurFactor(blurFactor);
//         }
//         else { // Pixelated image now updates to original unpixelated image
//             pixelate.updateBlurFactor(1);
//         }
//     }
// }
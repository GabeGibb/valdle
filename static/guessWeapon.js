let url = "static/api/weapons/weapons_" + getLanguageCookie() + ".json";
let weaponUrl = window.location.href + '/weaponOfDay';
let dropdownClone = $('#dropdown').clone();
let skinIndex;
audioLength = 500;

// jQuery.ajaxSetup({async:false});
$.get(weaponUrl, function(data, status){ //url defined in current webpage js file
    loadTemplate(url, false, 'weapon', data['dayId']);
    // console.log(data)
    // randIndex = data['skinRandIndex'];
    skinIndex = data['skinRandIndex'];
    randIndex = data['weaponRandIndex'];

});



function addTries(tries){
    templateAddTries(tries);
}

function doP2Guess(attempt){
    if (attempt != ''){
        isCorrectOption(attempt);
    }
}

function curGamemode(){
    makeAudioElement();
    $('#audioContainer').css('display', '');
    addAudioElement("static/audio/gunsounds/" + dataList[randIndex]['displayName'] + ".mp3");

    for(let i=0; i < dataList[randIndex]['skins'][skinIndex]['levels'].length; i++){
        if (dataList[randIndex]['skins'][skinIndex]['levels'][i]['displayIcon'] != null){
            correctImgSrc = dataList[randIndex]['skins'][skinIndex]['levels'][i]['displayIcon']
            break;
        }
    }

    correctName = dataList[randIndex]['displayName']//[randIndex]['displayName']
    correctImgSrc = dataList[randIndex]['skins'][skinIndex]['displayIcon']
}

function modeWrongActions(){
    if (secondPartStarted){
        $('#trueSkinName').text(dataList[skinIndex]['displayName']);
        partTwoLose( dataList[skinIndex]['displayName']);
    }else{
        audioLength += 500;
    }
}


let secondPartStarted = false;
function displayPartTwo(){
    if (secondPartStarted){
        // $('#trueSkinName').text(dataList[skinIndex]['displayName']);
        partTwoWin(dataList[skinIndex]['displayName']);
    }else{
        winConfetti();
        guessGunSkinTime();
        secondPartStarted = true;
    }
}

function guessGunSkinTime(){
    audioLength = 4000;
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
    $('#optionNames').hide();

    makeButtons(false);

    $('#fullListOfGuesses').empty();
    $('#fullListOfGuesses').show()
    addEnter();
    secondPartFilter = true;
    filterFunction();
}

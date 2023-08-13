let url = "static/api/weapons.json";

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


function curGamemode(){
    correctImgSrc = dataList[randIndex]['skins'][skinIndex]['displayIcon'];
    correctName = dataList[randIndex]['displayName']
    setImage();
    cleanWeaponData();
}


function cleanWeaponData(){
    for(let i = 0; i < dataList.length; i++){ //Filter out random and standard weapon themes
        dataList[i]['skins'] = dataList[i]['skins'].filter(item => item['themeUuid'] != '0d7a5bfb-4850-098e-1821-d989bbfd58a8' && item['themeUuid'] != '5a629df4-4765-0214-bd40-fbb96542941f')
    }
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

let insetValue = 35;


function zoomOutMap() {
    if (insetValue <= 0) {
        return;
    }
    insetValue -= 2.5;
    // let guessImg = document.getElementById("guessImage");
    guessImage.style.clipPath = 'inset(' + insetValue + '%)';
}

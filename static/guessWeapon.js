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
    // dataList = dataList[randIndex]['skins']
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
    // randIndex = data['skinRandIndex'];
    dropdownClone.appendTo('#gameArea');

    $('#fullListOfGuesses').attr('id', 'pastListOfGuesses');

    $('#weaponSeparator').removeAttr('hidden');
    jQuery('<div>', {
        id:'fullListOfGuesses'
    }).appendTo($('#gameArea'));

    makeButtons();
}

function setImage(){
    guessImage.src = dataList[randIndex]['skins'][skinIndex]['displayIcon'];
}

function modeWrongActions(){
    
}

{/* <div class="dropdown">
    <div id="userInputDiv">
        <input type="text" placeholder="Search Bundle.." id="searchInput" onfocus="showButtons()" onkeyup="filterFunction()">
        <button id="submit" onclick="validateGuess()">&gt;</button>
    </div>
</div> */}
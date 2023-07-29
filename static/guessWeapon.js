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
    dataList = dataList[randIndex]['skins'][skinIndex];
    randIndex = skinIndex;
    // randIndex = data['skinRandIndex'];
    $('#fullListOfGuesses').attr('id', 'pastListOfGuesses');

    jQuery('<div>', {
        id:'fullListOfGuesses'
    }).appendTo($('#gameArea'));
    // makeButtons();
    // winConfetti();
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
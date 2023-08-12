
let coversLeft = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
let url = "https://valorant-api.com/v1/agents?isPlayableCharacter=true";

let abilityUrl = window.location.href + '/abilityOfDay';
var abilityIndex;
var abilityIcon;

// jQuery.ajaxSetup({async:false});
$.get(abilityUrl, function(data, status){ //url defined in current webpage js file
    loadTemplate(url, true);
    console.log(data)
    randIndex = data['randIndex']
    abilityIndex = data['randAbilityIndex']
});


function curGamemode(){ // Gets called on page load
    createRandAbility(abilityIndex);
    removeRandTile();
    correctImgSrc = dataList[randIndex]["displayIcon"];
    correctName = dataList[randIndex]["displayName"];
}

function removeRandTile(){
    randStartTile = Math.floor(Math.random() * coversLeft.length);
    var name = "#cover" + coversLeft[randStartTile];
    $(name).css({"background-color": "transparent", "border": "transparent"});
    coversLeft.splice(randStartTile, 1);
}

function displayPartTwo(){ //GETS CALLED AFTER FIRST PART IS COMPLETED
    winConfetti();
    revealTiles();
    partTwoDisplay = document.getElementById("partTwoDisplay");

    let whatAbilityNameDiv = document.getElementById("whatName")
    for(i = 0; i < dataList[randIndex]["abilities"].length; i++){ 
        let button = document.createElement('button');
        let currAbility = dataList[randIndex]["abilities"][i]["displayName"];
        button.innerHTML = currAbility; //adds content to button
        button.classList.add("nameInButton");
        button.onclick = function(){
            isCorrectAbilityName(button, currAbility);
        }
        whatAbilityNameDiv.appendChild(button); //appends button to div
    }
    setTimeout(() => {
        partTwoDisplay.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
      }, 500);
    
    createNextPageBox('weapon');
    $('#partTwoDisplay').appendTo('#partTwoDiv');
    $('#partTwoAbilityIcon').attr("src", abilityIcon);
    $("#partTwoDisplay").show();
}


function createRandAbility(abilityIndex){
    var chosenAbility = dataList[randIndex]["abilities"][abilityIndex];
    makeAbilityImage(chosenAbility);
}

function makeAbilityImage(chosenAbility){ // Puts image of ability on webpage
    abilityIcon = chosenAbility["displayIcon"]
    $("#guessImage").attr("src", abilityIcon);
}

function modeWrongActions() {
    removeRandTile();
}


let canGuessAbilityName = true;
function isCorrectAbilityName(button, currAbility){
    if (!canGuessAbilityName){
        return;
    }
    let correctAbilityName = dataList[randIndex]["abilities"][abilityIndex]["displayName"];
    
    if(currAbility == correctAbilityName){
        button.classList.add("correctGuessName")
        whatAbilityNameDiv = document.getElementById("whatName");
        whatAbilityNameDiv.disabled = true;
        
        winConfetti();
        // $('#partTwoEndText').text('Nice!')
        partTwoWin();
    }   
    else{
        button.classList.add("incorrectGuessName")
        // $('#partTwoEndText').text('Better Luck Next Time')
        partTwoLose(correctAbilityName);
    }

    canGuessAbilityName = false;
}

async function revealTiles() {
    while (coversLeft.length > 0) {
        removeRandTile();
        await new Promise(r => setTimeout(r, 500));
    }
}
// const languageList = {
//     "en-US": {
//         "head": "Guess the agent by ability",
//         "bonus": "Bonus: Guess the ability name",
//         "triesCounter": "Tries:",
//         "correctMessage": "Correct!",
//         "incorrectMessage": "Better Luck Next Time\nCorrect Answer: ",
//         "nextValdle": "Next Valdle:",
//         "nextButton": "Guess the Weapon"
//     },
//     "es-ES": {
//         "head": "Adivina el agente por habilidad",
//         "bonus": "Bonus: Adivina el nombre de la habilidad",
//         "triesCounter": "Intentos:",
//         "correctMessage": "¡Correcto!",
//         "incorrectMessage": "Mejor suerte la próxima vez\nRespuesta Correcta: ",
//         "nextValdle": "Siguiente Valdle:",
//         "nextButton": "Adivina el Arma"
//     }
// }

var value;

let coversLeft = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16"]
let url = "static/api/agents_en-US.json";

let abilityUrl = window.location.href + '/abilityOfDay';
var abilityIndex;
var abilityIcon;

// DO NOT TOUCH
// $(document).ready(function() {
//     value = localStorage.getItem("language");
//     url = "static/api/agents_" + value + ".json";
//     $("#header").text(languageList[value]["head"]);
//     $("#bonusPrompt").text(languageList[value]["bonus"]);
// });

// jQuery.ajaxSetup({async:false});
$.get(abilityUrl, function(data, status){ //url defined in current webpage js file
    loadTemplate(url, true, 'ability');
    console.log(data)
    randIndex = data['randIndex']
    abilityIndex = data['randAbilityIndex']
});

function addTries(tries){
    templateAddTries(tries);
}

function doP2Guess(attempt){
    
}

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
    for(i = 0; i < 4; i++){ 
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


    // Tries set to 0, will change after some more implementation of languages
    // $("#numTries").text(languageList[value]["triesCounter"] + " 0");
    // $("#bonusPrompt").text(languageList[value]["bonus"]);
    // $("#nextValdleText").text(languageList[value]["nextValdle"]);
    // $("#nextGameButton").text(languageList[value]["nextButton"]);


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
    persistP2Atempt(currAbility);

    let correctAbilityName = dataList[randIndex]["abilities"][abilityIndex]["displayName"];
    
    if(currAbility == correctAbilityName){
        button.classList.add("correctGuessName")
        whatAbilityNameDiv = document.getElementById("whatName");
        whatAbilityNameDiv.disabled = true;
        
        winConfetti();
        // $('#partTwoEndText').text('Nice!')
        partTwoWin(correctAbilityName);
        $("#partTwoEndText").text(languageList[value]["correctMessage"]);
    }   
    else{
        button.classList.add("incorrectGuessName")
        // $('#partTwoEndText').text('Better Luck Next Time')
        partTwoLose(correctAbilityName);
        $("#partTwoEndText").text(languageList[value]["incorrectMessage"]);
    }

    // Will change above implementations for language soon

    canGuessAbilityName = false;
}

async function revealTiles() {
    while (coversLeft.length > 0) {
        removeRandTile();
        await new Promise(r => setTimeout(r, 500));
    }
}

var randAbility;
let coversLeft = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
let url = "static/agents.json";

let abilityUrl = window.location.href + '/abilityOfDay';

// jQuery.ajaxSetup({async:false});
$.get(abilityUrl, function(data, status){ //url defined in current webpage js file
    loadTemplate(url, true);
    console.log(data)
    randIndex = data['randIndex']
});


function curGamemode(){ // Gets called on page load
    var abilityIndex = randomizeAbilityIndex();
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
    $("#partTwoDisplay").show();

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

}

//----------------

function randomizeAbilityIndex(){
    console.log(randIndex)
    if((dataList[randIndex]["abilities"].length == 5) && (dataList[randIndex]["abilities"][4]["displayIcon"] != null)){
        randAbility = Math.floor(Math.random() * 5)
        return randAbility;
    }
    else{
        randAbility = Math.floor(Math.random() * 4);
        return randAbility;
    }
}



function createRandAbility(abilityIndex){
    var chosenAbility = dataList[randIndex]["abilities"][abilityIndex];
    makeAbilityImage(chosenAbility);
}

function makeAbilityImage(chosenAbility){ // Puts image of ability on webpage
    $("#guessImage").attr("src", chosenAbility["displayIcon"]);
}

function modeWrongActions() {
    removeRandTile();
}


let canGuessAbilityName = true;
function isCorrectAbilityName(button, currAbility){
    if (!canGuessAbilityName){
        return;
    }
    let correctAbilityName = dataList[randIndex]["abilities"][randAbility]["displayName"];
    
    if(currAbility == correctAbilityName){
        button.classList.add("correctGuessName")
        whatAbilityNameDiv = document.getElementById("whatName");
        whatAbilityNameDiv.disabled = true;
        
        winConfetti();
    }
    else{
        button.classList.add("incorrectGuessName")
    }

    canGuessAbilityName = false;
    createNextPageBox('Quote');
}

async function revealTiles() {
    while (coversLeft.length > 0) {
        removeRandTile();
        await new Promise(r => setTimeout(r, 500));
    }
}
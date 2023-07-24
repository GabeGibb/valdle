var randAbility;
let coversLeft = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]

function curGamemode(){ // Gets called on page load
    var abilityIndex = randomizeAbilityIndex();
    createRandAbility(abilityIndex);
    removeRandTile();
}

function removeRandTile(){
    randStartTile = Math.floor(Math.random() * coversLeft.length);
    var name = "#cover" + coversLeft[randStartTile];
    $(name).css({"background-color": "transparent", "border": "transparent"});
    coversLeft.splice(randStartTile, 1);
}

function randomizeAbilityIndex(){ // Randomizes index from 1-4 if 4-ability agent, or 1-5 if 5-ability agent
    if((dataList[randAgent]["abilities"].length == 5) && (dataList[randAgent]["abilities"][4]["displayIcon"] != null)){
        randAbility = Math.floor(Math.random() * 5)
        console.log("randAbility = " + randAbility)
        return randAbility;
    }
    else{
        randAbility = Math.floor(Math.random() * 4);
        return randAbility;
    }
}

function createRandAbility(abilityIndex){ // Gets Ability object from original dataList
    var chosenAbility = dataList[randAgent]["abilities"][abilityIndex];
    makeAbilityImage(chosenAbility);
}

function makeAbilityImage(chosenAbility){ // Puts image of ability on webpage
    $("#guessAbilityImage").attr("src", chosenAbility["displayIcon"]);
}

function modeWrongActions() {
    removeRandTile();
}

function displayPartTwo(){

    revealTiles();
    partTwoDisplay = document.getElementById("partTwoDisplay");
    $("#partTwoDisplay").show();

    let whatAbilityNameDiv = document.getElementById("whatName")
    for(i = 0; i < dataList[randAgent]["abilities"].length; i++){ 
        let button = document.createElement('button');
        let currAbility = dataList[randAgent]["abilities"][i]["displayName"];
        button.innerHTML = currAbility; //adds content to button
        button.classList.add("nameInButton");
        button.onclick = function(){
            isCorrectAbilityName(button, currAbility);
            
        }
        whatAbilityNameDiv.appendChild(button); //appends button to div
    }

    partTwoDisplay.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
}

let canGuessAbilityName = true;
function isCorrectAbilityName(button, currAbility){
    let correctAbilityName = dataList[randAgent]["abilities"][randAbility]["displayName"];
    
    if(currAbility == correctAbilityName && canGuessAbilityName){
        button.classList.add("correctGuessName")
        whatAbilityNameDiv = document.getElementById("whatName");
        whatAbilityNameDiv.disabled = true;
        canGuessAbilityName = false;
        // $('#finalVictoryMessage').text('yippie!');
        
        winConfetti();
        
    }
    else if (canGuessAbilityName){
        button.classList.add("incorrectGuessName")
    }
}

async function revealTiles() {
    while (coversLeft.length > 0) {
        removeRandTile();
        await new Promise(r => setTimeout(r, 500));
    }
}
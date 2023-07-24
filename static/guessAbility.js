//CODE FOR TEMPLATE
let url = "https://valorant-api.com/v1/agents?isPlayableCharacter=true";

function curGamemode(){ //GETS CALLED ON PAGE LOAD
    var abilityIndex = randomizeAbilityIndex();
    createRandAbility(abilityIndex);
}

function displayPartTwo(){ //GETS CALLED AFTER FIRST PART IS COMPLETED
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

    partTwoDisplay.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
}

//----------------

var randAbility; //initialized in randomizeAbilityIndex()

function randomizeAbilityIndex(){
    // console.log(dataList[randIndex]["abilities"].length);
    if((dataList[randIndex]["abilities"].length == 5) && (dataList[randIndex]["abilities"][4]["displayIcon"] != null)){
        randAbility = Math.floor(Math.random() * 5)
        console.log("randAbility = " + randAbility)
        return randAbility;
        
    }
    else{
        randAbility = Math.floor(Math.random() * 4);
        // console.log("randAbility = " + randAbility)
        return randAbility;
    }
}

function createRandAbility(abilityIndex){
    var chosenAbility = dataList[randIndex]["abilities"][abilityIndex];
    console.log(chosenAbility);
    // console.log(dataList[randIndex]["abilities"][abilityIndex]["displayIcon"]);
    makeAbilityImage(chosenAbility);
}

function makeAbilityImage(chosenAbility){
    guessImage.src = chosenAbility["displayIcon"];
}



let canGuessAbilityName = true;
function isCorrectAbilityName(button, currAbility){
    let correctAbilityName = dataList[randIndex]["abilities"][randAbility]["displayName"];
    
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

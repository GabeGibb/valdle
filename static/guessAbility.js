var randAbility; //initialized in randomizeAbilityIndex()
var guessImage = document.getElementById("guessImage");

// $("#partTwoDisplay").hide();
function randomizeAbilityIndex(){
    // console.log(dataList[randAgent]["abilities"].length);
    if((dataList[randAgent]["abilities"].length == 5) && (dataList[randAgent]["abilities"][4]["displayIcon"] != null)){
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
    var chosenAbility = dataList[randAgent]["abilities"][abilityIndex];
    console.log(chosenAbility);
    // console.log(dataList[randAgent]["abilities"][abilityIndex]["displayIcon"]);
    makeAbilityImage(chosenAbility);
}

function makeAbilityImage(chosenAbility){
    guessImage.src = chosenAbility["displayIcon"];
}


function curGamemode(){ //GETS CALLED ON PAGE LOAD
    var abilityIndex = randomizeAbilityIndex();
    createRandAbility(abilityIndex);
}


function displayPartTwo(){
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

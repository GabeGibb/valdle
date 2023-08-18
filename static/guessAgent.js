
let url = "static/api/agents_en-US.json";

let abilityUrl = window.location.href + '/agentOfDay';

let genderMap = {
    "Gekko": "Male",
    "Fade": "Female",
    "Breach": "Male",
    "Deadlock": "Female",
    "Raze": "Female",
    "Chamber": "Male",
    "KAY/O": "Robot",
    "Skye": "Female",
    "Cypher": "Male",
    "Sova": "Male",
    "Killjoy": "Female",
    "Harbor": "Male",
    "Viper": "Female",
    "Phoenix": "Male",
    "Astra": "Female",
    "Brimstone": "Male",
    "Neon": "Female",
    "Yoru": "Male",
    "Sage": "Female",
    "Reyna": "Female",
    "Omen": "Male",
    "Jett": "Female"
}

// jQuery.ajaxSetup({async:false});
$.get(abilityUrl, function(data, status){ //url defined in current webpage js file
    loadTemplate(url, true, 'ability');
    console.log(data)
    randIndex = data['randIndex']
});

function addTries(tries){
    templateAddTries(tries);
}

function doP2Guess(attempt){
    
}

function tileAnimation(currRow, tileDiv, delayAmount){
    setTimeout(() => {
        currRow.appendChild(tileDiv);
        tileDiv.animate(tileSpin, tileSpinTiming);
    }, delayAmount);
}

function isCorrectOption(userInput){ //overwritten from template
    let optionAnswer = dataList[randIndex]["displayName"];
    let correctAnswers = [optionAnswer, genderMap[optionAnswer], dataList[randIndex]['role']['displayName']]
    let guessList = [userInput, genderMap[userInput], dataList[findUserIndex(userInput)]['role']['displayName']]
    
    let listOfGuesses = document.getElementById("listOfGuesses");

    let currRow = document.createElement('div'); // creates new row div under listOfMapGuesses
    listOfGuesses.prepend(currRow);
    currRow.classList.add("row");

    for(let i = 0; i < 3; i++){
        tileDiv = document.createElement("div");
        textSpan = document.createElement("span");
        tileDiv.classList.add("tile");
        textSpan.classList.add("hint");
        tileDiv.appendChild(textSpan);

        if (guessList[i] == correctAnswers[i]) {
            tileDiv.classList.add('correctGuess');
        }
        else {
            tileDiv.classList.add('wrongGuess');
        }
        let text = document.createTextNode(guessList[i]);
        textSpan.appendChild(text);
        
        tileAnimation(currRow, tileDiv, i * 500);
    }

    if (userInput == optionAnswer){
        $('#dropdown').remove();
        persistP2State();
        displayPartTwo();
    }else{
        $('#searchInput').val('');
        removeOption(userInput);
        filterFunction();
        modeWrongActions();
    }
}

function curGamemode(){ // Gets called on page load
    console.log(randIndex)
    console.log(dataList[randIndex])
    correctImgSrc = dataList[randIndex]["displayIcon"];
    correctName = dataList[randIndex]["displayName"];
    
}

function modeWrongActions(){

}



function displayPartTwo(){ //GETS CALLED AFTER FIRST PART IS COMPLETED
    winConfetti();

    partTwoDisplay = document.getElementById("partTwoDisplay");

    createNextPageBox('ability');

    $('#partTwoDisplay').appendTo('#partTwoDiv');
    $("#partTwoDisplay").show();
}








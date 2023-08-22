
let url = "static/api/agents/agents_en.json";

let abilityUrl = window.location.href + '/agentOfDay';
let dropdownClone = $('#dropdown').clone();
let randIndex2;
agentP1 = true;

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
    loadTemplate(url, true, 'agent', data['dayId']);
    console.log(data)
    randIndex = data['randIndex']
    randIndex2 = data['randIndex2']
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

function isCorrectAgentOption(userInput){ 
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
        if (i == 0) {
            textSpan.classList.add("notranslate");
        }
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
    correctImgSrc = dataList[randIndex]["displayIcon"];
    correctName = dataList[randIndex]["displayName"];
}

function modeWrongActions(){
    if (secondPartStarted){
        partTwoLose( dataList[randIndex]['displayName']);
    }
}


let secondPartStarted = false;
function displayPartTwo(){
    if (secondPartStarted){
        winConfetti();
        partTwoWin(dataList[randIndex]['displayName']);
    }else{
        winConfetti();
        guessAgentTime2();
        secondPartStarted = true;
    }
}

function guessAgentTime2(){ 
    winConfetti();
    agentP1 = false;
    randIndex = randIndex2;

    createNextPageBox('ability');
    
    $('#agent2Prompt').appendTo('#partTwoDiv')
    $('#agent2Prompt').show()
    dropdownClone.appendTo('#partTwoDiv');
    $('#searchInput').attr('placeholder','Search Agent..');

    $('#agent2Prompt').removeAttr('hidden');
    jQuery('<div>', {
        id:'fullListOfGuesses'
    }).appendTo($('#partTwoDiv'));

    let pixImgDiv = $('<div class="guessImageDiv">\
                        <img id="guessImage" src="">\
                    </div>');
    pixImgDiv.insertAfter('#agent2Prompt')

    correctImgSrc = dataList[randIndex]["displayIcon"];
    correctName = dataList[randIndex]["displayName"];
    guessImage.src = correctImgSrc;
    var image = document.querySelector('#guessImage');
    var pixelate = new Pixelate(image, 50);
    $("#guessImage").css("visibility", "hidden");
    $('#optionNames').hide();
    
    makeButtons(false);

    setTimeout(() => {
        document.getElementById("nextPageBox").scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
        addEnter();
        secondPartFilter = true;
        filterFunction();
      }, 500);
}








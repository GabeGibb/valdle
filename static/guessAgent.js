let url = "static/api/agents/agents_" + getLanguageCookie() + ".json";

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

let dateMap = {
    "Gekko": "2023",
    "Fade": "2022",
    "Breach": "2020",
    "Deadlock": "2023",
    "Raze": "2020",
    "Chamber": "2021",
    "KAY/O": "2021",
    "Skye": "2020",
    "Cypher": "2020",
    "Sova": "2020",
    "Killjoy": "2020",
    "Harbor": "2022",
    "Viper": "2020",
    "Phoenix": "2020",
    "Astra": "2021",
    "Brimstone": "2020",
    "Neon": "2022",
    "Yoru": "2021",
    "Sage": "2020",
    "Reyna": "2020",
    "Omen": "2020",
    "Jett": "2020"
}

// jQuery.ajaxSetup({async:false});
$.get(abilityUrl, function(data, status){ //url defined in current webpage js file
    loadTemplate(url, true, 'agent', data['dayId']);
    // console.log(data)
    randIndex = data['randIndex']
    randIndex2 = data['randIndex2']
});

function addTries(tries){
    if (tries.length == 0){
        $('#guessText').show()
    }
    for(let i = 0; i < tries.length; i++){
        isCorrectAgentOption(tries[i]);
    }
}

function doP2Guess(attempt){
    if (attempt != ''){
        isCorrectOption(attempt);
    }
}

function tileAnimation(currRow, tileDiv, delayAmount){
    setTimeout(() => {
        currRow.appendChild(tileDiv);
        tileDiv.animate(tileSpin, tileSpinTiming);
    }, delayAmount);
}

let hasTakenAGuess = false;
function isCorrectAgentOption(userInput){ 
    let optionAnswer = dataList[randIndex]["displayName"];
    let correctAnswers = [optionAnswer, genderMap[optionAnswer], dataList[randIndex]['role']['displayName'], dateMap[optionAnswer]]
    // console.log(correctAnswers)
    let guessList = [userInput, genderMap[userInput], dataList[findUserIndex(userInput)]['role']['displayName'], dateMap[userInput]]
    
    let listOfGuesses = document.getElementById("listOfGuesses");

    let currRow = document.createElement('div'); // creates new row div under listOfMapGuesses
    listOfGuesses.prepend(currRow);
    currRow.classList.add("row");

    for(let i = 0; i < 4; i++){
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
    if (hasTakenAGuess == false){
        $('#guessText').hide()
    }
}

function curGamemode(){ // Gets called on page load
    correctImgSrc = dataList[randIndex]["displayIcon"];
    correctName = dataList[randIndex]["displayName"];
}


let pixelate;
let startPixelate = 65;
function unPixelate(count){
    console.log(count)
    if(count < 1){
        pixelate.canvas.addEventListener("mouseover", (event) =>{
            pixelate.updateBlurFactor(startPixelate);
        })
        pixelate.canvas.addEventListener("mouseout", (event) =>{
            pixelate.updateBlurFactor(0);
        })
        return;
    }
    pixelate.updateBlurFactor(count);
    setTimeout(() => {
        unPixelate(count-(count/15))
    }, 30);
}

function revealAgentName(){
    let agentName = $('#secondAgentName')
    agentName.text(dataList[randIndex]['displayName']);
}

function modeWrongActions(){
    if (secondPartStarted){
        revealAgentName();
        partTwoLose( dataList[randIndex]['displayName']);
        unPixelate(startPixelate)
    }
}


let secondPartStarted = false;
function displayPartTwo(){
    if (secondPartStarted){
        revealAgentName();
        partTwoWin(dataList[randIndex]['displayName']);
        unPixelate(startPixelate)

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
                    </div>\
                    <p id="secondAgentName"></p>');
    pixImgDiv.insertAfter('#agent2Prompt')
    
    correctImgSrc = dataList[randIndex]["displayIcon"];
    correctName = dataList[randIndex]["displayName"];
    guessImage.src = correctImgSrc;
    var image = document.querySelector('#guessImage');
    pixelate = new Pixelate(image, 45);
    
    $("#guessImage").css("visibility", "hidden");
    $('#optionNames').hide();
    
    makeButtons(false);

    addEnter();
    secondPartFilter = true;
    filterFunction();
}








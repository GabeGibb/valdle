
const tileSpin = [
    { transform: "rotateY(50deg)", opacity: 0},
    { transform: "rotateY(0) ", opacity: 1 },
  ];

const tileSpinTiming = {
    duration: 500,
    iterations: 1,
  };

let dayId;
let persistentData;
let stats;
let hasAlreadyWon = false;

//TO ENABLE LOCAL STORAGE, DELETE RETURN AT addWinToStats and delete || 1 at end of loadPersistenData if statement

function loadStats(mode){
    stats = JSON.parse(localStorage.getItem(mode + 'Stats'))
    if (localStorage.getItem(mode + 'Stats') == null){
        stats = {'dayIds': [], 'triesList': []};
        localStorage.setItem(mode + 'Stats',  JSON.stringify(stats));
    }

}

function addWinToStats(){
    // return;
    if (hasAlreadyWon){
        return;
    }
    console.log(stats)
    console.log(dayId)
    stats['dayIds'].push(dayId);
    stats['triesList'].push(persistentData['triesList'].length);
    localStorage.setItem(persistentData['mode'] + 'Stats', JSON.stringify(stats));
}

function loadPersistentData(mode, curDayId){
    loadStats(mode, curDayId);

    dayId = curDayId;
    persistentData = JSON.parse(localStorage.getItem(mode));
    
    if (localStorage.getItem(mode) == null || persistentData['dayId'] != dayId){ 
        persistentData = {'dayId' : dayId, 'mode': mode, 'triesList': [], 'currentState': 'p1', 'p2Attempt': ''}
        savePersistentData();
    }

    console.log(persistentData)
    if (persistentData['currentState'] == 'p2'){
        hasAlreadyWon = true;
    }
    
    addTries(persistentData['triesList']);
    if (persistentData['currentState'] == 'p2'){
        doP2Guess(persistentData['p2Attempt']);
    }
}

function templateAddTries(tries){
    for(let i = 0; i < tries.length; i++){
        isCorrectOption(tries[i]);
    }
}

function savePersistentData(){
    localStorage.setItem(persistentData['mode'], JSON.stringify(persistentData));
}

function persistAddTry(attempt){
    persistentData['triesList'].push(attempt);
    savePersistentData();
    
}

function persistP2Atempt(attempt){
    if (persistentData['p2Attempt'] != ''){
        return;
    }
    persistentData['p2Attempt'] = attempt;
    savePersistentData();
    
}

function persistP2State(){
    persistentData['currentState'] = 'p2';
    savePersistentData();
    addWinToStats();
}

let dataList;
var randIndex;
let correctImgSrc;
let correctName;
$(window).on('beforeunload', function() {
    $(window).scrollTop(0);
});

$(window).on('click', function(){
    console.log(persistentData)
    console.log(stats)
})


// jQuery.ajaxSetup({async:false});
function loadTemplate(url, showButtonImages, mode, curDayId){
    $("#gameArea").on('dragstart', function(event) { event.preventDefault(); });
    $("#gameArea").css({"-khtml-user-select": "none", 
                            "-o-user-select": "none",
                            "-moz-user-select": "none",
                            "-webkit-user-select": "none",
                            "user-select": "none"});
    $.get(url, function(data, status){ //url defined in current webpage js file
        dataList = data;
        console.log(dataList);
        makeButtons(showButtonImages);
        addEnter();
        curGamemode(); //IMPORTANT FUNCTION CALLS A MADE FUNCTION TO DO ANYTHING SPECIAL ON LOAD OF GIVEN PAGE
        loadPersistentData(mode, curDayId)
    });    
}


function makeButtons(showButtonImages){
    let names = document.getElementById("optionNames");
    for(let i = 0; i < dataList.length; i++){
        let currName = (dataList[i]["displayName"]);
        let p = document.createElement('p');
        p.textContent = currName;
        p.classList.add("optionNameInButton");
        let button = document.createElement('BUTTON');
        button.classList.add("optionButton");
        button.onclick = function(){
            document.getElementById("searchInput").value = currName;
            validateGuess();
        }
        if (showButtonImages == true){
            let imgSrc = dataList[i]["displayIcon"]
            button.innerHTML = "<img src=" + imgSrc + " class = \"buttonImages\">";
        }
        
        button.appendChild(p); //adds content to button
        button.style.display = "none";
        names.appendChild(button); //appends button to div
    }
    $('#fullListOfGuesses').empty();
}

function showButtons(){
    $("#optionNames").show();
}

$(document).on("mousedown", function(event){
    var $trigger = $('#dropdown');
    if($trigger !== event.target && !$trigger.has(event.target).length){
        $("#optionNames").hide();
    }
});

let currentFocus = -1;
let pastInputText = '';
function removeActive(){
    $('#optionNames').children().each( (index, element) => {
        element.classList.remove('autocompleteActive')
     });
}

function addActive(){
    removeActive();
    let curChildren = getCurButtons();
    if (currentFocus <= -1 || currentFocus >= curChildren.length){
        $('#searchInput').val(pastInputText);
        return;
    }
    
    curChildren[currentFocus].classList.add('autocompleteActive');
    let agent = curChildren[currentFocus].children[curChildren[currentFocus].children.length-1].textContent;
    $('#searchInput').val(agent);
    curChildren[currentFocus].scrollIntoViewIfNeeded(false);
}

function getCurButtons(){
    let curChildren = [];
    $('#optionNames').children().each( (index, element) => {
        if(element.style.display != "none"){
            curChildren.push(element);
        }
     });
    return curChildren;
}

function goUpAutocomplete(){
    let curChildren = getCurButtons();
    if (curChildren.length == 0){
        currentFocus = -1;
        return;
    }
    currentFocus--;
    if (currentFocus < -1){
        currentFocus = curChildren.length - 1;
    }
    addActive();
}
function goDownAutocomplete(){
    let curChildren = getCurButtons();
    if (curChildren.length == 0){
        currentFocus = -1;
        return;
    }
    currentFocus++;
    if(currentFocus >= curChildren.length){
        currentFocus = -1;
    }
    addActive();
}

function addEnter(){
    $('#searchInput').keydown(function(e){
        let key = e['originalEvent']['key'];
        
        if(key == 'Enter'){
            validateGuess();
            
        }
        else if (key == 'ArrowUp'){
            e.preventDefault();
            goUpAutocomplete();
        }
        else if (key == 'ArrowDown'){
            e.preventDefault();
            goDownAutocomplete();
        }
    });

    $('#searchInput').keyup(function(e){
        let key = e['originalEvent']['key'];

        if (key == 'ArrowUp' || key == 'ArrowDown' || key == 'ArrowLeft' || key == 'ArrowRight'){}
        else{
            if(e.keyCode >= 65 && e.keyCode <= 90){
                pastInputText = $('#searchInput').val();
            }
            filterFunction();
        }
    });
}


let secondPartFilter = false;
function filterFunction() {
    currentFocus = -1;
    var input, filter, button, i;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();


    div = document.getElementById("optionNames");
    button = div.getElementsByTagName("button");


    for (i = 0; i < button.length; i++) {
        txtValue = button[i].textContent || button[i].innerText;
        let filterIndex = txtValue.toUpperCase().indexOf(filter);
        if (secondPartFilter && filterIndex == 0 || filterIndex == 0 && filter.length > 0){
            button[i].style.display = "";
        } else {
            button[i].style.display = "none";
        }
    }
}

function animateGuess(parent, child, delayAmount){
    setTimeout(() => {
        parent.prepend(child);
        child.animate(tileSpin, tileSpinTiming);
    }, delayAmount);
}
let agentP1 = false;
function validateGuess(){
    $('#searchInput').focus();
    let userInput = document.getElementById("searchInput")
    for(let i = 0; i < dataList.length; i++){ //TODO: case sens
        if(userInput.value.toUpperCase() == dataList[i]["displayName"].toUpperCase()){
            if (persistentData['currentState'] == 'p1'){
                persistAddTry(dataList[i]["displayName"]);
            }else if (persistentData['currentState'] == 'p2'){
                persistP2Atempt(dataList[i]["displayName"]);
            }
            if (agentP1){
                isCorrectAgentOption(dataList[i]["displayName"]);
            }else{
                isCorrectOption(dataList[i]["displayName"]);
            }
            
            return true;
        }
    }
    return false;
}

function isCorrectOption(userInput){
    let guessParent = document.getElementById("fullListOfGuesses");
    let newDiv = document.createElement("div");

    let optionAnswer = dataList[randIndex]["displayName"];

    let text = document.createTextNode(userInput);
    let p = document.createElement('p');
    p.classList.add("guessText");
    p.classList.add("notranslate");

    let optionImg = document.createElement('img');
    let optionImgSrc = dataList[findUserIndex(userInput)]["displayIcon"]
    if (optionImgSrc == null){
        optionImgSrc = dataList[findUserIndex(userInput)]["levels"][0]["displayIcon"]
    }
    optionImg.src = optionImgSrc;

    optionImg.classList.add("guessImg");
    
    // Apply different styling for weapons
    if (window.location.href.slice(-11) == "guessWeapon") {
        newDiv.classList.add("individualGuessesWeapons");
        p.classList.add("guessTextWeapons");
        optionImg.classList.add("guessImgWeapons");
    }

    newDiv.appendChild(optionImg);
    p.appendChild(text); //adds content to button
    newDiv.appendChild(p); //appends button to div

    if(optionAnswer == userInput){
        newDiv.classList.add("correctGuess")
        $('#dropdown').remove();
        persistP2State();
        displayPartTwo();
    }
    else{
        newDiv.classList.add("wrongGuess")
        $('#searchInput').val('');
        removeOption(userInput);
        filterFunction();
        modeWrongActions();
    }
    newDiv.classList.add("individualGuesses");

    animateGuess(guessParent, newDiv, 200);
}

function findUserIndex(userInput){
    for(let i = 0; i < dataList.length; i++){
        if(userInput == dataList[i]["displayName"]){
            return i;
        }
    }
}

function removeOption(name){
    div = document.getElementById("optionNames");
    button = div.getElementsByTagName("button");
    let index = 'empty';
    for (i = 0; i < button.length; i++) {
        txtValue = button[i].textContent || button[i].innerText;
        if (txtValue == name){
            button[i].textContent = ''
            button[i].innerText = ''
            index = i;
        }
    }
    if(index != 'empty'){
        button[index].remove();
    }
}

function partTwoWin(correctAnswer){
    $('#dropdown').remove();
    // $('#partTwoEndText').text('Correct!');
    // $('#partTwoEndText').text('Correct!<br>Correct Answer: ' + correctAnswer);
    $('#partTwoEndText').html('Correct!<br>Correct Answer:');
    $('#partTwoEndTextAnswer').text(correctAnswer);

}

function partTwoLose(correctAnswer){
    $('#dropdown').remove();
    // $('#partTwoEndText').text('Better Luck Next Time');
    // $('#partTwoEndText').text('Better Luck Next Time<br>Correct Answer: ' + correctAnswer)
    $('#partTwoEndText').html('Better Luck Next Time<br>Correct Answer:')
    $('#partTwoEndTextAnswer').text(correctAnswer);
}

function createNextPageBox(nextGame){
    let nextPageBox = $('<div id="nextPageBox">\
                            <div class="notranslate" id="victoryMessage"><p>GG!</p></div>\
                            <div id="correctGuessDiv">\
                                <img id="correctImg">\
                                <div id="correctTextDiv">\
                                    <p class="notranslate" id="correctGuess">\
                                    <div id="numTriesDiv"><p id="tries">Tries:&nbsp;</p><p id = "numTries"></p>\
                                </div>\
                            </div>\
                            <div id="partTwoDiv"></div>\
                            <div id = "endTextDiv"><p id="partTwoEndText"></p><p class="notranslate" id="partTwoEndTextAnswer"></p></div>\
                            <div id = "nextValdleDiv">\
                                <hr>\
                                <div id = "cd">\
                                    <p id="nextValdleText">Refreshes in:&nbsp;</p>\
                                    <p id="nextValdleCountdown"></p>\
                                </div>\
                            </div>\
                            <div id="nextPageButton"></div>\
                        </div>');
    let nextGameText = '';
    let nextPageUrl = ''
    if(nextGame != 'home'){
        nextGameText = 'Guess the ' + nextGame;
        nextPageUrl = 'guess' + nextGame.charAt(0).toUpperCase() + nextGame.slice(1);
    }else{
        nextGameText = 'Homepage';
    }
    
    let nextButton = $('\
                        <button id="nextGameButton" class="btn btn--light" onclick="location.href=\'/' + nextPageUrl + '\'">\
                            <span id = "nextGameButton_inner" class="btn__inner">\
                                <span class="btn__slide"></span>\
                                <span class="btn__content" >' + nextGameText + '</span>\
                            </span>\
                        </button>');

    setInterval(createAndUpdateTimer, 1000);
    $('body').append(nextPageBox);
    $('#nextPageButton').append(nextButton);
    $('#correctImg').attr('src', correctImgSrc);
    $('#correctGuess').text(correctName);
    $('#numTries').append(persistentData['triesList'].length);
    
    setTimeout(() => {
        document.getElementById("nextPageBox").scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    }, 500);
}

function createAndUpdateTimer() {
    let nextMidnight = new Date();
    nextMidnight.setHours(21,0,0,0);
    let now = new Date();

    if ((nextMidnight - now) < 0) {
        nextMidnight.setHours(45,0,0,0);
    }
    
    let rest = (nextMidnight.getTime() - now.getTime())/1000;

    const hours = Math.floor(rest/3600);
    rest = rest-(hours*3600);
    const minutes = Math.floor(rest/60);
    rest = rest-(minutes*60);
    const seconds = Math.floor(rest);

    let timeString = (hours).toString() + ':' + ("0" + minutes).slice(-2) + ':' + ("0" + seconds).slice(-2); // hours-3 to convert it to EST
    $("#nextValdleCountdown").text(timeString);
}

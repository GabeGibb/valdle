
// This template lets other files use dataList and randAgent variables
// In a given gamemode js file, one must specify two functions
//   function curGamemode(){
//     //WHAT TO DO ON LOAD
//   }
//   function displayPartTwo(){
//     //WHAT TO DO ON WINNING FIRST MODE (or just winning if there is only one part)

//   }
// }
//function modeWrongActions(){}
// let url

// URLS 
// "https://valorant-api.com/v1/agents?isPlayableCharacter=true"
// "https://valorant-api.com/v1/bundles"

const tileSpin = [
    { transform: "rotateY(50deg)", opacity: 0},
    { transform: "rotateY(0) ", opacity: 1 },
  ];

const tileSpinTiming = {
    duration: 500,
    iterations: 1,
  };

let dataList;
var randIndex;
let correctImgSrc;
let correctName;

// jQuery.ajaxSetup({async:false});
function loadTemplate(url, showButtonImages){
    $("#gameArea").on('dragstart', function(event) { event.preventDefault(); });
    $("#gameArea").css({"-khtml-user-select": "none", 
                            "-o-user-select": "none",
                            "-moz-user-select": "none",
                            "-webkit-user-select": "none",
                            "user-select": "none"});
    $.get(url, function(data, status){ //url defined in current webpage js file
        dataList = data["data"];
        console.log(dataList)
        curGamemode(); //IMPORTANT FUNCTION CALLS A MADE FUNCTION TO DO ANYTHING SPECIAL ON LOAD OF GIVEN PAGE
        makeButtons(showButtonImages);
        addEnter();
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
            $("#optionNames").hide();
        }
        if (showButtonImages == true){
            let imgSrc = dataList[i]["displayIcon"]
            button.innerHTML = "<img src=" + imgSrc + " class = \"buttonImages\">";
        }
        
        button.appendChild(p); //adds content to button
        button.style.display = "none";
        names.appendChild(button); //appends button to div
    }
    $("#optionNames").hide();
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
let dontFilter = false;
function removeActive(){
    $('#optionNames').children().each( (index, element) => {
        element.classList.remove('autocompleteActive')
     });
}

function addActive(){
    removeActive();
    if (currentFocus == -1){
        return;
    }
    let curChildren = getCurButtons();
    curChildren[currentFocus].classList.add('autocompleteActive');
    let agent = curChildren[currentFocus].children[curChildren[currentFocus].children.length-1].textContent;
    $('#searchInput').val(agent)
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
    if(currentFocus == curChildren.length){
        currentFocus = -1;
    }
    addActive();
}

function addEnter(){
    console.log(currentFocus)
    $('#searchInput').keydown(function(e){
        let key = e['originalEvent']['key'];
        // console.log(key)
        if(key == 'Enter'){
            validateGuess();
            
        }
        if (key == 'ArrowUp'){
            e.preventDefault();
            goUpAutocomplete();
        }
        if (key == 'ArrowDown'){
            e.preventDefault();
            goDownAutocomplete();
        }
    });

    $('#searchInput').keyup(function(e){
        let key = e['originalEvent']['key'];

        if (key == 'ArrowUp' || key == 'ArrowDown'){

        }
        else{
            filterFunction();
        }
    });
}


let secondPartFilter = false;
function filterFunction() {
    var input, filter, ul, li, button, i;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();


    div = document.getElementById("optionNames");
    button = div.getElementsByTagName("button");


    for (i = 0; i < button.length; i++) {
        txtValue = button[i].textContent || button[i].innerText;
        let filterIndex = txtValue.toUpperCase().indexOf(filter);
        if (secondPartFilter || filterIndex == 0 && filter.length > 0){
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

function validateGuess(){
    let userInput = document.getElementById("searchInput")
    for(let i = 0; i < dataList.length; i++){ //TODO: case sens
        if(userInput.value.toUpperCase() == dataList[i]["displayName"].toUpperCase()){
            isCorrectOption(dataList[i]["displayName"]);
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

    let optionImg = document.createElement('img');
    let optionImgSrc = dataList[findUserIndex(userInput)]["displayIcon"]
    if (optionImgSrc == null){
        optionImgSrc = dataList[findUserIndex(userInput)]["levels"][0]["displayIcon"]
    }
    optionImg.src = optionImgSrc;

    optionImg.classList.add("guessImg");
    newDiv.appendChild(optionImg);
    p.appendChild(text); //adds content to button
    newDiv.appendChild(p); //appends button to div

    if(optionAnswer == userInput){
        newDiv.classList.add("correctGuess")
        $('#dropdown').remove();
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

function partTwoWin(){
    $('#partTwoEndText').text('Nice!')
}

function partTwoLose(){
    $('#dropdown').remove();
    $('#partTwoEndText').text('Better Luck Next Time')
}

function createNextPageBox(nextGame){
    let nextPageBox = $('<div id="nextPageBox">\
                            <div id="victoryMessage"><p>GG!</p></div>\
                            <div id="correctGuessDiv">\
                                <img id="correctImg">\
                                <p id="correctGuess">\
                            </div>\
                            <div id="numTriesDiv"><p id="numTries">Tries: </p></div>\
                            <div id="partTwoDiv"></div>\
                            <div><p id="partTwoEndText"></p></div>\
                            <div "nextValdleDiv">\
                                <p id="nextValdleText">Next Valdle:</p>\
                                <p id="nextValdleCountdown">00:00:00</p>\
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
    
    let nextButton = $('<img class="icon" src="static/images/' + nextGame + 'Icon.png">\
                        <button class="btn btn--light" onclick="location.href=\'/' + nextPageUrl + '\'">\
                            <span class="btn__inner">\
                                <span class="btn__slide"></span>\
                                <span class="btn__content">' + nextGameText + '</span>\
                            </span>\
                        </button>');

    
    $('body').append(nextPageBox)
    $('#nextPageButton').append(nextButton)
    $('#correctImg').attr('src', correctImgSrc)
    $('#correctGuess').text(correctName)
    $('#numTries').append('0')

    setTimeout(() => {
        document.getElementById("nextPageBox").scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    }, 500);
}
// setTimeout(() => {
//     createNextPageBox();
//   }, "1000");


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


let dataList;
var randIndex;
var guessImage = document.getElementById("guessImage");

jQuery.ajaxSetup({async:false});
$.get(url, function(data, status){ //url defined in current webpage js file
    dataList = data["data"];
    console.log(dataList)
    curGamemode(); //IMPORTANT FUNCTION CALLS A MADE FUNCTION TO DO ANYTHING SPECIAL ON LOAD OF GIVEN PAGE
    makeButtons();
    $("#optionNames").hide();
});


function makeButtons(){
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
        button.innerHTML = "<img src=" + dataList[i]["displayIcon"] + " class = \"buttonImages\">";
        button.appendChild(p); //adds content to button
        button.style.display = "none";
        names.appendChild(button); //appends button to div
    }
}

function showButtons(){
    $("#optionNames").show();
}

$(document).on("click", function(event){
    var $trigger = $('.dropdown');
    if($trigger !== event.target && !$trigger.has(event.target).length){
        $("#optionNames").hide();
    }
});

$('#searchInput').keydown(function(e){
    let key = e['originalEvent']['key'];
    // console.log(key)
    if(key == 'Enter'){
        validateGuess();
    }
});

function filterFunction() {
    var input, filter, ul, li, button, i;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();

    div = document.getElementById("optionNames");
    button = div.getElementsByTagName("button");

    let nameOrder = [];

    for (i = 0; i < button.length; i++) {
        txtValue = button[i].textContent || button[i].innerText;
        let filterIndex = txtValue.toUpperCase().indexOf(filter);
        if (filterIndex == 0 && filter.length > 0){
            button[i].style.display = "";
            nameOrder.push([i, filterIndex]);
        } else {
            button[i].style.display = "none";
        }
    }
}


function validateGuess(){
    let userInput = document.getElementById("searchInput")
    // console.log(dataList);
    for(let i = 0; i < dataList.length; i++){ //TODO: case sens
        if(userInput.value.toUpperCase() == dataList[i]["displayName"].toUpperCase()){
            isCorrectOption(dataList[i]["displayName"]);
        }
        
    }
}

function printVictoryMessage(){
    $('#victoryMessage').text('nice');
}

function isCorrectOption(userInput){
    let guessParent = document.getElementById("fullListOfGuesses");
    let newDiv = document.createElement("div");
    guessParent.appendChild(newDiv);

    let optionAnswer = dataList[randIndex]["displayName"];

    let text = document.createTextNode(userInput);
    let p = document.createElement('p');
    p.classList.add("guessText");

    let optionImg = document.createElement('img');
    optionImg.src = dataList[findUserIndex(userInput)]["displayIcon"];
    optionImg.classList.add("guessImg");
    newDiv.appendChild(optionImg);
    p.appendChild(text); //adds content to button
    newDiv.appendChild(p); //appends button to div

    if(optionAnswer == userInput){
        newDiv.classList.add("correctGuess")
        $('#dropdown').remove();
        printVictoryMessage();
        displayPartTwo();
    }
    else{
        newDiv.classList.add("wrongGuess")
        $('#searchInput').val('');
        removeOption(userInput);
        modeWrongActions();
    }
    newDiv.classList.add("individualGuesses");
   
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
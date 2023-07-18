let dataList;

var randAgent = Math.floor(Math.random() * 22);
var randAbility; //initialized in randomizeAbilityIndex()
$("#partTwoDisplay").hide();
// console.log(randAgent);
// console.log(randAbility);

var abilityImage = document.getElementById("abilityImage")

$.get("https://valorant-api.com/v1/agents?isPlayableCharacter=true", function(data, status){
    console.log(data['data']);
    dataList = data["data"];
   
    console.log("agent name: " + dataList[randAgent]["displayName"]);
    var abilityIndex = randomizeAbilityIndex();
    createRandAbility(abilityIndex);
    makeButtons();
    $("#agentNames").hide();

});

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

    abilityImage.src = chosenAbility["displayIcon"];
        
}


function makeButtons(){
    let names = document.getElementById("agentNames");
    for(let i = 0; i < dataList.length; i++){
        let currName = (dataList[i]["displayName"]);
        // console.log(currName);
        // let name = document.createTextNode(currName);
        let p = document.createElement('p');
        p.textContent = currName;
        p.classList.add("agentNameInButton");
        let button = document.createElement('BUTTON');
        button.classList.add("agentButton");
        button.onclick = function(){
            document.getElementById("searchInput").value = currName;
            $("#agentNames").hide();
        }
        console.log()
        button.innerHTML = "<img src=" + dataList[i]["displayIcon"] + " class = \"buttonImages\">";
        button.appendChild(p); //adds content to button

        names.appendChild(button); //appends button to div
    }
}

function showButtons(){
    // console.log($('#searchInput').val())
    // if ($('#searchInput').val().length > 0){
        $("#agentNames").show();
    // }
}

$(document).on("click", function(event){
    var $trigger = $('#dropdown');
    if($trigger !== event.target && !$trigger.has(event.target).length){
        // $("#agentNames").slideUp("fast");
        $("#agentNames").hide();
    }
});

$('#searchInput').on('keypress', function(e){
    if(e['originalEvent']['key'] == 'Enter'){
        validateAgent();
    }
})


function filterFunction() {
    var input, filter, ul, li, button, i;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    // div = document.getElementById("dropdown");
    // button = div.getElementsByTagName("button");
    div = document.getElementById("agentNames");
    button = div.getElementsByTagName("button");
    for (i = 0; i < button.length; i++) {
      txtValue = button[i].textContent || button[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        button[i].style.display = "";
      } else {
        button[i].style.display = "none";
      }
    }
  }
    
function validateAgent(){
    let userInput = document.getElementById("searchInput")
    console.log(userInput.value);
    // console.log(dataList);
    for(let i = 0; i < dataList.length; i++){ //TODO: case sens
        if(userInput.value == dataList[i]["displayName"]){
            isCorrectAgent(userInput.value);
        }
        
    }
}

function isCorrectAgent(userInput){
    let guessParent = document.getElementById("fullListOfGuesses");
    let newDiv = document.createElement("div");
    guessParent.appendChild(newDiv);

    let agentAnswer = dataList[randAgent]["displayName"];

    let text = document.createTextNode(userInput);
    let p = document.createElement('p');
    p.classList.add("guessText");

    let agentImg = document.createElement('img');
    agentImg.src = dataList[findUserIndex(userInput)]["displayIcon"];
    agentImg.classList.add("agentGuessImg");
    newDiv.appendChild(agentImg);
    p.appendChild(text); //adds content to button
    newDiv.appendChild(p); //appends button to div

    if(agentAnswer == userInput){
        newDiv.classList.add("correctGuess")
        console.log("yippie!");
        $('#dropdown').remove();
        printVictoryMessage();

        setTimeout(displayPartTwo,2000);
    }
    else{
        newDiv.classList.add("wrongGuess")
        console.log("NOOO!");
        $('#searchInput').val('');
        removeAgent(userInput);
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

function removeAgent(name){
    div = document.getElementById("agentNames");
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

function printVictoryMessage(){
    $('#victoryMessage').text('nice');
}

function displayPartTwo(){
    partTwoDisplay = document.getElementById("partTwoDisplay");
    $("#partTwoDisplay").show();
    // partTwoDisplay.scrollIntoView();
    partTwoDisplay.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
}
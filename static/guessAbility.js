var randAgent = Math.floor(Math.random() * 23);
var randAbility = Math.floor(Math.random() * 4);

// console.log(randAgent);
// console.log(randAbility);

var abilityImage = document.getElementById("abilityImage")

$.get("https://valorant-api.com/v1/agents?isPlayableCharacter=true", function(data, status){
    console.log(data['data'])
    dataList = data["data"];
    createRandAbility();
    makeButtons();
    $("#agentNames").hide();

});


function createRandAbility(){
    var chosenAbility = dataList[randAgent]["abilities"][randAbility];
    console.log(chosenAbility);
    makeAbilityImage(chosenAbility);
}

function makeAbilityImage(chosenAbility){

    abilityImage.src = chosenAbility["displayIcon"];
        
}


function makeButtons(){
    let names = document.getElementById("agentNames");
    for(let i = 0; i < dataList.length; i++){
        let currName = (dataList[i]["displayName"]);
        console.log(currName);
        let text = document.createTextNode(currName);
        let button = document.createElement('BUTTON');
        button.classList.add("agentButton");
        button.onclick = function(){
            document.getElementById("searchInput").value = currName;
        }
        button.appendChild(text); //adds content to button
        names.appendChild(button); //appends button to div
    }
}

function showButtons(){
    $("#agentNames").show();
}

$(document).on("click", function(event){
    var $trigger = $('#dropdown');
    if($trigger !== event.target && !$trigger.has(event.target).length){
        // $("#agentNames").slideUp("fast");
        $("#agentNames").hide();
    }
});




function filterFunction() {
    var input, filter, ul, li, button, i;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    div = document.getElementById("dropdown");
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
    
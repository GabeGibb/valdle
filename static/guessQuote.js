let url = "https://valorant-api.com/v1/agents?isPlayableCharacter=true";

let quoteUrl = window.location.href + '/quoteOfDay';

let audioFile;
let quote;

$.get(quoteUrl, function(data, status){ //url defined in current webpage js file
    randAnswer = data['displayName'];
    quote = data['quote'];
    audioFile = data['audioFile'];

    console.log(randAnswer)
    $('#guessText').text(quote);

    $('#quoteSound').attr('src', audioFile);
});

function playQuote(){
    var snd = new Audio(audioFile);
    $('#quoteSound').play();
}

function curGamemode(){
    
}

function displayPartTwo(){
    //WHAT TO DO ON WINNING FIRST MODE
    winConfetti();
}

function modeWrongActions(){

}
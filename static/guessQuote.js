let url = "static/agents.json";

let quoteUrl = window.location.href + '/quoteOfDay';

let audioFile;
let quote;

// jQuery.ajaxSetup({async:false});
$.get(quoteUrl, function(data, status){ //url defined in current webpage js file
    loadTemplate(url, true);
    console.log(data)
    randIndex = data['randIndex']
    quote = data['quote'];
    audioFile = data['audioFile'];

    $('#guessText').text(quote)
});


function curGamemode(){
    
}

function displayPartTwo(){
    //WHAT TO DO ON WINNING FIRST MODE
    winConfetti();
}

function modeWrongActions(){

}
let url = "static/agents.json";

let quoteUrl = window.location.href + '/quoteOfDay';

let audioFile;
let quote;
var audioHintTries = 5;

// jQuery.ajaxSetup({async:false});
$.get(quoteUrl, function(data, status){ //url defined in current webpage js file
    loadTemplate(url, true);
    console.log(data)
    randIndex = data['randIndex']
    quote = data['quote'];
    audioFile = data['audioFile'].slice(0, -34);

    $('#guessText').text(quote);
    $('#audioHintText').text("Tries until audio clue: " + audioHintTries);
});


function playAudio(audioPlayer) {
    audioPlayer.play();
}

function addAudioElement(audioSrc) {
    const audioContainer = document.getElementById('audioContainer');
    const audioPlayer = document.createElement('audio');
    audioPlayer.src = audioSrc;
    audioPlayer.volume = 0.5;
    audioContainer.appendChild(audioPlayer);

    playAudioButton.addEventListener('click', function() {
        playAudio(audioPlayer);
    });
    audioContainer.appendChild(playAudioButton);
}


function curGamemode(){
    correctImgSrc = dataList[randIndex]['displayIcon'];
    correctName = dataList[randIndex]['displayName'];
}

function displayPartTwo(){
    //WHAT TO DO ON WINNING FIRST MODE
    winConfetti();
    createNextPageBox('weapon');
}

function modeWrongActions(){
    audioHintTries--;
    if (audioHintTries == 0) {
        $('#audioHintText').text("Audio clue:");
        $('.hintDiv').append("<div id='audioContainer' type='audio/mpeg'></div> <button class='playAudioButton' id='playAudioButton'><img id='imgAudioButton' src=static/images/audioPlay.png></button>");
        addAudioElement(audioFile);
    }
    else {
        $('#audioHintText').text("Tries until audio clue: " + audioHintTries);
    }
}
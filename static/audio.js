
let audioLength = 0;
let totalAudioLength;
let playCounter = 0;

function makeAudioElement(){
    $('.hintDiv').append("<div id='audioContainer' style='display:none' type='audio/mpeg'><button class='playAudioButton' id='playAudioButton'><img id='imgAudioButton' src=static/images/audioPlay.webp></button></div>");
}

function test() {
    let audioPlayerImg = document.getElementById("imgAudioButton");
    audioPlayerImg.src = "/static/images/audioPlay.webp";
}

function addAudioElement(audioSrc) {
    let audioContainer = document.getElementById('audioContainer');
    let audioPlayer = document.createElement('audio');
    let audioPlayerImg = document.getElementById("imgAudioButton");
    audioPlayer.src = audioSrc;
    audioPlayer.volume = 0.5;
    audioContainer.appendChild(audioPlayer);

    playAudioButton.addEventListener('click', function() {
        if (audioPlayer.paused) {
            audioPlayer.play(); // Will play if stopped
            audioPlayerImg.src = "/static/images/audioStop.webp";
            $(audioPlayer).bind('ended', function(){
                audioPlayerImg.src = "/static/images/audioPlay.webp";
            });
        }
        else {
            audioPlayer.pause(); // Stops and resets to the beginning
            audioPlayer.currentTime = 0;
            audioPlayerImg.src = "static/images/audioPlay.webp";
        }
    });
    audioContainer.appendChild(playAudioButton);
}

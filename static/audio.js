
let audioLength = 0;
let totalAudioLength;

function makeAudioElement(){
    $('.hintDiv').append("<div id='audioContainer' style='display:none' type='audio/mpeg'><button class='playAudioButton' id='playAudioButton'><img id='imgAudioButton' src=static/images/audioPlay.png></button></div>");
}

function playAudio(audioPlayer) {
    if (audioPlayer.currentTime != 0){
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
        return
    }

    audioPlayer.play();
    setTimeout(()=> {
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
    }, audioLength);
}

function addAudioElement(audioSrc) {
    let audioContainer = document.getElementById('audioContainer');
    let audioPlayer = document.createElement('audio');
    audioPlayer.src = audioSrc;
    audioPlayer.volume = 0.5;
    audioContainer.appendChild(audioPlayer);

    playAudioButton.addEventListener('click', function() {
        playAudio(audioPlayer);
    });
    audioContainer.appendChild(playAudioButton);

    audioPlayer.addEventListener('canplaythrough',  function(){
        totalAudioLength = audioPlayer.duration * 1000;
        console.log(totalAudioLength)
        if (audioLength == 0){
            audioLength = totalAudioLength;
        }
    })
}

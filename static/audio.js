
let audioLength = 0;
let totalAudioLength;
let playCounter = 0;

function makeAudioElement(){
    $('.hintDiv').append("<div id='audioContainer' style='display:none' type='audio/mpeg'><button class='playAudioButton' id='playAudioButton'><img id='imgAudioButton' src=static/images/audioPlay.png></button></div>");
}

// function playAudio(audioPlayer) {
//     // if (audioPlayer.currentTime != 0){
//     //     audioPlayer.pause();
//     //     audioPlayer.currentTime = 0;
//     //     return
//     // }

//     // if (audioPlayer.currentTime * 1000 > audioLength){
//     //     audioPlayer.pause();
//     //     audioPlayer.currentTime = 0;
//     // }
//     // playCounter += 1;
//     // let curCounter = playCounter;

//     audioPlayer.play();
//     // setTimeout(()=> {
//     //     if(curCounter == playCounter){
//     //         audioPlayer.pause();
//     //         audioPlayer.currentTime = 0;
//     //     }
//     // }, audioLength);
//     playAudioButton.addEventListener('click', function() {
//         audioPlayer.pause();
//     });
// }

function test() {
    let audioPlayerImg = document.getElementById("imgAudioButton");
    audioPlayerImg.src = "/static/images/audioPlay.png";
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
            audioPlayerImg.src = "/static/images/audioStop.png";
            $(audioPlayer).bind('ended', function(){
                audioPlayerImg.src = "/static/images/audioPlay.png";
            });
        }
        else {
            audioPlayer.pause(); // Stops and resets to the beginning
            audioPlayer.currentTime = 0;
            audioPlayerImg.src = "static/images/audioPlay.png";
        }
    });
    audioContainer.appendChild(playAudioButton);

    // audioPlayer.addEventListener('canplaythrough',  function(){
    //     totalAudioLength = audioPlayer.duration * 1000;
    //     if (audioLength == totalAudioLength){
    //         console.log("test");
    //         // audioLength = totalAudioLength;
    //         audioPlayerImg.src = "/static/images/audioPlay.png";
    //     }
    // })
}

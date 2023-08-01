let maps;
let start = true;
let gameOver = false;
let rowNum = 1;
let answer = ['', '', '']
let win;
let imgUrl;


//animations
const tileSpin = [
    { transform: "rotateY(50deg)", opacity: 0},
    { transform: "rotateY(0) ", opacity: 1 },
  ];

const tileSpinTiming = {
    duration: 500,
    iterations: 1,
  };

let mapSize = 320;
let divideFactor = 1000 / mapSize;

let calloutMap = $('#mapChoice').clone();
let calloutMaps = [];


function tileAnimation(currRow, tileDiv, delayAmount){
    setTimeout(() => {
        currRow.appendChild(tileDiv);
        tileDiv.animate(tileSpin, tileSpinTiming);
    }, delayAmount);
}

function makeCalloutDiv(callout, mapName) {
    let div = document.createElement("div");

    let x = callout['location']['x'];
    let y = callout['location']['y'];
    let region = callout['regionName'];
    let superRegion = callout['superRegionName']

    div.style.left = (-10 + (x / divideFactor)).toString() + 'px'; //x
    div.style.top = (-10 + (y / divideFactor)).toString() + 'px'; //y
    div.className = "callout";
    div.innerHTML = region;

    div.style.cursor = 'pointer';
    div.onclick = function () {

        let guess = [mapName, region, superRegion]
        let listOfMapGuesses = document.getElementById("listOfMapGuesses");

        win = false;

        let currRow = document.createElement('div'); // creates new row div under listOfMapGuesses
        listOfMapGuesses.prepend(currRow);
        currRow.classList.add("row");

        let counter = 0;
        for (let j = 0; j < 3; j++) { //creates three tiles per row
            // setTimeout(() => { 
            tileDiv = document.createElement("div");
            textSpan = document.createElement("span");
            tileDiv.classList.add("tile");
            textSpan.classList.add("hint");
            tileDiv.appendChild(textSpan);

            if (guess[j] == answer[j]) {
                tileDiv.classList.add('green');
                counter++;
            }
            else {
                tileDiv.classList.add('red');
            }
            let text = document.createTextNode(guess[j]);
            textSpan.appendChild(text);
            
            tileAnimation(currRow, tileDiv, j * 500);

        }
        zoomOutMap();
        if (counter == 3) {
            win = true;
        }



        if (win) {
            gameOver = true;
            let answerBox = document.getElementById("answerBox");
            answerBox.innerText = answer;
            clearMap();

            let mapImg = document.getElementById("curMap");
            mapImg.src = imgUrl;

            winConfetti();

        }
        div.remove();
        callout['regionName'] = '';
    };
   
    calloutMaps[calloutMaps.length-1].append(div)

}


function createMaps() {
    let callout;

    for (let i = 0; i < maps.length; i++) {
        if (maps[i]['displayName'] == 'The Range') {
            continue;
        }
        let mapName = maps[i]['displayName']; 

        calloutMaps.push(calloutMap.clone())
        calloutMaps[calloutMaps.length - 1].children().attr('src', maps[i]["displayIcon"])
        calloutMaps[calloutMaps.length - 1].val(mapName)

        for (let j = 0; j < maps[i]['callouts'].length; j++) {
            callout = maps[i]['callouts'][j];
            makeCalloutDiv(callout, mapName)
        }

    }

}


function createMap(mapName){
    if (gameOver) {
        return;
    }
    for (let i = 0; i < calloutMaps.length; i++){
        if (calloutMaps[i].val() == mapName){
            $('#mapChoice').replaceWith(calloutMaps[i])
        }
    }
}



let insetValue = 40;

function setScaleToInset() {
    let mapImg = document.getElementById("trueImg");
    let small = mapSize * (100 - (2 * insetValue)) / 100
    let big = mapSize;
    mapImg.style.scale = big / small
}

function zoomOutMap() {
    if (insetValue <= 0) {
        return;
    }
    insetValue -= 2.5;
    let mapImg = document.getElementById("trueImg");
    mapImg.style.clipPath = 'inset(' + insetValue + '%)';
    setScaleToInset();
}


function clearMap() {
    let map = document.getElementById("mapChoice");
    for (child of map.children) {
        if (child.id == 'curMap') {
            continue;
        }
        child.innerHTML = '';
    }
    let mapPic = document.getElementById("curMap");
    mapPic.src = '';
}

function randomize(mapName){
    for (let i = 0; i < maps.length; i++) {
        if (maps[i]['displayName'] != mapName) {
            continue;
        }
        answer[0] = maps[i]['displayName'];
        let randCall = Math.floor(Math.random() * maps[i]['callouts'].length);
        answer[1] = maps[i]['callouts'][randCall]['regionName']
        answer[2] = maps[i]['callouts'][randCall]['superRegionName']

        imgUrl = window.location.href + '/' + answer[0] + '/' + answer[1] + '/' + answer[2];
        let mapImg = document.getElementById("trueImg");
        mapImg.src = imgUrl;
    }
}



mapChoices = ['Ascent', 'Bind', 'Breeze', 'Fracture', 'Haven', 'Icebox', 'Lotus', 'Pearl', 'Split']



$.get("static/maps.json", function (data, status) {
    maps = data;
    randomize(mapChoices[Math.floor(Math.random() * mapChoices.length)])
    zoomOutMap();
    createMaps();
});

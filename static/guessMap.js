let maps;
let start = true;
let gameOver = false;
let rowNum = 1;
let answer = ['', '', '']
let win;
let imgUrl;


// let mapSize = document.getElementById("mapChoice").height;
let mapSize = 320;
let divideFactor = 1000 / mapSize;

console.log(mapSize)

function makeCalloutDiv(callout, mapName) {
    let div = document.createElement("div");

    // callout['location']['x'], callout['location']['y'], callout['regionName']
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


        // div.style.background = "blue";
        // let row = document.getElementById("r" + rowNum.toString());
        // let i = 0;
        let guess = [mapName, region, superRegion]
        let listOfMapGuesses = document.getElementById("listOfMapGuesses");
        // let win = true;

        win = false;

        let currRow = document.createElement('div'); // creates new row div under listOfMapGuesses
        listOfMapGuesses.append(currRow);
        currRow.classList.add("row");

        let counter = 0;
        for (let j = 0; j < 3; j++) { //creates three tiles per row
            tileDiv = document.createElement("div");
            textSpan = document.createElement("span");
            tileDiv.classList.add("tile");
            textSpan.classList.add("hint");
            tileDiv.appendChild(textSpan);
            currRow.appendChild(tileDiv);

            if (guess[j] == answer[j]) {
                tileDiv.classList.add('green');
                counter++
            }
            else {
                tileDiv.classList.add('red');
            }
            let text = document.createTextNode(guess[j]);
            textSpan.appendChild(text);

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


    document.getElementById("mapChoice").appendChild(div);

}


function createMap(mapName) {
    if (gameOver) {
        return;
    }
    clearMap();
    var map = document.getElementById("curMap");

    let callout;

    for (let i = 0; i < maps.length; i++) {
        if (maps[i]['displayName'] != mapName) {
            continue;
        }

        map.src = maps[i]['displayIcon'];

        // $('#mapChoice').css('visibility', 'hidden');
        for (let j = 0; j < maps[i]['callouts'].length; j++) {
            callout = maps[i]['callouts'][j];
            makeCalloutDiv(callout, mapName)
        }

        if (start) {
            answer[0] = maps[i]['displayName'];
            let randCall = Math.floor(Math.random() * maps[i]['callouts'].length);
            answer[1] = maps[i]['callouts'][randCall]['regionName']
            answer[2] = maps[i]['callouts'][randCall]['superRegionName']

            console.log(answer);
            clearMap();

            imgUrl = window.location.href + '/' + answer[0] + '/' + answer[1] + '/' + answer[2];
            let mapImg = document.getElementById("trueImg");
            mapImg.src = imgUrl;
        }
        start = false;
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




mapChoices = ['Ascent', 'Bind', 'Breeze', 'Fracture', 'Haven', 'Icebox', 'Lotus', 'Pearl', 'Split']



$.get("static/maps.json", function (data, status) {
    maps = data
    createMap(mapChoices[Math.floor(Math.random() * mapChoices.length)])
    zoomOutMap();
});

let maps;
let start = true;
let gameOver = false;
let rowNum = 1;
let answer = ['', '', '']
let win;
let imgUrl;
let shouldSave = true;


let mapSize = document.getElementById('mapChoice').clientHeight;
let divideFactor = 1000 / mapSize;

let calloutMap = $('#mapChoice').clone();
let instructionsDiv = $('#mapChoice').clone();
let instruction = $('<div id="instructions">Select a map name and choose a callout to begin!</div>')
instructionsDiv.append(instruction);
$('#mapChoice').replaceWith(instructionsDiv)




let calloutMaps = [];

function addTries(tries){
    shouldSave = false;
    for(let i = 0; i < tries.length; i++){
        createMap(tries[i][0]);
        for(let child of document.getElementById("mapChoice").children){
            if (child.matches('.callout') && child.children[0] != undefined){
                if (child.children[0].innerHTML == tries[i][2] + ' ' + tries[i][1]){  
                    child.click();
                }
            }
        }
    }
    shouldSave = true;
}

function doP2Guess(attempt){}

function tileAnimation(currRow, tileDiv, delayAmount){
    setTimeout(() => {
        currRow.appendChild(tileDiv);
        tileDiv.animate(tileSpin, tileSpinTiming);
    }, delayAmount);
}

function makeCalloutDiv(callout, mapName) {
    let div = document.createElement("div");
    let textDiv = document.createElement("div");

    let x = callout['location']['x'];
    let y = callout['location']['y'];
    let region = callout['regionName'];
    let superRegion = callout['superRegionName']

    div.className = "callout";
    div.classList.add("notranslate");
    let calloutString = superRegion + ' ' + region;
    textDiv.innerHTML = calloutString;
    textDiv.className = "calloutText"

    let xOffset = calloutString.length * 6;
    let yOffset = 0;
    if (calloutString.length > 10){
        yOffset = 10;
    }
    let calcX = (((x - xOffset) / divideFactor)).toString() + 'px'; //x
    let calcY = (((y - yOffset) / divideFactor)).toString() + 'px'; //y

    div.style.left = calcX;
    div.style.top = calcY;

    div.appendChild(textDiv)

    div.style.cursor = 'pointer';
    div.onclick = function () {
        // imgUrl = window.location.href + '/' + mapName + '/' + region + '/' + superRegion;
        // let mapImg = document.getElementById("trueImg");
        // mapImg.style.clipPath = 'inset(' + 1 + '%)';
        // mapImg.style.scale = 1
        // mapImg.src = imgUrl;
        // return;

        if (gameOver){
            return;
        }

        let guess = [mapName, region, superRegion]

        if (persistentData['currentState'] == 'p1' && shouldSave){
            persistAddTry(guess);
        }

        let listOfMapGuesses = document.getElementById("listOfMapGuesses");

        win = false;

        let currRow = document.createElement('div'); // creates new row div under listOfMapGuesses
        listOfMapGuesses.prepend(currRow);
        currRow.classList.add("row");

        let counter = 0;
        for (let j = 0; j < 3; j++) { //creates three tiles per row
            tileDiv = document.createElement("div");
            textSpan = document.createElement("span");
            tileDiv.classList.add("tile");
            textSpan.classList.add("hint");
            tileDiv.appendChild(textSpan);

            let string = (guess[j]).toLowerCase();
            let fixedMapName = string.charAt(0).toUpperCase() + string.slice(1);

            if (fixedMapName.toLowerCase() == guess[j].toLowerCase()) {
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
            persistP2State();
            gameOver = true;
            // clearMap();


            winConfetti();
            correctImgSrc = imgUrl;
            correctName = answer[0] + ':\n ' + answer[2] + ' ' + answer[1];
            createNextPageBox('agent')

        }
        div.remove();
        callout['regionName'] = '';
    };
   
    calloutMaps[calloutMaps.length-1].append(div)

}


function createMaps() {
    let callout;

    for (let i = 0; i < maps.length; i++) {
        let mapName = maps[i]['displayName']; 

        calloutMaps.push(calloutMap.clone())
        calloutMaps[calloutMaps.length - 1].children().attr('src', maps[i]["displayIcon"])
        calloutMaps[calloutMaps.length - 1].children().css({'transform': 'rotate(' + maps[i]['rotation'] +'deg)'})

        calloutMaps[calloutMaps.length - 1].val(mapName)

        for (let j = 0; j < maps[i]['callouts'].length; j++) {
            callout = maps[i]['callouts'][j];
            makeCalloutDiv(callout, mapName)
        }

    }

}


function createMap(mapName){
    for (let i = 0; i < calloutMaps.length; i++){
        let string = (calloutMaps[i].val()).toLowerCase();
        let fixedMapName = string.charAt(0).toUpperCase() + string.slice(1);
        if (fixedMapName == mapName){
            $('#mapChoice').replaceWith(calloutMaps[i])
        }
    }
}



let insetValue = 42;

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
    insetValue -= 1;
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


let curDayId;
jQuery.ajaxSetup({async:false});
$.get(window.location.href + '/mapOfDay', function (data, status) {
    // console.log(data)
    answer[0] = data['mapName']
    answer[1] = data['randCalloutEnglishRegion']
    answer[2] = data['randCalloutEnglishSuperRegion']

    imgUrl = window.location.href + '/' + answer[0] + '/' + answer[1] + '/' + answer[2];
    let mapImg = document.getElementById("trueImg");
    mapImg.src = imgUrl;
    // console.log(imgUrl);

    curDayId = data['dayId'];
});




let url = "static/api/maps/maps_" + getLanguageCookie() + ".json";
// let url = "/static/api/maps/maps_en.json"

$.get(url, function (data, status) {
    maps = data;
    zoomOutMap();
    createMaps();
    $.get(window.location.href + '/mapOfDay', function (data, status) {
        answer[1] = maps[data["mapIndex"]]["callouts"][data["randCalloutIndex"]]["regionName"]
        answer[2] = maps[data["mapIndex"]]["callouts"][data["randCalloutIndex"]]["superRegionName"]
        console.log(answer)
    });
    loadPersistentData('map', curDayId)
});


function toggleSwitch(box){
    if(box.checked){
        $('#mapChoiceContainer').show();
    }else{
        $('#mapChoiceContainer').hide();
    }
}
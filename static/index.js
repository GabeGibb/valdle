let allInfo;
let start = true;
let rowNum = 1;
let answer = ['', '', '']


// let mapSize = document.getElementById("mapChoice").height;
let mapSize = 640;
let divideFactor = 1000/mapSize;
console.log(mapSize)

function makeCalloutDiv(callout, mapName){
    let div = document.createElement("div");

    callout['location']['x'], callout['location']['y'], callout['regionName']
    let x = callout['location']['x'];
    let y = callout['location']['y'];
    let region = callout['regionName'];
    let superRegion = callout['superRegionName']

    div.style.left = (-10 +(x/divideFactor)).toString() + 'px'; //x
    div.style.top = (-10 +(y/divideFactor)).toString() + 'px'; //y
    div.className = "callout";
    div.innerHTML = region;
    // console.log(allInfo)
    div.style.cursor = 'pointer';
    div.onclick = function(){


        div.style.background = "blue";
        let row = document.getElementById("r" + rowNum.toString());
        let i = 0;
        let guess = [mapName, region, superRegion]

        let win = true;
        for (child of row.children) {
            // console.log(child);
            if(guess[i] == answer[i]){
                child.style.background = 'green';
            }else{
                child.style.background = 'red';
                win = false;
            }
            child.innerText = guess[i];
            i++;
        }
        div.remove();


        rowNum++;
        if (win){
            setTimeout(alert('WINNER'), 100);
        }
        else if(rowNum >= 6){
            setTimeout(alert('game over'), 500);
        }
    };


    document.getElementById("mapChoice").appendChild(div);

}


function createMap(mapName){
    clearMap();
    var map = document.getElementById("curMap");

    let callout;

    fetch("static/maps.json")
    .then((response) => response.json())
    .then((data) => {maps = data})
    .then(()=>{
        allInfo = maps;
        for(let i = 0; i < maps.length; i++){
            if (maps[i]['displayName'] != mapName){
                continue;
            }

            map.src = maps[i]['displayIcon'];
            
            for(let j = 0; j < maps[i]['callouts'].length; j++){
                callout = maps[i]['callouts'][j];
                makeCalloutDiv(callout, mapName)
            }


            if (start){
                answer[0] = maps[i]['displayName'];
                let randCall = Math.floor(Math.random()*maps[i]['callouts'].length);
                answer[1] = maps[i]['callouts'][randCall]['regionName']
                answer[2] = maps[i]['callouts'][randCall]['superRegionName']
                console.log(answer);
                clearMap();
            }
            start = false;
        }
        
    })
}

function clearMap(){
    let map = document.getElementById("mapChoice");
    for (child of map.children){
        if (child.id == 'curMap'){
            continue;
        }
        child.innerHTML = '';
    }
    // let mapPic = document.getElementById("curMap");
    // mapPic.style.display = 'none';

}


mapChoices = ['Ascent', 'Bind', 'Breeze', 'Fracture', 'Haven']

createMap(mapChoices[Math.floor(Math.random()*mapChoices.length)])

// createMap(mapChoices[Math.floor(Math.random()*mapChoices.length)])


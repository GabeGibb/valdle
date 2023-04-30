

// let mapSize = document.getElementById("mapChoice").height;
let mapSize = 640;
let divideFactor = 1000/mapSize;
console.log(mapSize)

function makeCalloutDiv(callout){
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

    div.style.cursor = 'pointer';
    div.onclick = function(){
        div.style.background = "blue";
    };


    document.getElementById("mapChoice").appendChild(div);

}


function createMap(mapName){
    var map = document.getElementById("curMap");

    let callout;
    // fetch('https://valorant-api.com/v1/maps')

    fetch("static/maps.json")
    .then((response) => response.json())
    .then((data) => {maps = data})
    .then(()=>{
        // maps = maps['data'];
        
        for(let i = 0; i < maps.length; i++){
            if (maps[i]['displayName'] != mapName){
                continue;
            }
            map.src = maps[i]['displayIcon'];
            
            for(let j = 0; j < maps[i]['callouts'].length; j++){
                callout = maps[i]['callouts'][j];
                makeCalloutDiv(callout)
            }
        }
        
    })
}


createMap('Fracture')



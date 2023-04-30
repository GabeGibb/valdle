

let mapSize = document.getElementById("curMap").height;
let divideFactor = 1000/mapSize;
console.log(mapSize)

function makeCalloutDiv(callout){
    let div = document.createElement("div");

    callout['location']['x'], callout['location']['y'], callout['regionName']
    let x = callout['location']['x'];
    let y = callout['location']['y'];
    let region = callout['regionName'];
    let superRegion = callout['superRegionName']

    div.style.left = (x/divideFactor).toString() + 'px'; //x
    div.style.top = (y/divideFactor).toString() + 'px'; //y
    div.className = "callout";
    div.innerHTML = region;

    div.style.cursor = 'pointer';
    div.onclick = function(){
        div.style.background = "blue";
    };


    document.getElementById("mapBox").appendChild(div);

}


function createMap(mapName){
    var map = document.getElementById("curMap");

    let callout;
    // fetch('https://valorant-api.com/v1/maps')

    fetch("maps.json")
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


createMap('Haven')



let mapSize = document.getElementById("curMap").height;
let divideFactor = 1000/mapSize;
console.log(mapSize)

function makeCalloutDiv(x, y, callout){
    let div = document.createElement("div");
    
    


    div.style.position = "absolute";
    div.style.left = (x/divideFactor).toString() + 'px'; //x
    div.style.top = (y/divideFactor).toString() + 'px'; //y
    div.style.width = "20";
    div.style.height = "20px";
    div.style.background = "red";
    div.style.color = "white";
    div.className = "callout";
    div.innerHTML = callout;
    document.getElementById("mapBox").appendChild(div);

}



function createMap(mapName){
    var map = document.getElementById("curMap");

    let callout;
    // fetch('https://valorant-api.com/v1/maps')
    fetch('maps.json')
    .then((response) => response.json())
    .then((data) => {maps = data})
    .then(()=>{
        // maps = maps['data'];
        
        for(let i = 0; i < maps.length; i++){
            if (maps[i]['displayName'] != mapName){
                continue;
            }
            map.src = maps[i]['displayIcon'];
            // console.log(maps[i]['displayIcon'] )
            
            for(let j = 0; j < maps[i]['callouts'].length; j++){
                callout = maps[i]['callouts'][j];
                makeCalloutDiv(callout['location']['x'], callout['location']['y'], callout['regionName'])
                // console.log(callout['location']['x'], callout['location']['y'])
            }
            // console.log(maps[i]['displayName'])
        }
        
    })
}


createMap('Bind')



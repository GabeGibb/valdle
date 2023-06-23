let allInfo;
let start = true;
let gameOver = false;
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

    div.style.cursor = 'pointer';
    div.onclick = function(){


        div.style.background = "blue";
        let row = document.getElementById("r" + rowNum.toString());
        let i = 0;
        let guess = [mapName, region, superRegion]

        let win = true;
        for (child of row.children) {
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
        // if (win){
        // //     setTimeout(function() {confirm('YOU WIN')
        // //     // window.location = window.location.href;
        // // }, 10);
        //     // clearMap();
        //     gameOver = true;
        // }
        // else if(rowNum >= 6){
        // //     setTimeout(function() {alert('GAME OVER! Location was ' + answer)
        // //     // window.location = window.location.href;
        // // }, 10);
        // //     clearMap();
        //     gameOver = true;
        // }
        if (win || rowNum >= 6){
            gameOver = true;
            let answerBox = document.getElementById("answerBox");
            answerBox.innerText = answer;
        }
    };


    document.getElementById("mapChoice").appendChild(div);

}


function createMap(mapName){
    if (gameOver){
        return;
    }
    clearMap();
    var map = document.getElementById("curMap");

    let callout;

    fetch("static/maps.json", {cache: "force-cache"})
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

                let imgUrl = window.location.href + '/' + answer[0] + '/' + answer[1] + '/' + answer[2];
                let mapImg = document.getElementById("trueImg");
                mapImg.src = imgUrl;


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
    let mapPic = document.getElementById("curMap");
    mapPic.src = '';

}


mapChoices = ['Ascent', 'Bind', 'Breeze', 'Fracture', 'Haven', 'Icebox', 'Lotus', 'Pearl', 'Split']

createMap(mapChoices[Math.floor(Math.random()*mapChoices.length)])

// mapChoices.forEach(function(x){
//     createMap(x);
//     clearMap();
//     console.log(x);
// });



// createMap(mapChoices[Math.floor(Math.random()*mapChoices.length)])


let url = "static/api/weapons/weapons_" + getLanguageCookie() + ".json";
let weaponUrl = window.location.href + '/weaponOfDay';
let dropdownClone = $('#dropdown').clone();
let skinIndex;
let weaponOptions;
let shouldSave = true;

// jQuery.ajaxSetup({async:false});
$.get(weaponUrl, function(data, status){ //url defined in current webpage js file
    loadTemplate(url, false, 'weapon', data['dayId']);
    // console.log(data)
    // randIndex = data['skinRandIndex'];
    randIndex = data['skinRandIndex'];
    weaponIndex = data['weaponRandIndex'];
    // console.log(data)
    weaponOptions = data['weaponOptions'];
    // console.log(weaponOptions);
    // console.log(weaponOptions);
});

function doTry(rows, curTry){
    
    for(let i = 0; i < 5; i++){
        let curRow = rows[i].children;
        for(let j = 0; j < 3; j++){
            if (curRow[j].innerHTML == curTry){
                curRow[j].click();
                return;
            }
        }
    }

}

function addTries(tries){
    shouldSave = false;

    let rows = $('#weaponOptions').children();
    for(let x = 0; x < tries.length; x++){
        doTry(rows, tries[x])
    }
    shouldSave = true;
}

function doP2Guess(attempt){
    // if (attempt != ''){
    //     isCorrectOption(attempt);
    // }
}

function curGamemode(){
    dataList = dataList[weaponIndex]['skins']

    correctImgSrc = dataList[randIndex]['displayIcon']
    // console.log(correctImgSrc);
    // console.log(dataList)
    console.log(dataList[randIndex]);
    if (correctImgSrc == null){
        for(let i=0; i < dataList[randIndex]['levels'].length; i++){
            if (dataList[randIndex]['levels'][i]['displayIcon'] != null){
                correctImgSrc = dataList[randIndex]['levels'][i]['displayIcon']
                break;
            }
        }
    }

    correctName = dataList[randIndex]['displayName']//[randIndex]['displayName']
    $("#weaponGuessImage").attr("src", correctImgSrc);
}


function makeButtons(){ //OVERWRITE TEMPLATE

    // console.log(dataList)


    let weaponOptionsDiv = $('#weaponOptions');
    for(let i = 0; i < 5; i++){
        let curRow = $('<div class="weaponRow"></div>')
        for(let j = 0; j < 3; j++){
            // let option = weaponOptions[(i * 3) + j];
            let option = dataList[weaponOptions[(i * 3) + j]]["displayName"];
            let weaponOption = $('<button class="weaponOption notranslate">' + option + '</button>');
            weaponOption.click(function(){ 
                if (!weaponGameOver){
                    if (shouldSave){
                        persistAddTry(option);
                    }     
                    isCorrectOption(option);
                    weaponOption.css("visibility", "hidden"); 
                }
            });
            curRow.append(weaponOption)
        }
        weaponOptionsDiv.append(curRow);
    }

}

function modeWrongActions(){}

let weaponGameOver = false;
function displayPartTwo(){
    weaponGameOver = true;
    winConfetti();
    createNextPageBox('quote');
}
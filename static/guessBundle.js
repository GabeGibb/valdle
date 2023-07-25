let url = "https://valorant-api.com/v1/bundles";
function curGamemode(){
    //WHAT TO DO ON LOAD
    setImage();
}
function displayPartTwo(){
    //WHAT TO DO ON WINNING FIRST MODE
    winConfetti();
}

function setImage(){
    guessImage.src = dataList[randIndex]['displayIcon'];
}

function modeWrongActions(){
    
}

let todaysDayId;
$.get(window.location.href + '/dayId', function (data, status) {
    todaysDayId = data['dayId']
    showWinstreaks();
});


function getWinStreak(statsObj){
    let pastId = todaysDayId;
    let counter = 0;
    for(let i = statsObj['dayIds'].length - 1; i >= 0; i--){
        if (statsObj['dayIds'][i] >= pastId - 1){
            counter++;
        }else{
            return counter
        }
        pastId = statsObj['dayIds'][i]
    }
    return counter;
}



function showWinstreaks(){
    let buttons = document.querySelector('.buttons').children
    for(let i = 0; i < buttons.length; i++){
        if (localStorage.getItem(buttons[i].id + 'Stats') == null){}
        else{
            let stats = JSON.parse(localStorage.getItem(buttons[i].id + 'Stats'));
            let winStreak = getWinStreak(stats);
            if (winStreak > 0){
                let streakDiv = buttons[i].querySelector('.win_streak')
                streakDiv.querySelector('.streak_number').innerHTML = winStreak;
                streakDiv.style.display = '';
            }
        }
    }
}
